import { Inter } from 'next/font/google';
import './globals.css';

import { ThemeProvider } from '@/context/ThemeContext';
import CustomCursor from '@/components/CustomCursor';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'My Portfolio | Professional Developer',
  description: 'A showcase of my skills, projects, and experiences as a professional developer.',
  openGraph: {
    title: 'My Portfolio | Professional Developer',
    description: 'A showcase of my skills, projects, and experiences as a professional developer.',
    url: 'https://my-portfolio.com',
    siteName: 'My Portfolio',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'My Portfolio',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} transition-colors duration-300`}>
        <ThemeProvider>
          {/* <CustomCursor /> */}
          <Header />
          <main>{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}