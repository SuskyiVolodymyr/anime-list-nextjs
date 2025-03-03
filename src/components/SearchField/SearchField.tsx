'use client' // eslint-disable-line prettier/prettier
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { manageQueryParams } from '@/services/manageQueryParams';

export const SearchField = () => {
  const [query, setQuery] = useState('');
  const router = useRouter();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const newQuery = query.trim();
    const currentParams = manageQueryParams([{ key: 'q', value: newQuery }]);

    router.push('?' + currentParams);
  };

  return (
    <form className="search-form" onSubmit={handleSubmit}>
      <input
        type="text "
        placeholder="search"
        className="search-field"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      ></input>
      <button className="search-button" type="submit">
        🔎
      </button>
    </form>
  );
};
