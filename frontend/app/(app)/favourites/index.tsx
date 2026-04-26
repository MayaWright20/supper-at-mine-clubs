import { Text, View } from "react-native";

import Header from "@/components/header/header";
import { SCREEN_STYLES } from "@/constants/styles";

export default function Index() {
  return (
    <View style={SCREEN_STYLES.screen}>
      <Header title="Favourites" />
      <Text>favourites</Text>
    </View>
  );
}
