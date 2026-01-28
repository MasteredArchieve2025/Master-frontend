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
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { WebView } from "react-native-webview";
import Footer from "../../src/components/Footer";

const { width: screenWidth } = Dimensions.get("window");
const isTablet = screenWidth >= 768;
const isWeb = screenWidth >= 1024;

/* ===== AD BANNERS ===== */
const bannerAds = [
  "https://images.unsplash.com/photo-1516321318423-f06f85e504b3",
  "https://images.unsplash.com/photo-1509062522246-3755977927d7",
  "https://images.unsplash.com/photo-1551650975-87deedd944c3",
];

// Categories data
const categories = [
  { name: "Engineering", icon: require("../../assets/engineering.png") },
  { name: "Arts & Science", icon: require("../../assets/arts.png") },
  { name: "Medical", icon: require("../../assets/medical.png") },
  { name: "Polytechnic", icon: require("../../assets/internet.png") },
  { name: "Law", icon: require("../../assets/law.png") },
  { name: "Veterinary", icon: require("../../assets/veterinary.png") },
];

const College1 = () => {
  const navigation = useNavigation();
  const bannerWidth = isWeb ? Math.min(screenWidth, 1200) : screenWidth;

  const bannerRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  /* AUTO SCROLL ADS */
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

  return (
    <SafeAreaView style={[styles.safe, isWeb && styles.safeWeb]}>
      <StatusBar barStyle="light-content" backgroundColor="#0052A2" />

      {/* ===== HEADER ===== */}
      <View style={[styles.headerWrapper, isWeb && styles.headerWrapperWeb]}>
        <View style={[
          styles.header, 
          isTablet && styles.headerTablet,
          isWeb && styles.headerWeb
        ]}>
          <TouchableOpacity
            style={[styles.backBtn, isTablet && styles.backBtnTablet]}
            onPress={() => navigation.goBack()}
          >
            <Ionicons
              name={Platform.OS === "ios" ? "chevron-back" : "arrow-back"}
              size={isTablet ? 28 : 24}
              color="#fff"
            />
          </TouchableOpacity>

          <Text style={[
            styles.headerTitle,
            isTablet && styles.headerTitleTablet,
            isWeb && styles.headerTitleWeb
          ]}>
            Colleges
          </Text>
          <View style={[styles.rightSpace, isTablet && styles.rightSpaceTablet]} />
        </View>
      </View>

      <ScrollView 
        showsVerticalScrollIndicator={isWeb}
        contentContainerStyle={isWeb && styles.scrollContentWeb}
      >
        {/* ===== TOP AUTO SCROLL AD BANNER ===== */}
        <View style={isWeb && styles.bannerContainerWeb}>
          <ScrollView
            ref={bannerRef}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onMomentumScrollEnd={(e) =>
              setActiveIndex(Math.round(e.nativeEvent.contentOffset.x / bannerWidth))
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

        {/* ===== BODY ===== */}
        <View style={[
          styles.body,
          isWeb && styles.bodyWeb
        ]}>
          <Text style={[
            styles.sectionTitle,
            isTablet && styles.sectionTitleTablet,
            isWeb && styles.sectionTitleWeb
          ]}>
            Categories
          </Text>

          {/* Categories Grid */}
          <View style={[
            styles.grid,
            isTablet && styles.gridTablet,
            isWeb && styles.gridWeb
          ]}>
            {categories.map((category, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.card,
                  isTablet && styles.cardTablet,
                  isWeb && styles.cardWeb
                ]}
                onPress={() =>
                  navigation.navigate("College2", { category })
                }
              >
                <Image
                  source={category.icon}
                  style={[
                    styles.categoryImage,
                    isTablet && styles.categoryImageTablet,
                    isWeb && styles.categoryImageWeb
                  ]}
                  resizeMode="contain"
                />
                <Text style={[
                  styles.cardText,
                  isTablet && styles.cardTextTablet,
                  isWeb && styles.cardTextWeb
                ]}>
                  {category.name}
                </Text>
                <Text style={[
                  styles.cardDescription,
                  isTablet && styles.cardDescriptionTablet,
                  isWeb && styles.cardDescriptionWeb
                ]}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* ===== VIDEO AD ===== */}
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
};

/* ================= STYLES ================= */
const styles = StyleSheet.create({
  safe: { 
    flex: 1, 
    backgroundColor: "#fff" 
  },
  safeWeb: {
    maxWidth: 1200,
    alignSelf: 'center',
    width: '100%',
  },
  
  scrollContentWeb: {
    paddingHorizontal: 40,
  },

  // Header Wrapper
  headerWrapper: { 
    backgroundColor: "#0052A2" 
  },
  headerWrapperWeb: {
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
  },

  // Header
  header: {
    height: Platform.OS === "ios" ? 52 : 64,
    backgroundColor: "#0052A2",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
  },
  headerTablet: {
    height: Platform.OS === "ios" ? 60 : 72,
    paddingHorizontal: 24,
  },
  headerWeb: {
    paddingHorizontal: 40,
  },
  backBtn: { 
    width: 40 
  },
  backBtnTablet: {
    width: 50,
  },
  rightSpace: { 
    width: 40 
  },
  rightSpaceTablet: {
    width: 50,
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

  // Body
  body: {
    backgroundColor: "#fff",
  },
  bodyWeb: {
    paddingHorizontal: 0,
  },

  // Section Title
  sectionTitle: {
    fontSize: 20,
    fontWeight: "700",
    paddingHorizontal: 20,
    paddingVertical: 16,
    color: "#0c2f63",
  },
  sectionTitleTablet: {
    fontSize: 24,
    paddingVertical: 20,
  },
  sectionTitleWeb: {
    fontSize: 26,
    paddingHorizontal: 0,
  },

  // Grid
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-evenly",
    paddingHorizontal: 10,
    paddingBottom: 30,
  },
  gridTablet: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  gridWeb: {
    paddingHorizontal: 0,
    justifyContent: 'space-between',
  },

  // Card
  card: {
    width: "45%",
    backgroundColor: "#f2f2f2",
    borderRadius: 14,
    paddingTop: 30,
    padding: 15,
    alignItems: "center",
    marginBottom: 30,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  cardTablet: {
    width: "30%",
    paddingTop: 35,
    padding: 20,
    borderRadius: 18,
    marginBottom: 35,
  },
  cardWeb: {
    width: "30%",
    paddingTop: 40,
    padding: 24,
    borderRadius: 20,
    marginBottom: 40,
  },

  // Category Image
  categoryImage: {
    width: 60,
    height: 60,
    marginBottom: 10,
  },
  categoryImageTablet: {
    width: 75,
    height: 75,
    marginBottom: 12,
  },
  categoryImageWeb: {
    width: 80,
    height: 80,
    marginBottom: 15,
  },

  // Card Text
  cardText: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
    textAlign: "center",
    color: "#0c2f63",
  },
  cardTextTablet: {
    fontSize: 18,
    marginBottom: 8,
  },
  cardTextWeb: {
    fontSize: 20,
  },

  // Card Description
  cardDescription: {
    fontSize: 12,
    textAlign: "center",
    color: "gray",
    lineHeight: 16,
  },
  cardDescriptionTablet: {
    fontSize: 14,
    lineHeight: 18,
  },
  cardDescriptionWeb: {
    fontSize: 14,
    lineHeight: 20,
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
    height:300
  },
  videoBoxWeb: {
    marginHorizontal: 0,
    marginTop: 50,
    borderRadius: 16,
  },
});

export default College1;