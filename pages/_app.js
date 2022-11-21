import Head from 'next/head';
import { MantineProvider } from '@mantine/core';
import '@styles/globals.css';
import Layout from '../components/layout/Layout';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>MovieDom</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
        <meta name="author" content="Mr. Jayson Wong" />
        <meta
          name="description"
          content="A Project of Mr. Jayson Wong a simple Movie Search App."
        />
        <meta property="og:title" content="MovieDom" />
        <meta
          property="og:description"
          content="A Project of Jayson Wong a simple Movie Search App."
        />
        <meta property="og:url" content="https://moviedom.vercel.app/" />
        <link rel="icon" href="/images/moviedom.png" />
      </Head>

      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{ colorScheme: 'light' }}
      >
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </MantineProvider>
    </>
  );
}

export default MyApp;
