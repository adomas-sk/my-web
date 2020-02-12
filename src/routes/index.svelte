<script>
  import McMenu from "../components/McMenu.svelte";
</script>

<style>
  img {
    position: relative;
    padding-bottom: 100px;
  }

  .body {
    height: 100%;
    width: 100%;
    overflow: hidden;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
  }

  .menu {
    display: flex;
    flex-direction: column;
    height: 300px;
    align-items: center;
  }
</style>

<svelte:head>
  <title>Hi there</title>
</svelte:head>

<div class="body">
  <!-- <video width="100%" autoplay loop>
    <source src="/vid.webm" type="video/webm">
    Your browser does not support the video tag.
  </video> -->

  <img src="/logo.png" alt="minecraft logo" />

  <div class="menu">
    <McMenu
      version="vertical"
      buttons={[{ label: 'Singleplayer', onClick: () => console.log('Singleplayer') }, { label: 'Boids', link: '/boids' }, {label:'About', link: '/about'}]} />

    <McMenu
      version="horizontal"
      buttons={[{ label: 'Options', link: '/options' }, { label: 'Quit Game', onClick: () => alert('¯\\_(ツ)_/¯') }]} />
  </div>

</div>
