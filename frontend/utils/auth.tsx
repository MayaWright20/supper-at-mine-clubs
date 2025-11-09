import { setStorageItemAsync, useStore } from "@/store/store";
import { AUTH_ROUTE } from "@/types";
import { Href, router } from "expo-router";

export const authHandler = (isLogin: string, href: Href) => {
    setStorageItemAsync(AUTH_ROUTE, isLogin);
    router.navigate(href);
};