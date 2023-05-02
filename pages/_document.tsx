import { Head, Html, Main, NextScript } from "next/document";

import pacifico from "@/font-pacifico";

export default function Document() {
  return (
    <Html lang="en" className={pacifico.variable}>
      <Head />

      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
