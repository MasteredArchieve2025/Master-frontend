import React, { useRef, useEffect, useState, useMemo } from "react";
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
  useWindowDimensions,
} from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { WebView } from "react-native-webview";
import { LinearGradient } from "expo-linear-gradient";
import Footer from "../../src/components/Footer";

const { width, height } = Dimensions.get("window");

/* ---------- RESPONSIVE UTILITIES ---------- */
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

/* ---------- BANNER ADS ---------- */
const bannerAds = [
  "https://images.unsplash.com/photo-1516321318423-f06f85e504b3",
  "https://images.unsplash.com/photo-1509062522246-3755977927d7",
  "https://images.unsplash.com/photo-1551650975-87deedd944c3",
];

/* ---------- ICON + DESCRIPTION MAP ---------- */
const courseMeta = {
  "Web Development": {
    icon: "web",
    desc: "Build modern websites and web apps",
  },
  "Python Programming": {
    icon: "language-python",
    desc: "Learn Python for real-world applications",
  },
  "Data Science": {
    icon: "chart-line",
    desc: "Analyze data and build insights",
  },
  "Cybersecurity": {
    icon: "shield-lock",
    desc: "Protect systems from digital threats",
  },
  "Cloud Computing": {
    icon: "cloud",
    desc: "Master cloud services and deployment",
  },
  "Nursing Fundamentals": {
    icon: "medical-bag",
    desc: "Essential skills for nursing professionals",
  },
  "Public Health": {
    icon: "hospital",
    desc: "Community health and disease prevention",
  },
  "Nutrition & Dietetics": {
    icon: "food-apple",
    desc: "Science of nutrition and healthy eating",
  },
  "Medical Terminology": {
    icon: "clipboard-pulse",
    desc: "Learn medical language and terms",
  },
  "First Aid & CPR": {
    icon: "heart-pulse",
    desc: "Emergency response and life-saving techniques",
  },
  "Digital Marketing": {
    icon: "bullhorn",
    desc: "Online marketing strategies and tools",
  },
  "Business Analytics": {
    icon: "chart-bar",
    desc: "Data-driven business decision making",
  },
  "Project Management": {
    icon: "clipboard-check",
    desc: "Plan and execute projects successfully",
  },
  "Finance Fundamentals": {
    icon: "finance",
    desc: "Understand finance & accounting basics",
  },
  "Entrepreneurship": {
    icon: "lightbulb-on",
    desc: "Start and grow your own business",
  },
  "English Grammar & Writing": {
    icon: "pencil",
    desc: "Master English language skills",
  },
  "Public Speaking": {
    icon: "microphone",
    desc: "Confident communication and presentation",
  },
  "Business Communication": {
    icon: "email",
    desc: "Professional communication in business",
  },
  "French for Beginners": {
    icon: "translate",
    desc: "Start learning French language basics",
  },
  "Creative Writing": {
    icon: "book-open",
    desc: "Develop storytelling and writing skills",
  },
  "Mechanical Engineering Basics": {
    icon: "cog",
    desc: "Fundamentals of mechanical systems",
  },
  "Electrical Systems": {
    icon: "flash",
    desc: "Understanding electrical circuits",
  },
  "Civil Engineering": {
    icon: "home-city",
    desc: "Infrastructure and construction principles",
  },
  "Robotics": {
    icon: "robot",
    desc: "Design and program robots",
  },
  "3D Printing & CAD Design": {
    icon: "cube",
    desc: "Create 3D models and prototypes",
  },
  "UI/UX Design": {
    icon: "palette",
    desc: "Design user-friendly digital interfaces",
  },
  "Graphic Design": {
    icon: "brush",
    desc: "Visual communication and design",
  },
  "Animation": {
    icon: "movie",
    desc: "Bring characters and stories to life",
  },
  "Photography": {
    icon: "camera",
    desc: "Master the art of photography",
  },
  "Interior Design": {
    icon: "sofa",
    desc: "Create beautiful living spaces",
  },
  "Time Management": {
    icon: "clock",
    desc: "Maximize productivity and efficiency",
  },
  "Mindfulness & Meditation": {
    icon: "yoga",
    desc: "Stress reduction and mental wellness",
  },
  "Fitness & Wellness": {
    icon: "dumbbell",
    desc: "Physical health and exercise routines",
  },
  "Personal Finance": {
    icon: "wallet",
    desc: "Money management and financial planning",
  },
  "Goal Setting": {
    icon: "target",
    desc: "Achieve your personal and professional goals",
  },
};

export default function Course2({ route, navigation }) {
  const sections = route?.params?.sections || [];
  const bannerRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const { width: windowWidth } = useWindowDimensions();

  /* AUTO SCROLL ADS */
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => {
        const next = (prev + 1) % bannerAds.length;
        bannerRef.current?.scrollTo({ x: next * windowWidth, animated: true });
        return next;
      });
    }, 3000);
    return () => clearInterval(timer);
  }, [windowWidth]);

  // Calculate columns based on screen size
  const numColumns = useMemo(() => {
    if (isDesktop) return 3;
    if (isTablet) return 2;
    return 2; // Changed from 1 to 2 for mobile
  }, []);

  // Calculate card width
  const cardWidth = useMemo(() => {
    const padding = responsiveValue(16, 24, 32);
    const gap = responsiveValue(12, 16, 20);
    const availableWidth = windowWidth - (padding * 2);
    
    // For all screen sizes, divide available width by number of columns
    return (availableWidth - (gap * (numColumns - 1))) / numColumns;
  }, [windowWidth, numColumns]);

  // Responsive card layout
  const cardLayout = useMemo(() => {
    // Always use column layout for all screen sizes
    return {
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'flex-start',
    };
  }, [numColumns]);

  // Responsive icon container
  const iconContainerStyle = useMemo(() => {
    const size = responsiveValue(56, 64, 72);
    return {
      width: size,
      height: size,
      borderRadius: size / 2,
      marginBottom: scale(10), // Always add bottom margin
      marginRight: 0, // No right margin since we're using column layout
    };
  }, [numColumns]);

  // Responsive text container
  const textContainerStyle = useMemo(() => {
    return {
      // Center align for all screen sizes
      alignItems: 'center',
    };
  }, [numColumns]);

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" backgroundColor="#0052A2" />

      {/* ===== HEADER ===== */}
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
            onPress={() => navigation.goBack()} 
            style={styles.backBtn}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Ionicons
              name={Platform.OS === "ios" ? "chevron-back" : "arrow-back"}
              size={scale(24)}
              color="#fff"
            />
          </TouchableOpacity>

          <Text style={[styles.headerTitle, { fontSize: scale(18) }]}>
            Course Details
          </Text>
          <View style={{ width: scale(40) }} />
        </View>
      </View>

      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* ===== TOP BANNER ADS ===== */}
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
                height: responsiveValue(190,300, 260),
              }}
              resizeMode="cover"
            />
          ))}
        </ScrollView>

        {/* DOTS */}
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

        {/* ===== SECTIONS ===== */}
        {sections.map((section, idx) => (
          <View key={idx} style={styles.sectionContainer}>
            {/* Section Title - Added extra spacing here */}
            <View style={[
              styles.sectionHeader,
              { 
                marginHorizontal: responsiveValue(16, 24, 32),
                paddingVertical: responsiveValue(14, 16, 18),
                borderRadius: scale(14),
                marginTop: idx === 0 ? responsiveValue(4, 8, 12) : responsiveValue(24, 28, 32),
              }
            ]}>
              <Text style={[
                styles.sectionTitle,
                { fontSize: responsiveValue(18, 22, 26) }
              ]}>
                {section.title}
              </Text>
            </View>

            {/* Add spacing between section header and cards */}
            <View style={{ height: responsiveValue(16, 20, 24) }} />

            {/* Cards Grid/List */}
            <View style={[
              styles.cardContainer,
              { 
                paddingHorizontal: responsiveValue(16, 24, 32),
                gap: responsiveValue(12, 16, 20),
                marginBottom: responsiveValue(20, 24, 30),
              }
            ]}>
              {section.items.map((item, i) => {
                const meta = courseMeta[item] || {
                  icon: "book-open-page-variant",
                  desc: "Explore this professional course",
                };

                return (
                  <TouchableOpacity
                    key={i}
                    activeOpacity={0.85}
                    style={[
                      styles.card,
                      { 
                        width: cardWidth,
                        ...cardLayout,
                        padding: responsiveValue(16, 18, 20),
                      }
                    ]}
                    onPress={() =>
                      navigation.navigate("Course3", { title: item })
                    }
                  >
                    {/* ===== LINEAR GRADIENT ICON ===== */}
                    <LinearGradient
                      colors={["#2295D2", "#284598"]}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 1 }}
                      style={[styles.iconContainer, iconContainerStyle]}
                    >
                      <MaterialCommunityIcons
                        name={meta.icon}
                        size={scale(26)}
                        color="#fff"
                      />
                    </LinearGradient>

                    <View style={[styles.textContainer, textContainerStyle]}>
                      <Text 
                        style={[
                          styles.cardTitle,
                          { 
                            fontSize: scale(15),
                            textAlign: 'center', // Always center align
                            marginBottom: scale(4),
                          }
                        ]}
                        numberOfLines={2}
                      >
                        {item}
                      </Text>
                      <Text 
                        style={[
                          styles.cardDesc,
                          { 
                            fontSize: scale(11),
                            textAlign: 'center', // Always center align
                          }
                        ]}
                        numberOfLines={2}
                      >
                        {meta.desc}
                      </Text>
                    </View>
                  </TouchableOpacity>
                );
              })}
            </View>

            {/* Extra spacing after each section */}
            <View style={{ 
              height: responsiveValue(12, 16, 20),
              marginBottom: responsiveValue(16, 20, 24) 
            }} />
          </View>
        ))}

        {/* ===== VIDEO AD ===== */}
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

/* ---------- STYLES ---------- */
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
    marginVertical: scale(8),
  },
  dot: {
    borderRadius: scale(4),
    backgroundColor: "#ccc",
  },
  activeDot: {
    width: scale(16),
    backgroundColor: "#0B5ED7",
  },

  sectionContainer: {
    // marginBottom handled individually for better control
  },

  sectionHeader: {
    backgroundColor: "#CFE5FA",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  sectionTitle: {
    fontWeight: "700",
    color: "#0B5AA7",
  },

  cardContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-start",
  },

  card: {
    backgroundColor: "#fff",
    borderRadius: scale(14),
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: scale(4),
    shadowOffset: { width: 0, height: scale(2) },
  },

  iconContainer: {
    justifyContent: "center",
    alignItems: "center",
  },

  textContainer: {
    overflow: 'hidden',
  },

  cardTitle: {
    fontWeight: "700",
    color: "#004780",
  },

  cardDesc: {
    color: "#555",
    lineHeight: scale(16),
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