#!/usr/bin/env tsx

import fs from 'fs';
import path from 'path';

/**
 * Simple Figma Image Downloader
 * 
 * This script demonstrates how to download images from Figma.
 * Since direct MCP communication is complex, this provides the structure
 * for manual execution through Cursor's tool calling system.
 */

class SimpleFigmaDownloader {
  private outputDir = './public/assets/figma-downloads';

  constructor() {
    // Ensure output directory exists
    if (!fs.existsSync(this.outputDir)) {
      fs.mkdirSync(this.outputDir, { recursive: true });
      console.log(`📁 Created output directory: ${this.outputDir}`);
    }
  }

  async saveImageFromBase64(base64Data: string, filename: string): Promise<void> {
    try {
      const filePath = path.join(this.outputDir, filename);
      
      // Remove data URL prefix if present (e.g., "data:image/png;base64,")
      const base64Content = base64Data.replace(/^data:image\/[a-z]+;base64,/, '');
      
      // Convert base64 to buffer and write to file
      const buffer = Buffer.from(base64Content, 'base64');
      fs.writeFileSync(filePath, buffer);
      
      console.log(`✅ Downloaded: ${filename}`);
      console.log(`📁 Saved to: ${filePath}`);
    } catch (error) {
      console.error(`❌ Error saving image ${filename}:`, error);
      throw error;
    }
  }

  async saveImageFromUrl(imageUrl: string, filename: string): Promise<void> {
    const https = await import('https');
    const http = await import('http');
    
    return new Promise((resolve, reject) => {
      const filePath = path.join(this.outputDir, filename);
      const file = fs.createWriteStream(filePath);
      
      const request = imageUrl.startsWith('https:') ? https : http;
      
      request.get(imageUrl, (response) => {
        response.pipe(file);
        file.on('finish', () => {
          file.close();
          console.log(`✅ Downloaded: ${filename}`);
          console.log(`📁 Saved to: ${filePath}`);
          resolve();
        });
      }).on('error', (error) => {
        fs.unlink(filePath, () => {}); // Delete the file on error
        reject(error);
      });
    });
  }

  generateFilename(nodeId?: string): string {
    const timestamp = Date.now();
    if (nodeId) {
      return `figma-${nodeId.replace(':', '-')}-${timestamp}.png`;
    }
    return `figma-current-${timestamp}.png`;
  }

  displayInstructions(): void {
    console.log(`
🚀 Figma Image Downloader - Manual Mode
=========================================

Since direct MCP communication requires specific setup, please follow these steps:

1. 📋 COPY the following commands and run them in Cursor's tool system:

   For current selection:
   ┌─────────────────────────────────────────────────────────────┐
   │ mcp_Figma_get_image()                                       │
   └─────────────────────────────────────────────────────────────┘

   For specific node (replace 123:456 with your node ID):
   ┌─────────────────────────────────────────────────────────────┐
   │ mcp_Figma_get_image({ nodeId: "123:456" })                  │
   └─────────────────────────────────────────────────────────────┘

   For code connect map:
   ┌─────────────────────────────────────────────────────────────┐
   │ mcp_Figma_get_code_connect_map()                            │
   └─────────────────────────────────────────────────────────────┘

2. 📋 COPY the base64 image data from the result

3. 🏃 RUN this script with the data:
   
   tsx scripts/download-figma-simple.ts save-base64 "YOUR_BASE64_DATA" "filename.png"
   tsx scripts/download-figma-simple.ts save-url "YOUR_IMAGE_URL" "filename.png"

4. 📁 Images will be saved to: ${this.outputDir}

📝 Examples:
   tsx scripts/download-figma-simple.ts save-base64 "iVBORw0KGgoAAAANSUhEUgAA..." "hero-section.png"
   tsx scripts/download-figma-simple.ts save-url "https://example.com/image.png" "button.png"
`);
  }
}

// Main execution
async function main() {
  const args = process.argv.slice(2);
  const downloader = new SimpleFigmaDownloader();

  if (args.length === 0) {
    downloader.displayInstructions();
    return;
  }

  const command = args[0];

  try {
    switch (command) {
      case 'save-base64':
        if (args.length < 3) {
          console.error('❌ Usage: save-base64 <base64_data> <filename>');
          process.exit(1);
        }
        await downloader.saveImageFromBase64(args[1], args[2]);
        break;

      case 'save-url':
        if (args.length < 3) {
          console.error('❌ Usage: save-url <image_url> <filename>');
          process.exit(1);
        }
        await downloader.saveImageFromUrl(args[1], args[2]);
        break;

      case 'generate-filename':
        const nodeId = args[1];
        console.log(downloader.generateFilename(nodeId));
        break;

      default:
        console.error(`❌ Unknown command: ${command}`);
        console.log('📝 Available commands: save-base64, save-url, generate-filename');
        process.exit(1);
    }
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

// Run the script
if (require.main === module) {
  main().catch(console.error);
}

export { SimpleFigmaDownloader }; 