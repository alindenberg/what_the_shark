import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Navbar from "@/components/Navbar";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <div style={{ position: 'sticky', top: 0, zIndex: 99 }}>
        <Navbar />
      </div>
      <Component {...pageProps} />
    </>
  );
}

