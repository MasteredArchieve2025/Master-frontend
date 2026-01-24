// Exam2.js
import React, { useRef, useEffect, useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  Image,
  StatusBar,
  StyleSheet,
  Platform,
  Dimensions,
  Linking,
  useWindowDimensions,
  FlatList,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import { WebView } from "react-native-webview";
import Footer from "../../src/components/Footer";

const { width } = Dimensions.get("window");

// Advertisement banners data
const ads = [
  {
    id: "1",
    title: "Board Exam Preparation",
    description: "Get expert tips and study materials for board exams",
    image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=800&h=300&fit=crop",
    url: "https://example.com/board-exams"
  },
  {
    id: "2",
    title: "Previous Year Papers",
    description: "Download 10+ years of question papers with solutions",
    image: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=800&h=300&fit=crop",
    url: "https://example.com/previous-papers"
  },
  {
    id: "3",
    title: "Study Material Package",
    description: "Complete study package for all subjects",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&h=300&fit=crop",
    url: "https://example.com/study-package"
  },
];

// Tab categories
const tabs = [
  { id: "all", label: "All Exams" },
  { id: "board", label: "Board Exams" },
  { id: "supplementary", label: "Supplementary" },
  { id: "annual", label: "Annual Exams" },
];

// Exam types data with square cards
const examTypes = [
  {
    id: "1",
    title: "Class 12 (HSC +2) Public Exams",
    description: "Higher Secondary Certificate Public Examinations",
    icon: "📚",
    type: "board",
    color: "#4A90E2",
  },
  {
    id: "2",
    title: "12th Supplementary Exams",
    description: "Supplementary/Compartmental Examinations",
    icon: "🔄",
    type: "supplementary",
    color: "#50C878",
  },
  {
    id: "3",
    title: "Class 10 (SSLC) Public Exams",
    description: "Secondary School Leaving Certificate Exams",
    icon: "🎓",
    type: "board",
    color: "#FF6B6B",
  },
  {
    id: "4",
    title: "Class 12 Model Papers",
    description: "Model question papers with solutions",
    icon: "📝",
    type: "board",
    color: "#FFA500",
  },
  {
    id: "5",
    title: "Class 11 Exams",
    description: "Annual Examinations for Class 11 Students",
    icon: "📖",
    type: "annual",
    color: "#9B59B6",
  },
  {
    id: "6",
    title: "2025–26 School Calendar",
    description: "Academic Calendar for Grades 1–12",
    icon: "📅",
    type: "annual",
    color: "#1ABC9C",
  },
  {
    id: "7",
    title: "10th Supplementary Exams",
    description: "SSLC Supplementary Examinations",
    icon: "📚",
    type: "supplementary",
    color: "#3498DB",
  },
  {
    id: "8",
    title: "Practical Exams",
    description: "Laboratory and Practical Examinations",
    icon: "🔬",
    type: "annual",
    color: "#E74C3C",
  },
];

const Exam2 = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [adIndex, setAdIndex] = useState(0);
  const [activeTab, setActiveTab] = useState("all");
  const adRef = useRef(null);
  const { width: screenWidth, height: screenHeight } = useWindowDimensions();
  const isTablet = screenWidth >= 768;
  const isSmallScreen = screenWidth < 375; // iPhone SE, small Android

  // Get exam title from navigation params
  const { examTitle = "School Board Exams" } = route.params || {};

  // Calculate ad height based on screen size
  const adHeight = Math.min(screenHeight * 0.22, isSmallScreen ? 160 : 200);

  // Filter exams based on active tab
  const filteredExams = examTypes.filter((exam) => {
    if (activeTab === "all") return true;
    return exam.type === activeTab;
  });

  // Calculate items per row based on screen size
  const itemsPerRow = isTablet ? 3 : 2;
  
  // Calculate card width with proper spacing
  const cardWidth = () => {
    if (isTablet) {
      return (screenWidth - 64) / 3; // 3 columns with 16px margin each side
    } else {
      return (screenWidth - 48) / 2; // 2 columns with 16px margin each side
    }
  };

  // Auto scroll ads
  useEffect(() => {
    const timer = setInterval(() => {
      setAdIndex((prev) => {
        const next = (prev + 1) % ads.length;
        adRef.current?.scrollTo({ x: next * screenWidth, animated: true });
        return next;
      });
    }, 3000);
    return () => clearInterval(timer);
  }, [screenWidth]);

  // Advertisement Banner Component
  const AdBanner = () => (
    <View style={styles.adContainer}>
      <ScrollView
        ref={adRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={(e) =>
          setAdIndex(Math.round(e.nativeEvent.contentOffset.x / screenWidth))
        }
      >
        {ads.map((ad, i) => (
          <TouchableOpacity
            key={ad.id}
            onPress={() => Linking.openURL(ad.url)}
            activeOpacity={0.9}
            style={styles.adSlide}
          >
            <Image
              source={{ uri: ad.image }}
              style={[styles.adImage, { 
                width: screenWidth, 
                height: adHeight 
              }]}
            />
            <View style={styles.adContent}>
              <Text style={[
                styles.adTitle,
                isSmallScreen && styles.adTitleSmall
              ]}>
                {ad.title}
              </Text>
              <Text style={[
                styles.adDesc,
                isSmallScreen && styles.adDescSmall
              ]}>
                {ad.description}
              </Text>
            </View>
            <View style={styles.adBadge}>
              <Text style={styles.adBadgeText}>Ad</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
      
      {/* Dots Indicator */}
      <View style={styles.dots}>
        {ads.map((_, i) => (
          <View
            key={i}
            style={[
              styles.dot,
              adIndex === i && styles.activeDot,
            ]}
          />
        ))}
      </View>
    </View>
  );

  // Exam Card Component (Square shape) - UPDATED
  const ExamCard = ({ exam, index }) => {
    const currentCardWidth = cardWidth();
    const isLastInRow = (index + 1) % itemsPerRow === 0;
    
    return (
      <TouchableOpacity
        style={[
          styles.examCard,
          { 
            width: currentCardWidth,
            height: currentCardWidth * 0.9, // Slightly taller square
            marginRight: isTablet ? (isLastInRow ? 0 : 16) : (isLastInRow ? 0 : 16),
            marginBottom: 16,
          }
        ]}
        onPress={() => navigation.navigate("Exam3", { 
          examId: exam.id, 
          examTitle: exam.title 
        })}
        activeOpacity={0.8}
      >
        <View style={[styles.cardIconContainer, { 
          backgroundColor: exam.color + '20',
          width: isSmallScreen ? 40 : 48,
          height: isSmallScreen ? 40 : 48,
        }]}>
          <Text style={[
            styles.cardIcon, 
            { fontSize: isSmallScreen ? 22 : 24 }
          ]}>
            {exam.icon}
          </Text>
        </View>
        <View style={styles.cardContent}>
          <Text style={[
            styles.cardTitle,
            isSmallScreen && styles.cardTitleSmall
          ]} numberOfLines={2}>
            {exam.title}
          </Text>
          <Text style={[
            styles.cardDescription,
            isSmallScreen && styles.cardDescriptionSmall
          ]} numberOfLines={2}>
            {exam.description}
          </Text>
          <View style={styles.cardFooter}>
            <View style={[styles.typeBadge, { backgroundColor: exam.color + '20' }]}>
              <Text style={[
                styles.typeText, 
                { color: exam.color },
                isSmallScreen && styles.typeTextSmall
              ]}>
                {exam.type.charAt(0).toUpperCase() + exam.type.slice(1)}
              </Text>
            </View>
            <View style={[
              styles.arrowContainer,
              isSmallScreen && styles.arrowContainerSmall
            ]}>
              <Ionicons 
                name="chevron-forward" 
                size={isSmallScreen ? 14 : 16} 
                color={exam.color} 
              />
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  // Render item for FlatList
  const renderExamCard = ({ item, index }) => (
    <ExamCard exam={item} index={index} />
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={[
          styles.headerTitle,
          isSmallScreen && styles.headerTitleSmall
        ]}>
          Exam Types
        </Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView 
        showsVerticalScrollIndicator={false} 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Big Advertisement Banner First */}
        <AdBanner />

        {/* Exam Category Header */}
        <View style={styles.categoryHeader}>
          <Text style={[
            styles.categoryTitle,
            isSmallScreen && styles.categoryTitleSmall
          ]}>
            {examTitle}
          </Text>
          <Text style={[
            styles.categorySubtitle,
            isSmallScreen && styles.categorySubtitleSmall
          ]}>
            Select exam type to view detailed syllabus, patterns, and resources
          </Text>
        </View>

        {/* Tab Navigation - Platform Specific */}
        <View style={[
          styles.tabContainer,
          isSmallScreen && styles.tabContainerSmall
        ]}>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={[
              styles.tabScrollContent,
              isSmallScreen && styles.tabScrollContentSmall
            ]}
          >
            {tabs.map((tab) => (
              <TouchableOpacity
                key={tab.id}
                style={[
                  styles.tab,
                  activeTab === tab.id && styles.activeTab,
                  Platform.OS === 'ios' ? styles.tabIOS : styles.tabAndroid,
                  isSmallScreen && styles.tabSmall
                ]}
                onPress={() => setActiveTab(tab.id)}
              >
                <Text style={[
                  styles.tabText,
                  activeTab === tab.id && styles.activeTabText,
                  Platform.OS === 'ios' ? styles.tabTextIOS : styles.tabTextAndroid,
                  isSmallScreen && styles.tabTextSmall
                ]}>
                  {tab.label}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Exam Types Grid - UPDATED with FlatList */}
        <View style={styles.categoriesContainer}>
          <FlatList
            data={filteredExams}
            renderItem={renderExamCard}
            keyExtractor={(item) => item.id}
            numColumns={itemsPerRow}
            scrollEnabled={false}
            contentContainerStyle={styles.gridContainer}
            key={itemsPerRow} // Re-render when columns change
            showsVerticalScrollIndicator={false}
          />
        </View>

        {/* Available Banner */}
        <View style={[
          styles.availableBanner,
          isSmallScreen && styles.availableBannerSmall
        ]}>
          <Text style={[
            styles.bannerTitle,
            isSmallScreen && styles.bannerTitleSmall
          ]}>
            Complete Exam Resources
          </Text>
          <Text style={[
            styles.bannerSubtitle,
            isSmallScreen && styles.bannerSubtitleSmall
          ]}>
            Access syllabus, model papers, answer keys, and preparation guides
          </Text>
        </View>

        {/* YouTube Video Section */}
        <View style={styles.videoSection}>
          <View style={styles.videoHeader}>
            <Text style={[
              styles.videoTitle,
              isSmallScreen && styles.videoTitleSmall
            ]}>
              Exam Preparation Videos
            </Text>
            <TouchableOpacity
              onPress={() => Linking.openURL("https://www.youtube.com")}
            >
              <Text style={[
                styles.viewAllText,
                isSmallScreen && styles.viewAllTextSmall
              ]}>
                View All
              </Text>
            </TouchableOpacity>
          </View>
          
          <View style={[
            styles.videoBox,
            isSmallScreen && styles.videoBoxSmall
          ]}>
            <WebView
              allowsFullscreenVideo
              source={{
                uri: "https://www.youtube.com/embed/L2zqTYgcpfg",
              }}
              style={{ 
                height: isTablet ? 260 : isSmallScreen ? 180 : 200 
              }}
            />
          </View>
        </View>

        <View style={{ height: 80 }} />
      </ScrollView>

      <Footer />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: "#F6F9FF" 
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  // Header
  header: {
    backgroundColor: "#0052A2",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: Platform.OS === 'ios' ? 12 : 16,
    height: Platform.OS === 'ios' ? 60 : 64,
  },
  headerTitle: {
    color: "#fff",
    fontSize: Platform.OS === 'ios' ? 20 : 22,
    fontWeight: "700",
  },
  headerTitleSmall: {
    fontSize: Platform.OS === 'ios' ? 18 : 20,
  },
  // Advertisement Banner
  adContainer: {
    backgroundColor: "#fff",
    marginBottom: 0,
  },
  adSlide: {
    position: 'relative',
  },
  adImage: {
    resizeMode: "cover",
    width: '100%',
  },
  adContent: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    padding: 16,
  },
  adTitle: {
    color: "#fff",
    fontSize: Platform.OS === 'ios' ? 18 : 20,
    fontWeight: "700",
    marginBottom: 6,
  },
  adTitleSmall: {
    fontSize: Platform.OS === 'ios' ? 16 : 18,
  },
  adDesc: {
    color: "rgba(255, 255, 255, 0.9)",
    fontSize: Platform.OS === 'ios' ? 14 : 15,
  },
  adDescSmall: {
    fontSize: Platform.OS === 'ios' ? 12 : 13,
  },
  adBadge: {
    position: "absolute",
    top: 16,
    right: 16,
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 6,
  },
  adBadgeText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "700",
  },
  dots: {
    flexDirection: "row",
    justifyContent: "center",
    paddingVertical: 12,
    backgroundColor: "#fff",
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#ccc",
    marginHorizontal: 5,
  },
  activeDot: {
    width: 20,
    backgroundColor: "#0B5ED7",
  },
  // Category Header
  categoryHeader: {
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 16,
    marginTop: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },
  categoryTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: "#003366",
    marginBottom: 8,
  },
  categoryTitleSmall: {
    fontSize: 20,
  },
  categorySubtitle: {
    fontSize: 14,
    color: "#666",
    lineHeight: 20,
  },
  categorySubtitleSmall: {
    fontSize: 13,
    lineHeight: 18,
  },
  // Tab Navigation
  tabContainer: {
    backgroundColor: "#fff",
    paddingVertical: 12,
    borderBottomWidth: Platform.OS === 'ios' ? 0.5 : 1,
    borderBottomColor: "#E0E0E0",
  },
  tabContainerSmall: {
    paddingVertical: 10,
  },
  tabScrollContent: {
    paddingHorizontal: 16,
  },
  tabScrollContentSmall: {
    paddingHorizontal: 12,
  },
  tab: {
    paddingHorizontal: 16,
    paddingVertical: Platform.OS === 'ios' ? 8 : 10,
    marginRight: Platform.OS === 'ios' ? 16 : 20,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  tabIOS: {
    borderRadius: 8,
  },
  tabAndroid: {
    borderRadius: 4,
  },
  tabSmall: {
    paddingHorizontal: 12,
    paddingVertical: Platform.OS === 'ios' ? 6 : 8,
    marginRight: 12,
  },
  activeTab: {
    borderBottomColor: "#0B5ED7",
  },
  tabText: {
    fontSize: Platform.OS === 'ios' ? 14 : 15,
    fontWeight: Platform.OS === 'ios' ? "500" : "600",
  },
  tabTextIOS: {
    fontSize: 14,
    fontWeight: "500",
    color: "#666",
  },
  tabTextAndroid: {
    fontSize: 15,
    fontWeight: "600",
    color: "#666",
  },
  tabTextSmall: {
    fontSize: Platform.OS === 'ios' ? 13 : 14,
  },
  activeTabText: {
    color: "#0B5ED7",
    fontWeight: Platform.OS === 'ios' ? "600" : "700",
  },
  // Categories Container
  categoriesContainer: {
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 10,
  },
  gridContainer: {
    // Remove flexDirection and flexWrap
    // Let FlatList handle the layout
  },
  // Exam Card (Square Shape) - UPDATED
  examCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 12,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOpacity: 0.08,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 8,
      },
      android: {
        elevation: 3,
      },
    }),
    borderWidth: 1,
    borderColor: "#F0F0F0",
    justifyContent: "space-between",
  },
  cardIconContainer: {
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  cardIcon: {
    fontSize: 24,
  },
  cardContent: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: "600",
    color: "#003366",
    marginBottom: 6,
    lineHeight: 18,
  },
  cardTitleSmall: {
    fontSize: 14,
    lineHeight: 16,
  },
  cardDescription: {
    fontSize: 12,
    color: "#666",
    lineHeight: 16,
    marginBottom: 10,
    flex: 1,
  },
  cardDescriptionSmall: {
    fontSize: 11,
    lineHeight: 14,
  },
  cardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 'auto',
  },
  typeBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  typeText: {
    fontSize: 10,
    fontWeight: "600",
  },
  typeTextSmall: {
    fontSize: 9,
  },
  arrowContainer: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#F0F7FF",
    justifyContent: "center",
    alignItems: "center",
  },
  arrowContainerSmall: {
    width: 20,
    height: 20,
  },
  // Available Banner
  availableBanner: {
    backgroundColor: "#4c73ac",
    marginHorizontal: 16,
    marginVertical: 16,
    borderRadius: 12,
    padding: 20,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 6,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  availableBannerSmall: {
    padding: 16,
    marginVertical: 12,
  },
  bannerTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 8,
  },
  bannerTitleSmall: {
    fontSize: 16,
  },
  bannerSubtitle: {
    color: "#DCE8FF",
    fontSize: 14,
    lineHeight: 20,
  },
  bannerSubtitleSmall: {
    fontSize: 13,
    lineHeight: 18,
  },
  // YouTube Video
  videoSection: {
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    marginBottom: 30,
  },
  videoHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  videoTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#003366",
  },
  videoTitleSmall: {
    fontSize: 16,
  },
  viewAllText: {
    color: "#0B5ED7",
    fontSize: 14,
    fontWeight: "600",
  },
  viewAllTextSmall: {
    fontSize: 13,
  },
  videoBox: {
    borderRadius: 12,
    overflow: "hidden",
    backgroundColor: "#000",
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 4 },
        shadowRadius: 8,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  videoBoxSmall: {
    borderRadius: 10,
  },
});

export default Exam2;