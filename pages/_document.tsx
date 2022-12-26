import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html className="scroll-smooth" lang="en">
      <Head>
        <meta name="description" content="Randomly select a hololive member" />
        <meta property="og:title" content="holomem randomizer"></meta>
        <meta
          property="og:description"
          content="Randomly select a hololive member"
        ></meta>
        <meta property="og:type" content="website"></meta>
        <meta property="og:locale" content="en_US" />
        <link rel="icon" href="https://favmoji.asheeshh.ga/🎲" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
