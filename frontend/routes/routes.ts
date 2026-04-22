import { Href } from "expo-router";

import { SCREEN_NAMES } from "./screens";

type Routes = Record<string, Href>;

export const ROUTES: Routes = {
  CREATE_SUPPER: `/(app)/search/${SCREEN_NAMES.CREATE_SUPPER}` as Href,
  HOME: `/(app)/search/${SCREEN_NAMES.HOME}` as Href
};
