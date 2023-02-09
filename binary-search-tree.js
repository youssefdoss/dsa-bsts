"use strict";

class Node {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }

  /** findRecursively(val): Search from the invoking node for a node with value val.
  * Returns the node, if found; else undefined. Uses recursion. */

  findRecursively(val) {
    if (val < this.val) {
      if (this.left === null) return undefined;
      return this.left.findRecursively(val);
    } else if (val > this.val) {
      if (this.right === null) return undefined;
      return this.right.findRecursively(val);
    }
    return this;
  }

  /** insertRecursively(val): Starting at the invoking node, insert a new node
   * into the BST with value val. Returns the inserted node. Uses recursion. */

  insertRecursively(val) {
    if (val < this.val) {
      if (this.left === null) {
        this.left = new Node(val);
      }
      return this.left.insertRecursively(val);
    } else if (val > this.val) {
      if (this.right === null) {
        this.right = new Node(val);
      }
      return this.right.insertRecursively(val);
    }
  }

  /** dfsPreOrder(): Traverse from the invoking node using pre-order DFS.
  * Returns an array of visited nodes. */

  dfsPreOrder() {
    let nodes = [];

    nodes.push(this.val);
    if (this.left !== null) {
      nodes = [...nodes, ...this.left.dfsPreOrder()];
    }
    if (this.right !== null) {
      nodes = [...nodes, ...this.right.dfsPreOrder()];
    }

    return nodes;
  }

  /** dfsInOrder(): Traverse from the invoking node using in-order DFS.
  * Returns an array of visited nodes. */

  dfsInOrder() {
    let nodes = [];

    if (this.left !== null) {
      nodes = [...nodes, ...this.left.dfsInOrder()];
    }
    nodes.push(this.val);
    if (this.right !== null) {
      nodes = [...nodes, ...this.right.dfsInOrder()];
    }

    return nodes;
  }

  /** dfsPostOrder(): Traverse from the invoking node using post-order DFS.
  * Returns an array of visited nodes. */

  dfsPostOrder() {
    let nodes = [];

    if (this.left !== null) {
      nodes = [...nodes, ...this.left.dfsPostOrder()];
    }
    if (this.right !== null) {
      nodes = [...nodes, ...this.right.dfsPostOrder()];
    }
    nodes.push(this.val);

    return nodes;
  }

}


class BinarySearchTree {
  constructor(root = null) {
    this.root = root;
  }

  /** insert(val): Insert a new node into the BST with value val.
   * Returns the tree instance. Uses iteration. */

  insert(val) {
    if (this.root === null) {
      this.root = new Node(val);
      return this;
    }

    let current = this.root;
    while(true) {
      if (val < current.val) {
        if (current.left === null) {
          current.left = new Node(val);
          return this;
        } else {
          current = current.left;
        }
      } else if (val > current.val) {
        if (current.right === null) {
          current.right = new Node(val);
          return this;
        } else {
          current = current.right;
        }
      }
    }
  }

  /** insertRecursively(val): Insert a new node into the BST with value val.
   * Returns the tree instance. Uses recursion. */

  insertRecursively(val) {
    if (this.root === null) {
      this.root = new Node(val);
      return this;
    }

    this.root.insertRecursively(val);
    return this;
  }

  /** find(val): Search the BST for a node with value val.
   * Returns the node, if found; else undefined. Uses iteration. */

  find(val) {
    if (this.root === null) return undefined;

    let current = this.root;

    while (current) {
      if (current.val === val) return current;

      current = (val < current.val)
        ? current.left
        : current.right;
    }
  }

  /** findRecursively(val): Search the BST for a node with value val.
   * Returns the node, if found; else undefined. Uses recursion. */

  findRecursively(val) {
    if (this.root === null) return undefined;

    return this.root.findRecursively(val);
  }

  /** dfsPreOrder(): Traverse the BST using pre-order DFS.
   * Returns an array of visited nodes. */

  dfsPreOrder() {
    if (this.root === null) return [];

    return this.root.dfsPreOrder();
  }

  /** dfsInOrder(): Traverse the BST using in-order DFS.
   * Returns an array of visited nodes. */

  dfsInOrder() {
    if (this.root === null) return [];

    return this.root.dfsInOrder();
  }

  /** dfsPostOrder(): Traverse the BST using post-order DFS.
   * Returns an array of visited nodes. */

  dfsPostOrder() {
    if (this.root === null) return [];

    return this.root.dfsPostOrder();
  }

  /** bfs(): Traverse the BST using BFS.
   * Returns an array of visited nodes. */

  bfs() {
    if (this.root === null) return [];

    let queue = [];
    let node = this.root;
    let nodes = [];
    queue.push(this.root);

    while (queue.length) {
      node = queue.shift();
      nodes.push(node.val);
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }

    return nodes;
  }

  /** findSuccessorNode(node): Find and return node with next largest value.
   * Returns undefined if no successor. */

  findSuccessorNode(node) {
    if (node.right === null) return undefined;

    let successor = node.right;
    while (successor.left) {
      successor = successor.left;
    }
    return successor;
  }

  /** Further Study!
   * remove(val): Removes a node in the BST with the value val.
   * Returns the removed node. */

  remove(val) {
    let remove = this.root;
    let parent;

    while (remove.val !== val) {
      parent = remove;
      if (val < remove.val) {
        remove = remove.left;
      } else {
        remove = remove.right;
      }
    }

    if (remove.left === null && remove.right === null) {
      if (this.root === remove) {
        this.root = null;
      } else if (parent.left === remove) {
        parent.left = null;
      } else {
        parent.right = null;
      }
    } else if (remove.left !== null && remove.right !== null) {
      let successor = this.findSuccessorNode(remove);
      const updated = successor.val
      this.remove(updated);
      remove.val = updated;
    } else {
      if (this.root === remove) {
        if (remove.right === null) {
          this.root = remove.left;
        } else {
          this.root = remove.right;
        }
      } else if (parent.left === remove) {
        if (remove.right === null) {
          parent.left = remove.left;
        } else {
          parent.left = remove.right;
        }
      } else {
        if (remove.right === null) {
          parent.right = remove.left;
        } else {
          parent.right = remove.right;
        }
      }
    }

    return remove;
  }
}

module.exports = {
  BinarySearchTree,
  Node,
};
