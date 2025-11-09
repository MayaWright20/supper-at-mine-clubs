import { ImageBackground } from "expo-image";
import { StyleSheet } from "react-native";

export default function Index() {
  return (
    <ImageBackground
      style={styles.image}
      source={require("../assets/images/fuzz.png")}
      contentFit="cover"
      transition={1000}
    ></ImageBackground>
  );
}

const styles = StyleSheet.create({
  image: {
    ...StyleSheet.absoluteFillObject,
    width: "100%",
    height: "100%",
  },
});
