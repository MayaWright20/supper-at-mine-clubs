import Ionicons from "@expo/vector-icons/Ionicons";
import { Tabs } from "expo-router";

import { COLORS } from "@/constants/colors";
import { PAGE_BACKGROUND_COL } from "@/constants/styles";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: COLORS.PINK_0,
        tabBarInactiveTintColor: COLORS.PINK_0,
        tabBarStyle: {
          backgroundColor: PAGE_BACKGROUND_COL,
        },
        headerStyle: {
          backgroundColor: PAGE_BACKGROUND_COL,
        },
      }}
    >
      <Tabs.Screen
        name="suppers"
        options={{
          title: "suppers",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name={focused ? "home-sharp" : "home-outline"}
              color={COLORS.PINK_1}
              size={24}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="favourites/index"
        options={{
          title: "favourites",
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name={focused ? "heart-sharp" : "heart-outline"}
              color={focused ? "red" : COLORS.PINK_1}
              size={24}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile/index"
        options={{
          title: "profile",
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name={focused ? "person" : "person-outline"}
              size={24}
              color={COLORS.PINK_1}
            />
          ),
        }}
      />
    </Tabs>
  );
}
