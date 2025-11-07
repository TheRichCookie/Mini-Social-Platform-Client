/**
 * Return type from field in constructor
 * @param param {*}
 * @returns {*}
 */
export default function getTypeName(param) {
    const typeAnnotation = param?.parameter?.typeAnnotation ?? param?.typeAnnotation;

    return typeAnnotation?.typeAnnotation?.typeName?.name;
}
