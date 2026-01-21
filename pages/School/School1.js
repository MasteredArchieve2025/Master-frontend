import React, { useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  useWindowDimensions,
  Platform,
  Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { Video, ResizeMode } from "expo-av";
import Footer from "../../src/components/Footer";

export default function School1({ navigation }) {
  const { width } = useWindowDimensions();
  const isTablet = width >= 768;
  const videoRef = useRef(null);
  const [status, setStatus] = useState({});

  return (
    <SafeAreaView style={styles.container}>
      {/* HEADER */}
      <View
        style={[
          styles.header,
          { paddingHorizontal: isTablet ? 24 : 16 },
        ]}
      >
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#0B5ED7" />
        </TouchableOpacity>

        <View style={styles.headerIcons}>
          <Ionicons name="search" size={22} color="#000" />
          <Ionicons name="notifications-outline" size={22} color="#000" />
          <Ionicons name="person-circle-outline" size={26} color="#000" />
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* TITLE */}
        <View
          style={[
            styles.titleContainer,
            { paddingHorizontal: isTablet ? 24 : 16 },
          ]}
        >
          <Text style={styles.title}>School</Text>
          <Text style={styles.subtitle}>
            Choose what you want to explore
          </Text>
        </View>

       

        {/* AD BANNER 1 - ABOVE CARDS */}
        <View style={styles.adBannerContainer}>
          <Text style={styles.adLabel}>Sponsored</Text>
          <Image
            source={{
              uri: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=800",
            }}
            style={[
              styles.adBanner,
              {
                height: isTablet ? 120 : 80,
                borderRadius: isTablet ? 16 : 12,
              },
            ]}
            resizeMode="cover"
          />
          <View style={styles.adOverlay}>
            <Text style={styles.adTitle}>Premium Online Courses</Text>
            <Text style={styles.adSubtitle}>Up to 50% Off - Enroll Now!</Text>
          </View>
          <TouchableOpacity style={styles.adButton}>
            <Text style={styles.adButtonText}>Learn More</Text>
          </TouchableOpacity>
        </View>

        {/* CARDS */}
        <View
          style={[
            styles.cardWrapper,
            { paddingHorizontal: isTablet ? 24 : 16 },
          ]}
        >
          {/* ✅ NAVIGATION FIXED */}
          <TouchableOpacity
            style={styles.card}
            activeOpacity={0.7}
            onPress={() => navigation.navigate("School2")}
          >
            <View style={styles.cardLeft}>
              <View style={styles.iconBox}>
                <Ionicons name="business" size={22} color="#0B5ED7" />
              </View>
              <View>
                <Text style={styles.cardTitle}>View School</Text>
                <Text style={styles.cardSubtitle}>
                  Explore Schools for you
                </Text>
              </View>
            </View>
            <Ionicons name="chevron-forward" size={22} color="#999" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.card} activeOpacity={0.7}  onPress={() => navigation.navigate("Tutions1")}>
            <View style={styles.cardLeft}>
              <View style={styles.iconBox}>
                <Ionicons name="book" size={22} color="#0B5ED7" />
              </View>
              <View>
                <Text style={styles.cardTitle}>View Tuitions</Text>
                <Text style={styles.cardSubtitle}>
                  Explore Tuitions for all Standards
                </Text>
              </View>
            </View>
            <Ionicons name="chevron-forward" size={22} color="#999" />
          </TouchableOpacity>
        </View>

        
        {/* VIDEO AD */}
        <View style={styles.videoAdContainer}>
          <View style={styles.videoHeader}>
            <Text style={styles.videoAdTitle}>Featured Video</Text>
            <View style={styles.sponsoredBadge}>
              <Text style={styles.sponsoredText}>Sponsored</Text>
            </View>
          </View>
          
          <Video
            ref={videoRef}
            style={[
              styles.video,
              {
                height: isTablet ? 250 : 180,
                borderRadius: isTablet ? 16 : 12,
              },
            ]}
            source={{
              uri: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
            }}
            useNativeControls
            resizeMode={ResizeMode.CONTAIN}
            isLooping
            onPlaybackStatusUpdate={status => setStatus(() => status)}
          />

          <View style={styles.videoInfo}>
            <View>
              <Text style={styles.videoTitle}>Interactive Learning Platform</Text>
              <Text style={styles.videoDescription}>
                Experience the future of education with our AI-powered platform
              </Text>
            </View>
            <TouchableOpacity style={styles.videoActionButton}>
              <Text style={styles.videoActionText}>Try Free</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.videoControls}>
            <TouchableOpacity
              onPress={() =>
                status.isPlaying
                  ? videoRef.current.pauseAsync()
                  : videoRef.current.playAsync()
              }
              style={styles.controlButton}
            >
              <Ionicons
                name={status.isPlaying ? "pause-circle" : "play-circle"}
                size={32}
                color="#0B5ED7"
              />
              <Text style={styles.controlText}>
                {status.isPlaying ? "Pause" : "Play"}
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.controlButton}>
              <Ionicons name="share-social-outline" size={26} color="#666" />
              <Text style={styles.controlText}>Share</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.controlButton}>
              <Ionicons name="information-circle-outline" size={26} color="#666" />
              <Text style={styles.controlText}>Info</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={{ height: 90 }} />
      </ScrollView>
      
      {/* BOTTOM TAB BAR (EMPTY FOR NOW) */}
      <View
        style={[
          styles.bottomTab,
          { height: isTablet ? 72 : 60 },
        ]}
      />
      <Footer/>
    </SafeAreaView>
  );
}

/* ================= STYLES ================= */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F8FF",
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 10,
  },

  headerIcons: {
    flexDirection: "row",
    gap: 14,
  },

  titleContainer: {
    marginBottom: 12,
  },

  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#0B5ED7",
  },

  subtitle: {
    fontSize: 14,
    color: "#666",
    marginTop: 4,
  },

  banner: {
    width: "92%",
    alignSelf: "center",
    marginVertical: 14,
    resizeMode: "cover",
  },

  /* AD BANNER STYLES */
  adBannerContainer: {
    marginHorizontal: 16,
    marginVertical: 12,
    position: "relative",
  },

  adLabel: {
    position: "absolute",
    top: 8,
    left: 8,
    backgroundColor: "rgba(0,0,0,0.6)",
    color: "#fff",
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    fontSize: 10,
    fontWeight: "600",
    zIndex: 2,
  },

  adBanner: {
    width: "100%",
    backgroundColor: "#E8F0FF",
  },

  adOverlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(0,0,0,0.5)",
    padding: 12,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
  },

  adTitle: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },

  adSubtitle: {
    color: "#E8F0FF",
    fontSize: 12,
    marginTop: 2,
  },

  adButton: {
    position: "absolute",
    bottom: 12,
    right: 12,
    backgroundColor: "#0B5ED7",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    zIndex: 2,
  },

  adButtonText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "600",
  },

  /* CARD STYLES */
  cardWrapper: {
    marginVertical: 10,
    gap: 14,
  },

  card: {
    backgroundColor: "#fff",
    borderRadius: 14,
    padding: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    elevation: Platform.OS === "android" ? 3 : 0,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
  },

  cardLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },

  iconBox: {
    width: 44,
    height: 44,
    borderRadius: 10,
    backgroundColor: "#E8F0FF",
    alignItems: "center",
    justifyContent: "center",
  },

  cardTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000",
  },

  cardSubtitle: {
    fontSize: 12,
    color: "#666",
    marginTop: 2,
  },

  /* VIDEO AD STYLES */
  videoAdContainer: {
    marginHorizontal: 16,
    marginVertical: 20,
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    elevation: Platform.OS === "android" ? 4 : 0,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
  },

  videoHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },

  videoAdTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#000",
  },

  sponsoredBadge: {
    backgroundColor: "#FF6B6B",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },

  sponsoredText: {
    color: "#fff",
    fontSize: 10,
    fontWeight: "600",
  },

  video: {
    width: "100%",
    backgroundColor: "#000",
  },

  videoInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 12,
    marginBottom: 16,
  },

  videoTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000",
  },

  videoDescription: {
    fontSize: 12,
    color: "#666",
    marginTop: 4,
    maxWidth: "70%",
  },

  videoActionButton: {
    backgroundColor: "#0B5ED7",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
  },

  videoActionText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
  },

  videoControls: {
    flexDirection: "row",
    justifyContent: "space-around",
    borderTopWidth: 1,
    borderTopColor: "#eee",
    paddingTop: 16,
  },

  controlButton: {
    alignItems: "center",
    justifyContent: "center",
  },

  controlText: {
    fontSize: 11,
    color: "#666",
    marginTop: 4,
  },

  bottomTab: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderColor: "#eee",
  },
});