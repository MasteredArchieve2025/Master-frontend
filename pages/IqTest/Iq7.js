import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Platform,
  StatusBar,
  useWindowDimensions,
  SafeAreaView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import Footer from "../../src/components/Footer";

export default function Iq7() {
  const navigation = useNavigation();
  const { width } = useWindowDimensions();

  const isTablet = width >= 768;

  const scoreData = {
    score: 121,
    category: "Superior Intelligence",
    range: "120 - 129",
    percentile: 84.3,
    description: "Your score is higher than 84.3% of the population.",
  };

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.root}>
        {/* Header */}
        <View
          style={[
            styles.header,
            { height: isTablet ? 120 : 100 },
          ]}
        >
          <View style={styles.headerTop}>
            <TouchableOpacity
              style={styles.backBtn}
              onPress={() =>
                navigation.canGoBack()
                  ? navigation.goBack()
                  : navigation.navigate("Home")
              }
            >
              <Ionicons name="arrow-back" size={24} color="#fff" />
            </TouchableOpacity>

            <Text
              style={[
                styles.headerTitle,
                isTablet && styles.headerTitleTablet,
              ]}
            >
              IQ Results
            </Text>

            <Ionicons name="analytics" size={22} color="#fff" />
          </View>
        </View>

        <ScrollView
          contentContainerStyle={[
            styles.content,
            isTablet && styles.contentTablet,
          ]}
          showsVerticalScrollIndicator={false}
        >
          {/* Main Result Card */}
          <View
            style={[
              styles.mainCard,
              isTablet && styles.mainCardTablet,
            ]}
          >
            <Text
              style={[
                styles.cardTitle,
                isTablet && styles.cardTitleTablet,
              ]}
            >
              Your IQ Score
            </Text>

            {/* Score Circle */}
            <View
              style={[
                styles.scoreCircle,
                isTablet && styles.scoreCircleTablet,
              ]}
            >
              <Text
                style={[
                  styles.scoreMain,
                  isTablet && styles.scoreMainTablet,
                ]}
              >
                {scoreData.score}
              </Text>
              <Text style={styles.scoreSub}>IQ Score</Text>
            </View>

            {/* Category */}
            <View style={styles.categoryBadge}>
              <Ionicons name="trophy" size={16} color="#FFD700" />
              <Text style={styles.categoryText}>
                {scoreData.category}
              </Text>
            </View>

            {/* Percentile */}
            <View style={styles.metricBox}>
              <Ionicons name="stats-chart" size={20} color="#0B5394" />
              <View style={styles.metricContent}>
                <Text style={styles.metricValue}>
                  {scoreData.percentile}%
                </Text>
                <Text style={styles.metricLabel}>
                  Population Percentile
                </Text>
              </View>
            </View>

            {/* Range */}
            <View style={styles.rangeBox}>
              <Ionicons name="expand" size={20} color="#0B5394" />
              <View style={styles.rangeContent}>
                <Text style={styles.rangeValue}>
                  {scoreData.range}
                </Text>
                <Text style={styles.rangeLabel}>IQ Range</Text>
              </View>
            </View>

            {/* Description */}
            <View style={styles.descriptionBox}>
              <Text style={styles.descriptionText}>
                {scoreData.description}
              </Text>
            </View>
          </View>

          {/* Quick Insights */}
          <View
            style={[
              styles.statsCard,
              isTablet && styles.statsCardTablet,
            ]}
          >
            <Text style={styles.statsTitle}>Quick Insights</Text>

            <View style={styles.statsRow}>
              <View style={styles.statItem}>
                <Ionicons
                  name="checkmark-circle"
                  size={20}
                  color="#4CAF50"
                />
                <Text style={styles.statTitle}>Above Average</Text>
              </View>

              <View style={styles.statDivider} />

              <View style={styles.statItem}>
                <Ionicons
                  name="trending-up"
                  size={20}
                  color="#2196F3"
                />
                <Text style={styles.statTitle}>Superior Range</Text>
              </View>
            </View>
          </View>
        </ScrollView>

        <Footer />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#F8FAFF",
  },
  root: {
    flex: 1,
    backgroundColor: "#F8FAFF",
  },

  /* Header */
  header: {
    backgroundColor: "#0B5394",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    paddingHorizontal: 20,
    paddingTop:
      Platform.OS === "android"
        ? StatusBar.currentHeight + 12
        : 16,
  },
  headerTop: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  backBtn: {
    padding: 6,
  },
  headerTitle: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "700",
  },
  headerTitleTablet: {
    fontSize: 24,
  },

  /* Content */
  content: {
    flexGrow: 1,
    padding: 16,
    paddingBottom: 100,
  },
  contentTablet: {
    alignItems: "center",
  },

  /* Cards */
  mainCard: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 24,
    marginBottom: 20,
    alignItems: "center",
    elevation: 4,
  },
  mainCardTablet: {
    maxWidth: 600,
    width: "100%",
  },

  cardTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 20,
  },
  cardTitleTablet: {
    fontSize: 22,
  },

  scoreCircle: {
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: "#F0F7FF",
    borderWidth: 8,
    borderColor: "#0B5394",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  scoreCircleTablet: {
    width: 200,
    height: 200,
    borderRadius: 100,
  },

  scoreMain: {
    fontSize: 48,
    fontWeight: "800",
    color: "#0B5394",
  },
  scoreMainTablet: {
    fontSize: 60,
  },
  scoreSub: {
    fontSize: 14,
    color: "#666",
  },

  categoryBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(11,83,148,0.1)",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 16,
    marginBottom: 20,
  },
  categoryText: {
    marginLeft: 8,
    fontWeight: "600",
    color: "#0B5394",
  },

  metricBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F8FAFF",
    width: "100%",
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  metricContent: {
    marginLeft: 12,
  },
  metricValue: {
    fontSize: 24,
    fontWeight: "700",
    color: "#0B5394",
  },
  metricLabel: {
    fontSize: 12,
    color: "#666",
  },

  rangeBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F8FAFF",
    width: "100%",
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
  },
  rangeContent: {
    marginLeft: 12,
  },
  rangeValue: {
    fontSize: 20,
    fontWeight: "700",
  },
  rangeLabel: {
    fontSize: 12,
    color: "#666",
  },

  descriptionBox: {
    backgroundColor: "rgba(11,83,148,0.05)",
    padding: 16,
    borderRadius: 12,
    width: "100%",
  },
  descriptionText: {
    fontSize: 14,
    textAlign: "center",
    lineHeight: 20,
  },

  statsCard: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 20,
    elevation: 4,
  },
  statsCardTablet: {
    maxWidth: 600,
    width: "100%",
  },
  statsTitle: {
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 16,
  },
  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  statItem: {
    flex: 1,
    alignItems: "center",
  },
  statTitle: {
    fontSize: 13,
    marginTop: 6,
  },
  statDivider: {
    width: 1,
    backgroundColor: "#E0E0E0",
    marginHorizontal: 20,
  },
});
