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
import { Ionicons } from "@expo/vector-icons";
import { WebView } from "react-native-webview";
import Footer from "../../src/components/Footer";

/* ===== ASSETS ===== */
const collegeBannerImage = require("../../assets/Global.png");

/* ===== BANNER DATA ===== */
const bannerData = [
  {
    title: "Unlock Your Future at",
    line1: "ARUNACHALA MATRICULATION",
    line2: "SCHOOL",
    info: "Admissions Open for 2025-2026",
    image: collegeBannerImage,
  },
  {
    title: "Build Your Career With",
    line1: "TOP TUTION CENTRE",
    line2: "PROGRAMS",
    info: "Apply Now",
    image: collegeBannerImage,
  },
  {
    title: "Learn. Innovate. Lead.",
    line1: "QUALITY",
    line2: "EDUCATION",
    info: "Join Today",
    image: collegeBannerImage,
  },
];

export default function School1({ navigation }) {
  const { width } = useWindowDimensions();
  const isTablet = width >= 768;
  const isWeb = width >= 1024;

  const scrollRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  /* ===== AUTO SCROLL BANNER ===== */
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => {
        const next = (prev + 1) % bannerData.length;
        scrollRef.current?.scrollTo({
          x: next * width,
          animated: true,
        });
        return next;
      });
    }, 3500);

    return () => clearInterval(timer);
  }, [width]);

  return (
    <SafeAreaView style={styles.container}>
      {/* ===== HEADER ===== */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>School</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* ===== BANNER SLIDER ===== */}
        <ScrollView
          ref={scrollRef}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onMomentumScrollEnd={(e) => {
            const index = Math.round(
              e.nativeEvent.contentOffset.x / width
            );
            setActiveIndex(index);
          }}
        >
          {bannerData.map((item, index) => (
            <View key={index} style={{ width }}>
              <Image
                source={item.image}
                style={[
                  styles.bannerImage,
                  { height: isTablet ? 260 : 200 },
                ]}
              />

              <View style={styles.overlay}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.line1}>{item.line1}</Text>
                <Text style={styles.line2}>{item.line2}</Text>
                <Text style={styles.info}>{item.info}</Text>
              </View>
            </View>
          ))}
        </ScrollView>

        {/* ===== PAGINATION DOTS ===== */}
        <View style={styles.pagination}>
          {bannerData.map((_, index) => (
            <View
              key={index}
              style={[
                styles.dot,
                activeIndex === index && styles.activeDot,
              ]}
            />
          ))}
        </View>

        {/* ===== 2 COLUMN GRID ===== */}
        <View style={styles.grid}>
          <TouchableOpacity
            style={styles.gridCard}
            activeOpacity={0.85}
            onPress={() => navigation.navigate("School2")}
          >
            <Ionicons name="business" size={40} color="#0B5ED7" />
            <Text style={styles.gridTitle}>View School</Text>
            <Text style={styles.gridSub}>Explore Schools for you</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.gridCard}
            activeOpacity={0.85}
            onPress={() => navigation.navigate("Tutions1")}
          >
            <Ionicons name="book" size={40} color="#0B5ED7" />
            <Text style={styles.gridTitle}>View Tuitions</Text>
            <Text style={styles.gridSub}>
              Explore Tuitions for all Standards
            </Text>
          </TouchableOpacity>
        </View>

     {/* ===== YOUTUBE VIDEO (CLEAN PLAYER – BEST POSSIBLE) ===== */}
<View style={styles.videoBox}>
  <WebView
    allowsFullscreenVideo
    javaScriptEnabled
    domStorageEnabled
    originWhitelist={["*"]}
    source={{
      uri:
        "https://www.youtube.com/watch?v=qYapc_bkfxw",
    }}
    style={{
      height: isWeb ? 360 : isTablet ? 300 : 250,
      width: "100%",
    }}
  />
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
    marginRight:25,
  },

  bannerImage: {
    width: "100%",
    resizeMode: "cover",
  },

  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.45)",
    paddingHorizontal: 20,
    justifyContent: "center",
  },

  title: {
    color: "#E8F0FF",
    fontSize: 14,
    marginBottom: 6,
  },

  line1: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "800",
  },

  line2: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "800",
    marginBottom: 10,
  },

  info: {
    color: "#FFD966",
    fontSize: 14,
    fontWeight: "600",
  },

  pagination: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 10,
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

  grid: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    marginTop: 16,
  },

  gridCard: {
    width: "49%",
    height: "100%",
    backgroundColor: "#fff",
    borderRadius: 22,
    padding: 27,
    alignItems: "center",
    elevation: 4,
    marginTop:15,
  },

  gridTitle: {
    fontSize: 16,
    fontWeight: "700",
    marginTop: 10,
  },

  gridSub: {
    fontSize: 12,
    color: "#666",
    textAlign: "center",
    marginTop: 4,
  },

  videoBox: {
    marginTop: 55,
  
    overflow: "hidden",
    backgroundColor: "#000",
  },
});
