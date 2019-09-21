import React from 'react';
import PropTypes from 'prop-types';
import Chip from '@material-ui/core/Chip';
import CancelIcon from '@material-ui/icons/Cancel';
import clsx from 'clsx';

function MultiValue(props) {
    return (
      <Chip
        tabIndex={-1}
        label={props.children}
        className={clsx(props.selectProps.classes.chip, {
          [props.selectProps.classes.chipFocused]: props.isFocused,
        })}
        onDelete={props.removeProps.onClick}
        deleteIcon={<CancelIcon {...props.removeProps} />}
      />
    );
  }
  
  MultiValue.propTypes = {
    children: PropTypes.node
  };

  export default MultiValue