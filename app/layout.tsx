import type { Metadata } from "next";
import { IBM_Plex_Sans } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { ClerkProvider } from "@clerk/nextjs";
import { SpeedInsights } from "@vercel/speed-insights/next"
const IBMPlex = IBM_Plex_Sans({ subsets: ["latin"],weight:['400','500','600','700'],variable:'--font-ibm-plex' });

export const metadata: Metadata = {
  title: "Eye-Frame",
  description: "An AI-powered image generator",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
    <SpeedInsights/>
    <ClerkProvider appearance={{variables:{colorPrimary:'rgb(39 185 211)'}}}>
    <html lang="en">
      <body className={cn("font-IBMPlex antialiased",IBMPlex.variable)}>
        {children}
        </body>
    </html>
    </ClerkProvider>
    </>
  );
}
