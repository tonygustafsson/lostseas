import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import AuthPanel from "@/components/AuthPanel";
import { useEffect } from "react";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <SessionProvider>
      <AuthPanel />

      <Component {...pageProps} />
    </SessionProvider>
  );
}
