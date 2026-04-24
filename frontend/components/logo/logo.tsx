import { StyleSheet, View } from "react-native";

import SVG from "@/assets/svgs/logo.svg";

interface Props {
  width?: number;
}

export default function Logo({ width = 120 }: Props) {
  return (
    <View style={styles.wrapper}>
      <SVG width={width} height={width} />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    alignItems: "center"
  }
});
