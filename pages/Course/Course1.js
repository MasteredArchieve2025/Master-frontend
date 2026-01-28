import React, { useRef, useEffect, useState, useMemo } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Platform,
  StatusBar,
  SafeAreaView,
  Dimensions,
  Image,
  ScrollView,
  useWindowDimensions,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { WebView } from "react-native-webview";
import Footer from "../../src/components/Footer";

const { width, height } = Dimensions.get("window");

/* ---------------- RESPONSIVE UTILITIES ---------------- */
const isMobile = width < 768;
const isTablet = width >= 768 && width < 1024;
const isDesktop = width >= 1024;

// Responsive scaling function
const scale = (size) => {
  if (isDesktop) return size * 1.2;
  if (isTablet) return size * 1.1;
  return size;
};

// Responsive padding/margin
const responsiveValue = (mobile, tablet, desktop) => {
  if (isDesktop) return desktop;
  if (isTablet) return tablet;
  return mobile;
};

/* ---------------- BANNER ADS ---------------- */
const bannerAds = [
  "https://images.unsplash.com/photo-1516321318423-f06f85e504b3",
  "https://images.unsplash.com/photo-1509062522246-3755977927d7",
  "https://images.unsplash.com/photo-1551650975-87deedd944c3",
];

/* ---------------- DATA ---------------- */
const activities = [
  {
    id: 1,
    title: "Computer & IT",
    icon: "laptop",
    sections: [{ title: "Computer & IT", items: ["Web Development","Python Programming","Data Science","Cybersecurity","Cloud Computing"] }],
  },
  {
    id: 2,
    title: "Health Science",
    icon: "heartbeat",
    sections: [{ title: "Health Science", items: ["Nursing Fundamentals","Public Health","Nutrition & Dietetics","Medical Terminology","First Aid & CPR"] }],
  },
  {
    id: 3,
    title: "Business & Management",
    icon: "briefcase",
    sections: [{ title: "Business & Management", items: ["Digital Marketing","Business Analytics","Project Management","Finance Fundamentals","Entrepreneurship"] }],
  },
  {
    id: 4,
    title: "Language & Communication",
    icon: "language",
    sections: [{ title: "Language & Communication", items: ["English Grammar & Writing","Public Speaking","Business Communication","French for Beginners","Creative Writing"] }],
  },
  {
    id: 5,
    title: "Engineering & Technical",
    icon: "cogs",
    sections: [{ title: "Engineering & Technical", items: ["Mechanical Engineering Basics","Electrical Systems","Civil Engineering","Robotics","3D Printing & CAD Design"] }],
  },
  {
    id: 6,
    title: "Arts & Design",
    icon: "paint-brush",
    sections: [{ title: "Arts & Design", items: ["UI/UX Design","Graphic Design","Animation","Photography","Interior Design"] }],
  },
  {
    id: 7,
    title: "Lifestyle & Personal Development",
    icon: "user",
    sections: [{ title: "Lifestyle & Personal Development", items: ["Time Management","Mindfulness & Meditation","Fitness & Wellness","Personal Finance","Goal Setting"] }],
  },
];

export default function Course1({ navigation }) {
  const bannerRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const { width: windowWidth } = useWindowDimensions();

  /* AUTO SCROLL */
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
    if (isDesktop) return 4;
    if (isTablet) return 3;
    return 2;
  }, []);

  // Calculate card width based on columns
  const cardWidth = useMemo(() => {
    const padding = responsiveValue(12, 16, 24);
    const gap = responsiveValue(8, 12, 16);
    const availableWidth = windowWidth - (padding * 2);
    return (availableWidth - (gap * (numColumns - 1))) / numColumns;
  }, [windowWidth, numColumns]);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      activeOpacity={0.85}
      style={[styles.card, { width: cardWidth }]}
      onPress={() =>
        navigation.navigate("Course2", {
          sections: item.sections,
        })
      }
    >
      <LinearGradient 
        colors={["#2295D2", "#284598"]} 
        style={[
          styles.iconContainer,
          { 
            width: scale(56),
            height: scale(56),
            borderRadius: scale(28)
          }
        ]}
      >
        <Icon name={item.icon} size={scale(26)} color="#fff" />
      </LinearGradient>

      <Text style={[styles.title, { fontSize: scale(15) }]} numberOfLines={2}>
        {item.title}
      </Text>
      <Text style={[styles.description, { fontSize: scale(11) }]} numberOfLines={2}>
        Explore courses and skill development programs
      </Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" backgroundColor="#0052A2" />

      {/* HEADER */}
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
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
            <Ionicons
              name={Platform.OS === "ios" ? "chevron-back" : "arrow-back"}
              size={scale(24)}
              color="#fff"
            />
          </TouchableOpacity>

          <Text style={[styles.headerTitle, { fontSize: scale(18) }]}>
            Courses
          </Text>
          <View style={{ width: scale(40) }} />
        </View>
      </View>

      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: responsiveValue(80, 100, 120) }}
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
                height: responsiveValue(190, 300, 260) 
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
                {
                  width: scale(8),
                  height: scale(8),
                  marginHorizontal: scale(4)
                }
              ]}
            />
          ))}
        </View>

        {/* ===== COURSE GRID ===== */}
        <FlatList
          data={activities}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          numColumns={numColumns}
          scrollEnabled={false}
          contentContainerStyle={[
            styles.list,
            { 
              padding: responsiveValue(12, 16, 24),
              gap: responsiveValue(8, 12, 16)
            }
          ]}
          columnWrapperStyle={numColumns > 1 ? styles.row : null}
        />

        {/* ===== VIDEO AD ===== */}
        <View style={[
          styles.videoBox,
          { 
            marginHorizontal: responsiveValue(16, 24, 32),
            marginTop: responsiveValue(30, 40, 50),
            height: responsiveValue(220, 300, 300)
          }
        ]}>
          <WebView
            allowsFullscreenVideo
            source={{ uri: "https://www.youtube.com/watch?v=NONufn3jgXI" }}
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
    width: scale(40),
    alignItems: 'flex-start'
  },
  headerTitle: {
    textAlign: "center",
    fontWeight: "700",
    color: "#fff",
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

  list: {
    flexGrow: 1,
  },

  row: {
    justifyContent: "space-between",
    gap: responsiveValue(8, 12, 16),
    marginBottom: responsiveValue(14, 16, 20),
  },

  card: {
    backgroundColor: "#fff",
    borderRadius: scale(14),
    padding: scale(16),
    alignItems: "center",
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: scale(4),
    shadowOffset: { width: 0, height: scale(2) },
    ...(isDesktop && {
      minHeight: scale(180),
    }),
  },

  iconContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: scale(10),
  },

  title: {
    fontWeight: "700",
    color: "#004780",
    textAlign: "center",
    marginBottom: scale(6),
  },

  description: {
    color: "#555",
    textAlign: "center",
    lineHeight: scale(16),
  },

  videoBox: {
    borderRadius: scale(12),
    overflow: "hidden",
    backgroundColor: "#000",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
    
  },
});