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

	startTimer = start => {
		this.timer = setInterval(() => this.tick(start), 1000);
	};
	tick = start => {
		this.setState({ seconds: new Date() - start });
	};
	callHangUp = () => {
		this.setState({ play: false, pause: true });
		console.log(
			'duration: ',
			document.getElementsByClassName('time')[0].innerHTML
		);
		this.props.setDuration(
			document.getElementsByClassName('time')[0].innerHTML
		);
		this.props.endCall();
	};
	render() {
		if (this.props.callscreen) {
			return (
				<div className='callScreenHeaderRoot'>
					<Link exact to='/'>
						<img src={logo} alt='logo' onClick={this.props.goToHomePage} />
					</Link>
					<p className='connecting'>Connecting to: {this.props.phone}</p>
					<div className='endCallParent'>
						<CallEnd className='endCall' onClick={this.callHangUp} />
					</div>
					<p className='callDuration'>
						<span style={{ display: 'inline-block' }}>
							<span style={{ display: 'inline', float: 'left' }}>
								Duration:&nbsp;
							</span>
							<span style={{ display: 'inline', float: 'left' }}>
								<Timer {...this.state} />
							</span>
						</span>
					</p>
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
