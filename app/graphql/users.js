import gql from 'graphql-tag';

// export const CREATE_USER = gql`
//   mutation CreateUser($name: String!, $email: String!, $password: String!) {
//     createUser(data: { name: $name, email: $email, password: $password }) {
//       id
//     }
//   }
// `;

export const CREATE_USER = gql`
  mutation CreateUser($data: UserCreateInput!) {
    createUser(data: $data) {
      id
      email
    }
  }
`;

export const UPDATE_USER = gql`
  mutation UpdateUser($id: ID!, $data: UserUpdateInput!) {
    updateUser(id: $id, data: $data) {
      id
    }
  }
`;

export const USER = gql`
  query {
    authenticatedUser {
      id
      email
      firstName
      lastName
      name
      isAdmin
      mobile
      smsNotifications
      emailNotifications
      langCode
    }
  }
`;

export const USERS = gql`
  query {
    allUsers {
      id
      name
      email
      mobile
      smsNotifications
      emailNotifications
    }
  }
`;

export const USERS_PAGINATED = (pageSize, page, orderBy = 'id_DESC') => gql`
  query {
    allUsers(first: ${pageSize}, skip: ${(page - 1) * pageSize}, orderBy: "${orderBy}") {
      id
      email
      name
      firstName
      lastAccess
    }
    _allUsersMeta {
      count
    }
  }
`;
