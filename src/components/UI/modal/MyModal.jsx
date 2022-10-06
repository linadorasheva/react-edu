import PropTypes from 'prop-types';

import React from 'react';


const MyModal = ({ children, visible, setVisible }) => {
  const rootClasses = ['my-modal'];
  if (visible) {
    rootClasses.push('active');
  }

  return (
    <div className={rootClasses.join(' ')} onClick={() => setVisible(false)}>
      <div
        className='my-modal__content'
        onClick={(evt) => evt.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
};

MyModal.propTypes = {
  children: PropTypes.element.isRequired,
  visible: PropTypes.bool.isRequired,
  setVisible: PropTypes.func.isRequired,
};

export default MyModal;
