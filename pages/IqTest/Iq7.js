import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Platform,
  StatusBar,
} from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import Footer from "../../src/components/Footer";
export default function Iq7() {
  return (
    <View style={styles.root}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <TouchableOpacity style={styles.backBtn}>
            <Ionicons name="arrow-back" size={26} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>My Education</Text>
          <View style={{ width: 26 }} />
        </View>
      </View>

      {/* Avatar absolutely positioned */}
      <View style={styles.avatarContainer}>
        <Image
          source={{
            uri: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=400",
          }}
          style={styles.avatar}
        />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.name}>Mabisha</Text>

        {/* Contact Info */}
        <View style={styles.infoRow}>
          <Ionicons name="call" size={22} color="#0B5394" />
          <Text style={styles.infoText}>+91 9876543210</Text>
        </View>

        <View style={styles.infoRow}>
          <MaterialIcons name="email" size={22} color="#0B5394" />
          <Text style={styles.infoText}>mabisha@gmail.com</Text>
        </View>

        <View style={styles.infoRow}>
          <Ionicons name="location" size={22} color="#0B5394" />
          <Text style={styles.infoText}>
            Sunrise Crystal Complex, Thadagam Main Rd, Kalappa Naicken Palayam,
            Coimbatore, Tamil Nadu 641108
          </Text>
        </View>

        {/* IQ Score */}
        <Text style={styles.sectionTitle}>IQ Score Result</Text>

        <View style={styles.circleWrap}>
          <View style={styles.circle}>
            <Text style={styles.scoreText}>121</Text>
          </View>
        </View>

        <Text style={styles.resultText}>
          Your test results show a score higher than{" "}
          <Text style={styles.highlight}>16.55%</Text> of general population
        </Text>

        <Text style={styles.subNote}>Above 130 : High Intelligent</Text>

        <TouchableOpacity style={styles.rangeBtn}>
          <Text style={styles.rangeBtnText}>115 - 129 : Intelligent</Text>
        </TouchableOpacity>
      </ScrollView>
      <Footer />
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: "#fff" },

  header: {
    height: 180,
    backgroundColor: "#0B5394",
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
    paddingHorizontal: 16,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight + 8 : 24,
    zIndex: 0,
  },
  headerTop: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 8,
  },
  backBtn: { padding: 4 },
  headerTitle: { color: "#fff", fontSize: 24, fontWeight: "800" }, // header stays same

  content: { paddingBottom: 36, paddingHorizontal: 18, paddingTop: 70 },

  avatarContainer: {
    position: "absolute",
    top: 110,
    alignSelf: "center",
    zIndex: 1,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: "#fff",
    backgroundColor: "#eee",
    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
  },

  /* ↓↓↓ BELOW HEADER TEXT ↓↓↓ */
  name: {
    fontSize: 19, // reduced
    fontWeight: "700",
    color: "#0B5394",
    textAlign: "center",
    marginBottom: 6,
  },

  infoRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 6,
    marginTop: 6,
  },
  infoText: { flex: 1, fontSize: 13, color: "#222", lineHeight: 18 }, // reduced

  sectionTitle: {
    fontSize: 16, // reduced
    fontWeight: "700",
    color: "#0B5394",
    textAlign: "center",
    marginTop: 14,
  },

  circleWrap: { alignItems: "center", marginTop: 12 },
  circle: {
    width: 130,
    height: 130,
    borderRadius: 65,
    borderWidth: 5,
    borderColor: "#0B5394",
    alignItems: "center",
    justifyContent: "center",
  },
  scoreText: { fontSize: 32, fontWeight: "900", color: "#000" }, // reduced

  resultText: {
    textAlign: "center",
    fontSize: 14, // reduced
    marginTop: 12,
    marginHorizontal: 10,
    lineHeight: 18,
    color: "#1d1d1d",
  },
  highlight: { color: "#0B5394", fontWeight: "700" },

  subNote: {
    textAlign: "center",
    color: "#9a9a9a",
    fontSize: 14,
    marginTop: 6,
  },

  rangeBtn: {
    alignSelf: "center",
    backgroundColor: "#0B5394",
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginTop: 12,
  },
  rangeBtnText: { color: "#fff", fontSize: 14, fontWeight: "700" }, // reduced
});
