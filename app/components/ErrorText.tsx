import { useTranslation } from '../lib/useTranslation';

export const ErrorText = ({
  error,
  type,
  right,
}: {
  error: boolean;
  type: string;
  right?: boolean;
}) => {
  const [t] = useTranslation();

  return error ? (
    <div className={`text-danger mb-2 ${right && 'text-right'}`}>{t(`error.types.${type}`)}</div>
  ) : null;
};
