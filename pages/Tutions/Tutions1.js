import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  useWindowDimensions,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import Footer from "../../src/components/Footer";

export default function Tution1({ navigation }) {
  const { width } = useWindowDimensions();
  const isTablet = width >= 768;

  const standards = [
    { title: "Class 12", subtitle: "Science, Commerce & Arts", icon: "school" },
    { title: "Class 11", subtitle: "Science, Commerce & Arts", icon: "book" },
    { title: "Class 10", subtitle: "Secondary Education Boards", icon: "ribbon" },
    { title: "Class 9", subtitle: "Foundation Courses", icon: "library" },
    { title: "Classes 6 - 8", subtitle: "Middle School Curriculum", icon: "happy" },
    { title: "Classes 1 - 5", subtitle: "Primary School Curriculum", icon: "happy-outline" },
  ];

  return (
    <SafeAreaView style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#0B5ED7" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Tuition</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView
        contentContainerStyle={[
          styles.content,
          { paddingHorizontal: isTablet ? 24 : 16 },
        ]}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.heading}>Choose your standard</Text>

        {standards.map((item, index) => (
          <TouchableOpacity
            key={index}
            activeOpacity={0.75}
            style={[
              styles.card,
              { padding: isTablet ? 18 : 14 },
            ]}
            onPress={() =>
              navigation.navigate("Tutions2", {
                selectedClass: item.title,
              })
            }
          >
            <View style={styles.cardLeft}>
              <View style={styles.iconBox}>
                <Ionicons name={item.icon} size={22} color="#0B5ED7" />
              </View>

              <View>
                <Text style={styles.cardTitle}>{item.title}</Text>
                <Text style={styles.cardSubtitle}>{item.subtitle}</Text>
              </View>
            </View>

            <Ionicons name="chevron-forward" size={20} color="#0B5ED7" />
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Bottom tab UI placeholder */}
      <View
        style={[
          styles.bottomTab,
          { height: isTablet ? 72 : 60 },
        ]}
      />
      <Footer/>
    </SafeAreaView>
  );
}

/* ===== STYLES ===== */

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#EEF6FF" },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 10,
  },

  headerTitle: { fontSize: 18, fontWeight: "600", color: "#000" },

  content: { paddingBottom: 90 },

  heading: {
    fontSize: 20,
    fontWeight: "700",
    color: "#000",
    marginVertical: 16,
  },

  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    marginBottom: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    elevation: Platform.OS === "android" ? 3 : 0,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
  },

  cardLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
  },

  iconBox: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: "#E8F1FF",
    alignItems: "center",
    justifyContent: "center",
  },

  cardTitle: { fontSize: 16, fontWeight: "600", color: "#000" },

  cardSubtitle: { fontSize: 12, color: "#5F6F81", marginTop: 2 },

  bottomTab: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderColor: "#E5EAF0",
  },
});
