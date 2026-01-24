import React, { useRef, useEffect, useState } from "react";
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
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { WebView } from "react-native-webview";
import { useNavigation, useRoute } from "@react-navigation/native";
import Footer from "../../src/components/Footer";

const { width } = Dimensions.get("window");
const isTablet = width >= 768;

/* ---------- BANNER ADS ---------- */
const bannerAds = [
  "https://images.unsplash.com/photo-1516321318423-f06f85e504b3",
  "https://images.unsplash.com/photo-1509062522246-3755977927d7",
  "https://images.unsplash.com/photo-1551650975-87deedd944c3",
];

/* ---------- ICON + DESCRIPTION MAP ---------- */
const skillMeta = {
  "Classical Dance": { icon: "dance-ballroom", desc: "Learn traditional dance forms" },
  "Western Dance": { icon: "dance-pole", desc: "Modern and freestyle dance styles" },
  "Folk Dance": { icon: "dance-circle", desc: "Cultural and folk traditions" },
  "Zumba / Fitness Dance": { icon: "run", desc: "Fitness through dance" },
  "Freestyle & Choreography Training": { icon: "music-note", desc: "Creative movement training" },

  "Classical Vocal": { icon: "music-clef-treble", desc: "Traditional vocal training" },
  "Western Vocal": { icon: "microphone", desc: "Western singing techniques" },
  "Devotional / Bhajan Singing": { icon: "account-music", desc: "Spiritual vocal practice" },
  "Folk Music Singing": { icon: "music", desc: "Folk music traditions" },
  "Voice Culture & Training": { icon: "account-voice", desc: "Improve voice quality" },

  "Basic Drawing & Sketching": { icon: "pencil", desc: "Drawing fundamentals" },
  "Creative Art & Imagination Drawing": { icon: "lightbulb-outline", desc: "Creative expression" },
  "Thematic & Subject Drawing": { icon: "draw", desc: "Concept-based art" },
  "Professional Art Techniques": { icon: "palette", desc: "Advanced art skills" },
  "Art for School & Hobby": { icon: "school-outline", desc: "Art for students & hobbyists" },

  "Two Wheeler": { icon: "motorbike", desc: "Bike driving skills" },
  "Four Wheeler": { icon: "car", desc: "Car driving training" },
  "Heavy Vehicle": { icon: "truck", desc: "Heavy vehicle driving" },
  "Driving Rules": { icon: "road-variant", desc: "Traffic rules & safety" },
  "Practical Lessons": { icon: "steering", desc: "Hands-on driving practice" },

  "Track Running": { icon: "run-fast", desc: "Speed and endurance training" },
  "Marathon Prep": { icon: "run", desc: "Long-distance running prep" },
  "High Jump": { icon: "arrow-expand-up", desc: "Jumping techniques" },
  "Long Jump": { icon: "arrow-expand-horizontal", desc: "Distance jumping skills" },

  Football: { icon: "soccer", desc: "Football skills training" },
  Cricket: { icon: "cricket", desc: "Cricket coaching" },
  Yoga: { icon: "yoga", desc: "Mind & body wellness" },
  Gym: { icon: "dumbbell", desc: "Strength & fitness training" },
  Swimming: { icon: "swim", desc: "Swimming techniques" },

  Cooking: { icon: "chef-hat", desc: "Cooking fundamentals" },
  Sewing: { icon: "needle", desc: "Stitching & tailoring" },
  "Home Management": { icon: "home-outline", desc: "Household management" },
  "Interior Design": { icon: "floor-plan", desc: "Interior design basics" },

  "Music Production": { icon: "music-box", desc: "Create and mix music" },
  "Creative Writing": { icon: "pencil-outline", desc: "Writing & storytelling" },
  Photography: { icon: "camera", desc: "Photography skills" },
  "Film Making": { icon: "movie-open", desc: "Film creation basics" },
};

export default function Extraskills2() {
  const navigation = useNavigation();
  const route = useRoute();
  const sections = route?.params?.sections || [];

  const bannerRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  /* AUTO SCROLL ADS */
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

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" backgroundColor="#0052A2" />

      {/* ===== HEADER ===== */}
      <View style={styles.headerWrapper}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
            <Ionicons
              name={Platform.OS === "ios" ? "chevron-back" : "arrow-back"}
              size={24}
              color="#fff"
            />
          </TouchableOpacity>

          <Text style={styles.headerTitle}>Extra Skills</Text>
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

        {/* ===== SECTIONS ===== */}
        {sections.map((section, idx) => (
          <View key={idx}>
            {/* Section Header */}
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>{section.title}</Text>
            </View>

            {/* Skill Cards */}
            <View style={styles.cardGrid}>
              {section.items.map((item, i) => {
                const meta = skillMeta[item] || {
                  icon: "book-open-variant",
                  desc: "Explore this skill",
                };

                return (
                  <TouchableOpacity
                    key={i}
                    activeOpacity={0.85}
                    style={styles.card}
                    onPress={() =>
                      navigation.navigate("Extraskills3", { category: item })
                    }
                  >
                    <LinearGradient
                      colors={["#2295D2", "#284598"]}
                      style={styles.iconContainer}
                    >
                      <MaterialCommunityIcons
                        name={meta.icon}
                        size={26}
                        color="#fff"
                      />
                    </LinearGradient>

                    <Text style={styles.cardTitle}>{item}</Text>
                    <Text style={styles.cardDesc}>{meta.desc}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        ))}

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

/* ---------- STYLES (MATCH COURSE2) ---------- */
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

  sectionHeader: {
    backgroundColor: "#CFE5FA",
    margin: 16,
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: "center",
  },
  sectionTitle: {
    fontSize: isTablet ? 22 : 18,
    fontWeight: "700",
    color: "#0B5AA7",
  },

  cardGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingHorizontal: 16,
  },

  card: {
    backgroundColor: "#fff",
    width: isTablet ? "48%" : "47%",
    borderRadius: 14,
    padding: 16,
    marginBottom: 14,
    alignItems: "center",
    elevation: 3,
  },

  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },

  cardTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: "#004780",
    textAlign: "center",
    marginBottom: 6,
  },

  cardDesc: {
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
