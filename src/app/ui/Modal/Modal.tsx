'use client'

import styles from './modal.module.css';
import { Form } from '../Form/Form';
import { CloseBtn } from '../CloseBtn/CloseBtn';
import { FC } from 'react';

interface Props {
  closeModal: () => void,
  boardId?: string,
  todoId?: string,
}

export const Modal:FC<Props> =({closeModal, boardId, todoId}) => {
  
  return (
    <div className={`${styles.modal}`}>
      <div className={`${styles.content}`}>
        <CloseBtn closeModal={closeModal} />
        <Form closeModal={closeModal} boardId={boardId} todoId={todoId}/>
      </div>
    </div>
  );
};