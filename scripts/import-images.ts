const fs = require('fs')
const path = require('path')
const { createCanvas, loadImage } = require('canvas')

// Ensure directories exist
const dirs = [
  'public/assets/services',
  'public/assets/case-studies',
  'public/assets/screenshots',
]

dirs.forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true })
  }
})

// Service images
const serviceImages = [
  {
    name: 'design',
    width: 600,
    height: 400,
    draw: (ctx: any) => {
      // Design service mockup
      ctx.fillStyle = '#141414'
      ctx.fillRect(0, 0, 600, 400)
      
      // UI elements
      ctx.fillStyle = '#6366F1'
      ctx.globalAlpha = 0.1
      ctx.fillRect(40, 40, 520, 320)
      
      // Design elements
      ctx.globalAlpha = 1
      ctx.fillStyle = '#6366F1'
      ctx.fillRect(60, 60, 200, 120)
      ctx.fillRect(280, 60, 260, 120)
      ctx.fillRect(60, 200, 480, 140)
    }
  },
  {
    name: 'development',
    width: 600,
    height: 400,
    draw: (ctx: any) => {
      // Development service mockup
      ctx.fillStyle = '#141414'
      ctx.fillRect(0, 0, 600, 400)
      
      // Mobile app screens
      ctx.fillStyle = '#6366F1'
      ctx.globalAlpha = 0.1
      ctx.fillRect(100, 50, 180, 300)
      ctx.fillRect(320, 50, 180, 300)
    }
  },
  {
    name: 'marketing',
    width: 600,
    height: 400,
    draw: (ctx: any) => {
      // Marketing service mockup
      ctx.fillStyle = '#141414'
      ctx.fillRect(0, 0, 600, 400)
      
      // Analytics graph
      ctx.fillStyle = '#6366F1'
      ctx.globalAlpha = 0.1
      ctx.fillRect(40, 40, 520, 320)
      
      // Graph elements
      ctx.globalAlpha = 1
      ctx.beginPath()
      ctx.moveTo(60, 300)
      ctx.lineTo(200, 150)
      ctx.lineTo(340, 250)
      ctx.lineTo(480, 100)
      ctx.strokeStyle = '#6366F1'
      ctx.lineWidth = 4
      ctx.stroke()
    }
  },
  {
    name: 'healthcare',
    width: 600,
    height: 400,
    draw: (ctx: any) => {
      // Healthcare service mockup
      ctx.fillStyle = '#141414'
      ctx.fillRect(0, 0, 600, 400)
      
      // Medical interface
      ctx.fillStyle = '#6366F1'
      ctx.globalAlpha = 0.1
      ctx.fillRect(40, 40, 520, 320)
      
      // Medical cross
      ctx.globalAlpha = 1
      ctx.fillRect(280, 160, 40, 120)
      ctx.fillRect(240, 200, 120, 40)
    }
  },
  {
    name: 'ai',
    width: 600,
    height: 400,
    draw: (ctx: any) => {
      // AI service mockup
      ctx.fillStyle = '#141414'
      ctx.fillRect(0, 0, 600, 400)
      
      // Neural network visualization
      ctx.fillStyle = '#6366F1'
      ctx.globalAlpha = 0.1
      ctx.fillRect(40, 40, 520, 320)
      
      // Network nodes
      ctx.globalAlpha = 1
      for (let i = 0; i < 5; i++) {
        for (let j = 0; j < 4; j++) {
          ctx.beginPath()
          ctx.arc(120 + i * 100, 120 + j * 80, 10, 0, Math.PI * 2)
          ctx.fill()
        }
      }
    }
  }
]

// Case study images
const caseStudyImages = [
  {
    name: 'feature-app',
    width: 800,
    height: 600,
    draw: (ctx: any) => {
      // Feature case study mockup
      ctx.fillStyle = '#141414'
      ctx.fillRect(0, 0, 800, 600)
      
      // App screenshots
      ctx.fillStyle = '#6366F1'
      ctx.globalAlpha = 0.1
      ctx.fillRect(100, 100, 240, 400)
      ctx.fillRect(380, 100, 320, 400)
    }
  }
]

// Screenshot grid images
const screenshotImages = [
  {
    name: 'ui-components',
    width: 400,
    height: 300,
    draw: (ctx: any) => {
      ctx.fillStyle = '#141414'
      ctx.fillRect(0, 0, 400, 300)
      
      // UI components grid
      ctx.fillStyle = '#6366F1'
      ctx.globalAlpha = 0.1
      ctx.fillRect(20, 20, 360, 260)
    }
  },
  {
    name: 'mobile-screens',
    width: 400,
    height: 300,
    draw: (ctx: any) => {
      ctx.fillStyle = '#141414'
      ctx.fillRect(0, 0, 400, 300)
      
      // Mobile screens
      ctx.fillStyle = '#6366F1'
      ctx.globalAlpha = 0.1
      ctx.fillRect(20, 20, 100, 260)
      ctx.fillRect(140, 20, 100, 260)
      ctx.fillRect(260, 20, 100, 260)
    }
  },
  {
    name: 'analytics-dashboard',
    width: 400,
    height: 300,
    draw: (ctx: any) => {
      ctx.fillStyle = '#141414'
      ctx.fillRect(0, 0, 400, 300)
      
      // Dashboard layout
      ctx.fillStyle = '#6366F1'
      ctx.globalAlpha = 0.1
      ctx.fillRect(20, 20, 360, 60)
      ctx.fillRect(20, 100, 170, 180)
      ctx.fillRect(210, 100, 170, 180)
    }
  }
]

async function generateImages() {
  // Generate service images
  for (const img of serviceImages) {
    const canvas = createCanvas(img.width, img.height)
    const ctx = canvas.getContext('2d')
    img.draw(ctx)
    
    const buffer = canvas.toBuffer('image/png')
    fs.writeFileSync(path.join('public/assets/services', `${img.name}.png`), buffer)
    console.log(`Generated: ${img.name}.png`)
  }

  // Generate case study images
  for (const img of caseStudyImages) {
    const canvas = createCanvas(img.width, img.height)
    const ctx = canvas.getContext('2d')
    img.draw(ctx)
    
    const buffer = canvas.toBuffer('image/png')
    fs.writeFileSync(path.join('public/assets/case-studies', `${img.name}.png`), buffer)
    console.log(`Generated: ${img.name}.png`)
  }

  // Generate screenshot images
  for (const img of screenshotImages) {
    const canvas = createCanvas(img.width, img.height)
    const ctx = canvas.getContext('2d')
    img.draw(ctx)
    
    const buffer = canvas.toBuffer('image/png')
    fs.writeFileSync(path.join('public/assets/screenshots', `${img.name}.png`), buffer)
    console.log(`Generated: ${img.name}.png`)
  }
}

generateImages().catch(console.error) 