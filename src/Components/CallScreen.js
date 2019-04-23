import React, { Component } from 'react';
import '../less/CallScreen.css';
import Header from './Header';
import CallDetails from './CallDetails';

export default class CallScreen extends Component {
	state = {
		onGoingCall: true
	};
	endCall = () => {
		this.setState({ onGoingCall: false });
	};
	isOnGoingCall = onGoingCall => {
		if (onGoingCall)
			return (
				<Header
					callscreen
					contactNumber={this.props.caller.phone}
					duration='02:23'
					endCall={this.endCall}
				/>
			);
		else return <Header />;
	};
	render() {
		return (
			<div className='callScreenRoot'>
				<Header
					callscreen={this.state.onGoingCall}
					contactNumber={this.props.caller.phone}
					duration='02:23'
					endCall={this.endCall}
				/>
				<CallDetails onGoingCall={this.state.onGoingCall} />
			</div>
		);
	}
}
