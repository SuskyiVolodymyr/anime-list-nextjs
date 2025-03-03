import React from 'react';
import { OrderBy } from '@/types/OrderBy';

type Props = {
  order: OrderBy;
  isAsc: boolean;
  setOrderBy: (value: OrderBy) => void;
  setIsASC: (value: boolean) => void;
};

export const OrderSelect = ({ setIsASC, setOrderBy, order, isAsc }: Props) => {
  const handleOrderSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    e.preventDefault();
    setOrderBy(e.target.value as OrderBy);
  };
  return (
    <>
      <div className="filter-item">
        <label htmlFor="sort-by" className="filter-label">
          Sort by:
        </label>
        <select id="sort-by" onChange={handleOrderSelect} className="filter-select" value={order}>
          {Object.entries(OrderBy).map(([key, value]) => (
            <option key={key} value={value}>
              {key}
            </option>
          ))}
        </select>
      </div>
      <div className="filter-item">
        <label htmlFor="sort-by" className="filter-label">
          Order by:
        </label>
        <select
          id="sort-by"
          onChange={(e) => setIsASC(e.target.value === '⬆')}
          className="filter-select"
          value={isAsc ? '⬆' : '⬇'}
        >
          <option>⬇</option>
          <option>⬆</option>
        </select>
      </div>
    </>
  );
};
