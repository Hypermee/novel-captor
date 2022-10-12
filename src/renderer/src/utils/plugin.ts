import { toRaw } from "vue";
import { PiniaPluginContext } from "pinia";

/**
 * @desc Save pinia store data to local
 * @param key
 * @param value
 */
const setStorage = (key: string, value: any) => {
  window.api.store.set(key, value);
}

/**
 * @desc Get local data to pinia store
 * @param key
 */
const getStorage = (key: string) => {
  return window.api.store.get(key) || { };
}

/**
 * @desc Pinia persist plugin
 * @param context
 */
export const piniaPersistPlugin = (context: PiniaPluginContext) => {
  const { store } = context;
  const data = getStorage(store.$id);

  store.$subscribe(() => {
    setStorage(store.$id, toRaw(store.$state))
  })

  return {
    ...data
  }
}
