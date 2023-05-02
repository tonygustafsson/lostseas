import { Head, Html, Main, NextScript } from "next/document"

import pacifico from "@/font-pacifico"

const Document = () => (
  <Html lang="en" className={pacifico.variable}>
    <Head />

    <body>
      <Main />
      <NextScript />
    </body>
  </Html>
)

export default Document
