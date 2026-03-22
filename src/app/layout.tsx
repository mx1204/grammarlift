import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "GrammarLift | AI-Powered English Grammar Improvement",
  description: "Personalized, level-appropriate grammar practice and feedback for English learners.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main style={{ flex: 1 }}>
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
