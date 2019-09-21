import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';

function Placeholder(props) {
    const { selectProps, innerProps = {} } = props;
    return (
      <Typography color="textSecondary" className={selectProps.classes.placeholder} {...innerProps}></Typography>
    );
  }
  
  Placeholder.propTypes = {
    children: PropTypes.node
  };
  
  export default Placeholder
  