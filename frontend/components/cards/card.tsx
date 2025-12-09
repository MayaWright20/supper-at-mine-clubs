import { StyleSheet, Text, useWindowDimensions, View } from "react-native";

import { COLORS } from "@/constants/colors";

interface Props {
  title: string;
}

export default function Card({ title }: Props) {
  const { height } = useWindowDimensions();
  return (
    <View style={[styles.container, { height: height / 3 }]}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.CREAM_0,
    borderColor: COLORS.RED_0,
    borderRadius: 16,
    borderWidth: 2,
    elevation: 6,
    flex: 1,
    maxWidth: "50%",
    overflow: "hidden",
    padding: 16,
    shadowColor: COLORS.RED_0,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 8,
  },
  title: {
    color: COLORS.RED_0,
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
  },
});
