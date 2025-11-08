import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from 'zustand';
import { createJSONStorage, persist } from "zustand/middleware";
import  { useEffect, useCallback, useReducer } from 'react';
import * as SecureStore from 'expo-secure-store';

type UseStateHook<T> = [[boolean, T | null], (value: T | null) => void];

interface StoreState {
  authCTATitle: string;
  setAuthCTATitle: (title: string) => void;
  authRoute: boolean;
  setAuthRoute: (isLogin: boolean) => void;
}

export const useStore = create<StoreState | any>((set, get) => ({
  authCTATitle: 'Sign up',
  setAuthCTATitle: (title: string) => set(() => ({ authCTATitle: title })),
  authRoute: false,
  setAuthRoute: (isLogin: boolean) => set(() => ({ authRoute : isLogin })),
}));


function useAsyncState<T>(
  initialValue: [boolean, T | null] = [true, null],
): UseStateHook<T> {
  return useReducer(
    (state: [boolean, T | null], action: T | null = null): [boolean, T | null] => [false, action],
    initialValue
  ) as UseStateHook<T>;
}

export async function setStorageItemAsync(key: string, value: any) {
    if (value == null) {
      await SecureStore.deleteItemAsync(key);
    } else {
      await SecureStore.setItemAsync(key, value);
    }
}

export function useStorageState(key: string): UseStateHook<string> {

  const [storage, setStorage] = useAsyncState<string>();
 
  useEffect(() => {
      SecureStore.getItemAsync(key).then((value: any) => {
        setStorage(value);
      });
  }, [key]);

  const setStorageHandler = useCallback(
    (value: any) => {
      setStorage(value);
      setStorageItemAsync(key, value);
    },
    [key]
  );

  return [storage, setStorageHandler];
}
