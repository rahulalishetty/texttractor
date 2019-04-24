import React, { Component } from 'react';
import Header from './Components/Header';
import CallTable from './Components/CallTable';
import CallScreen from './Components/CallScreen';
import CallDetails from './Components/CallDetails';
import './App.css';
import { initializeSip, sipRegister, sipHangup } from './utils/sipUtils';
import axios from './axios-firebase';

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			call: null,
			onGoingCall: false,
			phoneNumber: null,
			showModal: false,
			contacts: null
		};
		initializeSip();
		sipRegister();
	}
	componentDidMount() {
		let fetchedRows = null;
		axios
			.get('https://texttractive.firebaseio.com/contact.json')
			.then(response => {
				fetchedRows = response.data;
				console.log(Object.values(fetchedRows));
				fetchedRows = Object.values(fetchedRows);
				this.setState({ contacts: fetchedRows });
			})
			.catch(error => console.log(error));
	}
	openModal = () => {
		console.log('open model');
		this.setState({ showModal: true });
	};

	closeModal = () => {
		this.setState({ showModal: false });
	};

	addNewContact = newContact => {
		let updatedContacts = this.state.contacts;
		updatedContacts.push(newContact);
		console.log(updatedContacts);
		this.setState({ contacts: updatedContacts });
		axios
			.post('/contact.json', newContact)
			.then(response => console.log(response))
			.catch(error => console.log(error));
	};
	makeCall = caller => {
		this.setState({
			call: caller,
			onGoingCall: true,
			phoneNumber: caller.phone
		});
	};

	endCall = () => {
		this.setState({ onGoingCall: false });
		sipHangup();
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
			show = (
				<CallTable
					makeCall={this.makeCall}
					contacts={this.state.contacts}
					openModal={this.openModal}
					closeModal={this.closeModal}
					addNewContact={this.addNewContact}
					showModal={this.state.showModal}
				/>
			);
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
