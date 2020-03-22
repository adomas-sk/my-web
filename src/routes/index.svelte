<script>
	import { onMount, onDestroy } from 'svelte';

	import Navigation from '../components/Navigation';

	let canvas;

	let flocking;
	onMount(async () => {
		const Phaser = await import('phaser');
		const { flockingScene } = await import('../components');

		const config = {
			canvas,
			scene: flockingScene(),
			type: Phaser.WEBGL,
			width: window.innerWidth,
			height: window.innerHeight,
			transparent: true,
		};

		flocking = new Phaser.Game(config);
	});

	onDestroy(() => {
		if (flocking.destroy) {
			flocking.destroy();
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
	<title>Hi there</title>
</svelte:head>

<Navigation title="Welcome" />

<div class="canvasContainer">
	<canvas bind:this={canvas} />
</div>
