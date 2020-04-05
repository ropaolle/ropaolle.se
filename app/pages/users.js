import React, { useState } from 'react';
import { useQuery } from 'react-apollo';
import { Layout } from '../components/Layout';
import { localeDate } from '../lib/utils';
import { SpinnerIcon } from '../components/FontAwsomeIcons';
import { useTranslation } from '../lib/useTranslation';
import { USERS_PAGINATED } from '../graphql/users';
import { Table } from '../components/Table';

const Users = () => {
  const [t] = useTranslation();
  const [selected, setSelected] = useState([]);
  const translation = 'users';
  const tableName = 'Users';
  const columns = ['firstName', 'isAdmin', 'lastAccess'];
  const defaultPageSize = 20;

  const { data, loading, fetchMore } = useQuery(USERS_PAGINATED, {
    variables: {
      first: defaultPageSize,
      // skip: 0,
      // orderBy: 'firstName_DESC',
    },
    // fetchPolicy: 'cache-and-network',
  });

  const getRow = ({ id, name, lastAccess, isAdmin }, checkBox) => (
    <tr key={id}>
      <td>{checkBox}</td>
      <td className="text-nowrap">{name}</td>
      <td className="w-50z">{isAdmin ? 'Ja' : 'Nej'}</td>
      <td>{localeDate(lastAccess, true)}</td>
    </tr>
  );

  return (
    <Layout>
      <div className="d-flex align-items-center">
        <h1 className="mr-2">{t('users.title')}</h1>
        {loading && <SpinnerIcon size={32} />}
      </div>

      <Table
        data={data}
        fetchMore={fetchMore}
        defaultPageSize={defaultPageSize}
        tableName={tableName}
        translation={translation}
        columns={columns}
        selected={selected}
        setSelected={setSelected}
        getRow={getRow}
      />
    </Layout>
  );
};

export default Users;
