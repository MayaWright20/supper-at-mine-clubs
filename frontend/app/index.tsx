import { router } from  "expo-router";
import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import CTA from "@/components/buttons/cta";

import { setStorageItemAsync } from "@/store/store";
import { AUTH_ROUTE } from "@/types";
import { COLORS } from "@/costants/colors";

export default function Index() {

  const authHandler = (isLogin: string) => {
    setStorageItemAsync(AUTH_ROUTE, isLogin);
    router.navigate("/auth");
  };

  return (
      <SafeAreaView style={styles.container}>
        <View style={styles.btnWrapper}>
          <CTA title={"Log in"} onPress={()=> authHandler("true")} />
          <CTA title={"Sign up"} onPress={()=> authHandler("false")} />
        </View>
      </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.RED_0
  },
  btnWrapper: {
    flex: 1,
    justifyContent: "flex-end",
  }
});
