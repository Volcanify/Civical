<script>
	import favicon from '$lib/assets/favicon.svg';
	import '../app.css';
	import { ModeWatcher } from "mode-watcher";
	import Navbar from '$lib/components/ui/navbar.svelte'

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<Navbar/>
<ModeWatcher />
{@render children?.()}
