import { createContext, useReducer, useContext, useEffect } from 'react';
import NextLink from 'next/link';
import { useAuth } from '../lib/useAuth';

import SV from '../locales/sv';
import EN from '../locales/en';

const translations = {
  sv: SV,
  en: EN,
};

const initialState = {
  langCode: 'sv',
  translate: translations.sv,
};

const SET_LANGUAGE = 'SET_LANGUAGE';

export const setLanguage = payload => ({ type: SET_LANGUAGE, payload });

const TranslationContext = createContext();

const translationReducer = (state, action) => {
  switch (action.type) {
    case SET_LANGUAGE:
      return {
        ...state,
        langCode: action.payload,
        translate: translations[action.payload],
      };
    default:
      return state;
  }
};

export const TranslationProvider = ({ children }) => {
  const [state, dispatch] = useReducer(translationReducer, initialState);
  return (
    <TranslationContext.Provider value={[state, dispatch]}>
      <SetLanguage dispatch={dispatch} />
      {children}
    </TranslationContext.Provider>
  );
};

export const SetLanguage = ({ dispatch }) => {
  const { user } = useAuth();
  const { langCode } = user || { langCode: 'sv' };

  useEffect(() => {
    if (langCode) {
      dispatch(setLanguage(langCode));
    }
  }, [langCode]);

  return null;
};

// Get nested from dot string, e.g. 'a.b.c.
const getNestedObject = (nestedObj, pathArr) => {
  return pathArr.reduce(
    (obj, key) => (obj && obj[key] !== 'undefined' ? obj[key] : undefined),
    nestedObj
  );
};

const Link = ({ href, title, text, target }) =>
  href.includes('://') ? (
    <a href={href} target={target} title={title} rel="noopener">
      {text}
    </a>
  ) : (
    <NextLink href={href} passHref>
      <a target={target} title={title}>
        {text}
      </a>
    </NextLink>
  );

const insertLinks = (val, params) => {
  const withLinks = [];
  const regex = /{{(.*?)}}/g;
  let match = regex.exec(val);
  let start = 0;

  while (match) {
    const param = params[match[1]];
    if (param && typeof param === 'object') {
      withLinks.push(val.substring(start, match.index));
      withLinks.push(<Link {...param} key={start} />);
      start = match.index + match[0].length;
    }
    match = regex.exec(val);
  }

  if (withLinks.length > 0) {
    withLinks.push(val.substring(start));
    return withLinks;
  }

  return val;
};

// Replace params 'String {{param}}'.
const replaceParams = (val, params = []) => {
  if (!val) {
    return;
  }

  for (const key in params) {
    const element = params[key];
    if (key && element && typeof element !== 'object') {
      const regEx = new RegExp(`{{${key}}}`, 'g');
      val = val.replace(regEx, element);
    }
  }

  return insertLinks(val, params);
};

export const useTranslation = () => {
  const [{ translate, langCode }, dispatch] = useContext(TranslationContext);

  const t = (path, defaultValue, params) => {
    const val = replaceParams(path && getNestedObject(translate, path.split('.')), params);

    if (val) {
      return val;
    } else if (defaultValue || defaultValue === '') {
      return defaultValue;
    }

    return path;
  };

  return [t, dispatch, langCode];
};
