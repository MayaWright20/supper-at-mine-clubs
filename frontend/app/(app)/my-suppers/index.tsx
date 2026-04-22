import { Text, View } from "react-native";

import { SCREEN_STYLES } from "@/constants/styles";
import useSuppers from "@/hooks/useSuppers";

export default function Index() {
  const { mySuppers } = useSuppers();

  return (
    <View style={SCREEN_STYLES.screen}>
      <Text>My Suppers</Text>
      {mySuppers.map((item, index) => (
        <View key={index}>
          <Text>{item.name}</Text>
          <Text>{item.description}</Text>
        </View>
      ))}
    </View>
  );
}
