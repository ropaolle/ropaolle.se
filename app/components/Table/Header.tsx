import React from 'react';
import { useTranslation } from '../../lib/useTranslation';
import { SpinnerIcon } from '../FontAwsomeIcons';
import { CheckBox } from './CheckBox';

interface HeaderItemProps {
  label: string;
  id: string;
  ascending: boolean;
  orderBy: string;
  loading?: boolean;
  onClick: (id: string) => void;
}

const HeaderItem: React.SFC<HeaderItemProps> = ({
  label,
  id,
  orderBy,
  ascending,
  loading,
  onClick,
}) => {
  return (
    <div className="sort-header" onClick={() => onClick(id)}>
      <div>{label}</div>
      <div className="sort-header-icons">
        <div className={id === orderBy && ascending ? 'sort-header-active' : ''}>▲</div>
        <div className={id === orderBy && !ascending ? 'sort-header-active' : ''}>▼</div>
      </div>
      {loading && (
        <div className="ml-1">
          <SpinnerIcon size={'16'} />
        </div>
      )}
      <style jsx>{`
        .sort-header {
          display: flex;
          cursor: pointer;
        }
        .sort-header-icons {
          font-size: 8px;
          line-height: 9px;
          margin-left: 6px;
          margin-top: 3px;
          color: #bbb;
        }
        .sort-header-active {
          color: red;
        }
      `}</style>
    </div>
  );
};

export type Column = string | string[];

interface HeaderParams {
  ascending: boolean;
  orderBy: string;
}

interface HeaderProps {
  translation: string;
  columns: Column[];
  ascending: boolean;
  orderBy: string;
  allSelected?: boolean;
  loading: boolean;
  onSelectAll?: () => void;
  onSortHeaderClick: (params: HeaderParams) => void;
}

export const Header: React.SFC<HeaderProps> = ({
  translation,
  columns,
  ascending,
  orderBy,
  allSelected,
  loading,
  onSelectAll,
  onSortHeaderClick,
}) => {
  const [t] = useTranslation();

  const handleSortHeaderClick = (field: string) => {
    onSortHeaderClick({ orderBy: field, ascending: orderBy === field ? !ascending : ascending });
  };

  return (
    <thead>
      <tr>
        {typeof onSelectAll === 'function' && (
          <th>
            <CheckBox checked={!!allSelected} id="allChecked" onChange={onSelectAll} />
          </th>
        )}

        {columns.map((val, index) => {
          const arr = typeof val === 'string' ? [val] : val;
          return (
            <th key={index}>
              {arr.map((name: string) => (
                <HeaderItem
                  id={name}
                  loading={index === 0 && loading}
                  key={name}
                  ascending={ascending}
                  orderBy={orderBy}
                  onClick={() => handleSortHeaderClick(name)}
                  label={t(`${translation}.table.${name}`)}
                />
              ))}
            </th>
          );
        })}
      </tr>
    </thead>
  );
};
