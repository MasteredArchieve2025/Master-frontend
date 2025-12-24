import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Platform,
  StatusBar,
  SafeAreaView,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";

const { width } = Dimensions.get("window");
const isTablet = width >= 768;

export default function School2() {
  const navigation = useNavigation();
  const route = useRoute();
  const school = route.params?.school;

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" backgroundColor="#0052A2" />

      {/* ===== HEADER (SAME AS SCHOOL1) ===== */}
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

          <Text style={styles.headerTitle}>About School</Text>

          <View style={styles.rightSpace} />
        </View>
      </View>

      {/* ===== BODY ===== */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.container}
      >
        {/* Greeting */}
        <Text style={styles.greeting}>
          <Text style={styles.hello}>Hello! </Text>
          <Text style={styles.name}>Mabisha</Text>
        </Text>

        {/* School Image */}
        <View style={styles.imageContainer}>
          <Image
            source={school?.image || require("../../assets/school.png")}
            style={styles.schoolImage}
          />
        </View>

        {/* School Name */}
        <Text style={styles.schoolName}>
          {school?.name || "Josephs Matric HR Sec School"}
        </Text>

        {/* Description */}
        <Text style={styles.description}>
          The school has a private building with 24 classrooms, library,
          playground, safe drinking water, computer facilities, and a nurturing
          academic environment for students.
        </Text>

        {/* Photos */}
        <Text style={styles.sectionTitle}>Photos</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <Image source={require("../../assets/school1.png")} style={styles.photo} />
          <Image source={require("../../assets/school2.png")} style={styles.photo} />
          <Image source={require("../../assets/school3.png")} style={styles.photo} />
        </ScrollView>

        {/* Vision */}
        <Text style={styles.sectionTitle}>Our Vision</Text>
        <Text style={styles.text}>
          To empower students with confidence, discipline, and lifelong learning
          skills to face the future.
        </Text>

        {/* Mission */}
        <Text style={styles.sectionTitle}>Our Mission</Text>
        <Text style={styles.text}>
          We aim to deliver quality education through academic excellence,
          creativity, innovation, and strong moral values.
        </Text>

        {/* About */}
        <Text style={styles.sectionTitle}>About</Text>
        <View style={styles.aboutContainer}>
          <Image
            source={require("../../assets/school1.png")}
            style={styles.aboutImage}
          />
          <Text style={styles.aboutText}>
            With more than 15 years of excellence in education, the institution
            stands among the most trusted schools in Tamil Nadu.
          </Text>
        </View>

        {/* Contact */}
        <Text style={styles.sectionTitle}>Contact</Text>
        <View style={styles.contactRow}>
          <Image
            source={require("../../assets/map.png")}
            style={styles.mapImage}
          />
          <Text style={styles.contactText}>
            Colachel, Kanyakumari{"\n"}
            Tamil Nadu – 629251{"\n"}
            Mobile: +91 XXXXX-XXXXX{"\n"}
            Email: xxx@xxxxxx
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#fff",
  },

  /* ===== HEADER (MATCHES SCHOOL1) ===== */
  headerWrapper: {
    backgroundColor: "#0052A2",
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

  /* ===== BODY ===== */
  container: {
    padding: 16,
    paddingBottom: 40,
  },

  greeting: {
    fontSize: isTablet ? 20 : 16,
    marginBottom: 10,
  },

  hello: {
    color: "#0070C0",
  },

  name: {
    color: "#003366",
    fontWeight: "bold",
  },

  imageContainer: {
    alignItems: "center",
    marginVertical: 12,
  },

  schoolImage: {
    width: isTablet ? 150 : 100,
    height: isTablet ? 150 : 100,
    resizeMode: "contain",
  },

  schoolName: {
    textAlign: "center",
    fontSize: isTablet ? 18 : 15,
    fontWeight: "bold",
    color: "#003366",
    marginBottom: 12,
  },

  sectionTitle: {
    fontSize: isTablet ? 18 : 15,
    fontWeight: "bold",
    color: "#003366",
    marginVertical: 8,
  },

  description: {
    fontSize: isTablet ? 16 : 14,
    lineHeight: 22,
    textAlign: "justify",
    marginBottom: 16,
    color: "#333",
  },

  text: {
    fontSize: isTablet ? 16 : 14,
    lineHeight: 22,
    textAlign: "justify",
    marginBottom: 12,
    color: "#333",
  },

  photo: {
    width: isTablet ? 120 : 80,
    height: isTablet ? 120 : 80,
    borderRadius: 6,
    marginRight: 10,
    resizeMode: "cover",
  },

  aboutContainer: {
    flexDirection: "row",
    marginBottom: 16,
  },

  aboutImage: {
    width: isTablet ? 140 : 100,
    height: isTablet ? 140 : 100,
    borderRadius: 6,
    marginRight: 10,
    resizeMode: "cover",
  },

  aboutText: {
    flex: 1,
    fontSize: isTablet ? 16 : 14,
    lineHeight: 22,
    textAlign: "justify",
    color: "#333",
  },

  contactRow: {
    flexDirection: "row",
    marginBottom: 20,
  },

  mapImage: {
    width: 100,
    height: 100,
    marginRight: 10,
  },

  contactText: {
    fontSize: isTablet ? 16 : 14,
    lineHeight: 22,
    color: "#333",
  },
});
