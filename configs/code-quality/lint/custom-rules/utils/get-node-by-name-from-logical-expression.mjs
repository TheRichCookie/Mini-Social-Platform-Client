import traverseLogicalExpression from './traverse-logical-expression.mjs';

/**
 * Return a node from the provided logical expression with the provided name.
 * @param expression {import('@types/estree').LogicalExpression}
 * @param name {string}
 * @returns {import('@types/estree').Node}
 */
export default function getNodeByNameFromLogicalExpression(expression, name) {
    let node = null;

    traverseLogicalExpression(expression, leaf => {
        if (leaf.name === name) {
            node = leaf;
        }
    });

    return node;
}