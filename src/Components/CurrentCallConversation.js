import React, { Component } from 'react';
import '../less/CurrentCallConversation.css';
import Message from './Message';
import ChatHead from './ChatHead';

export default class CurrentCallConversation extends Component {
	componentDidMount() {
		this.refs.chat.scrollTop = this.refs.chat.scrollHeight;
	}
	render() {
		console.log('caller', this.props.callerName);
		return (
			<div className='CurrentCallConversationRoot'>
				<ChatHead>{this.props.callerName}</ChatHead>
				<div className='chat' ref='chat'>
					<Message>Hello Parikshith</Message>
					<Message left>Hi Rahul</Message>
					<Message>
						I just wanted to remaind you about the payment you need to make
						tomorrow
					</Message>
					<Message left>Yeah, thank you for remainding me</Message>
					<Message left>Let's play pubg tonight at 9 PM</Message>
					<Message>Yeah Sure</Message>
					<Message>
						We'll play Senhok with our squad and will go to pai nan
					</Message>
					<Message left>Sounds cool</Message>
					<Message>Today we'll definately win the chicken dinner</Message>
					<Message left>
						Yo Bro
						<span role='img' aria-label='Yo'>
							&#129304;
						</span>
					</Message>
					<Message left>Sounds cool</Message>
					<Message>Today we'll definately win the chicken dinner</Message>
					<Message left>
						Yo Bro
						<span role='img' aria-label='Yo'>
							&#129304;
						</span>
					</Message>
					<div style={{ padding: '2%' }}> </div>
				</div>
			</div>
		);
	}
}
