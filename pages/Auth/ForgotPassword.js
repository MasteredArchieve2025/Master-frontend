import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
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
import { forgotPasswordApi } from "../Auth/Authapi";

const { width } = Dimensions.get("window");

export default function ForgotPassword() {
  const navigation = useNavigation();

  const [phone, setPhone] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleResetPassword = async () => {
    // 🔴 VALIDATION
    if (!phone || !newPassword || !confirmPassword) {
      return Alert.alert("Error", "All fields are required");
    }

    if (newPassword.length < 6) {
      return Alert.alert(
        "Error",
        "Password must be at least 6 characters"
      );
    }

    if (newPassword !== confirmPassword) {
      return Alert.alert("Error", "Passwords do not match");
    }

    try {
      setLoading(true);

      const res = await forgotPasswordApi({
        phone: phone.trim(),
        newPassword,
        confirmPassword,
      });

      Alert.alert("Success", res.message || "Password reset successful");
      navigation.replace("Auth");
    } catch (err) {
      console.log("FORGOT PASSWORD ERROR 👉", err?.response?.data || err);

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
          <Svg width={width * 1.5} height={160} viewBox="0 0 1440 320">
            <Path
              fill="#0B66C3"
              d="M0,96L120,128C240,160,480,224,720,218.7C960,213,1200,139,1320,112L1440,96L1440,0L0,0Z"
            />
          </Svg>

          {/* CONTENT */}
          <View style={styles.content}>
            <Text style={styles.title}>Forgot Password?</Text>
            <Text style={styles.subtitle}>
              Don’t worry, reset your password below
            </Text>

            <View style={styles.form}>
              <Input
                icon="call-outline"
                placeholder="Phone Number"
                value={phone}
                onChangeText={setPhone}
                keyboardType="phone-pad"
              />

              <Input
                icon="lock-closed-outline"
                placeholder="New Password"
                secure
                value={newPassword}
                onChangeText={setNewPassword}
              />

              <Input
                icon="lock-closed-outline"
                placeholder="Confirm Password"
                secure
                value={confirmPassword}
                onChangeText={setConfirmPassword}
              />

              <TouchableOpacity
                style={styles.button}
                onPress={handleResetPassword}
                disabled={loading}
              >
                <Text style={styles.buttonText}>
                  {loading ? "Please wait..." : "Reset Password"}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.backRow}
                onPress={() => navigation.goBack()}
              >
                <Ionicons name="arrow-back" size={18} color="#0B66C3" />
                <Text style={styles.backText}>Back to Login</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* 🔵 BOTTOM WAVE */}
          <View style={{ marginTop: "auto" }}>
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

  content: {
    flex: 1,
    paddingHorizontal: 30,
    paddingTop: 40,
  },

  title: {
    fontSize: 22,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 6,
  },

  subtitle: {
    fontSize: 14,
    color: "#777",
    textAlign: "center",
    marginBottom: 30,
  },

  form: {
    width: "100%",
    maxWidth: 400,
    alignSelf: "center",
  },

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
    marginTop: 14,
  },

  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },

  backRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 18,
  },

  backText: {
    marginLeft: 6,
    color: "#0B66C3",
    fontSize: 14,
    fontWeight: "600",
  },
});
