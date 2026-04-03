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
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
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
            <div style={{ marginTop: '1.5rem', display: 'flex', justifyContent: 'center' }}>
              <a 
                href="mailto:grammarlift@gmail.com" 
                className="glass footer-contact-btn"
                style={{ 
                  display: 'inline-flex', 
                  alignItems: 'center', 
                  gap: '0.75rem', 
                  padding: '0.8rem 1.5rem', 
                  borderRadius: '30px', 
                  textDecoration: 'none', 
                  color: 'var(--foreground)', 
                  fontWeight: 600,
                  fontSize: '0.95rem',
                  transition: 'all 0.3s ease',
                  border: '1px solid var(--card-border)',
                  boxShadow: '0 4px 15px rgba(0,0,0,0.05)'
                }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style={{ color: 'var(--primary)' }}>
                  <rect width="20" height="16" x="2" y="4" rx="2"/>
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
                </svg>
                <span>Email Support</span>
              </a>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
