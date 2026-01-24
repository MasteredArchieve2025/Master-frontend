import React, { useState, useRef, useEffect } from "react";
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

/* ===== DATA ===== */
const allColleges = [
  {
    id: "1",
    name: "Arunachala College of Engineering For Women",
    location: "Nagercoil · 2.4 km",
    type: "Private",
    category: "All",
    logo: require("../../assets/collegeicon.png"),
  },
  {
    id: "2",
    name: "Arunachala College of Engineering For Women",
    location: "Nagercoil · 3.1 km",
    type: "Private",
    category: "All",
    logo: require("../../assets/collegeicon.png"),
  },
];

const govtUniversities = [
  {
    id: "3",
    name: "Government College of Technology",
    location: "Coimbatore · 4.8 km",
    type: "Govt",
    category: "Govt",
    logo: require("../../assets/collegeicon.png"),
  },
];

const autonomousUniversities = [
  {
    id: "4",
    name: "PSG College of Technology",
    location: "Coimbatore · 5.2 km",
    type: "Autonomous",
    category: "Autonomous",
    logo: require("../../assets/collegeicon.png"),
  },
];

export default function College3({ route }) {
  const { degree } = route.params;
  const navigation = useNavigation();
  const [activeTab, setActiveTab] = useState("All");

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

  const getColleges = () => {
    if (activeTab === "Govt") return govtUniversities;
    if (activeTab === "Autonomous") return autonomousUniversities;
    return allColleges;
  };

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" backgroundColor="#0052A2" />

      {/* ===== HEADER ===== */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons
            name={Platform.OS === "ios" ? "chevron-back" : "arrow-back"}
            size={24}
            color="#fff"
          />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>{degree}</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* ===== TOP ADS ===== */}
        <ScrollView
          ref={bannerRef}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onMomentumScrollEnd={(e) =>
            setActiveIndex(Math.round(e.nativeEvent.contentOffset.x / width))
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

        {/* ===== FILTERS ===== */}
        <View style={styles.filterRow}>
          <TouchableOpacity style={styles.filterInput}>
            <Text style={styles.filterText}>Filters</Text>
            <Ionicons name="chevron-down-outline" size={16} color="#333" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.filterInput}>
            <Text style={styles.filterText}>Select</Text>
            <Ionicons name="chevron-down-outline" size={16} color="#333" />
          </TouchableOpacity>
        </View>

        {/* ===== TABS ===== */}
        <View style={styles.categories}>
          {["All", "Govt", "Autonomous"].map((tab) => (
            <TouchableOpacity
              key={tab}
              style={[
                styles.categoryBtn,
                activeTab === tab && styles.activeCategory,
              ]}
              onPress={() => setActiveTab(tab)}
            >
              <Text
                style={[
                  styles.categoryText,
                  activeTab === tab && styles.activeCategoryText,
                ]}
              >
                {tab === "Govt"
                  ? "Govt Universities"
                  : tab === "Autonomous"
                  ? "Autonomous Universities"
                  : "All"}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* ===== COLLEGE LIST (SCHOOL2 STYLE) ===== */}
        {getColleges().map((college, index) => (
          <TouchableOpacity
            key={index}
            style={styles.card}
            activeOpacity={0.85}
            onPress={() =>
              navigation.navigate("College4", { college })
            }
          >
            <Image source={college.logo} style={styles.image} />

            <View style={styles.cardContent}>
              <Text style={styles.name}>{college.name}</Text>
              <Text style={styles.location}>📍 {college.location}</Text>

              <View style={styles.tags}>
                <Text style={styles.tagBlue}>{college.type}</Text>
              </View>
            </View>

            <Ionicons
              name="chevron-forward"
              size={18}
              color="#0B5ED7"
            />
          </TouchableOpacity>
        ))}

        {/* ===== VIDEO ===== */}
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

/* ================= STYLES ================= */

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#fff" },

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

  filterRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 12,
    marginVertical: 14,
  },

  filterInput: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 8,
    flex: 0.48,
    justifyContent: "space-between",
  },

  filterText: { fontSize: 14 },

  categories: {
    flexDirection: "row",
    justifyContent: "space-around",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    paddingVertical: 8,
  },

  categoryBtn: { paddingBottom: 6 },

  categoryText: { fontSize: 14, color: "#333" },

  activeCategory: {
    borderBottomWidth: 2,
    borderBottomColor: "#0052A2",
  },

  activeCategoryText: {
    color: "#0052A2",
    fontWeight: "bold",
  },

  /* ===== SCHOOL2 / TUTION2 CARD STYLE ===== */
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

  image: {
    width: 70,
    height: 70,
    borderRadius: 12,
  },

  cardContent: {
    flex: 1,
    marginLeft: 12,
  },

  name: {
    fontSize: isTablet ? 16 : 15,
    fontWeight: "700",
    color: "#000",
  },

  location: {
    fontSize: 12,
    color: "#5F6F81",
    marginTop: 4,
  },

  tags: {
    flexDirection: "row",
    marginTop: 8,
  },

  tagBlue: {
    backgroundColor: "#E8F1FF",
    color: "#0B5ED7",
    fontSize: 11,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },

  videoBox: {
    marginHorizontal: 16,
    marginTop: 30,
    borderRadius: 12,
    overflow: "hidden",
    backgroundColor: "#000",
  },
});
