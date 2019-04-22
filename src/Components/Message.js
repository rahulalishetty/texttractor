import React, { Component } from 'react';
import '../less/Message.css';
export default class Message extends Component {
	styleLeft = {
		textAlign: 'left'
	};
	styleRight = {
		textAlign: 'right'
	};

	styleAvatar = {
		borderRadius: '50%',
		backgroundColor: 'lightgrey',
		padding: '3%'
	};

	render() {
		if (this.props.left) {
			return (
				<div className='MessageRoot' style={this.styleLeft}>
					<span style={this.styleAvatar}>RA</span>
					<span className='Message'>{this.props.children}</span>
				</div>
			);
		}
		return (
			<div className='MessageRoot' style={this.styleRight}>
				<span className='Message'>{this.props.children}</span>
				<span style={this.styleAvatar}>PK</span>
			</div>
		);
	}
}
