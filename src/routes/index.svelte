<script>
	import { onMount } from 'svelte';

	let canvas;

	onMount(async () => {
		const Phaser = await import('phaser');
		const { flockingScene } = await import('../components');

		const config = {
			canvas,
			scene: flockingScene,
			type: Phaser.WEBGL,
			width: window.innerWidth,
			height: window.innerHeight,
			transparent: true,
		};

		const phaserApp = new Phaser.Game(config);
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

	.hello {
		margin-top: calc(100vh - 600px - 54px);
		height: 100vh;
	}
</style>

<svelte:head>
	<title>Hi there</title>
</svelte:head>

<h1>Welcome</h1>
<div class="canvasContainer">
	<canvas bind:this={canvas} />
</div>
<div class="hello">
	<h1>Hello</h1>
</div>
