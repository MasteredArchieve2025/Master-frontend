import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Platform,
  StatusBar,
  SafeAreaView,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Svg, { Path } from "react-native-svg";
import { useNavigation } from "@react-navigation/native";
import Footer from "../../src/components/Footer";

const { width } = Dimensions.get("window");
const isTablet = width >= 768;

/* -------------------- DATA -------------------- */
const allColleges = [
  {
    name: "Arunachala College of Engineering For Women, Nagercoil",
    logo: require("../../assets/collegeicon.png"),
  },
  {
    name: "Arunachala College of Engineering For Women, Nagercoil",
    logo: require("../../assets/collegeicon.png"),
  },
];

const govtUniversities = [
  {
    name: "Government College of Technology, Coimbatore",
    logo: require("../../assets/collegeicon.png"),
  },
];

const autonomousUniversities = [
  {
    name: "PSG College of Technology, Coimbatore",
    logo: require("../../assets/collegeicon.png"),
  },
];

/* -------------------- READ MORE BUTTON -------------------- */
function ReadMoreButton({ onPress }) {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.85} style={styles.readMoreContainer}>
      <Svg height="36" width="110">
        <Path d="M20 0 L110 0 L110 36 L0 36 Z" fill="#0c2f63" />
      </Svg>
      <View style={styles.readMoreTextContainer}>
        <Text style={styles.readMoreText}>Read More</Text>
      </View>
    </TouchableOpacity>
  );
}

/* -------------------- SCREEN -------------------- */
const College3 = ({ route }) => {
  const { degree } = route.params;
  const navigation = useNavigation();
  const [activeTab, setActiveTab] = useState("All");

  const renderColleges = () => {
    switch (activeTab) {
      case "Govt":
        return govtUniversities;
      case "Autonomous":
        return autonomousUniversities;
      default:
        return allColleges;
    }
  };

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" backgroundColor="#0052A2" />

      {/* -------------------- HEADER -------------------- */}
      <View style={styles.headerWrapper}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
            <Ionicons
              name={Platform.OS === "ios" ? "chevron-back" : "arrow-back"}
              size={24}
              color="#fff"
            />
          </TouchableOpacity>

          <Text style={styles.headerTitle}>{degree}</Text>

          <View style={{ width: 40 }} />
        </View>
      </View>

      {/* -------------------- BODY -------------------- */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        

        {/* Filters */}
        <View style={styles.filtersContainer}>
          <TouchableOpacity style={styles.filterButton}>
            <Text style={styles.filterText}>Filters</Text>
            <Ionicons name="chevron-down" size={18} color="gray" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.filterButton}>
            <Text style={styles.filterText}>Select</Text>
            <Ionicons name="chevron-down" size={18} color="gray" />
          </TouchableOpacity>
        </View>

        {/* Tabs */}
        <View style={styles.tabsContainer}>
          {["All", "Govt", "Autonomous"].map((tab) => (
            <TouchableOpacity key={tab} onPress={() => setActiveTab(tab)}>
              <Text
                style={[
                  styles.tabText,
                  activeTab === tab && styles.activeTabText,
                ]}
              >
                {tab === "Govt"
                  ? "Govt Universities"
                  : tab === "Autonomous"
                  ? "Autonomous Universities"
                  : "All"}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* College Cards */}
        {renderColleges().map((college, index) => (
          <View key={index} style={styles.card}>
            <Image source={college.logo} style={styles.logo} />

            <View style={styles.collegeInfo}>
              <Text style={styles.collegeName}>{college.name}</Text>

              <ReadMoreButton
                onPress={() => navigation.navigate("College4", { college })}
              />
            </View>
          </View>
        ))}
      </ScrollView>
      <Footer/>
    </SafeAreaView>
  );
};

/* -------------------- STYLES -------------------- */
const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#fff",
  },

  /* Header */
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

  /* Body */
  content: {
    paddingBottom: 30,
  },
  greeting: {
    fontSize: isTablet ? 28 : 24,
    fontWeight: "bold",
    paddingHorizontal: 20,
    paddingVertical: 10,
    color: "#0c2f63",
  },

  filtersContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    marginVertical: 10,
  },
  filterButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f2f2f2",
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
    width: "48%",
    justifyContent: "space-between",
  },
  filterText: {
    fontSize: isTablet ? 16 : 14,
  },

  tabsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 10,
  },
  tabText: {
    fontSize: isTablet ? 16 : 14,
    color: "gray",
  },
  activeTabText: {
    color: "#0c2f63",
    borderBottomWidth: 2,
    borderBottomColor: "#0c2f63",
    paddingBottom: 4,
  },

  card: {
    flexDirection: "row",
    backgroundColor: "#f2f2f2",
    borderRadius: 12,
    padding: 15,
    marginHorizontal: 20,
    marginBottom: 15,
    alignItems: "center",
  },
  logo: {
    width: isTablet ? 80 : 60,
    height: isTablet ? 80 : 60,
    marginRight: 15,
  },
  collegeInfo: {
    flex: 1,
  },
  collegeName: {
    fontSize: isTablet ? 18 : 16,
    fontWeight: "bold",
    marginBottom: 10,
  },

  /* Read More */
  readMoreContainer: {
    alignSelf: "flex-end",
    marginRight: -15,
  },
  readMoreTextContainer: {
    position: "absolute",
    width: 110,
    height: 36,
    justifyContent: "center",
    alignItems: "center",
  },
  readMoreText: {
    color: "#fff",
    fontSize: 13,
    fontWeight: "bold",
  },
});

export default College3;
