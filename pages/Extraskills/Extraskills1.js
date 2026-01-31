import React, { useRef, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Platform,
  StatusBar,
  SafeAreaView,
  Image,
  ScrollView,
  useWindowDimensions,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { WebView } from "react-native-webview";
import Footer from "../../src/components/Footer";

/* ---------------- BANNER ADS ---------------- */
const bannerAds = [
  "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1200&h=400&fit=crop",
  "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=1200&h=400&fit=crop",
  "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=1200&h=400&fit=crop",
];

/* ---------------- EXTRA SKILLS DATA ---------------- */
const activities = [
  {
    id: 1,
    title: "Fine Arts",
    icon: "palette",
    sections: [
      {
        title: "Dance Classes",
        items: [
          "Classical Dance",
          "Western Dance",
          "Folk Dance",
          "Zumba / Fitness Dance",
          "Freestyle & Choreography Training",
        ],
      },
      {
        title: "Music Classes",
        items: [
          "Classical Vocal",
          "Western Vocal",
          "Devotional / Bhajan Singing",
          "Folk Music Singing",
          "Voice Culture & Training",
        ],
      },
      {
        title: "Drawing Classes",
        items: [
          "Basic Drawing & Sketching",
          "Creative Art & Imagination Drawing",
          "Thematic & Subject Drawing",
          "Professional Art Techniques",
          "Art for School & Hobby",
        ],
      },
    ],
  },
  {
    id: 2,
    title: "Driving Class",
    icon: "directions-car",
    sections: [
      {
        title: "Driving Lessons",
        items: [
          "Two Wheeler",
          "Four Wheeler",
          "Heavy Vehicle",
          "Driving Rules",
          "Practical Lessons",
        ],
      },
    ],
  },
  {
    id: 3,
    title: "Athlete",
    icon: "directions-run",
    sections: [
      {
        title: "Athletics",
        items: [
          "Track Running",
          "Marathon Prep",
          "High Jump",
          "Long Jump",
        ],
      },
    ],
  },
  {
    id: 4,
    title: "Sports & Fitness",
    icon: "sports-soccer",
    sections: [
      {
        title: "Sports",
        items: ["Football", "Cricket", "Yoga", "Gym", "Swimming"],
      },
    ],
  },
  {
    id: 5,
    title: "Home Science",
    icon: "local-laundry-service",
    sections: [
      {
        title: "Home Science",
        items: [
          "Cooking",
          "Sewing",
          "Home Management",
          "Interior Design",
        ],
      },
    ],
  },
  {
    id: 6,
    title: "Other Classes",
    icon: "library-music",
    sections: [
      {
        title: "Unique Classes",
        items: [
          "Music Production",
          "Creative Writing",
          "Photography",
          "Film Making",
        ],
      },
    ],
  },
];

export default function Extraskills1({ navigation }) {
  const bannerRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
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
    const padding = responsiveValue(12, 16, 20);
    const gap = responsiveValue(8, 12, 16);
    const availableWidth = screenWidth - (padding * 2);
    const totalGap = gap * (numColumns - 1);
    return (availableWidth - totalGap) / numColumns;
  };

  /* AUTO SCROLL BANNERS */
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

  const renderItem = ({ item }) => (
    <TouchableOpacity
      activeOpacity={0.85}
      style={[
        styles.card,
        { 
          width: cardWidth(),
          marginBottom: responsiveValue(14, 16, 20),
          borderRadius: responsiveValue(14, 16, 18),
          padding: responsiveValue(14, 16, 18),
        }
      ]}
      onPress={() =>
        navigation.navigate("Extraskills2", {
          categoryTitle: item.title,
          sections: item.sections,
        })
      }
    >
      {/* ICON WITH GRADIENT */}
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
        <Icon name={item.icon} size={scale(26)} color="#fff" />
      </LinearGradient>

      <Text style={[
        styles.title,
        { fontSize: responsiveValue(15, 16, 17) }
      ]}>
        {item.title}
      </Text>

      <Text style={[
        styles.description,
        { fontSize: responsiveValue(11, 12, 13) }
      ]}>
        Explore creative and practical skill development programs
      </Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0052A2" />

      {/* HEADER */}
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

        {/* ===== EXTRA SKILLS GRID ===== */}
        <FlatList
          data={activities}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          numColumns={numColumns}
          columnWrapperStyle={[
            styles.row,
            { 
              paddingHorizontal: responsiveValue(12, 16, 20),
              justifyContent: 'space-between',
              marginBottom: responsiveValue(8, 12, 16),
            }
          ]}
          contentContainerStyle={styles.list}
          scrollEnabled={false}
          key={numColumns} // Re-render when columns change
        />

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

/* ---------------- RESPONSIVE STYLES ---------------- */
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

  list: {
    paddingVertical: responsiveValue(12, 16, 20),
  },

  row: {
    // Inline styles handle responsive values
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

  title: {
    fontWeight: "700",
    color: "#004780",
    textAlign: "center",
    marginBottom: 6,
  },

  description: {
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

// Helper function for responsive values in StyleSheet
function responsiveValue(mobile, tablet, desktop) {
  // This needs to be called in component, so using inline styles for dynamic values
  return mobile;
}