import React, { Component } from 'react';
import '../less/CallDetails.css';
import CurrentCallConversation from './CurrentCallConversation';
import PreviousCallDetails from './PreviousCallDetails';
import Timeline from './Timeline';

export default class CallDetails extends Component {
	isOnGoingCall = onGoingCall => {
		if (onGoingCall) return <Timeline />;
		else return <PreviousCallDetails />;
	};
	render() {
		return (
			<div className='callDetailsRoot'>
				{this.isOnGoingCall(this.props.onGoingCall)}
				<CurrentCallConversation personName='Rahul Alishetty' />
			</div>
		);
	}
}
