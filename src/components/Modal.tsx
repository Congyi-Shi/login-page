import React, { useState } from 'react';
import axios from 'axios';

import lessStyles from '@/app.less';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [confirmEmail, setConfirmEmail] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

  const handleFullNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFullName(event.target.value);
    setError('');
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
    setError('');
  };

  const handleConfirmEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmEmail(event.target.value);
    setError('');
  };

  const handleSubmit = async  (event: React.FormEvent) => {
    event.preventDefault();

    if (fullName.length < 3) {
      setError('Full Name must be at least 3 characters long');
      return;
    }

    if (email !== confirmEmail) {
      setError('Email and Confirm Email must match');
      return;
    }

    setIsLoading(true);

    try {
      // 向后端发送请求
      const response = await axios.post('https://l94wc2001h.execute-api.ap-southeast-2.amazonaws.com/prod/fake-auth', {name: fullName, email});
      setIsSuccessModalOpen(true);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const closeSuccessModal = () => {
    setIsSuccessModalOpen(false);
    onClose();
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className={lessStyles['modal-overlay']}>
      <div className={lessStyles['modal-content']}>
      <h4 style={{'marginBottom': '50px'}}>Request an invite</h4>
        <form className={lessStyles['form']} onSubmit={handleSubmit}>
          <label>
            <input className={lessStyles['form-input']} type="text" placeholder='Full Name' value={fullName} onChange={handleFullNameChange} />
          </label>
          <label>
            <input className={lessStyles['form-input']} type="email" placeholder='Email' value={email} onChange={handleEmailChange} />
          </label>
          <label>
            <input className={lessStyles['form-input']} type="email" placeholder='Confirm Email'  value={confirmEmail} onChange={handleConfirmEmailChange} />
          </label>
          <button style={{"height": '40px', 'marginTop': '40px'}} type="submit" disabled={isLoading}>
            {isLoading ? 'Sending, please wait' : 'Send'}
          </button>
          {error && <p className="error">{error}</p>}
        </form>
        <button  className={lessStyles['modal-close']} onClick={onClose}>
          Close
        </button>
      </div>
      {isSuccessModalOpen && (
        <div className={lessStyles['modal-overlay']}>
          <div className={lessStyles['modal-content']}>
            <h2>All done!</h2>
            <p>You will be one of the first to experience Broccoli & Co. when we launch.</p>
            <button style={{width: '120px', height: '32px', padding: '4px', marginTop: '20px'}} onClick={closeSuccessModal}>
              Ok
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Modal;
