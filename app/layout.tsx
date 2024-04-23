import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "../components/header/header";
import Providers from "@/components/Providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Next-Ecommerce",
  description: "Next-Ecommerce",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-grow container mx-auto px-4">{children}</main>
            <footer className="footer  footer-center p-4 bg-base-400 text-base-content ">
              <p>Copyright &copy; {new Date().getFullYear()} - All right reserved</p>
            </footer>
          </div>
        </Providers>
      </body>
    </html>
  );
}
