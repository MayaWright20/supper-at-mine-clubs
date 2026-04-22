import { Asset } from "expo-asset";
import { Image, ImageSource } from "expo-image";
import { router } from "expo-router";
import { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import CTA from "@/components/buttons/cta";
import AnimatedTextInput from "@/components/inputs/text-input";
import { COLORS } from "@/constants/colors";
import useImagePicker from "@/hooks/useImagePicker";
import { StoreState, useStore } from "@/store/store";
import { AuthRoutes } from "@/types/types";
import { AUTH_FORM } from "@/utils/auth";

const defaultAvatar = require("../assets/images/masgot/masgot_wave.png");

function getImageUri(source: ImageSource) {
  if (typeof source === "string") return source;

  if (typeof source === "number") {
    const asset = Asset.fromModule(source);
    return asset.localUri || asset.uri;
  }

  if (source && typeof source === "object" && "uri" in source) {
    return source.uri;
  }

  return "";
}

export default function SignIn() {
  const isLogin = useStore((state: StoreState) => state.authCTATitle);
  const setAuthCTATitle = useStore(
    (state: StoreState) => state.setAuthCTATitle
  );
  const setIsAuthBgCol = useStore((state: StoreState) => state.setIsAuthBgCol);
  const authForm = useStore((state: StoreState) => state.authForm);
  const updateAuthFormField = useStore(
    (state: StoreState) => state.updateAuthFormField
  );
  const resetAuthForm = useStore((state: StoreState) => state.resetAuthForm);

  const { pickImage, image } = useImagePicker(defaultAvatar);

  const backCta = () => {
    setAuthCTATitle(AuthRoutes.SING_UP);
    setIsAuthBgCol(false);
    resetAuthForm();
    router.navigate("/");
  };

  useEffect(() => {
    setIsAuthBgCol(true);
  }, [setIsAuthBgCol]);

  useEffect(() => {
    const imageUri = getImageUri(image);

    if (imageUri) {
      updateAuthFormField("avatar", imageUri, false);
    }
  }, [image, updateAuthFormField]);

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <CTA isSmall style={styles.backCTA} title={"Back"} onPress={backCta} />
      <View style={styles.form}>
        {isLogin === AuthRoutes.SING_UP && (
          <>
            <Image placeholder={image} source={image} style={styles.image} />
            <CTA title="Add profile picture" onPress={pickImage} />
          </>
        )}

        {AUTH_FORM &&
          AUTH_FORM.map((item, index) => {
            const formField = authForm.find((field) => field.id === item.id);

            if (
              (isLogin === AuthRoutes.LOGIN &&
                (item.id === "name" || item.id === "email")) ||
              item.id === "avatar"
            )
              return;

            return (
              <AnimatedTextInput
                borderColor={COLORS.RED_0}
                autoCapitalize={item.autoCapitalize}
                value={formField?.value || ""}
                onChangeText={(value) => {
                  updateAuthFormField(item.id, value, false);
                }}
                key={index}
                color={COLORS.RED_0}
                backgroundColor={COLORS.PINK_0}
                label={
                  isLogin === AuthRoutes.LOGIN && item.id === "username"
                    ? "Username | Email"
                    : item.label
                }
                secureTextEntry={item.secureTextEntry}
                errorMessage={formField?.errorMessage}
                showErrorMessage={formField?.showErrorMessage}
              />
            );
          })}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  backCTA: {
    alignSelf: "flex-start",
    marginLeft: 6
  },
  form: {
    flex: 1,
    marginHorizontal: 5,
    marginTop: 20
  },
  image: {
    alignSelf: "center",
    // backgroundColor: "white",
    borderColor: COLORS.RED_0,
    borderRadius: "100%",
    borderWidth: 2,
    height: 200,
    width: 200
  },
  safeAreaView: {
    backgroundColor: COLORS.CREAM_0,
    flex: 1
  }
});
