'use client' // eslint-disable-line prettier/prettier
import { useAnimeList } from '@/store/store';
import React, { useRef } from 'react';

export const SearchField = () => {
  const setQuery = useAnimeList((state) => state.setQuery);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setQuery(inputRef.current ? inputRef.current.value : '');
  };

  return (
    <form className="search-form" onSubmit={handleSubmit}>
      <input type="text " placeholder="search" className="search-field" ref={inputRef}></input>
      <button className="search-button" type="submit">
        🔎
      </button>
    </form>
  );
};
