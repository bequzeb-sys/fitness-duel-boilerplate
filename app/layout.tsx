import type {Metadata} from 'next';
import { Inter, Space_Grotesk, JetBrains_Mono } from 'next/font/google';
import { ThemeProvider } from 'next-themes';
import { ErrorBoundary } from '@/app/components/ErrorBoundary';
import { setRequestLocale } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Fitness Duel | Prêt à relever de nouveaux défis ?',
  description: 'Le tableau de bord social fitness ultime pour défier ses amis au quotidien',
  metadataBase: new URL(process.env.APP_URL ?? 'https://fitness-duel.app'),
  icons: {
    icon: '/favicon.svg',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default async function RootLayout({children, params}: {children: React.ReactNode; params: Promise<{locale?: string}>}) {
  const { locale: resolvedLocale } = await params;
  const locale = resolvedLocale && routing.locales.includes(resolvedLocale as 'fr' | 'en')
    ? resolvedLocale
    : routing.defaultLocale;

  setRequestLocale(locale);
  return (
    <html lang={locale} suppressHydrationWarning className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable}`}>
      <head></head>
      <body className="bg-[#050911] text-slate-100 min-h-screen text-sans antialiased selection:bg-blue-600/30 selection:text-blue-200">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={true}>
          <ErrorBoundary>
            {children}
          </ErrorBoundary>
        </ThemeProvider>
      </body>
    </html>
  );
}
