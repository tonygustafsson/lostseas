import "@/styles/globals.css";

import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";

const App = ({ Component, pageProps: { ...pageProps } }: AppProps) => (
  <SessionProvider>
    <Component {...pageProps} />
  </SessionProvider>
);

export default App;
