import { VercelRequest, VercelResponse } from '@vercel/node';
import { createClient } from '@sanity/client';
import { htmlTemplate } from './html-template.js';

const client = createClient({
  projectId: 'h9r93g5z',
  dataset: 'production',
  apiVersion: '2024-03-01',
  useCdn: true,
});

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const originalPath = (req.query.originalPath as string) || '/';
  const slug = req.query.slug as string;

  let title = "Rotary Club of Unnao Royal Teachers' Championship";
  let description = "Official website of the Rotary Club of Unnao Royal Teachers' Championship. Celebrating cricket and uniting educators in Unnao.";
  let image = "https://unnaoteacherscricketclub.xyz/og-image.jpg";
  let type = "website";
  const url = `https://unnaoteacherscricketclub.xyz${originalPath}`;

  try {
    if (slug) {
      const query = `*[_type == "post" && slug.current == $slug][0]{
        title,
        "description": excerpt,
        "imageUrl": mainImage.asset->url
      }`;
      const post = await client.fetch(query, { slug });

      if (post) {
        title = `${post.title} | UTPL 2026`;
        description = post.description || description;
        image = post.imageUrl || image;
        type = "article";
      }
    } else if (originalPath === '/news') {
      title = "Latest News | UTPL 2026";
      description = "Stay updated with the latest match reports, team news, and announcements from the Unnao Teachers' Cricket Championship.";
    }

    // Ensure image is absolute
    if (image && !image.startsWith('http')) {
      image = `https://unnaoteacherscricketclub.xyz${image.startsWith('/') ? '' : '/'}${image}`;
    }

    // Inject metadata into the template
    let html = htmlTemplate;
    
    // Replace standard meta tags
    html = html.replace(/<title>.*?<\/title>/g, `<title>${title}</title>`);
    html = html.replace(/<meta name="description" content=".*?" \/>/g, `<meta name="description" content="${description}" />`);
    
    // Replace Open Graph tags
    html = html.replace(/<meta property="og:title" content=".*?" \/>/g, `<meta property="og:title" content="${title}" />`);
    html = html.replace(/<meta property="og:description" content=".*?" \/>/g, `<meta property="og:description" content="${description}" />`);
    html = html.replace(/<meta property="og:image" content=".*?" \/>/g, `<meta property="og:image" content="${image}" />`);
    html = html.replace(/<meta property="og:url" content=".*?" \/>/g, `<meta property="og:url" content="${url}" />`);
    html = html.replace(/<meta property="og:type" content=".*?" \/>/g, `<meta property="og:type" content="${type}" />`);
    
    // Replace Twitter tags
    html = html.replace(/<meta name="twitter:title" content=".*?" \/>/g, `<meta name="twitter:title" content="${title}" />`);
    html = html.replace(/<meta name="twitter:description" content=".*?" \/>/g, `<meta name="twitter:description" content="${description}" />`);
    html = html.replace(/<meta name="twitter:image" content=".*?" \/>/g, `<meta name="twitter:image" content="${image}" />`);
    html = html.replace(/<meta name="twitter:url" content=".*?" \/>/g, `<meta name="twitter:url" content="${url}" />`);

    res.setHeader('Content-Type', 'text/html');
    res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate');
    return res.status(200).send(html);
  } catch (error) {
    console.error('SEO Handler Error:', error);
    // Fallback to original template on error
    return res.status(200).send(htmlTemplate);
  }
}
