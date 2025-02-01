import { Stack } from "expo-router";

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: "Settings",
        }}
      />
      <Stack.Screen
        name="Test1"
        options={{
          title: "Settings - test",
        }}
      />
    </Stack>
  );
}
