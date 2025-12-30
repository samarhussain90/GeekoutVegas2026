/**
 * Prebuild Warmup Script
 * Runs during Gitpod prebuild to cache everything
 */

import { chromium } from 'playwright';
import * as fs from 'fs-extra';
import * as path from 'path';

async function warmup() {
  console.log('🔥 Warming up caches...\n');

  // 1. Create output directories
  console.log('📁 Creating directories...');
  await fs.ensureDir('./cloned-pages');
  await fs.ensureDir('./screenshots');
  console.log('   ✓ cloned-pages/');
  console.log('   ✓ screenshots/');

  // 2. Warm up Playwright browser
  console.log('\n🌐 Warming up Playwright...');
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto('about:blank');
  await page.screenshot({ path: './screenshots/.warmup.png' });
  await browser.close();
  await fs.remove('./screenshots/.warmup.png');
  console.log('   ✓ Browser ready');

  // 3. Create a sample demo page
  console.log('\n📄 Creating demo page...');
  const demoHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Cloned Page Demo - Geekout Vegas 2026</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%);
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #fff;
    }
    .container {
      text-align: center;
      padding: 3rem;
      max-width: 600px;
    }
    h1 {
      font-size: 2.5rem;
      margin-bottom: 1rem;
      background: linear-gradient(90deg, #e94560, #ff6b6b);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
    p {
      font-size: 1.2rem;
      opacity: 0.9;
      line-height: 1.6;
      margin-bottom: 2rem;
    }
    .badge {
      display: inline-block;
      background: rgba(233, 69, 96, 0.2);
      border: 1px solid #e94560;
      padding: 0.5rem 1.5rem;
      border-radius: 50px;
      font-size: 0.9rem;
      color: #e94560;
    }
    .stats {
      display: flex;
      justify-content: center;
      gap: 2rem;
      margin-top: 2rem;
    }
    .stat {
      text-align: center;
    }
    .stat-value {
      font-size: 2rem;
      font-weight: bold;
      color: #e94560;
    }
    .stat-label {
      font-size: 0.8rem;
      opacity: 0.7;
    }
  </style>
</head>
<body>
  <div class="container">
    <span class="badge">DEMO OUTPUT</span>
    <h1>Your Cloned Page</h1>
    <p>This is a sample output from the Landing Page Cloner. During the workshop, you'll clone real websites and generate AI variations!</p>
    <div class="stats">
      <div class="stat">
        <div class="stat-value">1</div>
        <div class="stat-label">Page Cloned</div>
      </div>
      <div class="stat">
        <div class="stat-value">0</div>
        <div class="stat-label">Variations</div>
      </div>
      <div class="stat">
        <div class="stat-value">Ready</div>
        <div class="stat-label">Status</div>
      </div>
    </div>
  </div>
</body>
</html>`;

  await fs.writeFile('./cloned-pages/demo.html', demoHtml);
  console.log('   ✓ cloned-pages/demo.html');

  console.log('\n✅ Prebuild warmup complete!\n');
}

warmup().catch(console.error);
