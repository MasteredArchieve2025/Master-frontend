import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Platform,
  StatusBar,
  SafeAreaView,
  Dimensions,
} from "react-native";
import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";
import Footer from "../../src/components/Footer";
const { width } = Dimensions.get("window");
const isTablet = width >= 768;

export default function Course2({ route, navigation }) {
  const sections = route?.params?.sections || [
    {
      title: "Computer & IT",
      items: ["Web Development", "Python Programming", "Data Science"],
    },
    {
      title: "Business & Management",
      items: ["Finance", "Marketing", "HR Management"],
    },
  ];

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" backgroundColor="#0052A2" />

      {/* ---------- HEADER (COMMON) ---------- */}
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

          <Text style={styles.headerTitle}>Course Details</Text>

          <View style={styles.rightSpace} />
        </View>
      </View>

      {/* ---------- BODY ---------- */}
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {sections.map((section, idx) => (
          <View key={idx} style={styles.sectionWrapper}>
            {/* Section Header */}
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionHeaderText}>{section.title}</Text>
            </View>

            {/* Section Items */}
            {section.items?.map((item, i) => (
              <TouchableOpacity
                key={i}
                activeOpacity={0.7}
                style={styles.row}
                onPress={() =>
                  navigation.navigate("Course3", { title: item })
                }
              >
                <Text style={styles.rowText}>{item}</Text>
                <MaterialCommunityIcons
                  name="chevron-right"
                  size={26}
                  color="#1F6FC4"
                />
              </TouchableOpacity>
            ))}
          </View>
        ))}
      </ScrollView>
      <Footer/>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#fff",
  },

  /* ---------- HEADER ---------- */
  headerWrapper: {
    backgroundColor: "#0052A2",
  },
  header: {
    height: Platform.OS === "ios" ? 52 : 64,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
  },
  backBtn: {
    width: 40,
    justifyContent: "center",
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

  /* ---------- BODY ---------- */
  container: {
    flex: 1,
    backgroundColor: "#FAFAFA",
  },
  scrollContent: {
    paddingBottom: 30,
  },

  sectionWrapper: {
    marginTop: 18,
  },

  sectionHeader: {
    backgroundColor: "#CFE5FA",
    height: isTablet ? 64 : 56,
    marginHorizontal: isTablet ? 24 : 14,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  sectionHeaderText: {
    fontSize: isTablet ? 22 : 18,
    fontWeight: "700",
    color: "#0B5AA7",
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: isTablet ? 20 : 16,
    paddingHorizontal: isTablet ? 26 : 18,
    marginHorizontal: isTablet ? 24 : 14,
    borderBottomWidth: 1,
    borderBottomColor: "#EEE",
  },
  rowText: {
    fontSize: isTablet ? 18 : 16,
    fontWeight: "500",
    color: "#111",
  },
});
