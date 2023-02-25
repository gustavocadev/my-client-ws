import { writable } from 'svelte/store';
import { Manager } from 'socket.io-client';

export const createSocket = (url: string) => {
	// is online
	const isOnline = writable(false);

	const manager = new Manager(url);
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
