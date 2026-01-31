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
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { WebView } from "react-native-webview";
import Footer from "../../src/components/Footer";

/* ===== AD BANNERS ===== */
const bannerAds = [
  "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=1200&auto=format&fit=crop",
];

/* ===== COURSE DATA ===== */
const coursesData = [
  {
    id: "1",
    name: "AK Technologies",
    location: "Chennai · 1.2 km",
    image: require("../../assets/AKlogo.png"),
    rating: 4.5,
  },
  {
    id: "2",
    name: "AK Technologies",
    location: "Bangalore · 2.5 km",
    image: require("../../assets/AKlogo.png"),
    rating: 4.8,
  },
  {
    id: "3",
    name: "AK Technologies",
    location: "Hyderabad · 4.0 km",
    image: require("../../assets/AKlogo.png"),
    rating: 4.3,
  },
  {
    id: "4",
    name: "AK Technologies",
    location: "Mumbai · 3.2 km",
    image: require("../../assets/AKlogo.png"),
    rating: 4.6,
  },
  {
    id: "5",
    name: "AK Technologies",
    location: "Delhi · 5.0 km",
    image: require("../../assets/AKlogo.png"),
    rating: 4.2,
  },
  {
    id: "6",
    name: "AK Technologies",
    location: "Pune · 2.8 km",
    image: require("../../assets/AKlogo.png"),
    rating: 4.7,
  },
];

export default function Course3({ route }) {
  const [selectedMode, setSelectedMode] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const navigation = useNavigation();
  const { width, height } = useWindowDimensions(); // ✅ Now inside component
  const isTablet = width >= 768;
  const isWeb = Platform.OS === 'web';
  
  /* ===== BANNER LOGIC ===== */
  const bannerRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => {
        const next = (prev + 1) % bannerAds.length;
        if (!isWeb && bannerRef.current) {
          bannerRef.current.scrollTo({
            x: next * width,
            animated: true,
          });
        }
        return next;
      });
    }, 3000);
    return () => clearInterval(timer);
  }, [width, isWeb]);

  const filteredCourses = coursesData.filter(course => {
    const matchesSearch = searchQuery === "" || 
      course.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  /* ===== RENDER COURSE CARD ===== */
  const renderCourseCard = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.card,
        {
          marginHorizontal: isTablet ? 24 : 16,
          marginBottom: isTablet ? 18 : 14,
          padding: isTablet ? 18 : 14,
          borderRadius: isTablet ? 18 : 16,
        }
      ]}
      activeOpacity={0.85}
      onPress={() => navigation.navigate("Course4", { course: item })}
    >
      <Image 
        source={item.image} 
        style={[
          styles.image,
          { 
            width: isTablet ? 100 : 80,
            height: isTablet ? 100 : 80,
            borderRadius: isTablet ? 14 : 12,
          }
        ]} 
      />

      <View style={[
        styles.cardContent,
        { marginLeft: isTablet ? 18 : 14 }
      ]}>
        <View style={styles.cardHeader}>
          <Text style={[
            styles.name,
            { fontSize: isTablet ? 18 : 16 }
          ]} numberOfLines={1}>
            {item.name}
          </Text>
          <View style={styles.ratingContainer}>
            <Ionicons name="star" size={isTablet ? 16 : 14} color="#FFB703" />
            <Text style={[
              styles.rating,
              { fontSize: isTablet ? 14 : 12 }
            ]}>
              {item.rating}
            </Text>
          </View>
        </View>

        <Text style={[
          styles.location,
          { fontSize: isTablet ? 14 : 12 }
        ]}>
          📍 {item.location}
        </Text>

        <View style={styles.tags}>
          <Text style={[
            styles.tagBlue,
            { fontSize: isTablet ? 13 : 11 }
          ]}>
            Online & Offline
          </Text>
        </View>
      </View>

      <Ionicons 
        name="chevron-forward" 
        size={isTablet ? 24 : 20} 
        color="#0B5ED7" 
        style={styles.chevronIcon}
      />
    </TouchableOpacity>
  );

  const renderAdSlider = () => {
    if (isWeb) {
      return (
        <Image
          source={{ uri: bannerAds[activeIndex] }}
          style={[
            styles.adImage,
            { 
              height: isTablet ? 200 : 180,
            }
          ]}
          resizeMode="cover"
        />
      );
    }
    
    return (
      <ScrollView
        ref={bannerRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={(e) =>
          setActiveIndex(Math.round(e.nativeEvent.contentOffset.x / width))
        }
      >
        {bannerAds.map((img, index) => (
          <Image
            key={index}
            source={{ uri: img }}
            style={{
              width,
              height: isTablet ? 300 : 180,
            }}
            resizeMode="cover"
          />
        ))}
      </ScrollView>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0052A2" />

      {/* ===== HEADER ===== */}
      <View style={[
        styles.header,
        {
          paddingHorizontal: isTablet ? 24 : 16,
          paddingVertical: isTablet ? 20 : 16,
        }
      ]}>
        <TouchableOpacity 
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={isTablet ? 28 : 24} color="#fff" />
        </TouchableOpacity>

        <View style={styles.headerCenter}>
          <Text style={[
            styles.headerTitle,
            { fontSize: isTablet ? 26 : 22 }
          ]}>
            Course Providers
          </Text>
        </View>
        
        <View style={{ 
          width: isTablet ? 28 : 24,
          height: isTablet ? 28 : 24,
        }} />
      </View>

      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* ===== TOP ADS BANNER ===== */}
        {renderAdSlider()}

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

        {/* ===== SEARCH & FILTER ROW ===== */}
        <View style={[
          styles.searchFilterRow,
          {
            marginHorizontal: isTablet ? 24 : 16,
            marginBottom: isTablet ? 20 : 16,
          }
        ]}>
          {/* SEARCH INPUT */}
          <View style={[
            styles.searchContainer,
            {
              flex: 1,
              marginRight: isTablet ? 12 : 8,
              padding: isTablet ? 14 : 10,
              borderRadius: isTablet ? 14 : 12,
            }
          ]}>
            <Ionicons name="search" size={isTablet ? 20 : 16} color="#666" />
            <TextInput
              placeholder="Search by name or location..."
              placeholderTextColor="#666"
              value={searchQuery}
              onChangeText={setSearchQuery}
              style={[
                styles.searchInput,
                { fontSize: isTablet ? 16 : 14 }
              ]}
            />
            {searchQuery.length > 0 && (
              <TouchableOpacity onPress={() => setSearchQuery("")}>
                <Ionicons name="close-circle" size={isTablet ? 20 : 16} color="#999" />
              </TouchableOpacity>
            )}
          </View>

          {/* FILTER BUTTON */}
          <TouchableOpacity 
            style={[
              styles.filterButton,
              {
                padding: isTablet ? 14 : 10,
                borderRadius: isTablet ? 14 : 12,
              },
              showFilters && styles.filterButtonActive
            ]}
            onPress={() => setShowFilters(!showFilters)}
          >
            <Ionicons 
              name="filter" 
              size={isTablet ? 22 : 18} 
              color={showFilters ? "#fff" : "#0B5ED7"} 
            />
            {showFilters && (
              <Text style={[
                styles.filterButtonText,
                { fontSize: isTablet ? 16 : 13, marginLeft: 8 }
              ]}>
                Filters
              </Text>
            )}
          </TouchableOpacity>
        </View>

        {/* ===== FILTER OPTIONS (SHOW/HIDE) ===== */}
        {showFilters && (
          <View style={[
            styles.filterOptions,
            {
              marginHorizontal: isTablet ? 24 : 16,
              marginBottom: isTablet ? 20 : 16,
              padding: isTablet ? 20 : 16,
              borderRadius: isTablet ? 16 : 14,
            }
          ]}>
            <Text style={[
              styles.filterOptionsTitle,
              { fontSize: isTablet ? 18 : 16 }
            ]}>
              Filter Options
            </Text>
            
            <View style={styles.filterOptionsRow}>
              <TouchableOpacity 
                style={[
                  styles.filterOption,
                  selectedMode === "All" && styles.filterOptionActive
                ]}
                onPress={() => setSelectedMode("All")}
              >
                <Text style={[
                  styles.filterOptionText,
                  selectedMode === "All" && styles.filterOptionTextActive
                ]}>
                  All
                </Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={[
                  styles.filterOption,
                  selectedMode === "Online" && styles.filterOptionActive
                ]}
                onPress={() => setSelectedMode("Online")}
              >
                <Text style={[
                  styles.filterOptionText,
                  selectedMode === "Online" && styles.filterOptionTextActive
                ]}>
                  Online
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {/* ===== CATEGORIES ===== */}
        <View style={[
          styles.categories,
          {
            marginHorizontal: isTablet ? 24 : 16,
            marginBottom: isTablet ? 20 : 16,
          }
        ]}>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoriesScroll}
          >
            {["All", "Online", "Offline", "Online & Offline"].map(
              (cat) => (
                <TouchableOpacity
                  key={cat}
                  style={[
                    styles.categoryBtn,
                    {
                      paddingHorizontal: isTablet ? 20 : 16,
                      paddingVertical: isTablet ? 10 : 8,
                      borderRadius: isTablet ? 20 : 18,
                      marginRight: isTablet ? 12 : 8,
                    },
                    selectedMode === cat && styles.activeCategoryBtn,
                  ]}
                  onPress={() => setSelectedMode(cat)}
                >
                  <Text
                    style={[
                      styles.categoryText,
                      { fontSize: isTablet ? 16 : 13 },
                      selectedMode === cat && styles.activeCategoryText,
                    ]}
                  >
                    {cat}
                  </Text>
                </TouchableOpacity>
              )
            )}
          </ScrollView>
        </View>

        {/* ===== COURSE LIST HEADER ===== */}
        <View style={[
          styles.coursesHeader,
          {
            marginHorizontal: isTablet ? 24 : 16,
            marginBottom: isTablet ? 16 : 12,
          }
        ]}>
          <Text style={[
            styles.coursesTitle,
            { fontSize: isTablet ? 22 : 18 }
          ]}>
            Available Courses
          </Text>
          <Text style={[
            styles.coursesCount,
            { fontSize: isTablet ? 16 : 13 }
          ]}>
            {filteredCourses.length} providers found
          </Text>
        </View>

        {/* ===== COURSE LIST ===== */}
        <FlatList
          data={filteredCourses}
          renderItem={renderCourseCard}
          keyExtractor={(item) => item.id}
          scrollEnabled={false}
          contentContainerStyle={styles.listContent}
          ListEmptyComponent={
            <View style={[
              styles.emptyContainer,
              { marginHorizontal: isTablet ? 24 : 16 }
            ]}>
              <Ionicons name="school-outline" size={isTablet ? 60 : 48} color="#ccc" />
              <Text style={[
                styles.emptyText,
                { fontSize: isTablet ? 18 : 16 }
              ]}>
                No courses found
              </Text>
              <Text style={[
                styles.emptySubtext,
                { fontSize: isTablet ? 14 : 12 }
              ]}>
                Try changing your search or filter criteria
              </Text>
            </View>
          }
        />

        {/* ===== VIDEO SECTION ===== */}
        <View style={[
          styles.sectionHeader,
          {
            marginHorizontal: isTablet ? 24 : 16,
            marginTop: isTablet ? 24 : 20,
            marginBottom: isTablet ? 16 : 12,
          }
        ]}>
          <Text style={[
            styles.sectionTitle,
            { fontSize: isTablet ? 22 : 18 }
          ]}>
            Course Introduction
          </Text>
        </View>

        <View style={[
          styles.videoContainer,
          {
            marginHorizontal: isTablet ? 24 : 16,
            marginBottom: isTablet ? 32 : 24,
            borderRadius: isTablet ? 16 : 14,
          }
        ]}>
          {isWeb ? (
            <iframe
              width="100%"
              height={isTablet ? 320 : 220}
              src="https://www.youtube.com/embed/NONufn3jgXI?rel=0&showinfo=0&modestbranding=1"
              title="Course Introduction Video"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              style={styles.videoIframe}
            />
          ) : (
            <WebView
              allowsFullscreenVideo
              source={{ uri: "https://www.youtube.com/embed/NONufn3jgXI?rel=0&showinfo=0&modestbranding=1" }}
              style={{ height: isTablet ? 320 : 220 }}
              javaScriptEnabled={true}
              domStorageEnabled={true}
              mediaPlaybackRequiresUserAction={false}
            />
          )}
        </View>

        <View style={{ height: isTablet ? 140 : 120 }} />
      </ScrollView>

      <Footer />
    </SafeAreaView>
  );
}



/* ================= STYLES ================= */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F6F9FF",
  },
  
  scrollContent: {
    flexGrow: 1,
  },

  /* HEADER */
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

  backButton: {
    padding: 4,
  },

  headerCenter: {
    alignItems: "center",
    flex: 1,
  },

  headerTitle: {
    color: "#fff",
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 2,
  },

  /* AD IMAGE */
  adImage: {
    width: '100%',
    backgroundColor: '#f0f0f0',
  },

  /* DOTS */
  dots: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 12,
    height: 20,
  },

  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#ccc",
    marginHorizontal: 6,
    transition: "all 0.3s ease",
  },

  activeDot: {
    width: 24,
    height: 8,
    backgroundColor: "#0B5ED7",
  },

  /* SEARCH & FILTER ROW */
  searchFilterRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  searchContainer: {
    backgroundColor: "#fff",
    flexDirection: "row",
    alignItems: "center",
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 3,
      },
      android: {
        elevation: 2,
      },
      web: {
        boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
      },
    }),
  },

  searchInput: {
    flex: 1,
    marginLeft: 12,
    marginRight: 8,
    color: "#333",
  },

  filterButton: {
    backgroundColor: "#fff",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 3,
      },
      android: {
        elevation: 2,
      },
      web: {
        boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
        cursor: "pointer",
        transition: "all 0.2s ease",
        ":hover": {
          backgroundColor: "#F0F4FF",
        },
      },
    }),
  },

  filterButtonActive: {
    backgroundColor: "#0B5ED7",
  },

  filterButtonText: {
    color: "#fff",
    fontWeight: "600",
  },

  /* FILTER OPTIONS */
  filterOptions: {
    backgroundColor: "#fff",
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 6,
      },
      android: {
        elevation: 3,
      },
      web: {
        boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
      },
    }),
  },

  filterOptionsTitle: {
    fontWeight: "600",
    color: "#333",
    marginBottom: 16,
  },

  filterOptionsRow: {
    flexDirection: "row",
    marginBottom: 12,
  },

  filterOption: {
    backgroundColor: "#F5F7FA",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 10,
    marginRight: 12,
  },

  filterOptionActive: {
    backgroundColor: "#0B5ED7",
  },

  filterOptionText: {
    color: "#666",
    fontWeight: "500",
  },

  filterOptionTextActive: {
    color: "#fff",
  },

  /* CATEGORIES */
  categories: {
    marginTop: 4,
  },

  categoriesScroll: {
    paddingVertical: 4,
  },

  categoryBtn: {
    backgroundColor: "#F1F3F6",
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
      },
      android: {
        elevation: 1,
      },
      web: {
        cursor: "pointer",
        transition: "all 0.2s ease",
      },
    }),
  },

  activeCategoryBtn: {
    backgroundColor: "#0B5ED7",
  },

  categoryText: {
    color: "#5F6F81",
    fontWeight: "500",
  },

  activeCategoryText: {
    color: "#fff",
    fontWeight: "600",
  },

  /* COURSES HEADER */
  coursesHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  coursesTitle: {
    fontWeight: "700",
    color: "#000",
  },

  coursesCount: {
    color: "#666",
    fontWeight: "500",
  },

  /* LIST CONTENT */
  listContent: {
    paddingTop: 8,
  },

  /* EMPTY STATE */
  emptyContainer: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 32,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },

  emptyText: {
    color: "#333",
    fontWeight: "600",
    marginTop: 16,
    marginBottom: 8,
  },

  emptySubtext: {
    color: "#666",
    textAlign: "center",
  },

  /* CARD */
  card: {
    backgroundColor: "#fff",
    flexDirection: "row",
    alignItems: "center",
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 6,
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
          backgroundColor: "#F8FBFF",
        },
      },
    }),
  },

  image: {
    resizeMode: "cover",
  },

  cardContent: {
    flex: 1,
    marginRight: 12,
  },

  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 4,
  },

  name: {
    fontWeight: "700",
    color: "#000",
    flex: 1,
    marginRight: 8,
  },

  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF9E6",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    minWidth: 50,
    justifyContent: "center",
  },

  rating: {
    color: "#000",
    fontWeight: "600",
    marginLeft: 4,
  },

  location: {
    color: "#5F6F81",
    marginBottom: 8,
  },

  tags: {
    flexDirection: "row",
    flexWrap: "wrap",
  },

  tagBlue: {
    backgroundColor: "#E8F1FF",
    color: "#0B5ED7",
    fontWeight: "500",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
    marginRight: 8,
    marginBottom: 4,
    overflow: "hidden",
  },

  chevronIcon: {
    opacity: 0.8,
  },

  /* SECTION HEADER */
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  sectionTitle: {
    fontWeight: "700",
    color: "#000",
  },

  /* VIDEO CONTAINER */
  videoContainer: {
    overflow: "hidden",
    backgroundColor: "#000",
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 10,
      },
      android: {
        elevation: 8,
      },
      web: {
        boxShadow: "0 8px 32px rgba(0,0,0,0.25)",
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