import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  ViewStyle,
} from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

const ANIMATION_DURATION = 600;

const TRANSLATE_Y_ANIMATED = -1;
const FONT_SIZE_ANIMATED = 10;
const TRANSLATE_X_ANIMATED = 20;
const LABEL_PADDING_ANIMATED = 0;

const TRANSLATE_Y_NOT_ANIMATED = 9.5;
const FONT_SIZE_NOT_ANIMATED = 14;
const TRANSLATE_X_NOT_ANIMATED = 5;
const LABEL_PADDING_NOT_ANIMATED = 10;

type AutoCapitalize = "none" | "sentences" | "words" | "characters";

interface Props {
  backgroundColor?: string;
  borderColor?: string;
  color?: string;
  label: string;
  value?: string;
  onChangeText: (input: string) => void;
  autoCapitalize?: AutoCapitalize;
  errorMessage?: string;
  showErrorMessage?: boolean;
  containerStyle?: ViewStyle;
  placeholder?: string;
  onBlur?: () => void;
  secureTextEntry?: boolean;
}

export default function AnimatedTextInput({
  backgroundColor = "white",
  borderColor,
  color = "white",
  label,
  value,
  onChangeText,
  autoCapitalize,
  errorMessage,
  showErrorMessage,
  containerStyle,
  placeholder,
  onBlur,
  secureTextEntry,
}: Props) {
  const inputRef = useRef<TextInput>(null);

  const [isAnimated, setIsAnimated] = useState<boolean>(false);
  const [isSecureTextHidden, setIsSecureTextHidden] = useState(true);

  const translateY = useSharedValue(TRANSLATE_Y_NOT_ANIMATED);
  const translateX = useSharedValue(TRANSLATE_X_NOT_ANIMATED);
  const labelPadding = useSharedValue(LABEL_PADDING_NOT_ANIMATED);
  const fontSize = useSharedValue(FONT_SIZE_NOT_ANIMATED);

  const updateAnimations = useCallback(
    (toggled: boolean) => {
      translateY.value = withTiming(
        toggled ? TRANSLATE_Y_ANIMATED : TRANSLATE_Y_NOT_ANIMATED,
        {
          duration: ANIMATION_DURATION,
        },
      );
      translateX.value = withTiming(
        toggled ? TRANSLATE_X_ANIMATED : TRANSLATE_X_NOT_ANIMATED,
        {
          duration: ANIMATION_DURATION,
        },
      );
      labelPadding.value = withTiming(
        toggled ? LABEL_PADDING_ANIMATED : LABEL_PADDING_NOT_ANIMATED,
        {
          duration: ANIMATION_DURATION,
        },
      );

      fontSize.value = withTiming(
        toggled ? FONT_SIZE_ANIMATED : FONT_SIZE_NOT_ANIMATED,
        {
          duration: ANIMATION_DURATION,
        },
      );
    },
    [translateY, translateX, labelPadding, fontSize],
  );

  const animatedLabelWrapperStyle = useAnimatedStyle(() => ({
    transform: [
      { translateY: translateY.value },
      { translateX: translateX.value },
    ],
    padding: labelPadding.value,
  }));

  const animatedTextStyle = useAnimatedStyle(() => ({
    fontSize: fontSize.value,
  }));

  const onChangeTextHandler = (input: string) => {
    onChangeText(input);
  };

  const setIsAnimatingHandler = (showAnimation: boolean) => {
    if (showAnimation) {
      inputRef.current?.focus();
    }
    setIsAnimated(showAnimation);
  };

  useEffect(() => {
    updateAnimations(isAnimated);
  }, [isAnimated, updateAnimations]);

  const onBlurAnimation = () => {
    if (onBlur) {
      onBlur();
      setIsAnimatingHandler(false);
    }

    if (value?.trim() === "" || value === undefined) {
      setIsAnimatingHandler(false);
    }
  };

  const toggleSecureText = () => {
    setIsSecureTextHidden((prev) => !prev);
    if (isSecureTextHidden) {
      setTimeout(() => {
        setIsSecureTextHidden(true);
      }, 5000);
    }
  };

  useEffect(() => {
    if (value?.trim() === "" || value === undefined) {
      setIsAnimatingHandler(false);
    }
  }, [value]);

  return (
    <Pressable
      style={containerStyle}
      onPress={() => setIsAnimatingHandler(true)}
    >
      <TextInput
        ref={inputRef}
        value={value && value}
        onChangeText={onChangeTextHandler}
        style={[styles.textInput, { color, borderColor: borderColor }]}
        autoCapitalize={autoCapitalize}
        cursorColor={backgroundColor}
        onPress={() => setIsAnimatingHandler(true)}
        placeholder={isAnimated ? undefined : placeholder}
        textAlign={isAnimated ? "left" : "right"}
        onBlur={onBlurAnimation}
        secureTextEntry={secureTextEntry && isSecureTextHidden}
      />

      <Animated.View
        style={[
          styles.labelWrapper,
          {
            borderColor: color,
            backgroundColor,
          },
          animatedLabelWrapperStyle,
        ]}
      >
        <Animated.Text
          style={[
            {
              color,
              fontWeight: isAnimated ? "bold" : "500",
            },
            styles.label,
            animatedTextStyle,
          ]}
        >
          {label}
        </Animated.Text>
        {secureTextEntry && (
          <Pressable
            style={styles.iconWrapper}
            onPress={toggleSecureText}
            android_ripple={{ color: "transparent" }}
          >
            <MaterialCommunityIcons
              name={isSecureTextHidden ? "eye-off-outline" : "eye-outline"}
              size={isAnimated ? 7 : FONT_SIZE_NOT_ANIMATED}
              color={color}
            />
          </Pressable>
        )}
      </Animated.View>
      {showErrorMessage && (
        <Text style={[styles.errorLabel, { color }]}>{`${errorMessage}`}</Text>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  errorLabel: {
    fontSize: 12,
    marginBottom: 2,
    marginRight: 20,
    textAlign: "right",
  },
  iconWrapper: {
    paddingRight: 7,
  },
  label: {
    paddingHorizontal: 5,
    textTransform: "capitalize",
  },
  labelWrapper: {
    alignItems: "center",
    borderRadius: 100,
    borderWidth: 1,
    flexDirection: "row",
    overflow: "hidden",
    position: "absolute",
  },
  textInput: {
    backgroundColor: "white",
    borderRadius: 50,
    borderWidth: 1,
    flexDirection: "row",
    marginBottom: 5,
    marginVertical: 5,
    paddingHorizontal: 25,
    paddingVertical: 15,
    position: "relative",
  },
});
