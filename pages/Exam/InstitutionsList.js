import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  useWindowDimensions,
  TextInput,
  Platform,
  Linking,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons, MaterialIcons, Feather } from "@expo/vector-icons";
import { WebView } from "react-native-webview";

export default function InstitutionsList({ navigation }) {
  const { width: screenWidth, height: screenHeight } = useWindowDimensions();
  
  // Responsive breakpoints
  const isMobile = screenWidth < 768;
  const isTablet = screenWidth >= 768 && screenWidth < 1024;
  const isDesktop = screenWidth >= 1024;
  const isWeb = Platform.OS === 'web';
  
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

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedArea, setSelectedArea] = useState("all");
  const [activeAd, setActiveAd] = useState(0);
  const adScrollRef = useRef(null);

  // Calculate responsive values
  const headerHeight = responsiveValue(
    Platform.OS === 'ios' ? 64 : 68,
    Platform.OS === 'ios' ? 72 : 76,
    Platform.OS === 'ios' ? 80 : 84
  );
  
  const headerPaddingHorizontal = responsiveValue(16, 24, 32);
  const headerPaddingVertical = responsiveValue(12, 16, 20);
  const headerTitleSize = responsiveValue(18, 20, 22);
  
  const contentPaddingHorizontal = responsiveValue(16, 24, 32);
  const cardMarginTop = responsiveValue(16, 20, 24);
  const cardPadding = responsiveValue(16, 20, 24);
  const cardBorderRadius = responsiveValue(12, 14, 16);
  
  // Responsive ad banner height
  const adHeight = responsiveValue(
    180,  // Mobile
    300,  // Tablet
    240   // Desktop
  );

  // Responsive video height
  const videoHeight = responsiveValue(
    200,  // Mobile
    300,  // Tablet
    280   // Desktop
  );

  // Auto scroll ads
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveAd((prev) => {
        const next = (prev + 1) % ads.length;
        adScrollRef.current?.scrollTo({ 
          x: next * (screenWidth - (contentPaddingHorizontal * 2)), 
          animated: true 
        });
        return next;
      });
    }, 3000);
    return () => clearInterval(timer);
  }, [screenWidth, contentPaddingHorizontal]);

  // Ad banners
  const ads = [
    {
      id: "1",
      title: "TOP TUITION CENTER PROGRAMS",
      subtitle: "Build Your Career With",
      cta: "Apply Now",
      image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1200&h=500&fit=crop",
      url: "https://example.com/apply",
    },
    {
      id: "2",
      title: "Quality Education",
      subtitle: "Join the Best Institutions",
      cta: "Enroll Now",
      image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=1200&h=500&fit=crop",
      url: "https://example.com/enroll",
    },
  ];

  // Institutions data
  const institutionsData = [
    {
      id: "1",
      name: "Horizon School",
      area: "Central Bangalore",
      district: "Bangalore Urban",
      logo: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=400&h=400&fit=crop",
      type: "Private School",
    },
    {
      id: "2",
      name: "National Institute of Open Schooling",
      area: "Sector 62",
      district: "Gautam Buddha Nagar",
      logo: "https://images.unsplash.com/photo-1562774053-701939374585?w=400&h=400&fit=crop",
      type: "Government Institute",
    },
    {
      id: "3",
      name: "Delhi Public School",
      area: "Mathura Road",
      district: "South Delhi",
      logo: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=400&h=400&fit=crop",
      type: "Private School",
    },
    {
      id: "4",
      name: "Kendriya Vidyalaya",
      area: "RK Puram",
      district: "South West Delhi",
      logo: "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=400&h=400&fit=crop",
      type: "Government School",
    },
    {
      id: "5",
      name: "Sri Chaitanya",
      area: "Madhapur",
      district: "Hyderabad",
      logo: "https://images.unsplash.com/photo-1588072432836-e10032774350?w=400&h=400&fit=crop",
      type: "Private Institute",
    },
    {
      id: "6",
      name: "FIITJEE",
      area: "Karol Bagh",
      district: "Central Delhi",
      logo: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400&h=400&fit=crop",
      type: "Private Institute",
    },
  ];

  // Available areas
  const areas = [
    "all",
    "Central Bangalore",
    "Sector 62",
    "Mathura Road",
    "RK Puram",
    "Madhapur",
    "Karol Bagh",
  ];

  // Filter institutions
  const filteredInstitutions = institutionsData.filter((institute) => {
    const matchesSearch =
      institute.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      institute.area.toLowerCase().includes(searchQuery.toLowerCase()) ||
      institute.district.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesArea =
      selectedArea === "all" || institute.area === selectedArea;

    return matchesSearch && matchesArea;
  });

  const handleAdScroll = (event) => {
    const slide = Math.round(event.nativeEvent.contentOffset.x / (screenWidth - (contentPaddingHorizontal * 2)));
    if (slide !== activeAd) {
      setActiveAd(slide);
    }
  };

  // Simple Institution Card Component
  const InstitutionCard = ({ institution }) => (
    <TouchableOpacity
      style={[
        styles.institutionCard,
        { 
          width: isMobile ? '100%' : (isTablet ? '48%' : '31%'),
          marginHorizontal: isMobile ? 0 : (isTablet ? '1%' : '1%'),
          marginBottom: responsiveValue(12, 16, 20),
          padding: responsiveValue(14, 16, 18),
          borderRadius: cardBorderRadius,
        }
      ]}
      onPress={() =>
        navigation.navigate("InstituteDetails", {
          institution: {
            ...institution,
            rating: 4.5,
            students: "2,500+",
            courses: "15+ Programs",
            features: ["Smart Classes", "Sports Academy", "STEM Labs"],
            established: "1995",
            description: "A premier educational institution with modern facilities and experienced faculty.",
            contact: {
              phone: "+91 98765 43210",
              email: "info@institution.edu",
              website: "www.institution.edu",
            },
            facilities: [
              "Wi-Fi Campus",
              "Computer Lab",
              "Library",
              "Sports Complex",
              "Science Labs",
              "Cafeteria",
            ],
          },
        })
      }
      activeOpacity={0.85}
    >
      <Image
        source={{ uri: institution.logo }}
        style={[
          styles.institutionLogo,
          { 
            width: responsiveValue(50, 60, 70),
            height: responsiveValue(50, 60, 70),
            borderRadius: responsiveValue(8, 10, 12),
            marginRight: responsiveValue(12, 16, 20),
          }
        ]}
      />

      <View style={styles.cardContent}>
        <Text style={[
          styles.institutionName,
          { fontSize: responsiveValue(15, 16, 17) }
        ]} numberOfLines={2}>
          {institution.name}
        </Text>

        <View style={styles.locationContainer}>
          <View style={styles.locationItem}>
            <Feather name="map-pin" size={responsiveValue(12, 13, 14)} color="#4A90E2" />
            <Text style={[
              styles.locationText,
              { fontSize: responsiveValue(12, 13, 14) }
            ]}>
              {institution.area}
            </Text>
          </View>
          <View style={styles.locationItem}>
            <MaterialIcons name="location-city" size={responsiveValue(12, 13, 14)} color="#50C878" />
            <Text style={[
              styles.locationText,
              { fontSize: responsiveValue(12, 13, 14) }
            ]}>
              {institution.district}
            </Text>
          </View>
        </View>

        <View style={styles.typeContainer}>
          <Text style={[
            styles.typeText,
            { fontSize: responsiveValue(11, 12, 13) }
          ]}>
            {institution.type}
          </Text>
        </View>
      </View>

      <Ionicons name="chevron-forward" size={responsiveValue(18, 20, 22)} color="#999" />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={[
        styles.header,
        { 
          height: headerHeight,
          paddingHorizontal: headerPaddingHorizontal,
          paddingVertical: headerPaddingVertical,
        }
      ]}>
        <TouchableOpacity 
          onPress={() => navigation.goBack()}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Ionicons 
            name={Platform.OS === 'ios' ? 'chevron-back' : 'arrow-back'} 
            size={scale(24)} 
            color="#fff" 
          />
        </TouchableOpacity>
        <Text style={[
          styles.headerTitle,
          { fontSize: headerTitleSize }
        ]}>
          Institutions
        </Text>
        <View style={{ width: scale(24) }} />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={isWeb}
        style={styles.scrollView}
        contentContainerStyle={[
          styles.scrollContent,
          { paddingBottom: responsiveValue(20, 30, 40) }
        ]}
      >
        {/* Advertisement Banner */}
        <View style={[
          styles.adContainer,
          { 
            marginHorizontal: contentPaddingHorizontal,
            marginTop: cardMarginTop,
            marginBottom: responsiveValue(8, 12, 16),
            borderRadius: cardBorderRadius,
          }
        ]}>
          <ScrollView
            ref={adScrollRef}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onScroll={handleAdScroll}
            scrollEventThrottle={16}
          >
            {ads.map((ad) => (
              <TouchableOpacity
                key={ad.id}
                style={[styles.adSlide, { 
                  width: screenWidth - (contentPaddingHorizontal * 2),
                  height: adHeight,
                }]}
                onPress={() => Linking.openURL(ad.url)}
                activeOpacity={0.9}
              >
                <Image
                  source={{ uri: ad.image }}
                  style={styles.adImage}
                  resizeMode="cover"
                />
                <View style={[
                  styles.adOverlay,
                  { padding: responsiveValue(16, 20, 24) }
                ]}>
                  <View style={styles.adContent}>
                    <Text style={[
                      styles.adSubtitle,
                      { fontSize: responsiveValue(14, 15, 16) }
                    ]}>
                      {ad.subtitle}
                    </Text>
                    <Text style={[
                      styles.adTitle,
                      { 
                        fontSize: responsiveValue(18, 20, 22),
                        marginBottom: responsiveValue(12, 16, 20),
                        lineHeight: responsiveValue(24, 26, 28),
                      }
                    ]}>
                      {ad.title}
                    </Text>
                    <TouchableOpacity
                      style={[
                        styles.adButton,
                        { 
                          paddingHorizontal: responsiveValue(20, 24, 28),
                          paddingVertical: responsiveValue(8, 10, 12),
                          borderRadius: responsiveValue(6, 8, 10),
                        }
                      ]}
                      onPress={() => Linking.openURL(ad.url)}
                    >
                      <Text style={[
                        styles.adButtonText,
                        { fontSize: responsiveValue(14, 16, 18) }
                      ]}>
                        {ad.cta}
                      </Text>
                    </TouchableOpacity>
                  </View>
                  <View style={[
                    styles.adBadge,
                    { 
                      paddingHorizontal: responsiveValue(8, 10, 12),
                      paddingVertical: responsiveValue(4, 6, 8),
                      borderRadius: responsiveValue(4, 6, 8),
                    }
                  ]}>
                    <Text style={[
                      styles.adBadgeText,
                      { fontSize: responsiveValue(10, 12, 12) }
                    ]}>
                      Ad
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>

          {/* Dots Indicator */}
          <View style={[
            styles.dotsContainer,
            { paddingVertical: responsiveValue(8, 10, 12) }
          ]}>
            {ads.map((_, index) => (
              <View
                key={index}
                style={[
                  styles.dot, 
                  { 
                    width: responsiveValue(6, 8, 10),
                    height: responsiveValue(6, 8, 10),
                    marginHorizontal: responsiveValue(3, 4, 5),
                  },
                  activeAd === index && styles.activeDot,
                ]}
              />
            ))}
          </View>
        </View>

        {/* Search Bar */}
        <View style={[
          styles.searchContainer,
          { 
            paddingHorizontal: contentPaddingHorizontal,
            paddingTop: responsiveValue(16, 20, 24),
            paddingBottom: responsiveValue(12, 16, 20),
          }
        ]}>
          <View style={[
            styles.searchBox,
            { 
              paddingHorizontal: responsiveValue(14, 16, 18),
              paddingVertical: responsiveValue(12, 14, 16),
              borderRadius: responsiveValue(10, 12, 14),
            }
          ]}>
            <Ionicons name="search" size={responsiveValue(18, 20, 22)} color="#666" />
            <TextInput
              style={[
                styles.searchInput,
                { 
                  fontSize: responsiveValue(14, 15, 16),
                  marginLeft: responsiveValue(10, 12, 14),
                }
              ]}
              placeholder="Search institutions..."
              value={searchQuery}
              onChangeText={setSearchQuery}
              placeholderTextColor="#999"
            />
            {searchQuery.length > 0 && (
              <TouchableOpacity onPress={() => setSearchQuery("")}>
                <Ionicons name="close-circle" size={responsiveValue(18, 20, 22)} color="#999" />
              </TouchableOpacity>
            )}
          </View>
        </View>

        {/* Filter Chips */}
        <View style={[
          styles.filterSection,
          { 
            paddingHorizontal: contentPaddingHorizontal,
            paddingBottom: responsiveValue(16, 20, 24),
          }
        ]}>
          <Text style={[
            styles.filterLabel,
            { fontSize: responsiveValue(14, 15, 16) }
          ]}>
            Filter by Area:
          </Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.filterScroll}
          >
            {areas.map((area) => (
              <TouchableOpacity
                key={area}
                style={[
                  styles.filterChip,
                  selectedArea === area && styles.filterChipActive,
                  { 
                    paddingHorizontal: responsiveValue(14, 16, 18),
                    paddingVertical: responsiveValue(8, 10, 12),
                    borderRadius: responsiveValue(16, 18, 20),
                    marginRight: responsiveValue(8, 10, 12),
                  }
                ]}
                onPress={() => setSelectedArea(area)}
              >
                <Text
                  style={[
                    styles.filterText,
                    selectedArea === area && styles.filterTextActive,
                    { fontSize: responsiveValue(13, 14, 15) }
                  ]}
                >
                  {area === "all" ? "All Areas" : area}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Results Count */}
        <View style={[
          styles.resultsHeader,
          { 
            paddingHorizontal: contentPaddingHorizontal,
            marginBottom: responsiveValue(12, 16, 20),
          }
        ]}>
          <Text style={[
            styles.resultsText,
            { fontSize: responsiveValue(16, 18, 20) }
          ]}>
            {filteredInstitutions.length} Institutions Found
          </Text>
          <Text style={[
            styles.resultsSubtext,
            { fontSize: responsiveValue(13, 14, 15) }
          ]}>
            Showing {selectedArea === "all" ? "all areas" : selectedArea}
          </Text>
        </View>

        {/* Institutions Grid */}
        <View
          style={[
            styles.institutionsGrid,
            { 
              paddingHorizontal: isMobile ? responsiveValue(8, 12, 16) : contentPaddingHorizontal,
            }
          ]}
        >
          {filteredInstitutions.length > 0 ? (
            filteredInstitutions.map((institution) => (
              <InstitutionCard key={institution.id} institution={institution} />
            ))
          ) : (
            <View style={[
              styles.noResults,
              { paddingVertical: responsiveValue(40, 50, 60) }
            ]}>
              <Ionicons name="search-outline" size={responsiveValue(50, 60, 70)} color="#ccc" />
              <Text style={[
                styles.noResultsText,
                { fontSize: responsiveValue(16, 18, 20) }
              ]}>
                No institutions found
              </Text>
              <Text style={[
                styles.noResultsSubtext,
                { 
                  fontSize: responsiveValue(13, 14, 15),
                  lineHeight: responsiveValue(20, 22, 24),
                }
              ]}>
                Try changing your search or filters
              </Text>
            </View>
          )}
        </View>

        {/* YouTube Video Section */}
        <View style={[
          styles.videoSection,
          { 
            marginHorizontal: contentPaddingHorizontal,
            marginTop: responsiveValue(24, 28, 32),
            marginBottom: responsiveValue(20, 24, 28),
          }
        ]}>
          <View style={[styles.videoHeader, { marginBottom: responsiveValue(12, 16, 20) }]}>
            <View style={styles.youtubeIcon}>
              <Ionicons name="logo-youtube" size={responsiveValue(20, 24, 28)} color="#FF0000" />
              <Text style={[
                styles.youtubeText,
                { 
                  fontSize: responsiveValue(16, 18, 20),
                  marginLeft: responsiveValue(6, 8, 10),
                }
              ]}>
                YouTube
              </Text>
            </View>
            <TouchableOpacity
              style={[
                styles.openAppButton,
                { 
                  paddingHorizontal: responsiveValue(12, 14, 16),
                  paddingVertical: responsiveValue(6, 8, 10),
                  borderRadius: responsiveValue(4, 6, 8),
                }
              ]}
              onPress={() => Linking.openURL("https://www.youtube.com")}
            >
              <Text style={[
                styles.openAppText,
                { fontSize: responsiveValue(12, 14, 15) }
              ]}>
                Open App
              </Text>
            </TouchableOpacity>
          </View>

          <View style={[
            styles.videoBox,
            { 
              height: videoHeight,
              borderRadius: cardBorderRadius,
              marginBottom: responsiveValue(10, 12, 14),
            }
          ]}>
            {isWeb ? (
              <iframe
                width="100%"
                height="100%"
                src="https://www.youtube.com/embed/L2zqTYgcpfg?rel=0&showinfo=0&modestbranding=1"
                title="Institution Video"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                style={styles.videoIframe}
              />
            ) : (
              <WebView
                allowsFullscreenVideo
                javaScriptEnabled
                domStorageEnabled
                originWhitelist={["*"]}
                source={{
                  uri: "https://www.youtube.com/embed/L2zqTYgcpfg",
                }}
                style={{ flex: 1, height: videoHeight }}
              />
            )}
          </View>

          <Text style={[
            styles.videoDescription,
            { 
              fontSize: responsiveValue(13, 14, 15),
              lineHeight: responsiveValue(20, 22, 24),
            }
          ]}>
            Horizon School Ad | A Heartfelt Journey of Learning and Growth
          </Text>
        </View>

        {/* Spacer */}
        <View style={{ height: responsiveValue(30, 40, 50) }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F6F9FF",
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
    flex: 1,
    marginHorizontal: 10,
  },
  // Advertisement Banner
  adContainer: {
    backgroundColor: "#fff",
    overflow: "hidden",
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
      },
      android: {
        elevation: 4,
      },
      web: {
        boxShadow: "0 4px 16px rgba(0,0,0,0.15)",
      },
    }),
  },
  adSlide: {
    position: "relative",
  },
  adImage: {
    width: "100%",
    height: "100%",
  },
  adOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    justifyContent: "center",
    alignItems: "center",
  },
  adContent: {
    maxWidth: "90%",
    alignItems: "center",
  },
  adSubtitle: {
    color: "rgba(255, 255, 255, 0.9)",
    fontWeight: "500",
    textAlign: "center",
    marginBottom: 8,
  },
  adTitle: {
    fontWeight: "700",
    color: "#fff",
    textAlign: "center",
  },
  adButton: {
    backgroundColor: "#4A90E2",
    ...Platform.select({
      web: {
        cursor: "pointer",
        transition: "all 0.2s ease",
        ":hover": {
          backgroundColor: "#3a80d2",
        },
      },
    }),
  },
  adButtonText: {
    color: "#fff",
    fontWeight: "700",
  },
  adBadge: {
    position: "absolute",
    top: 12,
    right: 12,
    backgroundColor: "rgba(0, 0, 0, 0.8)",
  },
  adBadgeText: {
    color: "#fff",
    fontWeight: "700",
  },
  dotsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  dot: {
    borderRadius: 4,
    backgroundColor: "#ccc",
    transition: "all 0.3s ease",
  },
  activeDot: {
    backgroundColor: "#4A90E2",
  },
  // Search
  searchContainer: {},
  searchBox: {
    flexDirection: "row",
    alignItems: "center",
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
  searchInput: {
    flex: 1,
    color: "#333",
    paddingVertical: 0,
  },
  // Filter Section
  filterSection: {},
  filterLabel: {
    fontWeight: "600",
    color: "#003366",
    marginBottom: 8,
  },
  filterScroll: {
    marginBottom: 4,
  },
  filterChip: {
    backgroundColor: "#F0F0F0",
  },
  filterChipActive: {
    backgroundColor: "#4A90E2",
  },
  filterText: {
    color: "#666",
    fontWeight: "600",
  },
  filterTextActive: {
    color: "#fff",
  },
  // Results Header
  resultsHeader: {},
  resultsText: {
    fontWeight: "700",
    color: "#003366",
    marginBottom: 4,
  },
  resultsSubtext: {
    color: "#666",
  },
  // Institutions Grid
  institutionsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  // Institution Card
  institutionCard: {
    backgroundColor: "#fff",
    flexDirection: "row",
    alignItems: "center",
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
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
  },
  institutionLogo: {
    resizeMode: "cover",
  },
  cardContent: {
    flex: 1,
  },
  institutionName: {
    fontWeight: "700",
    color: "#003366",
    marginBottom: 8,
    lineHeight: 20,
  },
  locationContainer: {
    flexDirection: "row",
    marginBottom: 8,
    gap: 8,
  },
  locationItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  locationText: {
    color: "#666",
    marginLeft: 6,
    fontWeight: "500",
  },
  typeContainer: {
    alignSelf: "flex-start",
  },
  typeText: {
    color: "#4A90E2",
    fontWeight: "600",
    backgroundColor: "#F0F7FF",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
  },
  // No Results
  noResults: {
    width: "100%",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  noResultsText: {
    color: "#666",
    fontWeight: "600",
    marginTop: 16,
    marginBottom: 8,
  },
  noResultsSubtext: {
    color: "#999",
    textAlign: "center",
  },
  // YouTube Video Section
  videoSection: {},
  videoHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  youtubeIcon: {
    flexDirection: "row",
    alignItems: "center",
  },
  youtubeText: {
    fontWeight: "700",
    color: "#333",
  },
  openAppButton: {
    backgroundColor: "#FF0000",
  },
  openAppText: {
    color: "#fff",
    fontWeight: "600",
  },
  videoBox: {
    overflow: "hidden",
    backgroundColor: "#000",
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
      },
      android: {
        elevation: 4,
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
  videoDescription: {
    color: "#666",
    textAlign: "center",
    fontStyle: "italic",
  },
});