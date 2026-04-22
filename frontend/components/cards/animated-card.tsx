import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useRef } from "react";
import { Animated, StyleProp, ViewStyle } from "react-native";

import Card from "@/components/cards/card";

export default function AnimatedCard({
  item,
  index,
  style
}: {
  item: any;
  index: number;
  style?: StyleProp<ViewStyle>;
}) {
  const opacity = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(50)).current;

  useFocusEffect(
    useCallback(() => {
      // Reset animation values
      opacity.setValue(0);
      translateY.setValue(50);

      // Start animation
      Animated.parallel([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 500,
          delay: index * 100,
          useNativeDriver: true
        }),
        Animated.timing(translateY, {
          toValue: 0,
          duration: 500,
          delay: index * 100,
          useNativeDriver: true
        })
      ]).start();
    }, [index, opacity, translateY])
  );

  return (
    <Animated.View
      style={[
        {
          opacity,
          transform: [{ translateY }],
          flex: 1,
          maxWidth: "50%"
        },
        style
      ]}
    >
      <Card title={item.name} image={item.images?.[0]} />
    </Animated.View>
  );
}
