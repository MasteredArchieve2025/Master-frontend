import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ScrollView,
  Platform,
  StatusBar,
  SafeAreaView,
  Modal,
  Alert,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import Footer from "../../src/components/Footer";

const { width, height } = Dimensions.get("window");
const isTablet = width >= 768;
const isSmallDevice = width < 375;

export default function Iq2({ navigation }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [timeLeft, setTimeLeft] = useState(45 * 60); // 45 minutes in seconds
  const [testStarted, setTestStarted] = useState(false);
  const [timerActive, setTimerActive] = useState(false);

  // Timer countdown
  useEffect(() => {
    let interval;
    if (timerActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
    } else if (timeLeft === 0 && timerActive) {
      Alert.alert("Time's Up!", "Your test time has expired.");
      setTimerActive(false);
    }
    return () => clearInterval(interval);
  }, [timerActive, timeLeft]);

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    if (hours > 0) {
      return `${hours.toString().padStart(2, "0")}:${minutes
        .toString()
        .padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
    }
    return `${minutes.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  const startTest = () => {
    setModalVisible(false); // Hide the modal first
    setTimeout(() => {
      setTestStarted(true);
      setTimerActive(true);
      navigation.navigate("Iq3"); // Navigate to actual test questions page
    }, 300); // Small delay for smooth transition
  };

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" backgroundColor="#0052A2" />

      {/* Header */}
      <View style={styles.headerWrapper}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backBtn}
            onPress={() => {
              if (testStarted) {
                Alert.alert(
                  "Exit Test?",
                  "If you exit now, your progress will not be saved.",
                  [
                    { text: "Cancel", style: "cancel" },
                    { text: "Exit", onPress: () => navigation.goBack() },
                  ]
                );
              } else {
                navigation.goBack();
              }
            }}
          >
            <Ionicons
              name={Platform.OS === "ios" ? "chevron-back" : "arrow-back"}
              size={isTablet ? 28 : 24}
              color="#fff"
            />
          </TouchableOpacity>

          <Text style={styles.headerTitle}>IQ Test</Text>

          <View style={styles.rightSpace} />
        </View>
      </View>

      {/* Main Content */}
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        {/* Test Instructions Card */}
        <View style={styles.instructionsCard}>
          <LinearGradient
            colors={["#0072BC", "#0052A2"]}
            style={styles.cardHeader}
          >
            <Text style={styles.cardHeaderTitle}>Test Instructions</Text>
          </LinearGradient>

          <View style={styles.cardBody}>
            <Text style={styles.instructionsIntro}>
              Please read the following instructions carefully before starting
              the IQ assessment. This test is designed to evaluate your logical
              reasoning and problem-solving skills.
            </Text>

            {/* Info Cards */}
            <View style={styles.infoGrid}>
              <View style={styles.infoCard}>
                <View style={styles.infoIconContainer}>
                  <Ionicons
                    name="document-text-outline"
                    size={isTablet ? 30 : 24}
                    color="#0072BC"
                  />
                </View>
                <Text style={styles.infoTitle}>Number of Questions</Text>
                <Text style={styles.infoValue}>30</Text>
                <Text style={styles.infoLabel}>questions</Text>
              </View>

              <View style={styles.infoCard}>
                <View style={styles.infoIconContainer}>
                  <Ionicons
                    name="time-outline"
                    size={isTablet ? 30 : 24}
                    color="#0072BC"
                  />
                </View>
                <Text style={styles.infoTitle}>Time Limit</Text>
                <Text style={styles.infoValue}>45</Text>
                <Text style={styles.infoLabel}>minutes</Text>
              </View>

              <View style={styles.infoCard}>
                <View style={styles.infoIconContainer}>
                  <Ionicons
                    name="checkmark-circle-outline"
                    size={isTablet ? 30 : 24}
                    color="#0072BC"
                  />
                </View>
                <Text style={styles.infoTitle}>Marking Scheme</Text>
                <Text style={styles.infoValue}>+2</Text>
                <Text style={styles.infoLabel}>per correct answer</Text>
              </View>

              <View style={styles.infoCard}>
                <View style={styles.infoIconContainer}>
                  <Ionicons
                    name="close-circle-outline"
                    size={isTablet ? 30 : 24}
                    color="#0072BC"
                  />
                </View>
                <Text style={styles.infoTitle}>Negative Marking</Text>
                <Text style={styles.infoValue}>No</Text>
                <Text style={styles.infoLabel}>wrong answers</Text>
              </View>
            </View>

            {/* Key Points */}
            <View style={styles.keyPointsContainer}>
              <Text style={styles.keyPointsTitle}>Key Points:</Text>

              <View style={styles.pointRow}>
                <View style={styles.pointBullet}>
                  <Ionicons name="ellipse" size={8} color="#0072BC" />
                </View>
                <Text style={styles.pointText}>
                  The test consists of{" "}
                  <Text style={styles.highlight}>30 questions</Text>
                </Text>
              </View>

              <View style={styles.pointRow}>
                <View style={styles.pointBullet}>
                  <Ionicons name="ellipse" size={8} color="#0072BC" />
                </View>
                <Text style={styles.pointText}>
                  You have <Text style={styles.highlight}>45 minutes</Text> to
                  complete
                </Text>
              </View>

              <View style={styles.pointRow}>
                <View style={styles.pointBullet}>
                  <Ionicons name="ellipse" size={8} color="#0072BC" />
                </View>
                <Text style={styles.pointText}>
                  Each correct answer awards{" "}
                  <Text style={styles.highlight}>2 points</Text>
                </Text>
              </View>

              <View style={styles.pointRow}>
                <View style={styles.pointBullet}>
                  <Ionicons name="ellipse" size={8} color="#0072BC" />
                </View>
                <Text style={styles.pointText}>
                  <Text style={styles.highlight}>No negative marking</Text> for
                  wrong answers
                </Text>
              </View>

              <View style={styles.pointRow}>
                <View style={styles.pointBullet}>
                  <Ionicons name="ellipse" size={8} color="#0072BC" />
                </View>
                <Text style={styles.pointText}>
                  <Text style={styles.highlight}>Answer all questions</Text> for
                  accurate scoring
                </Text>
              </View>
            </View>

            {/* Timer Display (if test started) */}
            {testStarted && (
              <View style={styles.timerContainer}>
                <View style={styles.timerInner}>
                  <Ionicons
                    name="timer-outline"
                    size={isTablet ? 28 : 22}
                    color="#fff"
                  />
                  <Text style={styles.timerText}>{formatTime(timeLeft)}</Text>
                  <Text style={styles.timerLabel}>Time Remaining</Text>
                </View>
              </View>
            )}

            {/* Start Button */}
            <TouchableOpacity
              style={styles.startButton}
              onPress={() => setModalVisible(true)}
              activeOpacity={0.8}
            >
              <LinearGradient
                colors={["#FF416C", "#FF4B2B"]}
                style={styles.startButtonGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
              >
                <Text style={styles.startButtonText}>Start Test →</Text>
              </LinearGradient>
            </TouchableOpacity>

            {/* Note */}
            <Text style={styles.noteText}>
              Make sure you have a stable internet connection and won't be
              interrupted during the test.
            </Text>
          </View>
        </View>

        {/* Progress Section */}
        <View style={styles.progressContainer}>
          <View style={styles.progressHeader}>
            <Text style={styles.progressTitle}>Test Progress</Text>
            <Text style={styles.progressPercent}>0%</Text>
          </View>
          <View style={styles.progressBar}>
            <View style={styles.progressFill} />
          </View>
          <Text style={styles.progressText}>0 of 30 questions answered</Text>
        </View>
      </ScrollView>

      {/* Confirmation Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <LinearGradient
              colors={["#0072BC", "#0052A2"]}
              style={styles.modalHeader}
            >
              <Text style={styles.modalTitle}>Ready to Begin?</Text>
              <TouchableOpacity
                style={styles.modalClose}
                onPress={() => setModalVisible(false)}
              >
                <Ionicons name="close" size={24} color="#fff" />
              </TouchableOpacity>
            </LinearGradient>

            <View style={styles.modalBody}>
              <View style={styles.modalIcon}>
                <Ionicons
                  name="help-circle"
                  size={isTablet ? 70 : 60}
                  color="#0072BC"
                />
              </View>

              <Text style={styles.modalMessage}>
                Once you start, the timer will begin counting down from 45
                minutes. Are you ready to begin the test?
              </Text>

              <View style={styles.modalButtons}>
                <TouchableOpacity
                  style={styles.cancelButton}
                  onPress={() => setModalVisible(false)}
                >
                  <Text style={styles.cancelButtonText}>Cancel</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.confirmButton}
                  onPress={startTest}
                >
                  <LinearGradient
                    colors={["#00B09B", "#96C93D"]}
                    style={styles.confirmButtonGradient}
                  >
                    <Text style={styles.confirmButtonText}>
                      Yes, Start Test
                    </Text>
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </Modal>

      <Footer />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#f5f7fa",
  },
  headerWrapper: {
    backgroundColor: "#0052A2",
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  header: {
    height: Platform.OS === "ios" ? (isTablet ? 60 : 52) : isTablet ? 70 : 64,
    backgroundColor: "#0052A2",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: isTablet ? 24 : 16,
    paddingVertical: Platform.OS === "ios" ? 6 : 8,
  },
  backBtn: {
    width: isTablet ? 50 : 40,
    justifyContent: "center",
    alignItems: "flex-start",
  },
  headerTitle: {
    flex: 1,
    textAlign: "center",
    fontSize: isTablet ? 22 : Platform.OS === "ios" ? 17 : 18,
    fontWeight: Platform.OS === "ios" ? "600" : "700",
    color: "#fff",
  },
  rightSpace: {
    width: isTablet ? 50 : 40,
  },
  container: {
    paddingTop: isTablet ? 30 : 20,
    paddingBottom: 30,
    paddingHorizontal: isTablet ? 24 : 16,
    backgroundColor: "#f5f7fa",
    minHeight: height - (Platform.OS === "ios" ? 88 : 144),
  },
  instructionsCard: {
    backgroundColor: "#fff",
    borderRadius: isTablet ? 20 : 16,
    overflow: "hidden",
    marginBottom: 20,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 12,
      },
      android: {
        elevation: 8,
      },
    }),
  },
  cardHeader: {
    paddingVertical: isTablet ? 22 : 18,
    paddingHorizontal: isTablet ? 24 : 20,
  },
  cardHeaderTitle: {
    fontSize: isTablet ? 24 : 20,
    fontWeight: "800",
    color: "#fff",
    textAlign: "center",
  },
  cardBody: {
    padding: isTablet ? 28 : 20,
  },
  instructionsIntro: {
    fontSize: isTablet ? 18 : 16,
    lineHeight: isTablet ? 26 : 22,
    color: "#333",
    marginBottom: isTablet ? 28 : 20,
    textAlign: "center",
  },
  infoGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: isTablet ? 28 : 20,
  },
  infoCard: {
    width: isTablet ? "23%" : "48%",
    backgroundColor: "#f8f9fa",
    borderRadius: isTablet ? 16 : 12,
    padding: isTablet ? 20 : 16,
    marginBottom: isTablet ? 0 : 12,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#e9ecef",
  },
  infoIconContainer: {
    width: isTablet ? 60 : 48,
    height: isTablet ? 60 : 48,
    borderRadius: isTablet ? 30 : 24,
    backgroundColor: "#e6f2ff",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: isTablet ? 16 : 12,
  },
  infoTitle: {
    fontSize: isTablet ? 16 : 14,
    color: "#666",
    textAlign: "center",
    marginBottom: 4,
  },
  infoValue: {
    fontSize: isTablet ? 28 : 24,
    fontWeight: "800",
    color: "#0072BC",
    marginBottom: 2,
  },
  infoLabel: {
    fontSize: isTablet ? 14 : 12,
    color: "#888",
    textAlign: "center",
  },
  keyPointsContainer: {
    backgroundColor: "#f0f7ff",
    borderRadius: isTablet ? 16 : 12,
    padding: isTablet ? 24 : 18,
    marginBottom: isTablet ? 28 : 20,
    borderLeftWidth: 4,
    borderLeftColor: "#0072BC",
  },
  keyPointsTitle: {
    fontSize: isTablet ? 20 : 18,
    fontWeight: "700",
    color: "#003366",
    marginBottom: isTablet ? 16 : 12,
  },
  pointRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: isTablet ? 12 : 8,
  },
  pointBullet: {
    width: isTablet ? 24 : 20,
    paddingTop: isTablet ? 6 : 4,
    alignItems: "center",
  },
  pointText: {
    flex: 1,
    fontSize: isTablet ? 18 : 16,
    lineHeight: isTablet ? 24 : 22,
    color: "#333",
  },
  highlight: {
    fontWeight: "700",
    color: "#0052A2",
  },
  timerContainer: {
    backgroundColor: "#0052A2",
    borderRadius: isTablet ? 16 : 12,
    padding: isTablet ? 24 : 18,
    marginBottom: isTablet ? 28 : 20,
    alignItems: "center",
  },
  timerInner: {
    alignItems: "center",
  },
  timerText: {
    fontSize: isTablet ? 42 : 36,
    fontWeight: "800",
    color: "#fff",
    marginVertical: isTablet ? 8 : 4,
    fontVariant: ["tabular-nums"],
  },
  timerLabel: {
    fontSize: isTablet ? 18 : 16,
    color: "rgba(255, 255, 255, 0.9)",
  },
  startButton: {
    borderRadius: isTablet ? 20 : 16,
    overflow: "hidden",
    marginBottom: isTablet ? 20 : 16,
  },
  startButtonGradient: {
    paddingVertical: isTablet ? 22 : 18,
    alignItems: "center",
  },
  startButtonText: {
    fontSize: isTablet ? 22 : 18,
    fontWeight: "800",
    color: "#fff",
  },
  noteText: {
    fontSize: isTablet ? 16 : 14,
    color: "#666",
    textAlign: "center",
    fontStyle: "italic",
    lineHeight: isTablet ? 22 : 18,
  },
  progressContainer: {
    backgroundColor: "#fff",
    borderRadius: isTablet ? 20 : 16,
    padding: isTablet ? 28 : 20,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  progressHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: isTablet ? 16 : 12,
  },
  progressTitle: {
    fontSize: isTablet ? 20 : 16,
    fontWeight: "700",
    color: "#003366",
  },
  progressPercent: {
    fontSize: isTablet ? 20 : 16,
    fontWeight: "800",
    color: "#0072BC",
  },
  progressBar: {
    height: isTablet ? 12 : 8,
    backgroundColor: "#e9ecef",
    borderRadius: isTablet ? 6 : 4,
    overflow: "hidden",
    marginBottom: isTablet ? 12 : 8,
  },
  progressFill: {
    height: "100%",
    width: "0%",
    backgroundColor: "#0072BC",
    borderRadius: isTablet ? 6 : 4,
  },
  progressText: {
    fontSize: isTablet ? 16 : 14,
    color: "#666",
    textAlign: "center",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
    padding: isTablet ? 40 : 20,
  },
  modalContent: {
    width: "100%",
    maxWidth: isTablet ? 500 : 400,
    backgroundColor: "#fff",
    borderRadius: isTablet ? 20 : 16,
    overflow: "hidden",
  },
  modalHeader: {
    paddingVertical: isTablet ? 22 : 18,
    paddingHorizontal: isTablet ? 24 : 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  modalTitle: {
    fontSize: isTablet ? 22 : 18,
    fontWeight: "800",
    color: "#fff",
  },
  modalClose: {
    padding: 4,
  },
  modalBody: {
    padding: isTablet ? 28 : 20,
  },
  modalIcon: {
    alignItems: "center",
    marginBottom: isTablet ? 24 : 20,
  },
  modalMessage: {
    fontSize: isTablet ? 18 : 16,
    lineHeight: isTablet ? 24 : 22,
    color: "#333",
    textAlign: "center",
    marginBottom: isTablet ? 28 : 24,
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: isTablet ? 20 : 12,
  },
  cancelButton: {
    flex: 1,
    paddingVertical: isTablet ? 18 : 14,
    backgroundColor: "#f8f9fa",
    borderRadius: isTablet ? 16 : 12,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#dee2e6",
  },
  cancelButtonText: {
    fontSize: isTablet ? 18 : 16,
    fontWeight: "600",
    color: "#666",
  },
  confirmButton: {
    flex: 1,
    borderRadius: isTablet ? 16 : 12,
    overflow: "hidden",
  },
  confirmButtonGradient: {
    paddingVertical: isTablet ? 18 : 14,
    alignItems: "center",
  },
  confirmButtonText: {
    fontSize: isTablet ? 18 : 16,
    fontWeight: "700",
    color: "#fff",
  },
});
