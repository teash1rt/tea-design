const isBoolean = (val: unknown) => typeof val === 'boolean'
const isNumber = (val: unknown) => typeof val === 'number'
const isInteger = (val: unknown) => Number.isInteger(val)
const isNull = (val: unknown) => val === null
const isObject = (val: unknown) => typeof val === 'object'
const isArray = (val: unknown) => Array.isArray(val)
const isString = (val: unknown) => typeof val === 'string'
const isPlainObject = (val: unknown) => val && isObject(val) && !isArray(val)

export { isArray, isPlainObject, isString, isBoolean, isNumber, isInteger, isNull }
