import { create } from 'zustand';
import { useEffect, useCallback, useReducer } from 'react';
import * as SecureStore from 'expo-secure-store';
import { AuthRoutes, AuthSignupForm } from '@/types';

type UseStateHook<T> = [[boolean, T | null], (value: T | null) => void];

export const AUTH_FORM: AuthSignupForm = {
  name: '',
  username: '',
  email: '',
  password: '',
};

export interface StoreState {
  authCTATitle: AuthRoutes;
  setAuthCTATitle: (authCTATitle: AuthRoutes) => void;
  isAuthBgCol: boolean;
  setIsAuthBgCol: (isAuthBgCol: boolean) => void;
  authForm: AuthSignupForm;
  setAuthForm: (authForm: AuthSignupForm) => void;
}

export const useStore = create<StoreState | any>((set, get) => ({
  authCTATitle: 'Sign up',
  setAuthCTATitle: (authCTATitle: AuthRoutes) => set(() => ({ authCTATitle })),
  isAuthBgCol: false,
  setIsAuthBgCol: (isAuthBgCol: boolean) => set(() => ({ isAuthBgCol })),
  authForm: AUTH_FORM,
  setAuthForm: (authForm: AuthSignupForm) => set(() => ({ authForm })),
}));

function useAsyncState<T>(initialValue: [boolean, T | null] = [true, null]): UseStateHook<T> {
  return useReducer(
    (state: [boolean, T | null], action: T | null = null): [boolean, T | null] => [false, action],
    initialValue,
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
  }, [key, setStorage]);

  const setStorageHandler = useCallback(
    (value: any) => {
      setStorage(value);
      setStorageItemAsync(key, value);
    },
    [key, setStorage],
  );

  return [storage, setStorageHandler];
}
