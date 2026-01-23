import React, { useRef, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Linking,
  SafeAreaView,
  Platform,
  Dimensions,
  StatusBar,
} from "react-native";
import { Ionicons, FontAwesome, Feather } from "@expo/vector-icons";
import { WebView } from "react-native-webview";
import Footer from "../../src/components/Footer";

const { width } = Dimensions.get("window");
const isTablet = width >= 768;

const STUDIO_LOGO = require("../../assets/AKlogo.png");

/* ---------- BANNER ADS ---------- */
const bannerAds = [
  "https://images.unsplash.com/photo-1516321318423-f06f85e504b3",
  "https://images.unsplash.com/photo-1509062522246-3755977927d7",
  "https://images.unsplash.com/photo-1551650975-87deedd944c3",
];

export default function Course4({ navigation }) {
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

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" backgroundColor="#0052A2" />

      {/* ---------- HEADER ---------- */}
      <View style={styles.headerWrapper}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
            <Ionicons
              name={Platform.OS === "ios" ? "chevron-back" : "arrow-back"}
              size={24}
              color="#fff"
            />
          </TouchableOpacity>

          <Text style={styles.headerTitle}>About Courses</Text>
          <View style={styles.rightSpace} />
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
            <View key={i} style={[styles.dot, activeIndex === i && styles.activeDot]} />
          ))}
        </View>

        {/* ---------- BODY ---------- */}
        <View style={styles.container}>
          <View style={styles.logoBox}>
            <Image source={STUDIO_LOGO} style={styles.logo} />
          </View>

          <Text style={styles.title}>AK Technologies</Text>

          <Text style={styles.description}>
            Founded in 2015, AK Technologies focuses on IT training and placement support.
            The institute offers technical courses including Python, Machine Learning,
            and live project training for engineering students.
          </Text>

          <Text style={styles.subHeading}>Courses Offered:</Text>
          <Text style={styles.list}>• Web Development</Text>
          <Text style={styles.list}>• Full Stack Development</Text>
          <Text style={styles.list}>• Python</Text>
          <Text style={styles.list}>• Data Science</Text>

          <Text style={styles.subHeading}>Mode:</Text>
          <Text style={styles.list}>Online & Offline</Text>

          <Text style={styles.subHeading}>Benefits:</Text>
          <Text style={styles.list}>• Career growth</Text>
          <Text style={styles.list}>• Industry-ready skills</Text>
          <Text style={styles.list}>• Flexible learning</Text>

          <Text style={styles.subHeading}>Website:</Text>
          <Text style={styles.list}>www.ak.com</Text>
        </View>

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

      {/* ---------- FOOTER ACTIONS ---------- */}
      <View style={styles.footerActions}>
        <TouchableOpacity
          style={styles.footerBtn}
          onPress={() => Linking.openURL("https://wa.me/919384152923")}
        >
          <FontAwesome name="whatsapp" size={22} color="#fff" />
          <Text style={styles.footerText}>Whatsapp</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.footerBtn}
          onPress={() => Linking.openURL("tel:919384152923")}
        >
          <Feather name="phone-call" size={22} color="#fff" />
          <Text style={styles.footerText}>Call</Text>
        </TouchableOpacity>
      </View>

      <Footer />
    </SafeAreaView>
  );
}

/* ---------- STYLES ---------- */
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
  rightSpace: { width: 40 },

  dots: { flexDirection: "row", justifyContent: "center", marginVertical: 8 },
  dot: { width: 8, height: 8, borderRadius: 4, backgroundColor: "#ccc", marginHorizontal: 4 },
  activeDot: { width: 16, backgroundColor: "#0B5ED7" },

  container: {
    paddingHorizontal: isTablet ? 32 : 16,
    paddingBottom: 30,
    backgroundColor: "#FAFAFA",
  },

  logoBox: {
    alignSelf: "center",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginTop: 16,
    elevation: 3,
  },
  logo: { width: 100, height: 70, resizeMode: "contain" },

  title: {
    fontSize: isTablet ? 20 : 16,
    fontWeight: "bold",
    color: "#004780",
    textAlign: "center",
    marginTop: 12,
  },

  description: { fontSize: 14, color: "#333", marginTop: 12, textAlign: "justify" },
  subHeading: { fontSize: 18, fontWeight: "bold", color: "#004780", marginTop: 16 },
  list: { fontSize: 14, color: "#444", marginLeft: 10, marginTop: 4 },

  videoBox: {
    marginHorizontal: 16,
    marginTop: 30,
    borderRadius: 12,
    overflow: "hidden",
    backgroundColor: "#000",
  },

  footerActions: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 12,
    backgroundColor: "#fff",
  },
  footerBtn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#005AA1",
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 8,
  },
  footerText: { color: "#fff", marginLeft: 8, fontWeight: "600" },
});
