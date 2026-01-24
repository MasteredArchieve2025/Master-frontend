import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
  TextInput,
  Platform,
  StatusBar,
  SafeAreaView,
  ScrollView,
  useWindowDimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { WebView } from "react-native-webview";
import Footer from "../../src/components/Footer";

/* ===== AD BANNERS ===== */
const bannerAds = [
  "https://images.unsplash.com/photo-1516321318423-f06f85e504b3",
  "https://images.unsplash.com/photo-1509062522246-3755977927d7",
  "https://images.unsplash.com/photo-1551650975-87deedd944c3",
];

/* ===== SCHOOL DATA ===== */
const schools = [
  {
    id: "1",
    name: "Josephs Matric HR Sec School",
    location: "Colachel · 1.2 km",
    board: "Govt.School",
    type: "Public",
    image: require("../../assets/school.png"),
    category: "Govt.School",
  },
  {
    id: "2",
    name: "St. Mary’s CBSE School",
    location: "Nagercoil · 2.5 km",
    board: "CBSE",
    type: "Private",
    image: require("../../assets/school.png"),
    category: "CBSE",
  },
  {
    id: "3",
    name: "National Public School",
    location: "Chennai · 4.0 km",
    board: "ICSE",
    type: "Day School",
    image: require("../../assets/school.png"),
    category: "ICSE",
  },
  {
    id: "4",
    name: "Velammal State Board School",
    location: "Madurai · 3.2 km",
    board: "State Board",
    type: "Private",
    image: require("../../assets/school.png"),
    category: "State Board",
  },
  {
    id: "5",
    name: "Govt Higher Secondary School",
    location: "Trichy · 5.0 km",
    board: "Govt.School",
    type: "Public",
    image: require("../../assets/school.png"),
    category: "Govt.School",
  },
];

export default function School2() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const navigation = useNavigation();
  const { width } = useWindowDimensions();
  const isTablet = width >= 768;

  /* ===== BANNER LOGIC ===== */
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
  }, [width]);

  const filteredSchools =
    selectedCategory === "All"
      ? schools
      : schools.filter((s) => s.category === selectedCategory);

  /* ===== TUTION2 STYLE CARD ===== */
  const renderSchoolCard = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      activeOpacity={0.85}
      onPress={() => navigation.navigate("School3", { school: item })}
    >
      <Image source={item.image} style={styles.image} />

      <View style={styles.cardContent}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.location}>📍 {item.location}</Text>

        <View style={styles.tags}>
          <Text style={styles.tagBlue}>{item.board}</Text>
          <Text style={styles.tagGray}>{item.type}</Text>
        </View>
      </View>

      <Ionicons name="chevron-forward" size={18} color="#0B5ED7" />
    </TouchableOpacity>
  );

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
        <Text style={styles.headerTitle}>Schools</Text>
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
            setActiveIndex(
              Math.round(e.nativeEvent.contentOffset.x / width)
            )
          }
        >
          {bannerAds.map((img, i) => (
            <Image
              key={i}
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

        {/* FILTERS (UNCHANGED) */}
        <View style={styles.filterRow}>
          <View style={styles.filterInput}>
            <TextInput
              placeholder="Filters"
              placeholderTextColor="#666"
              style={{ flex: 1 }}
            />
            <Ionicons
              name="chevron-down-outline"
              size={16}
              color="#333"
            />
          </View>
          <View style={styles.filterInput}>
            <TextInput
              placeholder="Select"
              placeholderTextColor="#666"
              style={{ flex: 1 }}
            />
            <Ionicons
              name="chevron-down-outline"
              size={16}
              color="#333"
            />
          </View>
        </View>

        {/* ===== CATEGORIES ===== */}
        <View style={styles.categories}>
          {["All", "Govt.School", "State Board", "CBSE", "ICSE"].map(
            (cat) => (
              <TouchableOpacity
                key={cat}
                style={[
                  styles.categoryBtn,
                  selectedCategory === cat &&
                    styles.activeCategory,
                ]}
                onPress={() => setSelectedCategory(cat)}
              >
                <Text
                  style={[
                    styles.categoryText,
                    selectedCategory === cat &&
                      styles.activeCategoryText,
                  ]}
                >
                  {cat}
                </Text>
              </TouchableOpacity>
            )
          )}
        </View>

        {/* ===== SCHOOL LIST ===== */}
        <FlatList
          data={filteredSchools}
          renderItem={renderSchoolCard}
          keyExtractor={(item) => item.id}
          scrollEnabled={false}
          contentContainerStyle={{ paddingTop: 12 }}
        />

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
    paddingHorizontal: 10,
    flex: 0.48,
  },

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

  /* ===== TUTION2 CARD STYLE ===== */
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
    fontSize: 15,
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
    marginRight: 8,
  },

  tagGray: {
    backgroundColor: "#F1F3F6",
    color: "#5F6F81",
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
