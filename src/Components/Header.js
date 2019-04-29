import React, { Component } from 'react';
import '../less/Header.css';
import logo from '../images/zemoso_logo.png';
import CallEnd from '@material-ui/icons/CallEnd';
import { Link } from 'react-router-dom';
import Timer from 'react-simple-timer';

export default class Header extends Component {
	state = {
		play: true,
		pause: false
	};

	callHangUp = () => {
		this.setState({ play: false, pause: true });
		if (this.props.startTimer) {
			console.log(
				'duration: ',
				document.getElementsByClassName('time')[0].innerHTML
			);
			this.props.setDuration(
				document.getElementsByClassName('time')[0].innerHTML
			);
		}
		this.props.endCall();
	};
	render() {
		let inCallDuration = <p className='callDuration'>00:00</p>;
		let connectionStatus = (
			<p className='connectionStatus'>Connecting to: {this.props.phone}</p>
		);
		if (this.props.startTimer) {
			inCallDuration = (
				<p className='callDuration'>
					<span className='inlineBlockStyle'>
						<span className='inlineStyle'>Duration:&nbsp;</span>
						<span className='inlineStyle'>
							<Timer {...this.state} />
						</span>
					</span>
				</p>
			);
			connectionStatus = (
				<p className='connectionStatus'>Connected to: {this.props.phone}</p>
			);
		}
		if (this.props.callscreen) {
			return (
				<div className='callScreenHeaderRoot'>
					<Link exact to='/'>
						<img src={logo} alt='logo' onClick={this.props.goToHomePage} />
					</Link>
					{connectionStatus}
					<div className='endCallParent'>
						<CallEnd className='endCall' onClick={this.callHangUp} />
					</div>
					{inCallDuration}
				</div>
			);
		} else {
			return (
				<div className='callScreenHeaderRoot'>
					<Link exact to='/'>
						<img src={logo} alt='logo' onClick={this.props.goToHomePage} />
					</Link>
				</div>
			);
		}
	}
}
