import { useState, useEffect } from 'react';
import { Formik, Form as FormikForm } from 'formik';
import Router, { useRouter } from 'next/router';
import * as Yup from 'yup';
import { Form } from 'react-bootstrap';
import { ShieldAltIcon } from '../components/FontAwsomeIcons';
import { LayoutSignin } from '../components/LayoutSignin';
import { useTranslation } from '../lib/useTranslation';
import { Text, SubmitButton } from '../components/Fields';
import { useAuth } from '../lib/useAuth';

const ResetPassword = () => {
  const {
    query: { token },
  } = useRouter();
  const [displayError, setDisplayError] = useState(false);
  const { isAuthenticated, error, resetPassword, isLoading, user, signin } = useAuth();
  const [t] = useTranslation();
  const trans = 'resetPassword.form';

  const errorIncludes = string => error && error.includes(string);

  useEffect(() => {
    if (errorIncludes('missing') || errorIncludes('invalid')) {
      setDisplayError(t('resetPassword.invalidToken'));
    } else if (errorIncludes('expired')) {
      setDisplayError(t('resetPassword.expiredToken'));
    } else {
      setDisplayError(error);
    }
    // if the user is logged in, redirect to the homepage
    if (isAuthenticated) {
      Router.push('/');
    }
  }, [isAuthenticated, error]);

  return (
    <LayoutSignin title={t('resetPassword.title')}>
      <div className="pt-3 pb-3">
        <h5 className="d-flex justify-content-center align-items-center">
          <ShieldAltIcon className="text-dark mr-1" size="32" /> {t('title')}
        </h5>
        <div className="form-wrapper bg-white p-4 shadow">
          <h4>{t('resetPassword.title')}</h4>

          <Formik
            initialValues={{
              password: '88888888',
              confirmPassword: '88888888',
              token: token || '',
            }}
            validationSchema={Yup.object({
              password: Yup.string()
                .min(8, t(`${trans}.password.error`))
                .required(t(`${trans}.password.required`)),
              confirmPassword: Yup.string()
                .oneOf([Yup.ref('password'), null], t(`${trans}.confirmPassword.error`))
                .required(t(`${trans}.confirmPassword.required`)),
            })}
            onSubmit={async (values /* , formikBag */) => {
              const email = await resetPassword(values);
              await signin({ ...values, email });
            }}
          >
            <FormikForm className="register-form999">
              <Text name="password" type="password" trans={trans} />
              <Text name="confirmPassword" type="password" trans={trans} />
              <Form.Text className="text-right text-danger">{displayError}</Form.Text>
              <SubmitButton isLoading={isLoading} trans={trans} />
            </FormikForm>
          </Formik>
        </div>
        <style jsx>{`
          @media (min-width: 600px) {
            .form-wrapper {
              min-width: 400px;
              min-width: 400px;
            }
          }
        `}</style>
      </div>
    </LayoutSignin>
  );
};

export default ResetPassword;
