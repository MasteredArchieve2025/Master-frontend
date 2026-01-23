import React, { useState, useRef, useEffect } from "react";
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
import { WebView } from "react-native-webview";
import Footer from "../../src/components/Footer";

const { width } = Dimensions.get("window");
const isTablet = width >= 768;

const logo = require("../../assets/AKlogo.png");

/* -------- BANNER ADS -------- */
const bannerAds = [
  "https://images.unsplash.com/photo-1516321318423-f06f85e504b3",
  "https://images.unsplash.com/photo-1509062522246-3755977927d7",
  "https://images.unsplash.com/photo-1551650975-87deedd944c3",
];

/* -------- COURSE DATA -------- */
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
  const [selectedMode, setSelectedMode] = useState("All");

  /* -------- BANNER LOGIC -------- */
  const bannerRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => {
        const next = (prev + 1) % bannerAds.length;
        bannerRef.current?.scrollTo({
          x: next * width,
          animated: true,
        });
        return next;
      });
    }, 3000);

    return () => clearInterval(timer);
  }, []);

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

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* ---------- TOP BANNER ---------- */}
        <ScrollView
          ref={bannerRef}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onMomentumScrollEnd={(e) =>
            setActiveIndex(
              Math.round(e.nativeEvent.contentOffset.x / width)
            )
          }
        >
          {bannerAds.map((img, i) => (
            <Image
              key={i}
              source={{ uri: img }}
              style={{ width, height: isTablet ? 160 : 190 }}
              resizeMode="cover"
            />
          ))}
        </ScrollView>

        {/* DOT INDICATORS */}
        <View style={styles.dots}>
          {bannerAds.map((_, i) => (
            <View
              key={i}
              style={[styles.dot, activeIndex === i && styles.activeDot]}
            />
          ))}
        </View>

        {/* ---------- BODY ---------- */}
        <View style={styles.container}>
          {/* MODE TABS */}
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

          {/* COURSE CARDS */}
          {coursesData.map((course) => {
            const displayedCourses = course.offered.filter((off) =>
              selectedMode === "All"
                ? true
                : off.mode
                    .toLowerCase()
                    .includes(selectedMode.toLowerCase())
            );

            return (
              <TouchableOpacity
                key={course.id}
                activeOpacity={0.85}
                style={styles.courseBlock}
                onPress={() =>
                  navigation.navigate("Course4", { course })
                }
              >
                <View style={styles.logoCard}>
                  <Image source={course.logo} style={styles.logo} />
                </View>

                <View style={styles.courseInfo}>
                  <Text style={styles.provider}>{course.provider}</Text>

                  <Text style={styles.offeredLine}>
                    <Text style={{ fontWeight: "700" }}>
                      Courses Offered:{" "}
                    </Text>
                    {displayedCourses.map((c) => c.name).join(", ")}
                  </Text>

                  <Text style={styles.mode}>
                    <Text style={{ fontWeight: "700" }}>Mode: </Text>
                    {selectedMode === "All"
                      ? course.mode
                      : selectedMode}
                  </Text>

                  <Text style={styles.website}>
                    <Text style={{ fontWeight: "700" }}>
                      Website:{" "}
                    </Text>
                    {course.website}
                  </Text>

                  <View style={styles.footerRow}>
                    <Text style={styles.footerItem}>📄 Certificate</Text>
                    <Text style={styles.footerItem}>
                      🛠 Technical Training
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* ---------- VIDEO AD ---------- */}
        <View style={styles.videoBox}>
          <WebView
            allowsFullscreenVideo
            source={{
              uri: "https://www.youtube.com/watch?v=NONufn3jgXI",
            }}
            style={{ height: isTablet ? 260 : 220 }}
          />
        </View>

        <View style={{ height: 120 }} />
      </ScrollView>

      <Footer />
    </SafeAreaView>
  );
}

/* ---------------- STYLES ---------------- */
const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#fff" },

  headerWrapper: { backgroundColor: "#0052A2" },
  header: {
    height: Platform.OS === "ios" ? 52 : 64,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
  },
  backBtn: { width: 40 },
  headerTitle: {
    flex: 1,
    textAlign: "center",
    fontSize: 18,
    fontWeight: "700",
    color: "#fff",
  },
  rightSpace: { width: 40 },

  dots: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 8,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#ccc",
    marginHorizontal: 4,
  },
  activeDot: {
    width: 16,
    backgroundColor: "#0B5ED7",
  },

  container: { backgroundColor: "#FAFAFA" },

  tabs: { flexDirection: "row", paddingHorizontal: 16, marginVertical: 12 },
  tab: { alignItems: "center", marginRight: 20 },
  tabText: { fontSize: isTablet ? 18 : 16, color: "#555" },
  activeTabText: { color: "#007BFF", fontWeight: "600" },
  underline: { height: 2, backgroundColor: "#007BFF", width: "100%", marginTop: 2 },

  courseBlock: {
    flexDirection: "row",
    marginHorizontal: 16,
    marginVertical: 8,
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 12,
    elevation: 2,
  },

  logoCard: {
    width: 70,
    height: 70,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  logo: { width: 60, height: 60, resizeMode: "contain" },

  courseInfo: { flex: 1 },
  provider: { fontSize: 16, fontWeight: "700", color: "#007BFF" },
  offeredLine: { fontSize: 14, color: "#1F6FC4", marginVertical: 4 },
  mode: { fontSize: 14, color: "#333" },
  website: { fontSize: 14, color: "#333", marginBottom: 8 },

  footerRow: { flexDirection: "row", flexWrap: "wrap" },
  footerItem: { fontSize: 12, color: "#555", marginRight: 14 },

  videoBox: {
    marginHorizontal: 16,
    marginTop: 30,
    borderRadius: 12,
    overflow: "hidden",
    backgroundColor: "#000",
  },
});
