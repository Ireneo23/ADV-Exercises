import { Stack } from "expo-router";
import { TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function Layout() {
  const router = useRouter();
  return (
    <Stack>
      <Stack.Screen name="about" />
      <Stack.Screen
        name="contact"
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
      <Stack.Screen
        name="effect"
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
      <Stack.Screen
        name="login"
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
      <Stack.Screen
        name="register"
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
  );
}

const styles = StyleSheet.create({
  icon: {
    paddingLeft: 20,
  },
});
