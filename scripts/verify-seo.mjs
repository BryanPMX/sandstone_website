import assert from 'node:assert/strict';
import { readFileSync, readdirSync, existsSync } from 'node:fs';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
const origin = readFileSync('src/constants/seo.ts', 'utf8');
assert.match(origin, /https:\/\/www\.sandstone\.homes/);
assert.ok(existsSync('public/areas/santa teresa/target.png'));
assert.ok(existsSync('src/app/areas/page.tsx'));
for (const name of readdirSync('content/blog').filter(n => n.endsWith('.md'))) {
  const {content} = matter(readFileSync(`content/blog/${name}`, 'utf8'));
  const rendered = String(await remark().use(html).process(content));
  assert.doesNotMatch(rendered, /<h1[ >]/, name);
  assert.doesNotMatch(content, /\/blog\/category\/(?:horizon-city-tx|upper-valley-el-paso|west-el-paso|fort-bliss)(?:[)/"\s]|$)/, name);
}
for (const file of ['src/app/blog/page.tsx','src/app/blog/category/[area]/page.tsx','src/app/blog/[slug]/page.tsx']) {
  assert.doesNotMatch(readFileSync(file,'utf8'), /https:\/\/sandstone\.homes/);
}
console.log('SEO content checks passed: canonical origin, local image, areas route, blog heading hierarchy and obsolete links.');
