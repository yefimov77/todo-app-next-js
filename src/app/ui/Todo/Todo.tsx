'use client'
import React, { FC, Key, useState } from "react";
import styles from './todo.module.css';
import { Itodo } from "@/app/lib/definitions";
import { MdDeleteForever } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import { deleteTodo } from "@/app/lib/actions";
import { Modal } from "../Modal/Modal";

interface Props {
  todo: Itodo,
}

export const Todo:FC<Props> = ({todo}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const id = todo._id;

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  }

  return (
    <li
      className=" bg-slate-300 p-5 rounded-lg"
 
    >
      <h3
        className={`text-black bold mb-3 ${styles.title}`}
      >
        {todo.title}
      </h3>
      <p>
        {todo.description}
      </p>
      <div className="flex justify-end gap-4">
        <button
          onClick={() =>deleteTodo(todo._id)}
        >
          <MdDeleteForever size={25} />
        </button>
        <button
          onClick={toggleModal}
        >
          <MdEdit size={25} />
        </button>
      </div>

      {isModalOpen && <Modal closeModal={toggleModal} todoId={id} />}
    </li> 
  );
}