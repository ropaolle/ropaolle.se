import React, { useState, useEffect } from 'react';
import { Table as BootstrapTable } from 'react-bootstrap';
import { useQuery } from 'react-apollo';
import { DocumentNode } from 'graphql';
import { Pager } from './Pager';
import { Header, Column } from './Header';
import { CheckBox } from './CheckBox';
import { InfoCircleIcon } from '../FontAwsomeIcons';
import { useLocalStorage } from '../../lib/useLocalStorage';
import { useTranslation } from '../../lib/useTranslation';

interface ListParams {
  pageSize?: number;
  activePage?: number;
  orderBy?: string;
  ascending?: boolean;
}

interface TableProps {
  query: DocumentNode;
  defaultParams: ListParams;
  tableName: string;
  translation: string;
  columns: Column[];
  getRow: any;
  TableRow: any;
  selected?: any;
  setSelected?: any;
}

export const Table: React.SFC<TableProps> = ({
  query,
  defaultParams,
  tableName,
  translation,
  columns,
  TableRow,
  selected,
  setSelected,
}) => {
  const [t] = useTranslation();
  const [allSelected, setAllSelected] = useState(false);
  const useCheckBoxes = typeof setSelected === 'function';
  const [listParams, setListParams] = useLocalStorage(`${translation}:list`, defaultParams);
  const { pageSize, activePage, orderBy, ascending } = listParams;

  const variables = {
    first: pageSize,
    skip: (activePage - 1) * pageSize,
    orderBy: `${orderBy}_${ascending ? 'ASC' : 'DESC'}`,
  };

  const { data, loading, fetchMore } = useQuery(query, {
    variables,
    fetchPolicy: 'cache-and-network',
  });

  const rowTable = `all${tableName}`;
  const countTable = `_all${tableName}Meta`;
  const rows = (data && data[rowTable]) || [];
  const count = (data && data[rowTable] && data[countTable].count) || 0;

  useEffect(() => {
    fetchMore({
      variables,
      updateQuery: (prev: any, { fetchMoreResult }: any) => {
        if (!fetchMoreResult) return prev;

        return Object.assign({}, prev, {
          [rowTable]: fetchMoreResult[rowTable],
          _allLogsMeta: fetchMoreResult._allLogsMeta,
        });
      },
    });
  }, [activePage, pageSize, ascending, orderBy]);

  const handleChange = (update: ListParams) => {
    setListParams({ ...listParams, ...update });
  };

  const handleSelect = (e: any) => {
    const { id, checked } = e.target;
    const selectedCopy = new Set(selected);
    if (checked && !selectedCopy.has(id)) {
      selectedCopy.add(id);
    } else {
      selectedCopy.delete(id);
    }
    setSelected(Array.from(selectedCopy));
  };

  const handleSelectAll = () => {
    if (allSelected) {
      setSelected([]);
    } else {
      setSelected(rows.map(({ id }: any) => id));
    }
    setAllSelected(!allSelected);
  };

  return (
    <>
      <BootstrapTable striped bordered hover size="sm">
        <Header
          translation={translation}
          columns={columns}
          ascending={ascending}
          orderBy={orderBy}
          onSortHeaderClick={handleChange}
          allSelected={allSelected}
          loading={loading}
          onSelectAll={useCheckBoxes ? handleSelectAll : undefined}
        />
        <tbody>
          {count ? (
            rows.map((row: any) => (
              <React.Fragment key={row.id}>
                <TableRow
                  {...row}
                  checkBox={
                    useCheckBoxes && (
                      <CheckBox
                        checked={selected.includes(row.id)}
                        id={row.id}
                        onChange={handleSelect}
                      />
                    )
                  }
                />
              </React.Fragment>
            ))
          ) : (
            <tr>
              <td colSpan={columns.length}>
                <div className="table-empty">
                  <InfoCircleIcon size="40" />
                  {t(`${translation}.tableEmpty`)}
                </div>
              </td>
              <style jsx>{`
                .table-empty {
                  display: flex;
                  align-items: center;
                  flex-direction: column;
                  font-size: 32px;
                  justify-content: center;
                  padding: 1em;
                  text-align: center;
                  color: #aaa;
                }
              `}</style>
            </tr>
          )}
        </tbody>
      </BootstrapTable>

      {count > pageSize && (
        <Pager
          totalItemsCount={count}
          pageRangeDisplayed={6}
          activePage={activePage}
          pageSize={pageSize}
          handleChange={handleChange}
        />
      )}
    </>
  );
};
