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

const bannerAds = [
  "https://images.unsplash.com/photo-1516321318423-f06f85e504b3",
  "https://images.unsplash.com/photo-1509062522246-3755977927d7",
  "https://images.unsplash.com/photo-1551650975-87deedd944c3",
];

const skills = ["Atomic Design", "Prototyping", "User Research", "Auto-layout", "Figma Advanced", "Design Tokens"];
const benefits = ["Eligible for Senior UI/UX Designer roles", "Avg. 30% salary increase post-certification", "Direct access to job placement network"];

export default function Collegecourse4({ navigation }) {
  const { width } = useWindowDimensions();
  const isTablet = width >= 768;
  const isWeb = Platform.OS === 'web';
  const bannerRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [reviews, setReviews] = useState([{ name: "Student", rating: 5, comment: "Very useful course with practical exposure." }]);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => {
        const next = (prev + 1) % bannerAds.length;
        bannerRef.current?.scrollTo({ x: next * width, animated: true });
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
    setReviews([{ name: "Anonymous", rating, comment: reviewText }, ...reviews]);
    setRating(0);
    setReviewText("");
  };

  const openMap = () => Linking.openURL("https://www.google.com/maps/search/?api=1&query=training+institute");
  const callUs = () => Linking.openURL("tel:+919999999999");
  const whatsapp = () => Linking.openURL("https://wa.me/919999999999");

  const renderStars = (count, active, size, onPress) => (
    <View style={{ flexDirection: "row" }}>
      {[1,2,3,4,5].map((i) => (
        <TouchableOpacity key={i} onPress={onPress ? () => onPress(i) : null}>
          <Ionicons name={i <= active ? "star" : "star-outline"} size={size} color="#FFD700" />
        </TouchableOpacity>
      ))}
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}><Ionicons name="arrow-back" size={24} color="#fbfbfb" /></TouchableOpacity>
        <Text style={styles.headerTitle}>Course Details</Text>
        <TouchableOpacity><Ionicons name="share-social-outline" size={22} color="#f2f0f0" /></TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <ScrollView ref={bannerRef} horizontal pagingEnabled showsHorizontalScrollIndicator={false}>
          {bannerAds.map((img, i) => <Image key={i} source={{ uri: img }} style={[styles.bannerImg, { width }]} resizeMode="cover" />)}
        </ScrollView>
        
        <View style={styles.dots}>
          {bannerAds.map((_, i) => <View key={i} style={[styles.dot, activeIndex === i && styles.activeDot]} />)}
        </View>

        <View style={styles.courseCard}>
          <Text style={styles.skillTag}>DESIGN SKILL</Text>
          <Text style={styles.courseTitle}>Advanced UI/UX Design Systems</Text>
          <Text style={styles.courseDept}>Department of Creative Arts</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Skills You Will Gain</Text>
          <View style={styles.chips}>{skills.map((skill, i) => <View key={i} style={styles.chip}><Text style={styles.chipText}>{skill}</Text></View>)}</View>
        </View>

        <View style={styles.infoRow}>
          <View style={styles.infoCard}>
            <Ionicons name="time-outline" size={20} color="#2563EB" />
            <Text style={styles.infoTitle}>Duration</Text>
            <Text style={styles.infoValue}>12 Weeks</Text>
            <Text style={styles.infoSub}>Self-paced Online</Text>
          </View>
          <View style={styles.infoCard}>
            <Ionicons name="shield-checkmark-outline" size={20} color="#2563EB" />
            <Text style={styles.infoTitle}>Eligibility</Text>
            <Text style={styles.infoValue}>Intermediate</Text>
            <Text style={styles.infoSub}>Basic Figma knowledge</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.mapBtn} onPress={openMap}>
          <Ionicons name="location-outline" size={20} color="#f7f8fb" />
          <Text style={styles.mapText}>View on Map</Text>
        </TouchableOpacity>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Career Benefits</Text>
          {benefits.map((item, i) => (
            <View key={i} style={styles.benefitRow}>
              <Ionicons name="checkmark-circle" size={18} color="#16A34A" />
              <Text style={styles.benefitText}>{item}</Text>
            </View>
          ))}
        </View>

        <View style={styles.actionRow}>
          <TouchableOpacity style={styles.callBtn} onPress={callUs}>
            <Ionicons name="call-outline" size={20} color="#edeef2" />
            <Text style={styles.actionText}>Call Us</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.whatsappBtn} onPress={whatsapp}>
            <Ionicons name="logo-whatsapp" size={20} color="#fff" />
            <Text style={styles.whatsappText}>WhatsApp</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Rate & Review</Text>
          <View style={styles.starRow}>{renderStars(5, rating, 28, setRating)}</View>
          <TextInput placeholder="Write your review..." value={reviewText} onChangeText={setReviewText} multiline style={styles.reviewInput} />
          <TouchableOpacity style={styles.reviewBtn} onPress={submitReview}>
            <Ionicons name="send" size={18} color="#fff" />
            <Text style={styles.reviewBtnText}>Submit Review</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          {reviews.map((r, i) => (
            <View key={i} style={styles.reviewCard}>
              <View style={styles.reviewHeader}>
                <Text style={styles.reviewName}>{r.name}</Text>
                {renderStars(5, r.rating, 14)}
              </View>
              <Text style={styles.reviewText}>{r.comment}</Text>
            </View>
          ))}
        </View>

        <View style={styles.videoBox}>
          {isWeb ? (
            <iframe width="100%" height={isTablet ? 260 : 220} src="https://www.youtube.com/embed/NONufn3jgXI" frameBorder="0" allowFullScreen />
          ) : (
            <WebView allowsFullscreenVideo source={{ uri: "https://www.youtube.com/watch?v=NONufn3jgXI" }} style={{ height: isTablet ? 260 : 220 }} />
          )}
        </View>

        <View style={{ height: 120 }} />
      </ScrollView>

      <Footer />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F4F8FF", ...Platform.select({ web: { maxWidth: 1200, alignSelf: 'center', width: '100%' } }) },
  header: {
    flexDirection: "row", justifyContent: "space-between", padding: 16, backgroundColor: "#0052A2",
    ...Platform.select({ ios: { paddingTop: 50 }, android: { paddingTop: 10 }, web: { padding: 20 } })
  },
  headerTitle: { fontSize: 18, fontWeight: "700", color: "white", ...Platform.select({ tablet: { fontSize: 22 }, web: { fontSize: 24 } }) },
  bannerImg: { height: Platform.select({ tablet: 300, default: 180 }) },
  dots: { flexDirection: "row", justifyContent: "center", marginVertical: 8 },
  dot: { width: 8, height: 8, borderRadius: 4, backgroundColor: "#ccc", marginHorizontal: 4 },
  activeDot: { width: 16, backgroundColor: "#2563EB" },
  courseCard: {
    backgroundColor: "#4c73ac", margin: 16, borderRadius: 18, padding: 16,
    ...Platform.select({ tablet: { margin: 24, padding: 20 }, web: { marginHorizontal: 'auto', maxWidth: 800 } })
  },
  skillTag: { color: "#DCE8FF", fontSize: 12, fontWeight: "700", ...Platform.select({ tablet: { fontSize: 14 } }) },
  courseTitle: { color: "#fff", fontSize: 20, fontWeight: "800", marginTop: 6, ...Platform.select({ tablet: { fontSize: 28 }, web: { fontSize: 32 } }) },
  courseDept: { color: "#DCE8FF", fontSize: 12, marginTop: 4, ...Platform.select({ tablet: { fontSize: 14 } }) },
  section: {
    paddingHorizontal: 16, marginTop: 20,
    ...Platform.select({ tablet: { paddingHorizontal: 24 }, web: { paddingHorizontal: 0, marginHorizontal: 16 } })
  },
  sectionTitle: { fontSize: 16, fontWeight: "700", marginBottom: 10, ...Platform.select({ tablet: { fontSize: 20 }, web: { fontSize: 22 } }) },
  chips: { flexDirection: "row", flexWrap: "wrap" },
  chip: {
    backgroundColor: "#EAF2FF", paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20, marginRight: 8, marginBottom: 8,
    ...Platform.select({ tablet: { paddingHorizontal: 16, paddingVertical: 8 } })
  },
  chipText: { color: "#2563EB", fontSize: 12, ...Platform.select({ tablet: { fontSize: 14 } }) },
  infoRow: {
    flexDirection: "row", justifyContent: "space-between", paddingHorizontal: 16, marginTop: 20,
    ...Platform.select({ web: { maxWidth: 800, alignSelf: 'center', width: '100%' } })
  },
  infoCard: {
    backgroundColor: "#fff", width: "48%", borderRadius: 16, padding: 14, elevation: 3,
    shadowColor: "#000", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4,
    ...Platform.select({ ios: { shadowOpacity: 0.1 }, android: { elevation: 3 }, web: { boxShadow: '0 2px 4px rgba(0,0,0,0.1)' } })
  },
  infoTitle: { fontSize: 14, fontWeight: '600', marginTop: 8, color: '#374151' },
  infoValue: { fontSize: 16, fontWeight: '700', marginTop: 4, color: '#1F2937' },
  infoSub: { fontSize: 12, marginTop: 2, color: '#6B7280' },
  mapBtn: { flexDirection: "row", alignSelf: "center", backgroundColor: "#0052A2", paddingHorizontal: 24, paddingVertical: 15, borderRadius: 14, marginTop: 20 },
  mapText: { color: "#fff", fontWeight: "700", marginLeft: 8 },
  benefitRow: { flexDirection: "row", alignItems: "center", marginBottom: 10 },
  benefitText: { marginLeft: 8, fontSize: 13, ...Platform.select({ tablet: { fontSize: 15 } }) },
  actionRow: {
    flexDirection: "row", justifyContent: "space-between", paddingHorizontal: 16, marginTop: 20,
    ...Platform.select({ web: { maxWidth: 800, alignSelf: 'center', width: '100%' } })
  },
  callBtn: { backgroundColor: "#c25c5c", width: "48%", borderRadius: 14, padding: 14, flexDirection: "row", justifyContent: "center" },
  whatsappBtn: { backgroundColor: "#25D366", width: "48%", borderRadius: 14, padding: 14, flexDirection: "row", justifyContent: "center" },
  actionText: { color: "#fff", fontWeight: "700", marginLeft: 6 },
  whatsappText: { color: "#fff", fontWeight: "700", marginLeft: 6 },
  starRow: { flexDirection: "row", marginBottom: 10 },
  reviewInput: {
    backgroundColor: "#fff", borderRadius: 12, padding: 12, minHeight: 80, marginBottom: 10, borderWidth: 1, borderColor: '#E5E7EB',
    ...Platform.select({ web: { outlineStyle: 'none' } })
  },
  reviewBtn: { backgroundColor: "#2563EB", paddingVertical: 12, borderRadius: 30, flexDirection: "row", justifyContent: "center", alignItems: "center" },
  reviewBtnText: { color: "#fff", fontWeight: "700", marginLeft: 6 },
  reviewCard: { backgroundColor: "#fff", borderRadius: 14, padding: 12, marginBottom: 10, borderWidth: 1, borderColor: '#F3F4F6' },
  reviewHeader: { flexDirection: "row", justifyContent: "space-between", marginBottom: 6 },
  reviewName: { fontSize: 14, fontWeight: "700", color: "#1E3A8A" },
  reviewText: { fontSize: 13, color: "#4B5563" },
  videoBox: {
    marginHorizontal: 16, marginTop: 30, borderRadius: 12, overflow: "hidden", backgroundColor: "#000",height:300,
    ...Platform.select({ tablet: { marginHorizontal: 24 }, web: { maxWidth: 800, alignSelf: 'center', width: '100%' } })
  },
});