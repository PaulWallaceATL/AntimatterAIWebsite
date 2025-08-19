#!/usr/bin/env npx tsx

import fs from 'fs'
import path from 'path'

// Figma localhost URLs from the exported case studies component
const assets = [
  {
    url: "http://localhost:3845/assets/6b58a570d664d0d290d6d6ddfc7513d5d1b40cf6.png",
    localPath: "public/assets/case-studies/feature-video-showcase.png"
  },
  {
    url: "http://localhost:3845/assets/cea0a11dd891b3ea550ce3ba92683b9c70b5f5a2.svg", 
    localPath: "public/assets/case-studies/feature-logo.svg"
  },
  {
    url: "http://localhost:3845/assets/79472165751609973ffb37ab62afc3f4c8191b89.svg",
    localPath: "public/assets/case-studies/arrow-diagonal-large.svg"
  },
  {
    url: "http://localhost:3845/assets/fa144defd1dd405f50b27e11dbdd0f9778c727e4.svg",
    localPath: "public/assets/case-studies/play-icon.svg"
  },
  {
    url: "http://localhost:3845/assets/df220f502350182cb14c68e8d8a7f47c54eecabf.svg",
    localPath: "public/assets/case-studies/mute-icon.svg"
  },
  {
    url: "http://localhost:3845/assets/ee4bdc067a838aa7e17b9b8798ae576a2a443817.svg",
    localPath: "public/assets/case-studies/fullscreen-icon.svg"
  },
  {
    url: "http://localhost:3845/assets/588f8091f69fd614032ffddcf031300bc110de49.svg",
    localPath: "public/assets/case-studies/arrow-navigation.svg"
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
  console.log('🚀 Starting download of Case Studies assets...\n')
  
  for (const asset of assets) {
    await downloadAsset(asset.url, asset.localPath)
  }
  
  console.log('\n✨ Download complete!')
}

downloadAllAssets().catch(console.error) 