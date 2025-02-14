import { Tabs, useRouter } from "expo-router";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function Layout() {
  const router = useRouter();
  return (
    <Tabs
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          let IconComponent;
          if (route.name === "index") {
            iconName = "home";
            IconComponent = FontAwesome;
          } else if (route.name === "exercises") {
            iconName = "quiz";
            IconComponent = MaterialIcons;
          }
          return (
            <IconComponent
              name={iconName}
              size={size || 24}
              color={focused ? "rgb(24, 175, 213)" : "black"}
            />
          );
        },
        tabBarActiveTintColor: "rgb(24, 175, 213)",
        tabBarInactiveTintColor: "rgb(22, 23, 23)",
      })}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
        }}
      />
      <Tabs.Screen
        name="exercises"
        options={{
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => {
                console.log("Back button pressed");
                router.back();
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
          title: "Exercises",
          headerTitle: "",
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  icon: {
    paddingLeft: 20,
  },
});
