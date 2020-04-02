import { ReactNode } from 'react';
import { Container } from 'react-bootstrap';
import { Header } from './Header';
import { Footer } from './Footer';
import { Meta } from './Meta';
import { SpinnerIcon } from '../components/FontAwsomeIcons';
import { useTranslation } from '../lib/useTranslation';
import { useAuth } from '../lib/useAuth';

interface Props {
  children?: ReactNode;
  title?: string;
  mainClass?: string;
  loading?: boolean;
}

export const Layout = ({ children, title, mainClass, loading }: Props) => {
  const { user } = useAuth();
  const [t] = useTranslation();

  return (
    <>
      <Meta title={title} />
      <>
        <div className="wrapper">
          <header>
            <Header user={user} />
          </header>
          <main className={mainClass}>
            <Container>{children}</Container>
          </main>
          <footer>
            <Footer />
          </footer>
        </div>

        {loading && (
          <div className="overlay">
            <div className="overlay-content">
              <SpinnerIcon color="#aaa" size="36" />
            </div>
          </div>
        )}

        <style jsx>{`
          .wrapper {
            display: grid;
            grid-template-rows: minmax(4rem, max-content) auto minmax(4rem, max-content);
            height: 100vh;
            grid-template-columns: 1fr;
            grid-template-areas:
              'header'
              'main'
              'footer';
            background-color: #fff;
            color: #444;
          }

          header {
            grid-area: header;
            background-color: #444;
            display: flex;
            align-items: center;
          }

          main {
            grid-area: main;
            background-color: #fff;
            padding: 40px 0;
          }

          footer {
            grid-area: footer;
            background-color: #e7e7e7;
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 20px;
          }

          .overlay {
            display: ${loading ? 'block' : 'none'};
            height: 100%;
            width: 100%;
            position: fixed;
            z-index: 1;
            top: 0;
            left: 0;
            background-color: rgba(0, 0, 0, 0.2);
            overflow-x: hidden;
          }

          .overlay-content {
            position: relative;
            top: 50%;
            width: 100%;
            text-align: center;
          }
        `}</style>
      </>
    </>
  );
};