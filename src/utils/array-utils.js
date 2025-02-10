export const addUniqueByKey = (array, item, key) => {
  const isItemAlreadyInArray = array.some(
    (arrItem) => arrItem[key] === item[key],
  )

  return isItemAlreadyInArray ? array : [...array, item]
}

export const getLastItem = (array) => {
  const safeArray = array || []
  if (!Array.isArray(safeArray) || safeArray.length === 0) return undefined
  return safeArray[safeArray.length - 1]
}
