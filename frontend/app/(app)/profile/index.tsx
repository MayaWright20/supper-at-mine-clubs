import { Text, View } from "react-native";

import { SCREEN_STYLES } from "@/constants/styles";
import useProfile from "@/hooks/useProfile";

export default function Index() {
  const { logOut, user } = useProfile();

  return (
    <View style={SCREEN_STYLES.screen}>
      <Text>{user.name}</Text>
      <Text
        onPress={() => {
          logOut();
        }}
      >
        Sign Out
      </Text>
    </View>
  );
}
