import fs from 'fs';
import path from 'path';

export default function Home({ html }) {
  return <div dangerouslySetInnerHTML={{ __html: html }} />;
}

export async function getStaticProps() {
  const filePath = path.join(process.cwd(), 'index.html');
  const full = fs.readFileSync(filePath, 'utf8');
  const match = full.match(/<body[^>]*>([\s\S]*)<\/body>/i);
  const html = match ? match[1] : full;
  return { props: { html } };
}
