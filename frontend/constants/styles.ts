import { StyleSheet } from "react-native";

import { COLORS } from "./colors";

export const PADDING = {
  SMALL_PADDING: 30,
};

export const SHADOW = {
  shadowColor: "rgba(0, 0, 0, 0.532)",
  shadowOffset: { width: 6, height: 6 },
  shadowOpacity: 0.5,
  shadowRadius: 5,
  elevation: 10,
  borderWidth: 1,
  borderColor: "rgba(255, 255, 255, 0.3)",
  borderBottomWidth: 2,
  borderTopWidth: 1,
  borderBottomColor: "rgba(255, 255, 255, 0.6)",
};

export const BUTTON_3D = {
  borderWidth: 1,
  borderColor: "rgba(255, 255, 255, 0.2)",
  borderTopColor: "rgba(255, 255, 255, 0.4)",
  borderBottomColor: "rgba(0, 0, 0, 0.1)",
};

export const PAGE_BACKGROUND_COL = COLORS.CREAM_0;

export const SCREEN_STYLES = StyleSheet.create({
  screen: {
    backgroundColor: PAGE_BACKGROUND_COL,
    flex: 1,
    paddingHorizontal: 5,
  },
});

export const FONTS = StyleSheet.create({
  LARGE: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    marginTop: 15,
    textTransform: "uppercase",
  },
});
