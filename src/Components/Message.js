import React, { Component } from 'react';
import '../less/Message.css';
export default class Message extends Component {
	styleLeft = {
		textAlign: 'left'
	};
	styleRight = {
		textAlign: 'right'
	};

	render() {
		if (this.props.left) {
			return (
				<div className='MessageRoot' style={this.styleLeft}>
					<span className='Avatar'>RA</span>
					<span className='Message'>{this.props.children}</span>
				</div>
			);
		}
		return (
			<div className='MessageRoot' style={this.styleRight}>
				<span className='Message'>{this.props.children}</span>
				<span className='Avatar'>PK</span>
			</div>
		);
	}
}
