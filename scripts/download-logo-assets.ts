#!/usr/bin/env npx tsx

import fs from 'fs'
import path from 'path'

// Figma localhost URLs for the complex logo from the navbar
const assets = [
  {
    url: "http://localhost:3845/assets/ca05a6318162e8683b99c9f48529c3e78e42b8b8.svg",
    localPath: "public/assets/logo/group-mask-1.svg"
  },
  {
    url: "http://localhost:3845/assets/579e9992ff82e7f3a897b98d3fb8475190aa5170.svg", 
    localPath: "public/assets/logo/group-1.svg"
  },
  {
    url: "http://localhost:3845/assets/d3e1ca206985ebe89ea935fde94bfc031e14225b.svg",
    localPath: "public/assets/logo/vector-1.svg"
  },
  {
    url: "http://localhost:3845/assets/a1f15b2ebf572ea3402b98c57f0eba8abfcb5f80.svg",
    localPath: "public/assets/logo/vector-2.svg"
  },
  {
    url: "http://localhost:3845/assets/6b81ab899f3dee854ca7917954956dc5bb93e7df.svg",
    localPath: "public/assets/logo/vector-3.svg"
  },
  {
    url: "http://localhost:3845/assets/05456ade1a4281802c21c9e5c7a5d8ec976e1384.svg",
    localPath: "public/assets/logo/vector-4.svg"
  },
  {
    url: "http://localhost:3845/assets/c00c69938c9c73ab34644e0317828e0b05e33f7b.svg",
    localPath: "public/assets/logo/vector-5.svg"
  },
  {
    url: "http://localhost:3845/assets/39430f4e793e7ed28bd9a8229087c8bee12931fe.svg",
    localPath: "public/assets/logo/vector-6.svg"
  },
  {
    url: "http://localhost:3845/assets/20411b89674e86812d70b68566c47be2d1d30b5c.svg",
    localPath: "public/assets/logo/vector-7.svg"
  },
  {
    url: "http://localhost:3845/assets/bbdd1214f4707c4fefe29d0636c888d9727a4972.svg",
    localPath: "public/assets/logo/vector-8.svg"
  },
  {
    url: "http://localhost:3845/assets/82cfec370e2fa154e75a2fa9f5d93e7215944dbc.svg",
    localPath: "public/assets/logo/vector-9.svg"
  },
  {
    url: "http://localhost:3845/assets/897e1e45217faee8cc6bfb25efaf3bba40c468aa.svg",
    localPath: "public/assets/logo/vector-10.svg"
  },
  {
    url: "http://localhost:3845/assets/8887b43b1e995786ff8798eb5365325bb5ace643.svg",
    localPath: "public/assets/logo/vector-11.svg"
  },
  {
    url: "http://localhost:3845/assets/818a1852213ff0e49e7b0277863116d375cabda5.svg",
    localPath: "public/assets/logo/vector-12.svg"
  },
  {
    url: "http://localhost:3845/assets/3907d891c418f8669763c9a4726bc85dab56bc32.svg",
    localPath: "public/assets/logo/group-mask-2.svg"
  },
  {
    url: "http://localhost:3845/assets/cbe6a85157c6c107e812044f48b199ca7caab3da.svg",
    localPath: "public/assets/logo/group-3.svg"
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
  console.log('🚀 Starting download of Logo assets...\n')
  
  for (const asset of assets) {
    await downloadAsset(asset.url, asset.localPath)
  }
  
  console.log('\n✨ Download complete!')
}

downloadAllAssets().catch(console.error) 