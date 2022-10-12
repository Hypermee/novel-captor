import { ElectronAPI } from '@electron-toolkit/preload'
import Store from "electron-store";

interface CustomApi extends unknow {
  store: Store<Record<string, unknown>>
}

declare global {
  interface Window {
    electron: ElectronAPI
    api: CustomApi
  }
}
