export default class Renderer {

  constructor() {
    // require and store a reference to game canvas element.
    this._canvas = document.getElementById("glCanvas");
    if (!this._canvas) {
      throw "Failed to find a HTML canvas element with ID 'glCanvas'";
    }

    // require and store a reference to canvas WebGL 2 context.
    this._gl = this._canvas.getContext("webgl2");
    if (!this._gl) {
      throw "Failed to acquire a WebGL 2 context for the HTML canvas.";
    }

    // specify WebGL base configuration.
    this._gl.clearColor(0.0, 0.0, 0.0, 1.0);
  }

  render() {
    this._gl.clear(this._gl.COLOR_BUFFER_BIT);
  }

}
