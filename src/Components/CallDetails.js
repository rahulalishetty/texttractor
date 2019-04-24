import React, { Component } from 'react';
import '../less/CallDetails.css';
import CurrentCallConversation from './CurrentCallConversation';
import PreviousCallDetails from './PreviousCallDetails';
import Timeline from './Timeline';
import PropTypes from 'prop-types';
import { sipCall } from '../utils/sipUtils';
export default class CallDetails extends Component {
	constructor(props) {
		super(props);
		sipCall('+18558647776');
	}
	isOnGoingCall = onGoingCall => {
		if (onGoingCall) return <Timeline />;
		else return <PreviousCallDetails />;
	};
	render() {
		return (
			<div className='callDetailsRoot'>
				{this.isOnGoingCall(this.props.onGoingCall)}
				<CurrentCallConversation callerName={this.props.callerName} />
			</div>
		);
	}
}

CallDetails.propTypes = {
	onGoingCall: PropTypes.bool,
	callerName: PropTypes.string
};

CallDetails.defaultProps = {
	onGoingCall: true,
	callerName: 'Unknown'
};
