import { Head, Html, Main, NextScript } from "next/document"

import { almendra, andika } from "@/fonts"

const Document = () => (
  <Html lang="en" className={`${almendra.variable} ${andika.variable}`}>
    <Head />

    <body>
      <Main />
      <NextScript />
    </body>
  </Html>
)

export default Document
