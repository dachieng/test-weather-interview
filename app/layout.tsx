"use client";

import { Provider } from "react-redux";

import store from "@/config";

import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body className={`${inter.className} bg-[#f9fafb]`}>
        <div className='overflow-x-hidden'>
          <Provider store={store}>{children}</Provider>
        </div>
      </body>
    </html>
  );
}
