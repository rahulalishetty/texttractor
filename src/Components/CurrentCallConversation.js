import React, { Component } from 'react';
import '../less/CurrentCallConversation.css';
import Message from './Message';
import ChatHead from './ChatHead';
import Loading from './Loading';
import { splitTranscript } from '../utils/SplitTranscript';

const TRANSCRIPT_DELIMETERS = Object.freeze({
	CUSTOMER: 'Customer: ',
	COLLECTOR: 'Collector: ',
	DETECTING_SPEAKERS: 'Detecting Speakers: '
});
export default class CurrentCallConversation extends Component {
	state = {
		transcript: null
	};
	componentDidMount() {
		this.refs.chat.scrollTop = this.refs.chat.scrollHeight;
	}
	static getDerivedStateFromProps(nextProps, prevState) {
		if (nextProps.transcript !== prevState.transcript) {
			console.log('Transcript updating', nextProps.transcript);
			return { transcript: nextProps.transcript };
		}
		return null;
	}
	render() {
		let chat = null;
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
						<Message left>
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
