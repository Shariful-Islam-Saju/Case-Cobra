import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Toaster } from "@/components/ui/toaster";
import Provider from "@/components/Provider";
import { Recursive } from "next/font/google";

const recursive = Recursive({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Case-Cobra",
  description: "A simple e-commerse website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>

      <body className={recursive.className}>
        <Navbar />

        <main className="flex grainy-light flex-col min-h-[calc(100vh-3.5rem-1px)]">
          <div className="flex-1 flex flex-col h-full">
            <Provider>{children}</Provider>
          </div>
          <Footer />
        </main>
        <Toaster />
      </body>
    </html>
  );
}
