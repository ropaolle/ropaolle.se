import { useState, useEffect } from 'react';
import { Formik, Form as FormikForm } from 'formik';
import * as Yup from 'yup';
import { Form } from 'react-bootstrap';
import { ShieldAltIcon } from '../components/FontAwsomeIcons';
import { LayoutSignin } from '../components/LayoutSignin';
import { useTranslation } from '../lib/useTranslation';
import { Text, SubmitButton } from '../components/Fields';
import { useAuth } from '../lib/useAuth';

const ForgotPassword = () => {
  const [t] = useTranslation();
  const [displayMessage, setDisplayMessage] = useState(false);
  const [displayError, setDisplayError] = useState(false);
  const { error, forgotPassword, isLoading } = useAuth();
  const trans = 'forgotPassword.form';

  useEffect(() => {
    if (error && error.includes('Email does not exist')) {
      setDisplayMessage(
        t('forgotPassword.emailMissing.text', null, {
          year: new Date().getFullYear(),
          link: t('forgotPassword.emailMissing.link'),
        })
      );
    } else {
      setDisplayError(error);
    }
  }, [error]);

  return (
    <LayoutSignin title={t('forgotPassword.title')}>
      <div className="pt-3 pb-3">
        <h5 className="d-flex justify-content-center align-items-center">
          <ShieldAltIcon className="text-dark mr-1" size="32" /> {t('title')}
        </h5>
        <div className="form-wrapper bg-white p-4 shadow">
          <h4>{t('forgotPassword.title')}</h4>

          <Formik
            initialValues={{
              email: '',
            }}
            validationSchema={Yup.object({
              email: Yup.string()
                .email(t(`${trans}.email.error`))
                .required(t(`${trans}.email.required`)),
            })}
            onSubmit={async (values /* formikBag */) => {
              await forgotPassword(values);
              setDisplayMessage(t(`forgotPassword.emailSent`, null, { email: values.email }));
            }}
          >
            <FormikForm className="register-form999">
              <Text name="email" type="email" trans={trans} />
              <Form.Text className="text-right text-danger">{displayError}</Form.Text>
              <Form.Text className="text-right text-success">{displayMessage}</Form.Text>
              <SubmitButton isLoading={isLoading} trans={trans} />
            </FormikForm>
          </Formik>
        </div>
        <style jsx>{`
          @media (min-width: 600px) {
            .form-wrapper {
              min-width: 400px;
            }
          }
        `}</style>
      </div>
    </LayoutSignin>
  );
};

export default ForgotPassword;
