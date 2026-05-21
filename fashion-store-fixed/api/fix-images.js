const fs = require('fs');
const https = require('https');

const seedFile = './seedProducts.js';
let seedData = fs.readFileSync(seedFile, 'utf8');

const urlRegex = /https:\/\/images\.unsplash\.com\/photo-[a-zA-Z0-9\-]+\?w=800/g;
const urls = [...new Set(seedData.match(urlRegex))];

const workingUrls = [];
const brokenUrls = [];

const checkUrl = (url) => {
  return new Promise((resolve) => {
    https.get(url, (res) => {
      if (res.statusCode >= 200 && res.statusCode < 400) {
        workingUrls.push(url);
        resolve(true);
      } else {
        brokenUrls.push(url);
        resolve(false);
      }
    }).on('error', () => {
      brokenUrls.push(url);
      resolve(false);
    });
  });
};

async function main() {
  console.log(`Checking ${urls.length} URLs...`);
  
  // Throttle requests slightly
  for (const url of urls) {
    await checkUrl(url);
    await new Promise(r => setTimeout(r, 100)); // 100ms delay
  }
  
  console.log(`Working: ${workingUrls.length}, Broken: ${brokenUrls.length}`);
  
  if (brokenUrls.length > 0 && workingUrls.length > 0) {
    // Replace broken URLs with random working URLs
    let modifiedData = seedData;
    brokenUrls.forEach(brokenUrl => {
      const fallback = workingUrls[Math.floor(Math.random() * workingUrls.length)];
      // Replace globally in the file
      modifiedData = modifiedData.split(brokenUrl).join(fallback);
    });
    
    fs.writeFileSync(seedFile, modifiedData);
    console.log('Replaced broken URLs in seedProducts.js');
  }
}

main();
