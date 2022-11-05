import Head from 'next/head'

const Meta: React.FC = () => {
  return (
    <Head>
      <title>gm web3</title>
      <meta name="description" content="gm" />
      <link rel="icon" href="/favicon.ico" />
      <meta property="og:title" content="web3 scaffold" />
      <meta property="og:description" content="gm" />
      <meta property="og:image" content="/og-image.jpg" />
      <meta name="twitter:card" content="summary_large_image" />
    </Head>
  )
}

export default Meta
