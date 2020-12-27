export default class Renderer {

  constructor() {
    // require and store a reference to game canvas element.
    this.canvas = document.getElementById("glCanvas");
    if (!this.canvas) {
      throw "Failed to find a HTML canvas element with ID 'glCanvas'";
    }

    // require and store a reference to canvas WebGL 2 context.
    this.gl = this.canvas.getContext("webgl2");
    if (!this.gl) {
      throw "Failed to acquire a WebGL 2 context for the HTML canvas.";
    }

    // specify WebGL base configuration.
    this.gl.clearColor(0.0, 0.0, 0.0, 1.0);
  }

  render() {
    this.gl.clear(this.gl.COLOR_BUFFER_BIT);
  }

}
