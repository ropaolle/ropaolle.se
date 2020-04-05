import React from 'react';
import { NavDropdown } from 'react-bootstrap';
import { FlagSvIcon, FlagGbIcon } from './FontAwsomeIcons';
import { useTranslation, setLanguage } from '../lib/useTranslation';
import { useQuery, useMutation } from 'react-apollo';
import { GET_USER, User, UPDATE_USER } from '../graphql/users';

export const ChangeLanguage = () => {
  const { data } = useQuery<{ authenticatedUser?: User }>(GET_USER);
  const user = data?.authenticatedUser;
  const [t, dispatch, langCode] = useTranslation();
  const [updateUser] = useMutation(UPDATE_USER);

  const updateLanguage = (langCode: string) => {
    if (user) {
      updateUser({ variables: { id: user.id, data: { langCode: langCode } } });
    }
    dispatch(setLanguage(langCode));
  };

  return (
    <div>
      <NavDropdown title={t(`langCode.${langCode}`)} id="basic-nav-dropdown">
        <NavDropdown.Item href="#" onClick={() => updateLanguage('sv')}>
          <FlagSvIcon size="24" /> <span>{t('language.sv')}</span>
        </NavDropdown.Item>
        <NavDropdown.Item href="#" onClick={() => updateLanguage('en')}>
          <FlagGbIcon size="24" /> <span>{t('language.en')}</span>
        </NavDropdown.Item>
      </NavDropdown>
      <style jsx>{`
        div :global(.dropdown-toggle) {
          color: rgba(255, 255, 255, 0.5);
        }
        span {
          vertical-align: middle;
        }
      `}</style>
    </div>
  );
};
