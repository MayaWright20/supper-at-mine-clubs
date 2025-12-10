import axios from "axios";

import { StoreState, usePersistStore, useStore } from "@/store/store";
import { AuthForm, AuthRoutes } from "@/types/types";

import useSession from "./useSession";

export default function useProfile() {
  const updateAuthFormField = useStore(
    (state: StoreState) => state.updateAuthFormField
  );
  const resetAuthForm = useStore((state: StoreState) => state.resetAuthForm);
  const setIsAuthBgCol = useStore((state: StoreState) => state.setIsAuthBgCol);
  const setAuthCTATitle = useStore(
    (state: StoreState) => state.setAuthCTATitle
  );
  const user = usePersistStore((state: any) => state.user);
  const setUser = usePersistStore((state: any) => state.setUser);

  const { sessionToken, setSessionToken } = useSession();

  const getProfile = async (token: string) => {
    try {
      const response = await axios.get(
        `${process.env.EXPO_PUBLIC_URL}/user/profile`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      if (response.status === 200) {
        setSessionToken(token);
        setUser(response.data.user);
      }
    } catch (err: any) {
      console.log(err.response.data.message);
    }
  };

  const signUp = async (formValues: AuthForm, isLogin: boolean) => {
    const data = new FormData();

    Object.keys(formValues).forEach((key) => {
      const value = formValues[key as keyof AuthForm];

      if (!value) return;

      if (key === "avatar") {
        data.append("avatar", {
          uri: value,
          name: "avatar.jpg",
          type: "image/jpeg"
        } as any);
      } else {
        data.append(key, value);
      }
    });

    try {
      const response = await axios.post(
        `${process.env.EXPO_PUBLIC_URL}/user/signup`,
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        }
      );

      if (response.data.success) {
        const token = response.data.token;
        getProfile(token);
      }
    } catch (err: any) {
      // handle error
      console.log(" sing up error");
    }
  };

  const login = async (formData: FormData) => {
    try {
      const response = await axios.post(
        `${process.env.EXPO_PUBLIC_URL}/user/login`,
        formData
      );

      if (response.data.success) {
        const token = response.data.token;
        getProfile(token);
      }
    } catch (err: any) {
      updateAuthFormField(
        "password",
        undefined,
        true,
        err.response?.data?.message
      );
    }
  };

  const logOut = async () => {
    try {
      const response = await axios.get(
        `${process.env.EXPO_PUBLIC_URL}/user/logout`,
        {
          headers: {
            Authorization: `Bearer ${sessionToken}`
          }
        }
      );
      if (response.status === 200) {
        resetAuthForm();
        setIsAuthBgCol(false);
        setAuthCTATitle(AuthRoutes.SING_UP);
        setSessionToken(null);
      }
    } catch (err: any) {
      console.log("This error logout", err.response.data.message);
    }
  };

  return {
    signUp,
    login,
    logOut,
    user
  };
}
