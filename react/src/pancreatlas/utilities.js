export class FilterTree {
  constructor () {
    this.root = new FilterNode('node', 'filters')
  }

  addNode (n, parent) {
    if (this.search(parent, this.root) === false) {
      this.root.addNode(new FilterNode('node', parent))
    }
    var idx = -1
    for (var i = 0; i < this.root.children.length; i++) {
      if (this.root.children[i].value === parent) {
        idx = i
      }
    }
    if (idx !== -1) {
      this.root.children[idx].addNode(new FilterNode('leaf', n))
    }
  }

  search (n) {
    var searchQueue = []
    searchQueue.unshift(this.root)
    while (searchQueue.length > 0) {
      var current = searchQueue.pop()
      if (current.value === n) {
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

  activateFilter (n) {
    var searchQueue = []
    searchQueue.unshift(this.root)
    while (searchQueue.length > 0) {
      var current = searchQueue.pop()
      if (current.value === n) {
        current.activate()
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

  generateActiveFilters (filters) {
    var actives = []
    var q = []
    /* eslint-disable no-unused-vars */
    for (let child of this.root.children) {
      q.unshift(child)
    }
    /* eslint-enable no-unused-vars */

    while (q.length > 0) {
      var next = q.pop()
      if (next.active && next.type === 'leaf') {
        actives.push(next.value)
      }
      /* eslint-disable no-unused-vars */
      for (let child of next.children) {
        q.unshift(child)
      }
      /* eslint-enable no-unused-vars */
    }
    return actives
  }

  generateJSON (node) {
    if (node.type === 'leaf') {
      var tmpLeaf = {}
      tmpLeaf[node.value] = node.active
      return tmpLeaf
    } else {
      var tmp = {}
      tmp[node.value] = node.children.map(child => this.generateJSON(child))
      return tmp
    }
  }
}

class FilterNode {
  constructor (type, value) {
    this.type = type
    this.value = value
    this.active = true
    this.children = []
  }

  addNode (n) {
    this.children.push(n)
  }

  activate () {
    this.active = !this.active
    return this.active
  }
}
