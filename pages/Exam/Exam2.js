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

// Advertisement banners data
const ads = [
  {
    id: "1",
    image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=1200&h=400&fit=crop",
    url: "https://example.com/board-exams"
  },
  {
    id: "2",
    image: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=1200&h=400&fit=crop",
    url: "https://example.com/previous-papers"
  },
  {
    id: "3",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1200&h=400&fit=crop",
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
  
  // Responsive breakpoints
  const isMobile = screenWidth < 768;
  const isTablet = screenWidth >= 768 && screenWidth < 1024;
  const isDesktop = screenWidth >= 1024;
  const isWeb = Platform.OS === 'web';
  const isIOS = Platform.OS === 'ios';

  // Get exam title from navigation params
  const { examTitle = "School Board Exams" } = route.params || {};

  // Responsive value helper
  const responsiveValue = (mobile, tablet, desktop) => {
    if (isDesktop) return desktop;
    if (isTablet) return tablet;
    return mobile;
  };

  // Responsive scaling helper
  const scale = (size) => {
    if (isDesktop) return size * 1.2;
    if (isTablet) return size * 1.1;
    return size;
  };

  // Responsive ad banner height
  const adHeight = responsiveValue(
    isMobile ? 200 : 220, // Mobile: 200, Tablet: 220, Desktop: 240
    isTablet ? 300 : 240,
    isDesktop ? 240 : 260
  );

  // Responsive video height
  const videoHeight = responsiveValue(
    200, // Mobile
    300, // Tablet
    280  // Desktop
  );

  // Calculate items per row based on screen size
  const itemsPerRow = isDesktop ? 4 : (isTablet ? 3 : 2);
  
  // Calculate card dimensions
  const cardWidth = () => {
    const paddingHorizontal = responsiveValue(16, 24, 32);
    const gap = responsiveValue(8, 12, 16);
    const availableWidth = screenWidth - (paddingHorizontal * 2);
    const totalGap = gap * (itemsPerRow - 1);
    return (availableWidth - totalGap) / itemsPerRow;
  };

  const cardHeight = () => {
    return cardWidth() * 0.9; // Keep aspect ratio
  };

  // Filter exams based on active tab
  const filteredExams = examTypes.filter((exam) => {
    if (activeTab === "all") return true;
    return exam.type === activeTab;
  });

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

  // Advertisement Banner Component - Responsive
  const AdBanner = () => {
    return (
      <View style={[
        styles.adContainer,
        { marginBottom: responsiveValue(16, 20, 24) }
      ]}>
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
            </TouchableOpacity>
          ))}
        </ScrollView>
        
        {/* Dots Indicator */}
        <View style={[
          styles.dots, 
          { 
            paddingVertical: responsiveValue(10, 12, 14),
            backgroundColor: 'rgba(255, 255, 255, 0.8)',
          }
        ]}>
          {ads.map((_, i) => (
            <View
              key={i}
              style={[
                styles.dot, 
                { 
                  width: responsiveValue(6, 8, 10),
                  height: responsiveValue(6, 8, 10),
                  marginHorizontal: responsiveValue(4, 5, 6),
                },
                adIndex === i && styles.activeDot,
              ]}
            />
          ))}
        </View>
      </View>
    );
  };

  // Exam Card Component
  const ExamCard = ({ exam, index }) => {
    const currentCardWidth = cardWidth();
    const isLastInRow = (index + 1) % itemsPerRow === 0;
    const gap = responsiveValue(8, 12, 16);
    
    return (
      <TouchableOpacity
        style={[
          styles.examCard,
          { 
            width: currentCardWidth,
            height: cardHeight(),
            marginRight: isLastInRow ? 0 : gap,
            marginBottom: gap,
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
          width: responsiveValue(40, 48, 56),
          height: responsiveValue(40, 48, 56),
          borderRadius: responsiveValue(8, 10, 12),
        }]}>
          <Text style={[
            styles.cardIcon, 
            { fontSize: responsiveValue(20, 24, 28) }
          ]}>
            {exam.icon}
          </Text>
        </View>
        <View style={styles.cardContent}>
          <Text style={[
            styles.cardTitle,
            { fontSize: responsiveValue(13, 15, 16) }
          ]} numberOfLines={2}>
            {exam.title}
          </Text>
          <Text style={[
            styles.cardDescription,
            { fontSize: responsiveValue(11, 12, 13) }
          ]} numberOfLines={2}>
            {exam.description}
          </Text>
          <View style={styles.cardFooter}>
            <View style={[styles.typeBadge, { backgroundColor: exam.color + '20' }]}>
              <Text style={[
                styles.typeText, 
                { 
                  color: exam.color,
                  fontSize: responsiveValue(9, 10, 11)
                },
              ]}>
                {exam.type.charAt(0).toUpperCase() + exam.type.slice(1)}
              </Text>
            </View>
            <View style={[
              styles.arrowContainer,
              { 
                width: responsiveValue(20, 24, 28),
                height: responsiveValue(20, 24, 28),
              }
            ]}>
              <Ionicons 
                name="chevron-forward" 
                size={responsiveValue(14, 16, 18)} 
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

  // Responsive header height
  const headerHeight = responsiveValue(
    isIOS ? 60 : 64,
    isIOS ? 68 : 72,
    isIOS ? 72 : 80
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      
      {/* Header */}
      <View style={[
        styles.header,
        { 
          height: headerHeight,
          paddingHorizontal: responsiveValue(16, 24, 32),
        }
      ]}>
        <TouchableOpacity 
          onPress={() => navigation.goBack()}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Ionicons 
            name={isIOS ? "chevron-back" : "arrow-back"} 
            size={responsiveValue(22, 24, 26)} 
            color="#fff" 
          />
        </TouchableOpacity>
        <Text style={[
          styles.headerTitle,
          { fontSize: responsiveValue(18, 20, 22) }
        ]}>
          Exam Types
        </Text>
        <View style={{ width: responsiveValue(22, 24, 26) }} />
      </View>

      <ScrollView 
        showsVerticalScrollIndicator={isWeb} 
        style={styles.scrollView}
        contentContainerStyle={[
          styles.scrollContent,
          { paddingBottom: responsiveValue(20, 30, 40) }
        ]}
      >
        {/* Responsive Advertisement Banner */}
        <AdBanner />

        {/* Exam Category Header */}
        <View style={[
          styles.categoryHeader,
          { 
            paddingHorizontal: responsiveValue(16, 24, 32),
            paddingTop: responsiveValue(20, 24, 28),
            paddingBottom: responsiveValue(16, 20, 24),
            marginTop: responsiveValue(0, 4, 8),
          }
        ]}>
          <Text style={[
            styles.categoryTitle,
            { fontSize: responsiveValue(20, 22, 24) }
          ]}>
            {examTitle}
          </Text>
          <Text style={[
            styles.categorySubtitle,
            { 
              fontSize: responsiveValue(13, 14, 15),
              lineHeight: responsiveValue(18, 20, 22),
            }
          ]}>
            Select exam type to view detailed syllabus, patterns, and resources
          </Text>
        </View>

        {/* Tab Navigation */}
        <View style={[
          styles.tabContainer,
          { 
            paddingVertical: responsiveValue(10, 12, 14),
          }
        ]}>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={[
              styles.tabScrollContent,
              { paddingHorizontal: responsiveValue(16, 24, 32) }
            ]}
          >
            {tabs.map((tab) => (
              <TouchableOpacity
                key={tab.id}
                style={[
                  styles.tab,
                  activeTab === tab.id && styles.activeTab,
                  { 
                    paddingHorizontal: responsiveValue(12, 16, 20),
                    paddingVertical: responsiveValue(8, 10, 12),
                    marginRight: responsiveValue(12, 16, 20),
                  }
                ]}
                onPress={() => setActiveTab(tab.id)}
              >
                <Text style={[
                  styles.tabText,
                  activeTab === tab.id && styles.activeTabText,
                  { fontSize: responsiveValue(13, 14, 15) }
                ]}>
                  {tab.label}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Exam Types Grid */}
        <View style={[
          styles.categoriesContainer,
          { 
            paddingHorizontal: responsiveValue(16, 24, 32),
            paddingTop: responsiveValue(20, 24, 28),
            paddingBottom: responsiveValue(10, 15, 20),
          }
        ]}>
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
          { 
            marginHorizontal: responsiveValue(16, 24, 32),
            marginVertical: responsiveValue(16, 20, 24),
            padding: responsiveValue(16, 20, 24),
          }
        ]}>
          <Text style={[
            styles.bannerTitle,
            { fontSize: responsiveValue(16, 18, 20) }
          ]}>
            Complete Exam Resources
          </Text>
          <Text style={[
            styles.bannerSubtitle,
            { 
              fontSize: responsiveValue(13, 14, 15),
              lineHeight: responsiveValue(18, 20, 22),
            }
          ]}>
            Access syllabus, model papers, answer keys, and preparation guides
          </Text>
        </View>

        {/* Responsive YouTube Video Section */}
        <View style={[
          styles.videoSection,
          { 
            paddingHorizontal: responsiveValue(16, 24, 32),
            marginBottom: responsiveValue(30, 35, 40),
          }
        ]}>
          <View style={styles.videoHeader}>
            <Text style={[
              styles.videoTitle,
              { fontSize: responsiveValue(16, 18, 20) }
            ]}>
              Exam Preparation Videos
            </Text>
            <TouchableOpacity
              onPress={() => Linking.openURL("https://www.youtube.com")}
            >
              <Text style={[
                styles.viewAllText,
                { fontSize: responsiveValue(13, 14, 15) }
              ]}>
                View All
              </Text>
            </TouchableOpacity>
          </View>
          
          {/* Responsive Video Container */}
          <View style={[
            styles.videoBox,
            { 
              height: videoHeight,
              marginTop: responsiveValue(12, 16, 20),
            }
          ]}>
            {isWeb ? (
              <iframe
                width="100%"
                height="100%"
                src="https://www.youtube.com/embed/L2zqTYgcpfg?rel=0&showinfo=0&modestbranding=1"
                title="Exam Preparation Video"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                style={styles.videoIframe}
              />
            ) : (
              <WebView
                allowsFullscreenVideo
                source={{
                  uri: "https://www.youtube.com/embed/L2zqTYgcpfg",
                }}
                style={{ flex: 1, height: videoHeight }}
              />
            )}
          </View>
        </View>

        {/* Spacer for footer */}
        <View style={{ height: responsiveValue(80, 100, 120) }} />
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
  },
  
  // Header
  header: {
    backgroundColor: "#0052A2",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 4,
      },
      android: {
        elevation: 6,
      },
      web: {
        boxShadow: "0 4px 12px rgba(0, 82, 162, 0.3)",
      },
    }),
  },
  headerTitle: {
    color: "#fff",
    fontWeight: "700",
    textAlign: "center",
  },
  
  // Advertisement Banner - Responsive
  adContainer: {
    backgroundColor: "#fff",
    position: 'relative',
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
      web: {
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
      },
    }),
  },
  adSlide: {
    position: 'relative',
  },
  adImage: {
    resizeMode: "cover",
    width: '100%',
  },
  dots: {
    flexDirection: "row",
    justifyContent: "center",
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  dot: {
    borderRadius: 4,
    backgroundColor: "rgba(255, 255, 255, 0.6)",
    transition: "all 0.3s ease",
  },
  activeDot: {
    backgroundColor: "#0B5ED7",
  },
  
  // Category Header
  categoryHeader: {
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },
  categoryTitle: {
    fontWeight: "700",
    color: "#003366",
    marginBottom: 8,
  },
  categorySubtitle: {
    color: "#666",
  },
  
  // Tab Navigation
  tabContainer: {
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
  },
  tabScrollContent: {
    alignItems: 'center',
  },
  tab: {
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  activeTab: {
    borderBottomColor: "#0B5ED7",
  },
  tabText: {
    fontWeight: "500",
    color: "#666",
  },
  activeTabText: {
    color: "#0B5ED7",
    fontWeight: "700",
  },
  
  // Categories Container
  categoriesContainer: {
    backgroundColor: "#fff",
  },
  gridContainer: {
    // Let FlatList handle layout
  },
  
  // Exam Card
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
      web: {
        boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
        transition: "all 0.3s ease",
        cursor: "pointer",
        ":hover": {
          transform: "translateY(-4px)",
          boxShadow: "0 8px 20px rgba(0,0,0,0.12)",
        },
      },
    }),
    borderWidth: 1,
    borderColor: "#F0F0F0",
    justifyContent: "space-between",
  },
  cardIconContainer: {
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
    fontWeight: "600",
    color: "#003366",
    marginBottom: 6,
    lineHeight: 18,
  },
  cardDescription: {
    color: "#666",
    lineHeight: 16,
    marginBottom: 10,
    flex: 1,
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
    fontWeight: "600",
  },
  arrowContainer: {
    borderRadius: 12,
    backgroundColor: "#F0F7FF",
    justifyContent: "center",
    alignItems: "center",
  },
  
  // Available Banner
  availableBanner: {
    backgroundColor: "#4c73ac",
    borderRadius: 12,
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
      web: {
        boxShadow: "0 4px 12px rgba(76, 115, 172, 0.4)",
      },
    }),
  },
  bannerTitle: {
    color: "#fff",
    fontWeight: "700",
    marginBottom: 8,
  },
  bannerSubtitle: {
    color: "#DCE8FF",
  },
  
  // YouTube Video - Responsive
  videoSection: {
    backgroundColor: "#fff",
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
    borderRadius: 12,
    overflow: "hidden",
    backgroundColor: "#000",
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 4 },
        shadowRadius: 10,
      },
      android: {
        elevation: 6,
      },
      web: {
        boxShadow: "0 10px 40px rgba(0,0,0,0.3)",
      },
    }),
  },
  videoIframe: {
    border: "none",
    borderRadius: 12,
    width: "100%",
    backgroundColor: "#000",
  },
});

export default Exam2;