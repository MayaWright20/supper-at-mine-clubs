import { BlurView } from "expo-blur";
import { Image } from "expo-image";
import { StyleSheet, View } from "react-native";

import { BORDER_RADIUS } from "@/constants/styles";

export default function UserIcon({
  uri,
  size = 50,
  isBlurred = true
}: {
  uri: string;
  size?: number;
  isBlurred: boolean;
}) {
  return (
    <View style={[styles.blurContainer, { height: size }]}>
      <Image source={{ uri: uri }} contentFit="cover" style={[styles.image]} />
      {isBlurred && (
        <BlurView intensity={8} tint="light" style={styles.image} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  blurContainer: {
    aspectRatio: 1,
    borderRadius: BORDER_RADIUS.X_LARGE,
    marginRight: 1,
    overflow: "hidden",
    position: "relative"
  },
  image: {
    flex: 1,
    height: "100%",
    position: "absolute",
    width: "100%"
  }
});
