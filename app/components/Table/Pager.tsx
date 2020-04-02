import React from 'react';
import { Col, Row } from 'react-bootstrap';
import Pagination from 'react-js-pagination';
import Select from 'react-select';
import { useTranslation } from '../../lib/useTranslation';

interface Option {
  value: number | string;
  label: string;
}

const pageSizes = [
  { value: 10, label: '10' },
  { value: 20, label: '20' },
  { value: 50, label: '50' },
  { value: 100, label: '100' },
];

interface PagerProps {
  totalItemsCount: number;
  pageRangeDisplayed: number;
  activePage: number;
  setActivePage: (activePage: number) => void;
  pageSize: number;
  setPageSize: (pageSize: number) => void;
}

export const Pager: React.SFC<PagerProps> = ({
  totalItemsCount,
  pageRangeDisplayed,
  activePage,
  setActivePage,
  pageSize,
  setPageSize,
}) => {
  const [t] = useTranslation();

  const handlePageSizeChange = ({ value }: any) => {
    const lastPage = Math.ceil(totalItemsCount / value);
    if (value > lastPage) {
      setActivePage(lastPage);
    }
    setPageSize(value);
  };

  return (
    <Row>
      <Col>
        <div className="mb-2">
          {t('pager.totalCount')} <b>{totalItemsCount}</b>
        </div>
        <Pagination
          activePage={activePage}
          itemsCountPerPage={pageSize}
          totalItemsCount={totalItemsCount}
          pageRangeDisplayed={pageRangeDisplayed}
          onChange={setActivePage}
          linkClass="page-link"
          itemClass="page-item"
          activeLinkClass="not-used"
        />
      </Col>
      <Col md={2}>
        <div className="mb-2">{t('pager.rowsPerPage')}</div>
        <Select
          name="pageSize"
          // instanceId - Warning: Prop `id` did not match: https://github.com/JedWatson/react-select/issues/2629
          instanceId="pageSize"
          value={pageSizes.filter((o: Option) => o.value === pageSize)}
          onChange={handlePageSizeChange}
          options={pageSizes}
        />
      </Col>
    </Row>
  );
};
