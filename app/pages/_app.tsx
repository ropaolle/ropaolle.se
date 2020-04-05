import React from 'react';
import { NextPage } from 'next';
import { ToastProvider } from 'react-toast-notifications';
import { withApollo } from '../lib/apollo';
import { TranslationProvider } from '../lib/useTranslation';
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
        <TranslationProvider>
          <Component {...pageProps} />
        </TranslationProvider>
      </AuthProvider>
    </ToastProvider>
  );
};

// INFO: Is ssr: true needed?
// - https://github.com/zeit/next.js/blob/master/errors/opt-out-auto-static-optimization.md
// - message: 'You do not have access to this resource'
export default withApollo({ ssr: false })(MyApp);
