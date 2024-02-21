'use client'

import { LoadButton } from "../Button/LoadButton";
import { useState } from "react";
import { Search } from "../Search/Search";

export default function TopBar(){
  const [boardId, setBoardId] = useState('');
  const [searchValue, setSearchValue] = useState('');

  const handleReset = () => {
    setSearchValue('');
  }

  return (
    <div className='gap-20 flex flex-row pt-32 mb-20'>
      <Search 
        setBoardId={setBoardId} 
        setSearchValue={setSearchValue} 
        searchValue={searchValue} 
      />
      <LoadButton boardId={boardId} onReset={handleReset}  />
      <div className="">
        <p className='font-bold'>Board:</p>
        <p>{boardId}</p>
      </div>
    </div>
  );
};