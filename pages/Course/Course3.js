import React, { useState, useRef, useEffect, useMemo } from "react";
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

const { width, height } = Dimensions.get("window");

/* -------- RESPONSIVE UTILITIES -------- */
const isMobile = width < 768;
const isTablet = width >= 768 && width < 1024;
const isDesktop = width >= 1024;

// Responsive scaling function
const scale = (size) => {
  if (isDesktop) return size * 1.2;
  if (isTablet) return size * 1.1;
  return size;
};

// Responsive value selector
const responsiveValue = (mobile, tablet, desktop) => {
  if (isDesktop) return desktop;
  if (isTablet) return tablet;
  return mobile;
};

const logo = require("../../assets/AKlogo.png");

/* -------- BANNER ADS -------- */
const bannerAds = [
  "https://images.unsplash.com/photo-1516321318423-f06f85e504b3",
  "https://images.unsplash.com/photo-1509062522246-3755977927d7",
  "https://images.unsplash.com/photo-1551650975-87deedd944c3",
];

/* -------- COURSE DATA -------- */
const coursesData = [
  {
    id: 1,
    provider: "AK Technologies",
    logo,
    offered: [
      { name: "Web Development", mode: "Online" },
      { name: "Full Stack Development", mode: "Online" },
      { name: "Python", mode: "Offline" },
      { name: "Data Science", mode: "Online & Offline" },
    ],
    mode: "Online & Offline",
    website: "www.ak.com",
  },
  {
    id: 2,
    provider: "AK Technologies",
    logo,
    offered: [
      { name: "UI/UX Design", mode: "Offline" },
      { name: "Digital Marketing", mode: "Offline" },
      { name: "Cloud Computing", mode: "Online" },
    ],
    mode: "Online & Offline",
    website: "www.ak.com",
  },
  {
    id: 3,
    provider: "AK Technologies",
    logo,
    offered: [
      { name: "Cybersecurity", mode: "Online" },
      { name: "Networking", mode: "Offline" },
      { name: "Python Programming", mode: "Online" },
    ],
    mode: "Online & Offline",
    website: "www.ak.com",
  },
];

export default function Course3({ route }) {
  const navigation = useNavigation();
  const [selectedMode, setSelectedMode] = useState("All");
  const { width: windowWidth } = useWindowDimensions();

  /* -------- BANNER LOGIC -------- */
  const bannerRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

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

  // Responsive course card layout
  const courseCardLayout = useMemo(() => {
    if (isDesktop) {
      return {
        flexDirection: 'row',
        alignItems: 'flex-start',
        padding: scale(20),
      };
    }
    if (isTablet) {
      return {
        flexDirection: 'row',
        alignItems: 'flex-start',
        padding: scale(16),
      };
    }
    return {
      flexDirection: 'column',
      alignItems: 'center',
      padding: scale(14),
    };
  }, []);

  // Responsive logo size
  const logoSize = useMemo(() => {
    if (isDesktop) return { width: scale(80), height: scale(80) };
    if (isTablet) return { width: scale(70), height: scale(70) };
    return { width: scale(60), height: scale(60) };
  }, []);

  // Responsive logo container
  const logoContainerStyle = useMemo(() => {
    if (isMobile) {
      return {
        marginBottom: scale(12),
        alignItems: 'center',
      };
    }
    return {
      marginRight: responsiveValue(12, 16, 20),
      alignItems: 'flex-start',
    };
  }, []);

  // Responsive course info width
  const courseInfoWidth = useMemo(() => {
    if (isMobile) return '100%';
    return isDesktop ? '85%' : '80%';
  }, []);

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" backgroundColor="#0052A2" />

      {/* ---------- HEADER ---------- */}
      <View style={styles.headerWrapper}>
        <View style={[
          styles.header, 
          { 
            height: responsiveValue(
              Platform.OS === "ios" ? 52 : 64,
              Platform.OS === "ios" ? 60 : 72,
              Platform.OS === "ios" ? 68 : 80
            ),
            paddingHorizontal: responsiveValue(16, 24, 32)
          }
        ]}>
          <TouchableOpacity
            style={styles.backBtn}
            onPress={() => navigation.goBack()}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Ionicons
              name={Platform.OS === "ios" ? "chevron-back" : "arrow-back"}
              size={scale(24)}
              color="#fff"
            />
          </TouchableOpacity>

          <Text style={[styles.headerTitle, { fontSize: scale(18) }]}>
            Course Information
          </Text>
          <View style={{ width: scale(40) }} />
        </View>
      </View>

      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* ---------- TOP BANNER ---------- */}
        <ScrollView
          ref={bannerRef}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onMomentumScrollEnd={(e) =>
            setActiveIndex(Math.round(e.nativeEvent.contentOffset.x / windowWidth))
          }
        >
          {bannerAds.map((img, i) => (
            <Image
              key={i}
              source={{ uri: img }}
              style={{ 
                width: windowWidth, 
                height: responsiveValue(190,300, 260)
              }}
              resizeMode="cover"
            />
          ))}
        </ScrollView>

        {/* DOT INDICATORS */}
        <View style={[styles.dots, { marginBottom: responsiveValue(16, 20, 24) }]}>
          {bannerAds.map((_, i) => (
            <View
              key={i}
              style={[
                styles.dot, 
                activeIndex === i && styles.activeDot,
                {
                  width: scale(8),
                  height: scale(8),
                  marginHorizontal: scale(4)
                }
              ]}
            />
          ))}
        </View>

        {/* ---------- BODY ---------- */}
        <View style={[
          styles.container,
          { 
            paddingTop: responsiveValue(12, 16, 20),
            paddingBottom: responsiveValue(20, 24, 30)
          }
        ]}>
          {/* MODE TABS */}
          <View style={styles.tabsContainer}>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={[
                styles.tabs,
                { paddingHorizontal: responsiveValue(16, 24, 32) }
              ]}
            >
              {["All", "Offline", "Online"].map((t) => (
                <TouchableOpacity
                  key={t}
                  onPress={() => setSelectedMode(t)}
                  style={[
                    styles.tab,
                    { 
                      marginRight: responsiveValue(20, 24, 28),
                      paddingVertical: responsiveValue(8, 10, 12)
                    }
                  ]}
                >
                  <Text
                    style={[
                      styles.tabText,
                      { fontSize: responsiveValue(16, 18, 20) },
                      selectedMode === t && styles.activeTabText,
                    ]}
                  >
                    {t}
                  </Text>
                  {selectedMode === t && (
                    <View style={[
                      styles.underline,
                      { 
                        height: scale(2),
                        marginTop: scale(2)
                      }
                    ]} />
                  )}
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          {/* COURSE CARDS */}
          <View style={[
            styles.coursesContainer,
            { 
              paddingHorizontal: responsiveValue(16, 24, 32),
              gap: responsiveValue(12, 16, 20)
            }
          ]}>
            {coursesData.map((course) => {
              const displayedCourses = course.offered.filter((off) =>
                selectedMode === "All"
                  ? true
                  : off.mode.toLowerCase().includes(selectedMode.toLowerCase())
              );

              return (
                <TouchableOpacity
                  key={course.id}
                  activeOpacity={0.85}
                  style={[
                    styles.courseBlock,
                    courseCardLayout,
                    {
                      marginBottom: 0, // margin handled by gap
                      borderRadius: scale(10),
                      maxWidth: isDesktop ? 1200 : '100%',
                      alignSelf: isDesktop ? 'center' : 'stretch',
                    }
                  ]}
                  onPress={() => navigation.navigate("Course4", { course })}
                >
                  <View style={[styles.logoCard, logoContainerStyle]}>
                    <Image 
                      source={course.logo} 
                      style={[styles.logo, logoSize]} 
                      resizeMode="contain"
                    />
                  </View>

                  <View style={[styles.courseInfo, { width: courseInfoWidth }]}>
                    <Text style={[
                      styles.provider,
                      { fontSize: responsiveValue(16, 18, 20) }
                    ]}>
                      {course.provider}
                    </Text>

                    <Text style={[
                      styles.offeredLine,
                      { 
                        fontSize: responsiveValue(14, 15, 16),
                        marginVertical: responsiveValue(4, 6, 8)
                      }
                    ]} numberOfLines={2}>
                      <Text style={{ fontWeight: "700" }}>Courses Offered: </Text>
                      {displayedCourses.map((c) => c.name).join(", ")}
                    </Text>

                    <View style={[
                      styles.detailsContainer,
                      { marginBottom: responsiveValue(8, 10, 12) }
                    ]}>
                      <Text style={[
                        styles.mode,
                        { fontSize: responsiveValue(14, 15, 16) }
                      ]}>
                        <Text style={{ fontWeight: "700" }}>Mode: </Text>
                        {selectedMode === "All" ? course.mode : selectedMode}
                      </Text>

                      <Text style={[
                        styles.website,
                        { fontSize: responsiveValue(14, 15, 16) }
                      ]}>
                        <Text style={{ fontWeight: "700" }}>Website: </Text>
                        {course.website}
                      </Text>
                    </View>

                    <View style={[
                      styles.footerRow,
                      { 
                        gap: responsiveValue(8, 12, 16),
                        flexWrap: isMobile ? 'wrap' : 'nowrap'
                      }
                    ]}>
                      <View style={styles.footerItemContainer}>
                        <Text style={[
                          styles.footerItem,
                          { fontSize: responsiveValue(12, 13, 14) }
                        ]}>
                          📄 Certificate
                        </Text>
                      </View>
                      <View style={styles.footerItemContainer}>
                        <Text style={[
                          styles.footerItem,
                          { fontSize: responsiveValue(12, 13, 14) }
                        ]}>
                          🛠 Technical Training
                        </Text>
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* ---------- VIDEO AD ---------- */}
        <View style={[
          styles.videoBox,
          { 
            marginHorizontal: responsiveValue(16, 24, 32),
            marginTop: responsiveValue(20, 24, 30),
            marginBottom: responsiveValue(80, 100, 120),
            height: responsiveValue(220, 300, 300),
            borderRadius: scale(12),
          }
        ]}>
          <WebView
            allowsFullscreenVideo
            source={{ uri: "https://www.youtube.com/embed/NONufn3jgXI" }}
            style={{ flex: 1 }}
          />
        </View>
      </ScrollView>

      <Footer />
    </SafeAreaView>
  );
}

/* ---------------- STYLES ---------------- */
const styles = StyleSheet.create({
  safe: { 
    flex: 1, 
    backgroundColor: "#fff",
    maxWidth: isDesktop ? 1400 : '100%',
    alignSelf: 'center',
    width: '100%'
  },

  scrollContent: {
    paddingBottom: responsiveValue(80, 100, 120),
  },

  headerWrapper: { 
    backgroundColor: "#0052A2",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 4,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  backBtn: { 
    alignItems: 'flex-start',
    padding: scale(4),
  },
  headerTitle: {
    fontWeight: "700",
    color: "#fff",
    textAlign: "center",
    flex: 1,
  },

  dots: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: scale(8),
  },
  dot: {
    borderRadius: scale(4),
    backgroundColor: "#ccc",
  },
  activeDot: {
    width: scale(16),
    backgroundColor: "#0B5ED7",
  },

  container: { 
    backgroundColor: "#FAFAFA",
    flex: 1,
  },

  tabsContainer: {
    marginBottom: responsiveValue(16, 20, 24),
  },
  tabs: { 
    flexDirection: "row",
  },
  tab: { 
    alignItems: "center",
  },
  tabText: { 
    color: "#555",
    fontWeight: "500",
  },
  activeTabText: { 
    color: "#007BFF", 
    fontWeight: "700" 
  },
  underline: { 
    backgroundColor: "#007BFF", 
    width: "100%",
  },

  coursesContainer: {
    flex: 1,
  },

  courseBlock: {
    backgroundColor: "#fff",
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: scale(4),
    shadowOffset: { width: 0, height: scale(2) },
  },

  logoCard: {
    justifyContent: "center",
  },
  logo: {
    resizeMode: "contain",
  },

  courseInfo: {
    flex: 1,
  },
  provider: { 
    fontWeight: "700", 
    color: "#007BFF",
    marginBottom: responsiveValue(4, 6, 8),
  },
  offeredLine: { 
    color: "#1F6FC4",
    lineHeight: scale(20),
  },
  detailsContainer: {
    flexDirection: 'column',
    gap: responsiveValue(4, 6, 8),
  },
  mode: { color: "#333" },
  website: { color: "#333" },

  footerRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  footerItemContainer: {
    backgroundColor: "#F0F8FF",
    paddingHorizontal: responsiveValue(8, 10, 12),
    paddingVertical: responsiveValue(4, 5, 6),
    borderRadius: scale(6),
  },
  footerItem: { 
    color: "#555",
  },

  videoBox: {
    overflow: "hidden",
    backgroundColor: "#000",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
});