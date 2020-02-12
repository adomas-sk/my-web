<style>
  @font-face {
    font-family: "Minecraft";
    src: url("/mcfont.eot");
    src: url("/mcfont.eot?#iefix") format("embedded-opentype"),
      url("/mcfont.woff") format("woff"), url("/mcfont.ttf") format("truetype"),
      url("/mcfont.svg#svgFontName") format("svg");
  }

  main {
    position: relative;
    width: 100%;
    height: 100vh;
    background: url("/mcdirt.jpg");
    background-repeat: repeat;
    background-size: 64px 64px;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    overflow: hidden;
  }
  main:before {
    content: "";
    position: absolute;
    height: 100%;
    width: 100%;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.6);
  }

  .tint {
    position: fixed;
    height: 100%;
    width: 100%;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.6);
  }
</style>

<div class="tint" />
<main>
  <slot />
</main>
