import React, { Component } from 'react';
import '../less/CallDetails.css';
import CurrentCallConversation from './CurrentCallConversation';
import PreviousCallDetails from './PreviousCallDetails';
import Timeline from './Timeline';
import PropTypes from 'prop-types';
import { sipCall } from '../utils/sipUtils';
import { connect } from 'react-redux';

class CallDetails extends Component {
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
				<CurrentCallConversation
					callerName={this.props.callerName}
					transcript={this.props.transcript}
				/>
			</div>
		);
	}
}

// CallDetails.propTypes = {
// 	onGoingCall: PropTypes.bool,
// 	callerName: PropTypes.string
// };

// CallDetails.defaultProps = {
// 	onGoingCall: true,
// 	callerName: 'Unknown'
// };

const mapStateToProps = state => {
	return {
		onGoingCall: state.onGoingCall,
		phoneNumber: state.phoneNumber,
		callerName: state.callerName,
		transcript: state.transcript
	};
};

export default connect(mapStateToProps)(CallDetails);
