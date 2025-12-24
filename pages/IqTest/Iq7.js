import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Platform,
  StatusBar,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Footer from "../../src/components/Footer";

export default function Iq7() {
  // Score data
  const scoreData = {
    score: 121,
    category: "Superior Intelligence",
    range: "120 - 129",
    percentile: 84.3,
    description: "Your score is higher than 84.3% of the population.",
  };

  return (
    <View style={styles.root}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <TouchableOpacity style={styles.backBtn}>
            <Ionicons name="arrow-back" size={24} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>IQ Results</Text>
          <View style={styles.headerIcon}>
            <Ionicons name="analytics" size={22} color="#fff" />
          </View>
        </View>
      </View>

      <ScrollView 
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Main Score Display */}
        <View style={styles.mainCard}>
          <Text style={styles.cardTitle}>Your IQ Score</Text>
          
          {/* Score Circle */}
          <View style={styles.scoreCircle}>
            <Text style={styles.scoreMain}>{scoreData.score}</Text>
            <Text style={styles.scoreSub}>IQ Score</Text>
          </View>

          {/* Category Badge */}
          <View style={styles.categoryBadge}>
            <Ionicons name="trophy" size={16} color="#FFD700" />
            <Text style={styles.categoryText}>{scoreData.category}</Text>
          </View>

          {/* Key Metric */}
          <View style={styles.metricBox}>
            <Ionicons name="stats-chart" size={20} color="#0B5394" />
            <View style={styles.metricContent}>
              <Text style={styles.metricValue}>{scoreData.percentile}%</Text>
              <Text style={styles.metricLabel}>Population Percentile</Text>
            </View>
          </View>

          {/* Range Display */}
          <View style={styles.rangeBox}>
            <Ionicons name="expand" size={20} color="#0B5394" />
            <View style={styles.rangeContent}>
              <Text style={styles.rangeValue}>{scoreData.range}</Text>
              <Text style={styles.rangeLabel}>IQ Range</Text>
            </View>
          </View>

          {/* Result Description */}
          <View style={styles.descriptionBox}>
            <Text style={styles.descriptionText}>
              {scoreData.description}
            </Text>
          </View>
        </View>

        {/* Quick Stats */}
        <View style={styles.statsCard}>
          <Text style={styles.statsTitle}>Quick Insights</Text>
          
          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <View style={styles.statIconBox}>
                <Ionicons name="checkmark-circle" size={18} color="#4CAF50" />
              </View>
              <Text style={styles.statTitle}>Above Average</Text>
            </View>
            
            <View style={styles.statDivider} />
            
            <View style={styles.statItem}>
              <View style={styles.statIconBox}>
                <Ionicons name="trending-up" size={18} color="#2196F3" />
              </View>
              <Text style={styles.statTitle}>Superior Range</Text>
            </View>
          </View>
        </View>

      </ScrollView>

      <Footer />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#F8FAFF",
  },

  // Header
  header: {
    height: 90,
    backgroundColor: "#0B5394",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    paddingHorizontal: 20,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight + 10 : 36,
  },
  headerTop: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  backBtn: {
    padding: 8,
  },
  headerTitle: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "700",
  },
  headerIcon: {
    padding: 4,
  },

  // Content
  content: {
    padding: 20,
    paddingBottom: 100,
  },

  // Main Card
  mainCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 24,
    marginBottom: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
    marginBottom: 24,
  },

  // Score Circle
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
  scoreMain: {
    fontSize: 48,
    fontWeight: "800",
    color: "#0B5394",
  },
  scoreSub: {
    fontSize: 14,
    color: "#666",
    marginTop: -8,
  },

  // Category Badge
  categoryBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(11, 83, 148, 0.1)",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 16,
    marginBottom: 20,
  },
  categoryText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#0B5394",
    marginLeft: 8,
  },

  // Metric Box
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
    marginTop: 2,
  },

  // Range Box
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
    color: "#333",
  },
  rangeLabel: {
    fontSize: 12,
    color: "#666",
    marginTop: 2,
  },

  // Description Box
  descriptionBox: {
    backgroundColor: "rgba(11, 83, 148, 0.05)",
    padding: 16,
    borderRadius: 12,
    width: "100%",
    borderLeftWidth: 3,
    borderLeftColor: "#0B5394",
  },
  descriptionText: {
    fontSize: 14,
    color: "#444",
    lineHeight: 20,
    textAlign: "center",
  },

  // Stats Card
  statsCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
  },
  statsTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 16,
    textAlign: "center",
  },
  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  statItem: {
    flex: 1,
    alignItems: "center",
  },
  statIconBox: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#F8FAFF",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
  },
  statTitle: {
    fontSize: 13,
    color: "#444",
    textAlign: "center",
  },
  statDivider: {
    width: 1,
    backgroundColor: "#E0E0E0",
    marginHorizontal: 20,
  },

  // Action Buttons
  actionContainer: {
    flexDirection: "row",
    gap: 12,
  },
  primaryBtn: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#0B5394",
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  primaryBtnText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 8,
  },
  secondaryBtn: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#0B5394",
  },
  secondaryBtnText: {
    color: "#0B5394",
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 8,
  },
});