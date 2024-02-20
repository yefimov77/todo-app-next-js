import { getBoardWithTodosById } from "@/app/lib/actions";
import { ColumnBoard } from "../ui/Board/Board";

export default async function Board({ params} : { params:{ boardId : string } }) {
  const boardId = params.boardId;
  const todos = await getBoardWithTodosById(boardId);
  console.log(todos);

  return (
    <ColumnBoard boardId={boardId} todos={todos!} />
  )
};