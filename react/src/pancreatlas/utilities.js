export class FilterTree {
  constructor () {
    this.root = new FilterNode('root', 'filters')
    this.activeFilters = 0
  }

  addNode (n, parent) {
    var parentNode = this.search(parent)
    if (parentNode === undefined) {
      parentNode = new FilterNode('node', parent)
      this.root.addNode(parentNode)
    }
    if (parentNode !== undefined) {
      parentNode.addNode(new FilterNode('leaf', n))
    }
  }

  addImg (n, i) {
    var node = this.search(n)
    if (node !== undefined) {
      node.addImage(i)
    }
  }

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
          this.resetTo(true)
        }
        console.log(this.generateActiveImages())
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

  generateActiveImages () {
    // var actives = []

    return this.root.getActives()
    // var q = []
    // /* eslint-disable no-unused-vars */
    // for (let child of this.root.children) {
    //   q.unshift(child)
    // }
    // /* eslint-enable no-unused-vars */

    // while (q.length > 0) {
    //   var next = q.pop()
    //   if (next.active && next.type === 'leaf') {
    //     for (let img of next.images) {
    //       if (!actives.includes(img)) actives.push(img)
    //     }
    //   }
    //   /* eslint-disable no-unused-vars */
    //   for (let child of next.children) {
    //     q.unshift(child)
    //   }
    //   /* eslint-enable no-unused-vars */
    // }
    // return actives
  }

  generateJSON (node) {
    if (node.type === 'leaf') {
      var tmpLeaf = {}
      tmpLeaf[node.value] = { 'active': node.active, 'images': node.images }
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
    this.images = []
  }

  addNode (n) {
    this.children.push(n)
  }

  addImage (i) {
    this.images.push(i)
  }

  activate () {
    this.active = !this.active
    return this.active
  }

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
            /* eslint-disable no-loop-func */
            matches = matches.filter(val => childMatches.includes(val))
            /* eslint-enable no-loop-func */
          }
        }
        /* eslint-enable no-unused-vars */
        return matches
      } else {
        var nodeMatches = []
        /* eslint-disable no-unused-vars */
        for (let child of this.children) {
          var tmp = child.getActives()
          console.log(tmp)
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
