import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  Linking,
  useWindowDimensions,
  Platform,
  TextInput,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import { WebView } from "react-native-webview";
import Footer from "../../src/components/Footer";

/* ===== TOP ADS ===== */
const ads = [
  "https://images.unsplash.com/photo-1516321318423-f06f85e504b3",
  "https://images.unsplash.com/photo-1509062522246-3755977927d7",
  "https://images.unsplash.com/photo-1551650975-87deedd944c3",
];

export default function School3() {
  const navigation = useNavigation();
  const route = useRoute();
  const school = route.params?.school;

  const { width } = useWindowDimensions();
  const isTablet = width >= 768;

  const adRef = useRef(null);
  const [activeAd, setActiveAd] = useState(0);

  /* ===== REVIEW STATES (ADDED) ===== */
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [reviews, setReviews] = useState([
    {
      name: "Arun Kumar",
      rating: 5,
      comment: "Very good school with disciplined environment.",
    },
  ]);

  /* AUTO SCROLL ADS */
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveAd((prev) => {
        const next = (prev + 1) % ads.length;
        adRef.current?.scrollTo({ x: next * width, animated: true });
        return next;
      });
    }, 3000);
    return () => clearInterval(timer);
  }, [width]);

  /* ACTIONS */
  const openMap = () =>
    Linking.openURL(
      "https://www.google.com/maps/search/?api=1&query=" +
        encodeURIComponent(school?.name || "School")
    );

  const callNow = () => Linking.openURL("tel:9876543210");
  const openWhatsApp = () =>
    Linking.openURL("https://wa.me/919876543210");

  /* SUBMIT REVIEW */
  const submitReview = () => {
    if (rating === 0 || reviewText.trim() === "") {
      Alert.alert("Incomplete", "Please give rating and write review");
      return;
    }

    const newReview = {
      name: "Anonymous User",
      rating,
      comment: reviewText,
    };

    setReviews([newReview, ...reviews]);
    setRating(0);
    setReviewText("");
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* ===== HEADER ===== */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons
            name={Platform.OS === "ios" ? "chevron-back" : "arrow-back"}
            size={24}
            color="#fff"
          />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>School Details</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* ===== TOP ADS ===== */}
        <ScrollView
          ref={adRef}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onMomentumScrollEnd={(e) =>
            setActiveAd(Math.round(e.nativeEvent.contentOffset.x / width))
          }
        >
          {ads.map((img, i) => (
            <Image
              key={i}
              source={{ uri: img }}
              style={{ width, height: isTablet ? 160 : 180 }}
            />
          ))}
        </ScrollView>

        {/* DOTS */}
        <View style={styles.dots}>
          {ads.map((_, i) => (
            <View
              key={i}
              style={[styles.dot, activeAd === i && styles.activeDot]}
            />
          ))}
        </View>

        {/* ===== HERO CARD ===== */}
        <View style={styles.heroCard}>
          <Text style={styles.schoolName}>
            {school?.name || "Josephs Matric HR Sec School"}
          </Text>

          <Text style={styles.tagline}>
            Quality Education · Discipline · Excellence
          </Text>

          <View style={styles.infoRow}>
            <Ionicons name="school-outline" size={16} color="#E8F0FF" />
            <Text style={styles.infoText}>
              LKG – Class 12 · All Boards
            </Text>
          </View>

          <View style={styles.infoRow}>
            <Ionicons
              name="location-outline"
              size={16}
              color="#E8F0FF"
            />
            <Text style={styles.infoText}>
              Colachel, Tamil Nadu
            </Text>
          </View>
        </View>

        {/* ===== CLASSES OFFERED ===== */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Classes Offered</Text>
          <View style={styles.chips}>
            <Text style={styles.chip}>Primary</Text>
            <Text style={styles.chip}>Middle School</Text>
            <Text style={styles.chip}>High School</Text>
            <Text style={styles.chip}>Higher Secondary</Text>
          </View>
        </View>

        {/* ===== TEACHING MODE ===== */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Teaching Mode</Text>

          <View style={styles.modeRow}>
            <View style={styles.modeCard}>
              <Ionicons name="business-outline" size={22} color="#0B5ED7" />
              <Text style={styles.modeTitle}>Offline</Text>
              <Text style={styles.modeSub}>Classroom learning</Text>
            </View>

            <View style={styles.modeCard}>
              <Ionicons name="videocam-outline" size={22} color="#0B5ED7" />
              <Text style={styles.modeTitle}>Smart Classes</Text>
              <Text style={styles.modeSub}>Digital learning support</Text>
            </View>
          </View>
        </View>

        {/* ===== VIEW MAP ===== */}
        <TouchableOpacity style={styles.mapButton} onPress={openMap}>
          <Ionicons name="map-outline" size={18} color="#fff" />
          <Text style={styles.mapText}>View on Map</Text>
        </TouchableOpacity>

        {/* ===== ABOUT SCHOOL ===== */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>About School</Text>
          <Text style={styles.aboutText}>
            The school has a private building with well-equipped classrooms,
            library, playground, computer facilities, and a nurturing academic
            environment that promotes holistic student development.
          </Text>
        </View>

        {/* ===== CALL & WHATSAPP ===== */}
        <View style={styles.actionRow}>
          <TouchableOpacity style={styles.callBtn} onPress={callNow}>
            <Ionicons name="call" size={18} color="#fff" />
            <Text style={styles.actionText}>Call</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.whatsappBtn} onPress={openWhatsApp}>
            <Ionicons name="logo-whatsapp" size={18} color="#fff" />
            <Text style={styles.actionText}>WhatsApp</Text>
          </TouchableOpacity>
        </View>

        {/* ===== RATE & REVIEW (ADDED) ===== */}
        <View style={styles.sectionCard}>
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
            multiline
            value={reviewText}
            onChangeText={setReviewText}
            style={styles.reviewInput}
          />

          <TouchableOpacity style={styles.reviewBtn} onPress={submitReview}>
            <Ionicons name="send" size={18} color="#fff" />
            <Text style={styles.reviewBtnText}>Submit Review</Text>
          </TouchableOpacity>
        </View>

        {/* ===== REVIEWS LIST ===== */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>User Reviews</Text>

          {reviews.map((r, i) => (
            <View key={i} style={styles.reviewBox}>
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
            source={{ uri: "https://www.youtube.com/watch?v=NONufn3jgXI" }}
            style={{ height: isTablet ? 260 : 240 }}
          />
        </View>

        <View style={{ height: 120 }} />
      </ScrollView>

      <Footer />
    </SafeAreaView>
  );
}

/* ================= STYLES ================= */
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F6F9FF" },

  header: {
    backgroundColor: "#0052A2",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
  },

  headerTitle: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "700",
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

  heroCard: {
    backgroundColor: "#4c73ac",
    margin: 16,
    borderRadius: 18,
    padding: 16,
  },

  schoolName: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "800",
  },

  tagline: {
    color: "#DCE8FF",
    fontSize: 12,
    marginTop: 4,
    marginBottom: 10,
  },

  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 6,
  },

  infoText: {
    color: "#E8F0FF",
    fontSize: 12,
    marginLeft: 6,
  },

  sectionCard: {
    backgroundColor: "#fff",
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 16,
    padding: 16,
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 10,
  },

  chips: { flexDirection: "row", flexWrap: "wrap" },

  chip: {
    backgroundColor: "#E8F0FF",
    color: "#0B5ED7",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 10,
    fontSize: 12,
    marginRight: 8,
    marginBottom: 8,
  },

  modeRow: { flexDirection: "row", justifyContent: "space-between" },

  modeCard: {
    width: "48%",
    backgroundColor: "#F8FAFF",
    borderRadius: 14,
    padding: 14,
    alignItems: "center",
  },

  modeTitle: { marginTop: 6, fontSize: 14, fontWeight: "700" },
  modeSub: { fontSize: 11, color: "#5F6F81", marginTop: 2 },

  mapButton: {
    margin: 16,
    backgroundColor: "#0B5ED7",
    paddingVertical: 14,
    borderRadius: 30,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },

  mapText: { color: "#fff", fontWeight: "700", marginLeft: 8 },

  aboutText: { fontSize: 13, color: "#5F6F81", lineHeight: 20 },

  actionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 16,
    marginTop: 16,
  },

  callBtn: {
    backgroundColor: "#e51515ee",
    flex: 1,
    marginRight: 8,
    paddingVertical: 14,
    borderRadius: 14,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },

  whatsappBtn: {
    backgroundColor: "#25D366",
    flex: 1,
    marginLeft: 8,
    paddingVertical: 14,
    borderRadius: 14,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },

  actionText: { color: "#fff", fontWeight: "700", marginLeft: 6 },

  starRow: { flexDirection: "row", marginBottom: 10 },

  reviewInput: {
    backgroundColor: "#F8FAFF",
    borderRadius: 10,
    padding: 12,
    minHeight: 80,
    textAlignVertical: "top",
    marginBottom: 10,
  },

  reviewBtn: {
    backgroundColor: "#0B5ED7",
    paddingVertical: 12,
    borderRadius: 30,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },

  reviewBtnText: {
    color: "#fff",
    fontWeight: "700",
    marginLeft: 6,
  },

  reviewBox: {
    backgroundColor: "#F8FAFF",
    borderRadius: 12,
    padding: 12,
    marginBottom: 10,
  },

  reviewHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 6,
  },

  reviewName: {
    fontSize: 14,
    fontWeight: "700",
    color: "#004780",
  },

  reviewText: {
    fontSize: 13,
    color: "#5F6F81",
    lineHeight: 18,
  },

  videoBox: {
    margin: 2,
    marginTop: 32,
    overflow: "hidden",
    backgroundColor: "#000",
  },
});
