export default class TreeNode {

  /**
   * Build a new tree node for hiearchical data structuring.
   * @constructor
   */
  constructor() {
    this.parent = null;
    this.children = [];
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
    if (this.parent == parent) {
      return;
    } else if (this.parent != null) {
      this.parent.removeChild(this);
    }
    this.parent = parent;
    if (this.parent != null) {
      this.parent.addChild(this);
    }
  }

  /**
   * Get the parent of the node.
   *
   * Note that the return value may be null if the node does not have parent.
   * @returns {*} The parent of the node.
   */
  getParent() {
    return this.parent;
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
      this.children.push(child);
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
      this.children = this.children.filter(x => x != child);
      if (child.parent == this) {
        child.setParent(null);
      }
    }
  }

  /**
   * Check whether the node has the following child.
   *
   * Note that this funtion DOES NOT perform checks for graph-cycles!
   * @param {*} child The child to query from the children list.
   */
  hasChild(child) {
    return this.children.includes(child);
  }

  /**
   * Get the array of children.
   *
   * The returned array is not never null.
   * @returns {*} The array of children.
   */
  getChildren() {
    return this.children;
  }

}
