import { Key } from "react";

export enum Status {
  Pending = 'pending',
  Active = 'active',
  Closed = 'closed',
} 

export interface Itodo {
  _id: string,
  title: string,
  description: string,
  boardId: string,
  status: Status,
};

export interface iUpdateData {
  title?: string,
  description?: string,
}