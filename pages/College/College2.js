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
import Footer from "../../src/components/Footer"; // ✅ footer component

// Example degree list
const degrees = ["B.E", "B.Tech", "B.Arch", "BCA", "BSC"];

const College2 = ({ route }) => {
  const navigation = useNavigation();

  // Safe route params
  const category = route?.params?.category || {
    name: "Unknown",
    icon: null,
  };

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

          <Text style={styles.headerTitle}>Departments</Text>

          <View style={styles.rightSpace} />
        </View>
      </View>

      {/* ===== BODY ===== */}
      <View style={styles.container}>
       

        {/* Category Info */}
        <View style={styles.titleContainer}>
          <View style={styles.iconContainer}>
            {category.icon ? (
              <Image source={category.icon} style={styles.categoryImage} />
            ) : (
              <Ionicons name="school-outline" size={60} color="#0c2f63" />
            )}
          </View>
          <Text style={styles.title}>{category.name}</Text>
        </View>

        {/* Degree List */}
        <ScrollView
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
        >
          {degrees.map((degree, index) => (
            <TouchableOpacity
              key={index}
              style={styles.card}
              onPress={() => navigation.navigate("College3", { degree })}
            >
              <Text style={styles.cardText}>{degree}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* ===== FOOTER ===== */}
      <Footer />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#fff",
  },

  /* ===== HEADER (MATCHING OTHER PAGES) ===== */
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
    flex: 1,
    backgroundColor: "#fff",
  },

  greeting: {
    fontSize: 24,
    fontWeight: "bold",
    paddingHorizontal: 20,
    paddingVertical: 10,
    color: "#0c2f63",
  },

  titleContainer: {
    alignItems: "center",
    marginVertical: 20,
  },

  iconContainer: {
    backgroundColor: "#e6f2ff",
    borderRadius: 50,
    padding: 15,
    marginBottom: 10,
  },

  categoryImage: {
    width: 60,
    height: 60,
    resizeMode: "contain",
  },

  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#0c2f63",
  },

  list: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },

  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#d0e0ff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },

  cardText: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    color: "#003366",
  },
});

export default College2;
