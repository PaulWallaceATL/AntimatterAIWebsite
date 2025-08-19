#!/usr/bin/env npx tsx

import fs from 'fs'
import path from 'path'

// Figma localhost URLs from the exported component
const assets = [
  {
    url: "http://localhost:3845/assets/33062cb54a893f7eb314312f9840e4c7febc5ee3.svg",
    localPath: "public/assets/lowes-logo.svg"
  },
  {
    url: "http://localhost:3845/assets/ec6bf64fb8ff493c9c82cc0568841b363a68a44d.svg", 
    localPath: "public/assets/cognizant-logo.svg"
  },
  {
    url: "http://localhost:3845/assets/cac7cebcdab43702230b9bd462816d3d991f9cfa.svg",
    localPath: "public/assets/trimble-logo.svg"
  },
  {
    url: "http://localhost:3845/assets/987678e52eb89beea4cea6b5ecf0d49961fb5591.svg",
    localPath: "public/assets/e2open-logo.svg"
  },
  {
    url: "http://localhost:3845/assets/3459021cca8090bd9b2d3e0cc0e5b89f3696bff5.svg",
    localPath: "public/assets/toyota-logo.svg"
  },
  {
    url: "http://localhost:3845/assets/82215183ed452f9b092698d6f2157cc8fa8a1da6.svg",
    localPath: "public/assets/company-logo-1.svg"
  },
  {
    url: "http://localhost:3845/assets/7332c45dcc3ea341491d4397732f3186a16f436b.svg",
    localPath: "public/assets/keyspace-logo.svg"
  },
  {
    url: "http://localhost:3845/assets/708b335bc8da2a9201d5fecfbd13c6b0f3ee02df.svg",
    localPath: "public/assets/injazat-logo.svg"
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
  console.log('🚀 Starting download of Trusted Leaders assets...\n')
  
  for (const asset of assets) {
    await downloadAsset(asset.url, asset.localPath)
  }
  
  console.log('\n✨ Download complete!')
}

downloadAllAssets().catch(console.error)