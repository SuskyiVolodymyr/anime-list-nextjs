'use client' // eslint-disable-line prettier/prettier
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export const SearchField = () => {
  const [query, setQuery] = useState('');
  const router = useRouter();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const newQuery = query.trim();
    const currentParams = new URLSearchParams(window.location.search);

    if (newQuery) {
      currentParams.set('q', newQuery);
    } else {
      currentParams.delete('q'); // Видаляємо параметр, якщо поле порожнє
    }

    router.push(`?${currentParams.toString()}`);
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
