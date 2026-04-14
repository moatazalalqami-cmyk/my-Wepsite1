import type { Metadata } from "next";
import { Cairo } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/shared/ThemeProvider";

const cairo = Cairo({ subsets: ["arabic"], variable: "--font-cairo" });

export const metadata: Metadata = {
  title: "معتز العلقمي | المدونة الرسمية",
  description: "مدونة شخصية تهتم بالأدب والفكر والتقنية.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning className={cairo.variable}>
      <body className="font-arabic">
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
