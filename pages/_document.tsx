import pacifico from "@/font-pacifico";
import { Html, Head, Main, NextScript } from "next/document";

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
