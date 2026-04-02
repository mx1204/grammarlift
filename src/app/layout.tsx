import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Script from "next/script";

export const metadata: Metadata = {
  title: "GrammarLift | AI-Powered English Grammar Improvement",
  description: "GrammarLift is an AI-powered educational platform designed for English language learners. It features an adaptive placement quiz aligned with the Common European Framework of Reference for Languages (CEFR), covering levels A1 through C2. The system provides real-time, level-aware feedback on writing scenarios, helping users improve grammar precision and stylistic nuance through personalized AI-driven insights and comprehensive rule libraries.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="google-site-verification" content="-QdxxHSkPMLIdELxwTb4iCBXfld-wpI2k2zgZbA_cPI" />
      </head>
      <body>
        <Script id="gtm" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','GTM-KLVTKMBC');`}
        </Script>
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-KLVTKMBC"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        <Navbar />
        <main style={{ flex: 1, paddingTop: '100px' }}>
          {children}
        </main>
        <footer className="glass" style={{ padding: '3rem 0', marginTop: '4rem' }}>
          <div className="container" style={{ textAlign: 'center', color: 'var(--text-muted)' }}>
            <p>&copy; 2026 GrammarLift. All rights reserved.</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
