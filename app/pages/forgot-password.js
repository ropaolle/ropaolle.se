import { useState, useEffect } from 'react';
import { Formik, Form as FormikForm } from 'formik';
import * as Yup from 'yup';
import { Form } from 'react-bootstrap';
import { RopaOlleIcon } from '../components/FontAwsomeIcons';
import { LayoutSignin } from '../components/LayoutSignin';
import { useTranslation } from '../lib/useTranslation';
import { Text, SubmitButton } from '../components/Fields';
import { useAuth } from '../lib/useAuth';

const ForgotPassword = () => {
  const [t] = useTranslation();
  const [displayMessage, setDisplayMessage] = useState(false);
  const [displayError, setDisplayError] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const { error, forgotPassword } = useAuth();
  const trans = 'forgotPassword.form';

  useEffect(() => {
    console.log('error', error);
    if (error && error.includes('Email does not exist')) {
      // INFO: Do not reveal if an email exists or not.
      setDisplayMessage(t(`forgotPassword.emailSent`));
    } else if (error && error.includes('Could not send email')) {
      setDisplayMessage(t('forgotPassword.emailError.text'));
    } else {
      setDisplayError(error);
    }
  }, [error]);

  return (
    <LayoutSignin title={t('forgotPassword.title')}>
      <div className="pt-3 pb-3">
        <h5 className="d-flex justify-content-center align-items-center">
          <RopaOlleIcon className="text-dark mr-1" size="32" /> {t('title')}
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
              setIsSending(true);
              try {
                await forgotPassword(values);
                setDisplayMessage(t(`forgotPassword.emailSent`));
              } finally {
                setIsSending(false);
              }
            }}
          >
            <FormikForm className="register-form999">
              <Text name="email" type="email" trans={trans} />
              <Form.Text className="text-right text-danger">{displayError}</Form.Text>
              <Form.Text className="text-right text-success">{displayMessage}</Form.Text>
              <SubmitButton isLoading={isSending} trans={trans} />
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
