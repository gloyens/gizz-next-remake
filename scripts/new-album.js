#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const question = (query) => new Promise((resolve) => rl.question(query, resolve));

async function createNewAlbum() {
  console.log('\n🎸 King Gizzard Album Generator\n');

  // Get album details
  const title = await question('Album title: ');
  const slug = await question('URL slug (e.g., "the-silver-cord"): ');
  const bandcampCode = await question('Bandcamp code: ');
  
  // Get next index
  const albumsDir = path.join(__dirname, '..', 'data', 'albums');
  const existingAlbums = fs.readdirSync(albumsDir).filter(f => f.endsWith('.mdx'));
  const nextIndex = existingAlbums.length + 1;
  
  console.log(`\nThis will be album #${nextIndex}`);
  
  // Get next albums
  console.log('\nNext album recommendations (leave blank to skip):');
  const nextAlbums = [];
  
  for (let i = 1; i <= 2; i++) {
    const albumSlug = await question(`  Recommendation ${i} - Album slug: `);
    if (albumSlug) {
      const description = await question(`  Recommendation ${i} - Description: `);
      nextAlbums.push([albumSlug, description]);
    }
  }
  
  // Get description
  console.log('\nAlbum description (end with empty line):');
  const descriptionLines = [];
  let line;
  while ((line = await question('')) !== '') {
    descriptionLines.push(line);
  }
  const description = descriptionLines.join('\n');
  
  // Create MDX content
  const mdxContent = `---
title: ${title}
index: ${nextIndex}
bandcampCode: ${bandcampCode}
${nextAlbums.length > 0 ? `nextAlbums:\n${nextAlbums.map(([slug, desc]) => `  - ["${slug}", "${desc}"]`).join('\n')}` : 'nextAlbums: []'}
---

# ${title}

${description}
`;

  // Write file
  const filePath = path.join(albumsDir, `${slug}.mdx`);
  fs.writeFileSync(filePath, mdxContent);
  
  console.log(`\n✅ Created ${filePath}`);
  console.log(`\n📸 Don't forget to add the album cover: public/${slug}.jpg`);
  
  rl.close();
}

createNewAlbum().catch(console.error);