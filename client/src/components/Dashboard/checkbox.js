import React from 'react';

const Checkbox = ({ label, isSelected, onCheckboxChange }) => (
  <div className='form-check'>
    <label>
      <input
        style={{ marginRight: '3px' }}
        type='checkbox'
        name={label}
        defaultChecked={isSelected}
        onChange={onCheckboxChange}
        className='form-check-input'
      />
      {label}
    </label>
  </div>
);

export default Checkbox;