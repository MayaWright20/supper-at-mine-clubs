import { StyleSheet, View } from "react-native";

import SVG from "@/assets/svgs/logo.svg";

export default function Logo() {
  return (
    <View style={styles.wrapper}>
      <SVG width={120} height={120} />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    alignItems: "center"
  }
});
