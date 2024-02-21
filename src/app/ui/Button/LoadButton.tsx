'use client'

import Link from "next/link"
import React, { FC } from "react"

interface Props {
  boardId: string,
  onReset: () => void,
  
}

export const LoadButton:FC<Props> = ({boardId, onReset}) => {

  return (
    <Link
      href={`/${boardId}`}
      className="border rounded-lg  px-10 text-white hover:bg-slate-950 self-center p-4"
      onClick={onReset}
    >
        Load
    </Link>
  )
}