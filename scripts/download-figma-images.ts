#!/usr/bin/env tsx

import fs from 'fs';
import path from 'path';
import https from 'https';
import http from 'http';

interface McpRequest {
  jsonrpc: string;
  id: number;
  method: string;
  params: any;
}

interface McpResponse {
  jsonrpc: string;
  id: number;
  result?: any;
  error?: any;
}

class FigmaImageDownloader {
  private mcpUrl = 'http://127.0.0.1:3845/mcp';
  private outputDir = './public/assets/figma-downloads';
  private requestId = 1;
  private initialized = false;

  constructor() {
    // Ensure output directory exists
    if (!fs.existsSync(this.outputDir)) {
      fs.mkdirSync(this.outputDir, { recursive: true });
    }
  }

  private async initialize(): Promise<void> {
    if (this.initialized) return;

    const request: McpRequest = {
      jsonrpc: '2.0',
      id: this.requestId++,
      method: 'initialize',
      params: {
        protocolVersion: '2024-11-05',
        capabilities: {
          tools: {}
        },
        clientInfo: {
          name: 'figma-downloader',
          version: '1.0.0'
        }
      }
    };

    await this.sendRawMcpRequest(request);
    this.initialized = true;
  }

  private async sendRawMcpRequest(request: McpRequest): Promise<any> {
    return new Promise((resolve, reject) => {
      const postData = JSON.stringify(request);
      const url = new URL(this.mcpUrl);
      
      const options = {
        hostname: url.hostname,
        port: url.port,
        path: url.pathname,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json, text/event-stream',
          'Content-Length': Buffer.byteLength(postData)
        }
      };

      const req = http.request(options, (res) => {
        let data = '';
        res.on('data', (chunk) => data += chunk);
        res.on('end', () => {
          try {
            // Handle Server-Sent Events format
            if (data.startsWith('event:')) {
              const lines = data.split('\n');
              const dataLines = lines.filter(line => line.startsWith('data: '));
              
              if (dataLines.length > 0) {
                const jsonData = dataLines.map(line => line.substring(6)).join('');
                const response: McpResponse = JSON.parse(jsonData);
                
                if (response.error) {
                  reject(new Error(`MCP Error: ${response.error.message || JSON.stringify(response.error)}`));
                } else {
                  resolve(response.result);
                }
              } else {
                reject(new Error('No data found in SSE response'));
              }
            } else {
              // Handle regular JSON response
              const response: McpResponse = JSON.parse(data);
              if (response.error) {
                reject(new Error(`MCP Error: ${response.error.message || JSON.stringify(response.error)}`));
              } else {
                resolve(response.result);
              }
            }
          } catch (error) {
            const errorMessage = error instanceof Error ? error.message : String(error);
            reject(new Error(`Failed to parse response: ${errorMessage}\nResponse: ${data.substring(0, 200)}...`));
          }
        });
      });

      req.on('error', reject);
      req.write(postData);
      req.end();
    });
  }

  private async sendMcpRequest(method: string, params: any = {}): Promise<any> {
    // Ensure initialization before any other requests
    if (!this.initialized) {
      await this.initialize();
    }

    const request: McpRequest = {
      jsonrpc: '2.0',
      id: this.requestId++,
      method: `tools/call`,
      params: {
        name: method,
        arguments: {
          clientName: 'cursor',
          clientLanguages: 'typescript,javascript',
          clientFrameworks: 'react,nextjs',
          ...params
        }
      }
    };

    return this.sendRawMcpRequest(request);
  }

  private async downloadImage(imageUrl: string, filename: string): Promise<void> {
    return new Promise((resolve, reject) => {
      const filePath = path.join(this.outputDir, filename);
      const file = fs.createWriteStream(filePath);
      
      const request = imageUrl.startsWith('https:') ? https : http;
      
      request.get(imageUrl, (response) => {
        response.pipe(file);
        file.on('finish', () => {
          file.close();
          console.log(`✅ Downloaded: ${filename}`);
          resolve();
        });
      }).on('error', (error) => {
        fs.unlink(filePath, () => {}); // Delete the file on error
        reject(error);
      });
    });
  }

  private async saveImageFromBase64(base64Data: string, filename: string): Promise<void> {
    try {
      const filePath = path.join(this.outputDir, filename);
      
      // Remove data URL prefix if present (e.g., "data:image/png;base64,")
      const base64Content = base64Data.replace(/^data:image\/[a-z]+;base64,/, '');
      
      // Convert base64 to buffer and write to file
      const buffer = Buffer.from(base64Content, 'base64');
      fs.writeFileSync(filePath, buffer);
      
      console.log(`✅ Downloaded: ${filename}`);
    } catch (error) {
      console.error(`❌ Error saving image ${filename}:`, error);
      throw error;
    }
  }

  async downloadCurrentSelection(): Promise<void> {
    try {
      console.log('🔍 Getting image from current Figma selection...');
      
      // Get image from current selection
      const toolResult = await this.sendMcpRequest('mcp_Figma_get_image');
      
      // Handle the tool result structure
      if (toolResult && toolResult.content) {
        const content = Array.isArray(toolResult.content) ? toolResult.content[0] : toolResult.content;
        
        if (content && content.type === 'image' && content.data) {
          const filename = `figma-current-${Date.now()}.png`;
          await this.saveImageFromBase64(content.data, filename);
        } else {
          console.log('❌ No image data found in current selection');
        }
      } else {
        console.log('❌ No image found in current selection');
      }
    } catch (error) {
      console.error('❌ Error downloading current selection:', error);
    }
  }

  async downloadByNodeId(nodeId: string): Promise<void> {
    try {
      console.log(`🔍 Getting image for node: ${nodeId}...`);
      
      const toolResult = await this.sendMcpRequest('mcp_Figma_get_image', { nodeId });
      
      // Handle the tool result structure
      if (toolResult && toolResult.content) {
        const content = Array.isArray(toolResult.content) ? toolResult.content[0] : toolResult.content;
        
        if (content && content.type === 'image' && content.data) {
          const filename = `figma-${nodeId.replace(':', '-')}-${Date.now()}.png`;
          await this.saveImageFromBase64(content.data, filename);
        } else {
          console.log(`❌ No image data found for node: ${nodeId}`);
        }
      } else {
        console.log(`❌ No image found for node: ${nodeId}`);
      }
    } catch (error) {
      console.error(`❌ Error downloading node ${nodeId}:`, error);
    }
  }

  async getCodeConnectMap(): Promise<any> {
    try {
      console.log('🔍 Getting code connect map...');
      const toolResult = await this.sendMcpRequest('mcp_Figma_get_code_connect_map');
      
      // Handle the tool result structure
      if (toolResult && toolResult.content) {
        const content = Array.isArray(toolResult.content) ? toolResult.content[0] : toolResult.content;
        
        if (content && content.type === 'text') {
          try {
            return JSON.parse(content.text);
          } catch (parseError) {
            console.log('📝 Code connect map is not valid JSON, treating as empty');
            return {};
          }
        }
      }
      
      return {};
    } catch (error) {
      console.error('❌ Error getting code connect map:', error);
      return {};
    }
  }

  async downloadAllConnectedImages(): Promise<void> {
    try {
      const codeConnectMap = await this.getCodeConnectMap();
      
      if (Object.keys(codeConnectMap).length === 0) {
        console.log('📝 No code-connected nodes found. Downloading current selection...');
        await this.downloadCurrentSelection();
        return;
      }

      console.log(`📦 Found ${Object.keys(codeConnectMap).length} code-connected nodes`);
      
      for (const [nodeId, info] of Object.entries(codeConnectMap)) {
        console.log(`📥 Downloading image for: ${(info as any).codeConnectName || nodeId}`);
        await this.downloadByNodeId(nodeId);
        
        // Add a small delay between downloads
        await new Promise(resolve => setTimeout(resolve, 500));
      }
    } catch (error) {
      console.error('❌ Error downloading connected images:', error);
    }
  }
}

// Main execution
async function main() {
  const args = process.argv.slice(2);
  const downloader = new FigmaImageDownloader();

  console.log('🚀 Starting Figma image download...');
  console.log(`📁 Output directory: ${downloader['outputDir']}`);

  if (args.length > 0) {
    // Download specific node IDs provided as arguments
    for (const nodeId of args) {
      await downloader.downloadByNodeId(nodeId);
    }
  } else {
    // Download all code-connected images or current selection
    await downloader.downloadAllConnectedImages();
  }

  console.log('✅ Download process completed!');
}

// Run the script
if (require.main === module) {
  main().catch(console.error);
}

export { FigmaImageDownloader }; 