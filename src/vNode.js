export function findAllVNodes(vNode, nodes = []) {
  nodes.push(vNode);

  if (vNode.children && vNode.children.length > 0) {
    for (let i = 0; i < vNode.children.length; i++) { // eslint-disable-line no-plusplus
      findAllVNodes(vNode.children[i], nodes);
    }
  }

  return nodes;
}

export function findByTag(vNode, selector) {
  const nodes = findAllVNodes(vNode);
  return nodes.filter(node => node.tag === selector);
}
