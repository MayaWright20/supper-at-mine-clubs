import Ionicons from "@expo/vector-icons/Ionicons";
import { Image } from "expo-image";
import { StyleProp, StyleSheet, Text, useWindowDimensions, View, ViewStyle } from "react-native";

import { COLORS } from "@/constants/colors";

interface Props {
  title: string;
  image?: string;
  kicker?: string;
  meta?: string;
  showTag?: boolean;
  style?: StyleProp<ViewStyle>;
  variant?: "default" | "horizontal";
}

export default function Card({
  title,
  image,
  kicker = "Hosted locally",
  meta,
  showTag = true,
  style,
  variant = "default"
}: Props) {
  const { height } = useWindowDimensions();
  const isHorizontal = variant === "horizontal";
  const containerStyle = isHorizontal
    ? [styles.container, styles.horizontalContainer, style]
    : [styles.container, { height: height / 3 }, style];

  return (
    <View style={containerStyle}>
      <View style={[styles.imageWrapper, isHorizontal && styles.horizontalImageWrapper]}>
        {image ? (
          <Image source={{ uri: image }} style={styles.image} />
        ) : (
          <View style={styles.imageFallback}>
            <Text style={styles.imageFallbackText}>Gather around the table</Text>
          </View>
        )}
        {showTag ? (
          <View style={styles.tag}>
            <Ionicons
              style={styles.icon}
              name={"heart-outline"}
              color={"black"}
              size={20}
            />
          </View>
        ) : null}
      </View>
      <View style={[styles.content, isHorizontal && styles.horizontalContent]}>
        <Text style={[styles.kicker, isHorizontal && styles.horizontalKicker]}>
          {kicker}
        </Text>
        <Text numberOfLines={2} style={[styles.title, isHorizontal && styles.horizontalTitle]}>
          {title}
        </Text>
        {meta ? (
          <Text numberOfLines={2} style={[styles.meta, isHorizontal && styles.horizontalMeta]}>
            {meta}
          </Text>
        ) : (
          <View style={styles.metaRow}>
            <Text style={styles.meta}>Shared table</Text>
            <View style={styles.dot} />
            <Text style={styles.meta}>New experience</Text>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFFDF9",
    borderColor: COLORS.RED_0,
    borderRadius: 24,
    borderWidth: 1,
    elevation: 6,
    flex: 1,
    overflow: "hidden",
    shadowColor: "#2B1D17",
    shadowOffset: {
      width: 0,
      height: 10
    },
    shadowOpacity: 0.12,
    shadowRadius: 18
  },
  content: {
    backgroundColor: "white",
    flex: 1,
    marginTop: -18,
    paddingBottom: 14,
    paddingHorizontal: 14,
    paddingTop: 14,
    width: "100%"
  },
  dot: {
    backgroundColor: "#B7A89A",
    borderRadius: 999,
    height: 4,
    width: 4
  },
  icon: {
    alignSelf: "center"
  },
  image: {
    height: "100%",
    width: "100%"
  },
  imageFallback: {
    alignItems: "center",
    backgroundColor: COLORS.CREAM_1,
    height: "100%",
    justifyContent: "center",
    width: "100%"
  },
  imageFallbackText: {
    color: "#8A7568",
    fontSize: 13,
    fontWeight: "600"
  },
  imageWrapper: {
    backgroundColor: COLORS.CREAM_1,
    flex: 1.55,
    justifyContent: "flex-start",
    overflow: "hidden",
    position: "relative",
    width: "100%"
  },
  horizontalContainer: {
    flexDirection: "row"
  },
  horizontalContent: {
    justifyContent: "center",
    marginTop: 0,
    paddingBottom: 10,
    paddingHorizontal: 12,
    paddingTop: 10
  },
  horizontalImageWrapper: {
    flex: undefined,
    width: "36%"
  },
  horizontalKicker: {
    fontSize: 9,
    letterSpacing: 0.4,
    marginBottom: 4
  },
  horizontalMeta: {
    fontSize: 10,
    lineHeight: 13,
    marginTop: 4
  },
  horizontalTitle: {
    fontSize: 13,
    lineHeight: 16
  },
  kicker: {
    color: "#7A685D",
    fontSize: 11,
    fontWeight: "600",
    letterSpacing: 0.6,
    marginBottom: 6,
    textTransform: "uppercase"
  },
  meta: {
    color: "#7A685D",
    fontSize: 12,
    fontWeight: "500"
  },
  metaRow: {
    alignItems: "center",
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 6,
    marginTop: 8
  },
  tag: {
    alignItems: "center",
    aspectRatio: 1,
    backgroundColor: "rgba(255, 253, 249, 0.92)",
    borderRadius: 999,
    height: 36,
    justifyContent: "center",
    position: "absolute",
    right: 6,
    top: 6,
    width: 36
  },
  title: {
    color: "#221611",
    fontSize: 18,
    fontWeight: "700",
    lineHeight: 22
  }
});
