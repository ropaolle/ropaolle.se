import React from 'react';
import { useTranslation } from '../../lib/useTranslation';
import { CheckBox } from './CheckBox';

interface HeaderItemProps {
  label: string;
  id: string;
  field: string;
  ascending: boolean;
  onClick: (id: string) => void;
}

const HeaderItem: React.SFC<HeaderItemProps> = ({ label, id, field, ascending, onClick }) => {
  return (
    <div className="sort-header" onClick={() => onClick(id)}>
      <div>{label}</div>
      <div className="sort-header-icons">
        <div className={id === field && ascending ? 'sort-header-active' : ''}>▲</div>
        <div className={id === field && !ascending ? 'sort-header-active' : ''}>▼</div>
      </div>
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

export interface Sort {
  field: string;
  ascending: boolean;
}

interface HeaderProps {
  translation: string;
  columns: Column[];
  sort: Sort;
  allSelected?: boolean;
  onSelectAll?: () => void;
  onSortHeaderClick: (field: string) => void;
}

export const Header: React.SFC<HeaderProps> = ({
  translation,
  columns,
  sort,
  allSelected,
  onSelectAll,
  onSortHeaderClick,
}) => {
  const [t] = useTranslation();

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
                  key={name}
                  {...sort}
                  onClick={() => onSortHeaderClick(name)}
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
