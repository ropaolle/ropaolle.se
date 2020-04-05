import React, { useState, useEffect } from 'react';
import { Table as BootstrapTable } from 'react-bootstrap';
import { Pager } from './Pager';
import { Header } from './Header';
import { CheckBox } from './CheckBox';

interface TableProps {
  data: any;
  fetchMore: any;
  defaultPageSize?: number;
  tableName: string;
  translation: any;
  columns: any;
  getRow: any;
  selected?: any;
  setSelected?: any;
}

export const Table: React.SFC<TableProps> = ({
  data,
  fetchMore,
  defaultPageSize,
  tableName,
  translation,
  columns,
  getRow,
  selected,
  setSelected,
}) => {
  const [activePage, setActivePage] = useState(1);
  const [pageSize, setPageSize] = useState(defaultPageSize || 20);
  const [allSelected, setAllSelected] = useState(false);
  const [sort, setSort] = useState({ ascending: false, field: columns[0] });
  const useCheckBoxes = typeof setSelected === 'function';
  const rowTable = `all${tableName}`;
  const countTable = `_all${tableName}Meta`;
  const rows = (data && data[rowTable]) || [];
  const count = (data && data[rowTable] && data[countTable].count) || 0;

  useEffect(() => {
    fetchMore({
      variables: {
        first: pageSize,
        skip: (activePage - 1) * pageSize,
        orderBy: `${sort.field}_${sort.ascending ? 'ASC' : 'DESC'}`,
      },
      updateQuery: (prev: any, { fetchMoreResult }: any) => {
        if (!fetchMoreResult) return prev;

        return Object.assign({}, prev, {
          [rowTable]: fetchMoreResult[rowTable],
          _allLogsMeta: fetchMoreResult._allLogsMeta,
        });
      },
    });
  }, [activePage, pageSize, sort]);

  const handleSortHeaderClick = (field: String) => {
    if (sort.field === field) {
      setSort({ ...sort, ascending: !sort.ascending });
    } else {
      setSort({ ...sort, field });
    }
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
      <BootstrapTable striped bordered hover size="sm" variant="dark2">
        <Header
          translation={translation}
          columns={columns}
          sort={sort}
          allSelected={allSelected}
          onSelectAll={useCheckBoxes ? handleSelectAll : undefined}
          onSortHeaderClick={handleSortHeaderClick}
        />
        <tbody>
          {rows.map((row: any) =>
            getRow(
              row,
              useCheckBoxes && (
                <CheckBox checked={selected.includes(row.id)} id={row.id} onChange={handleSelect} />
              )
            )
          )}
        </tbody>
      </BootstrapTable>

      {count > pageSize && (
        <Pager
          totalItemsCount={count}
          pageRangeDisplayed={6}
          activePage={activePage}
          setActivePage={setActivePage}
          pageSize={pageSize}
          setPageSize={setPageSize}
        />
      )}
    </>
  );
};
