import React, { useState, useRef, useEffect } from "react";
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

/* ===== DATA ===== */
const allColleges = [
  {
    id: "1",
    name: "Arunachala College of Engineering For Women",
    location: "Nagercoil · 2.4 km",
    type: "Private",
    category: "All",
    logo: require("../../assets/collegeicon.png"),
  },
  {
    id: "2",
    name: "Arunachala College of Engineering For Women",
    location: "Nagercoil · 3.1 km",
    type: "Private",
    category: "All",
    logo: require("../../assets/collegeicon.png"),
  },
];

const govtUniversities = [
  {
    id: "3",
    name: "Government College of Technology",
    location: "Coimbatore · 4.8 km",
    type: "Govt",
    category: "Govt",
    logo: require("../../assets/collegeicon.png"),
  },
];

const autonomousUniversities = [
  {
    id: "4",
    name: "PSG College of Technology",
    location: "Coimbatore · 5.2 km",
    type: "Autonomous",
    category: "Autonomous",
    logo: require("../../assets/collegeicon.png"),
  },
];

export default function College3({ route }) {
  const { degree } = route.params;
  const navigation = useNavigation();
  const [activeTab, setActiveTab] = useState("All");
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

  const getColleges = () => {
    if (activeTab === "Govt") return govtUniversities;
    if (activeTab === "Autonomous") return autonomousUniversities;
    return allColleges;
  };

  return (
    <SafeAreaView style={[styles.safe, isWeb && styles.safeWeb]}>
      <StatusBar barStyle="light-content" backgroundColor="#0052A2" />

      {/* ===== HEADER ===== */}
      <View style={[
        styles.header, 
        isTablet && styles.headerTablet,
        isWeb && styles.headerWeb
      ]}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
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
          {degree}
        </Text>
        <View style={{ width: isTablet ? 28 : 24 }} />
      </View>

      <ScrollView 
        showsVerticalScrollIndicator={isWeb}
        contentContainerStyle={isWeb && styles.scrollContentWeb}
      >
        {/* ===== TOP ADS ===== */}
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

        {/* ===== FILTERS ===== */}
        <View style={[
          styles.filterRow,
          isTablet && styles.filterRowTablet,
          isWeb && styles.filterRowWeb
        ]}>
          <TouchableOpacity style={[
            styles.filterInput,
            isTablet && styles.filterInputTablet
          ]}>
            <Text style={[
              styles.filterText,
              isTablet && styles.filterTextTablet
            ]}>
              Filters
            </Text>
            <Ionicons 
              name="chevron-down-outline" 
              size={isTablet ? 18 : 16} 
              color="#333" 
            />
          </TouchableOpacity>

          <TouchableOpacity style={[
            styles.filterInput,
            isTablet && styles.filterInputTablet
          ]}>
            <Text style={[
              styles.filterText,
              isTablet && styles.filterTextTablet
            ]}>
              Select
            </Text>
            <Ionicons 
              name="chevron-down-outline" 
              size={isTablet ? 18 : 16} 
              color="#333" 
            />
          </TouchableOpacity>
        </View>

        {/* ===== TABS ===== */}
        <View style={[
          styles.categories,
          isTablet && styles.categoriesTablet,
          isWeb && styles.categoriesWeb
        ]}>
          {["All", "Govt", "Autonomous"].map((tab) => (
            <TouchableOpacity
              key={tab}
              style={[
                styles.categoryBtn,
                activeTab === tab && styles.activeCategory,
                isTablet && styles.categoryBtnTablet,
                isWeb && styles.categoryBtnWeb
              ]}
              onPress={() => setActiveTab(tab)}
            >
              <Text
                style={[
                  styles.categoryText,
                  activeTab === tab && styles.activeCategoryText,
                  isTablet && styles.categoryTextTablet,
                  isWeb && styles.categoryTextWeb
                ]}
              >
                {tab === "Govt"
                  ? "Govt Universities"
                  : tab === "Autonomous"
                  ? "Autonomous Universities"
                  : "All"}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* ===== COLLEGE LIST ===== */}
        {getColleges().map((college, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.card,
              isTablet && styles.cardTablet,
              isWeb && styles.cardWeb
            ]}
            activeOpacity={0.85}
            onPress={() =>
              navigation.navigate("College4", { college })
            }
          >
            <Image 
              source={college.logo} 
              style={[
                styles.image,
                isTablet && styles.imageTablet,
                isWeb && styles.imageWeb
              ]} 
              resizeMode="contain"
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
                {college.name}
              </Text>
              <Text style={[
                styles.location,
                isTablet && styles.locationTablet
              ]}>
                📍 {college.location}
              </Text>

              <View style={[
                styles.tags,
                isTablet && styles.tagsTablet
              ]}>
                <Text style={[
                  styles.tagBlue,
                  isTablet && styles.tagTablet,
                  isWeb && styles.tagWeb
                ]}>
                  {college.type}
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

  // Filter Row
  filterRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 12,
    marginVertical: 14,
  },
  filterRowTablet: {
    paddingHorizontal: 24,
    marginVertical: 20,
  },
  filterRowWeb: {
    paddingHorizontal: 0,
  },
  filterInput: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 8,
    flex: 0.48,
    justifyContent: "space-between",
  },
  filterInputTablet: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 22,
  },
  filterText: { 
    fontSize: 14 
  },
  filterTextTablet: {
    fontSize: 16,
  },

  // Categories
  categories: {
    flexDirection: "row",
    justifyContent: "space-around",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    paddingVertical: 8,
  },
  categoriesTablet: {
    paddingVertical: 12,
  },
  categoriesWeb: {
    paddingHorizontal: 0,
  },
  categoryBtn: { 
    paddingBottom: 6 
  },
  categoryBtnTablet: {
    paddingBottom: 8,
  },
  categoryBtnWeb: {
    marginHorizontal: 8,
  },
  categoryText: { 
    fontSize: 14, 
    color: "#333" 
  },
  categoryTextTablet: {
    fontSize: 16,
  },
  categoryTextWeb: {
    fontSize: 15,
  },
  activeCategory: {
    borderBottomWidth: 2,
    borderBottomColor: "#0052A2",
  },
  activeCategoryText: {
    color: "#0052A2",
    fontWeight: "bold",
  },

  // College Card
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

  // Card Image
  image: {
    width: 70,
    height: 70,
    borderRadius: 12,
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
    marginLeft: 12,
  },
  cardContentTablet: {
    marginLeft: 16,
  },

  // College Name
  name: {
    fontSize: 15,
    fontWeight: "700",
    color: "#000",
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
    marginTop: 4,
  },
  locationTablet: {
    fontSize: 14,
    marginTop: 6,
  },

  // Tags Container
  tags: {
    flexDirection: "row",
    marginTop: 8,
  },
  tagsTablet: {
    marginTop: 10,
  },

  // Tag
  tagBlue: {
    backgroundColor: "#E8F1FF",
    color: "#0B5ED7",
    fontSize: 11,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  tagTablet: {
    fontSize: 13,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
  },
  tagWeb: {
    fontSize: 13,
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