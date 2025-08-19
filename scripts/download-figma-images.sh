#!/bin/bash

# Download Figma Images Script
# Usage: ./scripts/download-figma-images.sh [nodeId1] [nodeId2] ...

set -e

echo "🚀 Figma Image Downloader"
echo "=========================="

# Check if tsx is installed
if ! command -v tsx &> /dev/null; then
    echo "📦 Installing tsx globally..."
    npm install -g tsx
fi

# Check if the MCP server is running
echo "🔍 Checking MCP server connection..."
if curl -s --connect-timeout 5 http://127.0.0.1:3845/mcp > /dev/null; then
    echo "✅ MCP server is running"
else
    echo "❌ MCP server is not running on http://127.0.0.1:3845/mcp"
    echo "Please make sure Figma MCP server is running and try again."
    exit 1
fi

# Create output directory if it doesn't exist
mkdir -p public/assets/figma-downloads

# Run the TypeScript script
echo "🎯 Running download script..."
if [ $# -eq 0 ]; then
    # No arguments - download all connected images or current selection
    tsx scripts/download-figma-images.ts
else
    # Arguments provided - download specific node IDs
    tsx scripts/download-figma-images.ts "$@"
fi

echo ""
echo "📁 Downloaded images are in: public/assets/figma-downloads/"
echo "✅ Done!" 