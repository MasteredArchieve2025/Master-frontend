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
  useWindowDimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { WebView } from "react-native-webview";
import Footer from "../../src/components/Footer";

// Get initial window dimensions
const { width, height } = Dimensions.get("window");
const isTabletInitial = width >= 768;
const isDesktopInitial = width >= 1024;

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
  
  // Use useWindowDimensions for responsive updates
  const { width: windowWidth, height: windowHeight } = useWindowDimensions();
  
  // Responsive breakpoints
  const isMobile = windowWidth < 768;
  const isTablet = windowWidth >= 768 && windowWidth < 1024;
  const isDesktop = windowWidth >= 1024;
  
  // Responsive dimensions
  const bannerHeight = isMobile ? 190 : isTablet ? 300 : 300;
  const videoHeight = isMobile ? 200 : isTablet ? 300 : 350;
  const cardPadding = isMobile ? 16 : isTablet ? 20 : 24;
  const cardMargin = isMobile ? 8 : isTablet ? 12 : 16;
  const logoSize = isMobile ? 60 : isTablet ? 80 : 100;
  const logoCardSize = isMobile ? 70 : isTablet ? 90 : 110;

  /* -------- AUTO SCROLL BANNER -------- */
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => {
        const next = (prev + 1) % bannerAds.length;
        bannerRef.current?.scrollTo({
          x: next * windowWidth,
          animated: true,
        });
        return next;
      });
    }, 3000);

    return () => clearInterval(timer);
  }, [windowWidth]);

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" backgroundColor="#0052A2" />

      {/* ---------- HEADER ---------- */}
      <View style={[styles.headerWrapper, isDesktop && styles.headerWrapperDesktop]}>
        <View style={[styles.header, isTablet && styles.headerTablet, isDesktop && styles.headerDesktop]}>
          <TouchableOpacity
            style={styles.backBtn}
            onPress={() => navigation.goBack()}
          >
            <Ionicons
              name={Platform.OS === "ios" ? "chevron-back" : "arrow-back"}
              size={isMobile ? 24 : isTablet ? 28 : 32}
              color="#fff"
            />
          </TouchableOpacity>

          <Text style={[styles.headerTitle, isTablet && styles.headerTitleTablet, isDesktop && styles.headerTitleDesktop]}>
            Studios
          </Text>
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
              Math.round(e.nativeEvent.contentOffset.x / windowWidth)
            )
          }
        >
          {bannerAds.map((img, i) => (
            <View key={i} style={{ width: windowWidth }}>
              <Image
                source={{ uri: img }}
                style={{
                  width: windowWidth,
                  height: bannerHeight,
                  resizeMode: "cover"
                }}
              />
            </View>
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
        <View style={[
          styles.container, 
          isDesktop && styles.containerDesktop,
          { paddingHorizontal: isDesktop ? windowWidth * 0.1 : 0 }
        ]}>
          {studios.map((studio) => (
            <TouchableOpacity
              key={studio.id}
              activeOpacity={0.85}
              style={[
                styles.studioCard,
                {
                  marginHorizontal: cardPadding,
                  marginVertical: cardMargin,
                  padding: isMobile ? 12 : isTablet ? 16 : 20,
                },
                isTablet && styles.studioCardTablet,
                isDesktop && styles.studioCardDesktop
              ]}
              onPress={() =>
                navigation.navigate("Extraskills4", { studio })
              }
            >
              {/* LOGO */}
              <View style={[
                styles.logoCard,
                {
                  width: logoCardSize,
                  height: logoCardSize,
                  marginRight: isMobile ? 12 : isTablet ? 16 : 20,
                }
              ]}>
                <Image 
                  source={studio.logo} 
                  style={[
                    styles.logo,
                    { width: logoSize, height: logoSize }
                  ]} 
                />
              </View>

              {/* INFO */}
              <View style={[styles.info, isDesktop && styles.infoDesktop]}>
                <Text style={[
                  styles.name,
                  isTablet && styles.nameTablet,
                  isDesktop && styles.nameDesktop
                ]}>
                  {studio.name}
                </Text>

                <Text style={[
                  styles.location,
                  isTablet && styles.locationTablet,
                  isDesktop && styles.locationDesktop
                ]}>
                  📍 {studio.location}
                </Text>

                <View style={[
                  styles.footerRow,
                  isDesktop && styles.footerRowDesktop
                ]}>
                  <Text style={[
                    styles.footerItem,
                    isTablet && styles.footerItemTablet,
                    isDesktop && styles.footerItemDesktop
                  ]}>
                    🎵 Certified Trainers
                  </Text>
                  <Text style={[
                    styles.footerItem,
                    isTablet && styles.footerItemTablet,
                    isDesktop && styles.footerItemDesktop
                  ]}>
                    💃 Practical Sessions
                  </Text>
                  {isDesktop && (
                    <Text style={[styles.footerItem, styles.footerItemDesktop]}>
                      ⭐ 5.0 Rating
                    </Text>
                  )}
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* ---------- VIDEO AD ---------- */}
        <View style={[
          styles.videoBox,
          {
            marginHorizontal: cardPadding,
            marginTop: isMobile ? 30 : isTablet ? 40 : 50,
            height: videoHeight,
          },
          isDesktop && styles.videoBoxDesktop
        ]}>
          <WebView
            allowsFullscreenVideo
            source={{
              uri: "https://www.youtube.com/embed/NONufn3jgXI?rel=0&modestbranding=1",
            }}
            style={{ flex: 1 }}
            javaScriptEnabled={true}
            domStorageEnabled={true}
            startInLoadingState={true}
            scalesPageToFit={true}
          />
        </View>

        {/* Spacer for Footer */}
        <View style={{ height: isMobile ? 120 : isTablet ? 140 : 160 }} />
      </ScrollView>

      <Footer />
    </SafeAreaView>
  );
}

/* ---------------- RESPONSIVE STYLES ---------------- */
const styles = StyleSheet.create({
  safe: { 
    flex: 1, 
    backgroundColor: "#fff" 
  },

  // Header Styles
  headerWrapper: { 
    backgroundColor: "#0052A2" 
  },
  headerWrapperDesktop: {
    paddingHorizontal: '5%',
  },
  header: {
    height: Platform.OS === "ios" ? 52 : 64,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
  },
  headerTablet: {
    height: Platform.OS === "ios" ? 60 : 72,
    paddingHorizontal: 24,
  },
  headerDesktop: {
    height: 80,
    paddingHorizontal: '10%',
    maxWidth: 1200,
    alignSelf: 'center',
    width: '100%',
  },
  backBtn: { 
    width: 40 
  },
  headerTitle: {
    flex: 1,
    textAlign: "center",
    fontSize: 18,
    fontWeight: "700",
    color: "#fff",
  },
  headerTitleTablet: {
    fontSize: 22,
  },
  headerTitleDesktop: {
    fontSize: 26,
  },
  rightSpace: { 
    width: 40 
  },

  // Banner Dots
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

  // Container
  container: {
    backgroundColor: "#FAFAFA",
    paddingVertical: 6,
  },
  containerDesktop: {
    paddingHorizontal: 0,
  },

  // Studio Card
  studioCard: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 10,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  studioCardTablet: {
    borderRadius: 12,
    elevation: 3,
  },
  studioCardDesktop: {
    borderRadius: 16,
    elevation: 4,
    maxWidth: 800,
    alignSelf: 'center',
    width: '100%',
  },

  // Logo Card
  logoCard: {
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    resizeMode: "contain",
  },

  // Info Section
  info: {
    flex: 1,
    justifyContent: 'center',
  },
  infoDesktop: {
    paddingVertical: 8,
  },

  // Name
  name: {
    fontSize: 16,
    fontWeight: "700",
    color: "#007BFF",
    marginBottom: 4,
  },
  nameTablet: {
    fontSize: 18,
    marginBottom: 6,
  },
  nameDesktop: {
    fontSize: 22,
    marginBottom: 8,
  },

  // Location
  location: {
    fontSize: 14,
    color: "#333",
    marginBottom: 8,
  },
  locationTablet: {
    fontSize: 16,
    marginBottom: 10,
  },
  locationDesktop: {
    fontSize: 18,
    marginBottom: 12,
  },

  // Footer Row
  footerRow: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  footerRowDesktop: {
    marginTop: 8,
  },

  // Footer Items
  footerItem: {
    fontSize: 12,
    color: "#555",
    marginRight: 14,
  },
  footerItemTablet: {
    fontSize: 14,
    marginRight: 18,
  },
  footerItemDesktop: {
    fontSize: 15,
    marginRight: 22,
  },

  // Video Box
  videoBox: {
    borderRadius: 12,
    overflow: "hidden",
    backgroundColor: "#000",
  },
  videoBoxDesktop: {
    borderRadius: 16,
    maxWidth: 800,
    alignSelf: 'center',
    width: '100%',
  },
});