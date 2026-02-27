#!/usr/bin/env node
/**
 * Generates category (best-dogs-for-*) pages. Run from project root: node build/generate-categories.js
 */
const fs = require('fs');
const path = require('path');
const categories = require('./categories-data.js');
const root = path.resolve(__dirname, '..');

const headAndStyle = `<!DOCTYPE html>
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
    :root { --bg: #f9f8f5; --surface: #ffffff; --surface-2: #f5f4f0; --border: #e0ddd6; --text: #2d2d2d; --text-dim: #5c5c5c; --text-muted: #8a8a8a; --accent: #c99400; --accent-light: #d4a012; --accent-soft: #f5e6c8; --radius: 10px; --shadow-soft: 0 2px 8px rgba(0,0,0,0.06); --nav-height: 72px; }
    * { box-sizing: border-box; }
    body { margin: 0; min-height: 100vh; background: var(--bg); color: var(--text); font-family: "DM Sans", system-ui, sans-serif; }
    a { color: var(--accent); text-decoration: none; }
    a:hover { color: var(--accent-light); text-decoration: underline; }
    .shell { max-width: 1120px; margin: 0 auto; padding: 0 1.5rem 4rem; }
    header.site-header { position: sticky; top: 0; z-index: 40; background: var(--surface); border-bottom: 1px solid var(--border); box-shadow: var(--shadow-soft); }
    .nav { display: flex; align-items: center; justify-content: space-between; height: var(--nav-height); max-width: 1120px; margin: 0 auto; padding: 0 1.5rem; }
    .logo { font-weight: 700; font-size: 1.15rem; display: flex; align-items: center; gap: 0.45rem; }
    .logo span:nth-child(2) { color: var(--text); }
    .logo span:nth-child(3) { color: var(--accent); }
    nav ul { display: flex; align-items: center; list-style: none; margin: 0; padding: 0; gap: 0.5rem; font-size: 0.95rem; }
    nav a { color: var(--text-dim); padding: 0.4rem 0.85rem; border-radius: var(--radius); }
    nav a:hover { color: var(--accent); background: var(--accent-soft); text-decoration: none; }
    .nav-mobile { display: none; }
    main { padding-top: 2.5rem; }
    .breadcrumb { font-size: 0.85rem; color: var(--text-muted); margin-bottom: 1.25rem; }
    .page-title { font-size: clamp(1.6rem, 2.2vw + 0.5rem, 2rem); margin: 0 0 1.25rem; }
    .article-section { margin-bottom: 2.5rem; }
    .article-section p { margin: 0 0 1rem; line-height: 1.65; color: var(--text-dim); }
    .breed-list { margin: 1rem 0; }
    .breed-list-item { margin-bottom: 1.75rem; padding: 1.25rem; border-radius: var(--radius); border: 1px solid var(--border); background: var(--surface-2); }
    .breed-list-item h3 { margin: 0 0 0.4rem; font-size: 1.05rem; }
    .breed-list-item h3 a { color: var(--text); }
    .breed-list-item p { margin: 0.35rem 0 0.5rem; font-size: 0.95rem; }
    .breed-list-item .stats { font-size: 0.85rem; color: var(--text-muted); }
    .faq-item { margin-bottom: 1.35rem; }
    .faq-item h3 { font-size: 1rem; margin: 0 0 0.35rem; }
    .faq-item p { margin: 0; font-size: 0.95rem; line-height: 1.6; color: var(--text-dim); }
    footer { border-top: 1px solid var(--border); padding: 3.5rem 1.5rem 2.5rem; background: var(--surface); color: var(--text-dim); font-size: 0.88rem; margin-top: 3.5rem; }
    .footer-inner { max-width: 1120px; margin: 0 auto; }
    .footer-cols { display: grid; grid-template-columns: 2fr 1fr 1fr 1fr; gap: 2.5rem; margin-bottom: 2.5rem; }
    .footer-brand p { margin: 0.5rem 0 0; font-size: 0.88rem; line-height: 1.6; color: var(--text-muted); max-width: 280px; }
    .footer-brand .logo { margin-bottom: 0.25rem; }
    .footer-col h4 { font-size: 0.82rem; text-transform: uppercase; letter-spacing: 0.08em; color: var(--text-muted); margin: 0 0 0.85rem; font-weight: 600; }
    .footer-col ul { list-style: none; margin: 0; padding: 0; }
    .footer-col li { margin-bottom: 0.55rem; }
    .footer-col a { color: var(--text-dim); font-size: 0.88rem; }
    .footer-col a:hover { color: var(--accent); text-decoration: none; }
    .footer-bottom { border-top: 1px solid var(--border); padding-top: 1.5rem; display: flex; flex-wrap: wrap; justify-content: space-between; align-items: center; gap: 1rem; }
    .footer-bottom p { margin: 0; font-size: 0.82rem; color: var(--text-muted); }
    .footer-bottom .brand { color: var(--accent); font-weight: 600; }
    @media (max-width: 880px) { .footer-cols { grid-template-columns: 1fr 1fr; } }
    @media (max-width: 640px) { nav ul { display: none; } .nav-mobile { display: inline-flex; } .footer-cols { grid-template-columns: 1fr; } }
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
      <nav class="breadcrumb"><a href="index.html">Home</a> &rarr; <a href="index.html#categories">Best breeds for…</a> &rarr; <span>{{BREADCRUMB_NAME}}</span></nav>
      <h1 class="page-title">{{H1}}</h1>
      {{INTRO}}
      <div class="breed-list">
        {{LIST_ITEMS}}
      </div>
      <section class="article-section" aria-labelledby="faq-heading">
        <h2 id="faq-heading">Frequently Asked Questions</h2>
        {{FAQS}}
      </section>
    </div>
  </main>
  <footer>
    <div class="footer-inner">
      <div class="footer-cols">
        <div class="footer-brand">
          <a href="index.html" class="logo"><span>🐾</span><span>Every</span><span>Breed</span></a>
          <p>The UK&apos;s complete dog breed guide. Honest, practical advice for real dog owners.</p>
        </div>
        <div class="footer-col">
          <h4>Explore</h4>
          <ul>
            <li><a href="index.html#all-breeds">All Breeds</a></li>
            <li><a href="index.html#compare">Compare Breeds</a></li>
            <li><a href="blog.html">Blog</a></li>
            <li><a href="best-dogs-for-families.html">Best for Families</a></li>
            <li><a href="best-dogs-for-first-time-owners.html">First-Time Owners</a></li>
          </ul>
        </div>
        <div class="footer-col">
          <h4>Popular Breeds</h4>
          <ul>
            <li><a href="labrador-retriever.html">Labrador Retriever</a></li>
            <li><a href="cockapoo.html">Cockapoo</a></li>
            <li><a href="french-bulldog.html">French Bulldog</a></li>
            <li><a href="cocker-spaniel.html">Cocker Spaniel</a></li>
            <li><a href="golden-retriever.html">Golden Retriever</a></li>
          </ul>
        </div>
        <div class="footer-col">
          <h4>Resources</h4>
          <ul>
            <li><a href="how-much-does-a-puppy-cost-uk.html">Puppy Cost Guide</a></li>
            <li><a href="how-to-choose-the-right-dog-breed.html">Choosing a Breed</a></li>
            <li><a href="dog-insurance-uk-guide.html">Insurance Guide</a></li>
            <li><a href="first-time-dog-owner-guide-uk.html">New Owner Checklist</a></li>
          </ul>
        </div>
      </div>
      <div class="footer-bottom">
        <p>&copy; 2026 <span class="brand">EveryBreed</span>. All rights reserved.</p>
        <p>Built for UK dog owners. Breed data sourced from the Kennel Club &amp; breed societies.</p>
      </div>
    </div>
  </footer>
  <script type="application/ld+json">{{BREADCRUMB_SCHEMA}}</script>
  <script type="application/ld+json">{{ITEMLIST_SCHEMA}}</script>
  <script type="application/ld+json">{{FAQ_SCHEMA}}</script>
</body>
</html>`;

for (const cat of categories) {
  const introHtml = (cat.intro || []).map(p => `<p style="color:var(--text-dim); margin-bottom:0.75rem;">${p}</p>`).join('\n      ');
  const listItems = (cat.list || []).map((item, i) => `
        <div class="breed-list-item">
          <h3><a href="${item.slug}.html">${i + 1}. ${item.name}</a></h3>
          <p>${item.why}</p>
          <p class="stats">Size: ${item.size} &middot; Exercise: ${item.exercise} &middot; Grooming: ${item.grooming}</p>
        </div>`).join('\n');
  const faqsHtml = (cat.faqs || []).map(f => `
        <div class="faq-item">
          <h3>${f.q}</h3>
          <p>${f.a}</p>
        </div>`).join('\n');
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://everybreed.co.uk/' },
      { '@type': 'ListItem', position: 2, name: 'Best breeds for…', item: 'https://everybreed.co.uk/#categories' },
      { '@type': 'ListItem', position: 3, name: cat.title, item: `https://everybreed.co.uk/${cat.slug}.html` },
    ],
  };
  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: cat.h1,
    numberOfItems: (cat.list || []).length,
    itemListElement: (cat.list || []).map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      url: `https://everybreed.co.uk/${item.slug}.html`,
    })),
  };
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: (cat.faqs || []).map(f => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };
  const html = headAndStyle
    .replace(/\{\{TITLE\}\}/g, cat.title)
    .replace(/\{\{DESCRIPTION\}\}/g, `Best dogs for ${cat.slug.replace(/best-dogs-for-|best-|\.html/g, '').replace(/-/g, ' ')} in the UK. Our top picks with breed guides and UK-specific advice.`)
    .replace(/\{\{SLUG\}\}/g, cat.slug)
    .replace(/\{\{BREADCRUMB_NAME\}\}/g, cat.title)
    .replace(/\{\{H1\}\}/g, cat.h1)
    .replace(/\{\{INTRO\}\}/g, introHtml)
    .replace(/\{\{LIST_ITEMS\}\}/g, listItems)
    .replace(/\{\{FAQS\}\}/g, faqsHtml)
    .replace(/\{\{BREADCRUMB_SCHEMA\}\}/g, JSON.stringify(breadcrumbSchema))
    .replace(/\{\{ITEMLIST_SCHEMA\}\}/g, JSON.stringify(itemListSchema))
    .replace(/\{\{FAQ_SCHEMA\}\}/g, JSON.stringify(faqSchema));
  fs.writeFileSync(path.join(root, cat.slug + '.html'), html, 'utf8');
  console.log('Wrote', cat.slug + '.html');
}
console.log('Done. Generated', categories.length, 'category pages.');
