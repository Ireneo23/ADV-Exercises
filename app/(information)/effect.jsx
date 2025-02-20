import { useEffect, useState } from "react";
import { View, Text, Button, StyleSheet } from "react-native";

export default function Effect() {
  const [time, setTime] = useState(0);
  const [start, setStart] = useState(false);

  useEffect(() => {
    let interval = null;
    if (start) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 10);
      }, 10);
    }
    return () => {
      clearInterval(interval);
    };
  }, [start]);

  function handleStart() {
    setStart(!start);
  }

  function handleReset() {
    setStart(false);
    setTime(0);
  }

  const formatTime = (time) => {
    const milliseconds = `0${(time % 1000) / 10}`.slice(-2);
    const seconds = `0${Math.floor((time / 1000) % 60)}`.slice(-2);
    const minutes = `0${Math.floor((time / 60000) % 60)}`.slice(-2);
    return `${minutes}:${seconds}:${milliseconds}`;
  };

  return (
    <View style={{ padding: 20, gap: 16 }}>
      <Text style={styles.time}>{formatTime(time)}</Text>
      <Button onPress={handleReset} title="Reset" />
      <Button onPress={handleStart} title={`${!start ? "Start" : "Pause"}`} />
    </View>
  );
}

const styles = StyleSheet.create({
  time: {
    fontSize: 100,
    fontWeight: "600",
  },
});
