'use client'

import { Dispatch, FC, SetStateAction } from 'react';

interface Props {
  setBoardId: Dispatch<SetStateAction<string>>,
}

export const Search:FC<Props> = ({setBoardId}) => {
  const handleSearch = (boardId: string) => {
    setBoardId(boardId)
  };
  
  return (
    <input
      className="w-full outline-none rounded-lg p-2 border-2 border-transparent focus:border-black"
      placeholder="enter your board id"
      type="text"
      onChange={(e) => handleSearch(e.target.value)}
    />
  );
}