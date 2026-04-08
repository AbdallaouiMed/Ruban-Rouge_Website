import createMiddleware from 'next-intl/middleware';
import { locales, defaultLocale } from './lib/i18n';

export default createMiddleware({
  locales,
  defaultLocale,
  localePrefix: 'as-needed', // Don't prefix default locale (fr)
});

export const config = {
  // Match all pathnames except for
  // - /api (API routes)
  // - /_next (Next.js internals)
  // - /_vercel (Vercel internals)
  // - /favicon.ico, /robots.txt, /sitemap.xml (static files)
  matcher: ['/((?!api|_next|_vercel|favicon.ico|robots.txt|sitemap.xml|.*\\..*).*)'],
};
