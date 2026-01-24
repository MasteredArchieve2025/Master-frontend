import React, { useEffect, useRef, useState } from "react";
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
  StatusBar,
  useWindowDimensions,
} from "react-native";
import { FontAwesome, Feather, Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { WebView } from "react-native-webview";
import Footer from "../../src/components/Footer";

const STUDIO_LOGO = require("../../assets/DanceStudio.png");

/* ===== AD BANNERS ===== */
const ads = [
  "https://images.unsplash.com/photo-1516321318423-f06f85e504b3",
  "https://images.unsplash.com/photo-1509062522246-3755977927d7",
  "https://images.unsplash.com/photo-1551650975-87deedd944c3",
];

/* ===== GALLERY ===== */
const galleryImages = [
  require("../../assets/ExSkGallery.png"),
  require("../../assets/ExSkGallery2.png"),
  require("../../assets/ExSkGallery.png"),
  require("../../assets/ExSkGallery2.png"),
];

export default function Extraskills4() {
  const navigation = useNavigation();
  const { width } = useWindowDimensions();
  const isTablet = width >= 768;

  const adRef = useRef(null);
  const [activeAd, setActiveAd] = useState(0);

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

  const handleWhatsApp = () =>
    Linking.openURL("whatsapp://send?text=Hello&phone=+123456789");

  const handleCall = () =>
    Linking.openURL("tel:+123456789");

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0052A2" />

      {/* ===== HEADER ===== */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons
            name={Platform.OS === "ios" ? "chevron-back" : "arrow-back"}
            size={24}
            color="#fff"
          />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Studio Details</Text>
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
            setActiveAd(
              Math.round(e.nativeEvent.contentOffset.x / width)
            )
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
              style={[
                styles.dot,
                activeAd === i && styles.activeDot,
              ]}
            />
          ))}
        </View>

        {/* ===== HERO CARD ===== */}
        <View style={styles.heroCard}>
          <Image
            source={STUDIO_LOGO}
            style={[
              styles.heroLogo,
              isTablet && { width: 110, height: 110 },
            ]}
          />

          <Text style={styles.heroTitle}>eMotion Dance Studio</Text>
          <Text style={styles.heroTagline}>
            Dance · Fitness · Fine Arts
          </Text>

          <View style={styles.infoRow}>
            <Ionicons name="location-outline" size={16} color="#E8F0FF" />
            <Text style={styles.infoText}>
              Nagercoil, Tamil Nadu
            </Text>
          </View>
        </View>

        {/* ===== ABOUT ===== */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>About Studio</Text>
          <Text style={styles.sectionText}>
            At our renowned dance school, with over 18 years of experience and a
            reputation for exceptional hospitality, we offer a diverse range of
            programs to cater to different interests and passions.
          </Text>
        </View>

        {/* ===== OFFERS ===== */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>We Offer</Text>
          <View style={styles.chips}>
            <Text style={styles.chip}>Bharatanatyam</Text>
            <Text style={styles.chip}>Western Dance</Text>
            <Text style={styles.chip}>Zumba</Text>
            <Text style={styles.chip}>Fitness</Text>
          </View>
        </View>

        {/* ===== WEBSITE ===== */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Website</Text>
          <Text
            style={styles.link}
            onPress={() => Linking.openURL("http://www.eMotion.com")}
          >
            www.eMotion.com
          </Text>
        </View>

        {/* ===== GALLERY ===== */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Gallery</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {galleryImages.map((img, i) => (
              <Image
                key={i}
                source={img}
                style={[
                  styles.galleryImage,
                  isTablet && { width: 140, height: 140 },
                ]}
              />
            ))}
          </ScrollView>
        </View>

        {/* ===== MASTER ===== */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>About Our Master</Text>
          <Text style={styles.sectionText}>
            Mr. Ram Ranjith is a visionary artistic director and accomplished
            fitness instructor with over two decades of experience in dance and
            fine arts. He is a certified Zumba trainer and a proud alumnus of
            Kalaamandalam.
          </Text>
        </View>

        {/* ===== CALL & WHATSAPP ===== */}
        <View style={styles.actionRow}>
          <TouchableOpacity style={styles.callBtn} onPress={handleCall}>
            <Ionicons name="call" size={18} color="#fff" />
            <Text style={styles.actionText}>Call</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.whatsappBtn}
            onPress={handleWhatsApp}
          >
            <Ionicons name="logo-whatsapp" size={18} color="#fff" />
            <Text style={styles.actionText}>WhatsApp</Text>
          </TouchableOpacity>
        </View>

        {/* ===== VIDEO ===== */}
        <View style={styles.videoBox}>
          <WebView
            allowsFullscreenVideo
            source={{
              uri: "https://www.youtube.com/watch?v=NONufn3jgXI",
            }}
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
    padding: 18,
    alignItems: "center",
  },

  heroLogo: {
    width: 90,
    height: 90,
    resizeMode: "contain",
    marginBottom: 10,
  },

  heroTitle: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "800",
  },

  heroTagline: {
    color: "#DCE8FF",
    fontSize: 13,
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

  sectionText: {
    fontSize: 13,
    color: "#5F6F81",
    lineHeight: 20,
    textAlign: "justify",
  },

  chips: {
    flexDirection: "row",
    flexWrap: "wrap",
  },

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

  link: {
    color: "#0B5ED7",
    fontSize: 14,
    fontWeight: "600",
  },

  galleryImage: {
    width: 100,
    height: 100,
    borderRadius: 12,
    marginRight: 10,
  },

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

  actionText: {
    color: "#fff",
    fontWeight: "700",
    marginLeft: 6,
  },

  videoBox: {
    margin: 2,
    marginTop: 32,
    overflow: "hidden",
    backgroundColor: "#000",
  },
});
