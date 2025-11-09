import { StyleSheet, View } from "react-native";

import CTA from "@/components/buttons/cta";
import { authHandler } from "@/utils/auth";
import { COLORS } from "@/costants/colors";
import { useStore } from "@/store/store";
import { useEffect } from "react";

export default function Index() {
  const setIsAuthScreen = useStore((state: any)=> state.setIsAuthScreen);

  useEffect(()=> {
      setIsAuthScreen(false);
  },[setIsAuthScreen])

  return (
    <View style={styles.btnWrapper}>
      <CTA title={"Log in"} onPress={()=> authHandler("true", "/auth")} />
    </View>
  );
}

const styles = StyleSheet.create({
  btnWrapper: {
    flex: 1,
    justifyContent: "flex-end",
    marginBottom: 0,
    backgroundColor: COLORS.RED_0
  }
});
