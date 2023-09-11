import React, { useState, useEffect } from 'react';

import Modal from './Modal';

import lessStyles from '@/app.less';
import '../App.css';

const ContentBody: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);

  const closeModal = () => setIsModalOpen(false);

  return (
    <div  className={lessStyles.container}>
        <h2>A better day to join </h2>
        <h2>every day</h2>
        <div style={{padding: "30px"}}>Be the first to know when we launch.</div>
        <button className={lessStyles.button} onClick={openModal}>Request an invite</button>
        <Modal isOpen={isModalOpen} onClose={closeModal}>
          <h2>Modal Content</h2>
          <p>this is the content of the modal</p>
        </Modal>
    </div>
  )
}

export default ContentBody;
