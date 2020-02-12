<script>
  import Button from "../components/Button.svelte";
</script>

<style>
  h1 {
    color: white;
  }

  .options {
    position: relative;
    display: flex;
    height: 100%;
    width: 100%;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    font-family: "Minecraft";
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

<div class="options">
  <h1>Options</h1>

  <div class="buttonContainer">
    <Button link="/">Go Back</Button>
  </div>
</div>
