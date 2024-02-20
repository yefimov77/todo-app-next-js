'use server';
import { connect } from "@/dbConfig/conectTodb";
import Board from "./models/Board";
import Todo from "./models/Todo";
import { revalidatePath } from "next/cache";
import { Key } from "react";
import { Status, iUpdateData } from "./definitions";

export const createNewBoard = async (boardId: String) => {
  try {
    await connect();

    const board = new Board({
      name: `Board ${boardId}`,
      boardId
    });

    await board.save();

  } catch(err) {
    console.log(err)
  }
}

export const getBoardWithTodosById = async (boardId: String) => {
  try {
    await connect();

    let board = await Board.findOne( { boardId });

    if (!board) {
      board = await createNewBoard(boardId);
    }

    const todos = await Todo.find({ boardId });

    if (!todos.length) {
      return [];
    }
    const todosWithIdAsString = todos.map(todo => {
      return { ...todo.toObject(), _id: todo._id.toString() };
    });

    return todosWithIdAsString;

  } catch (err) {
    console.log(err);
  }
};

export const createTodo = async (formData: FormData, boardId: String) => {
  try {
    await connect();
    const title = formData.get('title');
    const description = formData.get('description');
  
    
    const todo = new Todo({
      title,
      description,
      boardId
    });

    await todo.save();

    revalidatePath('/[boardId]', 'page');
    
  } catch (err) {
    console.log(err);
  }
};

export const deleteTodo = async (_id: Key) => {
  try {
    await connect();

    await Todo.findByIdAndDelete({_id});

    revalidatePath('/[boardId]', 'page');

  } catch (err) {
    console.log(err);
  }
}

export const updateTodo = async (_id: Key, formData: FormData) => {
  try {
    await connect();

    const updateData: iUpdateData = {};

    const title = formData.get('title') as string | undefined;

    if (title) {
      updateData.title = title;
    }

    const description = formData.get('description') as string | undefined;

    if (description) {
      updateData.description = description
    }

    const updatedTodo = await Todo.findByIdAndUpdate(_id, updateData);

    await updatedTodo.save();

    revalidatePath('/[boardId]', 'page');
  } catch (err) {
    console.log(err);
  }
};


export const updateTodoStatus = async (_id: string, status: Status) => {
  try {
    const updatedTodo = await Todo.findByIdAndUpdate(_id, {status});

    await updatedTodo.save();

  } catch (err) {
    console.log(err);
  }
};
