<script>
    import Button from './Button.svelte';

    export let buttons;
    export let version;
</script>

<style>
    .menu {
        width: 400px;
        height: 200px;
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        align-items: center;
    }
    .horizontal {
        flex-direction: row;
        width: 424px;
        height: 200px;
    }
</style>

<div class={version === 'horizontal' ? "menu horizontal" : "menu"}>
    {#each buttons as button}
        <Button margin={version === 'horizontal'} link={button.link} onClick={button.onClick}>
            {button.label}
        </Button>
    {/each}
</div>
