export default class EventQueue {

  /**
   * Build a new queue for event queuing and distribution.
   * @constructor
   */
  constructor() {
    this.events = [];
    this.listeners = new Map();
  }

  /**
   * Add a listener for the target event type.
   *
   * The provided callback will be called when the given type of event is being
   * distributed. The callback function should take a single event argument.
   * @param {*} eventType The type of the event.
   * @param {*} callback The function to be called when an event is dispatched.
   */
  addListener(eventType, callback) {
    if(!this.listeners.has(eventType)) {
      this.listeners.set(eventType, [callback]);
    } else {
      this.listeners.get(eventType).push(callback);
    }
  }

  /**
   * Remove a listener from the target event type.
   *
   * After being invoked the target callback will no longer receive the target
   * type of events from the queue.
   * @param {*} eventType The type of the event.
   * @param {*} callback The function that was registered with addListener.
   */
  removeListener(eventType, callback) {
    if(this.listeners.has(eventType)) {
      let newListeners = this.listeners.get(eventType);
      newListeners = newListeners.filter(x => x !== callback);
      this.listeners.set(eventType, newListeners);
    }
  }

  /**
   * Check whether the callback is listening the target event type.
   * @param {*} eventType The type of the event.
   * @param {*} callback The function to check.
   */
  hasListener(eventType, callback) {
    return this.listeners.has(eventType)
        && this.listeners.get(eventType).indexOf(callback) !== -1
  }

  /**
   * Enqueue the given event.
   *
   * Event will be enqueued into the event queue for later dispatching. Queued
   * events will be dispatched in an priority order where the events with the
   * highest "priority" value (zero by default) are being dispatched first.
   *
   * The following list contains the reserved keys for event objects:
   * - type -- the type of the event (e.g. scene changed etc.).
   * - priority -- the priority of the event (higher is more important).
   * - time -- the time after the event is dispatched.
   * @param {*} event The event to be queued.
   */
  enqueue(event) {
    this.events.push(event);
  }

  /**
   * Dispatch events from the queue.
   *
   * Events will be distributed in the priority order where an event with the
   * highest "priority" value will be distributed first. Time events will be
   * distributed whether the provided time value is greater or equal that the
   * "time" value of the event.
   * @param {*} time The time used to check whether to distribute timed events.
   */
  dispatchAll(time) {
    let events = this.events.filter(x => !("time" in x) || x.time <= time);
    this.events = this.events.filter(x => x.time > time);
    events.sort((x, y) => x.priority - y.priority);
    events.forEach(event => this.dispatch(event));
  }

  /**
   * Dispatch the given event.
   *
   * Event will be immediately dispatched to all interested listeners. This is
   * in contrast with the enqueue function which only adds event into the queue.
   *
   * The provided event must contain a "type" value to be dispatched correctly.
   * @param {*} event The event to be dispatched.
   */
  dispatch(event) {
    if(this.listeners.has(event.type)) {
      this.listeners.get(event.type).forEach(listener => listener(event));
    }
  }

}
