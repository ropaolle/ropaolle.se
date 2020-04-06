import React from 'react';
import { Accordion, useAccordionToggle } from 'react-bootstrap';
import { Layout } from '../components/Layout';
import { formatDate, formatJSON } from '../lib/utils';
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
  const translation = 'history';
  const tableName = 'Logs';
  const columns = ['createdAt', 'level', 'message', 'jsonData'];
  const defaultParams = { pageSize: 10, activePage: 1, orderBy: columns[0], ascending: true };

  const TableRow = ({ id, createdAt, message, level, jsonData }) => (
    <tr>
      <td className="text-nowrap">{formatDate(createdAt)}</td>
      <td>{level}</td>
      <td className="w-50">{message}</td>
      <td>
        {jsonData && (
          <Accordion>
            <CustomToggle eventKey={id}>{t(`${translation}.more`)}</CustomToggle>
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
      <h1>{t('history.title')}</h1>

      <Table
        defaultParams={defaultParams}
        query={LOGS_PAGINATED}
        tableName={tableName}
        translation={translation}
        columns={columns}
        TableRow={TableRow}
      />
    </Layout>
  );
};

export default History;
