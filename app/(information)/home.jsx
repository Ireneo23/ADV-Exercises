import React, { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet, ActivityIndicator } from "react-native";
import { db } from "../../config/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import { useRoute } from "@react-navigation/native";

const Home = () => {
  const route = useRoute();
  const { email: inputEmail } = route.params || {}; // Destructure email from route params
  const [imageURL, setImageURL] = useState("");
  const [userEmail, setUserEmail] = useState(inputEmail || ""); // Use inputEmail
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfileImage = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "profile"));
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          setImageURL(data.imageURL);
          if (!inputEmail) setUserEmail(data.email); // Update only if inputEmail is not provided
        });
      } catch (error) {
        console.error("Error fetching profile data: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfileImage();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Welcome Po!!!</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#ff6600" />
      ) : (
        <>
          {imageURL ? (
            <Image source={{ uri: imageURL }} style={styles.image} />
          ) : (
            <Image
              source={require("../../assets/images/shocked.png")}
              style={styles.image}
            />
          )}
          <Text style={styles.userInfo}>Email: {userEmail}</Text>
        </>
      )}
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  header: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333333",
  },
  image: {
    width: 250,
    height: 250,
    borderRadius: 125,
    borderWidth: 2,
    borderColor: "#ff6600",
    resizeMode: "cover",
    marginBottom: 20,
  },
  userInfo: {
    fontSize: 18,
    color: "#333333",
    marginTop: 10,
  },
});
