import { router } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import CTA from "@/components/buttons/cta";
import AnimatedTextInput from "@/components/inputs/text-input";
import { COLORS } from "@/constants/colors";
import { SCREEN_STYLES } from "@/constants/styles";
import { ROUTES } from "@/routes/routes";

export default function Index() {
  const goToCreateSupper = () => {
    router.navigate(ROUTES.CREATE_SUPPER);
  };

  const search = (input: string) => {
    console.log("string", input);
  };

  return (
    <SafeAreaView style={SCREEN_STYLES.screen}>
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
      <Text>shop</Text>
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
    marginLeft: 5,
  },
});
