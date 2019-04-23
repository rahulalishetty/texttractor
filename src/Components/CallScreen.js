import React, { Component } from 'react';
import '../less/CallScreen.css';
import Header from './Header';
import CallDetails from './CallDetails';

export default class CallScreen extends Component {
	render() {
		return (
			<div className='callScreenRoot'>
				<Header
					callscreen={this.props.onGoingCall}
					contactNumber={this.props.caller.phone}
					duration='02:23'
					endCall={this.props.endCall}
					goToHomePage={this.props.goToHomePage}
				/>
				<CallDetails
					onGoingCall={this.props.onGoingCall}
					callerName={this.props.caller.name}
				/>
			</div>
		);
	}
}
