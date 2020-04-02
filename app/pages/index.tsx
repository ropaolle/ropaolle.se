// import Link from 'next/link';
import { Layout } from '../components/Layout';
// import { StatusIcon } from '../components/StatusIcon';
import { useTranslation } from '../lib/useTranslation';
// import { useWebsocket } from '../lib/useWebsocket';
import { useAuth } from '../lib/useAuth';

const Home = () => {
  const { user } = useAuth();
  // const [{ state3cx }] = useWebsocket();
  const isAuthenticated = !!user;
  const [t] = useTranslation();

  return (
    <Layout mainClass="main">
      <div className="text-center">
        <h2>Hallå</h2>
        {isAuthenticated && <small>Authenticated</small>}
        <style jsx>{`
          :global(.main) {
            display: grid;
            align-items: center;
            justify-content: center;
          }
        `}</style>
      </div>
    </Layout>
  );
};

export default Home;
