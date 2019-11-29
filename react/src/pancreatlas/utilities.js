/**
   * @author Jimmy Messmer
   * @file Contains utility classes that we use for Pancreatlas.
   */

/**
 * Class for our data structure holding filter information.
 */
export class FilterTree {
  /**
   * Create a root node, count of active filters, and operation stack.
   */
  constructor () {
    this.root = new FilterNode('root', 'filters')
    this.activeFilters = 0
    this.operationStack = []
  }

  /**
   * Adds a new node to the tree. First, it checks to see if the parent node exists. If it does, then it adds
   * the new node as a child of the parent. If not, it adds the parent as a child of root, then the node as a
   * child of the new parent
   * @param {string} n Name of the new node we are adding
   * @param {string} parent Name of the parent node for the new one
   * @param {string} filterMethod How we should display this filter in the UI (as a slider, checkbox, etc)
   */
  addNode (n, parent, filterMethod = undefined) {
    var parentNode = this.search(parent)
    if (parentNode === undefined) {
      parentNode = new FilterNode('node', parent, filterMethod)
      this.root.addNode(parentNode)
    }
    if (parentNode !== undefined) {
      parentNode.addNode(new FilterNode('leaf', n, filterMethod))
    }
  }

  /**
   * Adds image to a given leaf node
   * @param {string} n Node to add image to
   * @param {int} i ID of image
   */
  addImg (n, i) {
    var node = this.search(n)
    if (node !== undefined) {
      node.addImage(i)
    }
  }

  /**
   * Basic breadth-first search to find a given node. Returns undefined if not found.
   * @param {string} n Name of node we are looking for
   */
  search (n) {
    var searchQueue = []
    searchQueue.unshift(this.root)
    while (searchQueue.length > 0) {
      var current = searchQueue.pop()
      if (current.value === n) {
        return current
      }
      /* eslint-disable no-unused-vars */
      for (let child of current.children) {
        searchQueue.unshift(child)
      }
      /* eslint-enable no-unused-vars */
    }
    return undefined
  }

  /**
   * Reset our tree so that all filters are either active or unactive.
   * @param {boolean} val Reset each node in the tree to this value
   */
  resetTo (val) {
    var q = []
    q.unshift(this.root)

    while (q.length > 0) {
      var current = q.pop()
      current.active = val
      /* eslint-disable no-unused-vars */
      for (let child of current.children) {
        q.unshift(child)
      }
      /* eslint-enable no-unused-vars */
    }
    this.activeFilters = 0
  }

  /**
   * Pops the top filter in our operation stack, then activate it.
   */
  undo () {
    var filter = this.operationStack.pop()
    this.activateFilter(filter)
  }

  /**
   * Toggle specified node--flip true to false and vice versa.
   * @param {string} n Node to activate
   */
  activateFilter (n) {
    if (this.activeFilters <= 0) {
      this.resetTo(false)
    }
    var searchQueue = []
    searchQueue.unshift(this.root)
    while (searchQueue.length > 0) {
      var current = searchQueue.pop()
      if (current.value === n) {
        var active = current.activate()
        if (active) {
          this.activeFilters++
        } else {
          this.activeFilters--
        }
        if (this.activeFilters <= 0) {
          this.resetTo(false)
        }
        this.operationStack.push(n)
        return true
      }
      /* eslint-disable no-unused-vars */
      for (let child of current.children) {
        searchQueue.unshift(child)
      }
      /* eslint-enable no-unused-vars */
    }
    return false
  }

  /**
   * Generate a list of all the active images in the tree
   */
  generateActiveImages () {
    if (this.activeFilters <= 0) {
      return this.generateAllImages()
    }
    return this.root.getActives()
  }

  /**
   * Generate a list of all images in the tree
   */
  generateAllImages () {
    var q = []
    var images = []
    /* eslint-disable no-unused-vars */
    for (let child of this.root.children) {
      q.unshift(child)
    }
    /* eslint-enable no-unused-vars */
    while (q.length > 0) {
      var curr = q.pop()
      if (curr.type !== 'leaf') {
        /* eslint-disable no-unused-vars */
        for (let child of curr.children) {
          q.unshift(child)
        }
        /* eslint-enable no-unused-vars */
      } else {
        /* eslint-disable no-loop-func */
        let newImgs = curr.images.filter(img => !images.includes(img))
        images = images.concat(newImgs)
        /* eslint-enable no-loop-func */
      }
    }
    return images
  }

  /**
   * Sort all images in the tree based on certain criteria
   * @param {string} f Sort criteria (age, disease duration, etc)
   * @param {function} sortFn Custom sorting function
   */
  sortImages (f, sortFn = ((a, b) => a.value > b.value ? 1 : -1)) {
    var filterNode = this.search(f)
    var images = []
    if (filterNode !== undefined) {
      // var sortedKeys = filterNode.children.map(child => child.value).sort() // Object.keys(filterNode).sort()
      filterNode.children.sort(sortFn)
      console.log(Object.keys(filterNode.children))
      /* eslint-disable no-unused-vars */
      for (let child of filterNode.children) {
        for (let img of child.images) {
          images.push(img)
        }
      }
      /* eslint-enable no-unused-vars */
    }
    return images
  }

  /**
   * Recursively generate a JSON representation of the filter tree.
   * @param {FilterNode} node current filter node
   */
  generateJSON (node) {
    if (node.type === 'leaf') {
      var tmpLeaf = {}
      tmpLeaf['name'] = node.value
      tmpLeaf['active'] = node.active
      return tmpLeaf
    } else {
      var tmp = {}
      tmp['name'] = node.value
      tmp['filterMethod'] = node.filterMethod
      tmp['children'] = node.children.map(child => this.generateJSON(child))
      return tmp
    }
  }
}

/**
 * Class for an individual node in the filterTree
 */
class FilterNode {
  /**
   *
   * @param {string} type Type of node--root, filter set, or leaf
   * @param {string} value Value of node (name of filter or set, etc)
   * @param {*} filterMethod Type of filter to display in UI
   */
  constructor (type, value, filterMethod = undefined) {
    this.type = type
    this.value = value
    this.filterMethod = filterMethod
    this.active = false
    this.children = []
    this.images = []
  }

  /**
   * Add node to list of children of this node
   * @param {FilterNode} n Node to add
   */
  addNode (n) {
    this.children.push(n)
  }

  /**
   * Add image to list of images for a given filter
   * @param {int} i Id of image to add
   */
  addImage (i) {
    this.images.push(i)
  }

  /**
   * Toggle active variable
   */
  activate () {
    this.active = !this.active
    return this.active
  }

  /**
   * Get all active images that are a descendent of this node
   */
  getActives () {
    if (this.type === 'leaf') {
      if (this.active) {
        return this.images
      } else {
        return []
      }
    } else {
      if (this.type === 'root') {
        var matches = this.children[0].getActives()
        /* eslint-disable no-unused-vars */
        for (let child of this.children.slice(1)) {
          var childMatches = child.getActives()
          if (childMatches.length > 0) {
            if (matches.length > 0) {
              /* eslint-disable no-loop-func */
              matches = matches.filter(val => childMatches.includes(val))
              /* eslint-enable no-loop-func */
            } else {
              matches = matches.concat(childMatches)
            }
          }
        }
        /* eslint-enable no-unused-vars */
        return matches
      } else {
        var nodeMatches = []
        /* eslint-disable no-unused-vars */
        for (let child of this.children) {
          var tmp = child.getActives()
          /* eslint-disable no-loop-func */
          nodeMatches = nodeMatches.concat(tmp.filter(val => nodeMatches.includes(val) === false))
          /* eslint-enable no-loop-func */
        }
        /* eslint-enable no-unused-vars */
        return nodeMatches
      }
    }
  }
}
