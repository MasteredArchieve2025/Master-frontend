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
  SafeAreaView,
} from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import Footer from "../../src/components/Footer";

export default function Profile() {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" backgroundColor="#0B5394" />

      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <TouchableOpacity
            style={styles.backBtn}
            onPress={() => navigation.goBack()}
          >
            <Ionicons
              name={Platform.OS === "ios" ? "chevron-back" : "arrow-back"}
              size={26}
              color="#fff"
            />
          </TouchableOpacity>

          <Text style={styles.headerTitle}>Profile</Text>
          <View style={{ width: 32 }} />
        </View>
      </View>

      {/* Avatar */}
      <View style={styles.avatarContainer}>
        <Image
          source={{
            uri: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=400",
          }}
          style={styles.avatar}
        />
      </View>

      {/* Content */}
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Identity */}
        <Text style={styles.name}>Mabisha</Text>
        <Text style={styles.subName}>Student • My Education</Text>

        {/* Info Card */}
        <View style={styles.card}>
          <InfoRow icon="call-outline" text="+91 9876543210" />
          <InfoRow icon="email" text="mabisha@gmail.com" />
          <InfoRow
            icon="location-outline"
            text="Sunrise Crystal Complex, Thadagam Main Rd, Coimbatore"
          />
        </View>

        {/* IQ Score Card */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>IQ Score</Text>

          <View style={styles.circleWrap}>
            <View style={styles.circle}>
              <Text style={styles.scoreText}>121</Text>
            </View>
          </View>

          <Text style={styles.resultText}>
            Higher than <Text style={styles.highlight}>16.55%</Text> of people
          </Text>

          <Text style={styles.subNote}>115 – 129 : Intelligent</Text>
        </View>

        {/* Actions */}
        <View style={styles.card}>
          <ProfileAction
            icon="edit"
            label="Edit Profile"
            onPress={() => {}}
          />
          <ProfileAction
            icon="settings"
            label="Settings"
            onPress={() => {}}
          />
          <ProfileAction
            icon="log-out-outline"
            label="Logout"
            danger
            onPress={() => {}}
          />
        </View>
      </ScrollView>

      <Footer />
    </SafeAreaView>
  );
}

/* ---------- Reusable Components ---------- */

const InfoRow = ({ icon, text }) => (
  <View style={styles.infoRow}>
    <Ionicons name={icon} size={20} color="#0B5394" />
    <Text style={styles.infoText}>{text}</Text>
  </View>
);

const ProfileAction = ({ icon, label, onPress, danger }) => (
  <TouchableOpacity style={styles.actionRow} onPress={onPress}>
    <Ionicons
      name={icon}
      size={22}
      color={danger ? "#d11a2a" : "#0B5394"}
    />
    <Text
      style={[
        styles.actionText,
        danger && { color: "#d11a2a" },
      ]}
    >
      {label}
    </Text>
    <Ionicons
      name="chevron-forward"
      size={20}
      color="#999"
      style={{ marginLeft: "auto" }}
    />
  </TouchableOpacity>
);

/* ---------- Styles ---------- */

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#fff" },

  /* Header */
  header: {
    height: 180,
    backgroundColor: "#0B5394",
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
    paddingHorizontal: 16,
    paddingTop:
      Platform.OS === "android"
        ? (StatusBar.currentHeight || 0) + 10
        : 28,
  },
  headerTop: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  backBtn: { padding: 6 },
  headerTitle: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "800",
  },

  /* Avatar */
  avatarContainer: {
    position: "absolute",
    top: 115,
    alignSelf: "center",
    zIndex: 10,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: "#fff",
    backgroundColor: "#eee",
    elevation: 5,
  },

  /* Content */
  content: {
    paddingTop: 90,
    paddingBottom: 40,
    paddingHorizontal: 16,
  },
  name: {
    fontSize: 20,
    fontWeight: "700",
    color: "#0B5394",
    textAlign: "center",
  },
  subName: {
    textAlign: "center",
    color: "#777",
    marginBottom: 16,
  },

  /* Cards */
  card: {
    backgroundColor: "#fff",
    borderRadius: 14,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 6,
  },

  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    gap: 8,
  },
  infoText: {
    flex: 1,
    fontSize: 14,
    color: "#222",
  },

  sectionTitle: {
    textAlign: "center",
    fontWeight: "700",
    color: "#0B5394",
    marginBottom: 12,
  },

  circleWrap: { alignItems: "center" },
  circle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 4,
    borderColor: "#0B5394",
    alignItems: "center",
    justifyContent: "center",
  },
  scoreText: {
    fontSize: 32,
    fontWeight: "900",
  },

  resultText: {
    textAlign: "center",
    marginTop: 10,
    color: "#333",
  },
  highlight: { color: "#0B5394", fontWeight: "700" },
  subNote: {
    textAlign: "center",
    color: "#777",
    marginTop: 6,
  },

  /* Actions */
  actionRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  actionText: {
    fontSize: 15,
    marginLeft: 12,
    color: "#222",
    fontWeight: "500",
  },
});
