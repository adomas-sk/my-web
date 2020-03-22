<script>
	export let unselectable;
	export let title;
	export let top

	const navigation = [
		{
			label: 'Home',
			link: '/',
		},
		{
			label: 'About',
			link: '/about',
		},
		{
			label: 'Zombies',
			link: '/zombies',
		},
		{
			label: 'ARPG',
			link: '/arpg',
		}
	];
</script>

<style>
	.unselectable {
		user-select: none; /* Standard */
	}

	.card {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding: 8px;
		border-radius: 4px;
		background-color: rgba(0,0,0,0.1);
	}

	h1 {
		user-select: none; /* Standard */
	}

	a {
		text-decoration: none;
		color: #0824c2;
	}

    ul {
		display: flex;
		margin: 0;
		padding: 0;
		justify-content: space-evenly;
	}

	li {
		display: block;
		margin: 8px 4px 12px;
	}

	.top {
		height: calc(100vh - 20px);
		display: flex;
		flex-direction: column;
		align-items: center;
		margin-top: 20px;
	}
</style>
<nav class="{top && 'top'}">
	<div class="card">
		<h1>{title}</h1>
		<ul>
			{#each navigation as item}
				<li><a class="{unselectable && 'unselectable'}" href="{item.link}">{item.label}</a></li>
			{/each}
		</ul>
	</div>
</nav>
