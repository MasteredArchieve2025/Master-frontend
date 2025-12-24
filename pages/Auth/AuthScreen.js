import React, { useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Dimensions,
  TextInput,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
} from "react-native";
import Svg, { Path } from "react-native-svg";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { loginApi, signupApi } from "../Auth/Authapi";

const { width, height } = Dimensions.get("window");

export default function AuthScreen() {
  const navigation = useNavigation();
  const [mode, setMode] = useState("login");
  const slideAnim = useRef(new Animated.Value(0)).current;

  // 🔹 Form states
  const [username, setUsername] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const switchTo = (type) => {
    setMode(type);
    Animated.timing(slideAnim, {
      toValue: type === "login" ? 0 : -width * 0.35,
      duration: 400,
      useNativeDriver: true,
    }).start();
  };

  // 🔐 AUTH HANDLER
  const handleAuth = async () => {
    try {
      // 🔴 VALIDATION
      if (mode === "login") {
        if (!phone || !password) {
          return Alert.alert("Error", "Phone and password are required");
        }
      } else {
        if (!username || !phone || !email || !password) {
          return Alert.alert("Error", "All fields are required");
        }
        if (password.length < 6) {
          return Alert.alert(
            "Error",
            "Password must be at least 6 characters"
          );
        }
      }

      setLoading(true);

      if (mode === "login") {
        const res = await loginApi({
          phone: phone.trim(),
          password,
        });

        await AsyncStorage.setItem("token", res.token);
        await AsyncStorage.setItem("user", JSON.stringify(res.user));

        navigation.replace("Home");
      } else {
        await signupApi({
          username: username.trim(),
          phone: phone.trim(),
          email: email.trim(),
          password,
        });

        Alert.alert("Success", "Registration successful. Please login.");
        switchTo("login");
      }
    } catch (err) {
      console.log("AUTH ERROR 👉", err?.response?.data || err);

      const message =
        err?.response?.data?.message ||
        err?.response?.data?.error ||
        "Something went wrong";

      Alert.alert("Error", message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* 🔵 TOP WAVE */}
          <Animated.View style={{ transform: [{ translateX: slideAnim }] }}>
            <Svg width={width * 1.5} height={160} viewBox="0 0 1440 320">
              <Path
                fill="#0B66C3"
                d="M0,96L120,128C240,160,480,224,720,218.7C960,213,1200,139,1320,112L1440,96L1440,0L0,0Z"
              />
            </Svg>
          </Animated.View>

          {/* CONTENT */}
          <View style={styles.contentContainer}>
            {/* TABS */}
            <View style={styles.tabRow}>
              <TouchableOpacity onPress={() => switchTo("login")}>
                <Text
                  style={
                    mode === "login" ? styles.activeTab : styles.inactiveTab
                  }
                >
                  LOGIN
                </Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => switchTo("register")}>
                <Text
                  style={
                    mode === "register"
                      ? styles.activeTab
                      : styles.inactiveTab
                  }
                >
                  REGISTER
                </Text>
              </TouchableOpacity>
            </View>

            {/* FORM */}
            <View style={styles.formContainer}>
              <View style={styles.form}>
                {/* USERNAME – REGISTER ONLY */}
                {mode === "register" && (
                  <Input
                    icon="person-outline"
                    placeholder="User Name"
                    value={username}
                    onChangeText={setUsername}
                  />
                )}

                {/* PHONE */}
                <Input
                  icon="call-outline"
                  placeholder="Phone Number"
                  value={phone}
                  onChangeText={setPhone}
                  keyboardType="phone-pad"
                />

                {/* EMAIL – REGISTER ONLY */}
                {mode === "register" && (
                  <Input
                    icon="mail-outline"
                    placeholder="Email"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                  />
                )}

                {/* PASSWORD */}
                <Input
                  icon="lock-closed-outline"
                  placeholder="Password"
                  secure
                  value={password}
                  onChangeText={setPassword}
                />

                <TouchableOpacity
                  style={styles.button}
                  onPress={handleAuth}
                  disabled={loading}
                >
                  <Text style={styles.buttonText}>
                    {loading
                      ? "Please wait..."
                      : mode === "login"
                      ? "Login"
                      : "Register"}
                  </Text>
                </TouchableOpacity>

                {mode === "login" && (
                  <>
                    <Text
                      style={styles.link}
                      onPress={() => navigation.navigate("ForgotPassword")}
                    >
                      Forgot Password?
                    </Text>

                    <Text style={styles.bottomText}>
                      Don't you have an account?{" "}
                      <Text
                        style={styles.signup}
                        onPress={() => switchTo("register")}
                      >
                        Sign Up
                      </Text>
                    </Text>
                  </>
                )}
              </View>
            </View>
          </View>

          {/* 🔵 BOTTOM WAVE */}
          <View style={styles.bottomWave}>
            <Svg width={width} height={140} viewBox="0 0 1440 320">
              <Path
                fill="#0B66C3"
                d="M0,256L120,224C240,192,480,128,720,117.3C960,107,1200,149,1320,170.7L1440,192L1440,320L0,320Z"
              />
            </Svg>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

/* INPUT */
const Input = ({
  icon,
  placeholder,
  secure,
  value,
  onChangeText,
  keyboardType,
}) => (
  <View style={styles.inputBox}>
    <Ionicons name={icon} size={20} color="#000" />
    <TextInput
      placeholder={placeholder}
      placeholderTextColor="#aaa"
      secureTextEntry={secure}
      style={styles.input}
      value={value}
      onChangeText={onChangeText}
      keyboardType={keyboardType}
    />
  </View>
);

/* STYLES */
const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#fff" },
  scrollContainer: { flexGrow: 1, justifyContent: "space-between" },
  contentContainer: {
    flex: 1,
    justifyContent: "center",
    minHeight: height * 0.6,
  },
  formContainer: { flex: 1, justifyContent: "center", paddingHorizontal: 30 },
  tabRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 50,
    marginTop: 20,
    marginBottom: 30,
  },
  activeTab: { fontWeight: "700", color: "#0B66C3", fontSize: 16 },
  inactiveTab: { fontWeight: "600", color: "#aaa", fontSize: 16 },
  form: { width: "100%", maxWidth: 400, alignSelf: "center" },
  inputBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingHorizontal: 15,
    height: 52,
    marginBottom: 16,
    elevation: 3,
  },
  input: { flex: 1, marginLeft: 10, fontSize: 14 },
  button: {
    backgroundColor: "#0B66C3",
    height: 48,
    borderRadius: 6,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 12,
  },
  buttonText: { color: "#fff", fontSize: 16, fontWeight: "600" },
  link: { color: "#0B66C3", textAlign: "center", marginTop: 16 },
  bottomText: { textAlign: "center", marginTop: 12, fontSize: 13 },
  signup: { color: "#0B66C3", fontWeight: "600" },
  bottomWave: { marginTop: "auto" },
});
