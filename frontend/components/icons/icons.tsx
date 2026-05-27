import Ionicons from "@expo/vector-icons/Ionicons";
import { OpaqueColorValue, StyleSheet, TouchableOpacity } from "react-native";

import { COLORS } from "@/constants/colors";
import { BORDER_RADIUS } from "@/constants/styles";

interface Props {
  isDisabled?: boolean;
  onPress?: () => void;
  color?: string | OpaqueColorValue;
  name: React.ComponentProps<typeof Ionicons>["name"];
}

export const IconCircle = ({
  isDisabled,
  onPress,
  color = isDisabled ? COLORS.GREY_1 : COLORS.RED_0,
  name
}: Props) => {
  return (
    <TouchableOpacity
      disabled={isDisabled}
      onPress={onPress}
      style={[
        styles.circleIconWrapper,
        { backgroundColor: isDisabled ? COLORS.GREY_0 : COLORS.PINK_0 }
      ]}
    >
      <Ionicons name={name} size={20} color={color} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  circleIconWrapper: {
    alignItems: "center",
    aspectRatio: 1,
    borderRadius: BORDER_RADIUS.X_LARGE,
    height: 35,
    justifyContent: "center"
  }
});
