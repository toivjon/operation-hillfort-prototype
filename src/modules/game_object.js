import TreeNode from './tree_node.js';
import Transform from './transform.js';

export default class GameObject extends TreeNode {

  /**
   * Build a new game object.
   * @constructor
   * @param {*} game A reference to the game.
   */
  constructor(game) {
    super();
    this._game = game;
    this._name = "";
    this._active = true;
    this._transform = new Transform();
  }

  /**
   * Set the name for the game object.
   *
   * Name can be used to identify the given object within the scene. Useful
   * for example when debugging the scene contents to find a certain object.
   * @param {*} newName The name for the object.
   */
  setName(newName) {
    this._name = newName;
  }

  /**
   * Get the name of the game object.
   *
   * Name can be used to identify the given object within the scene. Useful
   * for example when debugging the scene contents to find a certain object.
   * @returns {*} The name of the object.
   */
  getName() {
    return this._name;
  }

  /**
   * Set the activity state of the game object.
   *
   * Game object activity state defines whether the object is being simulated by
   * the game ticks. A game object is active by default.
   * @param {*} newActive
   */
  setActive(newActive) {
    this._active = newActive;
  }

  /**
   * Get the activie state of the game object.
   *
   * Game object activity state defines whether the object is being simulated by
   * the game ticks. A game object is active by default.
   * @returns {*} The activity state of the object.
   */
  isActive() {
    return this._active;
  }

  /**
   * Get a reference to game object transform.
   *
   * Transform specifies the spatial location of the game object in the world.
   * @returns {*} The transform of the object.
   */
  getTransform() {
    return this._transform;
  }

}
