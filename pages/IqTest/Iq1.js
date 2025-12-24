import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ScrollView,
  Platform,
  StatusBar,
  SafeAreaView,
  Image,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";

const { width } = Dimensions.get("window");

// Calculate card size for 2-column grid
const cardMargin = 15;
const cardWidth = (width - cardMargin * 3) / 2;
const cardHeight = cardWidth; // Square cards

// Dummy image URLs - replace with your actual images
const cardImages = [
  "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=400&fit=crop",
  "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=400&fit=crop",
  "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=400&h=400&fit=crop",
  "https://images.unsplash.com/photo-1589256469067-ea99122bbdc4?w=400&h=400&fit=crop",
  "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=400&h=400&fit=crop",
  "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=400&h=400&fit=crop",
];

export default function Iq1({ navigation }) {
  // Test categories data
  const testCategories = [
    {
      id: 1,
      title: "Brain IQ test",
      image: cardImages[0],
      color: ["#0072BC", "#0052A2"],
    },
    {
      id: 2,
      title: "Logical Reasoning",
      image: cardImages[1],
      color: ["#00C9FF", "#0072BC"],
    },
    {
      id: 3,
      title: "Mathematical Reasoning",
      image: cardImages[2],
      color: ["#FF416C", "#FF4B2B"],
    },
    {
      id: 4,
      title: "Spatial ability",
      image: cardImages[3],
      color: ["#7F00FF", "#E100FF"],
    },
    {
      id: 5,
      title: "Verbal Ability",
      image: cardImages[4],
      color: ["#00B09B", "#96C93D"],
    },
    {
      id: 6,
      title: "Memory Test",
      image: cardImages[5],
      color: ["#FF5F6D", "#FFC371"],
    },
  ];

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" backgroundColor="#0052A2" />

      {/* Header - Updated to match your style */}
      <View style={styles.headerWrapper}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backBtn}
            onPress={() => navigation.goBack()}
          >
            <Ionicons
              name={Platform.OS === "ios" ? "chevron-back" : "arrow-back"}
              size={24}
              color="#fff"
            />
          </TouchableOpacity>

          <Text style={styles.headerTitle}>IQ Test</Text>

          {/* Spacer for center alignment */}
          <View style={styles.rightSpace} />
        </View>
      </View>

      {/* Body with Grid Layout */}
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        {/* Top Banner */}
        <LinearGradient
          colors={["#0072BC", "#0052A2"]}
          style={styles.topBanner}
        >
          <Text style={styles.bannerTitle}>Measure Your Intelligence</Text>
          <Text style={styles.bannerSubtitle}>
            Complete tests to get your comprehensive IQ score
          </Text>
        </LinearGradient>

        {/* Grid Title */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Choose Test Type</Text>
          <Text style={styles.sectionSubtitle}>6 tests available</Text>
        </View>

        {/* Grid Container - 2 columns */}
        <View style={styles.gridContainer}>
          {testCategories.map((category, index) => (
            <TouchableOpacity
              key={category.id}
              style={[
                styles.card,
                index % 2 === 0
                  ? { marginRight: cardMargin / 2 }
                  : { marginLeft: cardMargin / 2 },
              ]}
              activeOpacity={0.9}
              onPress={() => {
                if (category.title === "Brain IQ test") {
                  navigation.navigate("Iq2");
                }
              }}
            >
              {/* Card Image */}
              <Image
                source={{ uri: category.image }}
                style={styles.cardImage}
                resizeMode="cover"
              />

              {/* Dark Overlay Gradient */}
              <LinearGradient
                colors={["rgba(0,0,0,0)", "rgba(0,0,0,0.7)"]}
                style={styles.imageOverlay}
              />

              {/* Card Title */}
              <View style={styles.cardTitleContainer}>
                <Text style={styles.cardTitle}>{category.title}</Text>
              </View>

              {/* Card Badge */}
              <View style={styles.cardBadge}>
                <Ionicons name="play" size={12} color="#fff" />
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Progress Section */}
        <View style={styles.progressContainer}>
          <View style={styles.progressHeader}>
            <Text style={styles.progressTitle}>Your Progress</Text>
            <Text style={styles.progressPercent}>0%</Text>
          </View>
          <View style={styles.progressBar}>
            <View style={styles.progressFill} />
          </View>
          <Text style={styles.progressText}>0 of 6 tests completed</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#f5f7fa",
  },

  /* Header - Your Style */
  headerWrapper: {
    backgroundColor: "#0052A2",
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
      },
      android: {
        elevation: 4,
      },
    }),
  },

  header: {
    height: Platform.OS === "ios" ? 52 : 64,
    backgroundColor: "#0052A2",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: Platform.OS === "ios" ? 6 : 8,
  },

  backBtn: {
    width: 40,
    justifyContent: "center",
    alignItems: "flex-start",
  },

  headerTitle: {
    flex: 1,
    textAlign: "center",
    fontSize: Platform.OS === "ios" ? 17 : 18,
    fontWeight: Platform.OS === "ios" ? "600" : "700",
    color: "#fff",
  },

  rightSpace: {
    width: 40,
  },

  /* Body Container */
  container: {
    paddingTop: 20,
    paddingBottom: 30,
    paddingHorizontal: cardMargin,
    backgroundColor: "#f5f7fa",
  },

  /* Top Banner */
  topBanner: {
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    ...Platform.select({
      ios: {
        shadowColor: "#0072BC",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 6,
      },
      android: {
        elevation: 6,
      },
    }),
  },

  bannerTitle: {
    fontSize: 20,
    fontWeight: "800",
    color: "#fff",
    marginBottom: 5,
  },

  bannerSubtitle: {
    fontSize: 14,
    color: "rgba(255, 255, 255, 0.9)",
    lineHeight: 18,
  },

  /* Section Header */
  sectionHeader: {
    marginBottom: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  sectionTitle: {
    fontSize: Platform.OS === "ios" ? 18 : 19,
    fontWeight: "700",
    color: "#003366",
  },

  sectionSubtitle: {
    fontSize: 14,
    color: "#666",
  },

  /* Grid Container */
  gridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },

  /* Square Card */
  card: {
    width: cardWidth,
    height: cardHeight,
    borderRadius: 16,
    marginBottom: cardMargin,
    overflow: "hidden",
    position: "relative",
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.25,
        shadowRadius: 8,
      },
      android: {
        elevation: 8,
      },
    }),
  },

  cardImage: {
    width: "100%",
    height: "100%",
    position: "absolute",
  },

  imageOverlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: "50%",
  },

  cardTitleContainer: {
    position: "absolute",
    bottom: 12,
    left: 12,
    right: 12,
  },

  cardTitle: {
    fontSize: Platform.OS === "ios" ? 16 : 17,
    fontWeight: "700",
    color: "#fff",
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
    lineHeight: 20,
  },

  cardBadge: {
    position: "absolute",
    top: 12,
    right: 12,
    backgroundColor: "rgba(0, 82, 162, 0.9)",
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1.5,
    borderColor: "rgba(255, 255, 255, 0.3)",
  },

  /* Progress Section */
  progressContainer: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
    marginTop: 20,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 3,
      },
    }),
  },

  progressHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },

  progressTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#003366",
  },

  progressPercent: {
    fontSize: 16,
    fontWeight: "800",
    color: "#0072BC",
  },

  progressBar: {
    height: 8,
    backgroundColor: "#e9ecef",
    borderRadius: 4,
    overflow: "hidden",
    marginBottom: 8,
  },

  progressFill: {
    height: "100%",
    width: "0%", // 0% progress initially
    backgroundColor: "#0072BC",
    borderRadius: 4,
  },

  progressText: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
  },
});
