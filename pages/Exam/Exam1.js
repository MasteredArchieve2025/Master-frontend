// Exam1.js
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
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { WebView } from "react-native-webview";
import Footer from "../../src/components/Footer";

const { width } = Dimensions.get("window");

// Advertisement banners data
const ads = [
  {
    id: "1",
    title: "Exam Preparation Books",
    description: "Get up to 40% off on best-selling exam guides",
    image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=800&h=300&fit=crop",
    url: "https://example.com/exam-books"
  },
  {
    id: "2",
    title: "Online Test Series",
    description: "Practice with 5000+ mock tests and previous papers",
    image: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=800&h=300&fit=crop",
    url: "https://example.com/test-series"
  },
  {
    id: "3",
    title: "Exam Success Coaching",
    description: "Personalized coaching for competitive exams",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&h=300&fit=crop",
    url: "https://example.com/coaching"
  },
];

// Exam categories data
const examCategories = [
  {
    id: "1",
    title: "School Board Exams",
    description: "Class 10 & 12 Board Exams (CBSE, ICSE, State Boards)",
    icon: "🏫",
    count: "2 Types",
    color: "#4A90E2",
  },
  {
    id: "2",
    title: "Government Recruitment Exams",
    description: "UPSC, SSC, Banking, Railway, Defense Exams",
    icon: "👮",
    count: "15+ Exams",
    color: "#50C878",
  },
  {
    id: "3",
    title: "Higher Education Exams",
    description: "JEE, NEET, CLAT, NDA, Design Entrance Exams",
    icon: "🎓",
    count: "10+ Exams",
    color: "#FF6B6B",
  },
  {
    id: "4",
    title: "Professional Entrance Exams",
    description: "CAT, GATE, GMAT, CA, CS, Medical PG Exams",
    icon: "💼",
    count: "20+ Exams",
    color: "#FFA500",
  },
  {
    id: "5",
    title: "International Exams",
    description: "SAT, GRE, GMAT, TOEFL, IELTS, PTE",
    icon: "🌍",
    count: "8+ Exams",
    color: "#9B59B6",
  },
  {
    id: "6",
    title: "Skill Development Exams",
    description: "ITI, Polytechnic, Vocational Training Exams",
    icon: "🔧",
    count: "12+ Exams",
    color: "#1ABC9C",
  },
];

const Exam1 = () => {
  const navigation = useNavigation();
  const [adIndex, setAdIndex] = useState(0);
  const adRef = useRef(null);
  const { width: screenWidth, height: screenHeight } = useWindowDimensions();
  const isTablet = screenWidth >= 768;

  // Calculate ad height
  const adHeight = Math.min(screenHeight * 0.25, 200);

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
              <Text style={styles.adTitle}>{ad.title}</Text>
              <Text style={styles.adDesc}>{ad.description}</Text>
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

  // Exam Card Component
  const ExamCard = ({ exam }) => (
    <TouchableOpacity
      style={styles.examCard}
      onPress={() => navigation.navigate("Exam2", { examId: exam.id, examTitle: exam.title })}
      activeOpacity={0.8}
    >
      <View style={[styles.cardIconContainer, { backgroundColor: exam.color + '20' }]}>
        <Text style={[styles.cardIcon, { fontSize: 28 }]}>{exam.icon}</Text>
      </View>
      <View style={styles.cardContent}>
        <Text style={styles.cardTitle}>{exam.title}</Text>
        <Text style={styles.cardDescription} numberOfLines={2}>
          {exam.description}
        </Text>
        <View style={styles.cardFooter}>
          <View style={styles.countBadge}>
            <Text style={styles.countText}>{exam.count}</Text>
          </View>
          <View style={styles.arrowContainer}>
            <Ionicons name="chevron-forward" size={18} color={exam.color} />
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Exams</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollView}>
        {/* Big Advertisement Banner First */}
        <AdBanner />

        {/* Exam Categories Grid */}
        <View style={styles.categoriesContainer}>
          <Text style={styles.sectionTitle}>Exam Categories</Text>
          <Text style={styles.sectionSubtitle}>
            Browse exams by category and find the right preparation resources
          </Text>
          
          <View style={styles.gridContainer}>
            {examCategories.map((exam) => (
              <ExamCard key={exam.id} exam={exam} />
            ))}
          </View>
        </View>

        {/* Available Banner */}
        <View style={styles.availableBanner}>
          <Text style={styles.bannerTitle}>
            Comprehensive Exam Resources
          </Text>
          <Text style={styles.bannerSubtitle}>
            Get syllabus, previous papers, mock tests, and preparation tips
          </Text>
        </View>

        {/* YouTube Video Section */}
        <View style={styles.videoSection}>
          <View style={styles.videoHeader}>
            <Text style={styles.videoTitle}>Exam Preparation Videos</Text>
            <TouchableOpacity
              onPress={() => Linking.openURL("https://www.youtube.com")}
            >
              <Text style={styles.viewAllText}>View All</Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.videoBox}>
            <WebView
              allowsFullscreenVideo
              source={{
                uri: "https://www.youtube.com/embed/L2zqTYgcpfg",
              }}
              style={{ height: isTablet ? 260 : 200 }}
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
  adDesc: {
    color: "rgba(255, 255, 255, 0.9)",
    fontSize: Platform.OS === 'ios' ? 14 : 15,
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
  // Categories Container
  categoriesContainer: {
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 16,
    marginTop: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#003366",
    marginBottom: 8,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: "#666",
    marginBottom: 20,
    lineHeight: 20,
  },
  gridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  // Exam Card
  examCard: {
    width: "48%",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
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
  },
  cardIconContainer: {
    width: 56,
    height: 56,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },
  cardIcon: {
    fontSize: 28,
  },
  cardContent: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#003366",
    marginBottom: 8,
    lineHeight: 20,
  },
  cardDescription: {
    fontSize: 12,
    color: "#666",
    lineHeight: 16,
    marginBottom: 12,
  },
  cardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  countBadge: {
    backgroundColor: "#F0F7FF",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  countText: {
    fontSize: 11,
    fontWeight: "600",
    color: "#0072BC",
  },
  arrowContainer: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#F0F7FF",
    justifyContent: "center",
    alignItems: "center",
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
  bannerTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 8,
  },
  bannerSubtitle: {
    color: "#DCE8FF",
    fontSize: 14,
    lineHeight: 20,
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
  viewAllText: {
    color: "#0B5ED7",
    fontSize: 14,
    fontWeight: "600",
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
});

export default Exam1;