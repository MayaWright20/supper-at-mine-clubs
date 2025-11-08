import { router } from  "expo-router";
import { useMemo } from "react";
import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import CTA from "@/components/buttons/cta";
import TextInputComponent from "@/components/inputs/text-input";

import { COLORS } from "@/costants/colors";
import { useStorageState } from "@/store/store";
import { AUTH_ROUTE } from "@/types";


// import { useSession } from '../ctx';

interface AuthItem {
  label: string;
}

type AUTH_ITEM = Record<string, AuthItem[]>;

const AUTH_ITEMS: AUTH_ITEM = {
  true: [
    // Login
    {
      label: "Username | Email",
    },
    {
      label: "Password",
    },
  ],
  false: [
    // Sign up
    {
      label: "Name",
    },
    {
      label: "Username",
    },
    {
      label: "Email",
    },
    {
      label: "Password",
    },
  ],
};

export default function SignIn() {
  //   const { signIn } = useSession();
  const [storage, setStorageHandler] = useStorageState(AUTH_ROUTE);
  const formItems = useMemo(() => AUTH_ITEMS[`${storage[1]}`], [storage]);

  const backCta = () => {
    router.navigate("/");
  };

  const authHandler = () => {};

  return (
      <SafeAreaView style={styles.safeAreaView}>
        <CTA isSmall style={styles.backCTA} title={"Back"} onPress={backCta} />
        <View style={styles.form}>
          {formItems &&
            formItems.map((item, index) => {
              return (
                <TextInputComponent
                  key={index}
                  backgroundColor={COLORS.RED_0}
                  label={item.label}
                />
              );
            })}
        </View>
        <CTA
          title={storage[1] === "true" ? "Login" : "Sign up"}
          onPress={authHandler}
        />
      </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeAreaView:{
    flex: 1,
  },
  backCTA: {
    alignSelf: "flex-start",
  },
  form: {
    flex: 1,
    marginTop: 20
  },
});
