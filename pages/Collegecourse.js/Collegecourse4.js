import React, { useRef, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  useWindowDimensions,
  Platform,
  Linking,
  TextInput,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { WebView } from "react-native-webview";
import Footer from "../../src/components/Footer";

/* ---------------- BANNER ADS ---------------- */
const bannerAds = [
  "https://images.unsplash.com/photo-1516321318423-f06f85e504b3",
  "https://images.unsplash.com/photo-1509062522246-3755977927d7",
  "https://images.unsplash.com/photo-1551650975-87deedd944c3",
];

export default function Collegecourse4({ navigation }) {
  const { width } = useWindowDimensions();
  const isTablet = width >= 768;

  const bannerRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  /* -------- REVIEW STATES -------- */
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [reviews, setReviews] = useState([
    {
      name: "Student",
      rating: 5,
      comment: "Very useful course with practical exposure.",
    },
  ]);

  /* AUTO SCROLL BANNER */
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => {
        const next = (prev + 1) % bannerAds.length;
        bannerRef.current?.scrollTo({
          x: next * width,
          animated: true,
        });
        return next;
      });
    }, 3000);

    return () => clearInterval(timer);
  }, [width]);

  const submitReview = () => {
    if (rating === 0 || reviewText.trim() === "") {
      Alert.alert("Incomplete", "Please give rating and write review");
      return;
    }

    setReviews([
      { name: "Anonymous", rating, comment: reviewText },
      ...reviews,
    ]);

    setRating(0);
    setReviewText("");
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#fbfbfb" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Course Details</Text>

        <TouchableOpacity>
          <Ionicons name="share-social-outline" size={22} color="#f2f0f0" />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* ===== AUTO SCROLL ADS ===== */}
        <ScrollView
          ref={bannerRef}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
        >
          {bannerAds.map((img, index) => (
            <Image
              key={index}
              source={{ uri: img }}
              style={{ width, height: isTablet ? 150 : 180 }}
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

        {/* ===== COURSE CARD ===== */}
        <View style={styles.courseCard}>
          <Text style={styles.skillTag}>DESIGN SKILL</Text>
          <Text style={styles.courseTitle}>
            Advanced UI/UX Design Systems
          </Text>
          <Text style={styles.courseDept}>
            Department of Creative Arts
          </Text>
        </View>

        {/* ===== SKILLS ===== */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Skills You Will Gain</Text>
          <View style={styles.chips}>
            {[
              "Atomic Design",
              "Prototyping",
              "User Research",
              "Auto-layout",
              "Figma Advanced",
              "Design Tokens",
            ].map((skill, i) => (
              <View key={i} style={styles.chip}>
                <Text style={styles.chipText}>{skill}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* ===== INFO CARDS ===== */}
        <View style={styles.infoRow}>
          <View style={styles.infoCard}>
            <Ionicons name="time-outline" size={20} color="#2563EB" />
            <Text style={styles.infoTitle}>Duration</Text>
            <Text style={styles.infoValue}>12 Weeks</Text>
            <Text style={styles.infoSub}>Self-paced Online</Text>
          </View>

          <View style={styles.infoCard}>
            <Ionicons
              name="shield-checkmark-outline"
              size={20}
              color="#2563EB"
            />
            <Text style={styles.infoTitle}>Eligibility</Text>
            <Text style={styles.infoValue}>Intermediate</Text>
            <Text style={styles.infoSub}>
              Basic Figma knowledge
            </Text>
          </View>
        </View>

        {/* ===== MAP ===== */}
        <TouchableOpacity
          style={styles.mapBtn}
          onPress={() =>
            Linking.openURL(
              "https://www.google.com/maps/search/?api=1&query=training+institute"
            )
          }
        >
          <Ionicons name="location-outline" size={20} color="#f7f8fb" />
          <Text style={styles.mapText}>View on Map</Text>
        </TouchableOpacity>

        {/* ===== CAREER BENEFITS ===== */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Career Benefits</Text>

          {[
            "Eligible for Senior UI/UX Designer roles",
            "Avg. 30% salary increase post-certification",
            "Direct access to job placement network",
          ].map((item, i) => (
            <View key={i} style={styles.benefitRow}>
              <Ionicons
                name="checkmark-circle"
                size={18}
                color="#16A34A"
              />
              <Text style={styles.benefitText}>{item}</Text>
            </View>
          ))}
        </View>

        {/* ===== CALL & WHATSAPP ===== */}
        <View style={styles.actionRow}>
          <TouchableOpacity
            style={styles.callBtn}
            onPress={() => Linking.openURL("tel:+919999999999")}
          >
            <Ionicons name="call-outline" size={20} color="#edeef2" />
            <Text style={styles.actionText}>Call Us</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.whatsappBtn}
            onPress={() =>
              Linking.openURL("https://wa.me/919999999999")
            }
          >
            <Ionicons name="logo-whatsapp" size={20} color="#fff" />
            <Text style={styles.whatsappText}>WhatsApp</Text>
          </TouchableOpacity>
        </View>

        {/* ===== RATE & REVIEW ===== */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Rate & Review</Text>

          <View style={styles.starRow}>
            {[1, 2, 3, 4, 5].map((i) => (
              <TouchableOpacity key={i} onPress={() => setRating(i)}>
                <Ionicons
                  name={i <= rating ? "star" : "star-outline"}
                  size={28}
                  color="#FFD700"
                />
              </TouchableOpacity>
            ))}
          </View>

          <TextInput
            placeholder="Write your review..."
            value={reviewText}
            onChangeText={setReviewText}
            multiline
            style={styles.reviewInput}
          />

          <TouchableOpacity
            style={styles.reviewBtn}
            onPress={submitReview}
          >
            <Ionicons name="send" size={18} color="#fff" />
            <Text style={styles.reviewBtnText}>
              Submit Review
            </Text>
          </TouchableOpacity>
        </View>

        {/* ===== REVIEWS LIST ===== */}
        <View style={styles.section}>
          {reviews.map((r, i) => (
            <View key={i} style={styles.reviewCard}>
              <View style={styles.reviewHeader}>
                <Text style={styles.reviewName}>{r.name}</Text>
                <View style={{ flexDirection: "row" }}>
                  {[1, 2, 3, 4, 5].map((x) => (
                    <Ionicons
                      key={x}
                      name={x <= r.rating ? "star" : "star-outline"}
                      size={14}
                      color="#FFD700"
                    />
                  ))}
                </View>
              </View>
              <Text style={styles.reviewText}>{r.comment}</Text>
            </View>
          ))}
        </View>

        {/* ===== VIDEO ===== */}
        <View style={styles.videoBox}>
          <WebView
            allowsFullscreenVideo
            source={{
              uri: "https://www.youtube.com/watch?v=NONufn3jgXI",
            }}
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
  container: { flex: 1, backgroundColor: "#F4F8FF" },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 16,
    backgroundColor: "#0052A2",
  },
  headerTitle: { fontSize: 18, fontWeight: "700", color: "white" },
  dots: { flexDirection: "row", justifyContent: "center", marginVertical: 8 },
  dot: { width: 8, height: 8, borderRadius: 4, backgroundColor: "#ccc", marginHorizontal: 4 },
  activeDot: { width: 16, backgroundColor: "#2563EB" },

  courseCard: { backgroundColor: "#4c73ac", margin: 16, borderRadius: 18, padding: 16 },
  skillTag: { color: "#DCE8FF", fontSize: 12, fontWeight: "700" },
  courseTitle: { color: "#fff", fontSize: 20, fontWeight: "800", marginTop: 6 },
  courseDept: { color: "#DCE8FF", fontSize: 12, marginTop: 4 },

  section: { paddingHorizontal: 16, marginTop: 20 },
  sectionTitle: { fontSize: 16, fontWeight: "700", marginBottom: 10 },

  chips: { flexDirection: "row", flexWrap: "wrap" },
  chip: { backgroundColor: "#EAF2FF", paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20, marginRight: 8, marginBottom: 8 },
  chipText: { color: "#2563EB", fontSize: 12 },

  infoRow: { flexDirection: "row", justifyContent: "space-between", paddingHorizontal: 16, marginTop: 20 },
  infoCard: { backgroundColor: "#fff", width: "48%", borderRadius: 16, padding: 14, elevation: 3 },

  mapBtn: { flexDirection: "row", alignSelf: "center", backgroundColor: "#0052A2", paddingHorizontal: 24, paddingVertical: 15, borderRadius: 14, marginTop: 20 },
  mapText: { color: "#fff", fontWeight: "700", marginLeft: 8 },

  benefitRow: { flexDirection: "row", alignItems: "center", marginBottom: 10 },
  benefitText: { marginLeft: 8, fontSize: 13 },

  actionRow: { flexDirection: "row", justifyContent: "space-between", paddingHorizontal: 16, marginTop: 20 },
  callBtn: { backgroundColor: "#c25c5c", width: "48%", borderRadius: 14, padding: 14, flexDirection: "row", justifyContent: "center" },
  whatsappBtn: { backgroundColor: "#25D366", width: "48%", borderRadius: 14, padding: 14, flexDirection: "row", justifyContent: "center" },

  actionText: { color: "#fff", fontWeight: "700", marginLeft: 6 },
  whatsappText: { color: "#fff", fontWeight: "700", marginLeft: 6 },

  starRow: { flexDirection: "row", marginBottom: 10 },
  reviewInput: { backgroundColor: "#fff", borderRadius: 12, padding: 12, minHeight: 80, marginBottom: 10 },
  reviewBtn: { backgroundColor: "#2563EB", paddingVertical: 12, borderRadius: 30, flexDirection: "row", justifyContent: "center", alignItems: "center" },
  reviewBtnText: { color: "#fff", fontWeight: "700", marginLeft: 6 },

  reviewCard: { backgroundColor: "#fff", borderRadius: 14, padding: 12, marginBottom: 10 },
  reviewHeader: { flexDirection: "row", justifyContent: "space-between", marginBottom: 6 },
  reviewName: { fontSize: 14, fontWeight: "700", color: "#1E3A8A" },
  reviewText: { fontSize: 13, color: "#4B5563" },

  videoBox: { marginHorizontal: 16, marginTop: 30, borderRadius: 12, overflow: "hidden", backgroundColor: "#000" },
});
