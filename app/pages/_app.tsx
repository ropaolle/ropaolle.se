import React from 'react';
import { NextPage } from 'next';
import { ToastProvider } from 'react-toast-notifications';
import { withApollo } from '../lib/apollo';
// import { AuthProvider } from '../lib/authentication';
// import { GlobalStateProvider } from '../lib/useGlobalState';
import { TranslationProvider } from '../lib/useTranslation';
// import { WebsocketProvider } from '../lib/useWebsocket';
import { AuthProvider } from '../lib/useAuth';

import '../css/bootstrap.min.css';
import '../css/styles.css';

interface Props {
  Component?: any;
  pageProps: any;
}

const MyApp: NextPage<Props> = ({ Component, pageProps }) => {
  return (
    <ToastProvider autoDismiss>
      <AuthProvider>
        {/* <GlobalStateProvider> */}
        <TranslationProvider>
          {/* <WebsocketProvider> */}
          <Component {...pageProps} />
          {/* </WebsocketProvider> */}
        </TranslationProvider>
        {/* </GlobalStateProvider> */}
      </AuthProvider>
    </ToastProvider>
  );
};

// ssr: true -> https://github.com/zeit/next.js/blob/master/errors/opt-out-auto-static-optimization.md
export default withApollo({ ssr: true })(MyApp);
