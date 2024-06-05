import "./globals.css";
import { Inter as FontSans } from "next/font/google";
import type { Metadata } from "next";
import { cn } from "@/lib/utils";
import Navbar from "@/components/header/Navbar";
import Footer from "@/components/footer/Footer";
import { Toaster } from "sonner";
import AuthProvider from "@/provider/AuthProvider";
import { ThemeProvider } from "@/provider/theme-provider";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});
export const metadata: Metadata = {
  title: "Blood Donation - Save Lives, Donate Blood!",
  description:
    "Blood Donation is a user-centric platform designed to facilitate blood donations by connecting donors with recipients. Join us to save lives by donating blood.",
};

export type RootLayoutProps = {
  children: React.ReactNode;
};
export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
       
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar></Navbar>
          {children}
          <Footer></Footer>
          <Toaster richColors />
        </ThemeProvider>
      </body>
    </html>
  );
}
