import gql from 'graphql-tag';

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
  lastAccess
`;

// export const CREATE_USER = gql`
//   mutation CreateUser($data: UserCreateInput!) {
//     createUser(data: $data) {
//       id
//     }
//   }
// `;

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

export const USERS_PAGINATED = gql`
  query UsersPaginated($first: Int, $skip: Int, $orderBy: String) {
    allUsers(first: $first, skip: $skip, orderBy: $orderBy) {
      ${USER_FRAGMENT}
    }
    _allUsersMeta {
      count
    }
  }
`;
