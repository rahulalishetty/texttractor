import React, { Component } from 'react';
import '../less/TimelineCard.css';
import CallIcon from '@material-ui/icons/Call';
export default class TimelineCard extends Component {
	render() {
		return (
			<div className='TimelineCardRoot'>
				<CallIcon className='CallIcon' />
				<div className='cardRoot' style={{ zIndex: '-99' }}>
					<div className='timelineCallInfo'>
						<div className='note'>{this.props.children}</div>
						<div className='dateTimeDuration'>
							{this.props.date} at {this.props.time} for {this.props.duration}
						</div>
					</div>
				</div>
			</div>
		);
	}
}
