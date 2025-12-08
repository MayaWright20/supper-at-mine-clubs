import { Stack } from "expo-router";

export default function Layout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="index"
        options={{
          headerShown: false,
          animation: "slide_from_left",
        }}
      />
      <Stack.Screen
        name="createSupper"
        options={{
          headerShown: false,
          animation: "slide_from_bottom",
        }}
      />
    </Stack>
  );
}
