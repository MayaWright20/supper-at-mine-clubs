import { Stack } from "expo-router";

import { SCREEN_NAMES } from "@/constants/screens";

export default function Layout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name={SCREEN_NAMES.HOME}
        options={{
          headerShown: false,
          animation: "slide_from_left",
        }}
      />
      <Stack.Screen
        name={SCREEN_NAMES.CREATE_SUPPER}
        options={{
          headerShown: false,
          animation: "slide_from_bottom",
        }}
      />
    </Stack>
  );
}
