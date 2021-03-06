/**
 * Performs a deep merge of objects and returns new object. Does not modify
 * objects (immutable) and merges arrays via concatenation.
 *
 * @param {...object} objects - Objects to merge
 * @returns {object} New object with merged key/values
 */
export function mergeDeep(...objects: any) {
  const isObject = (obj: any) => obj && typeof obj === 'object'

  return objects.reduce((prev: any, obj: any) => {
    Object.keys(obj).forEach((key) => {
      const pVal = prev[key]
      const oVal = obj[key]

      if (Array.isArray(pVal) && Array.isArray(oVal)) {
        prev[key] = pVal.concat(...oVal)
      } else if (isObject(pVal) && isObject(oVal)) {
        prev[key] = mergeDeep(pVal, oVal)
      } else {
        prev[key] = oVal
      }
    })

    return prev
  }, {})
}

export const stringify = (obj: any) => {
  try {
    return JSON.stringify(obj)
  } catch (e) {}

  return obj
}

export const isObject = (obj: any) => typeof obj === 'object' && obj !== null
export const isString = (str: any) =>
  typeof str === 'string' || str instanceof String
