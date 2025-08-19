# Figma Image Downloader

This script downloads images from your Figma designs via the MCP server and saves them to your project directory.

## Prerequisites

1. **Figma MCP Server**: Make sure your Figma MCP server is running on `http://127.0.0.1:3845/mcp`
2. **Figma Desktop App**: Open Figma and have your design file loaded
3. **Node.js**: Ensure you have Node.js installed

## Installation

Install the required dependencies:

```bash
npm install
```

## Usage

### Method 1: Using the Shell Script (Recommended)

The shell script includes connection checking and better error handling:

```bash
# Download from current Figma selection or all code-connected components
./scripts/download-figma-images.sh

# Download specific node IDs
./scripts/download-figma-images.sh "123:456" "789:012"
```

### Method 2: Using npm script

```bash
# Download from current selection or all code-connected components
npm run download-figma

# Download specific node IDs (you'll need to modify the script or use the shell version)
npm run download-figma
```

### Method 3: Direct TypeScript execution

```bash
# Download from current selection
tsx scripts/download-figma-images.ts

# Download specific node IDs
tsx scripts/download-figma-images.ts "123:456" "789:012"
```

## How it Works

1. **Code-Connected Components**: If your Figma components are connected to code (via Figma Code Connect), the script will automatically download images for all connected components.

2. **Current Selection**: If no code-connected components are found, it downloads an image of your current selection in Figma.

3. **Specific Nodes**: You can provide specific node IDs to download particular components.

## Output

Downloaded images are saved to: `public/assets/figma-downloads/`

File naming convention:
- Current selection: `figma-current-{timestamp}.png`
- Specific nodes: `figma-{nodeId}-{timestamp}.png`
- Code-connected components: `figma-{nodeId}-{timestamp}.png`

## Getting Node IDs

To get a Figma node ID:
1. Right-click on any element in Figma
2. Select "Copy link to selection"
3. The URL will contain the node ID: `https://figma.com/design/...?node-id=123-456`
4. Convert the format: `123-456` becomes `123:456`

## Troubleshooting

### MCP Server Not Running
```
❌ MCP server is not running on http://127.0.0.1:3845/mcp
```
- Make sure Figma desktop app is open
- Verify the MCP server is configured correctly in your `~/.cursor/mcp.json`
- Check that the server URL matches your configuration

### No Images Found
```
❌ No image found in current selection
```
- Make sure you have something selected in Figma
- Try selecting a frame or component instead of individual elements
- Verify your Figma file is loaded and active

### Permission Errors
- Make sure the scripts are executable: `chmod +x scripts/download-figma-images.sh`
- Check that you have write permissions in the `public/assets/` directory

## Examples

```bash
# Download current selection
./scripts/download-figma-images.sh

# Download multiple specific components
./scripts/download-figma-images.sh "1:2" "3:4" "5:6"

# Download using npm (current selection only)
npm run download-figma
``` 