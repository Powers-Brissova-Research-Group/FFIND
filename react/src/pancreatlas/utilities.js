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

  buildFromJSON (serializedTree) {
    var tree = JSON.parse(serializedTree)
    console.log(tree)
  }

  /**
   * Add a hierarchy of nodes to the filter tree. Used for subdividing a filter set into several groups.
   * For example, dividing age between neonatal, infant, etc.
   * @param {string} n List of parent nodes, separated by '-'
   */
  addSet (n, sortMethod, filterMethod) {
    var levels = n.split('-')
    var curr = levels.shift()
    var node = this.search(curr)
    if (node === undefined) {
      node = new FilterNode('node', curr, sortMethod, filterMethod)
      this.root.addNode(node)
    }
    while (levels.length > 0) {
      curr = levels.shift()
      var nextNode = new FilterNode('node', curr, sortMethod, filterMethod)
      node.addNode(nextNode)
      node = nextNode
    }
    return node
  }

  /**
   * Adds a new node to the tree. First, it checks to see if the parent node exists. If it does, then it adds
   * the new node as a child of the parent. If not, it adds the parent as a child of root, then the node as a
   * child of the new parent
   * @param {string} n Name of the new node we are adding
   * @param {string} parent Name of the parent node for the new one
   * @param {string} filterMethod How we should display this filter in the UI (as a slider, checkbox, etc)
   */
  addNode (n, parent, sortMethod, filterMethod = undefined) {
    var parentChain = parent.split('-')
    var parentNode = this.search(parentChain[parentChain.length - 1])
    if (parentNode === undefined) {
      parentNode = this.addSet(parent, sortMethod, filterMethod)
    }
    if (parentNode !== undefined) {
      parentNode.addNode(new FilterNode('leaf', n, sortMethod, filterMethod))
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
      for (let child of current.children) {
        searchQueue.unshift(child)
      }
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
      for (let child of current.children) {
        q.unshift(child)
      }
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
      for (let child of current.children) {
        searchQueue.unshift(child)
      }
    }
    return false
  }

  /**
   * Gets all nodes (filter sets) for this tree
   */

  generateAllNodes () {
    var q = []
    var nodes = []
    for (let child of this.root.children) {
      q.unshift(child)
    }
    while (q.length > 0) {
      var curr = q.pop()
      if (curr.type === 'node') {
        nodes.push(curr.value)
        for (let child of curr.children) {
          q.unshift(child)
        }
      }
    }
    return nodes
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
    for (let child of this.root.children) {
      q.unshift(child)
    }
    while (q.length > 0) {
      var curr = q.pop()
      if (curr.type !== 'leaf') {
        for (let child of curr.children) {
          q.unshift(child)
        }
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
      for (let child of filterNode.children) {
        for (let img of child.images) {
          images.push(img)
        }
      }
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
      tmpLeaf['type'] = 'leaf'
      tmpLeaf['sortMethod'] = node.sortMethod
      return tmpLeaf
    } else {
      var tmp = {}
      tmp['name'] = node.value
      tmp['filterMethod'] = node.filterMethod
      tmp['type'] = 'node'
      tmp['sortMethod'] = node.sortMethod
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
  constructor (type, value, sortMethod, filterMethod = undefined) {
    this.type = type
    this.value = value
    this.filterMethod = filterMethod
    this.sortMethod = sortMethod
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
        return matches
      } else {
        var nodeMatches = []
        for (let child of this.children) {
          var tmp = child.getActives()
          /* eslint-disable no-loop-func */
          nodeMatches = nodeMatches.concat(tmp.filter(val => nodeMatches.includes(val) === false))
          /* eslint-enable no-loop-func */
        }
        return nodeMatches
      }
    }
  }
}

export function compareAges (age1, age2) {
  let ageGroupRe = /^(NEONATAL)|(CHILDHOOD)|(INFANCY)|(ADULT)$/i
  if (ageGroupRe.test(age1) && ageGroupRe.test(age2)) {
    /* eslint-disable no-unused-vars */
    var age1Val = 0
    var age2Val = 0

    switch (age1) {
      case 'NEONATAL':
        age1Val = 0
        break
      case 'INFANCY':
        age1Val = 1
        break
      case 'CHILDHOOD':
        age1Val = 2
        break
      case 'ADULT':
      default:
        age1Val = 3
    }

    switch (age2) {
      case 'NEONATAL':
        age2Val = 0
        break
      case 'INFANCY':
        age2Val = 1
        break
      case 'CHILDHOOD':
        age2Val = 2
        break
      case 'ADULT':
      default:
        age2Val = 3
    }
    if (age1 < age2) {
      return 1
    } else if (age1 === age2) {
      return 0
    } else {
      return -1
    }
    /* eslint-enable no-unused-vars */
  } else {
    let ageRe = /^(G)?(\d+\.?\d*)(d|w|mo|y)(\+\d+d|w|mo|y)?$/
    let a = ageRe.exec(age1)
    let b = ageRe.exec(age2)
    switch (a[3]) {
      case 'd':
        a[3] = 0
        break
      case 'w':
        a[3] = 1
        break
      case 'mo':
        a[3] = 2
        break
      case 'y':
        a[3] = 3
        break
      default:
        a[3] = -1
    }

    switch (b[3]) {
      case 'd':
        b[3] = 0
        break
      case 'w':
        b[3] = 1
        break
      case 'mo':
        b[3] = 2
        break
      case 'y':
        b[3] = 3
        break
      default:
        b[3] = -1
    }

    if (a[1] === 'G' && b[1] !== 'G') {
      return -1
    } else if (a[1] !== 'G' && b[1] === 'G') {
      return 1
    } else {
      if (a[3] < b[3]) {
        return -1
      } else if (a[3] > b[3]) {
        return 1
      } else {
        if (Number(a[2]) < Number(b[2])) {
          return -1
        } else if (Number(a[2]) > Number(b[2])) {
          return 1
        } else {
          if (a[4] === undefined && b[4] !== undefined) {
            return -1
          } else if (a[4] !== undefined && b[4] === undefined) {
            return 1
          } else {
            return 0
          }
        }
      }
    }
  }
};

function isArray (obj) {
  return Object.prototype.toString.call(obj) === '[object Array]'
}

export function extractFilters (tagObj) {
  var objectQueue = []
  var filters = []
  for (let key of Object.keys(tagObj)) {
    objectQueue.push(tagObj[key])
  }
  while (objectQueue.length > 0) {
    var curr = objectQueue.shift()
    if (isArray(curr)) {
      filters = filters.concat(curr)
    } else {
      for (let k of Object.keys(curr)) {
        objectQueue.push(curr[k])
      }
    }
  }
  return filters
}
