import gql from 'graphql-tag';

// export const CREATE_USER = gql`
//   mutation CreateUser($data: UserCreateInput!) {
//     createUser(data: $data) {
//       id
//       email
//     }
//   }
// `;

export interface User {
  id: string;
  name: string;
  email: string;
  mobile: string;
}

const USER_FRAGMENT = `    
  id
  email
  firstName
  lastName
  name
  isAdmin
  mobile
  langCode
`;

export const UPDATE_USER = gql`
  mutation UpdateUser($id: ID!, $data: UserUpdateInput!) {
    updateUser(id: $id, data: $data) {
      ${USER_FRAGMENT}
    }
    
  }
`;

export const GET_USER = gql`
  query {
    authenticatedUser {
      ${USER_FRAGMENT}
    }
  }
`;

export const USER2 = gql`
  query getUser($userId: ID!) {
    User(where: { id: $userId }) {
      ${USER_FRAGMENT}
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

export const USERS_PAGINATED = (pageSize = 20, page = 1, orderBy = 'id_DESC') => gql`
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
