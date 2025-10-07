import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "./Toolkit/provider";
import ThemeProvider from "./Service/theme";
import AnalyticsTracker from "./Service/analysisTracker";
import Script from "next/script";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Mubark Khan | Flight Booking Software & Travel App Projects",
  description:
    "Portfolio of Mubark Khan showcasing full-stack flight booking application using Amadeus API, available for freelancing and collaborations.",
  openGraph: {
    title: "Mubark Khan | Full Stack Developer",
    description: "Portfolio of Mubark Khan, showcasing projects and skills.",
    url: "https://mk01portfolio.vercel.app/",
    siteName: "Mubark Portfolio",
    images: [
      {
        url: "https://mk01portfolio.vercel.app/og-image.png",
        width: 1200,
        height: 630,
        alt: "Mubark Khan Portfolio",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mubark Khan Portfolio",
    description: "Full Stack Developer & React.js or Node.js Expert",
    images: ["https://mk01portfolio.vercel.app/og-image.png"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="lenis lenis-smooth">
      <head>
        <Script
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=G-47D0RWH4TS"
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-47D0RWH4TS');
            `,
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>
          <ThemeProvider>
            <AnalyticsTracker/>
            {children}
          </ThemeProvider>
        </Providers>
      </body>
    </html>
  );
}
