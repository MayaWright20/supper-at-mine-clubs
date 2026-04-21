import { Image } from "expo-image";
import { StyleSheet, Text, View } from "react-native";

import { SCREEN_STYLES } from "@/constants/styles";
import useProfile from "@/hooks/useProfile";

export default function Index() {
  const { logOut, user } = useProfile();

  return (
    <View style={SCREEN_STYLES.screen}>
      {user?.avatarUrl ? (
        <Image source={{ uri: user.avatarUrl }} style={styles.avatar} />
      ) : (
        <View style={styles.avatar}></View>
      )}
      <Text>{user?.name}</Text>
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

const styles = StyleSheet.create({
  avatar: {
    alignSelf: "center",
    backgroundColor: "white",
    borderColor: "pink",
    borderRadius: 100,
    borderWidth: 2,
    height: 150,
    marginVertical: 20,
    overflow: "hidden",
    width: 150
  }
});
