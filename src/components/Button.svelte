<script>
    export let margin;
    export let onClick;
    export let link;

    let externalLink = false;
    if (link && link[0] !== '/') {
        externalLink = true;
    }
</script>

<style>
    button, a {
        height: 40px;
        width: 100%;
        font-family: 'Minecraft';
        background-image: url('/minecraftButton.png');
        outline: 2px solid black;
        position: relative;
        margin: 0;
        display: inline-block;
        background-repeat: repeat;
        padding: 0;
        text-align: center;
        color: white;
        text-shadow: 3px 3px #4C4C4C;
        border-bottom: 4px solid #565656;
        border-right: 2px solid #565656;
        border-left: 2px solid #AAA;
        border-top: 2px solid #AAA;
        box-sizing: border-box;
        font-size: 16px;
        text-decoration: none;
        text-transform: none;
        line-height: 2;
    }

    .margin {
        margin: 12px;
    }

    button:hover, a:hover {
        border-bottom: 4px solid #59639A;
        border-right: 2px solid #59639A;
        border-left: 2px solid #BDC6FF;
        border-top: 2px solid #BDC6FF;
        background-image: url('/minecraftButtonHover.png');
        color: #FFFFA0;
    }
</style>
{#if link}
    <a href={link} target={externalLink ? '_blank' : ''} class={margin ? 'margin' : ''}>
        <slot></slot>
    </a>
{:else}
    <button on:click={onClick} class={margin ? 'margin' : ''}>
        <slot></slot>
    </button>
{/if}
