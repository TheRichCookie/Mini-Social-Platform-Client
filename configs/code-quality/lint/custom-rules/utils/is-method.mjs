/**
 * Returns whether the node is a method definition.
 * @param node {import('eslint').Rule.Node}
 * @returns {boolean}
 */
export default function isMethodDefinition(node) {
    return node.type === 'MethodDefinition';
}
