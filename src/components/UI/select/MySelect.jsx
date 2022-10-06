import PropTypes from 'prop-types';

import React from 'react';

const MySelect = ({ defaultValue, options, value, onChange }) => {
  return (
    <select
      className='my-select'
      value={value}
      onChange={(evt) => onChange(evt.target.value)}
    >
      <option disabled value="">
        {defaultValue}
      </option>
      {options.map((item) => (
        <option value={item.value} key={item.value}>
          {item.name}
        </option>
      ))}
    </select>
  );
};

MySelect.propTypes = {
  defaultValue: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default MySelect;
