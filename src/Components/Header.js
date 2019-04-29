import React, { Component } from 'react';
import '../less/Header.css';
import logo from '../images/zemoso_logo.png';
import CallEnd from '@material-ui/icons/CallEnd';
import { Link } from 'react-router-dom';
import Timer from 'react-simple-timer';
import avatar from '../images/kp.jpg';
import Stop from '@material-ui/icons/Stop';
import Mute from '@material-ui/icons/KeyboardVoice';
import Dialpad from '@material-ui/icons/Dialpad';

export default class Header extends Component {
	state = {
		play: true,
		pause: false,
		afterCall: false
	};
	iconTextStyle = {
		color: 'white',
		margin: '0',
		fontSize: '0.8rem'
	};
	callHangUp = () => {
		this.setState({ play: false, pause: true, afterCall: true });
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
	homePage = () => {
		this.setState({ afterCall: false });
		this.props.goToHomePage();
	};
	render() {
		let connectionStatus = (
			<p>
				<b>Connecting to:</b> +19440983106
			</p>
		);
		if (this.props.startTimer) {
			connectionStatus = (
				<p>
					<b>Connected to:</b> +19440983106
				</p>
			);
		}
		let callHead = (
			<div className='callHead'>
				<div className='callInfo'>
					{connectionStatus}
					<p className='duration'>
						<Timer {...this.state} />
					</p>
				</div>
				<div className='endCallParent'>
					<CallEnd className='endCall' onClick={this.callHangUp} />
				</div>
				<div className='recordingDiv'>
					<Stop className='recording' />
					<p style={this.iconTextStyle}>Recording</p>
				</div>
				<div className='muteDiv'>
					<Mute className='mute' />
					<p style={this.iconTextStyle}>Mute</p>
				</div>
				<div className='dialpadDiv'>
					<Dialpad className='dialpad' />
					<p style={this.iconTextStyle}>Keypad</p>
				</div>
			</div>
		);

		if (this.props.callscreen) {
			return (
				<div className='callScreenHeaderRoot'>
					<Link exact to='/'>
						<img src={logo} alt='logo' onClick={this.homePage} />
					</Link>
					{connectionStatus}
					<div className='endCallParent'>
						<CallEnd className='endCall' onClick={this.callHangUp} />
					</div>
				</div>
			);
		} else if (this.state.afterCall) {
			console.log('aftercall');

			return (
				<div className='callScreenHeaderRoot'>
					<Link exact to='/'>
						<img src={logo} alt='logo' onClick={this.homePage} />
					</Link>
					{connectionStatus}
					<div className='endCallParent'>
						<CallEnd className='endCall' onClick={this.callHangUp} disabled />
					</div>
				</div>
			);
		} else {
			return (
				<div>
					<div className='callScreenHeaderRoot'>
						<div style={{ width: '100%' }}>
							<Link exact to='/'>
								<img
									className='inlineLeft logo'
									src={logo}
									alt='logo'
									onClick={this.homePage}
								/>
							</Link>
							<p className='inlineLeft'>&nbsp;ZeMoSo</p>
							<div className='inlineRight personInfo'>
								<img
									className='inlineLeft avatarDisplayPicture'
									src={avatar}
									alt='avatar'
								/>
								<p className='inlineLeft personName'>Parikshith</p>
							</div>
						</div>
						{callHead}
					</div>
				</div>
			);
		}
	}
}
