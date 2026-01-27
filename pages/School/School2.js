import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
  TextInput,
  Platform,
  StatusBar,
  SafeAreaView,
  ScrollView,
  useWindowDimensions,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { WebView } from "react-native-webview";
import Footer from "../../src/components/Footer";

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");
const isTablet = screenWidth >= 768;
const isWeb = screenWidth >= 1024;

/* ===== AD BANNERS ===== */
const bannerAds = [
  "https://images.unsplash.com/photo-1516321318423-f06f85e504b3",
  "https://images.unsplash.com/photo-1509062522246-3755977927d7",
  "https://images.unsplash.com/photo-1551650975-87deedd944c3",
];

/* ===== SCHOOL DATA ===== */
const schools = [
  {
    id: "1",
    name: "Josephs Matric HR Sec School",
    location: "Colachel · 1.2 km",
    board: "Govt.School",
    type: "Public",
    image: require("../../assets/school.png"),
    category: "Govt.School",
  },
  {
    id: "2",
    name: "St. Mary's CBSE School",
    location: "Nagercoil · 2.5 km",
    board: "CBSE",
    type: "Private",
    image: require("../../assets/school.png"),
    category: "CBSE",
  },
  {
    id: "3",
    name: "National Public School",
    location: "Chennai · 4.0 km",
    board: "ICSE",
    type: "Day School",
    image: require("../../assets/school.png"),
    category: "ICSE",
  },
  {
    id: "4",
    name: "Velammal State Board School",
    location: "Madurai · 3.2 km",
    board: "State Board",
    type: "Private",
    image: require("../../assets/school.png"),
    category: "State Board",
  },
  {
    id: "5",
    name: "Govt Higher Secondary School",
    location: "Trichy · 5.0 km",
    board: "Govt.School",
    type: "Public",
    image: require("../../assets/school.png"),
    category: "Govt.School",
  },
];

export default function School2() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const navigation = useNavigation();
  const { width } = useWindowDimensions();
  const bannerWidth = isWeb ? Math.min(width, 1200) : width;

  /* ===== BANNER LOGIC ===== */
  const bannerRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

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

  const filteredSchools =
    selectedCategory === "All"
      ? schools
      : schools.filter((s) => s.category === selectedCategory);

  /* ===== SCHOOL CARD ===== */
  const renderSchoolCard = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.card,
        isTablet && styles.cardTablet,
        isWeb && styles.cardWeb
      ]}
      activeOpacity={0.85}
      onPress={() => navigation.navigate("School3", { school: item })}
    >
      <Image 
        source={item.image} 
        style={[
          styles.image,
          isTablet && styles.imageTablet,
          isWeb && styles.imageWeb
        ]} 
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
          📍 {item.location}
        </Text>

        <View style={[
          styles.tags,
          isTablet && styles.tagsTablet
        ]}>
          <Text style={[
            styles.tagBlue,
            isTablet && styles.tagTablet
          ]}>
            {item.board}
          </Text>
          <Text style={[
            styles.tagGray,
            isTablet && styles.tagTablet
          ]}>
            {item.type}
          </Text>
        </View>
      </View>

      <Ionicons 
        name="chevron-forward" 
        size={isTablet ? 22 : 18} 
        color="#0B5ED7" 
      />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={[styles.container, isWeb && styles.containerWeb]}>
      <StatusBar barStyle="light-content" backgroundColor="#0052A2" />

      {/* ===== HEADER (Same as School1) ===== */}
      <View style={[styles.header, isTablet && styles.headerTablet, isWeb && styles.headerWeb]}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons 
            name="arrow-back" 
            size={isTablet ? 28 : 24} 
            color="#fff" 
          />
        </TouchableOpacity>

        <Text style={[styles.headerTitle, isTablet && styles.headerTitleTablet, isWeb && styles.headerTitleWeb]}>
          School
        </Text>
        <View style={{ width: isTablet ? 28 : 24 }} />
      </View>

      <ScrollView 
        showsVerticalScrollIndicator={isWeb} 
        contentContainerStyle={isWeb && styles.scrollContentWeb}
      >
        {/* ===== TOP ADS BANNER ===== */}
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
            {bannerAds.map((img, i) => (
              <Image
                key={i}
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

        {/* FILTERS */}
        <View style={[
          styles.filterRow,
          isTablet && styles.filterRowTablet,
          isWeb && styles.filterRowWeb
        ]}>
          <View style={[
            styles.filterInput,
            isTablet && styles.filterInputTablet
          ]}>
            <TextInput
              placeholder="Filters"
              placeholderTextColor="#666"
              style={[
                styles.filterText,
                isTablet && styles.filterTextTablet
              ]}
            />
            <Ionicons
              name="chevron-down-outline"
              size={isTablet ? 18 : 16}
              color="#333"
            />
          </View>
          <View style={[
            styles.filterInput,
            isTablet && styles.filterInputTablet
          ]}>
            <TextInput
              placeholder="Select"
              placeholderTextColor="#666"
              style={[
                styles.filterText,
                isTablet && styles.filterTextTablet
              ]}
            />
            <Ionicons
              name="chevron-down-outline"
              size={isTablet ? 18 : 16}
              color="#333"
            />
          </View>
        </View>

        {/* ===== CATEGORIES ===== */}
        <View style={[
          styles.categories,
          isTablet && styles.categoriesTablet,
          isWeb && styles.categoriesWeb
        ]}>
          {["All", "Govt.School", "State Board", "CBSE", "ICSE"].map(
            (cat) => (
              <TouchableOpacity
                key={cat}
                style={[
                  styles.categoryBtn,
                  selectedCategory === cat &&
                    styles.activeCategory,
                  isTablet && styles.categoryBtnTablet,
                  isWeb && styles.categoryBtnWeb
                ]}
                onPress={() => setSelectedCategory(cat)}
              >
                <Text
                  style={[
                    styles.categoryText,
                    selectedCategory === cat &&
                      styles.activeCategoryText,
                    isTablet && styles.categoryTextTablet,
                    isWeb && styles.categoryTextWeb
                  ]}
                >
                  {cat}
                </Text>
              </TouchableOpacity>
            )
          )}
        </View>

        {/* ===== SCHOOL LIST ===== */}
        <FlatList
          data={filteredSchools}
          renderItem={renderSchoolCard}
          keyExtractor={(item) => item.id}
          scrollEnabled={false}
          contentContainerStyle={[
            styles.listContent,
            isTablet && styles.listContentTablet,
            isWeb && styles.listContentWeb
          ]}
        />

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

  // Header Styles (Same as School1)
  header: {
    backgroundColor: "#0052A2",
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
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
    fontSize: 22,
    fontWeight: "700",
    marginRight: 25,
  },
  headerTitleTablet: {
    fontSize: 26,
  },
  headerTitleWeb: {
    fontSize: 28,
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
    paddingHorizontal: 10,
    flex: 0.48,
    height: 40,
  },
  filterInputTablet: {
    height: 46,
    borderRadius: 23,
    paddingHorizontal: 14,
  },
  filterText: {
    flex: 1,
    fontSize: 14,
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

  // School List Content
  listContent: {
    paddingTop: 12,
  },
  listContentTablet: {
    paddingTop: 16,
  },
  listContentWeb: {
    paddingHorizontal: 0,
  },

  // School Card
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

  // School Name
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

  // Tags
  tagBlue: {
    backgroundColor: "#E8F1FF",
    color: "#0B5ED7",
    fontSize: 11,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    marginRight: 8,
  },
  tagGray: {
    backgroundColor: "#F1F3F6",
    color: "#5F6F81",
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

  // Video Box
  videoBox: {
    marginHorizontal: 16,
    marginTop: 30,
    borderRadius: 12,
    overflow: "hidden",
    backgroundColor: "#000",
    height : 200,
  },
  videoBoxTablet: {
    marginHorizontal: 24,
    marginTop: 40,
    borderRadius: 16,
    height : 300,
  },
  videoBoxWeb: {
    marginHorizontal: 0,
    marginTop: 50,
    borderRadius: 16,
  },
});