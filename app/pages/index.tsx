import { Layout } from '../components/Layout';
import { useQuery } from 'react-apollo';
import { GET_USER, User } from '../graphql/users';

const Home = () => {
  const { data } = useQuery<{ authenticatedUser?: User }>(GET_USER);
  const isAuthenticated = !!data?.authenticatedUser;

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
