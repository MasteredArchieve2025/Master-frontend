// InstituteDetails.js
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  useWindowDimensions,
  Linking,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { 
  Ionicons, 
  MaterialIcons, 
  FontAwesome, 
  MaterialCommunityIcons,
  Feather,
  Entypo 
} from "@expo/vector-icons";
import { WebView } from "react-native-webview";

export default function InstituteDetails({ navigation, route }) {
  const { width } = useWindowDimensions();
  const isTablet = width >= 768;

  const { institution } = route.params || {};

  // Render star ratings
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(<Ionicons key={i} name="star" size={18} color="#FFD700" />);
      } else {
        stars.push(<Ionicons key={i} name="star-outline" size={18} color="#FFD700" />);
      }
    }
    return stars;
  };

  // Feature Item Component
  const FeatureItem = ({ icon, title, value }) => (
    <View style={styles.featureItem}>
      <View style={styles.featureIcon}>
        {icon}
      </View>
      <View style={styles.featureContent}>
        <Text style={styles.featureTitle}>{title}</Text>
        <Text style={styles.featureValue}>{value}</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle} numberOfLines={1}>
          Institute Details
        </Text>
        <TouchableOpacity onPress={() => navigation.navigate("Home")}>
          <Ionicons name="home-outline" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      <ScrollView 
        showsVerticalScrollIndicator={false}
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Institute Header */}
        <View style={styles.instituteHeader}>
          <Image
            source={{ uri: institution?.logo }}
            style={styles.instituteLogo}
          />
          <View style={styles.titleContainer}>
            <Text style={styles.instituteName}>{institution?.name}</Text>
            <View style={styles.typeRatingContainer}>
              <View style={[
                styles.typeBadge,
                institution?.type.includes("Private") 
                  ? { backgroundColor: "#F3E5F5" } 
                  : { backgroundColor: "#E3F2FD" }
              ]}>
                <Text style={[
                  styles.typeText,
                  institution?.type.includes("Private")
                    ? { color: "#7B1FA2" }
                    : { color: "#1565C0" }
                ]}>
                  {institution?.type}
                </Text>
              </View>
              <View style={styles.ratingContainer}>
                {renderStars(institution?.rating || 4.5)}
                <Text style={styles.ratingText}>{institution?.rating || 4.5}/5</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Location Details */}
        <View style={styles.locationCard}>
          <View style={styles.locationHeader}>
            <Feather name="map-pin" size={20} color="#4A90E2" />
            <Text style={styles.locationTitle}>Location Details</Text>
          </View>
          <View style={styles.locationDetails}>
            <View style={styles.locationRow}>
              <MaterialIcons name="location-city" size={18} color="#666" />
              <View style={styles.locationInfo}>
                <Text style={styles.locationLabel}>Area</Text>
                <Text style={styles.locationValue}>{institution?.area}</Text>
              </View>
            </View>
            <View style={styles.locationRow}>
              <MaterialCommunityIcons name="city" size={18} color="#666" />
              <View style={styles.locationInfo}>
                <Text style={styles.locationLabel}>District</Text>
                <Text style={styles.locationValue}>{institution?.district}</Text>
              </View>
            </View>
            <View style={styles.locationRow}>
              <Ionicons name="calendar" size={18} color="#666" />
              <View style={styles.locationInfo}>
                <Text style={styles.locationLabel}>Established</Text>
                <Text style={styles.locationValue}>{institution?.established}</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Description */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>About Institute</Text>
          <Text style={styles.descriptionText}>
            {institution?.description || "A premier educational institution offering quality education with modern facilities and experienced faculty."}
          </Text>
        </View>

        {/* Quick Stats */}
        <View style={styles.statsGrid}>
          <View style={styles.statCard}>
            <Ionicons name="people" size={28} color="#4A90E2" />
            <Text style={styles.statNumber}>{institution?.students || "2,500+"}</Text>
            <Text style={styles.statLabel}>Students</Text>
          </View>
          <View style={styles.statCard}>
            <MaterialIcons name="school" size={28} color="#50C878" />
            <Text style={styles.statNumber}>{institution?.courses || "15+"}</Text>
            <Text style={styles.statLabel}>Courses</Text>
          </View>
          <View style={styles.statCard}>
            <FontAwesome name="graduation-cap" size={26} color="#FF6B6B" />
            <Text style={styles.statNumber}>{institution?.rating || 4.5}/5</Text>
            <Text style={styles.statLabel}>Rating</Text>
          </View>
          <View style={styles.statCard}>
            <MaterialIcons name="verified" size={28} color="#9B59B6" />
            <Text style={styles.statNumber}>{institution?.established || "1995"}</Text>
            <Text style={styles.statLabel}>Established</Text>
          </View>
        </View>

        {/* Key Features */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Key Features</Text>
          <View style={styles.featuresList}>
            {(institution?.features || ["Smart Classes", "Sports Academy", "STEM Labs"]).map((feature, index) => (
              <View key={index} style={styles.featureRow}>
                <Ionicons name="checkmark-circle" size={18} color="#50C878" />
                <Text style={styles.featureItemText}>{feature}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Facilities */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Facilities</Text>
          <View style={styles.facilitiesGrid}>
            {(institution?.facilities || ["Wi-Fi Campus", "Computer Lab", "Library", "Sports Complex", "Science Labs", "Cafeteria"]).slice(0, 6).map((facility, index) => (
              <View key={index} style={styles.facilityItem}>
                {index === 0 && <Ionicons name="wifi" size={24} color="#4A90E2" />}
                {index === 1 && <MaterialIcons name="computer" size={24} color="#50C878" />}
                {index === 2 && <Ionicons name="library" size={24} color="#FF6B6B" />}
                {index === 3 && <Ionicons name="fitness" size={24} color="#9B59B6" />}
                {index === 4 && <MaterialIcons name="science" size={24} color="#FFA500" />}
                {index === 5 && <MaterialIcons name="local-cafe" size={24} color="#E74C3C" />}
                <Text style={styles.facilityText}>{facility}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Contact Info */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Contact Information</Text>
          <View style={styles.contactInfo}>
            <FeatureItem
              icon={<Ionicons name="call" size={20} color="#4A90E2" />}
              title="Phone"
              value={institution?.contact?.phone || "+91 98765 43210"}
            />
            <FeatureItem
              icon={<MaterialIcons name="email" size={20} color="#50C878" />}
              title="Email"
              value={institution?.contact?.email || "info@institution.edu"}
            />
            <FeatureItem
              icon={<Feather name="globe" size={20} color="#FF6B6B" />}
              title="Website"
              value={institution?.contact?.website || "www.institution.edu"}
            />
            <FeatureItem
              icon={<Ionicons name="time" size={20} color="#9B59B6" />}
              title="Working Hours"
              value="Mon-Sat: 8:00 AM - 6:00 PM"
            />
          </View>
        </View>

        {/* YouTube Video */}
        <View style={styles.videoSection}>
          <View style={styles.videoHeader}>
            <Ionicons name="logo-youtube" size={24} color="#FF0000" />
            <Text style={styles.videoTitle}>Campus Tour</Text>
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
            Take a virtual tour of {institution?.name} campus
          </Text>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionButtons}>
          <TouchableOpacity 
            style={[styles.actionBtn, styles.visitBtn]}
            onPress={() => Linking.openURL(`https://${institution?.contact?.website || "www.institution.edu"}`)}
          >
            <Ionicons name="globe-outline" size={20} color="#fff" />
            <Text style={styles.visitBtnText}>Visit Website</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.actionBtn, styles.contactBtn]}
            onPress={() => Linking.openURL(`tel:${institution?.contact?.phone || "+919876543210"}`)}
          >
            <Ionicons name="call-outline" size={20} color="#fff" />
            <Text style={styles.contactBtnText}>Call Now</Text>
          </TouchableOpacity>
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
    paddingVertical: Platform.OS === 'ios' ? 14 : 18,
    height: Platform.OS === 'ios' ? 64 : 68,
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
    fontSize: Platform.OS === 'ios' ? 18 : 20,
    fontWeight: "700",
    textAlign: "center",
    flex: 1,
    marginHorizontal: 10,
  },
  // Institute Header
  instituteHeader: {
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#fff",
    marginHorizontal: 16,
    marginTop: 20,
    borderRadius: 16,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.08,
        shadowRadius: 12,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  instituteLogo: {
    width: 100,
    height: 100,
    borderRadius: 16,
  },
  titleContainer: {
    flex: 1,
    marginLeft: 20,
  },
  instituteName: {
    fontSize: 22,
    fontWeight: "700",
    color: "#003366",
    marginBottom: 12,
  },
  typeRatingContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  typeBadge: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  typeText: {
    fontSize: 14,
    fontWeight: "600",
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  ratingText: {
    fontSize: 16,
    color: "#666",
    marginLeft: 8,
    fontWeight: "600",
  },
  // Location Card
  locationCard: {
    backgroundColor: "#fff",
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 16,
    padding: 20,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.08,
        shadowRadius: 8,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  locationHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  locationTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#003366",
    marginLeft: 12,
  },
  locationDetails: {
    gap: 16,
  },
  locationRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  locationInfo: {
    marginLeft: 16,
  },
  locationLabel: {
    fontSize: 14,
    color: "#666",
    marginBottom: 4,
  },
  locationValue: {
    fontSize: 16,
    fontWeight: "600",
    color: "#003366",
  },
  // Section Card
  sectionCard: {
    backgroundColor: "#fff",
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 16,
    padding: 20,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.08,
        shadowRadius: 8,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#003366",
    marginBottom: 16,
  },
  descriptionText: {
    fontSize: 15,
    color: "#666",
    lineHeight: 24,
  },
  // Stats Grid
  statsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginHorizontal: 16,
    marginTop: 16,
    gap: 12,
  },
  statCard: {
    width: "48%",
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
    alignItems: "center",
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.08,
        shadowRadius: 8,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  statNumber: {
    fontSize: 22,
    fontWeight: "700",
    color: "#003366",
    marginTop: 12,
    marginBottom: 6,
  },
  statLabel: {
    fontSize: 14,
    color: "#666",
    fontWeight: "500",
  },
  // Features List
  featuresList: {
    gap: 12,
  },
  featureRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  featureItemText: {
    fontSize: 15,
    color: "#444",
    marginLeft: 12,
    flex: 1,
    lineHeight: 22,
  },
  // Facilities Grid
  facilitiesGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  facilityItem: {
    width: "48%",
    backgroundColor: "#F8FAFF",
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
  },
  facilityText: {
    fontSize: 14,
    color: "#003366",
    fontWeight: "600",
    marginTop: 12,
    textAlign: "center",
  },
  // Contact Info
  contactInfo: {
    gap: 16,
  },
  featureItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  featureIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#F0F7FF",
    justifyContent: "center",
    alignItems: "center",
  },
  featureContent: {
    flex: 1,
    marginLeft: 16,
  },
  featureTitle: {
    fontSize: 14,
    color: "#666",
    marginBottom: 4,
  },
  featureValue: {
    fontSize: 16,
    fontWeight: "600",
    color: "#003366",
  },
  // Video Section
  videoSection: {
    marginHorizontal: 16,
    marginTop: 24,
    marginBottom: 20,
  },
  videoHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  videoTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#333",
    marginLeft: 8,
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
    fontStyle: "italic",
  },
  // Action Buttons
  actionButtons: {
    flexDirection: "row",
    marginHorizontal: 16,
    marginTop: 8,
    gap: 12,
  },
  actionBtn: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
    borderRadius: 12,
  },
  visitBtn: {
    backgroundColor: "#4A90E2",
  },
  contactBtn: {
    backgroundColor: "#50C878",
  },
  visitBtnText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 10,
  },
  contactBtnText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 10,
  },
});