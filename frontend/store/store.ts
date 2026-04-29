import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import { AuthRoutes, ErrorStateValue } from "@/types/typess";
import { AUTH_FORM } from "@/utils/auth";

export interface StoreState {
  suppers?: any;
  setSuppers: (suppers: any) => void;
  authCTATitle: AuthRoutes;
  setAuthCTATitle: (authCTATitle: AuthRoutes) => void;
  isAuthBgCol: boolean;
  setIsAuthBgCol: (isAuthBgCol: boolean) => void;
  authForm: ErrorStateValue[];
  setAuthForm: (authForm: ErrorStateValue[]) => void;
  updateAuthFormField: (
    fieldId: string,
    value?: string,
    showErrorMessage?: boolean,
    errorMessage?: string
  ) => void;
  resetAuthForm: () => void;
  hasFetchedSuppers: boolean;
  setHasFetchedSuppers: (hasFetchedSuppers: boolean) => void;
  isFetchingSuppers: boolean;
  setIsFetchingSuppers: (isFetchingSuppers: boolean) => void;
}

export const useStore = create<StoreState>((set, get) => ({
  suppers: undefined,
  setSuppers: (suppers: any) => set(() => ({ suppers })),
  authCTATitle: AuthRoutes.SING_UP,
  setAuthCTATitle: (authCTATitle: AuthRoutes) => set(() => ({ authCTATitle })),
  isAuthBgCol: false,
  setIsAuthBgCol: (isAuthBgCol: boolean) => set(() => ({ isAuthBgCol })),
  authForm: AUTH_FORM,
  setAuthForm: (authForm: ErrorStateValue[]) => set(() => ({ authForm })),
  updateAuthFormField: (
    fieldId: string,
    value?: string,
    showErrorMessage?: boolean,
    errorMessage?: string
  ) =>
    set((state: { authForm: ErrorStateValue[] }) => ({
      authForm: state.authForm.map((field: ErrorStateValue) =>
        field.id === fieldId
          ? {
              ...field,
              ...(value !== undefined && { value }),
              ...(showErrorMessage !== undefined && { showErrorMessage }),
              ...(errorMessage !== undefined && { errorMessage })
            }
          : field
      )
    })),
  resetAuthForm: () =>
    set(() => ({
      authForm: AUTH_FORM.map((field) => ({
        ...field,
        value: "",
        showErrorMessage: false
      }))
    })),
  hasFetchedSuppers: false,
  setHasFetchedSuppers: (hasFetchedSuppers: boolean) =>
    set(() => ({ hasFetchedSuppers })),
  isFetchingSuppers: false,
  setIsFetchingSuppers: (isFetchingSuppers: boolean) =>
    set(() => ({ isFetchingSuppers }))
}));

const sessionStorage = {
  getItem: async (name: string): Promise<string | null> => {
    const data = (await AsyncStorage.getItem(name)) || null;
    return data;
  },
  setItem: async (name: string, value: string): Promise<void> => {
    await AsyncStorage.setItem(name, value);
  },
  removeItem: async (name: string): Promise<void> => {
    await AsyncStorage.removeItem(name);
  },
  clearStore: async (): Promise<void> => {
    await AsyncStorage.clear();
  }
};

export const usePersistStore = create()(
  persist(
    (set, get) => ({
      sessionToken: null,
      setSessionToken: (sessionToken: null | string) => set({ sessionToken }),
      user: null,
      setUser: (user: any) => set({ user })
    }),
    {
      name: "session",
      storage: createJSONStorage(() => sessionStorage)
    }
  )
);
