import Ionicons from "@expo/vector-icons/Ionicons";
import { Tabs } from "expo-router";

import { COLORS } from "@/constants/colors";
import { PAGE_BACKGROUND_COL } from "@/constants/styles";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: COLORS.RED_0,
        tabBarInactiveTintColor: COLORS.RED_0,
        tabBarStyle: {
          backgroundColor: PAGE_BACKGROUND_COL
        },
        headerStyle: {
          backgroundColor: PAGE_BACKGROUND_COL
        },
        headerShown: false
      }}
    >
      <Tabs.Screen
        name="search"
        options={{
          title: "Search",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name={focused ? "search-sharp" : "search-outline"}
              color={COLORS.RED_0}
              size={24}
            />
          )
        }}
      />
      <Tabs.Screen
        name="my-suppers/index"
        options={{
          title: "My Suppers",
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name={focused ? "fast-food-sharp" : "fast-food-outline"}
              color={COLORS.RED_0}
              size={24}
            />
          )
        }}
      />
      <Tabs.Screen
        name="favourites/index"
        options={{
          title: "Favourites",
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name={focused ? "heart-sharp" : "heart-outline"}
              color={focused ? "red" : COLORS.RED_0}
              size={24}
            />
          )
        }}
      />

      <Tabs.Screen
        name="profile/index"
        options={{
          title: "Profile",
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name={focused ? "person" : "person-outline"}
              size={24}
              color={COLORS.RED_0}
            />
          )
        }}
      />
    </Tabs>
  );
}
