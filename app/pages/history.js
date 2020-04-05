import React /* , { useState } */ from 'react';
import { Accordion, useAccordionToggle } from 'react-bootstrap';
import { useQuery } from 'react-apollo';
import { Layout } from '../components/Layout';
import { localeDate, formatJSON } from '../lib/utils';
import { SpinnerIcon } from '../components/FontAwsomeIcons';
import { useTranslation } from '../lib/useTranslation';
import { LOGS_PAGINATED } from '../graphql/logs';
import { Table } from '../components/Table';

const CustomToggle = ({ children, eventKey }) => {
  const decoratedOnClick = useAccordionToggle(eventKey, () => {});
  return (
    <a href="#" style={{ padding: 0 }} onClick={decoratedOnClick}>
      {children}
    </a>
  );
};

const History = () => {
  const [t] = useTranslation();
  // const [selected, setSelected] = useState([]);
  const translation = 'history';
  const tableName = 'Logs';
  const columns = ['createdAt', 'level', 'message', 'jsonData'];
  const defaultPageSize = 20;

  const { data, loading, fetchMore } = useQuery(LOGS_PAGINATED, {
    variables: {
      first: defaultPageSize,
      // skip: 0,
      // orderBy: 'createdAt_DESC',
    },
    fetchPolicy: 'cache-and-network',
  });

  const getRow = ({ id, createdAt, message, level, jsonData } /* , checkBox */) => (
    <tr key={id}>
      {/* <td>{checkBox}</td> */}
      <td className="text-nowrap">{localeDate(createdAt)}</td>
      <td>{level}</td>
      <td className="w-50">{message}</td>
      <td>
        {jsonData && (
          <Accordion>
            <CustomToggle eventKey={id}>{t('history.more')}</CustomToggle>
            <Accordion.Collapse eventKey={id}>
              <pre>{formatJSON(jsonData)}</pre>
            </Accordion.Collapse>
          </Accordion>
        )}
      </td>
    </tr>
  );

  return (
    <Layout>
      <div className="d-flex align-items-center">
        <h1 className="mr-2">{t('history.title')}</h1>
        {loading && <SpinnerIcon size={32} />}
      </div>

      <Table
        data={data}
        fetchMore={fetchMore}
        defaultPageSize={defaultPageSize}
        tableName={tableName}
        translation={translation}
        columns={columns}
        // selected={selected}
        // setSelected={setSelected}
        getRow={getRow}
      />
    </Layout>
  );
};

export default History;
