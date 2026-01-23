import React, { useRef, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Platform,
  StatusBar,
  SafeAreaView,
  Dimensions,
  Image,
  ScrollView,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { WebView } from "react-native-webview";
import Footer from "../../src/components/Footer";

const { width } = Dimensions.get("window");
const isTablet = width >= 768;

/* ---------------- BANNER ADS ---------------- */
const bannerAds = [
  "https://images.unsplash.com/photo-1516321318423-f06f85e504b3",
  "https://images.unsplash.com/photo-1509062522246-3755977927d7",
  "https://images.unsplash.com/photo-1551650975-87deedd944c3",
];

/* ---------------- DATA ---------------- */
const activities = [
  {
    id: 1,
    title: "Computer & IT",
    icon: "laptop",
    sections: [{ title: "Computer & IT", items: ["Web Development","Python Programming","Data Science","Cybersecurity","Cloud Computing"] }],
  },
  {
    id: 2,
    title: "Health Science",
    icon: "heartbeat",
    sections: [{ title: "Health Science", items: ["Nursing Fundamentals","Public Health","Nutrition & Dietetics","Medical Terminology","First Aid & CPR"] }],
  },
  {
    id: 3,
    title: "Business & Management",
    icon: "briefcase",
    sections: [{ title: "Business & Management", items: ["Digital Marketing","Business Analytics","Project Management","Finance Fundamentals","Entrepreneurship"] }],
  },
  {
    id: 4,
    title: "Language & Communication",
    icon: "language",
    sections: [{ title: "Language & Communication", items: ["English Grammar & Writing","Public Speaking","Business Communication","French for Beginners","Creative Writing"] }],
  },
  {
    id: 5,
    title: "Engineering & Technical",
    icon: "cogs",
    sections: [{ title: "Engineering & Technical", items: ["Mechanical Engineering Basics","Electrical Systems","Civil Engineering","Robotics","3D Printing & CAD Design"] }],
  },
  {
    id: 6,
    title: "Arts & Design",
    icon: "paint-brush",
    sections: [{ title: "Arts & Design", items: ["UI/UX Design","Graphic Design","Animation","Photography","Interior Design"] }],
  },
  {
    id: 7,
    title: "Lifestyle & Personal Development",
    icon: "user",
    sections: [{ title: "Lifestyle & Personal Development", items: ["Time Management","Mindfulness & Meditation","Fitness & Wellness","Personal Finance","Goal Setting"] }],
  },
];

export default function Course1({ navigation }) {
  const bannerRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  /* AUTO SCROLL */
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => {
        const next = (prev + 1) % bannerAds.length;
        bannerRef.current?.scrollTo({ x: next * width, animated: true });
        return next;
      });
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      activeOpacity={0.85}
      style={styles.card}
      onPress={() =>
        navigation.navigate("Course2", {
          sections: item.sections,
        })
      }
    >
      <LinearGradient colors={["#2295D2", "#284598"]} style={styles.iconContainer}>
        <Icon name={item.icon} size={26} color="#fff" />
      </LinearGradient>

      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.description}>
        Explore courses and skill development programs
      </Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" backgroundColor="#0052A2" />

      {/* HEADER */}
      <View style={styles.headerWrapper}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
            <Ionicons
              name={Platform.OS === "ios" ? "chevron-back" : "arrow-back"}
              size={24}
              color="#fff"
            />
          </TouchableOpacity>

          <Text style={styles.headerTitle}>Courses</Text>
          <View style={{ width: 40 }} />
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* ===== TOP BANNER ADS ===== */}
        <ScrollView
          ref={bannerRef}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onMomentumScrollEnd={(e) =>
            setActiveIndex(Math.round(e.nativeEvent.contentOffset.x / width))
          }
        >
          {bannerAds.map((img, i) => (
            <Image
              key={i}
              source={{ uri: img }}
              style={{ width, height: isTablet ? 160 : 190 }}
              resizeMode="cover"
            />
          ))}
        </ScrollView>

        {/* DOTS */}
        <View style={styles.dots}>
          {bannerAds.map((_, i) => (
            <View
              key={i}
              style={[styles.dot, activeIndex === i && styles.activeDot]}
            />
          ))}
        </View>

        {/* ===== COURSE GRID ===== */}
        <FlatList
          data={activities}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
          columnWrapperStyle={styles.row}
          contentContainerStyle={styles.list}
          scrollEnabled={false}
        />

        {/* ===== VIDEO AD ===== */}
        <View style={styles.videoBox}>
          <WebView
            allowsFullscreenVideo
            source={{ uri: "https://www.youtube.com/watch?v=NONufn3jgXI" }}
            style={{ height: isTablet ? 260 : 220 }}
          />
        </View>

        <View style={{ height: 120 }} />
      </ScrollView>

      <Footer />
    </SafeAreaView>
  );
}

/* ---------------- STYLES ---------------- */
const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#fff" },

  headerWrapper: { backgroundColor: "#0052A2" },
  header: {
    height: Platform.OS === "ios" ? 52 : 64,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
  },
  backBtn: { width: 40 },
  headerTitle: {
    flex: 1,
    textAlign: "center",
    fontSize: 18,
    fontWeight: "700",
    color: "#fff",
  },

  dots: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 8,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#ccc",
    marginHorizontal: 4,
  },
  activeDot: {
    width: 16,
    backgroundColor: "#0B5ED7",
  },

  list: {
    padding: 12,
  },

  row: {
    justifyContent: "space-between",
  },

  card: {
    backgroundColor: "#fff",
    width: isTablet ? "48%" : "47%",
    borderRadius: 14,
    padding: 16,
    marginBottom: 14,
    alignItems: "center",
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },

  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },

  title: {
    fontSize: 15,
    fontWeight: "700",
    color: "#004780",
    textAlign: "center",
    marginBottom: 6,
  },

  description: {
    fontSize: 11,
    color: "#555",
    textAlign: "center",
  },

  videoBox: {
    marginHorizontal: 16,
    marginTop: 30,
    borderRadius: 12,
    overflow: "hidden",
    backgroundColor: "#000",
  },
});
