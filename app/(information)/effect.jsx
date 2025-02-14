import { useEffect, useState } from "react";
import { View, Text, Button, StyleSheet } from "react-native";

export default function Effect() {
  const [time, setTime] = useState(0);
  const [start, setStart] = useState(false);

  useEffect(() => {
    let interval = null;
    if (start) {
      interval = setInterval(() => {
        setTime(time + 1);
      }, 1000);
    }
    return () => {
      clearInterval(interval);
    };
  }, [start, time]);

  function handleStart() {
    setStart(!start);
  }

  function handleReset() {
    setStart(false);
    setTime(0);
  }

  return (
    <View style={{ padding: 20, gap: 16 }}>
      <Text style={styles.time}>00:00:0{time}</Text>
      <Button onPress={handleReset} title="Reset" />
      <Button onPress={handleStart} title={`${!start ? "Start" : "Pause"}`} />
    </View>
  );
}

const styles = StyleSheet.create({
  time: {
    fontSize: 100,
    fontWeight: 600,
  },
});
