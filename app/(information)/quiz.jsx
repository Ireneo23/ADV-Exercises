import { useState } from "react";
import { Button, View, Text, TextInput, Alert, StyleSheet } from "react-native";
import Quiz from "../../components/Quiz";

export default function quiz() {
  const [isStarted, setIsStarted] = useState(false);
  const [numQuestions, setNumQuestions] = useState(10);

  const handleStartQuiz = () => {
    if (numQuestions >= 10 && numQuestions <= 30) {
      setIsStarted(true);
    } else {
      Alert.alert("Invalid number", "Please enter a number between 10 and 30.");
    }
  };

  return (
    <View style={styles.container}>
      {!isStarted ? (
        <>
          <Text>How many questions do you want to answer?</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={String(numQuestions)}
            onChangeText={(text) => {
              if (text === "") {
                setNumQuestions(0);
              } else {
                const num = parseInt(text, 10);
                if (!isNaN(num)) {
                  setNumQuestions(num);
                }
              }
            }}
          />
          <Button onPress={handleStartQuiz} title="Start Quiz" />
        </>
      ) : (
        <Quiz numQuestions={numQuestions} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 20,
    width: 100,
    textAlign: "center",
  },
});
