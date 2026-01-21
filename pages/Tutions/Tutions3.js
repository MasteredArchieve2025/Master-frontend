import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  useWindowDimensions,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import Footer from "../../src/components/Footer";

export default function InstituteDetails({ navigation }) {
  const { width } = useWindowDimensions();
  const isTablet = width >= 768;

  return (
    <SafeAreaView style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#0B5ED7" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Institute Details</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 90 }}
      >
        {/* BLUE CARD */}
        <View
          style={[
            styles.heroCard,
            { marginHorizontal: isTablet ? 24 : 16 },
          ]}
        >
          <View style={styles.badge}>
            <Text style={styles.badgeText}>Premium Partner</Text>
          </View>

          <Text style={styles.instituteName}>
            Elite Scholars Academy
          </Text>

          <Text style={styles.tagline}>
            Empowering Excellence since 2012
          </Text>

          <View style={styles.infoRow}>
            <Ionicons name="school-outline" size={16} color="#DCE8FF" />
            <Text style={styles.infoText}>
              8th – 12th Grade (All Boards)
            </Text>
          </View>

          <View style={styles.infoRow}>
            <Ionicons name="location-outline" size={16} color="#DCE8FF" />
            <Text style={styles.infoText}>
              Downtown, New York
            </Text>
          </View>
        </View>

        {/* SUBJECTS */}
        <View
          style={[
            styles.section,
            { marginHorizontal: isTablet ? 24 : 16 },
          ]}
        >
          <View style={styles.sectionHeader}>
            <Ionicons name="book-outline" size={18} color="#0B5ED7" />
            <Text style={styles.sectionTitle}>Subjects Offered</Text>
          </View>

          <View style={styles.chips}>
            <Text style={styles.chip}>Mathematics</Text>
            <Text style={styles.chip}>Physics</Text>
            <Text style={styles.chip}>Chemistry</Text>
          </View>
        </View>

        {/* TEACHING MODE */}
        <View
          style={[
            styles.section,
            { marginHorizontal: isTablet ? 24 : 16 },
          ]}
        >
          <View style={styles.sectionHeader}>
            <Ionicons name="people-outline" size={18} color="#0B5ED7" />
            <Text style={styles.sectionTitle}>Teaching Mode</Text>
          </View>

          <View style={styles.modeRow}>
            <View style={styles.modeCard}>
              <Ionicons name="business-outline" size={22} color="#0B5ED7" />
              <Text style={styles.modeTitle}>Offline</Text>
              <Text style={styles.modeSub}>In-person center</Text>
            </View>

            <View style={styles.modeCard}>
              <Ionicons name="videocam-outline" size={22} color="#0B5ED7" />
              <Text style={styles.modeTitle}>Online</Text>
              <Text style={styles.modeSub}>Live sessions</Text>
            </View>
          </View>
        </View>

        {/* MAP BUTTON */}
        <TouchableOpacity
          activeOpacity={0.85}
          style={[
            styles.mapButton,
            { marginHorizontal: isTablet ? 24 : 16 },
          ]}
        >
          <Ionicons name="map-outline" size={18} color="#fff" />
          <Text style={styles.mapButtonText}>View on Map</Text>
        </TouchableOpacity>

        {/* ABOUT */}
        <View
          style={[
            styles.aboutCard,
            { marginHorizontal: isTablet ? 24 : 16 },
          ]}
        >
          <View style={styles.sectionHeader}>
            <Ionicons
              name="information-circle-outline"
              size={18}
              color="#0B5ED7"
            />
            <Text style={styles.sectionTitle}>About Institute</Text>
          </View>

          <Text style={styles.aboutText}>
            Elite Scholars Academy has been a leader in supplemental
            education for over 10 years, focusing on holistic
            development and academic excellence through personalized
            attention.
          </Text>
        </View>
      </ScrollView>

      {/* BOTTOM TAB (UI ONLY) */}
      <View
        style={[
          styles.bottomTab,
          { height: isTablet ? 72 : 60 },
        ]}
      >
        
      </View>
      <Footer/>
    </SafeAreaView>
  );
}

/* ================= STYLES ================= */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EEF6FF",
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 10,
  },

  headerTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#000",
  },

  heroCard: {
    backgroundColor: "#0B5ED7",
    borderRadius: 18,
    padding: 16,
    marginTop: 10,
  },

  badge: {
    alignSelf: "flex-start",
    backgroundColor: "rgba(255,255,255,0.2)",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
    marginBottom: 8,
  },

  badgeText: {
    color: "#fff",
    fontSize: 11,
    fontWeight: "600",
  },

  instituteName: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "800",
    marginBottom: 4,
  },

  tagline: {
    color: "#DCE8FF",
    fontSize: 12,
    marginBottom: 10,
  },

  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 6,
  },

  infoText: {
    color: "#DCE8FF",
    fontSize: 12,
    marginLeft: 6,
  },

  section: {
    marginTop: 22,
  },

  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },

  sectionTitle: {
    marginLeft: 6,
    fontSize: 16,
    fontWeight: "700",
    color: "#000",
  },

  chips: {
    flexDirection: "row",
    flexWrap: "wrap",
  },

  chip: {
    backgroundColor: "#E8F1FF",
    color: "#0B5ED7",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 10,
    fontSize: 12,
    marginRight: 8,
    marginBottom: 8,
  },

  modeRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  modeCard: {
    width: "48%",
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 14,
    alignItems: "center",

    elevation: Platform.OS === "android" ? 3 : 0,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
  },

  modeTitle: {
    marginTop: 6,
    fontSize: 14,
    fontWeight: "700",
    color: "#000",
  },

  modeSub: {
    fontSize: 11,
    color: "#5F6F81",
    marginTop: 2,
  },

  mapButton: {
    marginTop: 22,
    backgroundColor: "#0B5ED7",
    borderRadius: 30,
    paddingVertical: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },

  mapButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "700",
    marginLeft: 8,
  },

  aboutCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    marginTop: 22,

    elevation: Platform.OS === "android" ? 3 : 0,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
  },

  aboutText: {
    fontSize: 13,
    color: "#5F6F81",
    lineHeight: 20,
  },

  bottomTab: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderColor: "#E5EAF0",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
});
