import React, { useRef, useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Linking,
  SafeAreaView,
  Platform,
  Dimensions,
  StatusBar,
  TextInput,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { WebView } from "react-native-webview";
import Footer from "../../src/components/Footer";

const { width } = Dimensions.get("window");
const isTablet = width >= 768;

const STUDIO_LOGO = require("../../assets/AKlogo.png");

/* ===== TOP ADS ===== */
const bannerAds = [
  "https://images.unsplash.com/photo-1516321318423-f06f85e504b3",
  "https://images.unsplash.com/photo-1509062522246-3755977927d7",
  "https://images.unsplash.com/photo-1551650975-87deedd944c3",
];

export default function Course4({ navigation }) {
  const bannerRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  /* ===== REVIEW STATES ===== */
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [reviews, setReviews] = useState([
    {
      name: "Student Review",
      rating: 5,
      comment: "Good training quality and practical sessions.",
    },
  ]);

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

  /* ACTIONS */
  const callNow = () => Linking.openURL("tel:919384152923");
  const openWhatsApp = () => Linking.openURL("https://wa.me/919384152923");

  const submitReview = () => {
    if (rating === 0 || reviewText.trim() === "") {
      Alert.alert("Incomplete", "Please give rating and write review");
      return;
    }

    setReviews([
      {
        name: "Anonymous User",
        rating,
        comment: reviewText,
      },
      ...reviews,
    ]);

    setRating(0);
    setReviewText("");
  };

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
        <Text style={styles.headerTitle}>Course Details</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* ===== TOP ADS ===== */}
        <ScrollView
          ref={bannerRef}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
        >
          {bannerAds.map((img, i) => (
            <Image
              key={i}
              source={{ uri: img }}
              style={{ width, height: isTablet ? 160 : 190 }}
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

        {/* ===== HERO CARD ===== */}
        <View style={styles.heroCard}>
          <Image source={STUDIO_LOGO} style={styles.logo} />
          <Text style={styles.courseName}>AK Technologies</Text>
          <Text style={styles.tagline}>IT Training & Placement Support</Text>

          <View style={styles.infoRow}>
            <Ionicons name="laptop-outline" size={16} color="#E8F0FF" />
            <Text style={styles.infoText}>
              Technical & Professional Courses
            </Text>
          </View>

          <View style={styles.infoRow}>
            <Ionicons name="globe-outline" size={16} color="#E8F0FF" />
            <Text style={styles.infoText}>www.ak.com</Text>
          </View>
        </View>

        {/* ===== ABOUT COURSE ===== */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>About Institute</Text>
          <Text style={styles.aboutText}>
            Founded in 2015, AK Technologies focuses on IT training and placement
            support. The institute offers technical courses including Python,
            Machine Learning, and live project training.
          </Text>
        </View>

        {/* ===== COURSES OFFERED ===== */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Courses Offered</Text>
          <View style={styles.chips}>
            <Text style={styles.chip}>Web Development</Text>
            <Text style={styles.chip}>Full Stack Development</Text>
            <Text style={styles.chip}>Python</Text>
            <Text style={styles.chip}>Data Science</Text>
          </View>
        </View>

        {/* ===== MODE ===== */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Mode</Text>
          <View style={styles.modeRow}>
            <View style={styles.modeCard}>
              <Ionicons name="business-outline" size={22} color="#0B5ED7" />
              <Text style={styles.modeTitle}>Offline</Text>
              <Text style={styles.modeSub}>Classroom Training</Text>
            </View>

            <View style={styles.modeCard}>
              <Ionicons name="videocam-outline" size={22} color="#0B5ED7" />
              <Text style={styles.modeTitle}>Online</Text>
              <Text style={styles.modeSub}>Live Sessions</Text>
            </View>
          </View>
        </View>

        {/* ===== BENEFITS ===== */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Benefits</Text>
          <Text style={styles.aboutText}>
            • Career growth{"\n"}• Industry-ready skills{"\n"}• Flexible learning
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

        {/* ===== RATE & REVIEW ===== */}
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
            value={reviewText}
            onChangeText={setReviewText}
            multiline
            style={styles.reviewInput}
          />

          <TouchableOpacity style={styles.reviewBtn} onPress={submitReview}>
            <Ionicons name="send" size={18} color="#fff" />
            <Text style={styles.reviewBtnText}>Submit Review</Text>
          </TouchableOpacity>
        </View>

        {/* ===== REVIEWS LIST ===== */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Student Reviews</Text>

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
            style={{ height: isTablet ? 260 : 220 }}
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
  header:{backgroundColor:"#0052A2",flexDirection:"row",alignItems:"center",justifyContent:"space-between",padding:16},
  headerTitle:{color:"#fff",fontSize:22,fontWeight:"700"},
  dots:{flexDirection:"row",justifyContent:"center",marginVertical:8},
  dot:{width:8,height:8,borderRadius:4,backgroundColor:"#ccc",marginHorizontal:4},
  activeDot:{width:16,backgroundColor:"#0B5ED7"},
  heroCard:{backgroundColor:"#4c73ac",margin:16,borderRadius:18,padding:16,alignItems:"center"},
  logo:{width:90,height:60,resizeMode:"contain",marginBottom:10},
  courseName:{color:"#fff",fontSize:20,fontWeight:"800"},
  tagline:{color:"#DCE8FF",fontSize:12,marginTop:4,marginBottom:10},
  infoRow:{flexDirection:"row",alignItems:"center",marginTop:6},
  infoText:{color:"#E8F0FF",fontSize:12,marginLeft:6},
  sectionCard:{backgroundColor:"#fff",marginHorizontal:16,marginTop:16,borderRadius:16,padding:16},
  sectionTitle:{fontSize:16,fontWeight:"700",marginBottom:10},
  aboutText:{fontSize:13,color:"#5F6F81",lineHeight:20},
  chips:{flexDirection:"row",flexWrap:"wrap"},
  chip:{backgroundColor:"#E8F0FF",color:"#0B5ED7",paddingHorizontal:12,paddingVertical:6,borderRadius:10,fontSize:12,marginRight:8,marginBottom:8},
  modeRow:{flexDirection:"row",justifyContent:"space-between"},
  modeCard:{width:"48%",backgroundColor:"#F8FAFF",borderRadius:14,padding:14,alignItems:"center"},
  modeTitle:{marginTop:6,fontSize:14,fontWeight:"700"},
  modeSub:{fontSize:11,color:"#5F6F81",marginTop:2},
  actionRow:{flexDirection:"row",justifyContent:"space-between",marginHorizontal:16,marginTop:16},
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
