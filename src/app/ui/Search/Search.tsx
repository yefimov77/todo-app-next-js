'use client'

import { Dispatch, FC, SetStateAction } from 'react';

interface Props {
  setBoardId: Dispatch<SetStateAction<string>>,
  setSearchValue: Dispatch<SetStateAction<string>>,
  searchValue: string,
}

export const Search:FC<Props> = ({setBoardId, setSearchValue, searchValue}) => {
  const handleSearch = (boardId: string) => {
    setBoardId(boardId);
    setSearchValue(boardId);
  };
  
  return (
    <input
      className="w-full outline-none rounded-lg p-2 border-2 border-transparent focus:border-black"
      placeholder="enter your board id"
      type="text"
      value={searchValue}
      onChange={(e) => handleSearch(e.target.value)}
    />
  );
}