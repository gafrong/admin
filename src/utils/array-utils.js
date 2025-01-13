export const addUniqueByKey = (array, item, key) => {
  const isItemAlreadyInArray = array.some(
    (arrItem) => arrItem[key] === item[key],
  )

  return isItemAlreadyInArray ? array : [...array, item]
}
