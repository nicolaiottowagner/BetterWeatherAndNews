import type { Metadata } from "next";
import { Barlow, DM_Sans } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/ui/Header";
import { ThemeProvider } from "@/components/ui/ThemeProvider";

const barlow = Barlow({
  variable: "--font-barlow",
  weight: ["500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],

  display: "swap",
});

export const metadata: Metadata = {
  title: "Better Weather and News App",
  description:
    "Dagens danske overskrifter og det aktuelle vejr i Aarhus — samlet ét sted.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    // suppressHydrationWarning is required: next-themes sets the class on <html>
    // via a blocking script before React hydrates, which is how the flash of
    // wrong theme is avoided. It only suppresses one level deep.
    <html
      lang="da"
      suppressHydrationWarning
      className={`${dmSans.variable} ${barlow.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Header />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
