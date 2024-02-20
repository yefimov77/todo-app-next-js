import { Itodo, Status } from "@/app/lib/definitions";



export const getTodosToRender = (todos: Itodo[], status: Status) => {
  return todos.filter(todo => todo.status === status);
}