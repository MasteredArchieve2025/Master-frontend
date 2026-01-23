import React from "react";
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
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import Footer from "../../src/components/Footer";
import { fp, hp, wp, normalize } from "../../src/utils/Normalize";

// Categories data
const categories = [
  { name: "Engineering", icon: require("../../assets/engineering.png") },
  { name: "Arts & Science", icon: require("../../assets/arts.png") },
  { name: "Medical", icon: require("../../assets/medical.png") },
  { name: "Polytechnic", icon: require("../../assets/internet.png") },
  { name: "Law", icon: require("../../assets/law.png") },
  { name: "Veterinary", icon: require("../../assets/veterinary.png") },
];

const College1 = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" backgroundColor="#0052A2" />

      {/* Header */}
      <View style={styles.headerWrapper}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backBtn}
            onPress={() => navigation.goBack()}
          >
            <Ionicons
              name={Platform.OS === "ios" ? "chevron-back" : "arrow-back"}
              size={fp(24)}
              color="#fff"
            />
          </TouchableOpacity>

          <Text style={styles.headerTitle}>Colleges</Text>

          {/* Spacer for center alignment */}
          <View style={styles.rightSpace} />
        </View>
      </View>

      {/* Body */}
      <View style={styles.body}>
        <Text style={styles.sectionTitle}>Categories</Text>

        {/* Categories Grid */}
        <ScrollView contentContainerStyle={styles.grid} showsVerticalScrollIndicator={false}>
          {categories.map((category, index) => (
            <TouchableOpacity
              key={index}
              style={styles.card}
              onPress={() => navigation.navigate("College2", { category })}
            >
              <View style={{ alignItems: "center" }}>
                <Image source={category.icon} style={styles.categoryImage} />
                <Text style={styles.cardText}>{category.name}</Text>
                <Text style={styles.cardDescription}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
      <Footer />
    </SafeAreaView>
  )
};

// Styles
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
    height: Platform.OS === "ios" ? hp(52) : hp(64),
    backgroundColor: "#0052A2",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: wp(16),
    paddingVertical: Platform.OS === "ios" ? hp(6) : hp(8),
  },

  backBtn: {
    width: wp(40),
    justifyContent: "center",
    alignItems: "flex-start",
  },

  headerTitle: {
    flex: 1,
    textAlign: "center",
    fontSize: Platform.OS === "ios" ? fp(17) : fp(18),
    fontWeight: Platform.OS === "ios" ? "600" : "700",
    color: "#fff",
  },

  rightSpace: {
    width: wp(40),
  },

  /* Body */
  body: {
    flex: 1,
    backgroundColor: "#fff",
  },

  sectionTitle: {
    fontSize: fp(20),
    fontWeight: "700",
    paddingHorizontal: wp(20),
    paddingVertical: hp(16),
    color: "#0c2f63",
  },

  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-evenly",
    paddingHorizontal: wp(10),
    paddingBottom: hp(40),
  },

  card: {
    width: "45%",
    backgroundColor: "#f2f2f2",
    borderRadius: normalize(12),
    paddingTop: hp(30),
    padding: wp(15),
    alignItems: "center",
    marginBottom: hp(30),
  },

  categoryImage: {
    width: wp(60),
    height: wp(60),
    marginBottom: hp(10),
  },

  cardText: {
    fontSize: fp(16),
    fontWeight: "bold",
    marginBottom: hp(5),
    textAlign: "center",
    color: "#0c2f63",
  },

  cardDescription: {
    fontSize: fp(12),
    textAlign: "center",
    color: "gray",
  },
});

export default College1;
