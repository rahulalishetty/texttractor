import React, { Component } from 'react';
import Header from './Components/Header';
import CallTable from './Components/CallTable';
import CallDetails from './Components/CallDetails';
import { connect } from 'react-redux';
import * as actionTypes from './store/actions';
import { initializeSip, sipRegister } from './utils/sipUtils';
import { Route } from 'react-router-dom';

class App extends Component {
	constructor(props) {
		super(props);
		initializeSip();
		sipRegister();
	}

	render() {
		return (
			<div className='AppRoot'>
				<Header
					callscreen={this.props.onGoingCall}
					phone={this.props.phoneNumber}
					duration='02:23'
					endCall={this.props.endCall}
					goToHomePage={this.props.goToHomePage}
				/>
				<Route exact path='/' component={CallTable} />
				<Route path='/call' component={CallDetails} />
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		call: state.call,
		onGoingCall: state.onGoingCall,
		phoneNumber: state.phoneNumber,
		callerName: state.callerName
	};
};

const mapDispatchToProps = dispatch => {
	return {
		goToHomePage: () => dispatch({ type: actionTypes.GOTO_HOME }),
		endCall: () => dispatch({ type: actionTypes.END_CALL })
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(App);
