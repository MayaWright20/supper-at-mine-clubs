import { Text, View } from "react-native";

import CTA from "@/components/buttons/cta";
import { SCREEN_STYLES } from "@/constants/styles";
import useProfile from "@/hooks/useProfile";
import useSupper from "@/hooks/useSuppers";

export default function Index() {
  const { logOut, user } = useProfile();
  const { getAllSupper } = useSupper();

  return (
    <View style={SCREEN_STYLES.screen}>
      <CTA title={"GET Club"} onPress={getAllSupper} />
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
