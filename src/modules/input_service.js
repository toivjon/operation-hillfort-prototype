export default class InputService {

  /**
   * Build a new input service for capturing user input.
   * @contructor
   * @param {*} game A reference to the game instance.
   */
  constructor(game) {
    this.game = game;
    this.keyDowns = [];
    this.mouseDowns = [];
    window.addEventListener("keydown", this.onKeyDown.bind(this));
    window.addEventListener("keyup", this.onKeyUp.bind(this));
    window.addEventListener("mousedown", this.onMouseDown.bind(this));
    window.addEventListener("mouseup", this.onMouseUp.bind(this));
    window.addEventListener("mousemove", this.onMouseMove.bind(this));
  }

  /**
   * A handler for DOM keyboard key down events.
   *
   * Handler will trace the current logical state of the key and enqueue a new
   * input event into the event queue whether the key state has been changed.
   * @param {*} event The original keyboard event from the DOM.
   */
  onKeyDown(event) {
    if (!this.keyDowns[event.keyCode]) {
      this.game.eventQueue.enqueue({
        type:    "keyDown",
        keyCode: event.keyCode
      });
      this.keyDowns[event.keyCode] = true;
    }
  }

  /**
   * A handler for DOM keyboard key up events.
   *
   * Handler will trace the current logical state of the key and enqueue a new
   * input event into the event queue whether the key state has been changed.
   * @param {*} event The original keyboard event from the DOM.
   */
  onKeyUp(event) {
    if (this.keyDowns[event.keyCode]) {
      this.game.eventQueue.enqueue({
        type:    "keyUp",
        keyCode: event.keyCode
      });
      this.keyDowns[event.keyCode] = false;
    }
  }

  /**
   * A handler for DOM mouse button down events.
   *
   * Handler will trace the current logical state of the button and enqueue a
   * new input event into the event queue whether the state has been changed.
   * @param {*} event The original mouse event from the DOM.
   */
  onMouseDown(event) {
    if (!this.mouseDowns[event.button]) {
      this.game.eventQueue.enqueue({
        type:   "mouseDown",
        button: event.button,
        x:      event.clientX,
        y:      event.clientY
      });
      this.mouseDowns[event.button] = true;
    }
  }

  /**
   * A handler for DOM mouse button up events.
   *
   * Handler will trace the current logical state of the button and enqueue a
   * new input event into the event queue whether the state has been changed.
   * @param {*} event The original mouse event from the DOM.
   */
  onMouseUp(event) {
    if (this.mouseDowns[event.button]) {
      this.game.eventQueue.enqueue({
        type:   "mouseUp",
        button: event.button,
        x:      event.clientX,
        y:      event.clientY
      });
      this.mouseDowns[event.button] = false;
    }
  }

  /**
   * A handler for DOM mouse movement events.
   *
   * Handler will forward the mouse movement event into the event queue.
   * @param {*} event The original mouse event from the DOM.
   */
  onMouseMove(event) {
    this.game.eventQueue.enqueue({
      type:      "mouseMove",
      x:         event.clientX,
      y:         event.clientY,
      movementX: event.movementX,
      movementY: event.movementY
    });
  }

}
