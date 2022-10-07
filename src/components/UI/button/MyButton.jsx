import PropTypes from 'prop-types';
import React from 'react';

const MyButton = ({ children, ...props }) => {
  return (
    <button {...props} className={['my-btn', props.className].join(' ')}>
      {children}
    </button>
  );
};

MyButton.propTypes = {
  children: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
};

export default MyButton;
