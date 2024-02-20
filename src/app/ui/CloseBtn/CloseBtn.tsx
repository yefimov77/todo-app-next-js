'use client'

import { FC } from 'react';
import styles from './closeBtn.module.css';

interface Props {
  closeModal: () => void
}

export const CloseBtn:FC<Props> = ({closeModal}) => {

  return (
    <button 
      className={styles.close}
      onClick={closeModal}
    >
      X
    </button>
  );
}