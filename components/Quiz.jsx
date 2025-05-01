import { useEffect, useState } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import CustomButton from "./CustomButton";
import { useRouter } from "expo-router";

export default function Quiz({ numQuestions }) {
  const router = useRouter();
  const [quizzes, setQuizzes] = useState([]);
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [count, setCount] = useState(1);
  const [selectedAnswers, setSelectedAnswers] = useState([]);

  useEffect(() => {
    fetch(`https://opentdb.com/api.php?amount=${numQuestions}`).then((data) => {
      setTimeout(() => {
        data.json().then((quizzes) => {
          setQuizzes(quizzes.results);
        });
      });
    });
  }, [numQuestions]);

  function answers() {
    let answers = [];
    if (quizzes.length) {
      answers = [
        ...quizzes[current].incorrect_answers,
        quizzes[current].correct_answer,
      ];
    }
    return answers;
  }

  const handleAnswers = (value) => {
    setSelectedAnswer(value);
    if (quizzes.length) {
      const updatedAnswers = [...selectedAnswers];
      updatedAnswers[current] = value;
      setSelectedAnswers(updatedAnswers);

      if (value == quizzes[current].correct_answer) {
        quizzes[current]["isCorrect"] = true;
        setScore((prev) => prev + 1);
      } else {
        quizzes[current]["isCorrect"] = false;
      }
      setTimeout(() => {
        setCurrent((prev) => prev + 1);
        setSelectedAnswer(null);
        setCount((prev) => prev + 1);
      });
    }
  };

  const decodeHtmlEntities = (str) => {
    const htmlEntities = {
      "&quot;": '"',
      "&#039;": "'",
      "&amp;": "&",
      "&lt;": "<",
      "&gt;": ">",
    };

    return str.replace(/&[#a-z0-9]+;/gi, (entity) => {
      return htmlEntities[entity] || entity;
    });
  };

  console.log(quizzes);
  const handlePress = () => {
    navigation.navigate("../(information)/quiz");
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        {!quizzes.length ? (
          <>
            <ActivityIndicator
              animating={true}
              size={"large"}
              color={"#4CAF50"}
            />
            <Text>Getting Questions</Text>
          </>
        ) : current < quizzes.length ? (
          <>
            <View>
              <Text style={styles.questionLabel}>
                Question number {count}/{numQuestions}
              </Text>

              <Text style={styles.question}>
                {current + 1}. {decodeHtmlEntities(quizzes[current].question)}
              </Text>
            </View>
            <View>
              {answers().map((answer) => (
                <TouchableOpacity
                  key={answer}
                  onPress={() => handleAnswers(answer)}
                  style={[
                    styles.answerContainer,
                    (selectedAnswer === answer ||
                      selectedAnswers[current] === answer) &&
                      styles.selectedAnswerContainer,
                  ]}
                >
                  <Text style={styles.answerText}>{answer}</Text>
                </TouchableOpacity>
              ))}
            </View>
            <View style={styles.prenextBtn}>
              <CustomButton
                onPress={() => {
                  setCurrent((prev) => prev - 1);
                  setCount((prev) => prev - 1);
                  setSelectedAnswer(selectedAnswers[current - 1] || null);
                }}
                title="<<Previous"
                disabled={current === 0}
              />
              <CustomButton
                onPress={() => {
                  setCurrent((prev) => prev + 1);
                  setCount((prev) => prev + 1);
                  setSelectedAnswer(selectedAnswers[current + 1] || null);
                }}
                title="Next>>"
                disabled={current === quizzes.length - 1}
              />
            </View>
          </>
        ) : (
          <View style={styles.resultWrapper}>
            <View style={styles.resultContainer}>
              <AnimatedCircularProgress
                size={200}
                width={10}
                fill={(score / quizzes.length) * 100}
                tintColor="#4CAF50"
                backgroundColor="#EAEAEA"
                rotation={-90}
              >
                {() => (
                  <Text style={styles.scoreText}>
                    {score}/{quizzes.length}
                  </Text>
                )}
              </AnimatedCircularProgress>
              <Text style={styles.resultText}>Your score</Text>
              <TouchableOpacity>
                <CustomButton onPress={handlePress} title="Back to Quiz" />
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingTop: 30,
    padding: 10,
  },
  content: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
  },
  questionLabel: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  question: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  answerContainer: {
    backgroundColor: "#EAEAEA",
    paddingHorizontal: 100,
    paddingVertical: 10,
    borderRadius: 5,
    margin: 10,
    width: "100%",
    alignItems: "center",
    fontWeight: 600,
    justifyContent: "center",
  },
  selectedAnswerContainer: {
    backgroundColor: "#4CAF50",
    color: "#fff",
    marginHorizontal: 20,
    marginVertical: 10,
  },
  answerText: {
    fontSize: 16,
  },
  resultWrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  resultContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  circularProgress: {
    marginBottom: 20,
  },
  scoreText: {
    fontSize: 38,
    fontWeight: "bold",
  },
  resultText: {
    fontSize: 18,
    marginTop: 10,
  },
  prenextBtn: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 10,
    width: "100%",
    paddingHorizontal: 20,
    marginTop: 20,
  },
});
