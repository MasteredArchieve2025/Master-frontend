import React, { useRef, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  ScrollView,
  useWindowDimensions,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { WebView } from "react-native-webview";
import Footer from "../../src/components/Footer";

/* ---------------- BANNER ADS ---------------- */
const bannerAds = [
  "https://images.unsplash.com/photo-1516321318423-f06f85e504b3",
  "https://images.unsplash.com/photo-1509062522246-3755977927d7",
  "https://images.unsplash.com/photo-1551650975-87deedd944c3",
];

/* ---------------- DATA ---------------- */
const courses = [
  {
    id: "1",
    title: "Full Stack Web Development",
    tag: "TRENDING",
    tagColor: "#E7F0FF",
    tagText: "#2563EB",
    duration: "4-8 weeks • Online",
  },
  {
    id: "2",
    title: "UI/UX Design Certification",
    tag: "RECOMMENDED",
    tagColor: "#E9F9EF",
    tagText: "#16A34A",
    duration: "6 weeks • Offline",
  },
  {
    id: "3",
    title: "Data Science",
    tag: "RECOMMENDED",
    tagColor: "#E9F9EF",
    tagText: "#16A34A",
    duration: "6 weeks • Offline",
  },
  {
    id: "4",
    title: "Cyber Security",
    tag: "RECOMMENDED",
    tagColor: "#E9F9EF",
    tagText: "#16A34A",
    duration: "6 weeks • Offline",
  },
];

export default function Collegecourse2({ navigation }) {
  const { width } = useWindowDimensions();
  const isTablet = width >= 768;

  const bannerRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

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
  }, [width]);

  /* -------- COURSE CARD -------- */
  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.card,
        { width: isTablet ? "48%" : "47%" },
      ]}
      activeOpacity={0.85}
      onPress={() =>
        navigation.navigate("Collegecourse3", {
          course: item.title,
        })
      }
    >
      <View style={[styles.tag, { backgroundColor: item.tagColor }]}>
        <Text style={[styles.tagText, { color: item.tagText }]}>
          {item.tag}
        </Text>
      </View>

      <Text style={styles.title}>{item.title}</Text>

      <View style={styles.infoRow}>
        <Ionicons name="briefcase-outline" size={14} color="#2563EB" />
        <Text style={styles.infoText}>Industry Skill</Text>
      </View>

      <View style={styles.infoRow}>
        <Ionicons name="time-outline" size={14} color="#2563EB" />
        <Text style={styles.infoText}>{item.duration}</Text>
      </View>

      <TouchableOpacity style={styles.button} activeOpacity={0.9}>
        <Text style={styles.buttonText}>Enroll Now</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>

        <View>
          <Text style={styles.headerTitle}>Extra-Value Courses</Text>
        </View>

        <View style={{ width: 24 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* ===== AUTO SCROLL BANNER ===== */}
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
          {bannerAds.map((img, index) => (
            <Image
              key={index}
              source={{ uri: img }}
              style={{
                width,
                height: isTablet ? 150 : 180,
              }}
              resizeMode="cover"
            />
          ))}
        </ScrollView>

        {/* DOTS */}
        <View style={styles.dots}>
          {bannerAds.map((_, i) => (
            <View
              key={i}
              style={[
                styles.dot,
                activeIndex === i && styles.activeDot,
              ]}
            />
          ))}
        </View>

        {/* ===== COURSE CARDS ===== */}
        <View style={{ marginTop: 20 }}>
          <FlatList
            data={courses}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            numColumns={2}
            columnWrapperStyle={styles.row}
            scrollEnabled={false}
          />
        </View>

        {/* ===== YOUTUBE VIDEO AD ===== */}
        <View style={styles.videoBox}>
          <WebView
            allowsFullscreenVideo
            source={{
              uri: "https://www.youtube.com/watch?v=NONufn3jgXI",
            }}
            style={{
              height: isTablet ? 260 : 220,
              width: "100%",
            }}
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
  container: {
    flex: 1,
    backgroundColor: "#F4F8FF",
  },

  header: {
    backgroundColor: "#0052A2",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
  },

  headerTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
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

  row: {
    justifyContent: "space-between",
    paddingHorizontal: 16,
    marginBottom: 14,
  },

  card: {
    backgroundColor: "#fff",
    borderRadius: 18,
    padding: 14,
    elevation: 4,
  },

  tag: {
    alignSelf: "flex-start",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
    marginBottom: 8,
  },

  tagText: {
    fontSize: 10,
    fontWeight: "700",
  },

  title: {
    fontSize: 14,
    fontWeight: "700",
    marginBottom: 8,
  },

  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },

  infoText: {
    fontSize: 11,
    marginLeft: 6,
    color: "#444",
  },

  button: {
    backgroundColor: "#0052A2",
    borderRadius: 10,
    paddingVertical: 8,
    marginTop: 8,
    width: "70%",
  },

  buttonText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "700",
    textAlign: "center",
  },

  videoBox: {
    marginHorizontal: 16,
    marginTop: 30,
    borderRadius: 12,
    overflow: "hidden",
    backgroundColor: "#000",
    elevation: Platform.OS === "android" ? 3 : 0,
  },
});
