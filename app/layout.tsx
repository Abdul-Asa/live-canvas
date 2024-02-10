import type { Metadata } from "next";
import { Chivo_Mono } from "next/font/google";
import "./globals.css";
import { Provider } from "@/components/providers/jotai-provider";
import { cn } from "@/lib/utils";

const chivo = Chivo_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Live Canvas",
  description: "A live canvas for drawing and chatting with friends",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn(chivo.className, "text-black")}>
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
