import * as Haptics from "expo-haptics";
import {
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  ViewStyle,
} from "react-native";

import { COLORS } from "@/constants/colors";
import { PADDING } from "@/constants/styles";

interface Props {
  title: string;
  backgroundColor?: string;
  color?: string;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
  isSmall?: boolean;
}

export default function CTA({
  title,
  backgroundColor = COLORS.PINK_0,
  color = COLORS.RED_0,
  onPress,
  style,
  isSmall,
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
        style,
        {
          backgroundColor,
          paddingHorizontal: isSmall ? PADDING.SMALL_PADDING : "auto",
        },
      ]}
    >
      <Text style={[styles.title, { color }]}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 50,
    marginVertical: 5,
    padding: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
});
