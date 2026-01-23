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

/* ===== AD BANNERS (SAME AS TUTION2) ===== */
const bannerAds = [
  "https://images.unsplash.com/photo-1516321318423-f06f85e504b3",
  "https://images.unsplash.com/photo-1509062522246-3755977927d7",
  "https://images.unsplash.com/photo-1551650975-87deedd944c3",
];

const schools = [
  {
    id: "1",
    name: "Josephs Matric HR Sec School, Sasthankari, Colachel",
    image: require("../../assets/school.png"),
    category: "Govt.School",
  },
  {
    id: "2",
    name: "St. Mary’s CBSE School, Nagercoil",
    image: require("../../assets/school.png"),
    category: "CBSE",
  },
  {
    id: "3",
    name: "National Public School, Chennai",
    image: require("../../assets/school.png"),
    category: "ICSE",
  },
  {
    id: "4",
    name: "Velammal State Board School, Madurai",
    image: require("../../assets/school.png"),
    category: "State Board",
  },
  {
    id: "5",
    name: "Govt Higher Secondary School, Trichy",
    image: require("../../assets/school.png"),
    category: "Govt.School",
  },
];

export default function School2() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const navigation = useNavigation();
  const { width } = useWindowDimensions();
  const isTablet = width >= 768;

  /* Banner logic */
  const bannerRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => {
        const next = (prev + 1) % bannerAds.length;
        bannerRef.current?.scrollTo({ x: next * width, animated: true });
        return next;
      });
    }, 3000);
    return () => clearInterval(timer);
  }, [width]);

  const filteredSchools =
    selectedCategory === "All"
      ? schools
      : schools.filter((s) => s.category === selectedCategory);

  const renderSchoolCard = ({ item }) => (
    <View style={styles.card}>
      <Image source={item.image} style={styles.schoolImage} />
      <View style={styles.schoolInfo}>
        <Text style={styles.schoolName}>{item.name}</Text>
        <TouchableOpacity
          style={styles.readMoreBtn}
          onPress={() => navigation.navigate("School3", { school: item })}
        >
          <Text style={styles.readMoreText}>Read more &gt;</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" backgroundColor="#0052A2" />

      {/* HEADER */}
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

          <Text style={styles.headerTitle}>Schools</Text>
          <View style={styles.rightSpace} />
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* ===== TOP AD BANNER ===== */}
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

        {/* FILTERS */}
        <View style={styles.filterRow}>
          <View style={styles.filterInput}>
            <TextInput
              placeholder="Filters"
              placeholderTextColor="#666"
              style={{ flex: 1 }}
            />
            <Ionicons name="chevron-down-outline" size={16} color="#333" />
          </View>
          <View style={styles.filterInput}>
            <TextInput
              placeholder="Select"
              placeholderTextColor="#666"
              style={{ flex: 1 }}
            />
            <Ionicons name="chevron-down-outline" size={16} color="#333" />
          </View>
        </View>

        {/* CATEGORIES */}
        <View style={styles.categories}>
          {["All", "Govt.School", "State Board", "CBSE", "ICSE"].map((cat) => (
            <TouchableOpacity
              key={cat}
              style={[
                styles.categoryBtn,
                selectedCategory === cat && styles.activeCategory,
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
          ))}
        </View>

        {/* SCHOOL LIST */}
        <FlatList
          data={filteredSchools}
          renderItem={renderSchoolCard}
          keyExtractor={(item) => item.id}
          scrollEnabled={false}
          contentContainerStyle={{ paddingTop: 12 }}
        />

        {/* ===== VIDEO AD ===== */}
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

  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    marginHorizontal: 14,
    marginBottom: 20,
    padding: 16,
    flexDirection: "row",
    elevation: 4,
  },

  schoolImage: {
    width: 75,
    height: 75,
    borderRadius: 8,
    marginRight: 16,
  },

  schoolInfo: { flex: 1, paddingRight: 70 },

  schoolName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#003366",
  },

  readMoreBtn: {
    position: "absolute",
    bottom: -22,
    right: -18,
    backgroundColor: "#0052A2",
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderTopLeftRadius: 10,
    borderBottomRightRadius: 12,
  },

  readMoreText: {
    color: "#fff",
    fontSize: 13,
    fontWeight: "500",
  },

  videoBox: {
    marginHorizontal: 16,
    marginTop: 30,
    borderRadius: 12,
    overflow: "hidden",
    backgroundColor: "#000",
  },
});
