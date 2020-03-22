<script>
    import { onMount, onDestroy } from 'svelte';

	import Navigation from '../components/Navigation';

	let canvas;

	let arpg;
	onMount(async () => {
		const Phaser = await import('phaser');
        const { initArpg } = await import('../components');
        
        arpg = initArpg(canvas);
	});

	onDestroy(() => {
		if (arpg.destroy) {
			arpg.destroy();
		}
	});
</script>

<style>
    .canvasContainer {
		display: flex;
		justify-content: center;
		flex-direction: column;
		align-items: center;
		height: 100%;
		position: relative;
	}

	canvas {
		position: fixed;
		height: 100vh;
		width: 100vw;
		top: 0;
		z-index: -1;
	}

	
</style>

<svelte:head>
	<title>ARPG</title>
</svelte:head>

<Navigation unselectable top title="ARPG" />

<div class="canvasContainer">
	<canvas bind:this={canvas} />
</div>
