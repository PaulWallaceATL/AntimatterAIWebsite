#!/usr/bin/env npx tsx

import fs from 'fs'
import path from 'path'

// Figma localhost URLs from the exported services component
const assets = [
  {
    url: "http://localhost:3845/assets/eb3d119a2ce3913bcb8b5b849f96fc5d4e7d6a74.png",
    localPath: "public/assets/services/feature-case-study.png"
  },
  {
    url: "http://localhost:3845/assets/aa199db69fae90bd929e544f296c052775153ae6.svg", 
    localPath: "public/assets/services/design-icon.svg"
  },
  {
    url: "http://localhost:3845/assets/cfddda984dcaab1ef810d760aa3caeeafed8bbe1.svg",
    localPath: "public/assets/services/minus-icon.svg"
  },
  {
    url: "http://localhost:3845/assets/54c25577dfda398374b74190252b190fb0d77718.svg",
    localPath: "public/assets/services/arrow-diagonal.svg"
  },
  {
    url: "http://localhost:3845/assets/c6a9789ab85cb0d6bafdbb6c0daf92b3e6f7529d.svg",
    localPath: "public/assets/services/development-icon.svg"
  },
  {
    url: "http://localhost:3845/assets/a9c6f8f1d65e486c4e38c1f2c5fcce690f460018.svg",
    localPath: "public/assets/services/plus-icon.svg"
  },
  {
    url: "http://localhost:3845/assets/49c9a377bf8eaa2505c98206a4fd5289c9ad618c.svg",
    localPath: "public/assets/services/marketing-icon.svg"
  },
  {
    url: "http://localhost:3845/assets/e8ddaef7bed7e5304734b08989a1c8bee4cd16a9.svg",
    localPath: "public/assets/services/healthcare-icon.svg"
  },
  {
    url: "http://localhost:3845/assets/d2d234324d62b47558246b3c8154b478e3daa4a0.svg",
    localPath: "public/assets/services/ai-icon.svg"
  },
  {
    url: "http://localhost:3845/assets/7a5561c974d77615bdf809660c469200fbfa61b6.svg",
    localPath: "public/assets/services/cybersecurity-icon.svg"
  }
]

async function downloadAsset(url: string, localPath: string) {
  try {
    console.log(`Downloading ${url} to ${localPath}...`)
    
    const response = await fetch(url)
    if (!response.ok) {
      throw new Error(`Failed to fetch ${url}: ${response.statusText}`)
    }
    
    const arrayBuffer = await response.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)
    
    // Ensure the directory exists
    const dir = path.dirname(localPath)
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true })
    }
    
    fs.writeFileSync(localPath, buffer)
    console.log(`✅ Successfully downloaded ${localPath}`)
    
  } catch (error) {
    console.error(`❌ Failed to download ${url}:`, error)
  }
}

async function downloadAllAssets() {
  console.log('🚀 Starting download of Services assets...\n')
  
  for (const asset of assets) {
    await downloadAsset(asset.url, asset.localPath)
  }
  
  console.log('\n✨ Download complete!')
}

downloadAllAssets().catch(console.error) 