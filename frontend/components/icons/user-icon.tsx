import { Image } from "expo-image";
import { StyleSheet } from "react-native";

import { BORDER_RADIUS } from "@/constants/styles";

export default function UserIcon({
  uri,
  size = 50
}: {
  uri: string;
  size?: number;
}) {
  return (
    <Image
      source={{ uri: uri }}
      contentFit="cover"
      style={[styles.image, { height: size }]}
    />
  );
}

const styles = StyleSheet.create({
  image: {
    aspectRatio: 1,
    borderRadius: BORDER_RADIUS.X_LARGE,
    marginRight: 1
  }
});
