import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
  TextInput,
  Platform,
  StatusBar,
  SafeAreaView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const schools = [
  {
    id: "1",
    name: "Josephs Matric HR Sec School, Sasthankari, Colachel",
    image: require("../../assets/school.png"),
    category: "Govt.School",
  },
  {
    id: "2",
    name: "St. Mary’s CBSE School, Nagercoil",
    image: require("../../assets/school.png"),
    category: "CBSE",
  },
  {
    id: "3",
    name: "National Public School, Chennai",
    image: require("../../assets/school.png"),
    category: "ICSE",
  },
  {
    id: "4",
    name: "Velammal State Board School, Madurai",
    image: require("../../assets/school.png"),
    category: "State Board",
  },
  {
    id: "5",
    name: "Govt Higher Secondary School, Trichy",
    image: require("../../assets/school.png"),
    category: "Govt.School",
  },
];

export default function School1() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const navigation = useNavigation();

  const filteredSchools =
    selectedCategory === "All"
      ? schools
      : schools.filter((s) => s.category === selectedCategory);

  const renderSchoolCard = ({ item }) => (
    <View style={styles.card}>
      <Image source={item.image} style={styles.schoolImage} />
      <View style={styles.schoolInfo}>
        <Text style={styles.schoolName}>{item.name}</Text>
        <TouchableOpacity
          style={styles.readMoreBtn}
          onPress={() => navigation.navigate("School2", { school: item })}
        >
          <Text style={styles.readMoreText}>Read more &gt;</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

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

          <Text style={styles.headerTitle}>Schools</Text>

          <View style={styles.rightSpace} />
        </View>
      </View>

      {/* Body */}
      <View style={styles.body}>
        {/* Filters */}
        <View style={styles.filterRow}>
          <View style={styles.filterInput}>
            <TextInput
              placeholder="Filters"
              placeholderTextColor="#666"
              style={{ flex: 1 }}
            />
            <Ionicons name="chevron-down-outline" size={16} color="#333" />
          </View>
          <View style={styles.filterInput}>
            <TextInput
              placeholder="Select"
              placeholderTextColor="#666"
              style={{ flex: 1 }}
            />
            <Ionicons name="chevron-down-outline" size={16} color="#333" />
          </View>
        </View>

        {/* Categories */}
        <View style={styles.categories}>
          {["All", "Govt.School", "State Board", "CBSE", "ICSE"].map((cat) => (
            <TouchableOpacity
              key={cat}
              style={[
                styles.categoryBtn,
                selectedCategory === cat && styles.activeCategory,
              ]}
              onPress={() => setSelectedCategory(cat)}
            >
              <Text
                style={[
                  styles.categoryText,
                  selectedCategory === cat && styles.activeCategoryText,
                ]}
              >
                {cat}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* School List */}
        <FlatList
          data={filteredSchools}
          renderItem={renderSchoolCard}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingBottom: 90, paddingTop: 12 }}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#fff", // ✅ BODY WHITE
  },

  /* Header Wrapper for SafeArea */
  headerWrapper: {
    backgroundColor: "#0052A2",
  },

  header: {
    height: Platform.OS === "ios" ? 52 : 64, // ⬆️ more height
    backgroundColor: "#0052A2",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: Platform.OS === "ios" ? 6 : 8, // ⬆️ soft padding
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

  body: {
    flex: 1,
    backgroundColor: "#fff",
  },

  /* Filters */
  filterRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 12,
    marginTop: 14,
    marginBottom: 14,
  },

  filterInput: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 4,
    flex: 0.48,
  },

  /* Categories */
  categories: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },

  categoryBtn: {
    paddingHorizontal: 6,
    paddingBottom: 6,
  },

  categoryText: {
    fontSize: 14,
    color: "#333",
  },

  activeCategory: {
    borderBottomWidth: 2,
    borderBottomColor: "#0052A2",
  },

  activeCategoryText: {
    color: "#0052A2",
    fontWeight: "bold",
  },

  /* Card */
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    marginHorizontal: 14,
    marginBottom: 20,
    padding: 16,
    flexDirection: "row",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.12,
    shadowRadius: 5,
    elevation: 4,
    minHeight: 110,
  },

  schoolImage: {
    width: 75,
    height: 75,
    borderRadius: 8,
    marginRight: 16,
  },

  schoolInfo: {
    flex: 1,
    paddingRight: 70,
  },

  schoolName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#003366",
    lineHeight: 22,
  },

  readMoreBtn: {
    position: "absolute",
    bottom: -22,
    right: -18,
    backgroundColor: "#0052A2",
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderTopLeftRadius: 10,
    borderBottomRightRadius: 12,
  },

  readMoreText: {
    color: "#fff",
    fontSize: 13,
    fontWeight: "500",
  },
});
