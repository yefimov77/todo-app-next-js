'use client'
import { createTodo, updateTodo } from "@/app/lib/actions";
import { FC, FormEvent, Key, useState } from "react";

interface Props {
  closeModal:() => void,
  boardId?: string,
  todoId?: string;
}

export const Form: FC<Props> = ({ closeModal, boardId, todoId }) => {

  const handleSubmit = async (e: FormEvent) => {
    try {
      e.preventDefault();
      e.stopPropagation();

      const form = e.target as HTMLFormElement;
      const formData = new FormData(form);

      if (todoId) {
        await updateTodo(todoId, formData);
      } else {
        await createTodo(formData, boardId!);
      }

      form.reset();
      closeModal();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <form
      className="flex flex-col gap-10"
      onSubmit={handleSubmit}
    >
      <label
        htmlFor='title'
        className="text-white flex flex-col text-center"
      >
        Title
        <input
          className="text-gray-700"
          id='title'
          name='title'
          type="text"
          placeholder={todoId ? 'Enter new title' : 'Enter title'}
        />
      </label>
      <label
        htmlFor='description'
        className="text-white flex flex-col text-center"
      >
        Description
        <input
          className="text-gray-700"
          id='description'
          name='description'
          type="text"
          placeholder={todoId ? 'Enter new description' : 'Enter description'}
        />
      </label>
      <button
        type="submit"
        className="bg-gray-500 text-white rounded-lg"
      >
        {todoId ? 'Update Todo' : 'Add Todo'}
      </button>
    </form>
  );
};