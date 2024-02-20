'use client'

import { FC, useEffect, useState } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import { Column } from "../Column/Column";
import { Itodo, Status } from "@/app/lib/definitions";
import { updateTodoStatus } from "@/app/lib/actions";

interface Props {
  todos: Itodo[];
  boardId: string;
}

export const ColumnBoard: FC<Props> = ({ todos, boardId }) => {
  const [winReady, setWinReady] = useState(false);
  const [todosToShow, setTodosToShow] = useState<Itodo[]>(todos);

  useEffect(() => {
    setWinReady(true);
  }, []);

  const onDragEnd = async (result: any) => {
    const { destination } = result;

    try {
      if (!destination) {
        return;
      }

      const destinationColumn = destination.droppableId;

      const movedTodoId = result.draggableId;
      const movedTodo = todosToShow.find((todo) => todo._id === movedTodoId);

      if (!movedTodo) {
        return;
      }

      const newTodos = [...todosToShow];
      const sourceTodos = newTodos.filter((todo) => todo._id !== movedTodoId);
      const destinationIndex = destination.index;
      sourceTodos.splice(destinationIndex, 0, movedTodo);
      movedTodo.status = destinationColumn as Status;
      await updateTodoStatus(movedTodo._id, destinationColumn);

      setTodosToShow(sourceTodos);
    } catch (err) {
      console.log(err);
    }
  };

  const onDragStart = () => {
    // You can add logic here if needed
  };

  const onDragUpdate = () => {
    // You can add logic here if needed
  };

  return (
    <>
      {winReady && (
        <DragDropContext onDragEnd={onDragEnd}>
          <div className="grid grid-cols-3 gap-20 mb-10">
            <Column
              columnTitle={`Todo`}
              todos={todosToShow}
              status={Status.Pending}
              boardId={boardId}
            />

            <Column
              columnTitle={`In Progress`}
              todos={todosToShow}
              status={Status.Active}
              boardId={boardId}
            />

            <Column
              columnTitle={`Done`}
              todos={todosToShow}
              status={Status.Closed}
              boardId={boardId}
            />
          </div>
        </DragDropContext>
      )}
    </>
  );
};