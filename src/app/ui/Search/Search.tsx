'use client'

import { Dispatch, FC, SetStateAction, useRef } from 'react';

interface Props {
  setBoardId: Dispatch<SetStateAction<string>>,
  setSearchValue: Dispatch<SetStateAction<string>>,
  searchValue: string,
}

export const Search:FC<Props> = ({setBoardId, setSearchValue, searchValue}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const handleSearch = (boardId: string) => {
    setBoardId(boardId);
    setSearchValue(boardId);
  };
  
  return (
    <input
      ref={inputRef}
      className="w-full outline-none rounded-lg p-2 border-2 border-transparent focus:border-black"
      placeholder="enter your board id"
      type="text"
      value={searchValue}
      onChange={(e) => handleSearch(e.target.value)}
    />
  );
}