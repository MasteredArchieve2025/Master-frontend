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
  useWindowDimensions,
} from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { WebView } from "react-native-webview";
import { useNavigation, useRoute } from "@react-navigation/native";
import Footer from "../../src/components/Footer";

/* ---------- BANNER ADS ---------- */
const bannerAds = [
  "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1200&h=400&fit=crop",
  "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=1200&h=400&fit=crop",
  "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=1200&h=400&fit=crop",
];

/* ---------- ICON + DESCRIPTION MAP ---------- */
const skillMeta = {
  "Classical Dance": { icon: "dance-ballroom", desc: "Learn traditional dance forms" },
  "Western Dance": { icon: "dance-pole", desc: "Modern and freestyle dance styles" },
  "Folk Dance": { icon: "dance-circle", desc: "Cultural and folk traditions" },
  "Zumba / Fitness Dance": { icon: "run", desc: "Fitness through dance" },
  "Freestyle & Choreography Training": { icon: "music-note", desc: "Creative movement training" },

  "Classical Vocal": { icon: "music-clef-treble", desc: "Traditional vocal training" },
  "Western Vocal": { icon: "microphone", desc: "Western singing techniques" },
  "Devotional / Bhajan Singing": { icon: "account-music", desc: "Spiritual vocal practice" },
  "Folk Music Singing": { icon: "music", desc: "Folk music traditions" },
  "Voice Culture & Training": { icon: "account-voice", desc: "Improve voice quality" },

  "Basic Drawing & Sketching": { icon: "pencil", desc: "Drawing fundamentals" },
  "Creative Art & Imagination Drawing": { icon: "lightbulb-outline", desc: "Creative expression" },
  "Thematic & Subject Drawing": { icon: "draw", desc: "Concept-based art" },
  "Professional Art Techniques": { icon: "palette", desc: "Advanced art skills" },
  "Art for School & Hobby": { icon: "school-outline", desc: "Art for students & hobbyists" },

  "Two Wheeler": { icon: "motorbike", desc: "Bike driving skills" },
  "Four Wheeler": { icon: "car", desc: "Car driving training" },
  "Heavy Vehicle": { icon: "truck", desc: "Heavy vehicle driving" },
  "Driving Rules": { icon: "road-variant", desc: "Traffic rules & safety" },
  "Practical Lessons": { icon: "steering", desc: "Hands-on driving practice" },

  "Track Running": { icon: "run-fast", desc: "Speed and endurance training" },
  "Marathon Prep": { icon: "run", desc: "Long-distance running prep" },
  "High Jump": { icon: "arrow-expand-up", desc: "Jumping techniques" },
  "Long Jump": { icon: "arrow-expand-horizontal", desc: "Distance jumping skills" },

  Football: { icon: "soccer", desc: "Football skills training" },
  Cricket: { icon: "cricket", desc: "Cricket coaching" },
  Yoga: { icon: "yoga", desc: "Mind & body wellness" },
  Gym: { icon: "dumbbell", desc: "Strength & fitness training" },
  Swimming: { icon: "swim", desc: "Swimming techniques" },

  Cooking: { icon: "chef-hat", desc: "Cooking fundamentals" },
  Sewing: { icon: "needle", desc: "Stitching & tailoring" },
  "Home Management": { icon: "home-outline", desc: "Household management" },
  "Interior Design": { icon: "floor-plan", desc: "Interior design basics" },

  "Music Production": { icon: "music-box", desc: "Create and mix music" },
  "Creative Writing": { icon: "pencil-outline", desc: "Writing & storytelling" },
  Photography: { icon: "camera", desc: "Photography skills" },
  "Film Making": { icon: "movie-open", desc: "Film creation basics" },
};

export default function Extraskills2() {
  const navigation = useNavigation();
  const route = useRoute();
  const sections = route?.params?.sections || [];
  
  const { width: screenWidth, height: screenHeight } = useWindowDimensions();
  
  // Responsive breakpoints
  const isMobile = screenWidth < 768;
  const isTablet = screenWidth >= 768 && screenWidth < 1024;
  const isDesktop = screenWidth >= 1024;
  const isWeb = Platform.OS === 'web';
  
  // Responsive value helper
  const responsiveValue = (mobile, tablet, desktop) => {
    if (isDesktop) return desktop;
    if (isTablet) return tablet;
    return mobile;
  };

  // Responsive scaling helper
  const scale = (size) => {
    if (isDesktop) return size * 1.2;
    if (isTablet) return size * 1.1;
    return size;
  };

  // Responsive ad banner height
  const adHeight = responsiveValue(
    200,  // Mobile
    300,  // Tablet
    260   // Desktop
  );

  // Responsive video height
  const videoHeight = responsiveValue(
    220,  // Mobile
    300,  // Tablet
    320   // Desktop
  );

  // Calculate columns based on screen size
  const numColumns = isDesktop ? 3 : (isTablet ? 2 : 2);

  // Calculate card width
  const cardWidth = () => {
    const padding = responsiveValue(16, 20, 24);
    const gap = responsiveValue(8, 12, 16);
    const availableWidth = screenWidth - (padding * 2);
    const totalGap = gap * (numColumns - 1);
    return (availableWidth - totalGap) / numColumns;
  };

  const bannerRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  /* AUTO SCROLL ADS */
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => {
        const next = (prev + 1) % bannerAds.length;
        bannerRef.current?.scrollTo({ 
          x: next * screenWidth, 
          animated: true 
        });
        return next;
      });
    }, 3000);
    return () => clearInterval(timer);
  }, [screenWidth]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0052A2" />

      {/* ===== HEADER ===== */}
      <View style={[
        styles.header,
        { 
          height: responsiveValue(
            Platform.OS === 'ios' ? 52 : 64,
            Platform.OS === 'ios' ? 60 : 72,
            Platform.OS === 'ios' ? 68 : 80
          ),
          paddingHorizontal: responsiveValue(16, 24, 32),
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

        <Text style={[
          styles.headerTitle,
          { fontSize: responsiveValue(18, 20, 22) }
        ]}>
          Extra Skills
        </Text>
        <View style={{ width: scale(40) }} />
      </View>

      <ScrollView 
        showsVerticalScrollIndicator={isWeb}
        contentContainerStyle={[
          styles.scrollContent,
          { paddingBottom: responsiveValue(120, 140, 160) }
        ]}
      >
        {/* ===== TOP BANNER ADS ===== */}
        <ScrollView
          ref={bannerRef}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onMomentumScrollEnd={(e) =>
            setActiveIndex(Math.round(e.nativeEvent.contentOffset.x / screenWidth))
          }
        >
          {bannerAds.map((img, i) => (
            <Image
              key={i}
              source={{ uri: img }}
              style={{ 
                width: screenWidth, 
                height: adHeight 
              }}
              resizeMode="cover"
            />
          ))}
        </ScrollView>

        {/* DOTS */}
        <View style={[
          styles.dots,
          { marginVertical: responsiveValue(8, 10, 12) }
        ]}>
          {bannerAds.map((_, i) => (
            <View
              key={i}
              style={[
                styles.dot,
                { 
                  width: scale(8),
                  height: scale(8),
                  marginHorizontal: scale(4),
                },
                activeIndex === i && styles.activeDot,
              ]}
            />
          ))}
        </View>

        {/* ===== SECTIONS ===== */}
        {sections.map((section, idx) => (
          <View key={idx}>
            {/* Section Header */}
            <View style={[
              styles.sectionHeader,
              { 
                margin: responsiveValue(16, 20, 24),
                borderRadius: responsiveValue(14, 16, 18),
                paddingVertical: responsiveValue(14, 16, 18),
              }
            ]}>
              <Text style={[
                styles.sectionTitle,
                { fontSize: responsiveValue(18, 20, 22) }
              ]}>
                {section.title}
              </Text>
            </View>

            {/* Skill Cards */}
            <View style={[
              styles.cardGrid,
              { 
                paddingHorizontal: responsiveValue(16, 20, 24),
                gap: responsiveValue(8, 12, 16),
              }
            ]}>
              {section.items.map((item, i) => {
                const meta = skillMeta[item] || {
                  icon: "book-open-variant",
                  desc: "Explore this skill",
                };

                return (
                  <TouchableOpacity
                    key={i}
                    activeOpacity={0.85}
                    style={[
                      styles.card,
                      { 
                        width: cardWidth(),
                        borderRadius: responsiveValue(14, 16, 18),
                        padding: responsiveValue(14, 16, 18),
                        marginBottom: responsiveValue(12, 14, 16),
                      }
                    ]}
                    onPress={() =>
                      navigation.navigate("Extraskills3", { category: item })
                    }
                  >
                    <LinearGradient
                      colors={["#2295D2", "#284598"]}
                      style={[
                        styles.iconContainer,
                        { 
                          width: responsiveValue(56, 64, 72),
                          height: responsiveValue(56, 64, 72),
                          borderRadius: responsiveValue(28, 32, 36),
                          marginBottom: responsiveValue(10, 12, 14),
                        }
                      ]}
                    >
                      <MaterialCommunityIcons
                        name={meta.icon}
                        size={scale(26)}
                        color="#fff"
                      />
                    </LinearGradient>

                    <Text style={[
                      styles.cardTitle,
                      { fontSize: responsiveValue(15, 16, 17) }
                    ]}>
                      {item}
                    </Text>
                    <Text style={[
                      styles.cardDesc,
                      { fontSize: responsiveValue(11, 12, 13) }
                    ]}>
                      {meta.desc}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        ))}

        {/* ===== VIDEO AD ===== */}
        <View style={[
          styles.videoBox,
          { 
            marginHorizontal: responsiveValue(16, 24, 32),
            marginTop: responsiveValue(30, 35, 40),
            borderRadius: responsiveValue(12, 14, 16),
          }
        ]}>
          {isWeb ? (
            <iframe
              width="100%"
              height="100%"
              src="https://www.youtube.com/embed/NONufn3jgXI?rel=0&showinfo=0&modestbranding=1"
              title="Extra Skills Video"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              style={styles.videoIframe}
            />
          ) : (
            <WebView
              allowsFullscreenVideo
              source={{ uri: "https://www.youtube.com/embed/NONufn3jgXI" }}
              style={{ height: videoHeight }}
            />
          )}
        </View>

        {/* Spacer for footer */}
        <View style={{ height: responsiveValue(100, 120, 140) }} />
      </ScrollView>

      <Footer />
    </SafeAreaView>
  );
}

/* ---------- RESPONSIVE STYLES ---------- */
const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: "#fff" 
  },

  scrollContent: {
    flexGrow: 1,
  },

  header: {
    backgroundColor: "#0052A2",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 4,
      },
      android: {
        elevation: 6,
      },
      web: {
        boxShadow: "0 4px 12px rgba(0, 82, 162, 0.3)",
      },
    }),
  },

  backBtn: { 
    padding: 4,
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
  },

  dot: {
    borderRadius: 4,
    backgroundColor: "#ccc",
    transition: "all 0.3s ease",
  },

  activeDot: {
    backgroundColor: "#0B5ED7",
  },

  sectionHeader: {
    backgroundColor: "#CFE5FA",
    alignItems: "center",
  },

  sectionTitle: {
    fontWeight: "700",
    color: "#0B5AA7",
  },

  cardGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: 'space-between',
  },

  card: {
    backgroundColor: "#fff",
    alignItems: "center",
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOpacity: 0.08,
        shadowRadius: 4,
        shadowOffset: { width: 0, height: 2 },
      },
      android: {
        elevation: 3,
      },
      web: {
        boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
        transition: "all 0.3s ease",
        cursor: "pointer",
        ":hover": {
          transform: "translateY(-4px)",
          boxShadow: "0 8px 20px rgba(0,0,0,0.12)",
        },
      },
    }),
  },

  iconContainer: {
    justifyContent: "center",
    alignItems: "center",
  },

  cardTitle: {
    fontWeight: "700",
    color: "#004780",
    textAlign: "center",
    marginBottom: 6,
  },

  cardDesc: {
    color: "#555",
    textAlign: "center",
  },

  videoBox: {
    overflow: "hidden",
    backgroundColor: "#000",
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 8,
        shadowOffset: { width: 0, height: 4 },
      },
      android: {
        elevation: 6,
      },
      web: {
        boxShadow: "0 8px 32px rgba(0,0,0,0.25)",
      },
    }),
  },

  videoIframe: {
    border: "none",
    borderRadius: 12,
    width: "100%",
    backgroundColor: "#000",
  },
});