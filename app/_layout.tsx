import Ionicons from "@expo/vector-icons/Ionicons";
import { Tabs } from "expo-router";

export default function RootLayout() {
  return (
    <Tabs>
      <Tabs.Screen
        name="UplaodFile"
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="cloud-upload-outline" color={color} size={size} />
          ),
          title: "Upload File Example",
        }}
      />
      <Tabs.Screen
        name="Book_Fetching"
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="book-outline" color={color} size={size} />
          ),
          title: "Book Fetchin Example",
        }}
      />
    </Tabs>
  );
}
