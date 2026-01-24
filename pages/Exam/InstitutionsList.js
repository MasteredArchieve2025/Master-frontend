// InstitutionsList.js
import React, { useState, useRef } from "react";
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
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons, MaterialIcons, Feather } from "@expo/vector-icons";
import { WebView } from "react-native-webview";

export default function InstitutionsList({ navigation }) {
  const { width } = useWindowDimensions();
  const isTablet = width >= 768;

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedArea, setSelectedArea] = useState("all");
  const [activeAd, setActiveAd] = useState(0);
  const adScrollRef = useRef(null);

  // Ad banners
  const ads = [
    {
      id: "1",
      title: "TOP TUITION CENTER PROGRAMS",
      subtitle: "Build Your Career With",
      cta: "Apply Now",
      image:
        "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&h=300&fit=crop",
      url: "https://example.com/apply",
    },
    {
      id: "2",
      title: "Quality Education",
      subtitle: "Join the Best Institutions",
      cta: "Enroll Now",
      image:
        "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&h=300&fit=crop",
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
    const slide = Math.round(event.nativeEvent.contentOffset.x / width);
    if (slide !== activeAd) {
      setActiveAd(slide);
    }
  };

  // Simple Institution Card Component
  const InstitutionCard = ({ institution }) => (
    <TouchableOpacity
      style={[styles.institutionCard, isTablet && styles.institutionCardTablet]}
      onPress={() =>
        navigation.navigate("InstituteDetails", {
          institution: {
            ...institution,
            // Adding more details for the details page
            rating: 4.5,
            students: "2,500+",
            courses: "15+ Programs",
            features: ["Smart Classes", "Sports Academy", "STEM Labs"],
            established: "1995",
            description:
              "A premier educational institution with modern facilities and experienced faculty.",
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
        style={styles.institutionLogo}
      />

      <View style={styles.cardContent}>
        <Text style={styles.institutionName} numberOfLines={2}>
          {institution.name}
        </Text>

        <View style={styles.locationContainer}>
          <View style={styles.locationItem}>
            <Feather name="map-pin" size={12} color="#4A90E2" />
            <Text style={styles.locationText}>{institution.area}</Text>
          </View>
          <View style={styles.locationItem}>
            <MaterialIcons name="location-city" size={12} color="#50C878" />
            <Text style={styles.locationText}>{institution.district}</Text>
          </View>
        </View>

        <View style={styles.typeContainer}>
          <Text style={styles.typeText}>{institution.type}</Text>
        </View>
      </View>

      <Ionicons name="chevron-forward" size={20} color="#999" />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Institutions</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Advertisement Banner */}
        <View style={styles.adContainer}>
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
                style={[styles.adSlide, { width: width - 32 }]}
                onPress={() => Linking.openURL(ad.url)}
                activeOpacity={0.9}
              >
                <Image
                  source={{ uri: ad.image }}
                  style={styles.adImage}
                  resizeMode="cover"
                />
                <View style={styles.adOverlay}>
                  <View style={styles.adContent}>
                    <Text style={styles.adSubtitle}>{ad.subtitle}</Text>
                    <Text style={styles.adTitle}>{ad.title}</Text>
                    <TouchableOpacity
                      style={styles.adButton}
                      onPress={() => Linking.openURL(ad.url)}
                    >
                      <Text style={styles.adButtonText}>{ad.cta}</Text>
                    </TouchableOpacity>
                  </View>
                  <View style={styles.adBadge}>
                    <Text style={styles.adBadgeText}>Ad</Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>

          {/* Dots Indicator */}
          <View style={styles.dotsContainer}>
            {ads.map((_, index) => (
              <View
                key={index}
                style={[styles.dot, activeAd === index && styles.activeDot]}
              />
            ))}
          </View>
        </View>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <View style={styles.searchBox}>
            <Ionicons name="search" size={20} color="#666" />
            <TextInput
              style={styles.searchInput}
              placeholder="Search institutions..."
              value={searchQuery}
              onChangeText={setSearchQuery}
              placeholderTextColor="#999"
            />
            {searchQuery.length > 0 && (
              <TouchableOpacity onPress={() => setSearchQuery("")}>
                <Ionicons name="close-circle" size={20} color="#999" />
              </TouchableOpacity>
            )}
          </View>
        </View>

        {/* Filter Chips */}
        <View style={styles.filterSection}>
          <Text style={styles.filterLabel}>Filter by Area:</Text>
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
                ]}
                onPress={() => setSelectedArea(area)}
              >
                <Text
                  style={[
                    styles.filterText,
                    selectedArea === area && styles.filterTextActive,
                  ]}
                >
                  {area === "all" ? "All Areas" : area}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Results Count */}
        <View style={styles.resultsHeader}>
          <Text style={styles.resultsText}>
            {filteredInstitutions.length} Institutions Found
          </Text>
          <Text style={styles.resultsSubtext}>
            Showing {selectedArea === "all" ? "all areas" : selectedArea}
          </Text>
        </View>

        {/* Institutions Grid */}
        <View
          style={[
            styles.institutionsGrid,
            isTablet && styles.institutionsGridTablet,
          ]}
        >
          {filteredInstitutions.length > 0 ? (
            filteredInstitutions.map((institution) => (
              <InstitutionCard key={institution.id} institution={institution} />
            ))
          ) : (
            <View style={styles.noResults}>
              <Ionicons name="search-outline" size={60} color="#ccc" />
              <Text style={styles.noResultsText}>No institutions found</Text>
              <Text style={styles.noResultsSubtext}>
                Try changing your search or filters
              </Text>
            </View>
          )}
        </View>

        {/* YouTube Video Section */}
        <View style={styles.videoSection}>
          <View style={styles.videoHeader}>
            <View style={styles.youtubeIcon}>
              <Ionicons name="logo-youtube" size={24} color="#FF0000" />
              <Text style={styles.youtubeText}>YouTube</Text>
            </View>
            <TouchableOpacity
              style={styles.openAppButton}
              onPress={() => Linking.openURL("https://www.youtube.com")}
            >
              <Text style={styles.openAppText}>Open App</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.videoBox}>
            <WebView
              allowsFullscreenVideo
              javaScriptEnabled
              domStorageEnabled
              originWhitelist={["*"]}
              source={{
                uri: "https://www.youtube.com/embed/L2zqTYgcpfg",
              }}
              style={{
                height: isTablet ? 250 : 200,
                width: "100%",
              }}
            />
          </View>

          <Text style={styles.videoDescription}>
            Horizon School Ad | A Heartfelt Journey of Learning and Growth
          </Text>
        </View>

        <View style={{ height: 30 }} />
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
    paddingBottom: 20,
  },
  // Header
  header: {
    backgroundColor: "#0052A2",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: Platform.OS === "ios" ? 14 : 18,
    height: Platform.OS === "ios" ? 64 : 68,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 6,
      },
    }),
  },
  headerTitle: {
    color: "#fff",
    fontSize: Platform.OS === "ios" ? 20 : 22,
    fontWeight: "700",
    textAlign: "center",
    flex: 1,
    marginHorizontal: 10,
  },
  // Advertisement Banner
  adContainer: {
    marginHorizontal: 16,
    marginTop: 20,
    marginBottom: 8,
    borderRadius: 12,
    overflow: "hidden",
    backgroundColor: "#fff",
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
    }),
  },
  adSlide: {
    height: 160,
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
    padding: 20,
    justifyContent: "center",
  },
  adContent: {
    maxWidth: "80%",
  },
  adSubtitle: {
    fontSize: 14,
    color: "rgba(255, 255, 255, 0.9)",
    marginBottom: 8,
    fontWeight: "500",
    textAlign: "center",
  },
  adTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#fff",
    marginBottom: 16,
    textAlign: "center",
    lineHeight: 26,
  },
  adButton: {
    alignSelf: "center",
    backgroundColor: "#4A90E2",
    paddingHorizontal: 24,
    paddingVertical: 10,
    borderRadius: 8,
  },
  adButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },
  adBadge: {
    position: "absolute",
    top: 12,
    right: 12,
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
  dotsContainer: {
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
    marginHorizontal: 4,
  },
  activeDot: {
    width: 24,
    backgroundColor: "#4A90E2",
  },
  // Search
  searchContainer: {
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 16,
  },
  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: Platform.OS === "ios" ? 14 : 16,
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
    }),
  },
  searchInput: {
    flex: 1,
    marginLeft: 12,
    fontSize: 15,
    color: "#333",
    paddingVertical: 0,
  },
  // Filter Section
  filterSection: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  filterLabel: {
    fontSize: 15,
    fontWeight: "600",
    color: "#003366",
    marginBottom: 8,
  },
  filterScroll: {
    marginBottom: 4,
  },
  filterChip: {
    backgroundColor: "#F0F0F0",
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 20,
    marginRight: 10,
  },
  filterChipActive: {
    backgroundColor: "#4A90E2",
  },
  filterText: {
    fontSize: 14,
    color: "#666",
    fontWeight: "600",
  },
  filterTextActive: {
    color: "#fff",
  },
  // Results Header
  resultsHeader: {
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  resultsText: {
    fontSize: 18,
    fontWeight: "700",
    color: "#003366",
    marginBottom: 4,
  },
  resultsSubtext: {
    fontSize: 14,
    color: "#666",
  },
  // Institutions Grid
  institutionsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingHorizontal: 12,
  },
  institutionsGridTablet: {
    paddingHorizontal: 16,
  },
  // Institution Card - SIMPLE VERSION
  institutionCard: {
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 4,
    marginBottom: 12,
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
    }),
  },
  institutionCardTablet: {
    width: "48%",
    marginHorizontal: "1%",
  },
  institutionLogo: {
    width: 60,
    height: 60,
    borderRadius: 10,
    marginRight: 16,
  },
  cardContent: {
    flex: 1,
  },
  institutionName: {
    fontSize: 16,
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
    fontSize: 13,
    color: "#666",
    marginLeft: 6,
    fontWeight: "500",
  },
  typeContainer: {
    alignSelf: "flex-start",
  },
  typeText: {
    fontSize: 12,
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
    paddingVertical: 60,
    paddingHorizontal: 20,
  },
  noResultsText: {
    fontSize: 18,
    color: "#666",
    fontWeight: "600",
    marginTop: 16,
    marginBottom: 8,
  },
  noResultsSubtext: {
    fontSize: 14,
    color: "#999",
    textAlign: "center",
    lineHeight: 20,
  },
  // YouTube Video Section
  videoSection: {
    marginHorizontal: 16,
    marginTop: 30,
    marginBottom: 20,
  },
  videoHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  youtubeIcon: {
    flexDirection: "row",
    alignItems: "center",
  },
  youtubeText: {
    fontSize: 18,
    fontWeight: "700",
    color: "#333",
    marginLeft: 8,
  },
  openAppButton: {
    backgroundColor: "#FF0000",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
  },
  openAppText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
  },
  videoBox: {
    borderRadius: 12,
    overflow: "hidden",
    backgroundColor: "#000",
    height: 200,
    marginBottom: 12,
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
    }),
  },
  videoDescription: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
    lineHeight: 20,
    fontStyle: "italic",
  },
});
