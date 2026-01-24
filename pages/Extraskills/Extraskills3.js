// Extraskills3.js
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

/* -------- COMMON LOGO -------- */
const STUDIO_LOGO = require("../../assets/DanceStudio.png");

/* -------- BANNER ADS -------- */
const bannerAds = [
  "https://images.unsplash.com/photo-1516321318423-f06f85e504b3",
  "https://images.unsplash.com/photo-1509062522246-3755977927d7",
  "https://images.unsplash.com/photo-1551650975-87deedd944c3",
];

/* -------- STUDIO DATA -------- */
const studios = [
  {
    id: 1,
    name: "eMotion Dance Studio",
    location: "Nagercoil, Tamil Nadu",
    logo: STUDIO_LOGO,
  },
  {
    id: 2,
    name: "StepUp Dance Academy",
    location: "Marthandam, Tamil Nadu",
    logo: STUDIO_LOGO,
  },
  {
    id: 3,
    name: "Rhythm & Beats Studio",
    location: "Kanyakumari, Tamil Nadu",
    logo: STUDIO_LOGO,
  },
];

export default function Extraskills3() {
  const navigation = useNavigation();
  const [activeIndex, setActiveIndex] = useState(0);
  const bannerRef = useRef(null);

  /* -------- AUTO SCROLL BANNER -------- */
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

          <Text style={styles.headerTitle}>Studios</Text>
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

        {/* DOTS */}
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
          {studios.map((studio) => (
            <TouchableOpacity
              key={studio.id}
              activeOpacity={0.85}
              style={styles.studioCard}
              onPress={() =>
                navigation.navigate("Extraskills4", { studio })
              }
            >
              {/* LOGO */}
              <View style={styles.logoCard}>
                <Image source={studio.logo} style={styles.logo} />
              </View>

              {/* INFO */}
              <View style={styles.info}>
                <Text style={styles.name}>{studio.name}</Text>

                <Text style={styles.location}>
                  📍 {studio.location}
                </Text>

                <View style={styles.footerRow}>
                  <Text style={styles.footerItem}>🎵 Certified Trainers</Text>
                  <Text style={styles.footerItem}>💃 Practical Sessions</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
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

/* ---------------- STYLES (MATCH COURSE3) ---------------- */
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

  container: {
    backgroundColor: "#FAFAFA",
    paddingVertical: 6,
  },

  studioCard: {
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

  logo: {
    width: 60,
    height: 60,
    resizeMode: "contain",
  },

  info: {
    flex: 1,
  },

  name: {
    fontSize: 16,
    fontWeight: "700",
    color: "#007BFF",
    marginBottom: 4,
  },

  location: {
    fontSize: 14,
    color: "#333",
    marginBottom: 8,
  },

  footerRow: {
    flexDirection: "row",
    flexWrap: "wrap",
  },

  footerItem: {
    fontSize: 12,
    color: "#555",
    marginRight: 14,
  },

  videoBox: {
    marginHorizontal: 16,
    marginTop: 30,
    borderRadius: 12,
    overflow: "hidden",
    backgroundColor: "#000",
  },
});
