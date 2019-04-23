import React from 'react';
import '../less/CallTable.css';
import CallerList from './CallerList';
import Modal from './Modal';
import Add from '@material-ui/icons/Add';
import NewCall from './NewCall';
import Spinner from './Spinner';

export default function CallTable(props) {
	let callerTable = <Spinner />;

	if (props.contacts) {
		callerTable = (
			<div className='Wrapper'>
				<CallerList contacts={props.contacts} makeCall={props.makeCall} />
				<Add
					style={{
						borderRadius: '50%',
						height: '2rem',
						width: '2rem',
						padding: '0.5rem',
						backgroundColor: 'black',
						color: 'white'
					}}
					onClick={props.openModal}
					className='Icon'
				/>
			</div>
		);
	}

	return (
		<div className='CallTable'>
			<Modal show={props.showModal} closeModal={props.closeModal}>
				<NewCall addNewContact={props.addNewContact} />
			</Modal>
			{/* <p className="CallQueue">Call Queue</p> */}
			<p className='CallQueue'>Call Queue</p>
			{callerTable}
		</div>
	);
}
