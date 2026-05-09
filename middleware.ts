export default function middleware(request: Request) {
  const url = new URL(request.url);
  const path = url.pathname;

  // We only want to handle the main pages that need SEO
  // Avoid handling static assets (images, js, css)
  if (
    path === '/' || 
    path === '/news' || 
    path.startsWith('/news/') || 
    path === '/contact' || 
    path === '/sponsors'
  ) {
    // Rewrite to our SEO handler API
    url.pathname = '/api/seo-handler';
    url.searchParams.set('originalPath', path);
    if (path.startsWith('/news/')) {
        const slug = path.replace('/news/', '');
        url.searchParams.set('slug', slug);
    }
    return new Response(null, {
      headers: {
        'x-middleware-rewrite': url.toString(),
      },
    });
  }

  // Pass through for everything else
  return new Response(null, {
    headers: {
      'x-middleware-next': '1',
    },
  });
}

// Ensure middleware doesn't run on static assets
export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|assets|images).*)',
  ],
};
