import React, { Component } from 'react';
import '../less/PreviousCallDetails.css';
import Intent from './Intent';

export default class PreviousCallDetails extends Component {
	componentDidMount() {
		this.refs.preCall.scrollTop = this.refs.preCall.scrollHeight;
	}

	render() {
		return (
			<div className='PreviousCallDetailsRoot' ref='preCall'>
				<Intent intent='Intent Head'>Body of the intent</Intent>
				<Intent intent='Intent Head'>
					Body of the intent Body of the intent{' '}
				</Intent>
				<Intent intent='Intent Head Body of the intent '>
					Body of the intent
				</Intent>
				<Intent intent='Intent Head'>Body of the intent</Intent>
			</div>
		);
	}
}
