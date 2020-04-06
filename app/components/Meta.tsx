import Head from 'next/head';

export const Meta = ({ description, title }: { description?: string; title?: string }) => {
  return (
    <Head>
      <title>{title || 'RopaOlle.se'}</title>
      <meta key="0" name="description" content={description || 'RopaOlle.se dungeon.'} />
      <meta key="1" name="msapplication-TileColor" content="#b91d47" />
      <meta key="2" name="theme-color" content="#da532c" />
      <meta key="3" name="apple-mobile-web-app-title" content="RopaOlle.se" />
      <meta key="4" name="application-name" content="RopaOlle.se" />
      <link key="5" rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      <link key="6" rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link key="7" rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      <link key="8" rel="manifest" href="/site.webmanifest" />
      <link key="9" rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
    </Head>
  );
};
