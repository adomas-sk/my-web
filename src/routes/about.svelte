<script>
  import Button from "../components/Button.svelte";
</script>

<style>
  h1,
  p {
    color: white;
    font-family: "Minecraft";
  }

  .about {
    position: relative;
    display: flex;
    height: 100%;
    width: 100%;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }
  .buttonContainer {
    width: 400px;
    margin: 48px;
    display: flex;
    flex-direction: column;
    height: 140px;
    justify-content: space-evenly;
  }
</style>

<svelte:head>
  <title>About</title>
</svelte:head>

<div class="about">
  <h1>My Website</h1>

  <p>Hello</p>
  <p>I'm Adomas</p>
  <p>I make things</p>
  <p>This is where I put those things</p>

  <div class="buttonContainer">
    <Button link="https://github.com/SnakesCantWearHats">My GitHub</Button>
    <Button link="/">Go Back</Button>
  </div>
</div>
