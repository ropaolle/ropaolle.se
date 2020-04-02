import { Form } from 'react-bootstrap';
import { useMutation, useQuery } from 'react-apollo';
import { Formik, Form as FormikForm } from 'formik';
import * as Yup from 'yup';
import { Layout } from '../components/Layout';
import { ErrorText } from '../components/ErrorText';
import { UPDATE_USER, USER } from '../graphql/users';
import { useTranslation } from '../lib/useTranslation';
import { Text, SubmitButton, Checkbox, Select } from '../components/Fields';
import { useAuth } from '../lib/useAuth';

const Me = () => {
  const [t] = useTranslation();
  const trans = 'me.form';

  // Load initial data
  const { data, error: queryError, loading: queryLoading } = useQuery(USER, {
    variables: { name: 'state' },
    fetchPolicy: 'no-cache',
  });
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { id, name, __typename, ...user } = data?.authenticatedUser || {};

  // Update
  const [updateUser, { loading, error }] = useMutation(UPDATE_USER);
  const { user: authUser, setUser } = useAuth();

  return (
    <Layout loading={queryLoading}>
      <h1>{t('me.title')}</h1>
      <ErrorText error={!!queryError} type="loadError" />

      {!queryLoading && (
        <Formik
          initialValues={user}
          enableReinitialize={true}
          validationSchema={Yup.object({
            firstName: Yup.string()
              .max(15, t(`${trans}.firstName.error`))
              .required(t(`${trans}.firstName.required`)),
            email: Yup.string()
              .email(t(`${trans}.email.error`))
              .required(t(`${trans}.email.required`)),
          })}
          onSubmit={async (values /* , formikBag */) => {
            console.log('values', values);
            // Update auth user
            const { langCode, firstName, lastName, email } = values;
            setUser({ ...authUser, langCode, email, name: `${firstName} ${lastName}` });
            // Update database
            updateUser({
              variables: { id, data: values },
            });
          }}
        >
          <FormikForm className="me-form">
            <Form.Row>
              <Text row name="firstName" type="text" trans={trans} />
              <Text row name="lastName" type="text" trans={trans} />
            </Form.Row>
            <Text name="email" type="email" trans={trans} />
            <Text name="mobile" type="text" trans={trans} />
            <Form.Group>
              <Checkbox name="emailNotifications" trans={trans} />
              <Checkbox name="smsNotifications" trans={trans} />
            </Form.Group>
            <Select name="langCode" trans={trans} options={['sv', 'en']} />
            <ErrorText error={!!error} type="updateError" right />
            <SubmitButton size="lg" disabled={!!queryError} isLoading={loading} trans={trans} />
          </FormikForm>
        </Formik>
      )}

      <style jsx>{`
        :global(.me-form) {
          max-width: 500px;
        }
      `}</style>
    </Layout>
  );
};

export default Me;
