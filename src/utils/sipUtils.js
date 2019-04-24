'use-strict';

/**
 * @author Balraj Singh
 */

import {
	startRingTone,
	stopRingTone,
	stopRingbackTone,
	doCallEndThings,
	isBusy,
	generateUID,
	startTranscription
} from './callHelper';
let oSipStack,
	oSipSessionRegister,
	oSipSessionCall,
	oSipSessionTransferCall,
	audioRemote,
	oConfigCall;
const SIPml = window.SIPml;
let UID;
let isTransportError = false,
	isOnCall = false,
	stackStopped = false;
let callEndStatus = 'Call Ended';
export const sipRegister = () => {
	console.log('Registering');

	try {
		oSipStack = new SIPml.Stack({
			realm: '34.217.60.9:8089',
			impi: 'sipML5',
			impu: 'sip:sipML5@34.217.60.9',
			password: 'zemoso@321',
			display_name: 'sipML5',
			ice_servers: '[]',
			websocket_proxy_url: 'wss://34.217.60.9:8089/ws',
			events_listener: {
				events: '*',
				listener: onSipEventStack
			}
		});

		if (oSipStack.start() !== 0) {
			//stack did not start
		}
	} catch (e) {
		//TODO
		//do something about the exception thrown
		console.log('Stack start exception', e);
	}
};

export const initializeSip = () => {
	SIPml.setDebugLevel('info');
	audioRemote = document.getElementById('audio_remote');
	console.log('Init Audio', audioRemote);
	SIPml.init(postInit);
};

const postInit = () => {
	console.log('Audio remote', audioRemote);

	oConfigCall = {
		audio_remote: audioRemote,
		bandwidth: {
			audio: undefined,
			video: undefined
		},
		video_size: {
			minWidth: undefined,
			minHeight: undefined,
			maxWidth: undefined,
			maxHeight: undefined
		},
		events_listener: {
			events: '*',
			listener: onSipEventSession
		}
	};
};

export const sipCall = phoneNumber => {
	//outgoing call
	if (oSipStack && !oSipSessionCall) {
		UID = generateUID(phoneNumber);
		oSipSessionCall = oSipStack.newSession('call-audio', oConfigCall);
		oSipSessionCall.call(phoneNumber, {
			sip_headers: [
				{
					name: 'UID',
					value: UID,
					session: false
				},
				{
					name: 'Caller-ID',
					value: '7386909035', //todo
					session: false
				},
				{
					name: 'AgentId',
					value: '1234',
					session: false
				}
			]
		});
	}
	//incoming call
	else if (oSipSessionCall) {
		//accepting it
		oSipSessionCall.accept(oConfigCall);
		stopRingTone();
		startTranscription(UID);
	}
};

// Mute or Unmute the call
export const sipToggleMute = () => {
	if (oSipSessionCall) {
		console.log('Muting');
		const mute = !oSipSessionCall.bMute;
		const muteStatus = oSipSessionCall.mute('audio' /*could be 'video'*/, mute);
		if (muteStatus != 0) {
			console.log('Mute Failed');
			return 'NOT OK';
		}
		oSipSessionCall.bMute = mute;
		return 'OK';
	}

	return 'OK';
};

export const sipSendDTMF = c => {
	if (oSipSessionCall && c) {
		if (oSipSessionCall.dtmf(c) == 0) {
			//play dtmf tone here
		}
	}
};

export const sipUnregister = () => {
	if (oSipStack) {
		oSipStack.stop();
	}
};

export function sipHangup() {
	if (oSipSessionCall) {
		oSipSessionCall.hangup({
			events_listener: { events: '*', listener: onSipEventSession }
		});
		oSipSessionCall = null;
		//store.dispatch.changeCallState({ calling: false, status : 'Connected to' })
	}
}

// Callback function for SIP Stacks
const onSipEventStack = (e /*SIPml.Stack.Event*/) => {
	// tsk_utils_log_info('==stack event = ' + e.type);
	console.log('Stack Event', e);

	if (e.type == 'i_new_message') {
		UID = e.getContentString();
		console.log('UID may be', UID);
	}

	let iSipResponseCode = e.getSipResponseCode();
	switch (e.type) {
		case 'started': {
			stackStopped = false;
			console.log('Stack Started');
			// catch exception for IE (DOM not ready)
			try {
				// LogIn (REGISTER) as soon as the stack finish starting
				oSipSessionRegister = this.newSession('register', {
					expires: 200,
					events_listener: { events: '*', listener: onSipEventSession }
				});
				oSipSessionRegister.register();
			} catch (e) {}

			break;
		}
		case 'stopping':
		case 'stopped':
		case 'failed_to_start':
		case 'failed_to_stop': {
			stackStopped = true;
			// store.dispatch(toggleSipConnectionStatus({ connected: false }));

			if (!oSipStack) {
				return;
			}

			if (isOnCall) {
				isOnCall = false;
				callEndStatus = 'Call Disconnected';
				nullifySipSessionCall();
				doCallEndThings(e, UID);
				return;
			}

			if (e.type == 'stopped') {
				if (oSipSessionCall) {
					oSipSessionCall = null;
					oSipSessionRegister = null;
				}
			}

			stopRingbackTone();
			stopRingTone();

			break;
		}

		case 'i_new_call': {
			if (oSipSessionCall) {
				// do not accept the incoming call if we're already 'in call'
				console.log('Hanging up...Already in call');
				e.newSession.hangup(); // comment this line for multi-line support
			} else {
				oSipSessionCall = e.newSession;
				// start listening for events
				oSipSessionCall.setConfiguration(oConfigCall);
				startRingTone();

				const sRemoteNumber =
					oSipSessionCall.getRemoteFriendlyName() || 'unknown';
				console.log('Incoming Call from', sRemoteNumber);
				sipCall(sRemoteNumber);
			}
			break;
		}

		case 'm_permission_requested': {
			break;
		}
		case 'm_permission_accepted':
		case 'm_permission_refused': {
			if (e.type == 'm_permission_refused') {
			}
			break;
		}

		case 'starting': {
			break;
		}
		default:
			break;
	}
};
// Callback function for SIP sessions (INVITE, REGISTER, MESSAGE...)
function onSipEventSession(e /* SIPml.Session.Event */) {
	// tsk_utils_log_info('==session event = ' + e.type);
	console.log('Sip Event Occured', e);
	switch (e.type) {
		case 'connecting':
		case 'connected': {
			if (e.description === 'Call in progress...') {
				isOnCall = true;
			} else if (e.description === 'In Call') {
				console.log('Now In Call');
				isOnCall = true;
				startTranscription(UID);
			} else if (e.description === 'Connecting...') {
				//stack is connecting
			} else if (e.description === 'Connected') {
				//stack connected
			}
			break;
		}
		case 'transport_error': {
			isTransportError = true;
			break;
		}
		case 'terminating':
		case 'terminated': {
			isOnCall = false;

			if (isTransportError) {
				if (e.type == 'terminated') {
					isTransportError = false;
				}
				return;
			}

			if (stackStopped) {
				return;
			}

			if (e.type == 'terminated') {
				if (e.getSipResponseCode() !== 403) {
					nullifySipSessionCall();
					doCallEndThings(e, UID);
				}
			}

			stopRingTone();
			stopRingbackTone();

			break;
		}
		case 'i_ect_new_call': {
			oSipSessionTransferCall = e.session;
			break;
		}
		case 'i_ao_request': {
			const iSipResponseCode = e.getSipResponseCode();

			//session is in progress
			if (iSipResponseCode == 180 || iSipResponseCode == 183) {
				startRingTone();
			}

			if (iSipResponseCode >= 400 && !isBusy(iSipResponseCode)) {
				//call failed
				//show status accordingly
				if (iSipResponseCode == 484) {
					//wrong number
				} else {
					//call failed for some reason
					//just show call failed
				}
			}

			if (iSipResponseCode == 302) {
				//call forwarding
			}
			break;
		}
		case 'm_early_media': {
			stopRingbackTone();
			stopRingTone();
			break;
		}
		case 'm_local_hold_ok': {
			//call on hold
			if (e.session == oSipSessionCall) {
				if (oSipSessionCall.bTransfering) {
					oSipSessionCall.bTransfering = false;
					// this.AVSession.TransferCall(this.transferUri);
				}
				oSipSessionCall.bHeld = true;
			}
			break;
		}
		case 'm_local_hold_nok': {
			if (e.session == oSipSessionCall) {
				oSipSessionCall.bTransfering = false;
			}
			break;
		}
		case 'm_local_resume_ok': {
			if (e.session == oSipSessionCall) {
				oSipSessionCall.bTransfering = false;

				if (SIPml.isWebRtc4AllSupported()) {
					// IE don't provide stream callback yet
				}
			}
			break;
		}
		case 'm_local_resume_nok': {
			if (e.session == oSipSessionCall) {
				oSipSessionCall.bTransfering = false;
			}
			break;
		}
		case 'm_remote_hold': {
			if (e.session == oSipSessionCall) {
			}
			break;
		}
		case 'm_remote_resume': {
			if (e.session == oSipSessionCall) {
			}
			break;
		}
		case 'm_bfcp_info': {
			if (e.session == oSipSessionCall) {
			}
			break;
		}

		case 'o_ect_trying': {
			if (e.session == oSipSessionCall) {
			}
			break;
		}
		case 'o_ect_accepted': {
			if (e.session == oSipSessionCall) {
			}
			break;
		}
		case 'o_ect_completed':
		case 'i_ect_completed': {
			if (e.session == oSipSessionCall) {
				if (oSipSessionTransferCall) {
					oSipSessionCall = oSipSessionTransferCall;
				}
				oSipSessionTransferCall = null;
			}
			break;
		}
		case 'o_ect_failed':
		case 'i_ect_failed': {
			if (e.session == oSipSessionCall) {
			}
			break;
		}
		case 'o_ect_notify':
		case 'i_ect_notify': {
			if (e.session == oSipSessionCall) {
				if (e.getSipResponseCode() >= 300) {
					if (oSipSessionCall.bHeld) {
						oSipSessionCall.resume();
					}
				}
			}
			break;
		}
		default:
			break;
	}
}

//if stack stopped due to network change
export const restartStack = () => {
	if (!oSipStack) {
		return;
	}

	oSipSessionCall = null;
	oSipSessionRegister = null;

	if (oSipStack.start() != 0) {
		//still not started
	}
	return;
};

const nullifySipSessionCall = () => {
	if (oSipSessionCall) {
		oSipSessionCall = null;
	}
};

//listen to network change
window.addEventListener('offline', e => {
	if (isOnCall) {
		console.log('INCALL');
		isOnCall = false;
		callEndStatus = 'Call Disconnected';
		sipHangup();
		oSipStack.stop();
	} else if (!stackStopped) {
		stackStopped = true;
		oSipStack.stop();
	}
});
