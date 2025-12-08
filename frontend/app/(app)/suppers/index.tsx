import { router } from "expo-router";
import { Text, View } from "react-native";

import CTA from "@/components/buttons/cta";

export default function Index() {
  const goToCreateSupper = () => {
    router.navigate("/(app)/suppers/createSupper");
  };
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <CTA title={"Host a Supper"} onPress={goToCreateSupper} />
      <Text>shop</Text>
    </View>
  );
}
