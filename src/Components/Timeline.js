import React, { Component } from 'react';
import '../less/Timeline.css';
import TimelineCard from './TimelineCard';

export default class Timeline extends Component {
	componentDidMount() {
		this.refs.timeline.scrollTop = this.refs.timeline.scrollHeight;
	}

	render() {
		return (
			<div className='TimelineRoot' ref='timeline'>
				<TimelineCard date='03-09-2018' time='10:30 AM' duration='02:12'>
					Get the payment by today 2pm
				</TimelineCard>
				<TimelineCard date='21-10-2018' time='02:00 PM' duration='00:30'>
					50% of the total amount is paid and remaining 50% will be paid by next
					week thursday
				</TimelineCard>
				<TimelineCard date='11-01-2019' time='11:47 AM' duration='10:15'>
					2,50,000 rupees is pending at P Shiva Reddy
				</TimelineCard>
				<TimelineCard date='03-09-2018' time='10:30 AM' duration='02:12'>
					Get the payment by today 2pm
				</TimelineCard>
				<TimelineCard date='21-10-2018' time='02:00 PM' duration='00:30'>
					50% of the total amount is paid and remaining 50% will be paid by next
					week thursday
				</TimelineCard>
				<TimelineCard date='11-01-2019' time='11:47 AM' duration='10:15'>
					2,50,000 rupees is pending at P Shiva Reddy
				</TimelineCard>
				<div style={{ padding: '3%' }}> </div>
			</div>
		);
	}
}
