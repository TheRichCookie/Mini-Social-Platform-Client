import isSupportedClass from './is-decorated-ng-class.mjs';
import getConstructorFromClassDeclaration from './get-constructor-from-class-declaration.mjs';

/**
 * @param node {import('eslint').Rule.Node}
 * @returns {*}
 */
export default function getNgConstructor(node) {
    if (!isSupportedClass(node)) {
        return null;
    }

    const constructor = getConstructorFromClassDeclaration(node);

    if (!constructor) {
        return null;
    }

    return constructor;
}
