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

/* ===== DEGREE DATA ===== */
const degrees = [
  {
    title: "B.E",
    desc: "Engineering degree with core technical skills",
    icon: "settings-outline",
  },
  {
    title: "B.Tech",
    desc: "Technology-focused engineering program",
    icon: "hardware-chip-outline",
  },
  {
    title: "B.Arch",
    desc: "Architecture and design studies",
    icon: "business-outline",
  },
  {
    title: "BCA",
    desc: "Computer applications and software basics",
    icon: "laptop-outline",
  },
  {
    title: "B.Sc",
    desc: "Science-based undergraduate programs",
    icon: "flask-outline",
  },
  {
    title: "BBA",
    desc: "Business administration and management",
    icon: "briefcase-outline",
  },
];

const College2 = ({ route }) => {
  const navigation = useNavigation();
  const bannerWidth = isWeb ? Math.min(screenWidth, 1200) : screenWidth;

  const category = route?.params?.category || {
    name: "Unknown",
    icon: null,
  };

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

  // Calculate if the current item is in the last row and should be left-aligned
  const isLastItem = (index) => {
    const itemsPerRow = 2;
    const totalItems = degrees.length;
    const lastRowStartIndex = Math.floor((totalItems - 1) / itemsPerRow) * itemsPerRow;
    const isInLastRow = index >= lastRowStartIndex;
    const isOddItemInLastRow = isInLastRow && (index % itemsPerRow === 0) && (totalItems % itemsPerRow === 1);
    
    return isOddItemInLastRow;
  };

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
            Departments
          </Text>
          <View style={[styles.rightSpace, isTablet && styles.rightSpaceTablet]} />
        </View>
      </View>

      <ScrollView 
        showsVerticalScrollIndicator={isWeb}
        contentContainerStyle={isWeb && styles.scrollContentWeb}
      >
        {/* ===== BANNER ADS ===== */}
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

        {/* ===== CATEGORY INFO ===== */}
        <View style={[
          styles.titleContainer,
          isTablet && styles.titleContainerTablet,
          isWeb && styles.titleContainerWeb
        ]}>
          <View style={[
            styles.iconContainer,
            isTablet && styles.iconContainerTablet,
            isWeb && styles.iconContainerWeb
          ]}>
            {category.icon ? (
              <Image 
                source={category.icon} 
                style={[
                  styles.categoryImage,
                  isTablet && styles.categoryImageTablet,
                  isWeb && styles.categoryImageWeb
                ]} 
                resizeMode="contain"
              />
            ) : (
              <Ionicons 
                name="school-outline" 
                size={isTablet ? 70 : 60} 
                color="#0c2f63" 
              />
            )}
          </View>
          <Text style={[
            styles.title,
            isTablet && styles.titleTablet,
            isWeb && styles.titleWeb
          ]}>
            {category.name}
          </Text>
        </View>

        {/* ===== DEGREE CARDS ===== */}
        <View style={[
          styles.grid,
          isTablet && styles.gridTablet,
          isWeb && styles.gridWeb
        ]}>
          {degrees.map((item, index) => {
            // Calculate if this is the single item in the last row
            const singleLastItem = isLastItem(index);
            
            return (
              <TouchableOpacity
                key={index}
                activeOpacity={0.85}
                style={[
                  styles.degreeCard,
                  isTablet && styles.degreeCardTablet,
                  isWeb && styles.degreeCardWeb,
                  singleLastItem && styles.singleLastItem,
                  singleLastItem && isTablet && styles.singleLastItemTablet,
                  singleLastItem && isWeb && styles.singleLastItemWeb
                ]}
                onPress={() =>
                  navigation.navigate("College0", {
                    degree: item.title,
                  })
                }
              >
                <Ionicons
                  name={item.icon}
                  size={isTablet ? 34 : 28}
                  color="#0052A2"
                  style={{ marginBottom: isTablet ? 12 : 10 }}
                />

                <Text style={[
                  styles.degreeTitle,
                  isTablet && styles.degreeTitleTablet,
                  isWeb && styles.degreeTitleWeb
                ]}>
                  {item.title}
                </Text>

                <Text style={[
                  styles.degreeDesc,
                  isTablet && styles.degreeDescTablet,
                  isWeb && styles.degreeDescWeb
                ]}>
                  {item.desc}
                </Text>
              </TouchableOpacity>
            );
          })}
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

  // Category Info
  titleContainer: {
    alignItems: "center",
    marginVertical: 20,
  },
  titleContainerTablet: {
    marginVertical: 30,
  },
  titleContainerWeb: {
    marginVertical: 35,
  },
  iconContainer: {
    backgroundColor: "#e6f2ff",
    borderRadius: 50,
    padding: 15,
    marginBottom: 10,
  },
  iconContainerTablet: {
    padding: 18,
    borderRadius: 60,
    marginBottom: 12,
  },
  iconContainerWeb: {
    padding: 20,
    borderRadius: 70,
  },
  categoryImage: {
    width: 60,
    height: 60,
  },
  categoryImageTablet: {
    width: 70,
    height: 70,
  },
  categoryImageWeb: {
    width: 80,
    height: 80,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#0c2f63",
  },
  titleTablet: {
    fontSize: 24,
  },
  titleWeb: {
    fontSize: 26,
  },

  // Grid
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingHorizontal: 16,
  },
  gridTablet: {
    paddingHorizontal: 24,
  },
  gridWeb: {
    paddingHorizontal: 0,
  },

  // Degree Card - Base Style
  degreeCard: {
    width: "47%",
    backgroundColor: "#dbd9d9",
    borderRadius: 14,
    padding: 16,
    marginBottom: 14,
    alignItems: "center",
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
    borderWidth: 1,
    borderColor: "#d0e0ff",
  },
  degreeCardTablet: {
    width: "45%",
    padding: 20,
    borderRadius: 16,
    marginBottom: 20,
  },
  degreeCardWeb: {
    width: "48%",
    padding: 24,
    marginBottom: 24,
  },

  // Special style for single item in last row
  singleLastItem: {
    marginRight: "auto",
    marginLeft: 0,
  },
  singleLastItemTablet: {
    marginLeft: 0,
  },
  singleLastItemWeb: {
    marginLeft: 0,
  },

  degreeTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#003366",
    marginBottom: 6,
    textAlign: 'center',
  },
  degreeTitleTablet: {
    fontSize: 18,
    marginBottom: 8,
  },
  degreeTitleWeb: {
    fontSize: 20,
  },
  degreeDesc: {
    fontSize: 12,
    color: "#555",
    textAlign: "center",
    lineHeight: 16,
  },
  degreeDescTablet: {
    fontSize: 14,
    lineHeight: 18,
  },
  degreeDescWeb: {
    fontSize: 15,
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
    height : 300,
  },
  videoBoxWeb: {
    marginHorizontal: 0,
    marginTop: 50,
    borderRadius: 16,
  },
});

export default College2;