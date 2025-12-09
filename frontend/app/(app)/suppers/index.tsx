import { useFocusEffect } from "@react-navigation/native";
import { router } from "expo-router";
import { useCallback, useRef } from "react";
import { Animated, FlatList, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import CTA from "@/components/buttons/cta";
import Card from "@/components/cards/card";
import AnimatedTextInput from "@/components/inputs/text-input";
import { COLORS } from "@/constants/colors";
import { SCREEN_STYLES } from "@/constants/styles";
import useSupper from "@/hooks/useSuppers";
import { ROUTES } from "@/routes/routes";

const AnimatedCard = ({ item, index }: { item: any; index: number }) => {
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
          useNativeDriver: true,
        }),
        Animated.timing(translateY, {
          toValue: 0,
          duration: 500,
          delay: index * 100,
          useNativeDriver: true,
        }),
      ]).start();
    }, [index, opacity, translateY])
  );

  return (
    <Animated.View
      style={{
        opacity,
        transform: [{ translateY }],
        flex: 1,
        maxWidth: "50%",
      }}
    >
      <Card title={item.name} />
    </Animated.View>
  );
};

export default function Index() {
  const goToCreateSupper = () => {
    router.navigate(ROUTES.CREATE_SUPPER);
  };

  const search = (input: string) => {
    console.log("string", input);
  };

  const { suppers } = useSupper();

  return (
    <SafeAreaView edges={["right", "top", "left"]} style={SCREEN_STYLES.screen}>
      <View style={styles.ctaWrapper}>
        <AnimatedTextInput
          borderColor={COLORS.RED_0}
          onChangeText={(value) => {
            search(value);
          }}
          color={COLORS.RED_0}
          backgroundColor={COLORS.PINK_0}
          label={"Search"}
          style={[styles.headerItem, styles.searchBar]}
        />
        <CTA
          style={styles.headerItem}
          title={"Host"}
          onPress={goToCreateSupper}
        />
      </View>
      <FlatList
        data={suppers && suppers}
        columnWrapperStyle={{ justifyContent: "space-between", gap: 10 }}
        numColumns={2}
        ItemSeparatorComponent={() => <View style={{ height: 16 }} />}
        showsVerticalScrollIndicator={false}
        renderItem={({ item, index }) => {
          return <AnimatedCard item={item} index={index} key={index} />;
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  ctaWrapper: {
    flexDirection: "row",
    width: "100%",
  },
  headerItem: {
    flex: 1,
  },
  searchBar: {
    flex: 2,
    marginRight: 5,
  },
});
