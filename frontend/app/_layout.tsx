import { Stack } from   "expo-router";

// import { SessionProvider } from '../ctx';
import { SplashScreenController } from "@/components/splash-screen";

export default function RootLayout() {
  // Set up the auth context and render your layout inside of it.
  return (
    <>
      <SplashScreenController />
      <RootNavigator />
    </>
  );
}

function RootNavigator() {
  return (
    <Stack screenOptions={{headerShown: false}}>
      <Stack.Protected guard={true}>
        <Stack.Screen name="index" options={{
              headerShown: false,
              animation: 'slide_from_left',
            }}/>
        <Stack.Screen name="auth" options={{
              headerShown: false,
              animation: 'slide_from_bottom',
            }}/>
      </Stack.Protected>
      <Stack.Protected guard={false}>
        <Stack.Screen name="(app)"/>
      </Stack.Protected>
    </Stack>
  );
}
