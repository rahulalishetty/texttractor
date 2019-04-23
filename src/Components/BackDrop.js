import React from 'react';
import PropTypes, { bool } from 'prop-types';
import '../less/BackDrop.css';

const backdrop = props =>
	props.show ? <div className='Backdrop' onClick={props.clicked} /> : null;

export default backdrop;

backdrop.propTypes = {
	clicked: PropTypes.func
};
