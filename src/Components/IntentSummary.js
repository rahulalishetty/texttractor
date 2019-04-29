import React, { Component } from 'react';
import '../less/IntentSummary.css';
import Intent from './Intent';
import Spinner from './Spinner';

export default class IntentSummary extends Component {
	state = {
		summary: null
	};
	componentDidMount() {
		this.refs.preCall.scrollTop = this.refs.preCall.scrollHeight;
	}

	getIntents = summary => {
		const colors = ['#757575', '#ff5722', '#795548', '#78909c'];
		return summary.map((eachSummary, index) => {
			return (
				<Intent
					key={index}
					intent={eachSummary.intent}
					color={colors[index % 4]}
				>
					{eachSummary.summary}
				</Intent>
			);
		});
	};

	render() {
		let intents = <Spinner />;
		console.log(this.props.summary);
		if (this.props.summary) {
			intents = this.getIntents(this.props.summary);
		} else if (this.props.summaryFailed) {
			intents = (
				<p style={{ textAlign: 'center' }}>
					Sorry, could not get summary for this call
				</p>
			);
		}
		return (
			<div className='IntentSummaryRoot' ref='preCall'>
				{intents}
			</div>
		);
	}
}
