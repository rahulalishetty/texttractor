import React, { Component } from 'react';
import '../less/CurrentCallConversation.css';
import Message from './Message';
import ChatHead from './ChatHead';
import Loading from './Loading';

export default class CurrentCallConversation extends Component {
	state = {
		transcript: []
	};
	componentDidMount() {
		this.refs.chat.scrollTop = this.refs.chat.scrollHeight;
	}
	static getDerivedStateFromProps(nextProps, prevState) {
		if (nextProps.transcript !== prevState.transcript) {
			console.log('transcript', nextProps.transcript);
			return { transcript: nextProps.transcript };
		}
		return null;
	}
	render() {
		console.log(this.state.transcript);
		return (
			<div className='CurrentCallConversationRoot'>
				<ChatHead>{this.props.callerName}</ChatHead>
				<div className='chat' ref='chat'>
					{/* {this.state.transcript.map(msg => {
						return <Message>msg</Message>;
					})} */}
					<Message left>
						<Loading />
					</Message>
					<div style={{ padding: '2%' }}> </div>
				</div>
			</div>
		);
	}
}
