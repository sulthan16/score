import React from 'react';
import ArrowDropDown from '@material-ui/icons/ArrowDropDown'
import { components } from 'react-select';

const DropdownIndicator = (props) => {
  return (
    <components.DropdownIndicator {...props}>
      <ArrowDropDown style={{    top:' calc(50% - 12px)',
    color: 'rgba(0, 0, 0, 0.54)',
    right: 0,
    position: 'absolute',
    pointerEvents: 'none'}}/>
    </components.DropdownIndicator>
  );
};

export default DropdownIndicator