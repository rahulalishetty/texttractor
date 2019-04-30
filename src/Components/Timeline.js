import React, { Component } from 'react';
import '../less/Timeline.css';
import TimelineCard from './TimelineCard';
import { connect } from 'react-redux';
import NoHistory from '../images/noHistory.png';
import * as actionTypes from '../store/actions';
import axios from '../axios-firebase';
import ChatHead from './ChatHead';

class Timeline extends Component {
	state = {
		callHistory: null
	};
	componentDidMount() {
		axios
			.get(
				'https://texttractive.firebaseio.com/contacts/' +
					this.props.call.key +
					'.json'
			)
			.then(response => {
				this.setState({ callHistory: response.data.callHistory });
				console.log(response);
			});
	}
	componentWillUnmount() {
		this.props.endCall();
	}
	componentDidUpdate() {
		this.refs.timeline.scrollTop = this.refs.timeline.scrollHeight;
	}
	getTimeLineCards = () => {
		return this.state.callHistory.map((eachCallHistory, index) => {
			return eachCallHistory.summary.map((eachSummary, summaryIndex) => {
				return (
					<TimelineCard
						key={this.props.call.key + index + summaryIndex}
						date={eachCallHistory.date}
						time={eachCallHistory.time}
						duration={eachCallHistory.duration}
					>
						{eachSummary.summary}
					</TimelineCard>
				);
			});
		});
	};

	render() {
		console.log('timeline', this.state.callHistory);
		let timeLine = (
			<div className='NoHistory'>
				<p>No call history found </p> <img src={NoHistory} />{' '}
			</div>
		);
		if (this.state.callHistory) {
			timeLine = this.getTimeLineCards();
		}
		return (
			<div className='TimelineRoot' ref='timeline'>
				<ChatHead>CALL HISTORY</ChatHead>
				<div style={{ padding: '2%' }}> </div>
				{timeLine}
				<div style={{ padding: '3%' }}> </div>
			</div>
		);
	}
}

const mapDispatchToProps = dispatch => {
	return {
		endCall: () => dispatch({ type: actionTypes.END_CALL }),
		placeCall: call => dispatch({ type: actionTypes.PLACE_CALL, payload: call })
	};
};

const mapStateToProps = state => {
	return {
		call: state.call
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Timeline);
