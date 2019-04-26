import React, { Component } from 'react';
import '../less/TimelineCard.css';
import CallIcon from '@material-ui/icons/Call';
export default class TimelineCard extends Component {
	state = {
		fontSize: '13px',
		transform: 'rotate(0deg)'
	};

	handleDisplayNote = () => {
		if (this.state.fontSize === '13px') {
			this.setState({ fontSize: '0rem', transform: 'rotate(135deg)' });
		} else {
			this.setState({ fontSize: '13px', transform: 'rotate(0deg)' });
		}
	};
	render() {
		return (
			<div className='TimelineCardRoot' onClick={this.handleDisplayNote}>
				<div className='DateHead'>
					<CallIcon
						className='CallIcon'
						style={{ transform: this.state.transform }}
					/>
					<div className='Date'>
						{this.props.date}{' '}
						<span className='duration'>
							{this.props.time} (Duration: {this.props.duration})
						</span>
					</div>
				</div>
				<div className='Note' style={{ fontSize: this.state.fontSize }}>
					{this.props.children}
				</div>
			</div>
		);
	}
}
