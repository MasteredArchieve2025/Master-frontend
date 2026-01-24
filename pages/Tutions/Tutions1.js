import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  useWindowDimensions,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import Footer from "../../src/components/Footer";

/* -------- DATA -------- */
const standards = [
  { id: "1", title: "Class 12", subtitle: "Science, Commerce & Arts", icon: "school" },
  { id: "2", title: "Class 11", subtitle: "Science, Commerce & Arts", icon: "book" },
  { id: "3", title: "Class 10", subtitle: "Secondary Education Boards", icon: "ribbon" },
  { id: "4", title: "Class 9", subtitle: "Foundation Courses", icon: "library" },
  { id: "5", title: "Classes 6 - 8", subtitle: "Middle School Curriculum", icon: "happy" },
  { id: "6", title: "Classes 1 - 5", subtitle: "Primary School Curriculum", icon: "happy-outline" },
];

export default function Tution1({ navigation }) {
  const { width } = useWindowDimensions();
  const isTablet = width >= 768;

  const renderItem = ({ item }) => (
    <TouchableOpacity
      activeOpacity={0.85}
      style={[
        styles.card,
        { width: isTablet ? "48%" : "47%" },
      ]}
      onPress={() =>
        navigation.navigate("Tutions2", {
          selectedClass: item.title,
        })
      }
    >
      <View style={styles.iconBox}>
        <Ionicons name={item.icon} size={26} color="#0B5ED7" />
      </View>

      <Text style={styles.cardTitle}>{item.title}</Text>
      <Text style={styles.cardSubtitle}>{item.subtitle}</Text>
    </TouchableOpacity>
  );
  return (
    <SafeAreaView style={styles.container}>
      {/* ===== HEADER (SAME AS OTHER PAGES) ===== */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Standards</Text>
        <View style={{ width: 24 }} />
      </View>

      {/* ===== GRID ===== */}
      <FlatList
        data={standards}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={styles.row}
        contentContainerStyle={{
          paddingTop: 16,
          paddingBottom: 100,
        }}
        showsVerticalScrollIndicator={false}
      />

      <Footer />
    </SafeAreaView>
  );
}

/* ================= STYLES ================= */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EEF6FF",
  },

  /* HEADER */
  header: {
    backgroundColor: "#0052A2",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
  },

  headerTitle: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "700",
  },

  /* GRID */
  row: {
    justifyContent: "space-between",
    paddingHorizontal: 16,
    marginBottom: 14,
  },

  card: {
    backgroundColor: "#fff",
    borderRadius: 18,
    padding: 16,
    alignItems: "center",
    elevation: Platform.OS === "android" ? 3 : 0,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
  },

  iconBox: {
    width: 52,
    height: 52,
    borderRadius: 16,
    backgroundColor: "#E8F1FF",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },

  cardTitle: {
    fontSize: 15,
    fontWeight: "700",
    textAlign: "center",
  },

  cardSubtitle: {
    fontSize: 12,
    color: "#5F6F81",
    textAlign: "center",
    marginTop: 4,
  },
});
