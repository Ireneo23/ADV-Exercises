import { Stack } from "expo-router";

export default function Layout() {
  return (
    <>
      <Stack>
        <Stack.Screen
          name="login"
          options={{
            headerShown: false,
            title: "login",
            headerTitle: "Login",
          }}
        />
      </Stack>
    </>
  );
}
