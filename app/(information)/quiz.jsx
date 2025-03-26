import { useState } from "react";
import {
  Button,
  View,
  Text,
  TextInput,
  Modal,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import Quiz from "../../components/Quiz";
import CustomButton from "../../components/CustomButton";
import logo from "../../assets/images/quizlogo.png";

export default function quiz() {
  const [isStarted, setIsStarted] = useState(false);
  const [numQuestions, setNumQuestions] = useState(10);
  const [modalVisible, setModalVisible] = useState(false);

  const handleStartQuiz = () => {
    if (numQuestions >= 10 && numQuestions <= 30) {
      setIsStarted(true);
    } else {
      setModalVisible(true);
    }
  };

  return (
    <View style={styles.container}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Invalid Number of Questions</Text>
            <Text>Please enter a number between 10 and 30.</Text>
            <CustomButton
              onPress={() => setModalVisible(!modalVisible)}
              title="OK"
            />
          </View>
        </View>
      </Modal>
      {!isStarted ? (
        <>
          <Image source={logo} style={styles.logo} />
          <Text style={styles.text}>
            How many questions do you want to answer?
          </Text>
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
          <TouchableOpacity onPress={handleStartQuiz} style={styles.button}>
            <Text style={styles.startbtnText}>Start Quiz</Text>
          </TouchableOpacity>
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
    alignItems: "center",
    backgroundColor: "rgb(221, 213, 213)",
    padding: 20,
  },
  logo: {
    width: 500,
    height: 400,
  },
  input: {
    height: 50,
    borderColor: "gray",
    borderWidth: 2,
    width: 100,
    textAlign: "center",
    borderRadius: 8,
    fontWeight: 400,
    fontSize: 20,
  },
  modalContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    marginRight: 20,
  },
  modalView: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
  },
  text: {
    fontSize: 36,
    marginBottom: 10,
    fontWeight: "bold",
  },
  button: {
    backgroundColor: "#4CAF50",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  startbtnText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});
