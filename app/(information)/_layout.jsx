import { Stack } from "expo-router";

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen name="about" />
      <Stack.Screen name="contact" />
    </Stack>
  );
}
