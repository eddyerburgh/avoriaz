"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = findMatchingVNodes;


function findAllVNodes(vNode) {
  var nodes = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

  nodes.push(vNode);

  if (Array.isArray(vNode.children)) {
    vNode.children.forEach(function (childVNode) {
      findAllVNodes(childVNode, nodes);
    });
  }

  if (vNode.child) {
    findAllVNodes(vNode.child._vnode, nodes);
  }

  return nodes;
}

function removeDuplicateNodes(vNodes) {
  var uniqueNodes = [];
  vNodes.forEach(function (vNode) {
    var exists = uniqueNodes.some(function (node) {
      return vNode.elm === node.elm;
    });
    if (!exists) {
      uniqueNodes.push(vNode);
    }
  });
  return uniqueNodes;
}

function nodeMatchesSelector(node, selector) {
  return node.elm && node.elm.getAttribute && node.elm.matches(selector);
}

function findMatchingVNodes(vNode, selector) {
  var nodes = findAllVNodes(vNode);
  var matchingNodes = nodes.filter(function (node) {
    return nodeMatchesSelector(node, selector);
  });
  return removeDuplicateNodes(matchingNodes);
}