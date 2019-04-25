import React, { Component } from 'react';
import '../less/Header.css';
import logo from '../images/zemoso_logo.png';
import CallEnd from '@material-ui/icons/CallEnd';
import { Link } from 'react-router-dom';

export default class Header extends Component {
	render() {
		if (this.props.callscreen)
			return (
				<div className='callScreenHeaderRoot'>
					<Link exact to='/'>
						<img src={logo} alt='logo' onClick={this.props.goToHomePage} />
					</Link>
					<p className='connecting'>Connecting to: {this.props.phone}</p>
					<div className='endCallParent'>
						<CallEnd className='endCall' onClick={this.props.endCall} />
					</div>
					<p className='callDuration'>Duration: {this.props.duration}</p>
				</div>
			);
		else
			return (
				<div className='callScreenHeaderRoot'>
					<Link exact to='/'>
						<img src={logo} alt='logo' onClick={this.props.goToHomePage} />
					</Link>
				</div>
			);
	}
}
