import { useEffect } from 'react';
import Router from 'next/router';
import { NextPage } from 'next';
import { Layout } from '../components/Layout';
import { useAuth } from '../lib/useAuth';
import { useWebsocket } from '../lib/useWebsocket';

const Signout: NextPage = () => {
  const { isAuthenticated, signout } = useAuth();
  const [{ ws }] = useWebsocket();

  useEffect(() => {
    if (!isAuthenticated) {
      if (ws && typeof ws.send === 'function') {
        ws.send(JSON.stringify({ action: 'logout' }));
      }
      Router.push('/');
      return;
    }
    signout();
  }, [isAuthenticated]);

  return <Layout loading={isAuthenticated} />;
};

export default Signout;
