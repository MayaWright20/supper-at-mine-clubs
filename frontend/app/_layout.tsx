import { Image } from "expo-image";
import { router, Stack } from "expo-router";
import { useVideoPlayer, VideoView } from "expo-video";
import { useEffect, useMemo, useRef } from "react";
import { StyleSheet, Text, useWindowDimensions, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import CTA from "@/components/buttons/cta";
import { CustomFont } from "@/components/fonts/font";
import Logo from "@/components/logo/logo";
import { SplashScreenController } from "@/components/splash-screen";
import { COLORS } from "@/constants/colors";
import { EMAIL_VALIDATOR } from "@/constants/regex";
import useProfile from "@/hooks/useProfile";
import { StoreState, usePersistStore, useStore } from "@/store/store";
import { AuthForm, AuthRoutes } from "@/types/typess";
import { AUTH_FORM } from "@/utils/auth";
import { isRegExValid, regexErrorMessage } from "@/utils/regex";

const videoSource = require("../assets/videos/Fuzz.mp4");

export default function RootLayout() {
  return (
    <>
      <SplashScreenController />
      <RootNavigator />
    </>
  );
}

function RootNavigator() {
  const authCTATitle = useStore((state: StoreState) => state.authCTATitle);
  const setAuthCTATitle = useStore(
    (state: StoreState) => state.setAuthCTATitle
  );
  const isAuthBgCol = useStore((state: StoreState) => state.isAuthBgCol);
  const setIsAuthBgCol = useStore((state: StoreState) => state.setIsAuthBgCol);
  const authForm = useStore((state: StoreState) => state.authForm);
  const setAuthForm = useStore((state: StoreState) => state.setAuthForm);
  const updateAuthFormField = useStore(
    (state: StoreState) => state.updateAuthFormField
  );

  const sessionToken = usePersistStore((state: any) => state.sessionToken);

  const { signUp, login } = useProfile();
  const { width } = useWindowDimensions();

  const isReversed = useRef(false);

  const isLogin = useMemo(
    () => authCTATitle === AuthRoutes.LOGIN,
    [authCTATitle]
  );
  const fieldsToValidate = useMemo(
    // fieldsToValidate uses username and password for when validating login. See order in store.ts.
    () => (isLogin ? [authForm[1], authForm[3]] : authForm),
    [isLogin, authForm]
  );

  const navigateToAuth = () => {
    router.navigate("/auth");
  };

  const isFormValid = (): boolean => {
    let failedValidator: RegExp | null = null;

    for (const field of fieldsToValidate) {
      failedValidator =
        field.validator.find((validator) => {
          if (isLogin && field.id === "username" && field.value.includes("@")) {
            return !isRegExValid(field.value, EMAIL_VALIDATOR);
          }

          return !isRegExValid(field.value, validator);
        }) || null;

      if (failedValidator) {
        updateAuthFormField(
          isLogin ? "password" : field.id,
          undefined,
          true,
          isLogin ? "Invalid credentials" : regexErrorMessage(failedValidator)
        );
        return false;
      }
    }

    return true;
  };

  const getAuthFormData = () => {
    const formData: AuthForm = {};

    authForm.map((item) => {
      formData[item.id] = item.value;
    });

    return formData;
  };

  const authBtnHandler = async () => {
    if (!isAuthBgCol) {
      navigateToAuth();
      setIsAuthBgCol(false);
    } else {
      if (isFormValid()) {
        const formData = getAuthFormData();

        if (isLogin) {
          const form = new FormData();
          Object.entries(formData).forEach(([key, value]) => {
            form.append(key, value);
          });

          login(form);
        } else {
          signUp(formData, isLogin);
        }
      }
    }
  };

  const loginAuthHandler = () => {
    navigateToAuth();
    setAuthCTATitle(AuthRoutes.LOGIN);
  };

  const player = useVideoPlayer(videoSource, (player) => {
    player.loop = false;
    player.play();
  });

  useEffect(() => {
    setIsAuthBgCol(false);
    setAuthForm(AUTH_FORM);
  }, [setIsAuthBgCol, setAuthForm]);

  useEffect(() => {
    const handleVideoEnd = () => {
      if (isReversed.current) {
        player.currentTime = 0;
        player.playbackRate = 1;
        isReversed.current = false;
      } else {
        player.currentTime = player.duration || 0;
        player.playbackRate = -1;
        isReversed.current = true;
      }
      player.play();
    };

    const subscription = player.addListener("playToEnd", handleVideoEnd);

    return () => subscription?.remove();
  }, [player]);

  return (
    <>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Protected guard={!sessionToken}>
          <Stack.Screen
            name="index"
            options={{
              headerShown: false,
              animation: "slide_from_left"
            }}
          />
          <Stack.Screen
            name="auth"
            options={{
              headerShown: false,
              animation: "slide_from_bottom"
            }}
          />
        </Stack.Protected>
        <Stack.Protected guard={!!sessionToken}>
          <Stack.Screen name="(app)" />
        </Stack.Protected>
      </Stack>
      {!isAuthBgCol && !sessionToken && (
        <>
          <VideoView
            style={styles.pictureContainer}
            player={player}
            contentFit="cover"
            nativeControls={false}
          />
          <View style={styles.headerContainer}>
            <SafeAreaView style={styles.safeAreaView}>
              <Logo />
              <CustomFont
                style={styles.brandName}
              >{`Supper \nAt Mine Clubs`}</CustomFont>
              <Text
                style={styles.tagline}
              >{`Real people. Great food. \nUnforgettable nights.`}</Text>
            </SafeAreaView>
            <Image
              style={[styles.image, { width }]}
              source={require("../assets/images/dinner-party.png")}
              contentFit="cover"
            />
            <View style={styles.overlay}></View>
          </View>
          <CTA
            title={AuthRoutes.LOGIN}
            onPress={loginAuthHandler}
            style={!isAuthBgCol && styles.cta}
          />
        </>
      )}
      {!sessionToken && (
        <SafeAreaView
          style={[
            styles.authBtnSafeAreaView,
            { backgroundColor: isAuthBgCol ? COLORS.CREAM_0 : undefined }
          ]}
        >
          <CTA
            style={!isAuthBgCol ? styles.cta : styles.ctaAuth}
            onPress={authBtnHandler}
            title={authCTATitle}
            isTransparent={!isAuthBgCol ? true : false}
            borderColor={!isAuthBgCol ? COLORS.CREAM_0 : undefined}
            color={!isAuthBgCol ? COLORS.CREAM_0 : undefined}
          />
          {!isAuthBgCol && (
            <>
              <View style={[styles.termsWrapper, styles.termsHeader]}>
                <Text
                  style={styles.terms}
                >{`By continuing, you agree to our `}</Text>
                <Text style={[styles.terms, styles.bold]}>
                  Terms of Service
                </Text>
              </View>
              <View style={styles.termsWrapper}>
                <Text style={styles.terms}>and </Text>
                <Text style={[styles.terms, styles.bold]}>Privacy Policy</Text>
              </View>
            </>
          )}
        </SafeAreaView>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  authBtnSafeAreaView: {
    paddingTop: "-100%"
  },
  bold: {
    fontWeight: "bold"
  },
  brandName: {
    alignSelf: "center",
    color: COLORS.RED_0,
    fontSize: 50,
    textAlign: "center"
  },
  cta: {
    marginHorizontal: 6
  },
  ctaAuth: {
    borderColor: COLORS.CREAM_0,
    marginHorizontal: 6
  },
  headerContainer: {
    alignSelf: "center",
    borderRadius: "150%",
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    height: "80%",
    justifyContent: "space-between",
    overflow: "hidden",
    top: "-3%",
    width: "210%"
  },
  image: {
    alignSelf: "center",
    aspectRatio: 1,
    top: -50
  },
  overlay: {
    backgroundColor: COLORS.CREAM_0,
    height: "100%",
    opacity: 0.1,
    position: "absolute",
    width: "100%"
  },
  pictureContainer: {
    ...StyleSheet.absoluteFillObject
  },
  safeAreaView: {
    paddingBottom: "-100%"
  },
  tagline: {
    marginTop: 30,
    position: "relative",
    textAlign: "center"
  },
  terms: {
    color: "white",
    fontSize: 12,
    textAlign: "center"
  },
  termsHeader: {
    marginTop: 5
  },
  termsWrapper: {
    alignSelf: "center",
    flexDirection: "row"
  }
});
