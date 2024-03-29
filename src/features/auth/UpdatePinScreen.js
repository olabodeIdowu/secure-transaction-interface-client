import { useState } from "react";
import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  ActivityIndicator,
} from "react-native";
import axios from "axios";

export default function UpdatePinScreen({ navigation }) {
  const [isLoading, setIsLoading] = useState(false);
  const [currentPin, setCurrentPin] = useState("");
  const [pin, setPin] = useState("");
  const [confirmPin, setConfirmPin] = useState("");

  async function handleUpdatePin() {
    try {
      setIsLoading(true);
      // console.log(email, process.env.DEV_API_URL);
      const response = await axios({
        method: "post",
        url: `${process.env.DEV_API_URL}/users/update-pin`,
        data: {
          currentPin: currentPin,
          pin: pin,
          confirmPin: confirmPin,
        },
        headers: {
          "Content-Type": "application/json",
        },
      });
      setIsLoading(false);
      if (!response) throw new Error("response not found");
      // console.log(response);
      navigation.navigate("Login");
    } catch (error) {
      setIsLoading(false);
      // console.log(error);
      Alert.alert("Error", error.message, [{ text: "OK" }]);
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.nav}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Home");
          }}
        >
          <Text style={styles.backText}>&larr;</Text>
        </TouchableOpacity>

        <Text style={styles.skipText}>Update pin</Text>
      </View>
      <View>
        <Text style={styles.welcomeText}>
          Your new pin must be different from prevous used pins
        </Text>

        <View>
          <TextInput
            style={styles.input}
            placeholder="current pin"
            onChangeText={(text) => setCurrentPin(text)}
            value={currentPin}
          />

          <TextInput
            style={styles.input}
            onChangeText={(text) => setPin(text)}
            value={pin}
            placeholder="pin"
          />

          <TextInput
            style={styles.input}
            onChangeText={(text) => setConfirmPin(text)}
            value={confirmPin}
            placeholder="confirm pin"
          />
        </View>

        <TouchableOpacity
          style={styles.button}
          onPress={handleUpdatePin}
          activeOpacity={0.4}
        >
          {isLoading ? (
            <View style={styles.horizontal}>
              <ActivityIndicator />
            </View>
          ) : (
            <Text style={styles.buttonText}>Done</Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
  },

  welcomeImage: {
    marginBottom: 50,
    width: 300,
    height: 300,
    borderRadius: 50,
    marginLeft: "auto",
    marginRight: "auto",
  },

  nav: {
    flex: 0.1,
    alignItems: "center",
    justifyContent: "left",
    gap: 80,
    flexDirection: "row",
    padding: 3.2,
    marginTop: 30,
    marginBottom: 40,
    padding: 20,
  },

  backText: {
    fontSize: 36,
    color: "#ffffff",
  },

  skipText: {
    fontSize: 16,
    margin: 10,
    textAlign: "right",
    color: "#ffffff",
  },
  updateText: {
    padding: 10,
    textAlign: "center",
    justifyContent: "center",
    fontSize: 22,
    color: "#ffffff",
  },
  welcomeText: {
    textAlign: "center",
    justifyContent: "center",
    fontSize: 16,
    color: "#ffffff",
    padding: 15,
  },
  input: {
    width: "90%",
    marginTop: 10,
    marginBottom: 10,
    marginLeft: "auto",
    marginRight: "auto",
    backgroundColor: "#D9D9D9",
    borderRadius: 6,
    fontSize: 16,
    padding: 12,
  },
  button: {
    width: "90%",
    alignItems: "center",
    backgroundColor: "#F8B930",
    padding: 15,
    marginLeft: "auto",
    marginRight: "auto",
    color: "#ffffff",
    borderRadius: 8,
    marginTop: 20,
  },
  buttonText: {
    fontSize: 20,
  },
  horizontal: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
  },
});
