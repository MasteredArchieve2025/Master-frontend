import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Platform,
  SafeAreaView,
  StatusBar,
  Dimensions,
  Linking,
  TextInput,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { WebView } from "react-native-webview";
import Footer from "../../src/components/Footer";

const { width } = Dimensions.get("window");
const isTablet = width >= 768;

/* ===== AD BANNERS ===== */
const bannerAds = [
  "https://images.unsplash.com/photo-1516321318423-f06f85e504b3",
  "https://images.unsplash.com/photo-1509062522246-3755977927d7",
  "https://images.unsplash.com/photo-1551650975-87deedd944c3",
];

export default function College4({ route }) {
  const navigation = useNavigation();
  const { college } = route?.params || {};
  const [activeTab, setActiveTab] = useState("Placement");

  /* ===== REVIEW STATES ===== */
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [reviews, setReviews] = useState([
    {
      name: "Student Review",
      rating: 5,
      comment: "Good placement support and faculty guidance.",
    },
  ]);

  const bannerRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  /* AUTO SCROLL BANNERS */
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

  /* ACTIONS */
  const openMap = () =>
    Linking.openURL(
      "https://www.google.com/maps/search/?api=1&query=Arunachala+College+of+Engineering"
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

  /* TAB CONTENT */
  const renderContent = () => {
    if (activeTab !== "Placement") {
      return (
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>{activeTab}</Text>
          <Text style={styles.aboutText}>
            Details about {activeTab} will be available here.
          </Text>
        </View>
      );
    }

    return (
      <View style={styles.sectionCard}>
        <Text style={styles.sectionTitle}>Placement</Text>

        <Text style={styles.highlightText}>
          Training & Placement: Shaping Future-Ready Engineers
        </Text>

        <View style={styles.placementRow}>
          <Image
            source={require("../../assets/principal.jpg")}
            style={styles.officerImage}
          />

          <View style={{ flex: 1, marginLeft: 12 }}>
            <Text style={styles.officerName}>Mr. C.D. Prabakar</Text>
            <Text style={styles.officerTitle}>
              Training & Placement Officer
            </Text>

            <Text style={styles.aboutText}>
              The Training & Placement Department prepares students
              for professional success through skill development,
              industry exposure, and placement assistance.
            </Text>
          </View>
        </View>

        <Text style={styles.aboutText}>
          The institution consistently produces industry-ready
          graduates with strong technical and professional skills.
        </Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0052A2" />

      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons
            name={Platform.OS === "ios" ? "chevron-back" : "arrow-back"}
            size={24}
            color="#fff"
          />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>College Details</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* TOP ADS */}
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
              style={{ width, height: isTablet ? 160 : 180 }}
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

        {/* HERO CARD */}
        <View style={styles.heroCard}>
          <Text style={styles.collegeName}>
            Arunachala College of Engineering
          </Text>
          <Text style={styles.tagline}>
            For Women · Autonomous Institution
          </Text>

          <View style={styles.infoRow}>
            <Ionicons name="school-outline" size={16} color="#E8F0FF" />
            <Text style={styles.infoText}>
              Engineering & Technology Programs
            </Text>
          </View>

          <View style={styles.infoRow}>
            <Ionicons name="location-outline" size={16} color="#E8F0FF" />
            <Text style={styles.infoText}>
              Nagercoil, Tamil Nadu
            </Text>
          </View>
        </View>

        {/* TABS */}
        <ScrollView horizontal style={styles.tabs} showsHorizontalScrollIndicator={false}>
          {["All","Dept","Placement","Academic","Facilities","Admission","About"].map(tab => (
            <TouchableOpacity
              key={tab}
              style={[styles.tabBtn, activeTab === tab && styles.activeTab]}
              onPress={() => setActiveTab(tab)}
            >
              <Text style={[styles.tabText, activeTab === tab && styles.activeTabText]}>
                {tab}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {renderContent()}

        {/* MAP */}
        <TouchableOpacity style={styles.mapButton} onPress={openMap}>
          <Ionicons name="map-outline" size={18} color="#fff" />
          <Text style={styles.mapText}>View on Map</Text>
        </TouchableOpacity>

        {/* CALL & WHATSAPP */}
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

        {/* ===== RATE & REVIEW ===== */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Rate & Review</Text>

          <View style={styles.starRow}>
            {[1,2,3,4,5].map(i => (
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

        {/* REVIEWS LIST */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Student Reviews</Text>

          {reviews.map((r, i) => (
            <View key={i} style={styles.reviewBox}>
              <View style={styles.reviewHeader}>
                <Text style={styles.reviewName}>{r.name}</Text>
                <View style={{ flexDirection: "row" }}>
                  {[1,2,3,4,5].map(x => (
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

        {/* VIDEO */}
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

/* ===== STYLES (same theme) ===== */
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F6F9FF" },
  header:{backgroundColor:"#0052A2",flexDirection:"row",alignItems:"center",justifyContent:"space-between",padding:16},
  headerTitle:{color:"#fff",fontSize:22,fontWeight:"700"},
  dots:{flexDirection:"row",justifyContent:"center",marginVertical:8},
  dot:{width:8,height:8,borderRadius:4,backgroundColor:"#ccc",marginHorizontal:4},
  activeDot:{width:16,backgroundColor:"#0B5ED7"},
  heroCard:{backgroundColor:"#4c73ac",margin:16,borderRadius:18,padding:16},
  collegeName:{color:"#fff",fontSize:20,fontWeight:"800"},
  tagline:{color:"#DCE8FF",fontSize:12,marginTop:4,marginBottom:10},
  infoRow:{flexDirection:"row",alignItems:"center",marginTop:6},
  infoText:{color:"#E8F0FF",fontSize:12,marginLeft:6},
  tabs:{paddingHorizontal:12,marginTop:10},
  tabBtn:{paddingHorizontal:16,paddingVertical:8,borderRadius:20,backgroundColor:"#E8F0FF",marginRight:10},
  activeTab:{backgroundColor:"#0B5ED7"},
  tabText:{fontSize:14,color:"#0B5ED7",fontWeight:"600"},
  activeTabText:{color:"#fff"},
  sectionCard:{backgroundColor:"#fff",marginHorizontal:16,marginTop:16,borderRadius:16,padding:16},
  sectionTitle:{fontSize:16,fontWeight:"700",marginBottom:10},
  highlightText:{fontSize:14,fontWeight:"700",color:"#0052A2",textAlign:"center",marginBottom:12},
  placementRow:{flexDirection:"row",marginBottom:12},
  officerImage:{width:90,height:120,borderRadius:8},
  officerName:{fontSize:15,fontWeight:"700"},
  officerTitle:{fontSize:12,color:"#5F6F81",marginBottom:6},
  aboutText:{fontSize:13,color:"#5F6F81",lineHeight:20},
  mapButton:{margin:16,backgroundColor:"#0B5ED7",paddingVertical:14,borderRadius:30,flexDirection:"row",justifyContent:"center",alignItems:"center"},
  mapText:{color:"#fff",fontWeight:"700",marginLeft:8},
  actionRow:{flexDirection:"row",justifyContent:"space-between",marginHorizontal:16,marginTop:10},
  callBtn:{backgroundColor:"#e51515ee",flex:1,marginRight:8,paddingVertical:14,borderRadius:14,flexDirection:"row",justifyContent:"center",alignItems:"center"},
  whatsappBtn:{backgroundColor:"#25D366",flex:1,marginLeft:8,paddingVertical:14,borderRadius:14,flexDirection:"row",justifyContent:"center",alignItems:"center"},
  actionText:{color:"#fff",fontWeight:"700",marginLeft:6},
  starRow:{flexDirection:"row",marginBottom:10},
  reviewInput:{backgroundColor:"#F8FAFF",borderRadius:10,padding:12,minHeight:80,marginBottom:10},
  reviewBtn:{backgroundColor:"#0B5ED7",paddingVertical:12,borderRadius:30,flexDirection:"row",justifyContent:"center",alignItems:"center"},
  reviewBtnText:{color:"#fff",fontWeight:"700",marginLeft:6},
  reviewBox:{backgroundColor:"#F8FAFF",borderRadius:12,padding:12,marginBottom:10},
  reviewHeader:{flexDirection:"row",justifyContent:"space-between",marginBottom:6},
  reviewName:{fontSize:14,fontWeight:"700",color:"#004780"},
  reviewText:{fontSize:13,color:"#5F6F81"},
  videoBox:{margin:2,marginTop:32,overflow:"hidden",backgroundColor:"#000"},
});
