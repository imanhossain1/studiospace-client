
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: {
    default: "StudioSpace | Discover Creative Studios",
    template: "%s | StudioSpace",
  },
  description:
    "Discover and book creative studios, photography spaces, music recording rooms, podcast lounges and unique workspaces with StudioSpace.",
  keywords: [
    "StudioSpace",
    "Creative Studio",
    "Photography Studio",
    "Music Studio",
    "Podcast Studio",
    "Studio Booking",
    "Creative Workspace",
  ],
  applicationName: "StudioSpace",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${jakarta.variable} h-full antialiased`}>
      <body className="min-h-screen flex flex-col font-sans">

        <ToastContainer position="top-right" />

        <Navbar />

        <div className="flex-1">
          {children}
        </div>

        <Footer />

      </body>
    </html>
  );
}
