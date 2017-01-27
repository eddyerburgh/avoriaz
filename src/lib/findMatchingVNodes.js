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

export default function findMatchingVNodes(vNode, selector) {
  const nodes = findAllVNodes(vNode);
  return nodes.filter((node) => {
    if (node.elm && node.elm.matches) {
      return node.elm.matches(selector);
    }
    return false;
  });
}

