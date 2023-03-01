export const saveInStorage = (key, value) => {
  const data = JSON.stringify(value)

  localStorage.setItem(key, data)
}

export const getFromStorage = key => {
  const data = localStorage.getItem(key)

  return JSON.parse(data)
}

export const removeItemFromStorage = key => {
  localStorage.removeItem(key)
}
