import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';
import { VercelRequest, VercelResponse } from '@vercel/node';
import fs from 'fs';
import path from 'path';

const projectId = 'rlzixx46';
const dataset = 'production';
const apiVersion = '2024-03-01';

const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
});

const builder = imageUrlBuilder(client);

function urlFor(source: any) {
  return builder.image(source);
}

const DEFAULT_TITLE = "Rotary Club of Unnao Royal Teachers' Championship";
const DEFAULT_DESCRIPTION = "Official website of the Rotary Club of Unnao Royal Teachers' Championship. Celebrating cricket and uniting educators in Unnao.";
const DEFAULT_IMAGE = "https://unnaoteacherscricketclub.xyz/opengraph.jpg";
const BASE_URL = "https://unnaoteacherscricketclub.xyz";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const { slug, originalPath } = req.query;
  const urlPath = (originalPath as string) || '/';

  let title = DEFAULT_TITLE;
  let description = DEFAULT_DESCRIPTION;
  let image = DEFAULT_IMAGE;
  let type = 'website';
  let url = `${BASE_URL}${urlPath}`;

  try {
    if (slug) {
      const post = await client.fetch(
        `*[_type == "post" && slug.current == $slug][0] {
          title,
          excerpt,
          mainImage
        }`,
        { slug }
      );

      if (post) {
        title = `${post.title} | UTPL`;
        description = post.excerpt || DEFAULT_DESCRIPTION;
        if (post.mainImage) {
          image = urlFor(post.mainImage).width(1200).height(630).url();
        }
        type = 'article';
      }
    } else if (urlPath === '/news') {
      title = `Latest News | UTPL`;
      description = "Official press releases and match reports from the Rotary Club of Unnao Royal Teachers' Championship.";
    }

    // Read index.html
    // We check multiple locations to find the built index.html
    const possiblePaths = [
      path.join(process.cwd(), 'index.html'),
      path.join(process.cwd(), 'dist', 'index.html'),
      path.resolve(__dirname, '../index.html'),
      path.resolve(__dirname, '../../index.html'),
    ];

    let html = '';
    let foundPath = '';

    for (const p of possiblePaths) {
      if (fs.existsSync(p)) {
        html = fs.readFileSync(p, 'utf8');
        foundPath = p;
        break;
      }
    }

    if (!html) {
      throw new Error(`Could not find index.html in any of: ${possiblePaths.join(', ')}`);
    }

    // Replace placeholders
    html = html.replace(/__TITLE__/g, title);
    html = html.replace(/__DESCRIPTION__/g, description);
    html = html.replace(/__IMAGE__/g, image);
    html = html.replace(/__URL__/g, url);
    html = html.replace(/__TYPE__/g, type);

    res.setHeader('Content-Type', 'text/html');
    res.setHeader('X-SEO-Path', foundPath); // Debug header
    return res.status(200).send(html);
  } catch (error: any) {
    console.error('SEO Handler Error:', error);
    // Fallback to original index.html if something goes wrong
    try {
        const html = fs.readFileSync(path.join(process.cwd(), 'index.html'), 'utf8');
        return res.status(200).send(html);
    } catch (e) {
        return res.status(500).send('Internal Server Error');
    }
  }
}
