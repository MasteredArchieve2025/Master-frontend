import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  SafeAreaView,
  Platform,
  StatusBar,
} from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import Svg, { Polygon } from "react-native-svg";
import Footer from "../../src/components/Footer";
import { useNavigation } from "@react-navigation/native";

export default function Exam1() {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" backgroundColor="#0052A2" />

      {/* Header */}
      <View style={styles.headerWrapper}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backBtn}
            onPress={() => navigation.goBack()}
          >
            <Ionicons
              name={Platform.OS === "ios" ? "chevron-back" : "arrow-back"}
              size={24}
              color="#fff"
            />
          </TouchableOpacity>

          <Text style={styles.headerTitle}>Exams</Text>

          {/* Spacer for perfect center */}
          <View style={styles.rightSpace} />
        </View>
      </View>

      {/* Main Content */}
      <View style={styles.mainContent}>
        <ScrollView
          style={styles.scrollContainer}
          contentContainerStyle={{ paddingBottom: 100 }}
          showsVerticalScrollIndicator
        >
          {/* Motivation Card */}
          <View style={styles.motivationCard}>
            <Image
              source={require("../../assets/file.png")}
              style={styles.motivationImage}
            />
            <View style={{ flex: 1 }}>
              <Text style={styles.motivationTitle}>
                Believe you can, and you’re halfway there
              </Text>
              <Text style={styles.motivationDesc}>
                Believe in yourself, stay consistent, and take one step at a
                time. Every minute you spend preparing brings you closer to
                success.
              </Text>
              <Text style={styles.motivationFooter}>✅ You’ve got this</Text>
            </View>
          </View>

          {/* Exam Cards */}
          {[
            {
              title: "School Board Exams",
              desc: "School Board Exams are major public exams conducted at the end of Class 10 and 12.",
            },
            {
              title: "Government Recruitment Exams",
              desc: "Government exams are major public exams conducted after Class 10 and 12.",
            },
            {
              title: "Higher Education Exams",
              desc: "Exams for higher education after Class 12 across India.",
            },
            {
              title: "Professional Entrance Exams",
              desc: "Entrance exams for professional courses after Class 12.",
            },
          ].map((exam, index) => (
            <View key={index} style={styles.examCard}>
              <View style={{ flex: 1 }}>
                <Text style={styles.examTitle}>{exam.title}</Text>
                <Text style={styles.examDesc}>{exam.desc}</Text>
              </View>

              {/* Details Button */}
              <View style={styles.detailsSection}>
                <MaterialCommunityIcons
                  name="file-document-outline"
                  size={32}
                  color="#004aad"
                />
                <TouchableOpacity
                  activeOpacity={0.8}
                  style={styles.btnWrapper}
                  onPress={() => navigation.navigate("Exam2")}
                >
                  <View style={styles.slantedBtn}>
                    <Svg width={110} height={34} style={StyleSheet.absoluteFill}>
                      <Polygon
                        points="18,0 110,0 110,34 0,34"
                        fill="#004aad"
                      />
                    </Svg>
                    <Text style={styles.slantedBtnText}>Details</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </ScrollView>
      </View>

      {/* Footer */}
      <Footer />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#fff",
  },

  /* Header */
  headerWrapper: {
    backgroundColor: "#0052A2",
  },

  header: {
    height: Platform.OS === "ios" ? 52 : 64,
    backgroundColor: "#0052A2",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: Platform.OS === "ios" ? 6 : 8,
  },

  backBtn: {
    width: 40,
    justifyContent: "center",
    alignItems: "flex-start",
  },

  headerTitle: {
    flex: 1,
    textAlign: "center",
    fontSize: Platform.OS === "ios" ? 17 : 18,
    fontWeight: Platform.OS === "ios" ? "600" : "700",
    color: "#fff",
  },

  rightSpace: {
    width: 40,
  },

  mainContent: {
    flex: 1,
    backgroundColor: "#fff",
  },

  scrollContainer: {
    paddingHorizontal: 16,
  },

  /* Motivation Card */
  motivationCard: {
    flexDirection: "row",
    backgroundColor: "#e6f0ff",
    borderRadius: 12,
    padding: 12,
    marginVertical: 12,
    alignItems: "center",
  },

  motivationImage: {
    width: 150,
    height: 170,
    marginRight: 10,
  },

  motivationTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#004aad",
    marginBottom: 4,
  },

  motivationDesc: {
    fontSize: 12,
    color: "#555",
    marginBottom: 6,
  },

  motivationFooter: {
    fontSize: 10,
    color: "#000",
  },

  /* Exam Cards */
  examCard: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 12,
    elevation: 3,
    padding: 12,
    marginBottom: 12,
    borderColor: "#ddd",
    borderWidth: 1,
  },

  examTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#004aad",
    marginBottom: 4,
  },

  examDesc: {
    fontSize: 12,
    color: "#333",
    marginBottom: 8,
  },

  detailsSection: {
    alignItems: "flex-end",
    justifyContent: "flex-start",
    marginLeft: 8,
    marginTop: 4,
  },

  btnWrapper: {
    marginTop: 12,
  },

  slantedBtn: {
    width: 110,
    height: 34,
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
  },

  slantedBtnText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 12,
  },
});
