import getDecorators from './get-decorators.mjs';

/**
 * @param param {*}
 * @param decorators {string}
 * @returns {boolean}
 */
export default function hasDecorator(param, ...decorators) {
    return getDecorators(param).some(({ name }) => decorators.includes(name));
}
