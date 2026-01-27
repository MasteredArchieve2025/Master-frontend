import React, { useRef, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  useWindowDimensions,
  Dimensions,
  Platform,
  StatusBar,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { WebView } from "react-native-webview";
import Footer from "../../src/components/Footer";

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");
const isTablet = screenWidth >= 768;
const isWeb = screenWidth >= 1024;

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
  const scrollRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const bannerWidth = isWeb ? Math.min(width, 1200) : width;

  /* ===== AUTO SCROLL BANNER ===== */
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => {
        const next = (prev + 1) % bannerData.length;
        scrollRef.current?.scrollTo({
          x: next * bannerWidth,
          animated: true,
        });
        return next;
      });
    }, 3500);

    return () => clearInterval(timer);
  }, [bannerWidth]);

  return (
    <SafeAreaView style={[styles.container, isWeb && styles.containerWeb]}>
      <StatusBar barStyle="light-content" backgroundColor="#0052A2" />
      
      {/* ===== HEADER ===== */}
      <View style={[styles.header, isTablet && styles.headerTablet, isWeb && styles.headerWeb]}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons 
            name="arrow-back" 
            size={isTablet ? 28 : 24} 
            color="#fff" 
          />
        </TouchableOpacity>

        <Text style={[styles.headerTitle, isTablet && styles.headerTitleTablet, isWeb && styles.headerTitleWeb]}>
          School
        </Text>
        <View style={{ width: isTablet ? 28 : 24 }} />
      </View>

      <ScrollView 
        showsVerticalScrollIndicator={isWeb} 
        contentContainerStyle={isWeb && styles.scrollContentWeb}
      >
        {/* ===== BANNER SLIDER ===== */}
        <View style={[styles.bannerContainer, isWeb && styles.bannerContainerWeb]}>
          <ScrollView
            ref={scrollRef}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onMomentumScrollEnd={(e) => {
              const index = Math.round(e.nativeEvent.contentOffset.x / bannerWidth);
              setActiveIndex(index);
            }}
          >
            {bannerData.map((item, index) => (
              <View key={index} style={{ width: bannerWidth }}>
                <Image
                  source={item.image}
                  style={[
                    styles.bannerImage, 
                    isTablet && styles.bannerImageTablet,
                    isWeb && styles.bannerImageWeb
                  ]}
                />

                <View style={styles.overlay}>
                  <Text style={[styles.title, isTablet && styles.titleTablet]}>{item.title}</Text>
                  <Text style={[styles.line1, isTablet && styles.line1Tablet]}>{item.line1}</Text>
                  <Text style={[styles.line2, isTablet && styles.line2Tablet]}>{item.line2}</Text>
                  <Text style={[styles.info, isTablet && styles.infoTablet]}>{item.info}</Text>
                </View>
              </View>
            ))}
          </ScrollView>

          {/* ===== PAGINATION DOTS ===== */}
          <View style={styles.pagination}>
            {bannerData.map((_, index) => (
              <View
                key={index}
                style={[styles.dot, activeIndex === index && styles.activeDot]}
              />
            ))}
          </View>
        </View>

        {/* ===== 2 COLUMN GRID ===== */}
        <View style={[
          styles.grid, 
          isTablet && styles.gridTablet,
          isWeb && styles.gridWeb
        ]}>
          <TouchableOpacity
            style={[
              styles.gridCard,
              isTablet && styles.gridCardTablet,
              isWeb && styles.gridCardWeb
            ]}
            activeOpacity={0.85}
            onPress={() => navigation.navigate("School2")}
          >
            <Ionicons 
              name="business" 
              size={isTablet ? 48 : 40} 
              color="#0B5ED7" 
            />
            <Text style={[
              styles.gridTitle,
              isTablet && styles.gridTitleTablet,
              isWeb && styles.gridTitleWeb
            ]}>
              View School
            </Text>
            <Text style={[
              styles.gridSub,
              isTablet && styles.gridSubTablet,
              isWeb && styles.gridSubWeb
            ]}>
              Explore Schools for you
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.gridCard,
              isTablet && styles.gridCardTablet,
              isWeb && styles.gridCardWeb
            ]}
            activeOpacity={0.85}
            onPress={() => navigation.navigate("Tutions1")}
          >
            <Ionicons 
              name="book" 
              size={isTablet ? 48 : 40} 
              color="#0B5ED7" 
            />
            <Text style={[
              styles.gridTitle,
              isTablet && styles.gridTitleTablet,
              isWeb && styles.gridTitleWeb
            ]}>
              View Tuitions
            </Text>
            <Text style={[
              styles.gridSub,
              isTablet && styles.gridSubTablet,
              isWeb && styles.gridSubWeb
            ]}>
              Explore Tuitions for all Standards
            </Text>
          </TouchableOpacity>
        </View>

        {/* ===== YOUTUBE VIDEO ===== */}
        <View style={[
          styles.videoBox, 
          isTablet && styles.videoBoxTablet,
          isWeb && styles.videoBoxWeb
        ]}>
          <WebView
            allowsFullscreenVideo
            javaScriptEnabled
            domStorageEnabled
            originWhitelist={["*"]}
            source={{
              uri: "https://www.youtube.com/embed/qYapc_bkfxw?rel=0&showinfo=0",
            }}
            style={{
              height: isWeb ? 400 : isTablet ? 320 : 250,
              width: "100%",
            }}
          />
        </View>

        <View style={{ height: isWeb ? 60 : 80 }} />
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
  containerWeb: {
    maxWidth: 1200,
    alignSelf: 'center',
    width: '100%',
  },
  
  scrollContentWeb: {
    paddingHorizontal: 40,
  },

  // Header Styles
  header: {
    backgroundColor: "#0052A2",
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerTablet: {
    paddingVertical: 20,
    paddingHorizontal: 24,
  },
  headerWeb: {
    paddingHorizontal: 40,
  },
  headerTitle: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "700",
    marginRight: 25,
  },
  headerTitleTablet: {
    fontSize: 26,
  },
  headerTitleWeb: {
    fontSize: 28,
  },

  // Banner Container
  bannerContainer: {},
  bannerContainerWeb: {
    borderRadius: 12,
    overflow: 'hidden',
  },

  // Banner Image
  bannerImage: {
    width: "100%",
    height: 200,
    resizeMode: "cover",
  },
  bannerImageTablet: {
    height: 300,
  },
  bannerImageWeb: {
    height: 300,
  },

  // Overlay
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.45)",
    paddingHorizontal: 20,
    justifyContent: "center",
  },

  // Banner Text
  title: {
    color: "#E8F0FF",
    fontSize: 14,
    marginBottom: 6,
  },
  titleTablet: {
    fontSize: 16,
  },
  line1: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "800",
  },
  line1Tablet: {
    fontSize: 28,
  },
  line2: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "800",
    marginBottom: 10,
  },
  line2Tablet: {
    fontSize: 28,
  },
  info: {
    color: "#FFD966",
    fontSize: 14,
    fontWeight: "600",
  },
  infoTablet: {
    fontSize: 16,
  },

  // Pagination Dots
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

  // Grid Styles
  grid: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    marginTop: 16,
  },
  gridTablet: {
    paddingHorizontal: 24,
    marginTop: 24,
  },
  gridWeb: {
    paddingHorizontal: 0,
    justifyContent: 'space-around',
  },
  gridCard: {
    width: "49%",
    backgroundColor: "#fff",
    borderRadius: 22,
    padding: 27,
    alignItems: "center",
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
      },
      android: {
        elevation: 4,
      },
    }),
    marginTop: 15,
  },
  gridCardTablet: {
    width: "48%",
    padding: 32,
    marginTop: 20,
    height: 200,
  },
  gridCardWeb: {
    width: "45%",
    padding: 40,
    marginTop: 25,
  },
  gridTitle: {
    fontSize: 16,
    fontWeight: "700",
    marginTop: 10,
    textAlign: 'center',
  },
  gridTitleTablet: {
    fontSize: 20,
    marginTop: 12,
  },
  gridTitleWeb: {
    fontSize: 22,
  },
  gridSub: {
    fontSize: 12,
    color: "#666",
    textAlign: "center",
    marginTop: 4,
  },
  gridSubTablet: {
    fontSize: 14,
    marginTop: 6,
  },
  gridSubWeb: {
    fontSize: 15,
  },

  // Video Box
  videoBox: {
    marginTop: 55,
    marginHorizontal: 16,
    overflow: "hidden",
    backgroundColor: "#000",
    borderRadius: 12,
    height :200
  },
  videoBoxTablet: {
    marginTop: 70,
    marginHorizontal: 24,
    borderRadius: 16,
    height : 300
  },
  videoBoxWeb: {
    marginTop: 80,
    marginHorizontal: 0,
    borderRadius: 16,
  },
});