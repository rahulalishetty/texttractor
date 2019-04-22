import React, { Component } from 'react';
import '../less/Intent.css';
export default class Intent extends Component {
	render() {
		return (
			<div className='IntentRoot'>
				<div className='IntentHead'>{this.props.intent}</div>
				<div className='IntentBody'>{this.props.children}</div>
			</div>
		);
	}
}
