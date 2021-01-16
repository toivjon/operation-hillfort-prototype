export default class TreeNode {

  /**
   * Build a new tree node for hiearchical data structuring.
   * @constructor
   */
  constructor() {
    this._parent = null;
    this._children = [];
  }

  /**
   * Set the node parent.
   *
   * Node will be detached from the current parent (if any) before it gets
   * attached as a child for the new parent. Function will also ignore the
   * operation if the node has already been assigned as a child of the target.
   * @param {*} parent The parent for the node.
   */
  setParent(parent) {
    if (this._parent == parent) {
      return;
    } else if (this._parent != null) {
      this._parent.removeChild(this);
    }
    this._parent = parent;
    if (this._parent != null) {
      this._parent.addChild(this);
    }
  }

  /**
   * Get the parent of the node.
   *
   * Note that the return value may be null if the node does not have parent.
   * @returns {*} The parent of the node.
   */
  getParent() {
    return this._parent;
  }

  /**
   * Add a child for the node.
   *
   * Already added children will be silently ignored. Function will also update
   * the parent relation of the provided child to maintain the tree integrity.
   * @param {*} child The child to be added into the children list.
   */
  addChild(child) {
    if (!this.hasChild(child)) {
      this._children.push(child);
      child.setParent(this);
    }
  }

  /**
   * Remove a child from the node.
   *
   * Child will be removed from the children list whether found. Function will
   * also detach the child from refering this node as the parent if necessary.
   * @param {*} child The child to be removed from the children list.
   */
  removeChild(child) {
    if (this.hasChild(child)) {
      this._children = this._children.filter(x => x != child);
      if (child.getParent() == this) {
        child.setParent(null);
      }
    }
  }

  /**
   * Check whether the node has the following child.
   * @param {*} child The child to query from the children list.
   */
  hasChild(child) {
    return this._children.includes(child);
  }

  /**
   * Get the array of children.
   *
   * The returned array is not never null.
   * @returns {*} The array of children.
   */
  getChildren() {
    return this._children;
  }

}
