import Head from 'next/head'

const Meta: React.FC = () => {
  return (
    <Head>
      <title>Melo Cafe</title>
      <meta name="description" content="Lightweight multisigs for NFT communities" />
      <link rel="shortcut icon" href="/favicon.ico" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      <link rel="preload" href="/fonts/Fredoka-Regular.ttf" as="font" crossOrigin="" />
      <link rel="preload" href="/fonts/Fredoka-Medium.ttf" as="font" crossOrigin="" />
      <link rel="preload" href="/fonts/Fredoka-SemiBold.ttf" as="font" crossOrigin="" />
      <link rel="preload" href="/fonts/Fredoka-Bold.ttf" as="font" crossOrigin="" />
      <meta property="og:title" content="Melo Cafe" />
      <meta property="og:description" content="Lightweight multisigs for NFT communities" />
      <meta property="og:image" content="/og-image.png" />
      <meta name="twitter:card" content="summary_large_image" />
    </Head>
  )
}

export default Meta
