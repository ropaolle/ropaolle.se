import gql from 'graphql-tag';

export const CREATE_SETTING = gql`
  mutation CreateSettings($data: SetingsCreateInput!) {
    createSetting(data: $data) {
      id
      name
    }
  }
`;

export const UPDATE_SETTING = gql`
  mutation UpdateSettingByName($name: String!, $value: JSON!) {
    updateSettingByName(name: $name, value: $value)
  }
`;

export const SETTING = gql`
  query AllSettings($name: String!) {
    allSettings(where: { name: $name }) {
      id
      value
    }
  }
`;

export const STATE = {
  query: SETTING,
  variables: { name: 'state' },
  fetchPolicy: 'no-cache',
};

export const SETTINGS = {
  query: SETTING,
  variables: { name: 'settings' },
  fetchPolicy: 'no-cache',
};
