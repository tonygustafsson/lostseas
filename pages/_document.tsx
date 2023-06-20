import { Head, Html, Main, NextScript } from "next/document"

import { actor, almendra } from "@/fonts"

const Document = () => (
  <Html lang="en" className={`${almendra.variable} ${actor.variable}`}>
    <Head />

    <body>
      <Main />
      <NextScript />
    </body>
  </Html>
)

export default Document
