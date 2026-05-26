import Ionicons from "@expo/vector-icons/Ionicons";
import * as Haptics from "expo-haptics";
import {
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle
} from "react-native";

import { COLORS } from "@/constants/colors";
import { PADDING } from "@/constants/styles";

interface Props {
  title: string;
  backgroundColor?: string;
  borderColor?: string;
  color?: string;
  variant?: "default" | "back";
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
  isSmall?: boolean;
  isTransparent?: boolean;
  isLeftIconSmall?: boolean;
  isDisabled?: boolean;
}

export default function CTA({
  title,
  backgroundColor = COLORS.PINK_0,
  borderColor = COLORS.RED_0,
  color = COLORS.RED_0,
  variant = "default",
  onPress,
  style,
  isSmall,
  isTransparent,
  isLeftIconSmall,
  isDisabled
}: Props) {
  const onPressHandler = () => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    onPress();
  };
  return (
    <TouchableOpacity
      onPress={onPressHandler}
      style={[
        styles.container,
        variant === "back" && styles.backContainer,
        style,
        {
          borderWidth: variant === "back" ? 0 : isTransparent ? 1 : 0,
          borderColor:
            variant === "back"
              ? "transparent"
              : isTransparent
                ? borderColor
                : "transparent",
          backgroundColor: isDisabled
            ? COLORS.GREY_0
            : variant === "back"
              ? "transparent"
              : isTransparent
                ? "transparent"
                : backgroundColor,
          paddingHorizontal:
            variant === "back" ? 0 : isSmall ? PADDING.SMALL_PADDING : "auto"
        }
      ]}
    >
      {variant === "back" ? (
        <View style={styles.backContent}>
          <View style={styles.backIconWrapper}>
            <Ionicons name="chevron-back" size={20} color={color} />
          </View>
          <Text
            style={[
              styles.title,
              styles.backTitle,
              { color: isDisabled ? COLORS.GREY_1 : color }
            ]}
          >
            {title}
          </Text>
        </View>
      ) : (
        <Text
          style={[styles.title, { color: isDisabled ? COLORS.GREY_1 : color }]}
        >
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  backContainer: {
    alignSelf: "flex-start",
    paddingVertical: 0
  },
  backContent: {
    alignItems: "center",
    flexDirection: "row",
    gap: 8
  },
  backIconWrapper: {
    alignItems: "center",
    aspectRatio: 1,
    backgroundColor: COLORS.PINK_0,
    borderRadius: 999,
    height: 35,
    justifyContent: "center"
  },
  backTitle: {
    fontSize: 20
  },
  container: {
    borderRadius: 50,
    marginVertical: 5,
    padding: 12
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center"
  }
});
