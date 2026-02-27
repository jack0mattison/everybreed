#!/usr/bin/env node
/**
 * Generates comparison pages. Run from project root: node build/generate-comparisons.js
 */
const fs = require('fs');
const path = require('path');
const comparisons = require('./comparisons-data.js');
const root = path.resolve(__dirname, '..');

const template = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>{{TITLE}} | EveryBreed</title>
  <meta name="description" content="{{DESCRIPTION}}">
  <link rel="canonical" href="https://everybreed.co.uk/{{SLUG}}.html">
  <link rel="icon" type="image/x-icon" href="/favicon.ico">
  <link rel="manifest" href="/site.webmanifest">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&display=swap" rel="stylesheet">
  <script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
  <script>window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', 'G-XXXXXXXXXX');</script>
  <style>
    :root { --bg: #f9f8f5; --surface: #ffffff; --surface-2: #f5f4f0; --border: #e0ddd6; --text: #2d2d2d; --text-dim: #5c5c5c; --text-muted: #8a8a8a; --accent: #c99400; --accent-light: #d4a012; --accent-soft: #f5e6c8; --radius: 10px; --shadow-soft: 0 2px 8px rgba(0,0,0,0.06); --nav-height: 64px; }
    * { box-sizing: border-box; }
    body { margin: 0; min-height: 100vh; background: var(--bg); color: var(--text); font-family: "DM Sans", system-ui, sans-serif; }
    a { color: var(--accent); text-decoration: none; }
    a:hover { color: var(--accent-light); text-decoration: underline; }
    .shell { max-width: 1120px; margin: 0 auto; padding: 0 1.25rem 3rem; }
    header.site-header { position: sticky; top: 0; z-index: 40; background: var(--surface); border-bottom: 1px solid var(--border); box-shadow: var(--shadow-soft); }
    .nav { display: flex; align-items: center; justify-content: space-between; height: var(--nav-height); max-width: 1120px; margin: 0 auto; padding: 0 1.25rem; }
    .logo { font-weight: 700; font-size: 1.15rem; display: flex; align-items: center; gap: 0.45rem; }
    .logo span:nth-child(2) { color: var(--text); }
    .logo span:nth-child(3) { color: var(--accent); }
    nav ul { display: flex; align-items: center; list-style: none; margin: 0; padding: 0; gap: 0.5rem; font-size: 0.95rem; }
    nav a { color: var(--text-dim); padding: 0.4rem 0.85rem; border-radius: var(--radius); }
    nav a:hover { color: var(--accent); background: var(--accent-soft); text-decoration: none; }
    .nav-mobile { display: none; }
    main { padding-top: 2rem; }
    .breadcrumb { font-size: 0.85rem; color: var(--text-muted); margin-bottom: 1rem; }
    .page-title { font-size: clamp(1.6rem, 2.2vw + 0.5rem, 2rem); margin: 0 0 1rem; }
    .compare-table { width: 100%; border-collapse: collapse; margin: 1.5rem 0; font-size: 0.95rem; }
    .compare-table th, .compare-table td { padding: 0.65rem 0.85rem; text-align: left; border: 1px solid var(--border); }
    .compare-table th { background: var(--surface-2); color: var(--text-dim); font-weight: 600; }
    .compare-table td { background: var(--surface); color: var(--text); }
    .compare-table td:first-child { color: var(--text-muted); width: 28%; }
    .article-section { margin-bottom: 2rem; }
    .article-section h2 { font-size: 1.2rem; margin: 0 0 0.6rem; }
    .article-section p { margin: 0 0 0.75rem; line-height: 1.65; color: var(--text-dim); }
    .breed-links { margin: 1rem 0; display: flex; flex-wrap: wrap; gap: 0.75rem; }
    .breed-links a { padding: 0.5rem 0.9rem; border-radius: var(--radius); border: 1px solid var(--border); background: var(--surface-2); }
    .faq-item { margin-bottom: 1rem; }
    .faq-item h3 { font-size: 1rem; margin: 0 0 0.35rem; }
    .faq-item p { margin: 0; font-size: 0.95rem; line-height: 1.6; color: var(--text-dim); }
    footer { border-top: 1px solid var(--border); padding: 2rem 1.25rem 2.5rem; background: var(--surface); color: var(--text-dim); font-size: 0.9rem; margin-top: 2.5rem; }
    .footer-inner { max-width: 1120px; margin: 0 auto; display: flex; flex-wrap: wrap; gap: 1.5rem; justify-content: space-between; }
    .footer-links a { color: var(--text-dim); }
    .footer-links a:hover { color: var(--accent); text-decoration: none; }
    @media (max-width: 640px) { nav ul { display: none; } .nav-mobile { display: inline-flex; } .compare-table { font-size: 0.85rem; } .compare-table th, .compare-table td { padding: 0.5rem; } }
  </style>
</head>
<body>
  <header class="site-header">
    <div class="nav">
      <a href="index.html" class="logo"><span>🐾</span><span>Every</span><span>Breed</span></a>
      <nav>
        <ul>
          <li><a href="index.html#all-breeds">Breeds</a></li>
          <li><a href="index.html#compare">Compare</a></li>
          <li><a href="blog.html">Blog</a></li>
        </ul>
        <div class="nav-mobile">
          <a href="index.html#all-breeds">🐶</a>
        </div>
      </nav>
    </div>
  </header>
  <main>
    <div class="shell">
      <nav class="breadcrumb"><a href="index.html">Home</a> &rarr; <a href="index.html#compare">Compare</a> &rarr; <span>{{NAME1}} vs {{NAME2}}</span></nav>
      <h1 class="page-title">{{NAME1}} vs {{NAME2}}: Which Breed Is Right for You?</h1>
      <p style="color:var(--text-dim); margin-bottom:1.5rem;">Compare temperament, size, health, grooming and UK costs to decide which breed suits your lifestyle.</p>
      <table class="compare-table" aria-label="Comparison table">
        <thead><tr><th>Attribute</th><th>{{NAME1}}</th><th>{{NAME2}}</th></tr></thead>
        <tbody>{{TABLE_ROWS}}</tbody>
      </table>
      <div class="article-section">
        <h2>Temperament Compared</h2>
        <p>Both breeds have distinct personalities. Read the full breed guides below for detailed temperament and suitability for your home.</p>
      </div>
      <div class="article-section">
        <h2>Size &amp; Appearance Compared</h2>
        <p>See the comparison table above for size. For full height, weight and coat details, visit each breed&apos;s dedicated guide.</p>
      </div>
      <div class="article-section">
        <h2>Exercise &amp; Activity Compared</h2>
        <p>Exercise needs are summarised in the table. Both breeds benefit from regular daily exercise and mental stimulation.</p>
      </div>
      <div class="article-section">
        <h2>Health &amp; Lifespan Compared</h2>
        <p>Lifespan ranges are in the table. Always buy from health-tested breeders and consider pet insurance in the UK.</p>
      </div>
      <div class="article-section">
        <h2>Cost of Ownership Compared</h2>
        <p>UK puppy prices and ongoing costs vary; see the table for typical ranges. For a full cost breakdown, see our <a href="how-much-does-a-puppy-cost-uk.html">puppy cost guide</a>.</p>
      </div>
      <div class="article-section">
        <h2>Which Should You Choose?</h2>
        <p>Read the full guides for <a href="{{SLUG1}}.html">{{NAME1}}</a> and <a href="{{SLUG2}}.html">{{NAME2}}</a> to match each breed to your lifestyle, then visit responsible breeders to meet the dogs in person.</p>
      </div>
      <div class="breed-links">{{BREED_LINKS}}</div>
      <section class="article-section" aria-labelledby="faq-heading">
        <h2 id="faq-heading">Frequently Asked Questions</h2>
        {{FAQS}}
      </section>
    </div>
  </main>
  <footer>
    <div class="footer-inner">
      <div class="footer-links">
        <a href="index.html#all-breeds">Browse All Breeds</a>
        <a href="index.html#compare">Compare Breeds</a>
        <a href="blog.html">Blog</a>
      </div>
      <p>© 2026 <span style="color:var(--accent)">EveryBreed</span> — The UK&apos;s complete dog breed guide.</p>
    </div>
  </footer>
  <script type="application/ld+json">{{BREADCRUMB_SCHEMA}}</script>
  <script type="application/ld+json">{{FAQ_SCHEMA}}</script>
</body>
</html>`;

function escapeJson(s) {
  return s.replace(/\\/g, '\\\\').replace(/"/g, '\\"').replace(/\n/g, ' ');
}

for (const c of comparisons) {
  const tableRows = c.table.map(([attr, v1, v2]) =>
    `<tr><td>${attr}</td><td>${v1}</td><td>${v2}</td></tr>`).join('\n        ');
  const breedLinks = [
    `<a href="${c.slug1}.html">${c.name1} — full guide</a>`,
    ...(c.slug2 === 'american-bulldog' ? ['<a href="index.html#all-breeds">American Bulldog (breed guide coming soon)</a>'] : [`<a href="${c.slug2}.html">${c.name2} — full guide</a>`]),
  ].join('\n        ');
  const faqsHtml = (c.faqs || []).map(f => `
        <div class="faq-item">
          <h3>${f.q}</h3>
          <p>${f.a}</p>
        </div>`).join('');
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: (c.faqs || []).map(f => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://everybreed.co.uk/' },
      { '@type': 'ListItem', position: 2, name: 'Compare', item: 'https://everybreed.co.uk/#compare' },
      { '@type': 'ListItem', position: 3, name: `${c.name1} vs ${c.name2}`, item: `https://everybreed.co.uk/${c.slug}.html` },
    ],
  };
  const html = template
    .replace(/\{\{TITLE\}\}/g, `${c.name1} vs ${c.name2}: Key Differences Compared (2026)`)
    .replace(/\{\{DESCRIPTION\}\}/g, `${c.name1} vs ${c.name2}: compare temperament, size, exercise, health and UK costs. Which breed is right for you?`)
    .replace(/\{\{SLUG\}\}/g, c.slug)
    .replace(/\{\{NAME1\}\}/g, c.name1)
    .replace(/\{\{NAME2\}\}/g, c.name2)
    .replace(/\{\{SLUG1\}\}/g, c.slug1)
    .replace(/\{\{SLUG2\}\}/g, c.slug2)
    .replace(/\{\{TABLE_ROWS\}\}/g, tableRows)
    .replace(/\{\{BREED_LINKS\}\}/g, breedLinks)
    .replace(/\{\{FAQS\}\}/g, faqsHtml)
    .replace(/\{\{BREADCRUMB_SCHEMA\}\}/g, JSON.stringify(breadcrumbSchema))
    .replace(/\{\{FAQ_SCHEMA\}\}/g, JSON.stringify(faqSchema));
  fs.writeFileSync(path.join(root, c.slug + '.html'), html, 'utf8');
  console.log('Wrote', c.slug + '.html');
}
console.log('Done. Generated', comparisons.length, 'comparison pages.');
