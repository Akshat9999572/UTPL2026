import { VercelRequest, VercelResponse } from '@vercel/node';
import { createClient } from '@sanity/client';
import { htmlTemplate } from './html-template.js';

const client = createClient({
  projectId: 'h9r93g5z',
  dataset: 'production',
  apiVersion: '2024-03-01',
  useCdn: true,
});

const SITE_URL = 'https://unnaoteacherscricketclub.xyz';
const DEFAULT_IMAGE = `${SITE_URL}/social-preview/home.jpg`;

const pageMeta: Record<string, { title: string; description: string; image: string }> = {
  '/': {
    title: "Rotary Club of Unnao Royal Teachers' Championship",
    description: "Official website of the Rotary Club of Unnao Royal Teachers' Championship. Celebrating cricket and uniting educators in Unnao.",
    image: '/social-preview/home.jpg',
  },
  '/news': {
    title: 'Latest News | UTPL 2026',
    description: "Stay updated with the latest match reports, team news, and announcements from the Unnao Teachers' Cricket Championship.",
    image: '/social-preview/news-contact.jpg',
  },
  '/downloads': {
    title: 'Downloads | UTPL 2026',
    description: 'Download official UTPL documents, the URTC rule book, anthem song, and tournament resources.',
    image: '/social-preview/downloads.jpg',
  },
  '/contact': {
    title: 'Contact | UTPL 2026',
    description: 'Get in touch with the Rotary Club of Unnao Royal Teachers Championship organizing committee.',
    image: '/social-preview/news-contact.jpg',
  },
  '/sponsors': {
    title: 'Championship Sponsors | UTPL 2026',
    description: 'Meet the sponsors and co-sponsors supporting the Rotary Club of Unnao Royal Teachers Championship.',
    image: '/social-preview/sponsors.jpg',
  },
  '/privacy-policy': {
    title: 'Privacy Policy | UTPL 2026',
    description: 'Read the privacy policy for the Rotary Club of Unnao Royal Teachers Championship website.',
    image: '/social-preview/home.jpg',
  },
};

function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const originalPath = (req.query.originalPath as string) || '/';
  const slug = req.query.slug as string;

  let title = "Rotary Club of Unnao Royal Teachers' Championship";
  let description = "Official website of the Rotary Club of Unnao Royal Teachers' Championship. Celebrating cricket and uniting educators in Unnao.";
  let image = DEFAULT_IMAGE;
  let type = "website";
  const url = `${SITE_URL}${originalPath}`;

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
    } else if (pageMeta[originalPath]) {
      const meta = pageMeta[originalPath];
      title = meta.title;
      description = meta.description;
      image = meta.image;
    }

    // Ensure image is absolute
    if (image && !image.startsWith('http')) {
      image = `${SITE_URL}${image.startsWith('/') ? '' : '/'}${image}`;
    }

    const safeTitle = escapeHtml(title);
    const safeDescription = escapeHtml(description);
    const safeImage = escapeHtml(image);
    const safeUrl = escapeHtml(url);

    // Inject metadata into the template
    let html = htmlTemplate;
    
    // Replace standard meta tags
    html = html.replace(/<title>.*?<\/title>/g, `<title>${safeTitle}</title>`);
    html = html.replace(/<meta name="description" content=".*?" \/>/g, `<meta name="description" content="${safeDescription}" />`);
    
    // Replace Open Graph tags
    html = html.replace(/<meta property="og:title" content=".*?" \/>/g, `<meta property="og:title" content="${safeTitle}" />`);
    html = html.replace(/<meta property="og:description" content=".*?" \/>/g, `<meta property="og:description" content="${safeDescription}" />`);
    html = html.replace(/<meta property="og:image" content=".*?" \/>/g, `<meta property="og:image" content="${safeImage}" />`);
    html = html.replace(/<meta property="og:image:secure_url" content=".*?" \/>/g, `<meta property="og:image:secure_url" content="${safeImage}" />`);
    html = html.replace(/<meta property="og:image:type" content=".*?" \/>/g, `<meta property="og:image:type" content="image/jpeg" />`);
    html = html.replace(/<meta property="og:url" content=".*?" \/>/g, `<meta property="og:url" content="${safeUrl}" />`);
    html = html.replace(/<meta property="og:type" content=".*?" \/>/g, `<meta property="og:type" content="${type}" />`);
    
    // Replace Twitter tags
    html = html.replace(/<meta name="twitter:title" content=".*?" \/>/g, `<meta name="twitter:title" content="${safeTitle}" />`);
    html = html.replace(/<meta name="twitter:description" content=".*?" \/>/g, `<meta name="twitter:description" content="${safeDescription}" />`);
    html = html.replace(/<meta name="twitter:image" content=".*?" \/>/g, `<meta name="twitter:image" content="${safeImage}" />`);
    html = html.replace(/<meta name="twitter:url" content=".*?" \/>/g, `<meta name="twitter:url" content="${safeUrl}" />`);

    res.setHeader('Content-Type', 'text/html');
    res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate');
    return res.status(200).send(html);
  } catch (error) {
    console.error('SEO Handler Error:', error);
    // Fallback to original template on error
    return res.status(200).send(htmlTemplate);
  }
}
