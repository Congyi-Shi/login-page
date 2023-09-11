import React, { useState, useEffect } from 'react';

import lessStyles from '@/app.less';

const Header: React.FC = () => {
  return (
    <div className={lessStyles.header}>
      BROCCOLI & CO .
    </div>
  )
}

export default Header;
