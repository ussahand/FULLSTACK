import asyncStorage from '@react-native-async-storage/async-storage'

const storage = (namespace = 'app specific name space') => {
  const setItem = (key, value) =>
    asyncStorage.setItem(`${namespace}:${key}`, JSON.stringify(value))
  
  const getItem = async(key) => {
    const strValue = await asyncStorage.getItem(`${namespace}:${key}`)
    return JSON.parse(strValue)
  }

  const removeItem = (key) =>
    asyncStorage.removeItem(`${namespace}:${key}`)

  const getAllKeys = () =>
    asyncStorage.getAllKeys()

  const clear = () => 
    asyncStorage.clear()

  return {getItem, setItem, removeItem, getAllKeys, clear}
}

export default storage

// class Storage {
//   constructor( namespace = 'app specific name space' ) {
//     this.namespace = namespace
//   }
//   setItem(key, value) {
//     asyncStorage.setItem(`${this.namespace}:${key}`, JSON.stringify(value))
//   }
//   async getItem(key) {
//     const strValue = await asyncStorage.getItem(`${this.namespace}:${key}`)
//     return JSON.parse(strValue)
//   }
// }