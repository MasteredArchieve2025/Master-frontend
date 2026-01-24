// ExamDetailsFull.js
import React, { useRef, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  useWindowDimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons, MaterialIcons, FontAwesome } from "@expo/vector-icons";
import { WebView } from "react-native-webview";
import Footer from "../../src/components/Footer";

export default function ExamDetailsFull({ navigation, route }) {
  const { width } = useWindowDimensions();
  const isTablet = width >= 768;
  const isWeb = width >= 1024;

  // Sample exam data
  const examData = {
    title: "Class 12 (HSC +2) Public Exams",
    description: "Higher Secondary Certificate Public Examinations",
    board: "State Board",
    year: "2025",
    subjects: ["Mathematics", "Physics", "Chemistry", "Biology", "English", "Computer Science"],
    syllabus: [
      "Mathematics: Algebra, Calculus, Geometry, Statistics",
      "Physics: Mechanics, Thermodynamics, Electromagnetism, Optics",
      "Chemistry: Organic, Inorganic, Physical Chemistry",
      "Biology: Botany, Zoology, Genetics, Ecology",
      "English: Language & Literature",
      "Computer Science: Programming, Database, Networking"
    ],
    examPattern: {
      duration: "3 hours per subject",
      totalMarks: 600,
      passingMarks: 210,
      questionTypes: ["MCQ (20%)", "Short Answer (30%)", "Long Answer (50%)"],
      practical: "Yes (30 marks per subject)"
    },
    importantDates: [
      "Application Start: January 15, 2025",
      "Last Date: February 28, 2025",
      "Admit Card: March 15, 2025",
      "Theory Exams: March 25 - April 15, 2025",
      "Practical Exams: April 20 - 30, 2025",
      "Result Declaration: June 15, 2025"
    ]
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* ===== HEADER ===== */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>{examData.title}</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* ===== EXAM OVERVIEW ===== */}
        <View style={styles.overviewCard}>
          <View style={styles.overviewHeader}>
            <Ionicons name="school" size={40} color="#4A90E2" />
            <View style={styles.overviewTitleContainer}>
              <Text style={styles.examTitle}>{examData.title}</Text>
              <Text style={styles.examSubtitle}>{examData.description}</Text>
            </View>
          </View>
          
          <View style={styles.divider} />
          
          <View style={styles.quickStats}>
            <View style={styles.statItem}>
              <Ionicons name="business" size={20} color="#666" />
              <Text style={styles.statLabel}>Board</Text>
              <Text style={styles.statValue}>{examData.board}</Text>
            </View>
            
            <View style={styles.statItem}>
              <Ionicons name="calendar" size={20} color="#666" />
              <Text style={styles.statLabel}>Year</Text>
              <Text style={styles.statValue}>{examData.year}</Text>
            </View>
            
            <View style={styles.statItem}>
              <Ionicons name="time" size={20} color="#666" />
              <Text style={styles.statLabel}>Duration</Text>
              <Text style={styles.statValue}>{examData.examPattern.duration}</Text>
            </View>
            
            <View style={styles.statItem}>
              <MaterialIcons name="score" size={20} color="#666" />
              <Text style={styles.statLabel}>Total Marks</Text>
              <Text style={styles.statValue}>{examData.examPattern.totalMarks}</Text>
            </View>
          </View>
        </View>

        {/* ===== SUBJECTS ===== */}
        <View style={styles.sectionCard}>
          <View style={styles.sectionHeader}>
            <MaterialIcons name="subject" size={24} color="#4A90E2" />
            <Text style={styles.sectionTitle}>Subjects</Text>
          </View>
          
          <View style={styles.subjectsContainer}>
            {examData.subjects.map((subject, index) => (
              <View key={index} style={styles.subjectCard}>
                <Text style={styles.subjectName}>{subject}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* ===== SYLLABUS ===== */}
        <View style={styles.sectionCard}>
          <View style={styles.sectionHeader}>
            <Ionicons name="book" size={24} color="#4A90E2" />
            <Text style={styles.sectionTitle}>Detailed Syllabus</Text>
          </View>
          
          <View style={styles.syllabusList}>
            {examData.syllabus.map((item, index) => (
              <View key={index} style={styles.syllabusItem}>
                <View style={styles.bulletPoint} />
                <Text style={styles.syllabusText}>{item}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* ===== EXAM PATTERN ===== */}
        <View style={styles.sectionCard}>
          <View style={styles.sectionHeader}>
            <MaterialIcons name="pattern" size={24} color="#4A90E2" />
            <Text style={styles.sectionTitle}>Exam Pattern</Text>
          </View>
          
          <View style={styles.patternGrid}>
            <View style={styles.patternItem}>
              <Text style={styles.patternLabel}>Duration</Text>
              <Text style={styles.patternValue}>{examData.examPattern.duration}</Text>
            </View>
            
            <View style={styles.patternItem}>
              <Text style={styles.patternLabel}>Total Marks</Text>
              <Text style={styles.patternValue}>{examData.examPattern.totalMarks}</Text>
            </View>
            
            <View style={styles.patternItem}>
              <Text style={styles.patternLabel}>Passing Marks</Text>
              <Text style={styles.patternValue}>{examData.examPattern.passingMarks}</Text>
            </View>
            
            <View style={styles.patternItem}>
              <Text style={styles.patternLabel}>Practical Exam</Text>
              <Text style={styles.patternValue}>{examData.examPattern.practical}</Text>
            </View>
          </View>
          
          <Text style={styles.questionTypesTitle}>Question Types:</Text>
          <View style={styles.questionTypes}>
            {examData.examPattern.questionTypes.map((type, index) => (
              <View key={index} style={styles.questionTypeTag}>
                <Text style={styles.questionTypeText}>{type}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* ===== IMPORTANT DATES ===== */}
        <View style={styles.sectionCard}>
          <View style={styles.sectionHeader}>
            <Ionicons name="calendar" size={24} color="#4A90E2" />
            <Text style={styles.sectionTitle}>Important Dates</Text>
          </View>
          
          <View style={styles.datesList}>
            {examData.importantDates.map((date, index) => (
              <View key={index} style={styles.dateItem}>
                <View style={styles.dateDot} />
                <Text style={styles.dateText}>{date}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* ===== YOUTUBE VIDEO ===== */}
        <View style={styles.videoSection}>
          <View style={styles.videoHeader}>
            <Ionicons name="logo-youtube" size={24} color="#FF0000" />
            <Text style={styles.videoTitle}>Exam Preparation Video</Text>
          </View>
          
          <View style={styles.videoBox}>
            <WebView
              allowsFullscreenVideo
              javaScriptEnabled
              domStorageEnabled
              source={{
                uri: "https://www.youtube.com/embed/L2zqTYgcpfg",
              }}
              style={{
                height: isWeb ? 360 : isTablet ? 300 : 250,
                width: "100%",
              }}
            />
          </View>
          
          <Text style={styles.videoDescription}>
            Watch this detailed guide for {examData.title} preparation
          </Text>
        </View>

        <View style={{ height: 80 }} />
      </ScrollView>

      <Footer />
    </SafeAreaView>
  );
}

/* ================= STYLES ================= */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F8FF",
  },

  header: {
    backgroundColor: "#0052A2",
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  headerTitle: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "700",
    marginRight: 25,
  },

  overviewCard: {
    backgroundColor: "#fff",
    marginHorizontal: 16,
    marginTop: 20,
    borderRadius: 16,
    padding: 20,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },

  overviewHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },

  overviewTitleContainer: {
    flex: 1,
    marginLeft: 16,
  },

  examTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#003366",
    marginBottom: 4,
  },

  examSubtitle: {
    fontSize: 14,
    color: "#666",
    lineHeight: 20,
  },

  divider: {
    height: 1,
    backgroundColor: "#E0E0E0",
    marginVertical: 16,
  },

  quickStats: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },

  statItem: {
    width: "48%",
    backgroundColor: "#F8FAFF",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    alignItems: "center",
  },

  statLabel: {
    fontSize: 12,
    color: "#999",
    marginTop: 8,
    marginBottom: 4,
  },

  statValue: {
    fontSize: 16,
    fontWeight: "700",
    color: "#003366",
  },

  sectionCard: {
    backgroundColor: "#fff",
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 16,
    padding: 20,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
  },

  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#003366",
    marginLeft: 12,
  },

  subjectsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },

  subjectCard: {
    backgroundColor: "#F0F7FF",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 10,
    minWidth: "30%",
    alignItems: "center",
  },

  subjectName: {
    fontSize: 14,
    fontWeight: "600",
    color: "#4A90E2",
  },

  syllabusList: {
    marginTop: 8,
  },

  syllabusItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 12,
  },

  bulletPoint: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#4A90E2",
    marginTop: 8,
    marginRight: 12,
  },

  syllabusText: {
    flex: 1,
    fontSize: 14,
    color: "#444",
    lineHeight: 20,
  },

  patternGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
    marginBottom: 20,
  },

  patternItem: {
    width: "48%",
    backgroundColor: "#F8FAFF",
    padding: 16,
    borderRadius: 10,
  },

  patternLabel: {
    fontSize: 12,
    color: "#666",
    marginBottom: 8,
  },

  patternValue: {
    fontSize: 16,
    fontWeight: "700",
    color: "#003366",
  },

  questionTypesTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#003366",
    marginBottom: 12,
  },

  questionTypes: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },

  questionTypeTag: {
    backgroundColor: "#E8F4FF",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },

  questionTypeText: {
    fontSize: 13,
    color: "#4A90E2",
    fontWeight: "500",
  },

  datesList: {
    marginTop: 8,
  },

  dateItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },

  dateDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#4A90E2",
    marginRight: 12,
  },

  dateText: {
    flex: 1,
    fontSize: 14,
    color: "#444",
    lineHeight: 20,
  },

  videoSection: {
    marginHorizontal: 16,
    marginTop: 30,
    marginBottom: 20,
  },

  videoHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },

  videoTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#333",
    marginLeft: 8,
  },

  videoBox: {
    borderRadius: 12,
    overflow: "hidden",
    backgroundColor: "#000",
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },

  videoDescription: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
    marginTop: 12,
    fontStyle: "italic",
  },
});