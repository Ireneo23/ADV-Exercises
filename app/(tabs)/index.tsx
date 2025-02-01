import { View, Text, StyleSheet } from "react-native";

export default function Home() {
  return (
    <View style={styles.container}>
      <Text style={styles.author}>Ireneo S. Madohinog III</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    alignItems: "center",
  },
  author: {
    marginStart: 20,
    fontSize: 50,
    fontWeight: "bold",
  },
});
