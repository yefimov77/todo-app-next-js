'use client'
import { Itodo, Status } from "@/app/lib/definitions";
import React, { FC, useState } from "react";
import styles from './column.module.css';
import { getTodosToRender } from "./helper";
import { Todo } from "../Todo/Todo";
import { Modal } from "../Modal/Modal";
import { Draggable, Droppable } from "react-beautiful-dnd";



interface Props {
  columnTitle: string,
  todos: Itodo[],
  status: Status,
  boardId?: string,
  isLoading: boolean,
  dragTodoId: string,
}

export const Column:FC<Props> = ({columnTitle, todos, status, boardId, isLoading, dragTodoId}) => {
  const todosToRender: Itodo[] = getTodosToRender(todos,status );
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  }

  return (
    <div>
      <h2 
        className={`text-center mb-5 ${styles.heading}`}
      >
        {columnTitle}
      </h2>
      <Droppable droppableId={status}>
        {(provided) => (
          <div 
            className={`bg-white rounded-lg ${styles.height} flex flex-col gap-4 pb-5`}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            <ul
              className="p-8 flex flex-col gap-5"
            >
              {todosToRender.map((todo, index) => {
                const dragId = crypto.randomUUID();
    
                return (
                  <Draggable draggableId={todo._id}  key={todo._id} index={index}>
                    {(provided) => (
                      <div 
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                      >
                        <Todo 
                          todo={todo}
                          key={todo._id}
                          isLoading={isLoading}
                          dragTodoId={dragTodoId}
                        />
                      </div>
                    )}
                  </Draggable>
                )})}
            </ul>
    
            {status === Status.Pending && (
              <button
                className={styles.addBtn}
                onClick={toggleModal}
              >
                add todo
              </button>
            )}
            {provided.placeholder}
            {isModalOpen && <Modal closeModal={toggleModal} boardId={boardId} />} 
          </div>
        )}
        
      </Droppable>
      
    </div>
  );
}