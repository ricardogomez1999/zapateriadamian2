import fs from 'fs';
import path from 'path';

export default function HtmlPage({ html }) {
  return <div dangerouslySetInnerHTML={{ __html: html }} />;
}

export async function getStaticPaths() {
  const pages = ['basachi', 'berrendo', 'dmagno', 'nookie', 'puma', 'varios'];
  return {
    paths: pages.map(p => ({ params: { page: p } })),
    fallback: false
  };
}

export async function getStaticProps({ params }) {
  const filePath = path.join(process.cwd(), `${params.page}.html`);
  const full = fs.readFileSync(filePath, 'utf8');
  const match = full.match(/<body[^>]*>([\s\S]*)<\/body>/i);
  const html = match ? match[1] : full;
  return { props: { html } };
}
