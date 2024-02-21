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
  const [todosToShow, setTodosToShow] = useState<Itodo[]>([]);
  const [isLoading, setIsloading] = useState(false);
  const [dragTodoId, setDragTodoId] = useState('');
  
  useEffect(() => {
    setTodosToShow(todos)
  }, [todos])


  const onDragEnd = async (result: any) => {
    const { destination } = result;
  
    try {
      if (!destination) {
        return;
      }
  
      const destinationColumn = destination.droppableId;
      const movedTodoId = result.draggableId;
      setDragTodoId(movedTodoId);
      const movedTodo = todosToShow.find((todo) => todo._id === movedTodoId);
  
      if (!movedTodo) {
        return;
      }
  
      if (movedTodo.status === destinationColumn) {
        const newTodos = [...todosToShow];
        const sourceTodos = newTodos.filter((todo) => todo._id !== movedTodoId);
        const destinationIndex = destination.index;
        sourceTodos.splice(destinationIndex, 0, movedTodo);
        setTodosToShow(sourceTodos);
        return;
      }
      setIsloading(true);
      const updatedMovedTodo = { ...movedTodo, status: destinationColumn as Status };
      
    
      const newTodos = [...todosToShow];
      const sourceTodos = newTodos.filter((todo) => todo._id !== movedTodoId);
      const destinationIndex = destination.index;
      sourceTodos.splice(destinationIndex, 0, updatedMovedTodo);
      setTodosToShow(sourceTodos);
      await updateTodoStatus(movedTodo._id, destinationColumn);
      setIsloading(false);
      setDragTodoId('');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="grid grid-cols-3 gap-20 mb-10">
        <Column
          columnTitle={`Todo`}
          todos={todosToShow}
          status={Status.Pending}
          boardId={boardId}
          isLoading={isLoading}
          dragTodoId={dragTodoId}
        />

        <Column
          columnTitle={`In Progress`}
          todos={todosToShow}
          status={Status.Active}
          boardId={boardId}
          isLoading={isLoading}
          dragTodoId={dragTodoId}
        />

        <Column
          isLoading={isLoading}
          columnTitle={`Done`}
          todos={todosToShow}
          status={Status.Closed}
          boardId={boardId}
          dragTodoId={dragTodoId}
        />
      </div>
    </DragDropContext>    
  )
};