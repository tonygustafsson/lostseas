import { Head, Html, Main, NextScript } from "next/document"

import pacifico from "@/font-pacifico"

const Document = () => (
  <Html lang="en" className={pacifico.variable}>
    <Head />

    <body className="bg-black text-white">
      <Main />
      <NextScript />
    </body>
  </Html>
)

export default Document
