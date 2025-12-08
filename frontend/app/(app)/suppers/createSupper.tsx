import { router } from "expo-router";
import { Text, View } from "react-native";

import CTA from "@/components/buttons/cta";

export default function createSupper() {
  const goBack = () => {
    router.back();
  };
  return (
    <View>
      <Text>create supper</Text>
      <CTA title={"Go back"} onPress={goBack} />
    </View>
  );
}
