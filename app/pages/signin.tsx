import { useState, useEffect } from 'react';
import Router from 'next/router';
import { NextPage } from 'next';
import { Formik, Form as FormikForm } from 'formik';
import * as Yup from 'yup';
import { LayoutSignin } from '../components/LayoutSignin';
import { ShieldAltIcon } from '../components/FontAwsomeIcons';
import { useAuth } from '../lib/useAuth';
import { useTranslation } from '../lib/useTranslation';
import { Text, /* Checkbox,  */ SubmitButton } from '../components/Fields';
import { Form } from 'react-bootstrap';

const Signin: NextPage = () => {
  const [t] = useTranslation();
  const [displayError, setDisplayError] = useState(false);
  const { isAuthenticated, signin, user, isLoading, error } = useAuth();

  const trans = 'signin.form';

  const errorIncludes = (string: string) => error && error.includes(string);

  useEffect(() => {
    if (
      errorIncludes('[passwordAuth:identity:notFound]') ||
      errorIncludes('[passwordAuth:secret:mismatch]')
    ) {
      setDisplayError(t('signin.wrongCredentials'));
    } else if (errorIncludes('[passwordAuth:identity:userBlocked]')) {
      setDisplayError(t('signin.userIsBlocked'));
    } else {
      setDisplayError(error);
    }

    // if the user is logged in, redirect to the homepage
    if (isAuthenticated) {
      Router.push('/');
    }
  }, [isAuthenticated, error]);

  return (
    <LayoutSignin title={t('signin.title')}>
      <div className="pt-3 pb-3">
        <h5 className="d-flex justify-content-center align-items-center">
          <ShieldAltIcon className="text-dark mr-1" size="32" /> {t('title')}
        </h5>
        <div className="form-wrapper bg-white p-4 shadow">
          <h4>{t('signin.title')}</h4>
          <Formik
            initialValues={{
              email: '',
              password: '',
            }}
            validationSchema={Yup.object({
              password: Yup.string().min(8, `${trans}.password.error`),
            })}
            onSubmit={async (values /* , formikBag */) => {
              await signin(values);
            }}
          >
            <FormikForm>
              <Text name="email" type="email" trans={trans} />
              <Text name="password" type="password" trans={trans} />
              <Form.Text className="text-right text-danger">{displayError}</Form.Text>
              {/* <div className="d-flex justify-content-between align-items-end mt-2">
                <Checkbox name="rememberMe" trans={trans} /> */}
              <SubmitButton variant="dark" isLoading={isLoading} trans={trans} />
              {/* </div> */}
            </FormikForm>
          </Formik>
        </div>
        <div className="text-center">
          <small>
            {t('signin.forgotPassword.text', null, {
              year: new Date().getFullYear(),
              link: t('signin.forgotPassword.link'),
            })}
          </small>
        </div>
      </div>
      <style jsx>{`
        @media (min-width: 600px) {
          .form-wrapper {
            min-width: 400px;
          }
        }
      `}</style>
    </LayoutSignin>
  );
};

export default Signin;
