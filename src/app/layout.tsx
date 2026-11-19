import type { Metadata } from "next";
import PortfolioNav from "../components/PortfolioNav";
import "./globals.css";

export const metadata: Metadata = {
  title: "Rafi Albani Syafarel | Software Engineer",
  description: "Personal portfolio of Rafi Albani Syafarel, a Software Engineering student.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <a className="skip-link" href="#main-content">Skip to content</a>
        <PortfolioNav />
        <div id="main-content">{children}</div>
      </body>
    </html>
  );
}
