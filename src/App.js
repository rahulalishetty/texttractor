import React, { Component } from 'react';
import Header from './Components/Header';
import CallTable from './Components/CallTable';
import CallScreen from './Components/CallScreen';
import CallDetails from './Components/CallDetails';
import './App.css';
import { sipRegister } from './utils/sipUtils';

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			call: null,
			onGoingCall: false,
			phoneNumber: null
		};
		sipRegister();
	}

	makeCall = caller => {
		this.setState({
			call: caller,
			onGoingCall: true,
			phoneNumber: caller.phone
		});
	};

	endCall = () => {
		this.setState({ onGoingCall: false });
	};

	isOnGoingCall = () => {
		return this.state.onGoingCall;
	};
	goToHomePage = () => {
		this.setState({ call: null, onGoingCall: false });
	};
	getPhoneNumber = () => {
		if (this.state.call) return this.state.call.phone;
		else return null;
	};
	render() {
		let show = null;
		if (this.state.call === null) {
			show = <CallTable makeCall={this.makeCall} />;
		} else {
			show = (
				<CallDetails
					onGoingCall={this.state.onGoingCall}
					callerName={this.state.call.name}
				/>
			);
		}
		return (
			<div className='AppRoot'>
				<Header
					callscreen={this.state.onGoingCall}
					phone={this.state.phoneNumber}
					duration='02:23'
					endCall={this.endCall}
					goToHomePage={this.goToHomePage}
				/>
				{show}
			</div>
		);
	}
}

export default App;
