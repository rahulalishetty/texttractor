import React, { Component } from 'react';
import '../less/CurrentCallConversation.css';
import Message from './Message';
import ChatHead from './ChatHead';
import Loading from './Loading';
import { splitTranscript } from '../utils/splitTranscript';
import axios from '../axios-firebase';
import { TRANSCRIPT_DELIMETERS } from '../utils/TRANSCRIPT_DELIMETERS';

export default class CurrentCallConversation extends Component {
	state = {
		transcript: [],
		summary: null
	};

	static getDerivedStateFromProps(nextProps, prevState) {
		if (nextProps.transcript !== prevState.transcript) {
			console.log('Transcript updating', nextProps.transcript);
			return { transcript: nextProps.transcript };
		}
		return null;
	}

	persistCallHistory = () => {
		console.log('in persist', this.props.call);
		let caller = this.props.call;
		let today = new Date();
		let date =
			today.getDate() +
			'-' +
			(today.getMonth() + 1) +
			'-' +
			today.getFullYear();
		var time = today.getHours() + ':' + today.getMinutes();
		let currentCallDetails = {
			transcript: this.props.transcript,
			summary: this.props.summary,
			date: date,
			time: time
		};
		let callerId = caller.key;
		delete caller.key;
		if (caller.callHistory === undefined) {
			Object.assign(caller, { callHistory: [] });
			caller.callHistory.push(currentCallDetails);
		} else {
			caller.callHistory.push(currentCallDetails);
		}
		console.log(caller);
		axios.put(
			'https://texttractive.firebaseio.com/contact/' + callerId + '.json',
			caller
		);
	};
	componentDidUpdate() {
		this.refs.chat.scrollTop = this.refs.chat.scrollHeight;
	}
	render() {
		let chat = null;
		if (this.props.summary && this.props.call) {
			this.persistCallHistory();
		}

		if (this.props.transcript) {
			let splitTranscription = splitTranscript(this.props.transcript);
			chat = splitTranscription.map(c => {
				console.log('trans: ', c);
				if (c.includes(TRANSCRIPT_DELIMETERS.DETECTING_SPEAKERS)) {
					return (
						<Message speaking>
							{c.replace(TRANSCRIPT_DELIMETERS.DETECTING_SPEAKERS, '')}
							<Loading />
						</Message>
					);
				} else if (c.includes(TRANSCRIPT_DELIMETERS.COLLECTOR)) {
					return (
						<Message>{c.replace(TRANSCRIPT_DELIMETERS.COLLECTOR, '')}</Message>
					);
				} else if (c.includes(TRANSCRIPT_DELIMETERS.CUSTOMER)) {
					return (
						<Message customerName={this.props.callerName} left>
							{c.replace(TRANSCRIPT_DELIMETERS.CUSTOMER, '')}
						</Message>
					);
				}
				return null;
			});
		}

		return (
			<div className='CurrentCallConversationRoot'>
				<ChatHead>{this.props.callerName}</ChatHead>
				<div className='chat' ref='chat'>
					{chat}
					<div style={{ padding: '2%' }}> </div>
				</div>
			</div>
		);
	}
}
