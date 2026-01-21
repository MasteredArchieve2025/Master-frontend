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
  Alert,
  Modal,
  ActivityIndicator,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";

const { width, height } = Dimensions.get("window");
const isTablet = width >= 768;
const isSmallDevice = width < 375;

// Sample questions data
const SAMPLE_QUESTIONS = [
  {
    id: 1,
    question: "Complete the sequence: 2, 4, 8, 16, ?",
    options: ["24", "32", "28", "20"],
    correctAnswer: 1,
    type: "numerical",
    difficulty: "medium",
  },
  {
    id: 2,
    question: "Which word does NOT belong with the others?",
    options: ["Apple", "Banana", "Carrot", "Orange"],
    correctAnswer: 2,
    type: "verbal",
    difficulty: "easy",
  },
  // ... (keep all 30 questions from previous code)
];

export default function Iq3({ navigation, route }) {
  const [currentQuestion, setCurrentQuestion] = useState(1); // Start from question 2 as per image
  const [answers, setAnswers] = useState(Array(SAMPLE_QUESTIONS.length).fill(null));
  const [timeLeft, setTimeLeft] = useState(44 * 60 + 17); // 44:17 as per image
  const [testCompleted, setTestCompleted] = useState(false);
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [visitedQuestions, setVisitedQuestions] = useState([0, 1]); // Questions 1 and 2 visited

  // Timer effect
  useEffect(() => {
    let interval;
    if (timeLeft > 0 && !testCompleted) {
      interval = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
    } else if (timeLeft === 0 && !testCompleted) {
      handleAutoSubmit();
    }
    return () => clearInterval(interval);
  }, [timeLeft, testCompleted]);

  // Update selected option when question changes
  useEffect(() => {
    setSelectedOption(answers[currentQuestion]);
  }, [currentQuestion, answers]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleAnswerSelect = (optionIndex) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = optionIndex;
    setAnswers(newAnswers);
    setSelectedOption(optionIndex);
  };

  const handleNextQuestion = () => {
    if (currentQuestion < SAMPLE_QUESTIONS.length - 1) {
      const nextQuestion = currentQuestion + 1;
      setCurrentQuestion(nextQuestion);
      if (!visitedQuestions.includes(nextQuestion)) {
        setVisitedQuestions([...visitedQuestions, nextQuestion]);
      }
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestion > 0) {
      const prevQuestion = currentQuestion - 1;
      setCurrentQuestion(prevQuestion);
      if (!visitedQuestions.includes(prevQuestion)) {
        setVisitedQuestions([...visitedQuestions, prevQuestion]);
      }
    }
  };

  const handleQuestionSelect = (index) => {
    setCurrentQuestion(index);
    if (!visitedQuestions.includes(index)) {
      setVisitedQuestions([...visitedQuestions, index]);
    }
  };

  const calculateScore = () => {
    let score = 0;
    answers.forEach((answer, index) => {
      if (answer === SAMPLE_QUESTIONS[index].correctAnswer) {
        score += 2;
      }
    });
    return score;
  };

  const handleAutoSubmit = () => {
    Alert.alert(
      "Time's Up!",
      "Your test time has expired. Submitting your answers...",
      [
        {
          text: "OK",
          onPress: () => {
            setLoading(true);
            setTimeout(() => {
              const score = calculateScore();
              setLoading(false);
              navigation.navigate("IqResult", {
                score: score,
                totalQuestions: SAMPLE_QUESTIONS.length,
                answers: answers,
                questions: SAMPLE_QUESTIONS,
                timeTaken: 45 * 60 - timeLeft,
              });
            }, 1500);
          }
        }
      ]
    );
  };

  const handleSubmitTest = () => {
    const answeredCount = answers.filter(answer => answer !== null).length;
    const unansweredCount = SAMPLE_QUESTIONS.length - answeredCount;

    if (unansweredCount > 0) {
      Alert.alert(
        "Unanswered Questions",
        `You have ${unansweredCount} unanswered question${unansweredCount > 1 ? 's' : ''}. Are you sure you want to submit?`,
        [
          { text: "Continue Test", style: "cancel" },
          { 
            text: "Submit Anyway", 
            onPress: () => setShowSubmitModal(true) 
          }
        ]
      );
    } else {
      setShowSubmitModal(true);
    }
  };

  const confirmSubmit = () => {
    setLoading(true);
    setShowSubmitModal(false);
    
    setTimeout(() => {
      const score = calculateScore();
      setLoading(false);
      setTestCompleted(true);
      
      navigation.navigate("IqResult", {
        score: score,
        totalQuestions: SAMPLE_QUESTIONS.length,
        answers: answers,
        questions: SAMPLE_QUESTIONS,
        timeTaken: 45 * 60 - timeLeft,
      });
    }, 2000);
  };

  const getProgressPercentage = () => {
    return Math.round((currentQuestion + 1) / SAMPLE_QUESTIONS.length * 100);
  };

  const getAnsweredCount = () => {
    return answers.filter(answer => answer !== null).length;
  };

  const currentQuestionData = SAMPLE_QUESTIONS[currentQuestion];

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" backgroundColor="#0052A2" />

      {/* Header */}
      <View style={styles.headerWrapper}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backBtn}
            onPress={() => {
              Alert.alert(
                "Exit Test?",
                "Are you sure you want to exit? Your progress will be lost.",
                [
                  { text: "Cancel", style: "cancel" },
                  { 
                    text: "Exit", 
                    style: "destructive",
                    onPress: () => navigation.goBack()
                  }
                ]
              );
            }}
          >
            <Ionicons
              name={Platform.OS === "ios" ? "chevron-back" : "arrow-back"}
              size={isTablet ? 28 : 24}
              color="#fff"
            />
            <Text style={styles.backText}>Back</Text>
          </TouchableOpacity>

          <View style={styles.headerCenter}>
            <Text style={styles.headerTitle}>IQ Test</Text>
            <Text style={styles.headerSubtitle}>
              Question {currentQuestion + 1} of {SAMPLE_QUESTIONS.length}
            </Text>
          </View>

          <View style={styles.timerContainer}>
            <Ionicons name="timer-outline" size={isTablet ? 20 : 18} color="#fff" />
            <Text style={styles.timerText}>{formatTime(timeLeft)}</Text>
          </View>
        </View>
      </View>

      {/* Main Content - Fixed layout */}
      <View style={styles.container}>
        {/* Progress Section - At the top */}
        <View style={styles.progressSection}>
          <View style={styles.progressStats}>
            <Text style={styles.progressText}>
              {getAnsweredCount()} of {SAMPLE_QUESTIONS.length} answered
            </Text>
            <Text style={styles.progressPercent}>{getProgressPercentage()}%</Text>
          </View>
          <View style={styles.progressBar}>
            <LinearGradient
              colors={["#00C9FF", "#0072BC"]}
              style={[styles.progressFill, { width: `${getProgressPercentage()}%` }]}
            />
          </View>
        </View>

        {/* Question Card - Main content area */}
        <ScrollView 
          style={styles.mainContent}
          contentContainerStyle={styles.mainContentContainer}
          showsVerticalScrollIndicator={false}
        >
          {/* Question Header with Badge */}
          <View style={styles.questionHeader}>
            <View style={styles.questionBadge}>
              <LinearGradient
                colors={["#FF416C", "#FF4B2B"]}
                style={styles.questionBadgeGradient}
              >
                <Text style={styles.questionBadgeText}>Q{currentQuestion + 1}</Text>
              </LinearGradient>
              <View style={[
                styles.difficultyBadge,
                currentQuestionData.difficulty === 'easy' && styles.difficultyEasy,
                currentQuestionData.difficulty === 'medium' && styles.difficultyMedium,
                currentQuestionData.difficulty === 'hard' && styles.difficultyHard,
              ]}>
                <Text style={styles.difficultyText}>
                  {currentQuestionData.difficulty.toUpperCase()}
                </Text>
              </View>
            </View>
          </View>

          {/* Question Text */}
          <View style={styles.questionCard}>
            <Text style={styles.questionText}>
              {currentQuestionData.question}
            </Text>
            {currentQuestionData.type === "spatial" && (
              <View style={styles.spatialContainer}>
                <View style={styles.spatialPlaceholder}>
                  <Ionicons name="cube-outline" size={isTablet ? 80 : 60} color="#0072BC" />
                  <Text style={styles.spatialText}>Spatial Reasoning Question</Text>
                </View>
              </View>
            )}
          </View>

          {/* Options List */}
          <View style={styles.optionsContainer}>
            {currentQuestionData.options.map((option, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.optionItem,
                  selectedOption === index && styles.optionItemSelected,
                ]}
                onPress={() => handleAnswerSelect(index)}
                activeOpacity={0.7}
              >
                <View style={styles.optionLeft}>
                  <View style={styles.optionLetter}>
                    <Text style={[
                      styles.optionLetterText,
                      selectedOption === index && styles.optionLetterTextSelected
                    ]}>
                      {String.fromCharCode(65 + index)}
                    </Text>
                  </View>
                  <Text style={[
                    styles.optionText,
                    selectedOption === index && styles.optionTextSelected
                  ]}>
                    {option}
                  </Text>
                </View>
                {selectedOption === index && (
                  <View style={styles.optionCheck}>
                    <Ionicons name="checkmark-circle" size={24} color="#00B09B" />
                  </View>
                )}
              </TouchableOpacity>
            ))}
          </View>

          {/* Navigation Buttons - Now properly positioned */}
          <View style={styles.navigationButtons}>
            <TouchableOpacity
              style={[
                styles.navButton,
                styles.prevButton,
                currentQuestion === 0 && styles.navButtonDisabled
              ]}
              onPress={handlePreviousQuestion}
              disabled={currentQuestion === 0}
            >
              <Ionicons name="chevron-back" size={20} color="#0072BC" />
              <Text style={styles.prevButtonText}>Previous</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.navButton,
                styles.nextButton,
                currentQuestion === SAMPLE_QUESTIONS.length - 1 && styles.submitButton
              ]}
              onPress={
                currentQuestion === SAMPLE_QUESTIONS.length - 1 
                  ? handleSubmitTest 
                  : handleNextQuestion
              }
            >
              <Text style={styles.nextButtonText}>
                {currentQuestion === SAMPLE_QUESTIONS.length - 1 ? 'Submit Test' : 'Next Question'}
              </Text>
              {currentQuestion !== SAMPLE_QUESTIONS.length - 1 && (
                <Ionicons name="chevron-forward" size={20} color="#fff" />
              )}
            </TouchableOpacity>
          </View>
        </ScrollView>

        {/* Question Palette - Fixed at bottom but not overlapping */}
        <View style={styles.paletteSection}>
          <Text style={styles.paletteTitle}>Question Palette</Text>
          
          {/* Grid of questions */}
          <View style={styles.paletteGrid}>
            {SAMPLE_QUESTIONS.slice(0, 10).map((_, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.paletteButton,
                  index === currentQuestion && styles.paletteButtonCurrent,
                  answers[index] !== null && styles.paletteButtonAnswered,
                  visitedQuestions.includes(index) && styles.paletteButtonVisited,
                ]}
                onPress={() => handleQuestionSelect(index)}
              >
                <Text style={[
                  styles.paletteButtonText,
                  index === currentQuestion && styles.paletteButtonTextCurrent,
                  answers[index] !== null && styles.paletteButtonTextAnswered,
                ]}>
                  {index + 1}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          
          <View style={styles.paletteGrid}>
            {SAMPLE_QUESTIONS.slice(10, 20).map((_, index) => (
              <TouchableOpacity
                key={index + 10}
                style={[
                  styles.paletteButton,
                  (index + 10) === currentQuestion && styles.paletteButtonCurrent,
                  answers[index + 10] !== null && styles.paletteButtonAnswered,
                  visitedQuestions.includes(index + 10) && styles.paletteButtonVisited,
                ]}
                onPress={() => handleQuestionSelect(index + 10)}
              >
                <Text style={[
                  styles.paletteButtonText,
                  (index + 10) === currentQuestion && styles.paletteButtonTextCurrent,
                  answers[index + 10] !== null && styles.paletteButtonTextAnswered,
                ]}>
                  {index + 11}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          
          <View style={styles.paletteGrid}>
            {SAMPLE_QUESTIONS.slice(20, 30).map((_, index) => (
              <TouchableOpacity
                key={index + 20}
                style={[
                  styles.paletteButton,
                  (index + 20) === currentQuestion && styles.paletteButtonCurrent,
                  answers[index + 20] !== null && styles.paletteButtonAnswered,
                  visitedQuestions.includes(index + 20) && styles.paletteButtonVisited,
                ]}
                onPress={() => handleQuestionSelect(index + 20)}
              >
                <Text style={[
                  styles.paletteButtonText,
                  (index + 20) === currentQuestion && styles.paletteButtonTextCurrent,
                  answers[index + 20] !== null && styles.paletteButtonTextAnswered,
                ]}>
                  {index + 21}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Legend */}
          <View style={styles.paletteLegend}>
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, styles.legendCurrent]} />
              <Text style={styles.legendText}>Current</Text>
            </View>
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, styles.legendAnswered]} />
              <Text style={styles.legendText}>Answered</Text>
            </View>
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, styles.legendVisited]} />
              <Text style={styles.legendText}>Visited</Text>
            </View>
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, styles.legendUnvisited]} />
              <Text style={styles.legendText}>Not Visited</Text>
            </View>
          </View>
        </View>
      </View>

      {/* Loading Modal */}
      <Modal
        transparent={true}
        visible={loading}
        animationType="fade"
      >
        <View style={styles.loadingModal}>
          <View style={styles.loadingContent}>
            <ActivityIndicator size={isTablet ? 60 : 40} color="#0072BC" />
            <Text style={styles.loadingText}>Processing your results...</Text>
          </View>
        </View>
      </Modal>

      {/* Submit Confirmation Modal */}
      <Modal
        transparent={true}
        visible={showSubmitModal}
        animationType="slide"
        onRequestClose={() => setShowSubmitModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <LinearGradient
              colors={["#0072BC", "#0052A2"]}
              style={styles.modalHeader}
            >
              <Text style={styles.modalTitle}>Submit Test</Text>
              <TouchableOpacity
                style={styles.modalClose}
                onPress={() => setShowSubmitModal(false)}
              >
                <Ionicons name="close" size={24} color="#fff" />
              </TouchableOpacity>
            </LinearGradient>

            <View style={styles.modalBody}>
              <View style={styles.modalIcon}>
                <Ionicons name="checkmark-circle" size={60} color="#4CAF50" />
              </View>

              <Text style={styles.modalMessage}>
                Are you sure you want to submit your test?
              </Text>

              <View style={styles.modalStats}>
                <View style={styles.statItem}>
                  <Text style={styles.statValue}>{getAnsweredCount()}</Text>
                  <Text style={styles.statLabel}>Answered</Text>
                </View>
                <View style={styles.statDivider} />
                <View style={styles.statItem}>
                  <Text style={styles.statValue}>
                    {SAMPLE_QUESTIONS.length - getAnsweredCount()}
                  </Text>
                  <Text style={styles.statLabel}>Unanswered</Text>
                </View>
                <View style={styles.statDivider} />
                <View style={styles.statItem}>
                  <Text style={styles.statValue}>
                    {formatTime(45 * 60 - timeLeft)}
                  </Text>
                  <Text style={styles.statLabel}>Time Taken</Text>
                </View>
              </View>

              <View style={styles.modalButtons}>
                <TouchableOpacity
                  style={styles.cancelButton}
                  onPress={() => setShowSubmitModal(false)}
                >
                  <Text style={styles.cancelButtonText}>Cancel</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.confirmButton}
                  onPress={confirmSubmit}
                >
                  <LinearGradient
                    colors={["#00B09B", "#96C93D"]}
                    style={styles.confirmButtonGradient}
                  >
                    <Text style={styles.confirmButtonText}>Submit Test</Text>
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </Modal>
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
    height: Platform.OS === "ios" ? 60 : 70,
    backgroundColor: "#0052A2",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: Platform.OS === "ios" ? 6 : 8,
  },
  backBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    minWidth: 60,
  },
  backText: {
    fontSize: 16,
    color: "#fff",
    marginLeft: 4,
  },
  headerCenter: {
    flex: 1,
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#fff",
    marginBottom: 2,
  },
  headerSubtitle: {
    fontSize: 14,
    color: "rgba(255, 255, 255, 0.9)",
  },
  timerContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    minWidth: 80,
    justifyContent: "center",
  },
  timerText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#fff",
    marginLeft: 6,
    fontVariant: ['tabular-nums'],
  },
  container: {
    flex: 1,
    backgroundColor: "#f5f7fa",
  },
  progressSection: {
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#e9ecef",
  },
  progressStats: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  progressText: {
    fontSize: 14,
    color: "#666",
  },
  progressPercent: {
    fontSize: 16,
    fontWeight: "700",
    color: "#0072BC",
  },
  progressBar: {
    height: 6,
    backgroundColor: "#e9ecef",
    borderRadius: 3,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    borderRadius: 3,
  },
  mainContent: {
    flex: 1,
  },
  mainContentContainer: {
    padding: 16,
    paddingBottom: 20,
  },
  questionHeader: {
    marginBottom: 16,
  },
  questionBadge: {
    flexDirection: "row",
    alignItems: "center",
  },
  questionBadgeGradient: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 16,
    marginRight: 12,
  },
  questionBadgeText: {
    fontSize: 16,
    fontWeight: "800",
    color: "#fff",
  },
  difficultyBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    borderWidth: 1,
  },
  difficultyEasy: {
    backgroundColor: "#f0fff4",
    borderColor: "#48bb78",
  },
  difficultyMedium: {
    backgroundColor: "#fffaf0",
    borderColor: "#ed8936",
  },
  difficultyHard: {
    backgroundColor: "#fff5f5",
    borderColor: "#f56565",
  },
  difficultyText: {
    fontSize: 12,
    fontWeight: "700",
  },
  questionCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
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
  questionText: {
    fontSize: 18,
    lineHeight: 26,
    color: "#003366",
    fontWeight: "600",
  },
  spatialContainer: {
    marginTop: 20,
    alignItems: "center",
  },
  spatialPlaceholder: {
    backgroundColor: "#f8f9fa",
    padding: 30,
    borderRadius: 12,
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#e9ecef",
    borderStyle: "dashed",
    width: "100%",
  },
  spatialText: {
    marginTop: 12,
    fontSize: 16,
    color: "#666",
    textAlign: "center",
  },
  optionsContainer: {
    marginBottom: 24,
  },
  optionItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: "#e9ecef",
  },
  optionItemSelected: {
    borderColor: "#0072BC",
    backgroundColor: "#f0f7ff",
  },
  optionLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  optionLetter: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#f8f9fa",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
    borderWidth: 2,
    borderColor: "#e9ecef",
  },
  optionLetterSelected: {
    backgroundColor: "#0072BC",
    borderColor: "#0072BC",
  },
  optionLetterText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#666",
  },
  optionLetterTextSelected: {
    color: "#0072BC",
  },
  optionText: {
    flex: 1,
    fontSize: 16,
    lineHeight: 22,
    color: "#333",
  },
  optionTextSelected: {
    color: "#0052A2",
    fontWeight: "600",
  },
  optionCheck: {
    marginLeft: 12,
  },
  navigationButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
    marginBottom: 16,
  },
  navButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderRadius: 12,
    minWidth: 140,
  },
  prevButton: {
    backgroundColor: "#fff",
    borderWidth: 2,
    borderColor: "#0072BC",
  },
  nextButton: {
    backgroundColor: "#0072BC",
  },
  submitButton: {
    backgroundColor: "#FF416C",
  },
  navButtonDisabled: {
    opacity: 0.5,
  },
  prevButtonText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#0072BC",
    marginLeft: 8,
  },
  nextButtonText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#fff",
    marginRight: 8,
  },
  paletteSection: {
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#e9ecef",
    padding: 16,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 8,
      },
    }),
  },
  paletteTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#003366",
    marginBottom: 12,
  },
  paletteGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    marginBottom: 8,
  },
  paletteButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#f8f9fa",
    justifyContent: "center",
    alignItems: "center",
    margin: 4,
    borderWidth: 1,
    borderColor: "#e9ecef",
  },
  paletteButtonCurrent: {
    backgroundColor: "#0072BC",
    borderColor: "#0072BC",
  },
  paletteButtonAnswered: {
    backgroundColor: "#00B09B",
    borderColor: "#00B09B",
  },
  paletteButtonVisited: {
    backgroundColor: "#e6f2ff",
    borderColor: "#0072BC",
  },
  paletteButtonText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#666",
  },
  paletteButtonTextCurrent: {
    color: "#fff",
  },
  paletteButtonTextAnswered: {
    color: "#fff",
  },
  paletteLegend: {
    flexDirection: "row",
    justifyContent: "space-around",
    flexWrap: "wrap",
    marginTop: 12,
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 16,
    marginBottom: 4,
  },
  legendDot: {
    width: 16,
    height: 16,
    borderRadius: 8,
    marginRight: 6,
    borderWidth: 1,
  },
  legendCurrent: {
    backgroundColor: "#0072BC",
    borderColor: "#0072BC",
  },
  legendAnswered: {
    backgroundColor: "#00B09B",
    borderColor: "#00B09B",
  },
  legendVisited: {
    backgroundColor: "#e6f2ff",
    borderColor: "#0072BC",
  },
  legendUnvisited: {
    backgroundColor: "#f8f9fa",
    borderColor: "#e9ecef",
  },
  legendText: {
    fontSize: 12,
    color: "#666",
  },
  loadingModal: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    justifyContent: "center",
    alignItems: "center",
  },
  loadingContent: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 30,
    alignItems: "center",
    width: 250,
  },
  loadingText: {
    marginTop: 20,
    fontSize: 16,
    color: "#333",
    textAlign: "center",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  modalContent: {
    width: "100%",
    maxWidth: 400,
    backgroundColor: "#fff",
    borderRadius: 16,
    overflow: "hidden",
  },
  modalHeader: {
    paddingVertical: 18,
    paddingHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: "#fff",
  },
  modalClose: {
    padding: 4,
  },
  modalBody: {
    padding: 20,
  },
  modalIcon: {
    alignItems: "center",
    marginBottom: 20,
  },
  modalMessage: {
    fontSize: 16,
    lineHeight: 22,
    color: "#333",
    textAlign: "center",
    marginBottom: 24,
    fontWeight: "600",
  },
  modalStats: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#f8f9fa",
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
  },
  statItem: {
    alignItems: "center",
  },
  statValue: {
    fontSize: 20,
    fontWeight: "800",
    color: "#0072BC",
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: "#666",
  },
  statDivider: {
    width: 1,
    backgroundColor: "#dee2e6",
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
  },
  cancelButton: {
    flex: 1,
    paddingVertical: 14,
    backgroundColor: "#f8f9fa",
    borderRadius: 12,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#dee2e6",
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#666",
  },
  confirmButton: {
    flex: 1,
    borderRadius: 12,
    overflow: "hidden",
  },
  confirmButtonGradient: {
    paddingVertical: 14,
    alignItems: "center",
  },
  confirmButtonText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#fff",
  },
});