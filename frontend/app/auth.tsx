import { Asset } from "expo-asset";
import { Image, ImageSource } from "expo-image";
import { router } from "expo-router";
import { useEffect } from "react";
import { ScrollView, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import CTA from "@/components/buttons/cta";
import { CustomFont } from "@/components/fonts/font";
import AnimatedTextInput from "@/components/inputs/text-input";
import Logo from "@/components/logo/logo";
import { COLORS } from "@/constants/colors";
import { BORDER_RADIUS } from "@/constants/styles";
import useImagePicker from "@/hooks/useImagePicker";
import { StoreState, useStore } from "@/store/store";
import { AuthRoutes } from "@/types/typess";
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
      <CTA
        variant="back"
        style={styles.backCTA}
        title={"Back"}
        onPress={backCta}
      />
      <ScrollView showsVerticalScrollIndicator={false} style={styles.form}>
        {image === defaultAvatar ? (
          <Logo width={300} />
        ) : (
          <Image placeholder={image} source={image} style={styles.image} />
        )}

        <CustomFont style={styles.brandName}>
          {isLogin === AuthRoutes.SING_UP
            ? `Create your account`
            : `Welcome back`}
        </CustomFont>
        {isLogin === AuthRoutes.SING_UP && (
          <CTA isTransparent title="Add profile picture" onPress={pickImage} />
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
                labelColor={COLORS.CREAM_0}
                key={index}
                color={COLORS.RED_0}
                backgroundColor={COLORS.RED_0}
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
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  backCTA: {
    alignSelf: "flex-start",
    marginLeft: 6
  },
  brandName: {
    alignSelf: "center",
    color: COLORS.RED_0,
    fontSize: 30,
    marginBottom: 25,
    textAlign: "center"
  },
  form: {
    flex: 1,
    marginHorizontal: 5,
    marginTop: 20
  },
  image: {
    alignSelf: "center",
    borderColor: COLORS.PINK_0,
    borderRadius: BORDER_RADIUS.X_LARGE,
    borderWidth: 2,
    height: 200,
    width: 200
  },
  safeAreaView: {
    backgroundColor: COLORS.CREAM_0,
    flex: 1
  }
});
