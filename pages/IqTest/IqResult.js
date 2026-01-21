// IqResult.js
import React, { useEffect, useState } from "react";
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
  Share,
  Alert,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";

const { width, height } = Dimensions.get("window");
const isTablet = width >= 768;
const isSmallDevice = width < 375;

export default function IqResult({ navigation, route }) {
  const { score, totalQuestions, answers, questions, timeTaken } = route.params;
  const [iqScore, setIqScore] = useState(0);
  const [performance, setPerformance] = useState("");
  const [categoryScores, setCategoryScores] = useState({});

  const totalScore = totalQuestions * 2; // Each question worth 2 points
  const percentage = (score / totalScore) * 100;
  const correctAnswers = score / 2;
  
  // Calculate IQ based on percentile (simplified calculation)
  useEffect(() => {
    // Simulate IQ calculation based on performance
    const calculatedIQ = Math.floor(85 + (percentage / 100) * 40); // IQ between 85-125
    
    setIqScore(calculatedIQ);
    
    // Determine performance level
    if (percentage >= 90) setPerformance("Exceptional");
    else if (percentage >= 75) setPerformance("Excellent");
    else if (percentage >= 60) setPerformance("Above Average");
    else if (percentage >= 40) setPerformance("Average");
    else setPerformance("Below Average");
    
    // Calculate category-wise scores
    const categories = {
      numerical: { correct: 0, total: 0 },
      verbal: { correct: 0, total: 0 },
      logical: { correct: 0, total: 0 },
      spatial: { correct: 0, total: 0 },
    };
    
    questions.forEach((q, index) => {
      categories[q.type].total++;
      if (answers[index] === q.correctAnswer) {
        categories[q.type].correct++;
      }
    });
    
    setCategoryScores(categories);
  }, []);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleShare = async () => {
    try {
      await Share.share({
        message: `I scored ${score}/${totalScore} (${iqScore} IQ) on the IQ Test! Can you beat my score?`,
      });
    } catch (error) {
      Alert.alert("Error", "Unable to share results");
    }
  };

  const handleRetake = () => {
    Alert.alert(
      "Retake Test",
      "Are you sure you want to retake the test?",
      [
        { text: "Cancel", style: "cancel" },
        { 
          text: "Retake", 
          onPress: () => navigation.replace("Iq2")
        }
      ]
    );
  };

  const getPerformanceColor = () => {
    switch(performance) {
      case "Exceptional": return "#4CAF50";
      case "Excellent": return "#2196F3";
      case "Above Average": return "#00BCD4";
      case "Average": return "#FF9800";
      case "Below Average": return "#F44336";
      default: return "#0072BC";
    }
  };

  // Circular progress component
  const CircularProgress = ({ progress, size = 120, thickness = 10 }) => {
    const radius = (size - thickness) / 2;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (progress / 100) * circumference;

    return (
      <View style={{ width: size, height: size, position: 'relative', alignItems: 'center', justifyContent: 'center' }}>
        {/* Background circle */}
        <View style={{
          position: 'absolute',
          width: size,
          height: size,
          borderRadius: size / 2,
          backgroundColor: '#e9ecef',
        }} />
        
        {/* Progress circle */}
        <View style={{
          position: 'absolute',
          width: size,
          height: size,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <View style={{
            width: size - thickness,
            height: size - thickness,
            borderRadius: (size - thickness) / 2,
            borderWidth: thickness,
            borderColor: '#0072BC',
            borderLeftColor: '#e9ecef',
            borderTopColor: '#e9ecef',
            borderRightColor: '#0072BC',
            borderBottomColor: '#0072BC',
            transform: [{ rotate: `${(progress / 100) * 360}deg` }],
          }} />
        </View>
        
        {/* Percentage text */}
        <Text style={styles.progressText}>{Math.round(progress)}%</Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" backgroundColor="#0052A2" />

      {/* Header */}
      <View style={styles.headerWrapper}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backBtn}
            onPress={() => navigation.navigate("Iq1")}
          >
            <Ionicons
              name={Platform.OS === "ios" ? "chevron-back" : "arrow-back"}
              size={isTablet ? 28 : 24}
              color="#fff"
            />
          </TouchableOpacity>

          <Text style={styles.headerTitle}>Test Results</Text>

          <TouchableOpacity style={styles.shareBtn} onPress={handleShare}>
            <Ionicons name="share-outline" size={isTablet ? 26 : 22} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Main Content */}
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        {/* IQ Score Card */}
        <LinearGradient
          colors={["#0072BC", "#0052A2"]}
          style={styles.iqCard}
        >
          <Text style={styles.iqLabel}>Your IQ Score</Text>
          <Text style={styles.iqScore}>{iqScore}</Text>
          <View style={styles.performanceBadge}>
            <Text style={[styles.performanceText, { color: getPerformanceColor() }]}>
              {performance}
            </Text>
          </View>
          <Text style={styles.iqDescription}>
            Based on your performance across {totalQuestions} questions
          </Text>
        </LinearGradient>

        {/* Score Breakdown */}
        <View style={styles.scoreCard}>
          <Text style={styles.scoreCardTitle}>Score Breakdown</Text>
          
          <View style={styles.scoreRow}>
            <View style={styles.scoreItem}>
              <Text style={styles.scoreValue}>{score}/{totalScore}</Text>
              <Text style={styles.scoreLabel}>Total Score</Text>
            </View>
            
            <View style={styles.scoreDivider} />
            
            <View style={styles.scoreItem}>
              <Text style={styles.scoreValue}>{correctAnswers}/{totalQuestions}</Text>
              <Text style={styles.scoreLabel}>Correct Answers</Text>
            </View>
            
            <View style={styles.scoreDivider} />
            
            <View style={styles.scoreItem}>
              <Text style={styles.scoreValue}>{formatTime(timeTaken)}</Text>
              <Text style={styles.scoreLabel}>Time Taken</Text>
            </View>
          </View>

          {/* Progress Circle */}
          <View style={styles.progressContainer}>
            <CircularProgress 
              progress={percentage} 
              size={isTablet ? 150 : 120}
              thickness={isTablet ? 12 : 10}
            />
            <Text style={styles.progressLabel}>Accuracy</Text>
          </View>
        </View>

        {/* Category Performance */}
        <View style={styles.categoryCard}>
          <Text style={styles.categoryCardTitle}>Category Performance</Text>
          
          {Object.entries(categoryScores).map(([category, data]) => {
            const catPercentage = data.total > 0 ? (data.correct / data.total) * 100 : 0;
            return (
              <View key={category} style={styles.categoryRow}>
                <View style={styles.categoryInfo}>
                  <Text style={styles.categoryName}>
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </Text>
                  <Text style={styles.categoryStats}>
                    {data.correct}/{data.total} correct
                  </Text>
                </View>
                
                <View style={styles.categoryProgress}>
                  <View style={styles.progressBar}>
                    <View 
                      style={[
                        styles.progressFill,
                        { width: `${catPercentage}%` }
                      ]} 
                    />
                  </View>
                  <Text style={styles.categoryPercent}>
                    {Math.round(catPercentage)}%
                  </Text>
                </View>
              </View>
            );
          })}
        </View>

        {/* Detailed Analysis */}
        <View style={styles.analysisCard}>
          <Text style={styles.analysisCardTitle}>Detailed Analysis</Text>
          
          <View style={styles.analysisRow}>
            <Ionicons name="checkmark-circle" size={isTablet ? 24 : 20} color="#4CAF50" />
            <Text style={styles.analysisText}>
              You answered <Text style={styles.highlight}>{correctAnswers}</Text> questions correctly
            </Text>
          </View>
          
          <View style={styles.analysisRow}>
            <Ionicons name="time-outline" size={isTablet ? 24 : 20} color="#FF9800" />
            <Text style={styles.analysisText}>
              Average time per question: <Text style={styles.highlight}>
                {Math.round(timeTaken / totalQuestions)} seconds
              </Text>
            </Text>
          </View>
          
          <View style={styles.analysisRow}>
            <Ionicons name="trophy-outline" size={isTablet ? 24 : 20} color="#FFC107" />
            <Text style={styles.analysisText}>
              Your performance is <Text style={styles.highlight}>{performance}</Text> compared to average
            </Text>
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionButtons}>
          <TouchableOpacity
            style={styles.retakeButton}
            onPress={handleRetake}
          >
            <LinearGradient
              colors={["#FF416C", "#FF4B2B"]}
              style={styles.retakeButtonGradient}
            >
              <Ionicons name="refresh" size={isTablet ? 24 : 20} color="#fff" />
              <Text style={styles.retakeButtonText}>Retake Test</Text>
            </LinearGradient>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={styles.homeButton}
            onPress={() => navigation.navigate("Iq1")}
          >
            <Ionicons name="home-outline" size={isTablet ? 24 : 20} color="#0072BC" />
            <Text style={styles.homeButtonText}>Back to Tests</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
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
    height: Platform.OS === "ios" ? (isTablet ? 70 : 60) : (isTablet ? 80 : 70),
    backgroundColor: "#0052A2",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: isTablet ? 20 : 16,
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
  shareBtn: {
    width: isTablet ? 50 : 40,
    justifyContent: "center",
    alignItems: "flex-end",
  },
  container: {
    paddingTop: isTablet ? 30 : 20,
    paddingBottom: 40,
    paddingHorizontal: isTablet ? 24 : 16,
    backgroundColor: "#f5f7fa",
  },
  iqCard: {
    borderRadius: isTablet ? 20 : 16,
    padding: isTablet ? 40 : 30,
    alignItems: "center",
    marginBottom: isTablet ? 30 : 20,
    ...Platform.select({
      ios: {
        shadowColor: "#0072BC",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 12,
      },
      android: {
        elevation: 10,
      },
    }),
  },
  iqLabel: {
    fontSize: isTablet ? 22 : 18,
    color: "rgba(255, 255, 255, 0.9)",
    marginBottom: isTablet ? 8 : 6,
  },
  iqScore: {
    fontSize: isTablet ? 72 : 60,
    fontWeight: "800",
    color: "#fff",
    marginBottom: isTablet ? 16 : 12,
  },
  performanceBadge: {
    backgroundColor: "#fff",
    paddingHorizontal: isTablet ? 24 : 20,
    paddingVertical: isTablet ? 10 : 8,
    borderRadius: isTablet ? 20 : 16,
    marginBottom: isTablet ? 20 : 16,
  },
  performanceText: {
    fontSize: isTablet ? 20 : 18,
    fontWeight: "800",
  },
  iqDescription: {
    fontSize: isTablet ? 18 : 16,
    color: "rgba(255, 255, 255, 0.9)",
    textAlign: "center",
  },
  scoreCard: {
    backgroundColor: "#fff",
    borderRadius: isTablet ? 20 : 16,
    padding: isTablet ? 28 : 20,
    marginBottom: isTablet ? 24 : 20,
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
  scoreCardTitle: {
    fontSize: isTablet ? 22 : 20,
    fontWeight: "700",
    color: "#003366",
    marginBottom: isTablet ? 24 : 20,
    textAlign: "center",
  },
  scoreRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginBottom: isTablet ? 28 : 24,
  },
  scoreItem: {
    alignItems: "center",
    flex: 1,
  },
  scoreValue: {
    fontSize: isTablet ? 28 : 24,
    fontWeight: "800",
    color: "#0072BC",
    marginBottom: 4,
  },
  scoreLabel: {
    fontSize: isTablet ? 16 : 14,
    color: "#666",
    textAlign: "center",
  },
  scoreDivider: {
    width: 1,
    height: "80%",
    backgroundColor: "#e9ecef",
  },
  progressContainer: {
    alignItems: "center",
  },
  progressText: {
    fontSize: isTablet ? 28 : 24,
    fontWeight: "800",
    color: "#0072BC",
  },
  progressLabel: {
    fontSize: isTablet ? 18 : 16,
    color: "#666",
    marginTop: isTablet ? 12 : 10,
  },
  categoryCard: {
    backgroundColor: "#fff",
    borderRadius: isTablet ? 20 : 16,
    padding: isTablet ? 28 : 20,
    marginBottom: isTablet ? 24 : 20,
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
  categoryCardTitle: {
    fontSize: isTablet ? 22 : 20,
    fontWeight: "700",
    color: "#003366",
    marginBottom: isTablet ? 24 : 20,
  },
  categoryRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: isTablet ? 20 : 16,
  },
  categoryInfo: {
    flex: 1,
  },
  categoryName: {
    fontSize: isTablet ? 18 : 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 4,
  },
  categoryStats: {
    fontSize: isTablet ? 14 : 12,
    color: "#888",
  },
  categoryProgress: {
    flexDirection: "row",
    alignItems: "center",
    width: isTablet ? 180 : 140,
  },
  progressBar: {
    flex: 1,
    height: isTablet ? 12 : 8,
    backgroundColor: "#e9ecef",
    borderRadius: isTablet ? 6 : 4,
    overflow: "hidden",
    marginRight: isTablet ? 16 : 12,
  },
  progressFill: {
    height: "100%",
    backgroundColor: "#0072BC",
    borderRadius: isTablet ? 6 : 4,
  },
  categoryPercent: {
    fontSize: isTablet ? 16 : 14,
    fontWeight: "700",
    color: "#0072BC",
    minWidth: isTablet ? 40 : 35,
  },
  analysisCard: {
    backgroundColor: "#fff",
    borderRadius: isTablet ? 20 : 16,
    padding: isTablet ? 28 : 20,
    marginBottom: isTablet ? 24 : 20,
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
  analysisCardTitle: {
    fontSize: isTablet ? 22 : 20,
    fontWeight: "700",
    color: "#003366",
    marginBottom: isTablet ? 24 : 20,
  },
  analysisRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: isTablet ? 16 : 14,
  },
  analysisText: {
    flex: 1,
    fontSize: isTablet ? 18 : 16,
    color: "#333",
    marginLeft: isTablet ? 16 : 12,
  },
  highlight: {
    fontWeight: "700",
    color: "#0072BC",
  },
  actionButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: isTablet ? 20 : 12,
  },
  retakeButton: {
    flex: 1,
    borderRadius: isTablet ? 16 : 12,
    overflow: "hidden",
  },
  retakeButtonGradient: {
    paddingVertical: isTablet ? 18 : 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  retakeButtonText: {
    fontSize: isTablet ? 18 : 16,
    fontWeight: "700",
    color: "#fff",
    marginLeft: isTablet ? 12 : 8,
  },
  homeButton: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: isTablet ? 16 : 12,
    paddingVertical: isTablet ? 18 : 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "#0072BC",
  },
  homeButtonText: {
    fontSize: isTablet ? 18 : 16,
    fontWeight: "700",
    color: "#0072BC",
    marginLeft: isTablet ? 12 : 8,
  },
});