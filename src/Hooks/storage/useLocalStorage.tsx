import AsyncStorage from '@react-native-async-storage/async-storage';

export const useLocalStorage = () => {

  const setStorageItem = async (key: string, value: any): Promise<void> => {
    const storedValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, storedValue);
  }

  const getStorageItem = async (key: string): Promise<any> => {
    const value = await AsyncStorage.getItem(key);
    return value ? JSON.parse(value) : null
  }

  const removeStorageItem = async (key: string): Promise<void> => {
    await AsyncStorage.removeItem(key);
  }

  return { setStorageItem, getStorageItem, removeStorageItem };
}