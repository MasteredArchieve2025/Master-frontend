import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  useWindowDimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import Footer from "../../src/components/Footer";

/* ---------------- DATA ---------------- */
const departments = [
  { id: "1", title: "Computer Science", icon: "laptop-outline" },
  { id: "2", title: "Mechanical Engineering", icon: "settings-outline" },
  { id: "3", title: "Electrical & Electronics", icon: "flash-outline" },
  { id: "4", title: "Business Administration", icon: "briefcase-outline" },
  { id: "5", title: "Biotechnology", icon: "flask-outline" },
  { id: "6", title: "Civil Engineering", icon: "business-outline" },
];

/* ---------------- SCREEN ---------------- */
export default function Collegecourse1({ navigation }) {
  const { width } = useWindowDimensions();
  const isTablet = width >= 768;

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.card,
        { width: isTablet ? "48%" : "47%" },
      ]}
      activeOpacity={0.85}
       onPress={() =>
      navigation.navigate("Collegecourse2", {
        department: item.title,
      })
    }
    >
      <View style={styles.iconBox}>
        <Ionicons name={item.icon} size={28} color="#0B5ED7" />
      </View>

      <Text style={styles.title}>{item.title}</Text>

      <View style={styles.badge}>
        <Ionicons name="checkmark-circle" size={14} color="#0B5ED7" />
        <Text style={styles.badgeText}>Extra Skill Courses Available</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#e9ebee" />
        </TouchableOpacity>

        <View>
          <Text style={styles.headerTitle}>Departments</Text>
         
        </View>

        <View style={{ width: 24 }} />
      </View>

      {/* Title */}
      <View style={styles.topText}>
        <Text style={styles.mainTitle}>Skill Courses</Text>
        <Text style={styles.desc}>
          Choose a department to explore certifications
        </Text>
      </View>

      {/* Grid */}
      <FlatList
        data={departments}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={styles.row}
        contentContainerStyle={{ paddingBottom: 30 }}
        showsVerticalScrollIndicator={false}
      />
      <Footer/>
    </SafeAreaView>
  );
}

/* ---------------- STYLES ---------------- */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F8FF",
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
    backgroundColor: "#0052A2",
  },

  headerTitle: {
    fontSize: 18,
    fontWeight: "700",
    textAlign: "center",
    color : "white"
  },

  subTitle: {
    fontSize: 12,
    color: "#666",
    textAlign: "center",
  },

  topText: {
    paddingHorizontal: 16,
    marginVertical: 12,
  },

  mainTitle: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 4,
  },

  desc: {
    fontSize: 13,
    color: "#666",
  },

  row: {
    justifyContent: "space-between",
    paddingHorizontal: 16,
    marginBottom: 14,
  },

  card: {
    backgroundColor: "#fff",
    borderRadius: 18,
    padding: 16,
    elevation: 4,
  },

  iconBox: {
    width: 46,
    height: 46,
    borderRadius: 14,
    backgroundColor: "#EAF2FF",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },

  title: {
    fontSize: 14,
    fontWeight: "700",
    marginBottom: 8,
  },

  badge: {
    flexDirection: "row",
    alignItems: "center",
  },

  badgeText: {
    fontSize: 11,
    color: "#0B5ED7",
    marginLeft: 4,
    fontWeight: "600",
  },
});
