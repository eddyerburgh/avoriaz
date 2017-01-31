function getSelectors(selector) {
  const selectors = selector.split(/ (?=(?:(?:[^"]*"){2})*[^"]*$)/);
  return selectors.reduce((list, sel) => list.concat(sel), []);
}

function findAllVNodes(vNode, nodes = [], ignoreFirstNode) {
  if (!ignoreFirstNode) {
    nodes.push(vNode);
  }

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

function getMatchingVNodes(vNode, selector, ignoreFirstNode) {
  const nodes = findAllVNodes(vNode, [], ignoreFirstNode);
  return nodes.filter((node) => {
    if (node.elm && node.elm.matches) {
      return node.elm.matches(selector);
    }
    return false;
  });
}

function recurseGetMatchingVNodes(vNodes, selectors, ignoreFirstNode) {
  const nodes = [];

  vNodes.forEach(node => nodes.push(...getMatchingVNodes(node, selectors[0], ignoreFirstNode)));

  if (selectors.length <= 1) {
    return nodes;
  }

  return recurseGetMatchingVNodes(nodes, selectors.splice(0, 1), true);
}

export default function findMatchingVNodes(vNode, selector) {
  const selectorsArray = getSelectors(selector);
  if (selectorsArray.length > 1) {
    return recurseGetMatchingVNodes([vNode], selectorsArray);
  }
  return getMatchingVNodes(vNode, selector);
}

