import React, { useRef, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Platform,
  StatusBar,
  SafeAreaView,
  Dimensions,
} from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { WebView } from "react-native-webview";
import { LinearGradient } from "expo-linear-gradient";
import Footer from "../../src/components/Footer";

const { width } = Dimensions.get("window");
const isTablet = width >= 768;

/* ---------- BANNER ADS ---------- */
const bannerAds = [
  "https://images.unsplash.com/photo-1516321318423-f06f85e504b3",
  "https://images.unsplash.com/photo-1509062522246-3755977927d7",
  "https://images.unsplash.com/photo-1551650975-87deedd944c3",
];

/* ---------- ICON + DESCRIPTION MAP ---------- */
const courseMeta = {
  "Web Development": {
    icon: "web",
    desc: "Build modern websites and web apps",
  },
  "Python Programming": {
    icon: "language-python",
    desc: "Learn Python for real-world applications",
  },
  "Data Science": {
    icon: "chart-line",
    desc: "Analyze data and build insights",
  },
  Finance: {
    icon: "finance",
    desc: "Understand finance & accounting basics",
  },
  Marketing: {
    icon: "bullhorn",
    desc: "Learn digital and brand marketing",
  },
  "HR Management": {
    icon: "account-group",
    desc: "Human resource & people management",
  },
};

export default function Course2({ route, navigation }) {
  const sections = route?.params?.sections || [];
  const bannerRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  /* AUTO SCROLL ADS */
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => {
        const next = (prev + 1) % bannerAds.length;
        bannerRef.current?.scrollTo({ x: next * width, animated: true });
        return next;
      });
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" backgroundColor="#0052A2" />

      {/* ===== HEADER ===== */}
      <View style={styles.headerWrapper}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
            <Ionicons
              name={Platform.OS === "ios" ? "chevron-back" : "arrow-back"}
              size={24}
              color="#fff"
            />
          </TouchableOpacity>

          <Text style={styles.headerTitle}>Course Details</Text>
          <View style={{ width: 40 }} />
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* ===== TOP BANNER ADS ===== */}
        <ScrollView
          ref={bannerRef}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onMomentumScrollEnd={(e) =>
            setActiveIndex(Math.round(e.nativeEvent.contentOffset.x / width))
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

        {/* DOTS */}
        <View style={styles.dots}>
          {bannerAds.map((_, i) => (
            <View
              key={i}
              style={[styles.dot, activeIndex === i && styles.activeDot]}
            />
          ))}
        </View>

        {/* ===== SECTIONS ===== */}
        {sections.map((section, idx) => (
          <View key={idx}>
            {/* Section Title */}
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>{section.title}</Text>
            </View>

            {/* Cards */}
            <View style={styles.cardGrid}>
              {section.items.map((item, i) => {
                const meta = courseMeta[item] || {
                  icon: "book-open-page-variant",
                  desc: "Explore this professional course",
                };

                return (
                  <TouchableOpacity
                    key={i}
                    activeOpacity={0.85}
                    style={styles.card}
                    onPress={() =>
                      navigation.navigate("Course3", { title: item })
                    }
                  >
                    {/* ===== LINEAR GRADIENT ICON ===== */}
                    <LinearGradient
                      colors={["#2295D2", "#284598"]}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 1 }}
                      style={styles.iconContainer}
                    >
                      <MaterialCommunityIcons
                        name={meta.icon}
                        size={26}
                        color="#fff"
                      />
                    </LinearGradient>

                    <Text style={styles.cardTitle}>{item}</Text>
                    <Text style={styles.cardDesc}>{meta.desc}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        ))}

        {/* ===== VIDEO AD ===== */}
        <View style={styles.videoBox}>
          <WebView
            allowsFullscreenVideo
            source={{ uri: "https://www.youtube.com/watch?v=NONufn3jgXI" }}
            style={{ height: isTablet ? 260 : 220 }}
          />
        </View>

        <View style={{ height: 120 }} />
      </ScrollView>

      <Footer />
    </SafeAreaView>
  );
}

/* ---------- STYLES ---------- */
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

  sectionHeader: {
    backgroundColor: "#CFE5FA",
    margin: 16,
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: "center",
  },
  sectionTitle: {
    fontSize: isTablet ? 22 : 18,
    fontWeight: "700",
    color: "#0B5AA7",
  },

  cardGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingHorizontal: 16,
  },

  card: {
    backgroundColor: "#fff",
    width: isTablet ? "48%" : "47%",
    borderRadius: 14,
    padding: 16,
    marginBottom: 14,
    alignItems: "center",
    elevation: 3,
  },

  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },

  cardTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: "#004780",
    textAlign: "center",
    marginBottom: 6,
  },

  cardDesc: {
    fontSize: 11,
    color: "#555",
    textAlign: "center",
  },

  videoBox: {
    marginHorizontal: 16,
    marginTop: 30,
    borderRadius: 12,
    overflow: "hidden",
    backgroundColor: "#000",
  },
});
