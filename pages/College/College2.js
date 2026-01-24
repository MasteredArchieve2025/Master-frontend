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
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { WebView } from "react-native-webview";
import Footer from "../../src/components/Footer";

const { width } = Dimensions.get("window");
const isTablet = width >= 768;

/* ===== AD BANNERS ===== */
const bannerAds = [
  "https://images.unsplash.com/photo-1516321318423-f06f85e504b3",
  "https://images.unsplash.com/photo-1509062522246-3755977927d7",
  "https://images.unsplash.com/photo-1551650975-87deedd944c3",
];

/* ===== DEGREE DATA ===== */
const degrees = [
  {
    title: "B.E",
    desc: "Engineering degree with core technical skills",
    icon: "settings-outline",
  },
  {
    title: "B.Tech",
    desc: "Technology-focused engineering program",
    icon: "hardware-chip-outline",
  },
  {
    title: "B.Arch",
    desc: "Architecture and design studies",
    icon: "business-outline",
  },
  {
    title: "BCA",
    desc: "Computer applications and software basics",
    icon: "laptop-outline",
  },
  {
    title: "B.Sc",
    desc: "Science-based undergraduate programs",
    icon: "flask-outline",
  },
];

const College2 = ({ route }) => {
  const navigation = useNavigation();

  const category = route?.params?.category || {
    name: "Unknown",
    icon: null,
  };

  const bannerRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  /* AUTO SCROLL ADS */
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

      {/* ===== HEADER ===== */}
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

          <Text style={styles.headerTitle}>Departments</Text>
          <View style={styles.rightSpace} />
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* ===== BANNER ADS ===== */}
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

        {/* ===== CATEGORY INFO ===== */}
        <View style={styles.titleContainer}>
          <View style={styles.iconContainer}>
            {category.icon ? (
              <Image source={category.icon} style={styles.categoryImage} />
            ) : (
              <Ionicons name="school-outline" size={60} color="#0c2f63" />
            )}
          </View>
          <Text style={styles.title}>{category.name}</Text>
        </View>

        {/* ===== DEGREE CARDS (2 PER ROW) ===== */}
        <View style={styles.grid}>
          {degrees.map((item, index) => (
            <TouchableOpacity
              key={index}
              activeOpacity={0.85}
              style={styles.degreeCard}
              onPress={() =>
                navigation.navigate("College0", {
                  degree: item.title,
                })
              }
            >
              <Ionicons
                name={item.icon}
                size={28}
                color="#0052A2"
                style={{ marginBottom: 10 }}
              />

              <Text style={styles.degreeTitle}>{item.title}</Text>

              <Text style={styles.degreeDesc}>{item.desc}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* ===== VIDEO AD ===== */}
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
};

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#fff" },

  /* HEADER */
  headerWrapper: { backgroundColor: "#0052A2" },

  header: {
    height: Platform.OS === "ios" ? 52 : 64,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
  },

  backBtn: { width: 40 },
  rightSpace: { width: 40 },

  headerTitle: {
    flex: 1,
    textAlign: "center",
    fontSize: 18,
    fontWeight: "700",
    color: "#fff",
  },

  /* DOTS */
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

  /* CATEGORY */
  titleContainer: {
    alignItems: "center",
    marginVertical: 20,
  },

  iconContainer: {
    backgroundColor: "#e6f2ff",
    borderRadius: 50,
    padding: 15,
    marginBottom: 10,
  },

  categoryImage: {
    width: 60,
    height: 60,
    resizeMode: "contain",
  },

  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#0c2f63",
  },

  /* GRID */
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingHorizontal: 16,
  },

  degreeCard: {
    width: isTablet ? "48%" : "47%",
    backgroundColor: "#dbd9d9",
    borderRadius: 14,
    padding: 16,
    marginBottom: 14,
    alignItems: "center",
    elevation: 3,
    borderWidth: 1,
    borderColor: "#d0e0ff",
  },

  degreeTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#003366",
    marginBottom: 6,
  },

  degreeDesc: {
    fontSize: 12,
    color: "#555",
    textAlign: "center",
  },

  /* VIDEO */
  videoBox: {
    marginHorizontal: 16,
    marginTop: 30,
    borderRadius: 12,
    overflow: "hidden",
    backgroundColor: "#000",
  },
});

export default College2;
