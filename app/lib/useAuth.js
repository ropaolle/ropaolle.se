import React, { useEffect, createContext, useContext, useState } from 'react';
import { useRouter } from 'next/router';
import { useApolloClient, useMutation } from 'react-apollo';
import gql from 'graphql-tag';
import { UPDATE_USER } from '../graphql/users';
import { CREATE_LOG } from '../graphql/logs';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

const userFragment = `
  id
  email
  name
  isBlocked
  langCode
`;

export const AuthProvider = ({ children, initialUser = null }) => {
  const client = useApolloClient();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(initialUser);

  // INFO: Updates lastAccess each time a user access a new route. I.e. not if a page is
  // reloaded or the user stays on the same path. Not so pretty. Should be moved and refactored.
  const { pathname } = useRouter();
  const [updateUser] = useMutation(UPDATE_USER);
  useEffect(() => {
    user?.id &&
      updateUser({
        variables: { id: user.id, data: { lastAccess: new Date() } },
      });
  }, [pathname]);

  useEffect(() => {
    checkSession();
  }, []);

  const log = (data) => {
    client.mutate({
      mutation: CREATE_LOG,
      variables: {
        data,
      },
    });
  };

  const checkSession = async () =>
    client
      .query({
        query: gql`
          query {
            authenticatedUser {
              ${userFragment}
            }
          }
        `,
        fetchPolicy: 'no-cache',
      })
      .then(({ data: { authenticatedUser }, error }) => {
        if (error) throw error;
        setUser(authenticatedUser);
      })
      .catch((error) => {
        setError(error.message);
        throw error;
      })
      .finally(() => {
        setIsLoading(false);
      });

  const signin = async ({ email, password }) => {
    setIsLoading(true);
    setError(null);
    // NOTE: We are not capturing the `token` here on purpose; The GraphQL API
    // will set a `keystone.sid` cookie on its domain, which will be
    // automatically read for each subsequent query.
    return client
      .mutate({
        mutation: gql`
          mutation signin($email: String, $password: String) {
            authenticateUserWithPassword(email: $email, password: $password) {
              item {
                ${userFragment}
              }
            }
          }
        `,
        fetchPolicy: 'no-cache',
        variables: { email, password },
      })
      .then(async ({ data: { authenticateUserWithPassword }, error }) => {
        if (error) throw error;
        log({ message: `${authenticateUserWithPassword.item.email} signed in.` });
        // Ensure there's no old unauthenticated data hanging around
        await client.resetStore();
        if (authenticateUserWithPassword && authenticateUserWithPassword.item) {
          setUser(authenticateUserWithPassword.item);
        }
      })
      .catch((error) => {
        setError(error.message);
        throw error;
      })
      .finally(setIsLoading(false));
  };

  const signout = async () => {
    setIsLoading(true);
    setError(null);
    return client
      .mutate({
        mutation: gql`
          mutation {
            unauthenticateUser {
              success
            }
          }
        `,
        fetchPolicy: 'no-cache',
      })
      .then(async ({ data: { unauthenticateUser }, error }) => {
        if (error) throw error;
        log({ message: `${user && user.email} signed out.` });
        await client.resetStore();
        if (unauthenticateUser && unauthenticateUser.success) {
          setUser(null);
        }
      })
      .catch((error) => {
        setError(error.message);
        throw error;
      })
      .finally(setIsLoading(false));
  };

  const signup = async ({ firstName, lastName, email, password }) => {
    setIsLoading(true);
    setError(null);
    return client
      .mutate({
        mutation: gql`
          mutation SignUp($data: UserCreateInput!) {
            signup(data: $data)
          }
        `,
        variables: { data: { firstName, lastName, email, password } },
        fetchPolicy: 'no-cache',
      })
      .then(async ({ /* data: { signup }, */ error }) => {
        if (error) throw error;
        log({ message: `${email} signed up.` });
      })
      .catch((error) => {
        setError(error.message);
        throw error;
      })
      .finally(setIsLoading(false));
  };

  const forgotPassword = async ({ email }) => {
    setIsLoading(true);
    setError(null);
    return client
      .mutate({
        mutation: gql`
          mutation ForgotPassword($email: String!) {
            forgotPassword(email: $email)
          }
        `,
        variables: { email },
        fetchPolicy: 'no-cache',
      })
      .then(async ({ /* data: { forgotPassword }, */ error }) => {
        if (error) throw error;
        log({ message: `${email} requested new password.` });
      })
      .catch((error) => {
        setError(error.message);
        throw error;
      })
      .finally(setIsLoading(false));
  };

  const resetPassword = async ({ password, token }) => {
    setIsLoading(true);
    setError(null);
    return client
      .mutate({
        mutation: gql`
          mutation resetPassword($password: String!, $token: String!) {
            resetPassword(password: $password, token: $token)
          }
        `,
        variables: { password, token },
        fetchPolicy: 'no-cache',
      })
      .then(async ({ data: { resetPassword }, error }) => {
        if (error) throw error;
        return resetPassword;
      })
      .catch((error) => {
        setError(error.message);
        throw error;
      })
      .finally(setIsLoading(false));
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: !!user,
        user,
        isLoading,
        error,
        setUser,
        checkSession,
        signin,
        signout,
        signup,
        forgotPassword,
        resetPassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
