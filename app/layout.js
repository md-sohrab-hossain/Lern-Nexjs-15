import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { StoreProvider } from "@/store";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Eventry - Event Management",
  description: "Modern event management platform with Next.js",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body className={inter.className}>
        <StoreProvider>
          <Navbar />
          <main className="py-8">
            {children}
          </main>
        </StoreProvider>
      </body>
    </html>
  );
}