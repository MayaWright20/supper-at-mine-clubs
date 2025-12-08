import { router } from "expo-router";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import CTA from "@/components/buttons/cta";
import { SCREEN_STYLES } from "@/constants/styles";

export default function createSupper() {
  const goBack = () => {
    router.back();
  };

  return (
    <SafeAreaView style={SCREEN_STYLES.screen}>
      <Text>create supper</Text>
      <CTA title={"Go back"} onPress={goBack} />
    </SafeAreaView>
  );
}
