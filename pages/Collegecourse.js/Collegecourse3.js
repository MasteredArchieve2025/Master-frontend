import React, { useRef, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
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

/* ---------------- INSTITUTES DATA ---------------- */
const institutes = [
  {
    name: "Global Tech Academy",
    location: "London, UK · Online",
    rating: 4.9,
    subtitle: "Certified Partner",
    image: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f",
  },
  {
    name: "Modern Skills Institute",
    location: "New York, USA · Offline",
    rating: 4.7,
    subtitle: "2.4k Students",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f",
  },
  {
    name: "EduStream University",
    location: "Global · Online",
    rating: 4.5,
    subtitle: "Flexible Schedule",
    image: "https://images.unsplash.com/photo-1509062522246-3755977927d7",
  },
  {
    name: "Data Science Center",
    location: "Singapore · Hybrid",
    rating: 4.8,
    subtitle: "Fast Track",
    image: "https://images.unsplash.com/photo-1551650975-87deedd944c3",
  },
];

export default function Collegecourse3({ navigation }) {
  const { width } = useWindowDimensions();
  const bannerWidth = isWeb ? Math.min(width, 1200) : width;

  const bannerRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [showAll, setShowAll] = useState(false);

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

  const visibleInstitutes = showAll
    ? institutes
    : institutes.slice(0, 2);

  return (
    <SafeAreaView style={[styles.container, isWeb && styles.containerWeb]}>
      {/* ===== HEADER ===== */}
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
            Institutes
          </Text>
        </View>

        <View style={{ width: isTablet ? 28 : 24 }} />
      </View>

      <ScrollView 
        showsVerticalScrollIndicator={isWeb}
        contentContainerStyle={isWeb && styles.scrollContentWeb}
      >
        {/* ===== AUTO SCROLL BANNERS ===== */}
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

        {/* ===== BLUE INFO BANNER ===== */}
        <View style={[
          styles.banner,
          isTablet && styles.bannerTablet,
          isWeb && styles.bannerWeb
        ]}>
          <Text style={[
            styles.bannerTitle,
            isTablet && styles.bannerTitleTablet
          ]}>
            Available Course Institutes
          </Text>
          <Text style={[
            styles.bannerSubtitle,
            isTablet && styles.bannerSubtitleTablet
          ]}>
            Find the best institutes near you
          </Text>
        </View>

        {/* ===== INSTITUTE LIST ===== */}
        {visibleInstitutes.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.card,
              isTablet && styles.cardTablet,
              isWeb && styles.cardWeb
            ]}
            activeOpacity={0.85}
            onPress={() =>
              navigation.navigate("Collegecourse4", {
                institute: item.name,
              })
            }
          >
            <Image 
              source={{ uri: item.image }} 
              style={[
                styles.image,
                isTablet && styles.imageTablet,
                isWeb && styles.imageWeb
              ]} 
              resizeMode="cover"
            />

            <View style={[
              styles.cardContent,
              isTablet && styles.cardContentTablet
            ]}>
              <Text style={[
                styles.name,
                isTablet && styles.nameTablet,
                isWeb && styles.nameWeb
              ]}>
                {item.name}
              </Text>
              <Text style={[
                styles.location,
                isTablet && styles.locationTablet
              ]}>
                {item.location}
              </Text>

              <View style={[
                styles.row,
                isTablet && styles.rowTablet
              ]}>
                <Text style={[
                  styles.rating,
                  isTablet && styles.ratingTablet
                ]}>
                  ⭐ {item.rating}
                </Text>
                <Text style={[
                  styles.sub,
                  isTablet && styles.subTablet,
                  isWeb && styles.subWeb
                ]}>
                  {item.subtitle}
                </Text>
              </View>
            </View>

            <Ionicons
              name="chevron-forward"
              size={isTablet ? 22 : 18}
              color="#0B5ED7"
            />
          </TouchableOpacity>
        ))}

        {/* SEE ALL / SEE LESS */}
        <TouchableOpacity
          style={[
            styles.seeToggle,
            isTablet && styles.seeToggleTablet,
            isWeb && styles.seeToggleWeb
          ]}
          onPress={() => setShowAll(!showAll)}
        >
          <Text style={[
            styles.seeText,
            isTablet && styles.seeTextTablet
          ]}>
            {showAll ? "See less" : "See all"}
          </Text>
          <Ionicons
            name={showAll ? "chevron-up" : "chevron-forward"}
            size={isTablet ? 18 : 16}
            color="#0B5ED7"
          />
        </TouchableOpacity>

        {/* ===== VIDEO ===== */}
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
              width: "100%" 
            }}
          />
        </View>

        <View style={{ height: isWeb ? 80 : 120 }} />
      </ScrollView>
      <Footer/>
    </SafeAreaView>
  );
}

/* ---------------- STYLES ---------------- */
const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: "#F6F9FF" 
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

  // Blue Info Banner
  banner: {
    backgroundColor: "#4c73ac",
    margin: 16,
    borderRadius: 16,
    padding: 16,
  },
  bannerTablet: {
    marginHorizontal: 24,
    padding: 20,
    borderRadius: 18,
  },
  bannerWeb: {
    marginHorizontal: 0,
  },
  bannerTitle: { 
    color: "#fff", 
    fontSize: 16, 
    fontWeight: "700" 
  },
  bannerTitleTablet: {
    fontSize: 18,
  },
  bannerSubtitle: { 
    color: "#DCE8FF", 
    fontSize: 12, 
    marginTop: 4 
  },
  bannerSubtitleTablet: {
    fontSize: 14,
  },

  // Card
  card: {
    backgroundColor: "#fff",
    marginHorizontal: 16,
    marginBottom: 14,
    borderRadius: 16,
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  cardTablet: {
    marginHorizontal: 24,
    marginBottom: 18,
    padding: 16,
    borderRadius: 20,
  },
  cardWeb: {
    marginHorizontal: 0,
    marginBottom: 16,
    padding: 20,
  },

  // Image
  image: { 
    width: 70, 
    height: 70, 
    borderRadius: 12 
  },
  imageTablet: {
    width: 85,
    height: 85,
    borderRadius: 16,
  },
  imageWeb: {
    width: 90,
    height: 90,
  },

  // Card Content
  cardContent: { 
    flex: 1, 
    marginLeft: 12 
  },
  cardContentTablet: {
    marginLeft: 16,
  },

  // Name
  name: { 
    fontSize: 15, 
    fontWeight: "700" 
  },
  nameTablet: {
    fontSize: 18,
  },
  nameWeb: {
    fontSize: 19,
  },

  // Location
  location: { 
    fontSize: 12, 
    color: "#5F6F81", 
    marginTop: 4 
  },
  locationTablet: {
    fontSize: 14,
    marginTop: 6,
  },

  // Row
  row: { 
    flexDirection: "row", 
    marginTop: 6 
  },
  rowTablet: {
    marginTop: 8,
  },

  // Rating
  rating: { 
    fontSize: 12, 
    marginRight: 10 
  },
  ratingTablet: {
    fontSize: 14,
  },

  // Subtitle
  sub: { 
    fontSize: 12, 
    color: "#0B5ED7" 
  },
  subTablet: {
    fontSize: 13,
  },
  subWeb: {
    fontSize: 14,
  },

  // See Toggle
  seeToggle: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    marginHorizontal: 16,
    marginBottom: 10,
  },
  seeToggleTablet: {
    marginHorizontal: 24,
    marginBottom: 12,
  },
  seeToggleWeb: {
    marginHorizontal: 0,
  },
  seeText: {
    color: "#0B5ED7",
    fontSize: 15,
    marginRight: 4,
  },
  seeTextTablet: {
    fontSize: 16,
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
    height :300
  },
  videoBoxWeb: {
    marginHorizontal: 0,
    marginTop: 50,
    borderRadius: 16,
  },
});