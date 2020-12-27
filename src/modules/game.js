import Renderer from './renderer.js'

export default class Game {

  constructor() {
    this.renderer = new Renderer();
  }

  start() {
    // TODO  [sync] load loading scene
    // TODO  [sync] show loading scene
    // TODO [async] load main menu items
    const game = this;
    function tick() {
      // TODO calculate delta time and store current tick time
      // TODO update scene only when having reasonable delta
      // TODO draw scene only when having reasonable delta
      game.renderer.render();
      requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }
}
