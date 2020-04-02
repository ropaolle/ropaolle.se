import React, { useState } from 'react';
import { Layout } from '../components/Layout';
import { localeDate } from '../lib/utils';
import { SpinnerIcon } from '../components/FontAwsomeIcons';
import { useTranslation } from '../lib/useTranslation';
import { USERS_PAGINATED } from '../graphql/users';
import { Table } from '../components/Table';

const Users = () => {
  const [t] = useTranslation();
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState([]);

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
        query={USERS_PAGINATED}
        tableName="Users"
        translation={'users'}
        columns={['firstName', 'isAdmin', 'lastAccess']}
        selected={selected}
        setSelected={setSelected}
        getRow={getRow}
        onLoading={setLoading}
      />
    </Layout>
  );
};

export default Users;
