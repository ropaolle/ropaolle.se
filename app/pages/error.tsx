// import Link from 'next/link';
import { useRouter } from 'next/router';
import { LayoutSignin } from '../components/LayoutSignin';
import { useTranslation } from '../lib/useTranslation';

const Home = () => {
  const [t] = useTranslation();
  const { query } = useRouter();
  const { message } = query || {};

  return (
    <LayoutSignin>
      <div className="text-center">
        <h1>{t('error.title')}</h1>
        <div>
          <h2>{t(`error.types.${message}`)}</h2>
        </div>
        <style jsx>{`
          h1 {
            display: inline-block;
            border-right: 1px solid rgba(0, 0, 0, 0.3);
            margin: 0;
            margin-right: 20px;
            padding: 10px 23px 10px 0;
            font-size: 24px;
            font-weight: 500;
            vertical-align: top;
          }
          div {
            display: inline-block;
            /* text-align: left; */
            line-height: 49px;
            height: 49px;
            /*vertical-align: middle;*/
          }
          h2 {
            font-size: 14px;
            font-weight: normal;
            line-height: inherit;
            margin: 0;
            padding: 0;
          }
        `}</style>
      </div>
    </LayoutSignin>
  );
};

export default Home;
