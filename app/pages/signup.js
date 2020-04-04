import { useEffect, useState } from 'react';
import { Formik, Form as FormikForm } from 'formik';
import * as Yup from 'yup';
import { Form } from 'react-bootstrap';
import { Layout } from '../components/Layout';
import { useTranslation } from '../lib/useTranslation';
import { Text, SubmitButton } from '../components/Fields';
import { useAuth } from '../lib/useAuth';

const Signup = () => {
  const [t] = useTranslation();
  const [displayMessage, setDisplayMessage] = useState(false);
  const [displayError, setDisplayError] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const { error, signup } = useAuth();
  const trans = 'signup.form';

  useEffect(() => {
    if (error && error.includes('E11000')) {
      // INFO: Do not reveal if an email exists or not.
      setDisplayMessage(t(`signup.emailSent`));
    } else {
      setDisplayError(error);
    }
  }, [error]);

  return (
    <Layout mainClass="main">
      <h1>{t('signup.title')}</h1>
      <Formik
        initialValues={{
          firstName: 'asdf',
          lastName: 'asdf',
          email: 'ifarfar@gmail.com',
          password: '12345678',
        }}
        validationSchema={Yup.object({
          firstName: Yup.string()
            .max(15, t(`${trans}.firstName.error`))
            .required(t(`${trans}.firstName.required`)),
          lastName: Yup.string().required(t(`${trans}.lastName.required`)),
          email: Yup.string()
            .email(t(`${trans}.email.error`))
            .required(t(`${trans}.email.required`)),
          password: Yup.string()
            .min(8, `${trans}.password.error`)
            .required(t(`${trans}.password.required`)),
        })}
        onSubmit={async (values /* , formikBag */) => {
          setIsSending(true);
          try {
            await signup(values);
            setDisplayMessage(t(`signup.emailSent`));
          } finally {
            setIsSending(false);
          }
        }}
      >
        <FormikForm>
          <Form.Row>
            <Text row name="firstName" type="text" trans={trans} />
            <Text row name="lastName" type="text" trans={trans} />
          </Form.Row>
          <Text name="email" type="email" trans={trans} />
          <Text name="password" type="password" trans={trans} />
          <Form.Text className="text-right text-danger">{displayError}</Form.Text>
          <Form.Text className="text-right text-success">{displayMessage}</Form.Text>
          <SubmitButton size="lg" isLoading={isSending} trans={trans} />
        </FormikForm>
      </Formik>
      <style jsx>{`
        :global(.main) {
          max-width: 500px;
        }
      `}</style>
    </Layout>
  );
};

export default Signup;
