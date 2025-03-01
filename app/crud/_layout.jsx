import { Stack, useRouter } from "expo-router";
import { TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function Layout() {
  const router = useRouter();
  return (
    <>
      <Stack>
        <Stack.Screen
          name="crud"
          options={{
            headerLeft: () => (
              <TouchableOpacity
                onPress={() => {
                  console.log("Back button pressed");
                  router.navigate("/(tabs)/exercises");
                }}
              >
                <Ionicons
                  style={styles.icon}
                  name="arrow-back"
                  size={24}
                  color="black"
                />
              </TouchableOpacity>
            ),
            headerTitle: "",
          }}
        />
      </Stack>
    </>
  );
}

const styles = StyleSheet.create({
  icon: {
    padding: 20,
  },
});
