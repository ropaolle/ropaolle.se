import React from 'react';
import { Form, Col, Row } from 'react-bootstrap';
import Pagination from 'react-js-pagination';
import { useTranslation } from '../../lib/useTranslation';

const pageSizes = [
  { value: 10, label: '10' },
  { value: 20, label: '20' },
  { value: 50, label: '50' },
  { value: 100, label: '100' },
];

interface PagerParams {
  pageSize?: number;
  activePage: number;
}

interface PagerProps {
  totalItemsCount: number;
  pageRangeDisplayed: number;
  activePage: number;
  pageSize: number;
  handleChange: (params: PagerParams) => void;
}

export const Pager: React.SFC<PagerProps> = ({
  totalItemsCount,
  pageRangeDisplayed,
  activePage,
  pageSize,
  handleChange,
}) => {
  const [t] = useTranslation();

  const handlePageSizeChange = (pageSize: number) => {
    const lastPage = Math.ceil(totalItemsCount / pageSize);
    handleChange({ pageSize, activePage: Math.min(activePage, lastPage) });
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
          onChange={(activePage) => handleChange({ activePage })}
          linkClass="page-link"
          itemClass="page-item"
          activeLinkClass="not-used"
        />
      </Col>
      <Col md={2}>
        <Form.Group>
          {<Form.Label>{t('pager.rowsPerPage')}</Form.Label>}
          <Form.Control
            as="select"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handlePageSizeChange(Number(e.target.value))
            }
          >
            {pageSizes.map(({ value, label }) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </Form.Control>
        </Form.Group>
      </Col>
    </Row>
  );
};
