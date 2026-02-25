// Breed data for generating breed pages. Labrador is already hand-written.
const BREEDS = [
  { name: 'Cockapoo', slug: 'cockapoo', group: 'Utility (Crossbreed)', size: 'Small–Medium', lifespan: '12–16 years', exercise: 'Moderate', grooming: 'Moderate–High', kids: 'Yes', shedding: 'Low',
    related: ['cavalier-king-charles-spaniel', 'cavapoo', 'labradoodle', 'cocker-spaniel', 'poodle'] },
  { name: 'French Bulldog', slug: 'french-bulldog', group: 'Utility', size: 'Small', lifespan: '10–12 years', exercise: 'Low–Moderate', grooming: 'Low', kids: 'Yes', shedding: 'Low',
    related: ['pug', 'cavalier-king-charles-spaniel', 'boston-terrier', 'cocker-spaniel', 'cockapoo'] },
  { name: 'Cocker Spaniel', slug: 'cocker-spaniel', group: 'Gundog', size: 'Medium', lifespan: '12–15 years', exercise: 'High', grooming: 'Moderate–High', kids: 'Yes', shedding: 'Moderate',
    related: ['english-springer-spaniel', 'cavalier-king-charles-spaniel', 'golden-retriever', 'labrador-retriever', 'cockapoo'] },
  { name: 'Golden Retriever', slug: 'golden-retriever', group: 'Gundog', size: 'Large', lifespan: '10–12 years', exercise: 'High', grooming: 'Moderate', kids: 'Yes', shedding: 'High',
    related: ['labrador-retriever', 'english-springer-spaniel', 'cocker-spaniel', 'goldendoodle', 'flat-coated-retriever'] },
  { name: 'German Shepherd', slug: 'german-shepherd', group: 'Pastoral', size: 'Large', lifespan: '9–13 years', exercise: 'Very High', grooming: 'Moderate', kids: 'Sometimes', shedding: 'High',
    related: ['border-collie', 'rottweiler', 'belgian-shepherd', 'dobermann', 'labrador-retriever'] },
  { name: 'Miniature Dachshund (Smooth-Haired)', slug: 'miniature-dachshund', group: 'Hound', size: 'Small', lifespan: '12–16 years', exercise: 'Moderate', grooming: 'Low', kids: 'Sometimes', shedding: 'Low',
    related: ['jack-russell-terrier', 'beagle', 'cavalier-king-charles-spaniel', 'cocker-spaniel', 'whippet'] },
  { name: 'English Springer Spaniel', slug: 'english-springer-spaniel', group: 'Gundog', size: 'Medium', lifespan: '12–14 years', exercise: 'Very High', grooming: 'Moderate', kids: 'Yes', shedding: 'Moderate',
    related: ['cocker-spaniel', 'labrador-retriever', 'golden-retriever', 'hungarian-vizsla', 'welsh-springer-spaniel'] },
  { name: 'Staffordshire Bull Terrier', slug: 'staffordshire-bull-terrier', group: 'Terrier', size: 'Medium', lifespan: '12–14 years', exercise: 'High', grooming: 'Low', kids: 'Yes', shedding: 'Low',
    related: ['american-staffordshire-terrier', 'bull-terrier', 'border-terrier', 'jack-russell-terrier', 'boxer'] },
  { name: 'Cavalier King Charles Spaniel', slug: 'cavalier-king-charles-spaniel', group: 'Toy', size: 'Small', lifespan: '12–15 years', exercise: 'Moderate', grooming: 'Moderate', kids: 'Yes', shedding: 'Moderate',
    related: ['cocker-spaniel', 'cockapoo', 'cavapoo', 'king-charles-spaniel', 'pug'] },
  { name: 'Border Collie', slug: 'border-collie', group: 'Pastoral', size: 'Medium', lifespan: '12–15 years', exercise: 'Very High', grooming: 'Moderate', kids: 'Sometimes', shedding: 'Moderate',
    related: ['german-shepherd', 'australian-shepherd', 'labrador-retriever', 'working-cocker', 'collie'] },
  { name: 'Miniature Schnauzer', slug: 'miniature-schnauzer', group: 'Utility', size: 'Small', lifespan: '12–15 years', exercise: 'Moderate', grooming: 'High', kids: 'Yes', shedding: 'Low',
    related: ['standard-schnauzer', 'yorkshire-terrier', 'cocker-spaniel', 'west-highland-white-terrier', 'cairn-terrier'] },
  { name: 'Pug', slug: 'pug', group: 'Toy', size: 'Small', lifespan: '12–15 years', exercise: 'Low–Moderate', grooming: 'Low', kids: 'Yes', shedding: 'Moderate',
    related: ['french-bulldog', 'cavalier-king-charles-spaniel', 'boston-terrier', 'shih-tzu', 'chihuahua'] },
  { name: 'Whippet', slug: 'whippet', group: 'Hound', size: 'Medium', lifespan: '12–15 years', exercise: 'Moderate–High', grooming: 'Low', kids: 'Yes', shedding: 'Low',
    related: ['greyhound', 'italian-greyhound', 'saluki', 'lurcher', 'beagle'] },
  { name: 'Hungarian Vizsla', slug: 'hungarian-vizsla', group: 'Gundog', size: 'Medium–Large', lifespan: '12–14 years', exercise: 'Very High', grooming: 'Low', kids: 'Yes', shedding: 'Low',
    related: ['weimaraner', 'german-shorthaired-pointer', 'labrador-retriever', 'english-springer-spaniel', 'golden-retriever'] },
  { name: 'Border Terrier', slug: 'border-terrier', group: 'Terrier', size: 'Small', lifespan: '12–15 years', exercise: 'Moderate–High', grooming: 'Low', kids: 'Sometimes', shedding: 'Low',
    related: ['jack-russell-terrier', 'lakeland-terrier', 'staffordshire-bull-terrier', 'cairn-terrier', 'welsh-terrier'] },
  { name: 'Shih Tzu', slug: 'shih-tzu', group: 'Toy', size: 'Small', lifespan: '10–16 years', exercise: 'Low–Moderate', grooming: 'High', kids: 'Yes', shedding: 'Low',
    related: ['cavalier-king-charles-spaniel', 'pug', 'maltese', 'lhasa-apso', 'pekinese'] },
  { name: 'Boxer', slug: 'boxer', group: 'Working', size: 'Large', lifespan: '10–12 years', exercise: 'Very High', grooming: 'Low', kids: 'Yes', shedding: 'Low',
    related: ['german-shepherd', 'staffordshire-bull-terrier', 'rottweiler', 'dobermann', 'bullmastiff'] },
  { name: 'Rottweiler', slug: 'rottweiler', group: 'Working', size: 'Large', lifespan: '9–10 years', exercise: 'High', grooming: 'Low', kids: 'Sometimes', shedding: 'Moderate',
    related: ['german-shepherd', 'dobermann', 'bullmastiff', 'boxer', 'bernese-mountain-dog'] },
  { name: 'Dalmatian', slug: 'dalmatian', group: 'Utility', size: 'Medium–Large', lifespan: '11–13 years', exercise: 'Very High', grooming: 'Low', kids: 'Sometimes', shedding: 'High',
    related: ['pointer', 'weimaraner', 'vizsla', 'labrador-retriever', 'english-setter'] },
  { name: 'Beagle', slug: 'beagle', group: 'Hound', size: 'Small–Medium', lifespan: '12–15 years', exercise: 'High', grooming: 'Low', kids: 'Yes', shedding: 'Moderate',
    related: ['harrier', 'basset-hound', 'foxhound', 'cocker-spaniel', 'jack-russell-terrier'] },
  { name: 'Jack Russell Terrier', slug: 'jack-russell-terrier', group: 'Terrier', size: 'Small', lifespan: '12–15 years', exercise: 'High', grooming: 'Low', kids: 'Sometimes', shedding: 'Low–Moderate',
    related: ['border-terrier', 'parson-russell-terrier', 'staffordshire-bull-terrier', 'miniature-dachshund', 'beagle'] },
  { name: 'Yorkshire Terrier', slug: 'yorkshire-terrier', group: 'Toy', size: 'Small', lifespan: '12–15 years', exercise: 'Low–Moderate', grooming: 'High', kids: 'Sometimes', shedding: 'Low',
    related: ['maltese', 'shih-tzu', 'cavalier-king-charles-spaniel', 'pomeranian', 'chihuahua'] },
  { name: 'Bernese Mountain Dog', slug: 'bernese-mountain-dog', group: 'Working', size: 'Giant', lifespan: '7–10 years', exercise: 'Moderate', grooming: 'High', kids: 'Yes', shedding: 'High',
    related: ['greater-swiss-mountain-dog', 'saint-bernard', 'rottweiler', 'newfoundland', 'golden-retriever'] },
  { name: 'Labradoodle', slug: 'labradoodle', group: 'Utility (Crossbreed)', size: 'Medium–Large', lifespan: '12–14 years', exercise: 'High', grooming: 'Moderate–High', kids: 'Yes', shedding: 'Low',
    related: ['labrador-retriever', 'goldendoodle', 'cockapoo', 'cavapoo', 'golden-retriever'] },
  { name: 'Goldendoodle', slug: 'goldendoodle', group: 'Utility (Crossbreed)', size: 'Medium–Large', lifespan: '10–15 years', exercise: 'High', grooming: 'Moderate–High', kids: 'Yes', shedding: 'Low',
    related: ['golden-retriever', 'labradoodle', 'cockapoo', 'cocker-spaniel', 'poodle'] },
  { name: 'Cavapoo', slug: 'cavapoo', group: 'Utility (Crossbreed)', size: 'Small–Medium', lifespan: '12–16 years', exercise: 'Moderate', grooming: 'Moderate–High', kids: 'Yes', shedding: 'Low',
    related: ['cavalier-king-charles-spaniel', 'cockapoo', 'cocker-spaniel', 'poodle', 'maltipoo'] },
  { name: 'Siberian Husky', slug: 'siberian-husky', group: 'Working', size: 'Medium–Large', lifespan: '12–15 years', exercise: 'Very High', grooming: 'Moderate', kids: 'Sometimes', shedding: 'High',
    related: ['alaskan-malamute', 'samoyed', 'german-shepherd', 'akita', 'labrador-retriever'] },
  { name: 'Pomeranian', slug: 'pomeranian', group: 'Toy', size: 'Small', lifespan: '12–16 years', exercise: 'Low–Moderate', grooming: 'High', kids: 'Sometimes', shedding: 'Moderate',
    related: ['cavalier-king-charles-spaniel', 'yorkshire-terrier', 'shih-tzu', 'cocker-spaniel', 'pug'] },
  { name: 'Dobermann', slug: 'dobermann', group: 'Working', size: 'Large', lifespan: '10–13 years', exercise: 'Very High', grooming: 'Low', kids: 'Sometimes', shedding: 'Low',
    related: ['german-shepherd', 'rottweiler', 'boxer', 'weimaraner', 'belgian-malinois'] },
];

// Normalise related: only link to slugs we have (no boston-terrier, etc). Map to our 30 slugs.
const ALL_SLUGS = new Set([
  'labrador-retriever','cockapoo','french-bulldog','cocker-spaniel','golden-retriever','german-shepherd',
  'miniature-dachshund','english-springer-spaniel','staffordshire-bull-terrier','cavalier-king-charles-spaniel',
  'border-collie','miniature-schnauzer','pug','whippet','hungarian-vizsla','border-terrier','shih-tzu',
  'boxer','rottweiler','dalmatian','beagle','jack-russell-terrier','yorkshire-terrier','bernese-mountain-dog',
  'labradoodle','goldendoodle','cavapoo','siberian-husky','pomeranian','dobermann'
]);

function linkToSlug(slug) {
  return ALL_SLUGS.has(slug) ? slug : null;
}

function getRelatedSlugs(related) {
  const out = [];
  for (const s of related) {
    const slug = typeof s === 'string' ? s : s;
    if (ALL_SLUGS.has(slug) && !out.includes(slug)) out.push(slug);
  }
  // Ensure at least 4; fill from all if needed
  const rest = [...ALL_SLUGS].filter(s => !out.includes(s));
  while (out.length < 4 && rest.length) out.push(rest.shift());
  return out.slice(0, 6);
}

// Slug to display name for related links
const SLUG_TO_NAME = {
  'labrador-retriever': 'Labrador Retriever', 'cockapoo': 'Cockapoo', 'french-bulldog': 'French Bulldog',
  'cocker-spaniel': 'Cocker Spaniel', 'golden-retriever': 'Golden Retriever', 'german-shepherd': 'German Shepherd',
  'miniature-dachshund': 'Miniature Dachshund', 'english-springer-spaniel': 'English Springer Spaniel',
  'staffordshire-bull-terrier': 'Staffordshire Bull Terrier', 'cavalier-king-charles-spaniel': 'Cavalier King Charles Spaniel',
  'border-collie': 'Border Collie', 'miniature-schnauzer': 'Miniature Schnauzer', 'pug': 'Pug',
  'whippet': 'Whippet', 'hungarian-vizsla': 'Hungarian Vizsla', 'border-terrier': 'Border Terrier', 'shih-tzu': 'Shih Tzu',
  'boxer': 'Boxer', 'rottweiler': 'Rottweiler', 'dalmatian': 'Dalmatian', 'beagle': 'Beagle',
  'jack-russell-terrier': 'Jack Russell Terrier', 'yorkshire-terrier': 'Yorkshire Terrier', 'bernese-mountain-dog': 'Bernese Mountain Dog',
  'labradoodle': 'Labradoodle', 'goldendoodle': 'Goldendoodle', 'cavapoo': 'Cavapoo', 'siberian-husky': 'Siberian Husky',
  'pomeranian': 'Pomeranian', 'dobermann': 'Dobermann'
};

module.exports = BREEDS;
module.exports.getRelated = getRelatedSlugs;
module.exports.slugToName = SLUG_TO_NAME;
