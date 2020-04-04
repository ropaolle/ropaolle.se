import { useEffect } from 'react';
import Router from 'next/router';
import { NextPage } from 'next';
import { Layout } from '../components/Layout';
import { useAuth } from '../lib/useAuth';

const Signout: NextPage = () => {
  const { isAuthenticated, signout } = useAuth();

  useEffect(() => {
    if (!isAuthenticated) {
      Router.push('/');
      return;
    }
    signout();
  }, [isAuthenticated]);

  return <Layout loading={isAuthenticated} />;
};

export default Signout;
