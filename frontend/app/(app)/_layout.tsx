import Ionicons from "@expo/vector-icons/Ionicons";
import { Tabs } from "expo-router";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "black",
        headerShown: true,
      }}
    >
      <Tabs.Screen
        name="suppers"
        options={{
          title: "suppers",
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name={focused ? "home-sharp" : "home-outline"}
              color={"black"}
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
              color={focused ? "red" : "black"}
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
              color="black"
            />
          ),
        }}
      />
    </Tabs>
  );
}
