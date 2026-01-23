import React, { useRef, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Platform,
  StatusBar,
  SafeAreaView,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import { WebView } from "react-native-webview";
import Footer from "../../src/components/Footer";

const { width } = Dimensions.get("window");
const isTablet = width >= 768;

/* ===== AD BANNERS (SAME AS TUTION2) ===== */
const bannerAds = [
  "https://images.unsplash.com/photo-1516321318423-f06f85e504b3",
  "https://images.unsplash.com/photo-1509062522246-3755977927d7",
  "https://images.unsplash.com/photo-1551650975-87deedd944c3",
];

export default function School3() {
  const navigation = useNavigation();
  const route = useRoute();
  const school = route.params?.school;

  const bannerRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

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
  }, []);

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" backgroundColor="#0052A2" />

      {/* ===== HEADER ===== */}
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

          <Text style={styles.headerTitle}>About School</Text>
          <View style={styles.rightSpace} />
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* ===== TOP AUTO-SCROLL AD BANNER ===== */}
        <ScrollView
          ref={bannerRef}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onMomentumScrollEnd={(e) =>
            setActiveIndex(Math.round(e.nativeEvent.contentOffset.x / width))
          }
        >
          {bannerAds.map((img, index) => (
            <Image
              key={index}
              source={{ uri: img }}
              style={{
                width,
                height: isTablet ? 150 : 180,
              }}
              resizeMode="cover"
            />
          ))}
        </ScrollView>

        {/* DOT INDICATORS */}
        <View style={styles.dots}>
          {bannerAds.map((_, i) => (
            <View
              key={i}
              style={[
                styles.dot,
                activeIndex === i && styles.activeDot,
              ]}
            />
          ))}
        </View>

        {/* ===== BODY CONTENT ===== */}
        <View style={styles.container}>
          {/* School Image */}
          <View style={styles.imageContainer}>
            <Image
              source={school?.image || require("../../assets/school.png")}
              style={styles.schoolImage}
            />
          </View>

          {/* School Name */}
          <Text style={styles.schoolName}>
            {school?.name || "Josephs Matric HR Sec School"}
          </Text>

          {/* Description */}
          <Text style={styles.description}>
            The school has a private building with 24 classrooms, library,
            playground, safe drinking water, computer facilities, and a nurturing
            academic environment for students.
          </Text>

          {/* Photos */}
          <Text style={styles.sectionTitle}>Photos</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <Image
              source={require("../../assets/school1.png")}
              style={styles.photo}
            />
            <Image
              source={require("../../assets/school2.png")}
              style={styles.photo}
            />
            <Image
              source={require("../../assets/school3.png")}
              style={styles.photo}
            />
          </ScrollView>

          {/* Vision */}
          <Text style={styles.sectionTitle}>Our Vision</Text>
          <Text style={styles.text}>
            To empower students with confidence, discipline, and lifelong
            learning skills to face the future.
          </Text>

          {/* Mission */}
          <Text style={styles.sectionTitle}>Our Mission</Text>
          <Text style={styles.text}>
            We aim to deliver quality education through academic excellence,
            creativity, innovation, and strong moral values.
          </Text>

          {/* About */}
          <Text style={styles.sectionTitle}>About</Text>
          <View style={styles.aboutContainer}>
            <Image
              source={require("../../assets/school1.png")}
              style={styles.aboutImage}
            />
            <Text style={styles.aboutText}>
              With more than 15 years of excellence in education, the institution
              stands among the most trusted schools in Tamil Nadu.
            </Text>
          </View>

          {/* Contact */}
          <Text style={styles.sectionTitle}>Contact</Text>
          <View style={styles.contactRow}>
            <Image
              source={require("../../assets/map.png")}
              style={styles.mapImage}
            />
            <Text style={styles.contactText}>
              Colachel, Kanyakumari{"\n"}
              Tamil Nadu – 629251{"\n"}
              Mobile: +91 XXXXX-XXXXX{"\n"}
              Email: xxx@xxxxxx
            </Text>
          </View>
        </View>

        {/* ===== VIDEO AD (SAME AS TUTION2) ===== */}
        <View style={styles.videoBox}>
          <WebView
            allowsFullscreenVideo
            source={{
              uri: "https://www.youtube.com/watch?v=NONufn3jgXI",
            }}
            style={{
              height: isTablet ? 260 : 220,
              width: "100%",
            }}
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
  safe: { flex: 1, backgroundColor: "#fff" },

  headerWrapper: { backgroundColor: "#0052A2" },

  header: {
    height: Platform.OS === "ios" ? 52 : 64,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
  },

  backBtn: { width: 40 },
  rightSpace: { width: 40 },

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

  container: {
    padding: 16,
  },

  imageContainer: { alignItems: "center", marginVertical: 12 },

  schoolImage: {
    width: isTablet ? 150 : 100,
    height: isTablet ? 150 : 100,
    resizeMode: "contain",
  },

  schoolName: {
    textAlign: "center",
    fontSize: isTablet ? 18 : 15,
    fontWeight: "bold",
    color: "#003366",
    marginBottom: 12,
  },

  sectionTitle: {
    fontSize: isTablet ? 18 : 15,
    fontWeight: "bold",
    color: "#003366",
    marginVertical: 8,
  },

  description: {
    fontSize: isTablet ? 16 : 14,
    lineHeight: 22,
    textAlign: "justify",
    marginBottom: 16,
    color: "#333",
  },

  text: {
    fontSize: isTablet ? 16 : 14,
    lineHeight: 22,
    textAlign: "justify",
    marginBottom: 12,
    color: "#333",
  },

  photo: {
    width: isTablet ? 120 : 80,
    height: isTablet ? 120 : 80,
    borderRadius: 6,
    marginRight: 10,
    resizeMode: "cover",
  },

  aboutContainer: {
    flexDirection: "row",
    marginBottom: 16,
  },

  aboutImage: {
    width: isTablet ? 140 : 100,
    height: isTablet ? 140 : 100,
    borderRadius: 6,
    marginRight: 10,
  },

  aboutText: {     
    flex: 1,
    fontSize: isTablet ? 16 : 14,
    lineHeight: 22,
    textAlign: "justify",
    color: "#333",
  },

  contactRow: { flexDirection: "row", marginBottom: 20 },

  mapImage: { width: 100, height: 100, marginRight: 10 },

  contactText: {
    fontSize: isTablet ? 16 : 14,
    lineHeight: 22,
    color: "#333",
  },

  videoBox: {
    marginHorizontal: 16,
    marginTop: 30,
    borderRadius: 12,
    overflow: "hidden",
    backgroundColor: "#000",
  },
});
