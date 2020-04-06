import React, { useState } from 'react';
import { Layout } from '../components/Layout';
import { formatDate } from '../lib/utils';
import { useTranslation } from '../lib/useTranslation';
import { USERS_PAGINATED } from '../graphql/users';
import { Table } from '../components/Table';

const Users = () => {
  const [t] = useTranslation();
  const [selected, setSelected] = useState([]);
  const translation = 'users';
  const tableName = 'Users';
  const columns = ['firstName', 'isAdmin', 'lastAccess'];
  const defaultParams = { pageSize: 10, activePage: 1, orderBy: columns[0], ascending: true };

  const TableRow = ({ name, lastAccess, isAdmin, checkBox }) => (
    <tr>
      <td>{checkBox}</td>
      <td className="text-nowrap">{name}</td>
      <td className="w-50z">{isAdmin ? 'Ja' : 'Nej'}</td>
      <td>{formatDate(lastAccess)}</td>
    </tr>
  );

  return (
    <Layout>
      <h1>{t('users.title')}</h1>

      <Table
        defaultParams={defaultParams}
        query={USERS_PAGINATED}
        tableName={tableName}
        translation={translation}
        columns={columns}
        selected={selected}
        setSelected={setSelected}
        TableRow={TableRow}
      />
    </Layout>
  );
};

export default Users;
