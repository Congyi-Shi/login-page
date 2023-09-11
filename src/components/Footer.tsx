import React, { useState, useEffect } from 'react';

import lessStyles from '@/app.less';

const Footer: React.FC = () => {
  return (
    <div className={lessStyles.footer}>
      <span>Mode with &hearts; in Shanghai </span>
      <span> @2023 Broccoli & Co. All rights reserved.</span>
    </div>
  )
}

export default Footer;
