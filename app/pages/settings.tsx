import { NextPage } from 'next';
import { useMutation, useQuery } from 'react-apollo';
import { Row, Col } from 'react-bootstrap';
import { Formik } from 'formik';
import gql from 'graphql-tag';
import * as Yup from 'yup';
import { Layout } from '../components/Layout';
import { ErrorText } from '../components/ErrorText';
import { useTranslation } from '../lib/useTranslation';
import { Text, SubmitButton, Select } from '../components/Fields';

interface User {
  id: string;
  name: string;
  email: string;
  mobile: string;
  smsNotifications: boolean;
  emailNotifications: boolean;
}

interface Setting {
  testMode: string;
  testEmail: string;
  testSms: string;
  notificationThreshold: string;
}

interface Value {
  value: Setting;
}

interface Data {
  allUsers: User[];
  allSettings: Value[];
}

const SETTINGS_AND_USERS = gql`
  query {
    allUsers {
      id
      name
      email
      mobile
      smsNotifications
      emailNotifications
    }
    allSettings(where: { name: "settings" }) {
      id
      value
    }
  }
`;

const UPDATE_SETTING = gql`
  mutation UpdateSettingByName($name: String!, $value: JSON!) {
    updateSettingByName(name: $name, value: $value)
  }
`;

const initialData = {
  testMode: '',
  testEmail: '',
  testSms: '',
  notificationThreshold: '',
};

const Settings: NextPage = () => {
  const [t] = useTranslation();
  const trans = 'settings.form';

  // Load  initial data
  const { data, error: queryError, loading: queryLoading } = useQuery<Data>(SETTINGS_AND_USERS, {
    fetchPolicy: 'no-cache',
  });
  const settings = data?.allSettings?.[0].value || initialData;
  const users = data?.allUsers;

  // Update
  const [updateSetting, { /* data,  */ loading, error }] = useMutation(UPDATE_SETTING);

  const destinations = users && (
    <>
      <div>
        <span className="text-muted">Epost skickas till: </span>
        {users
          .filter(user => user.emailNotifications)
          .map(({ email }) => email)
          .join(',')}
      </div>
      <div>
        <span className="text-muted">SMS skickas till: </span>
        {users
          .filter(user => user.smsNotifications && user.mobile)
          .map(({ mobile, name }) => `${mobile} (${name})`)
          .join(',')}
      </div>
    </>
  );

  return (
    <Layout loading={queryLoading}>
      <h1>{t('settings.title')}</h1>
      <ErrorText error={!!queryError} type="loadError" />

      {!queryLoading && (
        <Formik
          initialValues={settings}
          // enableReinitialize={true}
          validationSchema={Yup.object({
            testEmail: Yup.string().email(t(`${trans}.testEmail.error`)),
          })}
          onSubmit={async (values /* , formikBag */) => {
            updateSetting({ variables: { name: 'settings', value: values } });
          }}
        >
          {({ values, handleSubmit }) => {
            return (
              <form onSubmit={handleSubmit} className="settings-form">
                <div>
                  <Select
                    name="testMode"
                    options={['disable', 'test', 'normal']}
                    trans={trans}
                    info={values.testMode === 'normal' && destinations}
                  />
                  {values.testMode === 'test' && (
                    <>
                      <Row>
                        <Col>
                          <Text name="testEmail" type="email" trans={trans} />
                        </Col>
                        <Col>
                          <Text name="testSms" type="text" trans={trans} />
                        </Col>
                      </Row>
                    </>
                  )}
                </div>
                <Text name="notificationThreshold" type="number" trans={trans} />
                <ErrorText error={!!error} type="updateError" right />
                <SubmitButton disabled={!!queryError} isLoading={loading} trans={''} />
              </form>
            );
          }}
        </Formik>
      )}

      <style jsx>{`
        :global(.settings-form) {
          max-width: 500px;
        }
      `}</style>
    </Layout>
  );
};

export default Settings;
