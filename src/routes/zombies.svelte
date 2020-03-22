<script>
    import { onMount, onDestroy } from 'svelte';

	import Navigation from '../components/Navigation';

	let canvas;

	let zombies;
	onMount(async () => {
		const Phaser = await import('phaser');
		const { zombiesScene } = await import('../components');

		const config = {
			canvas,
			scene: zombiesScene(),
			type: Phaser.WEBGL,
			width: window.innerWidth,
			height: window.innerHeight,
			transparent: true,
		};

        zombies = new Phaser.Game(config);
	});

	onDestroy(() => {
		if (zombies.destroy) {
			zombies.destroy();
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
	<title>Zombies</title>
</svelte:head>

<Navigation unselectable top title="Zombies" />

<div class="canvasContainer">
	<canvas bind:this={canvas} />
</div>
