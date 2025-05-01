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
                router.push("/(tabs)/exercises");
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
          headerTitle: "Contact",
          headerTitleAlign: "center",
        }}
      />
      <Stack.Screen
        name="effect"
        options={{
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => {
                console.log("Back button pressed");
                router.push("/(tabs)/exercises");
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
          headerTitle: "Exercise 4 (Timer)",
          headerTitleAlign: "center",
        }}
      />
      <Stack.Screen
        name="login"
        options={{
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => {
                console.log("Back button pressed");
                router.push("/(tabs)/exercises");
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
          headerTitle: "Exercise 3 (Login)",
          headerTitleAlign: "center",
        }}
      />
      <Stack.Screen
        name="register"
        options={{
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => {
                console.log("Back button pressed");
                router.push("/(tabs)/exercises");
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
          headerTitle: "Exercise 5 (Register)",
          headerTitleAlign: "center",
        }}
      />
      <Stack.Screen
        name="quiz"
        style={styles.title}
        options={{
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => {
                console.log("Back button pressed");
                router.push("/(tabs)/exercises");
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
          headerTitle: "Exercise 7 (Quiz API)",
          headerTitleAlign: "center",
        }}
      />
      <Stack.Screen
        name="home"
        style={styles.title}
        options={{
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => {
                console.log("Back button pressed");
                router.push("/(tabs)/exercises");
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
          headerTitle: "Exercise 8 - 9",
          headerTitleAlign: "center",
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
