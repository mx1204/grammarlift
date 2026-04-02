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
        <main style={{ flex: 1, paddingTop: '85px' }}>
          {children}
        </main>
        <footer className="glass" style={{ padding: '3rem 0', marginTop: '4rem' }}>
          <div className="container" style={{ textAlign: 'center', color: 'var(--text-muted)' }}>
            <p style={{ marginBottom: '0.5rem' }}>&copy; 2026 GrammarLift. All rights reserved.</p>
            <p style={{ fontSize: '0.9rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style={{ opacity: 0.7 }}><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
              Questions? Contact us at <a href="mailto:grammarlift@gmail.com" style={{ color: 'var(--primary)', textDecoration: 'none', fontWeight: 600 }}>grammarlift@gmail.com</a>
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
