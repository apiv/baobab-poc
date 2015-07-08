/**
 * utility to determine if a value is a primitive type
 *
 * @param val
 * @returns {boolean}
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Data_types
 */
export function isPrimitive( val ) {
    return val !== Object( val );
}