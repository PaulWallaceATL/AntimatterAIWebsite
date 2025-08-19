#!/usr/bin/env npx tsx

import fs from 'fs'
import path from 'path'

// Figma localhost URLs from the exported testimonials component
const assets = [
  {
    url: "http://localhost:3845/assets/32603aa2bb5a605bdf4f394aa9dbfdb440bdd68e.png",
    localPath: "public/assets/testimonials/profile-jay-w.png"
  },
  {
    url: "http://localhost:3845/assets/1627f3a870e9b56d751d07f53392d7a84aa55817.png", 
    localPath: "public/assets/testimonials/profile-jon-h.png"
  },
  {
    url: "http://localhost:3845/assets/020fde7eed9856bc79bdbef7bad0f820d10e302c.png",
    localPath: "public/assets/testimonials/profile-mike-r.png"
  },
  {
    url: "http://localhost:3845/assets/4cc414587272d74aa1936a160588daf24d2801f4.svg",
    localPath: "public/assets/testimonials/star-fill.svg"
  },
  {
    url: "http://localhost:3845/assets/588f8091f69fd614032ffddcf031300bc110de49.svg",
    localPath: "public/assets/testimonials/arrow-navigation.svg"
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
  console.log('🚀 Starting download of Testimonials assets...\n')
  
  for (const asset of assets) {
    await downloadAsset(asset.url, asset.localPath)
  }
  
  console.log('\n✨ Download complete!')
}

downloadAllAssets().catch(console.error) 