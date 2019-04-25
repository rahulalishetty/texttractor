import React, { Component } from 'react';
import '../less/Loading.css';
export default class Loading extends Component {
	render() {
		return (
			<span class='dots-cont'>
				<span class='dot dot-1' />
				<span class='dot dot-2' />
				<span class='dot dot-3' />
			</span>
		);
	}
}
