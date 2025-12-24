import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Platform,
  SafeAreaView,
  StatusBar,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import Footer from "../../src/components/Footer";

const { width } = Dimensions.get("window");
const isTablet = width >= 768;

const College4 = ({ route }) => {
  const navigation = useNavigation();
  const { college } = route?.params || {};
  const [activeTab, setActiveTab] = useState("Placement");

  const renderContent = () => {
    if (activeTab !== "Placement") {
      return (
        <View style={styles.contentContainer}>
          <Text style={styles.contentTitle}>{activeTab}</Text>
          <Text style={styles.paragraph}>
            Details about {activeTab} will be available here.
          </Text>
        </View>
      );
    }

    return (
      <View style={styles.contentContainer}>
        <Text style={styles.contentTitle}>Placement</Text>

        <Text style={styles.contentSubtitle}>
          Training & Placement: Shaping Future-Ready Women Engineers
        </Text>

        <View style={styles.placementContent}>
          <Image
            source={require("../../assets/principal.jpg")}
            style={styles.officerImage}
          />

          <View style={styles.placementText}>
            <Text style={styles.officerName}>Mr. C.D. Prabakar</Text>
            <Text style={styles.officerTitle}>Placement Officer</Text>

            <Text style={styles.paragraph}>
              Led by Mr. C.D. Prabakar, the Training & Placement Department at
              Arunachala College of Engineering for Women is dedicated to
              preparing students for success in today’s fast-paced,
              technology-driven world.
            </Text>
          </View>
        </View>

        <Text style={styles.paragraph}>
          We are proud to be a leading institution for producing industry-ready
          graduates who excel in technical skills and professional
          competencies.
        </Text>

        <Text style={styles.holisticTitle}>Holistic Career Preparation</Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" backgroundColor="#0052A2" />

      {/* ---------- HEADER (COMMON) ---------- */}
      <View style={styles.headerWrapper}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
            <Ionicons
              name={Platform.OS === "ios" ? "chevron-back" : "arrow-back"}
              size={24}
              color="#fff"
            />
          </TouchableOpacity>

          <Text style={styles.headerTitle}>College Details</Text>

          <View style={{ width: 40 }} />
        </View>
      </View>

      {/* ---------- BODY ---------- */}
      <ScrollView showsVerticalScrollIndicator={false}>
       

        {/* Logo */}
        <View style={styles.logoContainer}>
          <Image
            source={require("../../assets/collegeicon.png")}
            style={styles.logo}
          />
        </View>

        {/* College Name */}
        <Text style={styles.collegeName}>
          Arunachala College of Engineering
        </Text>
        <Text style={styles.collegeSubName}>
          For Women, Nagercoil
        </Text>

        {/* Tabs */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.tabsContainer}
        >
          {["All", "Dept", "Placement", "Academic", "Facilities", "Admission", "About"].map(
            (tab) => (
              <TouchableOpacity key={tab} onPress={() => setActiveTab(tab)}>
                <Text
                  style={[
                    styles.tabText,
                    activeTab === tab && styles.activeTabText,
                  ]}
                >
                  {tab}
                </Text>
              </TouchableOpacity>
            )
          )}
        </ScrollView>

        {renderContent()}
      </ScrollView>
      <Footer/>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#FCFCFC",
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
  },
  headerTitle: {
    flex: 1,
    textAlign: "center",
    color: "#fff",
    fontSize: Platform.OS === "ios" ? 17 : 18,
    fontWeight: "700",
  },

  /* ---------- BODY ---------- */
  greeting: {
    fontSize: isTablet ? 28 : 24,
    fontWeight: "bold",
    color: "#005AA1",
    paddingHorizontal: 20,
    marginTop: 15,
  },

  logoContainer: {
    alignItems: "center",
    marginVertical: 20,
  },
  logo: {
    width: isTablet ? 220 : 170,
    height: isTablet ? 240 : 190,
    resizeMode: "contain",
  },

  collegeName: {
    fontSize: isTablet ? 20 : 18,
    fontWeight: "bold",
    color: "#005AA1",
    textAlign: "center",
  },
  collegeSubName: {
    fontSize: isTablet ? 18 : 16,
    fontWeight: "600",
    color: "#005AA1",
    textAlign: "center",
    marginBottom: 20,
  },

  /* Tabs */
  tabsContainer: {
    paddingHorizontal: 20,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
  },
  tabText: {
    fontSize: isTablet ? 16 : 14,
    color: "#757575",
    fontWeight: "bold",
    marginRight: 20,
    paddingBottom: 6,
  },
  activeTabText: {
    color: "#005AA1",
    borderBottomWidth: 2,
    borderBottomColor: "#005AA1",
  },

  /* Content */
  contentContainer: {
    padding: 20,
  },
  contentTitle: {
    fontSize: isTablet ? 24 : 22,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
  contentSubtitle: {
    fontSize: isTablet ? 18 : 16,
    fontWeight: "bold",
    color: "#005AA1",
    textAlign: "center",
    marginVertical: 15,
  },

  placementContent: {
    flexDirection: "row",
    marginBottom: 15,
  },
  officerImage: {
    width: isTablet ? 140 : 100,
    height: isTablet ? 170 : 120,
    borderRadius: 8,
  },
  placementText: {
    flex: 1,
    marginLeft: 15,
  },
  officerName: {
    fontSize: isTablet ? 18 : 16,
    fontWeight: "bold",
    color: "#333",
  },
  officerTitle: {
    fontSize: isTablet ? 16 : 14,
    color: "#757575",
    marginBottom: 8,
  },

  paragraph: {
    fontSize: isTablet ? 16 : 14,
    lineHeight: 22,
    color: "#333",
    textAlign: "justify",
    marginBottom: 10,
  },

  holisticTitle: {
    fontSize: isTablet ? 20 : 18,
    fontWeight: "bold",
    color: "#005AA1",
    marginTop: 20,
  },
});

export default College4;
