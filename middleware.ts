import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
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
    return NextResponse.rewrite(url);
  }

  return NextResponse.next();
}

// Ensure middleware doesn't run on static assets
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - assets (Vite static assets)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|assets|images).*)',
  ],
};
