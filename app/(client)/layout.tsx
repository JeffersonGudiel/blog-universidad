import type { Metadata } from "next";
import { Fira_Code } from "next/font/google";
import "./globals.css";
import Navbar from "../components/Navbar";

import { Provider } from "../utils/Provider";

const firaCode = Fira_Code({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Blog Evolución de la Ciencia y Tecnología",
  description:
    "Este es un blog universitario sobre el curso de evolución de la ciencia y tecnología",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${firaCode.className} h-full  dark:bg-slate-950 dark:text-amber-50 dark:selection:bg-purple-500`}>
        <Provider>
          <Navbar />
          <main className="mx-auto max-w-5xl px-6">{children}</main>
        </Provider>
      </body>
    </html>
  );
}
