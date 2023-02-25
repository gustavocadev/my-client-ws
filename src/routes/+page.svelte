<script lang="ts">
	import { socketStore } from '$lib/store/socketStore';

	type Message = {
		id: string;
		message: string;
		fullName: string;
	};

	const socket = socketStore.socket;
	const isOnline = socketStore.isOnline;

	let clientsId = [] as string[];
	let token = '';
	let messages = [] as Message[];
	let msg = '' as string;

	$socket?.on('clients-updated', (payload: string[]) => {
		clientsId = payload;
		console.log({ payload });
	});

	$socket?.on('message-from-server', (payload) => {
		console.log(payload);
		messages = [...messages, payload];
	});

	const handleSendToken = () => {
		socket.subscribe((value) => {
			value.io.opts.extraHeaders = {
				token
			};
		});

		// we need after set the token to connect
		$socket.connect();
	};

	const handleSendMsg = () => {
		$socket.emit('message-from-client', {
			message: msg
		});

		msg = '';
	};
</script>

<h1>Welcome to SvelteKit</h1>

<h2>{$isOnline ? 'Conected' : 'Disconected'}</h2>

<form on:submit|preventDefault={handleSendToken}>
	<input type="text" bind:value={token} />
	<button type="submit">Validar Toquen</button>
</form>
<h2>Aqui los clients Id</h2>
<h2>
	{#each clientsId as c}
		<p>{c}</p>
	{/each}
</h2>

<br />
<form on:submit|preventDefault={handleSendMsg}>
	<input type="text" bind:value={msg} />
	<input type="submit" value="Submit" />
</form>

<h2>Messages:</h2>
<ul>
	<li>
		{#each messages as msg}
			<p>{msg?.fullName}: {msg?.message}</p>
		{/each}
	</li>
</ul>
