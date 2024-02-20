'use client'

import Link from "next/link"
import React from "react"

export const LoadButton = ({boardId}: {boardId: string}) => {
  
  return (
    <Link
      href={`/${boardId}`}
      onClick={() => console.log(boardId)}
      className="border rounded-lg  px-10 text-white hover:bg-slate-950 self-center p-4"
    >
        Load
    </Link>
  )
}