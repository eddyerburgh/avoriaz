function findAllVNodes(vNode, nodes = []) {
  nodes.push(vNode);

  if (vNode.children && vNode.children.length > 0) {
    for (let i = 0; i < vNode.children.length; i++) { // eslint-disable-line no-plusplus
      findAllVNodes(vNode.children[i], nodes);
    }
  }

  if (vNode.child) {
    findAllVNodes(vNode.child._vnode, nodes);
  }

  return nodes;
}

export function findByTag(vNode, tag) {
  const nodes = findAllVNodes(vNode);
  return nodes.filter(node => node.tag === tag);
}

export function findByClass(vNode, className) {
  const nodes = findAllVNodes(vNode);
  return nodes.filter((node) => {
    if (node.elm && node.elm.className) {
      return node.elm.className.split(' ').indexOf(className) !== -1;
    }
    return false;
  });
}

export function findById(vNode, id) {
  const nodes = findAllVNodes(vNode);
  return nodes.filter((node) => {
    // Text nodes don't have getAttribute method
    if (node.elm && node.elm.nodeName === '#text') {
      return false;
    }

    if (node.elm && node.elm.getAttribute) {
      return node.elm.getAttribute('id') === id;
    }

    return false;
  });
}
