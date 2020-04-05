import { Form } from 'react-bootstrap';
import { useMutation, useQuery } from 'react-apollo';
import { Formik, Form as FormikForm } from 'formik';
import * as Yup from 'yup';
import { Layout } from '../components/Layout';
import { ErrorText } from '../components/ErrorText';
import { UPDATE_USER, GET_USER } from '../graphql/users';
import { CREATE_LOG } from '../graphql/logs';
import { useTranslation } from '../lib/useTranslation';
import { Text, SubmitButton, Select } from '../components/Fields';
import { picProps } from '../lib/utils';

const Me = () => {
  const [t] = useTranslation();
  const trans = 'me.form';
  const { data, error: queryError } = useQuery(GET_USER);
  const { id, ...user } = data?.authenticatedUser || {};
  const isAuthenticated = !!id;
  const [updateUser, { loading, error }] = useMutation(UPDATE_USER);
  const [createLog] = useMutation(CREATE_LOG);

  return (
    <Layout loading={!isAuthenticated}>
      <h1>{t('me.title')}</h1>
      <ErrorText error={!!queryError} type="loadError" />

      {isAuthenticated && (
        <Formik
          initialValues={picProps(user, ['email', 'firstName', 'lastName', 'mobile', 'langCode'])}
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
            updateUser({
              variables: { id, data: values },
            });

            createLog({ variables: { data: { message: `${values.updated} updated.` } } });
          }}
        >
          <FormikForm className="me-form">
            <Form.Row>
              <Text row name="firstName" type="text" trans={trans} />
              <Text row name="lastName" type="text" trans={trans} />
            </Form.Row>
            <Text name="email" type="email" trans={trans} />
            <Text name="mobile" type="text" trans={trans} />
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
