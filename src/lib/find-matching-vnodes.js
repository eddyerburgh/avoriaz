// @flow

function findAllVNodes(vNode: VNode, nodes: Array<VNode> = []) {
  nodes.push(vNode);

  if (Array.isArray(vNode.children)) {
    vNode.children.forEach((childVNode) => {
      findAllVNodes(childVNode, nodes);
    });
  }

  if (vNode.child) {
    findAllVNodes(vNode.child._vnode, nodes);
  }

  return nodes;
}

function removeDuplicateNodes(vNodes: Array<VNode>) {
  const uniqueNodes = [];
  vNodes.forEach((vNode) => {
    const exists = uniqueNodes.some(node => vNode.elm === node.elm);
    if (!exists) {
      uniqueNodes.push(vNode);
    }
  });
  return uniqueNodes;
}

function nodeMatchesSelector(node: VNode, selector: string) {
  return node.elm && node.elm.getAttribute && node.elm.matches(selector);
}

export default function findMatchingVNodes(vNode: VNode, selector: string) {
  const nodes = findAllVNodes(vNode);
  const matchingNodes = nodes.filter(node => nodeMatchesSelector(node, selector));
  return removeDuplicateNodes(matchingNodes);
}

