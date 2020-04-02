import {
  CheckCircleIcon,
  ExclamationTriangleIcon,
  QuestionCircleIcon,
} from '../components/FontAwsomeIcons';
import { useTranslation } from '../lib/useTranslation';

export const StatusIcon = ({
  state: orgState,
  showText = false,
}: {
  state: string;
  showText?: boolean;
}) => {
  const [t] = useTranslation();
  const state = orgState || 'unknown';

  const icon = (icon: string, color: string) => {
    switch (icon) {
      case 'CheckCircleIcon':
        return <CheckCircleIcon size="32" color={color} />;
      case 'ExclamationTriangleIcon':
        return <ExclamationTriangleIcon size="32" color={color} />;
      case 'QuestionCircleIcon':
        return <QuestionCircleIcon size="32" color={color} />;
      default:
        return <QuestionCircleIcon size="32" color={color} />;
    }
  };

  const path = `statusIcons.${state}`;

  return (
    <div
      className="d-flex align-items-center justify-content-center"
      style={{ color: t(`${path}.color`) }}
      title={t(`${path}.title`)}
    >
      {icon(t(`${path}.icon`), t(`${path}.color`))}
      {showText && <div className="pl-2">{t(`${path}.text`)}</div>}
    </div>
  );
};
