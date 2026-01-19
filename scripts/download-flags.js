// Download all country flags as SVG from public sources
const fs = require('fs');
const https = require('https');
const http = require('http');

console.log('=== Downloading Country Flags ===\n');

// Read countries data
const countries = JSON.parse(fs.readFileSync('./data/countries.json', 'utf8'));

// Flag source - using flagcdn.com (free public API)
const BASE_URL = 'https://flagcdn.com/';

let downloaded = 0;
let errors = 0;
let skipped = 0;

function downloadFlag(country) {
  return new Promise((resolve) => {
    const code = country.cca2.toLowerCase();
    const url = `${BASE_URL}${code}.svg`;
    const filePath = `./flags/${country.cca2}.svg`;
    
    // Skip if already exists
    if (fs.existsSync(filePath)) {
      console.log(`⏭  ${country.name} (${country.cca2}) - already exists`);
      skipped++;
      resolve();
      return;
    }

    const file = fs.createWriteStream(filePath);
    
    https.get(url, (response) => {
      if (response.statusCode === 200) {
        response.pipe(file);
        file.on('finish', () => {
          file.close();
          console.log(`✓ ${country.name} (${country.cca2})`);
          downloaded++;
          resolve();
        });
      } else {
        fs.unlink(filePath, () => {});
        console.log(`✗ ${country.name} (${country.cca2}) - HTTP ${response.statusCode}`);
        errors++;
        resolve();
      }
    }).on('error', (err) => {
      fs.unlink(filePath, () => {});
      console.log(`✗ ${country.name} (${country.cca2}) - ${err.message}`);
      errors++;
      resolve();
    });
  });
}

async function downloadAllFlags() {
  console.log(`Downloading flags for ${countries.length} countries...\n`);
  
  // Download in batches of 5 to avoid overwhelming the server
  for (let i = 0; i < countries.length; i += 5) {
    const batch = countries.slice(i, i + 5);
    await Promise.all(batch.map(country => downloadFlag(country)));
    
    // Small delay between batches
    if (i + 5 < countries.length) {
      await new Promise(resolve => setTimeout(resolve, 100));
    }
  }
  
  console.log('\n=== Summary ===');
  console.log(`Downloaded: ${downloaded}`);
  console.log(`Skipped (already exists): ${skipped}`);
  console.log(`Errors: ${errors}`);
  console.log(`Total: ${countries.length}`);
  
  if (downloaded > 0 || skipped > 0) {
    console.log('\n✓ Flag download complete!');
  }
}

downloadAllFlags().catch(err => {
  console.error('Error:', err);
  process.exit(1);
});
