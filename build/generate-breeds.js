#!/usr/bin/env node
/**
 * Generates breed pages from labrador-retriever.html template.
 * Run from project root: node build/generate-breeds.js
 */
const fs = require('fs');
const path = require('path');
const breedsData = require('./breeds-data.js');
const getRelated = breedsData.getRelated || (() => []);
const slugToName = breedsData.slugToName || {};
const breeds = Array.isArray(breedsData) ? breedsData : (breedsData.default || []);

const root = path.resolve(__dirname, '..');
const templatePath = path.join(root, 'labrador-retriever.html');
let template = fs.readFileSync(templatePath, 'utf8');

// Skip Labrador - we keep the hand-written page
const toGenerate = breeds.filter(b => b.slug !== 'labrador-retriever');

function escapeRe(s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function buildRelatedHtml(relatedSlugs, currentSlug) {
  const slugs = getRelated(relatedSlugs).filter(s => s !== currentSlug);
  return slugs.map(slug => `<a href="${slug}.html">${slugToName[slug] || slug}</a>`).join('\n          ');
}

for (const b of toGenerate) {
  let html = template
    .replace(/Labrador Retriever/g, b.name)
    .replace(/labrador-retriever\.html/g, b.slug + '.html')
    .replace(/labrador-retriever/g, b.slug)
    .replace(/Medium–Large/g, b.size)
    .replace(/11–13 years/g, b.lifespan)
    .replace(/>High</g, '>' + b.exercise + '<')
    .replace(/>Moderate</g, '>' + b.grooming + '<')
    .replace(/>Yes</g, '>' + b.kids + '<')
    .replace(/Shedding<\/span><span class="value">High<\/span>/g, 'Shedding</span><span class="value">' + b.shedding + '</span>');

  // Related breeds section: replace the 6 links
  const relatedSlugs = b.related || [];
  const relatedHtml = buildRelatedHtml(relatedSlugs, b.slug);
  html = html.replace(
    /<div class="related-grid">[\s\S]*?<\/div>(?=\s*<\/div>\s*<div class="ad-slot">)/,
    '<div class="related-grid">\n          ' + relatedHtml.split('\n').join('\n          ') + '\n        </div>'
  );

  // CTA link: point to compare page or index
  const compareSlug = b.slug === 'golden-retriever' ? 'compare-labrador-vs-golden-retriever' : (b.slug === 'cockapoo' ? 'compare-cockapoo-vs-cavapoo' : null);
  if (compareSlug) {
    html = html.replace(/href="compare-labrador-vs-golden-retriever\.html"/g, `href="${compareSlug}.html"`);
  } else {
    html = html.replace(/<a href="compare-labrador-vs-golden-retriever\.html">Compare Labrador vs Golden Retriever &rarr;<\/a>/,
      '<a href="index.html#compare">Compare breeds &rarr;</a>');
  }

  // FAQ and schema: replace "Labrador" with breed name (after we already replaced "Labrador Retriever")
  const shortName = b.name.split(' ')[0]; // e.g. "Golden" from "Golden Retriever"
  html = html.replace(/Labradors/g, b.name + 's');
  html = html.replace(/Labrador/g, b.name);
  html = html.replace(/\bLab\b/g, shortName);

  const outPath = path.join(root, b.slug + '.html');
  fs.writeFileSync(outPath, html, 'utf8');
  console.log('Wrote', b.slug + '.html');
}

console.log('Done. Generated', toGenerate.length, 'breed pages.');
