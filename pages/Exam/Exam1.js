import React, { useRef, useEffect, useState, useMemo } from "react";
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

const { width, height } = Dimensions.get("window");

/* -------- RESPONSIVE UTILITIES -------- */
const isMobile = width < 768;
const isTablet = width >= 768 && width < 1024;
const isDesktop = width >= 1024;

// Responsive scaling function
const scale = (size) => {
  if (isDesktop) return size * 1.2;
  if (isTablet) return size * 1.1;
  return size;
};

// Responsive value selector
const responsiveValue = (mobile, tablet, desktop) => {
  if (isDesktop) return desktop;
  if (isTablet) return tablet;
  return mobile;
};

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

  // Calculate grid columns based on screen size
  const numColumns = useMemo(() => {
    if (isDesktop) return 3;
    if (isTablet) return 2;
    return 2; // Mobile: 2 columns
  }, []);

  // Calculate card width based on columns
  const cardWidth = useMemo(() => {
    const padding = responsiveValue(16, 24, 32);
    const gap = responsiveValue(12, 16, 20);
    const availableWidth = screenWidth - (padding * 2);
    
    if (numColumns === 1) return availableWidth;
    return (availableWidth - (gap * (numColumns - 1))) / numColumns;
  }, [screenWidth, numColumns]);

  // Calculate ad height
  const adHeight = useMemo(() => {
    return responsiveValue(200, 240, 280);
  }, []);

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
              resizeMode="cover"
            />
            <View style={styles.adContent}>
              <Text style={[styles.adTitle, { fontSize: responsiveValue(18, 20, 22) }]}>
                {ad.title}
              </Text>
              <Text style={[styles.adDesc, { fontSize: responsiveValue(14, 15, 16) }]}>
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
              {
                width: scale(8),
                height: scale(8),
                marginHorizontal: scale(4)
              }
            ]}
          />
        ))}
      </View>
    </View>
  );

  // Exam Card Component
  const ExamCard = ({ exam }) => (
    <TouchableOpacity
      style={[
        styles.examCard,
        { 
          width: cardWidth,
          borderRadius: scale(12),
          padding: responsiveValue(16, 18, 20),
        }
      ]}
      onPress={() => navigation.navigate("Exam2", { examId: exam.id, examTitle: exam.title })}
      activeOpacity={0.8}
    >
      <View style={[
        styles.cardIconContainer, 
        { 
          backgroundColor: exam.color + '20',
          width: responsiveValue(56, 64, 72),
          height: responsiveValue(56, 64, 72),
          borderRadius: scale(12),
          marginBottom: scale(12),
        }
      ]}>
        <Text style={[styles.cardIcon, { fontSize: responsiveValue(28, 32, 36) }]}>
          {exam.icon}
        </Text>
      </View>
      <View style={styles.cardContent}>
        <Text style={[
          styles.cardTitle,
          { 
            fontSize: responsiveValue(16, 17, 18),
            lineHeight: scale(22),
            marginBottom: scale(8)
          }
        ]}>
          {exam.title}
        </Text>
        <Text style={[
          styles.cardDescription,
          { 
            fontSize: responsiveValue(12, 13, 14),
            lineHeight: scale(16),
            marginBottom: scale(12)
          }
        ]} 
          numberOfLines={2}
        >
          {exam.description}
        </Text>
        <View style={styles.cardFooter}>
          <View style={[
            styles.countBadge,
            { 
              paddingHorizontal: scale(10),
              paddingVertical: scale(4),
              borderRadius: scale(12),
            }
          ]}>
            <Text style={[
              styles.countText,
              { fontSize: responsiveValue(11, 12, 13) }
            ]}>
              {exam.count}
            </Text>
          </View>
          <View style={[
            styles.arrowContainer,
            { 
              width: scale(24),
              height: scale(24),
              borderRadius: scale(12),
            }
          ]}>
            <Ionicons name="chevron-forward" size={scale(18)} color={exam.color} />
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      
      {/* Header */}
      <View style={styles.headerWrapper}>
        <View style={[
          styles.header,
          { 
            height: responsiveValue(
              Platform.OS === "ios" ? 60 : 64,
              Platform.OS === "ios" ? 68 : 72,
              Platform.OS === "ios" ? 76 : 80
            ),
            paddingHorizontal: responsiveValue(16, 24, 32)
          }
        ]}>
          <TouchableOpacity 
            onPress={() => navigation.goBack()}
            style={styles.backBtn}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Ionicons name="arrow-back" size={scale(24)} color="#fff" />
          </TouchableOpacity>
          <Text style={[styles.headerTitle, { fontSize: responsiveValue(20, 22, 24) }]}>
            Exams
          </Text>
          <View style={{ width: scale(40) }} />
        </View>
      </View>

      <ScrollView 
        showsVerticalScrollIndicator={false} 
        contentContainerStyle={styles.scrollContent}
      >
        {/* Big Advertisement Banner First */}
        <AdBanner />

        {/* Exam Categories Grid */}
        <View style={[
          styles.categoriesContainer,
          { 
            paddingHorizontal: responsiveValue(16, 24, 32),
            paddingTop: responsiveValue(24, 28, 32),
            paddingBottom: responsiveValue(20, 24, 28),
          }
        ]}>
          <Text style={[
            styles.sectionTitle,
            { fontSize: responsiveValue(20, 22, 24) }
          ]}>
            Exam Categories
          </Text>
          <Text style={[
            styles.sectionSubtitle,
            { 
              fontSize: responsiveValue(14, 15, 16),
              lineHeight: scale(22),
              marginBottom: responsiveValue(20, 24, 28),
            }
          ]}>
            Browse exams by category and find the right preparation resources
          </Text>
          
          <View style={[
            styles.gridContainer,
            { 
              gap: responsiveValue(12, 16, 20),
            }
          ]}>
            {examCategories.map((exam) => (
              <ExamCard key={exam.id} exam={exam} />
            ))}
          </View>
        </View>

        {/* Available Banner */}
        <View style={[
          styles.availableBanner,
          { 
            marginHorizontal: responsiveValue(16, 24, 32),
            marginVertical: responsiveValue(20, 24, 28),
            borderRadius: scale(12),
            padding: responsiveValue(20, 24, 28),
          }
        ]}>
          <Text style={[
            styles.bannerTitle,
            { 
              fontSize: responsiveValue(18, 20, 22),
              marginBottom: scale(10),
            }
          ]}>
            Comprehensive Exam Resources
          </Text>
          <Text style={[
            styles.bannerSubtitle,
            { 
              fontSize: responsiveValue(14, 15, 16),
              lineHeight: scale(22),
            }
          ]}>
            Get syllabus, previous papers, mock tests, and preparation tips
          </Text>
        </View>

        {/* YouTube Video Section */}
        <View style={[
          styles.videoSection,
          { 
            paddingHorizontal: responsiveValue(16, 24, 32),
            marginBottom: responsiveValue(30, 36, 42),
          }
        ]}>
          <View style={styles.videoHeader}>
            <Text style={[
              styles.videoTitle,
              { fontSize: responsiveValue(18, 20, 22) }
            ]}>
              Exam Preparation Videos
            </Text>
            <TouchableOpacity
              onPress={() => Linking.openURL("https://www.youtube.com")}
            >
              <Text style={[
                styles.viewAllText,
                { fontSize: responsiveValue(14, 15, 16) }
              ]}>
                View All
              </Text>
            </TouchableOpacity>
          </View>
          
          <View style={[
            styles.videoBox,
            { 
              height: responsiveValue(200, 300, 280),
              borderRadius: scale(12),
              marginTop: responsiveValue(12, 14, 16),
            }
          ]}>
            <WebView
              allowsFullscreenVideo
              source={{
                uri: "https://www.youtube.com/embed/L2zqTYgcpfg",
              }}
              style={{ flex: 1 }}
            />
          </View>
        </View>

        <View style={{ height: responsiveValue(80, 100, 120) }} />
      </ScrollView>

      <Footer />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: "#F6F9FF",
    maxWidth: isDesktop ? 1400 : '100%',
    alignSelf: 'center',
    width: '100%',
  },
  
  scrollContent: {
    paddingBottom: responsiveValue(80, 100, 120),
  },

  // Header
  headerWrapper: {
    backgroundColor: "#0052A2",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 4,
    width: '100%',
  },
  
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  
  backBtn: {
    alignItems: 'flex-start',
    padding: scale(4),
  },
  
  headerTitle: {
    color: "#fff",
    fontWeight: "700",
    textAlign: "center",
    flex: 1,
  },

  // Advertisement Banner
  adContainer: {
    backgroundColor: "#fff",
    width: '100%',
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
    padding: responsiveValue(16, 20, 24),
  },
  
  adTitle: {
    color: "#fff",
    fontWeight: "700",
    marginBottom: scale(6),
  },
  
  adDesc: {
    color: "rgba(255, 255, 255, 0.9)",
  },
  
  adBadge: {
    position: "absolute",
    top: responsiveValue(16, 20, 24),
    right: responsiveValue(16, 20, 24),
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    paddingHorizontal: scale(10),
    paddingVertical: scale(5),
    borderRadius: scale(6),
  },
  
  adBadgeText: {
    color: "#fff",
    fontSize: scale(12),
    fontWeight: "700",
  },
  
  dots: {
    flexDirection: "row",
    justifyContent: "center",
    paddingVertical: scale(12),
    backgroundColor: "#fff",
  },
  
  dot: {
    borderRadius: scale(4),
    backgroundColor: "#ccc",
  },
  
  activeDot: {
    width: scale(20),
    backgroundColor: "#0B5ED7",
  },

  // Categories Container
  categoriesContainer: {
    backgroundColor: "#fff",
    width: '100%',
  },
  
  sectionTitle: {
    fontWeight: "700",
    color: "#003366",
  },
  
  sectionSubtitle: {
    color: "#666",
  },
  
  gridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-start",
  },

  // Exam Card
  examCard: {
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: scale(2) },
    shadowRadius: scale(8),
    elevation: 3,
    borderWidth: 1,
    borderColor: "#F0F0F0",
  },
  
  cardIconContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  
  cardIcon: {
    // Font size set inline
  },
  
  cardContent: {
    flex: 1,
  },
  
  cardTitle: {
    fontWeight: "600",
    color: "#003366",
  },
  
  cardDescription: {
    color: "#666",
  },
  
  cardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  
  countBadge: {
    backgroundColor: "#F0F7FF",
  },
  
  countText: {
    fontWeight: "600",
    color: "#0072BC",
  },
  
  arrowContainer: {
    backgroundColor: "#F0F7FF",
    justifyContent: "center",
    alignItems: "center",
  },

  // Available Banner
  availableBanner: {
    backgroundColor: "#4c73ac",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: scale(2) },
    shadowRadius: scale(6),
    elevation: 3,
    width: '100%',
    alignSelf: 'center',
    maxWidth: isDesktop ? 1200 : '100%',
  },
  
  bannerTitle: {
    color: "#fff",
    fontWeight: "700",
  },
  
  bannerSubtitle: {
    color: "#DCE8FF",
  },

  // YouTube Video
  videoSection: {
    backgroundColor: "#fff",
    width: '100%',
  },
  
  videoHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  
  videoTitle: {
    fontWeight: "700",
    color: "#003366",
  },
  
  viewAllText: {
    color: "#0B5ED7",
    fontWeight: "600",
  },
  
  videoBox: {
    overflow: "hidden",
    backgroundColor: "#000",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: scale(4) },
    shadowRadius: scale(8),
    elevation: 4,
    width: '100%',
  },
});

export default Exam1;