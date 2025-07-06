import { Inter } from "next/font/google";
import "./globals.css";

import { ThemeProvider } from "@/context/ThemeContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Mukesh Bhattarai | Frontend Developer & MERN Stack Expert",
  description:
    "Mukesh Bhattarai's portfolio — showcasing skills in React, Next.js, and MERN stack with real-world projects and frontend expertise.",
  keywords: [
    "Mukesh Bhattarai",
    "Madhusudhan Bhattarai",
    "Frontend Developer",
    "MERN Stack Developer",
    "React Developer",
    "Next.js Portfolio",
    "JavaScript Developer",
    "Web Developer Nepal",
    "Fullstack Developer",
    "MongoDB",
    "Node.js",
    "Express.js",
    "Frontend Portfolio",
    "Hire Developer Nepal",
  ],
  metadataBase: new URL("https://mukeshbhattarai.com"),
  alternates: {
    canonical: "https://mukeshbhattarai.com",
  },
  openGraph: {
    title: "Mukesh Bhattarai | Frontend Developer & MERN Stack Expert",
    description:
      "Discover the professional portfolio of Mukesh Bhattarai — showcasing frontend development skills, MERN stack projects, and career achievements.",
    url: "https://mukeshbhattarai.com",
    siteName: "Mukesh Bhattarai Portfolio",
    images: [
      {
        url: "/images/profile.png",
        width: 1200,
        height: 630,
        alt: "Mukesh Bhattarai Portfolio Preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mukesh Bhattarai | Frontend Developer & MERN Stack Expert",
    description:
      "Explore the portfolio of Mukesh Bhattarai, showcasing expertise in React, Next.js, Node.js, and modern frontend technologies.",
    images: ["/images/profile.png"],
    creator: "@mukes_dev",
  },
  icons: {
    icon: "/images/profile.png",
    shortcut: "/images/profile.png",
    apple: "/images/profile.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* ✅ Favicon manually declared here */}
        <meta name="publisher" content="Mukesh Bhattarai" />
        <meta name="robots" content="index, follow" />
         <script
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-K4RCTD55');
            `,
          }}
        />
          <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-YKWSY86JZW"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-YKWSY86JZW');
          `}
        </Script>
      </head>
      <body className={`${inter.className} transition-colors duration-300`}>
         <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-K4RCTD55"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          ></iframe>
        </noscript>
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
