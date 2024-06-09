import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import "./globals.css";
import 'primeicons/primeicons.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import AppProvider from "@/lib/providers/primerProvider";
import Navbar from "@/lib/components/navbar";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "WowShop",
  description: "WowShop is a simple webpage to handle e-commorce with cart.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`min-h-screen w-full  ${inter.className} `}>
      <AppProvider>
        <Navbar/>
          {children}
          <ToastContainer
            position="top-left"
            autoClose={5000}
            hideProgressBar={true}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnHover
            theme="light"
          />
        </AppProvider>
        </body>
    </html>
  );
}
