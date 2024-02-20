'use client'
import { LoadButton } from "../Button/LoadButton";
import { useState } from "react";
import { Search } from "../Search/Search";


export default function TopBar(){
  const [boardId, setBoardId] = useState('');

  return (
    <div className='gap-20 flex flex-row pt-32 mb-20'>
      <Search setBoardId={setBoardId} />
      <LoadButton boardId={boardId} />
    </div>
  );
};