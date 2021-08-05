import { Alert } from '@material-ui/lab';
import React from 'react';

const Message = ({ severity, children }) => {
  // return <Alert variant={variant}>{children}</Alert>;
  return <Alert severity={severity}>{children}</Alert>;
};

Message.defaultProps = {
  variant: 'info',
};

export default Message;
