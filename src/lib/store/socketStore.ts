// import { createSocket } from '../hooks/createSocket';
import { writable } from 'svelte/store';
import { Manager } from 'socket.io-client';

const createSocketStore = () => {
	const isOnline = writable(false);
	const manager = new Manager('http://localhost:3000', {
		autoConnect: false
	});
	const socket = writable(manager.socket('/'));

	socket.subscribe((s) => {
		s.on('connect', () => {
			isOnline.set(true);
		});
		s.on('disconnect', () => {
			isOnline.set(false);
		});
	});

	return {
		socket,
		isOnline
	};
};

export const socketStore = createSocketStore();
