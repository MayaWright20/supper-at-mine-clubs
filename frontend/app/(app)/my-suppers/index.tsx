import { Text, View } from "react-native";

import { SCREEN_STYLES } from "@/constants/styles";
import useProfile from "@/hooks/useProfile";
import useSupper from "@/hooks/useSuppers";

export default function Index() {
  const { user } = useProfile();
  const userId = user?._id;

  const { suppers } = useSupper();

  const mySuppers =
    suppers && suppers.filter((item) => item.createdBy === userId);

  return (
    <View style={SCREEN_STYLES.screen}>
      <Text>My Suppers</Text>
      {mySuppers &&
        mySuppers.map((item, index) => (
          <View key={index}>
            <Text>{item.name}</Text>
            <Text>{item.description}</Text>
          </View>
        ))}
    </View>
  );
}
