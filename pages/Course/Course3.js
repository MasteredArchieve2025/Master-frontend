import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  SafeAreaView,
  Platform,
  Dimensions,
  StatusBar,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import Footer from "../../src/components/Footer";
const { width } = Dimensions.get("window");
const isTablet = width >= 768;

const logo = require("../../assets/AKlogo.png");

const coursesData = [
  {
    id: 1,
    provider: "AK Technologies",
    logo,
    offered: [
      { name: "Web Development", mode: "Online" },
      { name: "Full Stack Development", mode: "Online" },
      { name: "Python", mode: "Offline" },
      { name: "Data Science", mode: "Online & Offline" },
    ],
    mode: "Online & Offline",
    website: "www.ak.com",
  },
  {
    id: 2,
    provider: "AK Technologies",
    logo,
    offered: [
      { name: "UI/UX Design", mode: "Offline" },
      { name: "Digital Marketing", mode: "Offline" },
      { name: "Cloud Computing", mode: "Online" },
    ],
    mode: "Online & Offline",
    website: "www.ak.com",
  },
  {
    id: 3,
    provider: "AK Technologies",
    logo,
    offered: [
      { name: "Cybersecurity", mode: "Online" },
      { name: "Networking", mode: "Offline" },
      { name: "Python Programming", mode: "Online" },
    ],
    mode: "Online & Offline",
    website: "www.ak.com",
  },
];

export default function Course3({ route }) {
  const navigation = useNavigation();
  const { title } = route.params || {};
  const [selectedMode, setSelectedMode] = useState("All");

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" backgroundColor="#0052A2" />

      {/* ---------- HEADER ---------- */}
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

          <Text style={styles.headerTitle}>Course Information</Text>

          <View style={styles.rightSpace} />
        </View>
      </View>

      {/* ---------- BODY ---------- */}
      <ScrollView
        style={styles.container}
        contentContainerStyle={{ paddingBottom: 30 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Mode Tabs */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.tabs}
        >
          {["All", "Offline", "Online"].map((t) => (
            <TouchableOpacity
              key={t}
              onPress={() => setSelectedMode(t)}
              style={styles.tab}
            >
              <Text
                style={[
                  styles.tabText,
                  selectedMode === t && styles.activeTabText,
                ]}
              >
                {t}
              </Text>
              {selectedMode === t && <View style={styles.underline} />}
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Courses List */}
        {coursesData.map((course) => {
          const displayedCourses = course.offered.filter((off) =>
            selectedMode === "All"
              ? true
              : off.mode.toLowerCase().includes(selectedMode.toLowerCase())
          );

          return (
            <View key={course.id} style={styles.courseBlock}>
              <View style={styles.logoCard}>
                <Image source={course.logo} style={styles.logo} />
              </View>

              <View style={styles.courseInfo}>
                <Text style={styles.provider}>{course.provider}</Text>

                <Text style={styles.offeredLine}>
                  <Text style={{ fontWeight: "700" }}>Courses Offered: </Text>
                  {displayedCourses.map((c) => c.name).join(", ")}
                </Text>

                <Text style={styles.mode}>
                  <Text style={{ fontWeight: "700" }}>Mode: </Text>
                  {selectedMode === "All" ? course.mode : selectedMode}
                </Text>

                <Text style={styles.website}>
                  <Text style={{ fontWeight: "700" }}>Website: </Text>
                  {course.website}
                </Text>

                <View style={styles.footer}>
                  <Text style={styles.footerItem}>📄 Certificate</Text>
                  <Text style={styles.footerItem}>🛠 Technical Training</Text>
                  <TouchableOpacity
                    style={styles.moreButton}
                    onPress={() =>
                      navigation.navigate("Course4", { course })
                    }
                  >
                    <Text style={styles.moreText}>More</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          );
        })}
      </ScrollView>
      <Footer/>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#fff" },

  headerWrapper: { backgroundColor: "#0052A2" },
  header: {
    height: Platform.OS === "ios" ? 52 : 64,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
  },
  backBtn: { width: 40, justifyContent: "center" },
  headerTitle: {
    flex: 1,
    textAlign: "center",
    fontSize: Platform.OS === "ios" ? 17 : 18,
    fontWeight: Platform.OS === "ios" ? "600" : "700",
    color: "#fff",
  },
  rightSpace: { width: 40 },

  container: { flex: 1, backgroundColor: "#FAFAFA" },

  tabs: { flexDirection: "row", paddingHorizontal: 16, marginVertical: 12 },
  tab: { alignItems: "center", marginRight: 20, paddingVertical: 6 },
  tabText: { color: "#555", fontSize: isTablet ? 18 : 16 },
  activeTabText: { color: "#007BFF", fontWeight: "600" },
  underline: { height: 2, backgroundColor: "#007BFF", width: "100%", marginTop: 2, borderRadius: 1 },

  courseBlock: {
    flexDirection: "row",
    marginHorizontal: isTablet ? 24 : 16,
    marginVertical: 8,
    alignItems: "flex-start",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: isTablet ? 16 : 12,
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 2,
  },

  logoCard: {
    width: isTablet ? 90 : 70,
    height: isTablet ? 90 : 70,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    elevation: 1,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 2,
    marginRight: 12,
  },
  logo: { width: isTablet ? 80 : 60, height: isTablet ? 80 : 60, resizeMode: "contain" },

  courseInfo: { flex: 1 },

  provider: { fontSize: isTablet ? 18 : 16, fontWeight: "700", marginBottom: 4, color: "#007BFF" },
  offeredLine: { fontSize: isTablet ? 16 : 14, color: "#1F6FC4", marginBottom: 4, flexWrap: "wrap" },
  mode: { fontSize: isTablet ? 16 : 14, color: "#333", marginBottom: 4 },
  website: { fontSize: isTablet ? 16 : 14, color: "#333", marginBottom: 8 },

  footer: { flexDirection: "row", alignItems: "center", marginTop: 8, flexWrap: "wrap" },
  footerItem: { fontSize: isTablet ? 14 : 12, color: "#555", fontWeight: "500", marginRight: 16, marginBottom: 4 },
  moreButton: { backgroundColor: "#007BFF", paddingHorizontal: 12, paddingVertical: 4, borderRadius: 6 },
  moreText: { color: "#fff", fontWeight: "bold", fontSize: isTablet ? 14 : 12 },
});
