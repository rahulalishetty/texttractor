import React, { Component } from 'react';
import '../less/Header.css';
import logo from '../images/zemoso_logo.png';
import CallEnd from '@material-ui/icons/CallEnd';
import { Link } from 'react-router-dom';
import Timer from 'react-simple-timer';
import avatar from '../images/kp.jpg';
import Stop from '@material-ui/icons/Stop';
import MicOn from '@material-ui/icons/Mic';
import MicOff from '@material-ui/icons/MicOff';
import Dialpad from '@material-ui/icons/Dialpad';

export default class Header extends Component {
	state = {
		play: true,
		pause: false,
		afterCall: false,
		disableMic: false
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
	toggleMute = () => {
		let audio = document.getElementById('audio_remote');
		if (audio.muted === true) {
			audio.muted = false;
			this.setState({ disableMic: false });
		} else {
			audio.muted = true;
			this.setState({ disableMic: true });
		}
	};
	render() {
		let callDuration = '00:00';
		let connectionStatus = (
			<p>
				<b>Connecting to:</b> +19440983106
			</p>
		);
		let mic = null;
		if (this.state.disableMic) {
			mic = <MicOff className='mute' onClick={this.toggleMute} />;
		} else {
			mic = <MicOn className='mute' onClick={this.toggleMute} />;
		}
		let endCall = <CallEnd className='endCall' onClick={this.callHangUp} />;
		if (this.props.startTimer) {
			connectionStatus = (
				<p>
					<b>Connected to:</b> +19440983106
				</p>
			);
			callDuration = <Timer {...this.state} />;
		}
		if (this.state.afterCall) {
			connectionStatus = (
				<p>
					<b>Connected to:</b> +19440983106
				</p>
			);
			if (this.props.duration) callDuration = this.props.duration;
			endCall = (
				<CallEnd className='endCall' onClick={this.callHangUp} disabled />
			);
		}
		let callHead = (
			<div className='callHead'>
				<div className='callInfo'>
					{connectionStatus}
					<p className='duration'>{callDuration}</p>
				</div>
				<div className='endCallParent'>{endCall}</div>
				<div className='utilityIcons'>
					<div className='recordingDiv'>
						<Stop className='recording' />
						<p style={this.iconTextStyle}>Recording</p>
					</div>
					<div className='muteDiv'>
						{mic}
						<p style={this.iconTextStyle}>Mute</p>
					</div>
				</div>
			</div>
		);
		let permanentHead = (
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
			</div>
		);
		if (this.props.callscreen || this.state.afterCall) {
			return (
				<div>
					{permanentHead}
					{callHead}
				</div>
			);
			// } else if (this.state.afterCall) {
			// 	console.log('aftercall');
			// 	callDuration = this.props.duration;
			// 	return (
			// 		<div>
			// 			{permanentHead}
			// 			{callHead}
			// 		</div>
			// 	);
		} else {
			return <div>{permanentHead}</div>;
		}
	}
}
