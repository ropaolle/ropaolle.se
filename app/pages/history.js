import React, { useState } from 'react';
import { Accordion, useAccordionToggle } from 'react-bootstrap';
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
  const [loading, setLoading] = useState(false);
  // const [selected, setSelected] = useState([]);

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
        query={LOGS_PAGINATED}
        tableName="Logs"
        translation={'history'}
        columns={['createdAt', 'level', 'message', 'jsonData']}
        // selected={selected}
        // setSelected={setSelected}
        getRow={getRow}
        onLoading={setLoading}
      />
    </Layout>
  );
};

export default History;
