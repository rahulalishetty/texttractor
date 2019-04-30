import React, { Component } from 'react';
import '../less/Loading.css';
export default class Loading extends Component {
	render() {
		return (
			<span className='dots-cont'>
				<span className='dot dot-1' />
				<span className='dot dot-2' />
				<span className='dot dot-3' />
			</span>
		);
	}
}
