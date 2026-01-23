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
import Svg, { Path } from "react-native-svg";
import { useNavigation } from "@react-navigation/native";
import { WebView } from "react-native-webview";
import Footer from "../../src/components/Footer";

const { width } = Dimensions.get("window");
const isTablet = width >= 768;

/* ===== AD BANNERS (SAME AS TUTION2) ===== */
const bannerAds = [
  "https://images.unsplash.com/photo-1516321318423-f06f85e504b3",
  "https://images.unsplash.com/photo-1509062522246-3755977927d7",
  "https://images.unsplash.com/photo-1551650975-87deedd944c3",
];

/* -------------------- DATA -------------------- */
const allColleges = [
  {
    name: "Arunachala College of Engineering For Women, Nagercoil",
    logo: require("../../assets/collegeicon.png"),
  },
  {
    name: "Arunachala College of Engineering For Women, Nagercoil",
    logo: require("../../assets/collegeicon.png"),
  },
];

const govtUniversities = [
  {
    name: "Government College of Technology, Coimbatore",
    logo: require("../../assets/collegeicon.png"),
  },
];

const autonomousUniversities = [
  {
    name: "PSG College of Technology, Coimbatore",
    logo: require("../../assets/collegeicon.png"),
  },
];

/* -------------------- READ MORE BUTTON -------------------- */
function ReadMoreButton({ onPress }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.85}
      style={styles.readMoreContainer}
    >
      <Svg height="36" width="110">
        <Path d="M20 0 L110 0 L110 36 L0 36 Z" fill="#0c2f63" />
      </Svg>
      <View style={styles.readMoreTextContainer}>
        <Text style={styles.readMoreText}>Read More</Text>
      </View>
    </TouchableOpacity>
  );
}

/* -------------------- SCREEN -------------------- */
const College3 = ({ route }) => {
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

  const renderColleges = () => {
    switch (activeTab) {
      case "Govt":
        return govtUniversities;
      case "Autonomous":
        return autonomousUniversities;
      default:
        return allColleges;
    }
  };

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" backgroundColor="#0052A2" />

      {/* ===== HEADER ===== */}
      <View style={styles.headerWrapper}>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backBtn}
          >
            <Ionicons
              name={Platform.OS === "ios" ? "chevron-back" : "arrow-back"}
              size={24}
              color="#fff"
            />
          </TouchableOpacity>

          <Text style={styles.headerTitle}>{degree}</Text>
          <View style={{ width: 40 }} />
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* ===== TOP AUTO SCROLL AD ===== */}
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
        <View style={styles.filtersContainer}>
          <TouchableOpacity style={styles.filterButton}>
            <Text style={styles.filterText}>Filters</Text>
            <Ionicons name="chevron-down" size={18} color="gray" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.filterButton}>
            <Text style={styles.filterText}>Select</Text>
            <Ionicons name="chevron-down" size={18} color="gray" />
          </TouchableOpacity>
        </View>

        {/* ===== TABS ===== */}
        <View style={styles.tabsContainer}>
          {["All", "Govt", "Autonomous"].map((tab) => (
            <TouchableOpacity key={tab} onPress={() => setActiveTab(tab)}>
              <Text
                style={[
                  styles.tabText,
                  activeTab === tab && styles.activeTabText,
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

        {/* ===== COLLEGE CARDS ===== */}
        {renderColleges().map((college, index) => (
          <View key={index} style={styles.card}>
            <Image source={college.logo} style={styles.logo} />

            <View style={styles.collegeInfo}>
              <Text style={styles.collegeName}>{college.name}</Text>

              <ReadMoreButton
                onPress={() =>
                  navigation.navigate("College4", { college })
                }
              />
            </View>
          </View>
        ))}

        {/* ===== VIDEO AD (SAME AS TUTION2) ===== */}
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

/* -------------------- STYLES -------------------- */
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

  filtersContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    marginVertical: 10,
  },

  filterButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f2f2f2",
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
    width: "48%",
    justifyContent: "space-between",
  },

  filterText: { fontSize: 14 },

  tabsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 10,
  },

  tabText: { fontSize: 14, color: "gray" },

  activeTabText: {
    color: "#0c2f63",
    borderBottomWidth: 2,
    borderBottomColor: "#0c2f63",
    paddingBottom: 4,
  },

  card: {
    flexDirection: "row",
    backgroundColor: "#f2f2f2",
    borderRadius: 12,
    padding: 15,
    marginHorizontal: 20,
    marginBottom: 15,
    alignItems: "center",
  },

  logo: {
    width: isTablet ? 80 : 60,
    height: isTablet ? 80 : 60,
    marginRight: 15,
  },

  collegeInfo: { flex: 1 },

  collegeName: {
    fontSize: isTablet ? 18 : 16,
    fontWeight: "bold",
    marginBottom: 10,
  },

  readMoreContainer: {
    alignSelf: "flex-end",
    marginRight: -15,
  },

  readMoreTextContainer: {
    position: "absolute",
    width: 110,
    height: 36,
    justifyContent: "center",
    alignItems: "center",
  },

  readMoreText: {
    color: "#fff",
    fontSize: 13,
    fontWeight: "bold",
  },

  videoBox: {
    marginHorizontal: 16,
    marginTop: 30,
    borderRadius: 12,
    overflow: "hidden",
    backgroundColor: "#000",
  },
});

export default College3;
