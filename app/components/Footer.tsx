import { useTranslation } from '../lib/useTranslation';

export const Footer = () => {
  const [t] = useTranslation();

  return (
    <div className="d-block text-center">
      <div>
        {t('footer.firstRow', null, {
          year: new Date().getFullYear(),
          ropaolle: t('footer.ropaolle'),
        })}
      </div>
    </div>
  );
};
