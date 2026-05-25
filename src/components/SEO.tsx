import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article';
}

const DEFAULT_TITLE = "URTC 2026";
const DEFAULT_DESCRIPTION = "Official website of the Rotary Club of Unnao Royal Teachers' Championship. Celebrating cricket and uniting educators.";
const DEFAULT_IMAGE = "https://unnaoteacherscricketclub.xyz/social-preview/home.jpg";
const DEFAULT_URL = "https://unnaoteacherscricketclub.xyz";

export default function SEO({ 
  title = DEFAULT_TITLE, 
  description = DEFAULT_DESCRIPTION, 
  image = DEFAULT_IMAGE, 
  url = DEFAULT_URL, 
  type = 'website' 
}: SEOProps) {
  const siteTitle = title === DEFAULT_TITLE ? title : `${title} | UTPL`;
  
  // Ensure image is absolute
  const absoluteImage = image.startsWith('http') ? image : `${DEFAULT_URL}${image.startsWith('/') ? '' : '/'}${image}`;
  const absoluteUrl = url.startsWith('http') ? url : `${DEFAULT_URL}${url.startsWith('/') ? '' : '/'}${url}`;

  return (
    <Helmet>
      {/* Standard Meta Tags */}
      <title>{siteTitle}</title>
      <meta name="description" content={description} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={absoluteUrl} />
      <meta property="og:title" content={siteTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={absoluteImage} />
      <meta property="og:image:secure_url" content={absoluteImage} />
      <meta property="og:image:type" content="image/jpeg" />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={absoluteUrl} />
      <meta name="twitter:title" content={siteTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={absoluteImage} />
      
      {/* WhatsApp Specific */}
      <meta property="og:site_name" content="UTPL Unnao" />
    </Helmet>
  );
}
