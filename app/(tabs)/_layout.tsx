import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function Layout() {
  return (
    <Tabs>
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, size }) => <Ionicons name="home" size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="add-recipe"
        options={{
          title: "Add Recipe",
          tabBarIcon: ({ color, size }) => <Ionicons name="add-circle" size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="edit-recipe"
        options={{
          title: "Edit Recipe",
          tabBarIcon: ({ color, size }) => <Ionicons name="create" size={size} color={color} />,
        }}
      />
    </Tabs>
  );
}
