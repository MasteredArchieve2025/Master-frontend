import React, { useRef, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
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

/* ---------------- INSTITUTES DATA ---------------- */
const institutes = [
  {
    name: "Global Tech Academy",
    location: "London, UK · Online",
    rating: 4.9,
    subtitle: "Certified Partner",
    image: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f",
  },
  {
    name: "Modern Skills Institute",
    location: "New York, USA · Offline",
    rating: 4.7,
    subtitle: "2.4k Students",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f",
  },
  {
    name: "EduStream University",
    location: "Global · Online",
    rating: 4.5,
    subtitle: "Flexible Schedule",
    image: "https://images.unsplash.com/photo-1509062522246-3755977927d7",
  },
  {
    name: "Data Science Center",
    location: "Singapore · Hybrid",
    rating: 4.8,
    subtitle: "Fast Track",
    image: "https://images.unsplash.com/photo-1551650975-87deedd944c3",
  },
];

export default function Collegecourse3({ navigation }) {
  const { width } = useWindowDimensions();
  const isTablet = width >= 768;

  const bannerRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [showAll, setShowAll] = useState(false);

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

  const visibleInstitutes = showAll
    ? institutes
    : institutes.slice(0, 2);

  return (
    <SafeAreaView style={styles.container}>
      {/* ===== HEADER ===== */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>

        <View>
          <Text style={styles.headerTitle}>Institutes</Text>
        </View>

        <View style={{ width: 24 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* ===== AUTO SCROLL BANNERS ===== */}
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

        {/* ===== BLUE INFO BANNER ===== */}
        <View style={styles.banner}>
          <Text style={styles.bannerTitle}>
            Available Course Institutes
          </Text>
          <Text style={styles.bannerSubtitle}>
            Find the best institutes near you
          </Text>
        </View>

        {/* ===== INSTITUTE LIST ===== */}
        {visibleInstitutes.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.card}
            activeOpacity={0.85}
            onPress={() =>
              navigation.navigate("Collegecourse4", {
                institute: item.name,
              })
            }
          >
            <Image source={{ uri: item.image }} style={styles.image} />

            <View style={styles.cardContent}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.location}>{item.location}</Text>

              <View style={styles.row}>
                <Text style={styles.rating}>⭐ {item.rating}</Text>
                <Text style={styles.sub}>{item.subtitle}</Text>
              </View>
            </View>

            <Ionicons
              name="chevron-forward"
              size={18}
              color="#0B5ED7"
            />
          </TouchableOpacity>
        ))}

        {/* SEE ALL / SEE LESS */}
        <TouchableOpacity
          style={styles.seeToggle}
          onPress={() => setShowAll(!showAll)}
        >
          <Text style={styles.seeText}>
            {showAll ? "See less" : "See all"}
          </Text>
          <Ionicons
            name={showAll ? "chevron-up" : "chevron-forward"}
            size={16}
            color="#0B5ED7"
          />
        </TouchableOpacity>

        {/* ===== VIDEO ===== */}
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
      <Footer/>
    </SafeAreaView>
  );
}

/* ---------------- STYLES ---------------- */
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F6F9FF" },

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

  banner: {
    backgroundColor: "#4c73ac",
    margin: 16,
    borderRadius: 16,
    padding: 16,
  },

  bannerTitle: { color: "#fff", fontSize: 16, fontWeight: "700" },
  bannerSubtitle: { color: "#DCE8FF", fontSize: 12, marginTop: 4 },

  card: {
    backgroundColor: "#fff",
    marginHorizontal: 16,
    marginBottom: 14,
    borderRadius: 16,
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    elevation: Platform.OS === "android" ? 3 : 0,
  },

  image: { width: 70, height: 70, borderRadius: 12 },

  cardContent: { flex: 1, marginLeft: 12 },

  name: { fontSize: 15, fontWeight: "700" },
  location: { fontSize: 12, color: "#5F6F81", marginTop: 4 },

  row: { flexDirection: "row", marginTop: 6 },
  rating: { fontSize: 12, marginRight: 10 },
  sub: { fontSize: 12, color: "#0B5ED7" },

  seeToggle: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    marginHorizontal: 16,
    marginBottom: 10,
  },

  seeText: {
    color: "#0B5ED7",
    fontSize: 15,
    marginRight: 4,
  },

  videoBox: {
    marginHorizontal: 16,
    marginTop: 30,
    borderRadius: 12,
    overflow: "hidden",
    backgroundColor: "#000",
  },
});
