import { useFonts } from "expo-font";
import React from "react";
import { Text, TextProps } from "react-native";

export function CustomFont(props: TextProps) {
  const [fontLoaded] = useFonts({
    AbrilFatface: require("@/assets/fonts/AbrilFatface-Regular.ttf")
  });

  if (!fontLoaded) {
    return <Text {...props} />;
  }

  return (
    <Text {...props} style={[{ fontFamily: "AbrilFatface" }, props.style]} />
  );
}
