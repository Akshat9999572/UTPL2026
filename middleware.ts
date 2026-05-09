export default function middleware(request: Request) {
  const url = new URL(request.url);
  const path = url.pathname;
  const userAgent = request.headers.get('user-agent') || '';

  // List of known social crawlers that need server-side SEO tags
  const isBot = /WhatsApp|facebookexternalhit|Twitterbot|LinkedInBot|TelegramBot|Slackbot|Discordbot/i.test(userAgent);

  if (isBot) {
    // Check if it's a page that needs dynamic SEO
    if (
      path === '/' || 
      path === '/news' || 
      path.startsWith('/news/') || 
      path === '/contact' || 
      path === '/sponsors'
    ) {
      // Rewrite to our SEO handler API
      const seoUrl = url.clone();
      seoUrl.pathname = '/api/seo-handler';
      seoUrl.searchParams.set('originalPath', path);
      
      if (path.startsWith('/news/')) {
        const slug = path.replace('/news/', '');
        seoUrl.searchParams.set('slug', slug);
      }
      
      return new Response(null, {
        headers: {
          'x-middleware-rewrite': seoUrl.toString(),
        },
      });
    }
  }

  // Pass through for everyone else (humans and non-social bots)
  return new Response(null, {
    headers: {
      'x-middleware-next': '1',
    },
  });
}

export const config = {
  matcher: [
    // Only run middleware on page requests, not assets
    '/((?!api|_next/static|_next/image|favicon.ico|assets|images|.*\\..*).*)',
  ],
};
