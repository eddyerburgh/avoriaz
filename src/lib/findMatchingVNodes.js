function getSelectors(selector) {
  const selectors = selector.split(' ');
  return selectors.reduce((list, sel) => list.concat(sel), []);
}

function findAllVNodes(vNode, nodes = [], ignoreFirstNode, depth) {
  if (!ignoreFirstNode) {
    nodes.push(vNode);
  }

  if (depth === 0) {
    return;
  }

  if (vNode.children && vNode.children.length > 0) {
    for (let i = 0; i < vNode.children.length; i++) { // eslint-disable-line no-plusplus
      findAllVNodes(vNode.children[i], nodes, false, depth ? depth - 1 : undefined);
    }
  }

  if (vNode.child) {
    findAllVNodes(vNode.child._vnode, nodes, false, depth);
  }

  return nodes; // eslint-disable-line consistent-return
}

function getMatchingVNodes(vNode, selector, ignoreFirstNode, depth) {
  const nodes = findAllVNodes(vNode, [], ignoreFirstNode, depth);
  return nodes.filter((node) => {
    if (node.elm && node.elm.matches) {
      return node.elm.matches(selector);
    }
    return false;
  });
}

function recurseGetMatchingVNodes(vNodes, selectors, ignoreFirstNode) {
  const nodes = [];
  let newSelectors;

  if (selectors[0] === '>') {
    vNodes.forEach(node => nodes.push(...getMatchingVNodes(node, selectors[1], true, 1)));
    newSelectors = selectors.slice(2);
  } else {
    vNodes.forEach(node => nodes.push(...getMatchingVNodes(node, selectors[0], ignoreFirstNode)));
    newSelectors = selectors.slice(1);
  }

  if (newSelectors.length < 1) {
    return nodes;
  }

  return recurseGetMatchingVNodes(nodes, newSelectors, true);
}

function removeDuplicateNodes(vNodes) {
  const uniqueNodes = [];
  vNodes.forEach((vNode) => {
    const exists = uniqueNodes.some(node => vNode.elm === node.elm);
    if (!exists) {
      uniqueNodes.push(vNode);
    }
  });
  return uniqueNodes;
}

export default function findMatchingVNodes(vNode, selector) {
  const selectorsArray = getSelectors(selector);
  let nodes;

  if (selectorsArray.length > 1) {
    nodes = recurseGetMatchingVNodes([vNode], selectorsArray);
  } else {
    nodes = getMatchingVNodes(vNode, selector);
  }

  return removeDuplicateNodes(nodes);
}

