import React, { useRef, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  ScrollView,
  useWindowDimensions,
  Platform,
  Dimensions,
  SafeAreaView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { WebView } from "react-native-webview";
import Footer from "../../src/components/Footer";

const { width: screenWidth } = Dimensions.get("window");
const isTablet = screenWidth >= 768;
const isWeb = screenWidth >= 1024;

/* ---------------- BANNER ADS ---------------- */
const bannerAds = [
  "https://images.unsplash.com/photo-1516321318423-f06f85e504b3",
  "https://images.unsplash.com/photo-1509062522246-3755977927d7",
  "https://images.unsplash.com/photo-1551650975-87deedd944c3",
];

/* ---------------- DATA ---------------- */
const courses = [
  {
    id: "1",
    title: "Full Stack Web Development",
    tag: "TRENDING",
    tagColor: "#E7F0FF",
    tagText: "#2563EB",
    duration: "4-8 weeks • Online",
  },
  {
    id: "2",
    title: "UI/UX Design Certification",
    tag: "RECOMMENDED",
    tagColor: "#E9F9EF",
    tagText: "#16A34A",
    duration: "6 weeks • Offline",
  },
  {
    id: "3",
    title: "Data Science",
    tag: "RECOMMENDED",
    tagColor: "#E9F9EF",
    tagText: "#16A34A",
    duration: "6 weeks • Offline",
  },
  {
    id: "4",
    title: "Cyber Security",
    tag: "RECOMMENDED",
    tagColor: "#E9F9EF",
    tagText: "#16A34A",
    duration: "6 weeks • Offline",
  },
];

export default function Collegecourse2({ navigation }) {
  const { width } = useWindowDimensions();
  const bannerWidth = isWeb ? Math.min(width, 1200) : width;

  const bannerRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  /* -------- AUTO SCROLL BANNER -------- */
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => {
        const next = (prev + 1) % bannerAds.length;
        bannerRef.current?.scrollTo({
          x: next * bannerWidth,
          animated: true,
        });
        return next;
      });
    }, 3000);

    return () => clearInterval(timer);
  }, [bannerWidth]);

  /* -------- COURSE CARD -------- */
  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.card,
        isTablet && styles.cardTablet,
        isWeb && styles.cardWeb
      ]}
      activeOpacity={0.85}
      onPress={() =>
        navigation.navigate("Collegecourse3", {
          course: item.title,
        })
      }
    >
      <View style={[
        styles.tag, 
        { backgroundColor: item.tagColor },
        isTablet && styles.tagTablet
      ]}>
        <Text style={[
          styles.tagText, 
          { color: item.tagText },
          isTablet && styles.tagTextTablet
        ]}>
          {item.tag}
        </Text>
      </View>

      <Text style={[
        styles.title,
        isTablet && styles.titleTablet,
        isWeb && styles.titleWeb
      ]}>
        {item.title}
      </Text>

      <View style={[
        styles.infoRow,
        isTablet && styles.infoRowTablet
      ]}>
        <Ionicons 
          name="briefcase-outline" 
          size={isTablet ? 16 : 14} 
          color="#2563EB" 
        />
        <Text style={[
          styles.infoText,
          isTablet && styles.infoTextTablet
        ]}>
          Industry Skill
        </Text>
      </View>

      <View style={[
        styles.infoRow,
        isTablet && styles.infoRowTablet
      ]}>
        <Ionicons 
          name="time-outline" 
          size={isTablet ? 16 : 14} 
          color="#2563EB" 
        />
        <Text style={[
          styles.infoText,
          isTablet && styles.infoTextTablet
        ]}>
          {item.duration}
        </Text>
      </View>

      <TouchableOpacity 
        style={[
          styles.button,
          isTablet && styles.buttonTablet
        ]} 
        activeOpacity={0.9}
      >
        <Text style={[
          styles.buttonText,
          isTablet && styles.buttonTextTablet,
          isWeb && styles.buttonTextWeb
        ]}>
          Enroll Now
        </Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={[styles.container, isWeb && styles.containerWeb]}>
      {/* HEADER */}
      <View style={[
        styles.header,
        isTablet && styles.headerTablet,
        isWeb && styles.headerWeb
      ]}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons 
            name="arrow-back" 
            size={isTablet ? 28 : 24} 
            color="#fff" 
          />
        </TouchableOpacity>

        <View>
          <Text style={[
            styles.headerTitle,
            isTablet && styles.headerTitleTablet,
            isWeb && styles.headerTitleWeb
          ]}>
            Extra-Value Courses
          </Text>
        </View>

        <View style={{ width: isTablet ? 28 : 24 }} />
      </View>

      <ScrollView 
        showsVerticalScrollIndicator={isWeb}
        contentContainerStyle={isWeb && styles.scrollContentWeb}
      >
        {/* ===== AUTO SCROLL BANNER ===== */}
        <View style={isWeb && styles.bannerContainerWeb}>
          <ScrollView
            ref={bannerRef}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onMomentumScrollEnd={(e) =>
              setActiveIndex(
                Math.round(e.nativeEvent.contentOffset.x / bannerWidth)
              )
            }
          >
            {bannerAds.map((img, index) => (
              <Image
                key={index}
                source={{ uri: `${img}?w=${Math.floor(bannerWidth * 2)}&auto=format&fit=crop` }}
                style={[
                  styles.bannerImage,
                  isTablet && styles.bannerImageTablet,
                  isWeb && styles.bannerImageWeb,
                  { width: bannerWidth }
                ]}
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
        </View>

        {/* ===== COURSE CARDS ===== */}
        <View style={[
          styles.coursesContainer,
          isTablet && styles.coursesContainerTablet
        ]}>
          <FlatList
            data={courses}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            numColumns={isWeb ? 3 : 2}
            columnWrapperStyle={[
              styles.row,
              isTablet && styles.rowTablet,
              isWeb && styles.rowWeb
            ]}
            scrollEnabled={false}
          />
        </View>

        {/* ===== YOUTUBE VIDEO AD ===== */}
        <View style={[
          styles.videoBox,
          isTablet && styles.videoBoxTablet,
          isWeb && styles.videoBoxWeb
        ]}>
          <WebView
            allowsFullscreenVideo
            javaScriptEnabled
            domStorageEnabled
            source={{
              uri: "https://www.youtube.com/embed/NONufn3jgXI?rel=0&showinfo=0",
            }}
            style={{
              height: isWeb ? 360 : isTablet ? 280 : 220,
              width: "100%",
            }}
          />
        </View>

        <View style={{ height: isWeb ? 80 : 120 }} />
      </ScrollView>

      <Footer />
    </SafeAreaView>
  );
}

/* ---------------- STYLES ---------------- */
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

  // Header
  header: {
    backgroundColor: "#0052A2",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
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
    fontSize: 18,
    fontWeight: "700",
  },
  headerTitleTablet: {
    fontSize: 22,
  },
  headerTitleWeb: {
    fontSize: 24,
  },

  // Banner Container
  bannerContainerWeb: {
    borderRadius: 12,
    overflow: 'hidden',
    marginTop: 8,
  },

  // Banner Image
  bannerImage: {
    height: 180,
  },
  bannerImageTablet: {
    height: 300,
  },
  bannerImageWeb: {
    height: 220,
  },

  // Dots
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

  // Courses Container
  coursesContainer: {
    marginTop: 20,
  },
  coursesContainerTablet: {
    marginTop: 24,
  },

  // Row
  row: {
    justifyContent: "space-between",
    paddingHorizontal: 16,
    marginBottom: 14,
  },
  rowTablet: {
    paddingHorizontal: 24,
    marginBottom: 18,
  },
  rowWeb: {
    paddingHorizontal: 0,
    marginBottom: 20,
    justifyContent: 'flex-start',
  },

  // Card
  card: {
    backgroundColor: "#fff",
    borderRadius: 18,
    padding: 14,
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
    width: "47%",
  },
  cardTablet: {
    width: "48%",
    padding: 18,
    borderRadius: 20,
  },
  cardWeb: {
    width: "30%",
    marginHorizontal: "1.5%",
    padding: 20,
    borderRadius: 22,
  },

  // Tag
  tag: {
    alignSelf: "flex-start",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
    marginBottom: 8,
  },
  tagTablet: {
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 22,
    marginBottom: 10,
  },

  // Tag Text
  tagText: {
    fontSize: 10,
    fontWeight: "700",
  },
  tagTextTablet: {
    fontSize: 11,
  },

  // Title
  title: {
    fontSize: 14,
    fontWeight: "700",
    marginBottom: 8,
    minHeight: 40,
  },
  titleTablet: {
    fontSize: 16,
    minHeight: 45,
    marginBottom: 10,
  },
  titleWeb: {
    fontSize: 17,
    minHeight: 48,
  },

  // Info Row
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  infoRowTablet: {
    marginBottom: 6,
  },

  // Info Text
  infoText: {
    fontSize: 11,
    marginLeft: 6,
    color: "#444",
  },
  infoTextTablet: {
    fontSize: 12,
  },

  // Button
  button: {
    backgroundColor: "#0052A2",
    borderRadius: 10,
    paddingVertical: 8,
    marginTop: 8,
    width: "70%",
    alignSelf: 'flex-start',
  },
  buttonTablet: {
    paddingVertical: 10,
    borderRadius: 12,
    marginTop: 10,
  },

  // Button Text
  buttonText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "700",
    textAlign: "center",
  },
  buttonTextTablet: {
    fontSize: 13,
  },
  buttonTextWeb: {
    fontSize: 14,
  },

  // Video Box
  videoBox: {
    marginHorizontal: 16,
    marginTop: 30,
    borderRadius: 12,
    overflow: "hidden",
    backgroundColor: "#000",
  },
  videoBoxTablet: {
    marginHorizontal: 24,
    marginTop: 40,
    borderRadius: 16,
    height:300,
  },
  videoBoxWeb: {
    marginHorizontal: 0,
    marginTop: 50,
    borderRadius: 16,
  },
});