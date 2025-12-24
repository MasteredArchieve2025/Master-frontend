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
              size={24}
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
      <Footer/>
    </SafeAreaView>
  );
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

  /* Body */
  body: {
    flex: 1,
    backgroundColor: "#fff",
  },

  sectionTitle: {
    fontSize: 20,
    fontWeight: "700",
    paddingHorizontal: 20,
    paddingVertical: 16,
    color: "#0c2f63",
  },

  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-evenly",
    paddingHorizontal: 10,
    paddingBottom: 40,
  },

  card: {
    width: "45%",
    backgroundColor: "#f2f2f2",
    borderRadius: 12,
    paddingTop: 30,
    padding: 15,
    alignItems: "center",
    marginBottom: 30,
  },

  categoryImage: {
    width: 60,
    height: 60,
    marginBottom: 10,
  },

  cardText: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
    textAlign: "center",
    color: "#0c2f63",
  },

  cardDescription: {
    fontSize: 12,
    textAlign: "center",
    color: "gray",
  },
});

export default College1;
