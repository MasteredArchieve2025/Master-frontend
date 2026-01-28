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

const { width: screenWidth } = Dimensions.get("window");
const isTablet = screenWidth >= 768;
const isWeb = screenWidth >= 1024;

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
  const bannerWidth = isWeb ? Math.min(screenWidth, 1200) : screenWidth;

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
        bannerRef.current?.scrollTo({ x: next * bannerWidth, animated: true });
        return next;
      });
    }, 3000);
    return () => clearInterval(timer);
  }, [bannerWidth]);

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
        <View style={[
          styles.sectionCard,
          isTablet && styles.sectionCardTablet,
          isWeb && styles.sectionCardWeb
        ]}>
          <Text style={[
            styles.sectionTitle,
            isTablet && styles.sectionTitleTablet
          ]}>
            {activeTab}
          </Text>
          <Text style={[
            styles.aboutText,
            isTablet && styles.aboutTextTablet
          ]}>
            Details about {activeTab} will be available here.
          </Text>
        </View>
      );
    }

    return (
      <View style={[
        styles.sectionCard,
        isTablet && styles.sectionCardTablet,
        isWeb && styles.sectionCardWeb
      ]}>
        <Text style={[
          styles.sectionTitle,
          isTablet && styles.sectionTitleTablet
        ]}>
          Placement
        </Text>

        <Text style={[
          styles.highlightText,
          isTablet && styles.highlightTextTablet
        ]}>
          Training & Placement: Shaping Future-Ready Engineers
        </Text>

        <View style={[
          styles.placementRow,
          isTablet && styles.placementRowTablet
        ]}>
          <Image
            source={require("../../assets/principal.jpg")}
            style={[
              styles.officerImage,
              isTablet && styles.officerImageTablet,
              isWeb && styles.officerImageWeb
            ]}
          />

          <View style={[
            styles.officerInfo,
            isTablet && styles.officerInfoTablet
          ]}>
            <Text style={[
              styles.officerName,
              isTablet && styles.officerNameTablet
            ]}>
              Mr. C.D. Prabakar
            </Text>
            <Text style={[
              styles.officerTitle,
              isTablet && styles.officerTitleTablet
            ]}>
              Training & Placement Officer
            </Text>

            <Text style={[
              styles.aboutText,
              isTablet && styles.aboutTextTablet
            ]}>
              The Training & Placement Department prepares students
              for professional success through skill development,
              industry exposure, and placement assistance.
            </Text>
          </View>
        </View>

        <Text style={[
          styles.aboutText,
          isTablet && styles.aboutTextTablet
        ]}>
          The institution consistently produces industry-ready
          graduates with strong technical and professional skills.
        </Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={[styles.container, isWeb && styles.containerWeb]}>
      <StatusBar barStyle="light-content" backgroundColor="#0052A2" />

      {/* HEADER */}
      <View style={[
        styles.header,
        isTablet && styles.headerTablet,
        isWeb && styles.headerWeb
      ]}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons
            name={Platform.OS === "ios" ? "chevron-back" : "arrow-back"}
            size={isTablet ? 28 : 24}
            color="#fff"
          />
        </TouchableOpacity>
        <Text style={[
          styles.headerTitle,
          isTablet && styles.headerTitleTablet,
          isWeb && styles.headerTitleWeb
        ]}>
          College Details
        </Text>
        <View style={{ width: isTablet ? 28 : 24 }} />
      </View>

      <ScrollView 
        showsVerticalScrollIndicator={isWeb}
        contentContainerStyle={isWeb && styles.scrollContentWeb}
      >
        {/* TOP ADS */}
        <View style={isWeb && styles.bannerContainerWeb}>
          <ScrollView
            ref={bannerRef}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
          >
            {bannerAds.map((img, index) => (
              <Image
                key={index}
                source={{ uri: `${img}?w=${Math.floor(bannerWidth * 2)}&auto=format&fit=crop` }}
                style={[
                  styles.bannerImage,
                  isTablet && styles.bannerImageTablet,
                  isWeb && styles.bannerImageWeb,
                  { width: bannerWidth }
                ]}
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
        </View>

        {/* HERO CARD */}
        <View style={[
          styles.heroCard,
          isTablet && styles.heroCardTablet,
          isWeb && styles.heroCardWeb
        ]}>
          <Text style={[
            styles.collegeName,
            isTablet && styles.collegeNameTablet,
            isWeb && styles.collegeNameWeb
          ]}>
            Arunachala College of Engineering
          </Text>
          <Text style={[
            styles.tagline,
            isTablet && styles.taglineTablet
          ]}>
            For Women · Autonomous Institution
          </Text>

          <View style={styles.infoRow}>
            <Ionicons 
              name="school-outline" 
              size={isTablet ? 18 : 16} 
              color="#E8F0FF" 
            />
            <Text style={[
              styles.infoText,
              isTablet && styles.infoTextTablet
            ]}>
              Engineering & Technology Programs
            </Text>
          </View>

          <View style={styles.infoRow}>
            <Ionicons 
              name="location-outline" 
              size={isTablet ? 18 : 16} 
              color="#E8F0FF" 
            />
            <Text style={[
              styles.infoText,
              isTablet && styles.infoTextTablet
            ]}>
              Nagercoil, Tamil Nadu
            </Text>
          </View>
        </View>

        {/* TABS */}
        <ScrollView 
          horizontal 
          style={[
            styles.tabs,
            isTablet && styles.tabsTablet,
            isWeb && styles.tabsWeb
          ]} 
          showsHorizontalScrollIndicator={isWeb}
        >
          {["All","Dept","Placement","Academic","Facilities","Admission","About"].map(tab => (
            <TouchableOpacity
              key={tab}
              style={[
                styles.tabBtn,
                activeTab === tab && styles.activeTab,
                isTablet && styles.tabBtnTablet
              ]}
              onPress={() => setActiveTab(tab)}
            >
              <Text style={[
                styles.tabText,
                activeTab === tab && styles.activeTabText,
                isTablet && styles.tabTextTablet
              ]}>
                {tab}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {renderContent()}

        {/* MAP */}
        <TouchableOpacity 
          style={[
            styles.mapButton,
            isTablet && styles.mapButtonTablet,
            isWeb && styles.mapButtonWeb
          ]} 
          onPress={openMap}
        >
          <Ionicons 
            name="map-outline" 
            size={isTablet ? 20 : 18} 
            color="#fff" 
          />
          <Text style={[
            styles.mapText,
            isTablet && styles.mapTextTablet
          ]}>
            View on Map
          </Text>
        </TouchableOpacity>

        {/* CALL & WHATSAPP */}
        <View style={[
          styles.actionRow,
          isTablet && styles.actionRowTablet,
          isWeb && styles.actionRowWeb
        ]}>
          <TouchableOpacity 
            style={[
              styles.callBtn,
              isTablet && styles.actionBtnTablet
            ]} 
            onPress={callNow}
          >
            <Ionicons 
              name="call" 
              size={isTablet ? 20 : 18} 
              color="#fff" 
            />
            <Text style={[
              styles.actionText,
              isTablet && styles.actionTextTablet
            ]}>
              Call
            </Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[
              styles.whatsappBtn,
              isTablet && styles.actionBtnTablet
            ]} 
            onPress={openWhatsApp}
          >
            <Ionicons 
              name="logo-whatsapp" 
              size={isTablet ? 20 : 18} 
              color="#fff" 
            />
            <Text style={[
              styles.actionText,
              isTablet && styles.actionTextTablet
            ]}>
              WhatsApp
            </Text>
          </TouchableOpacity>
        </View>

        {/* ===== RATE & REVIEW ===== */}
        <View style={[
          styles.sectionCard,
          isTablet && styles.sectionCardTablet,
          isWeb && styles.sectionCardWeb
        ]}>
          <Text style={[
            styles.sectionTitle,
            isTablet && styles.sectionTitleTablet
          ]}>
            Rate & Review
          </Text>

          <View style={[
            styles.starRow,
            isTablet && styles.starRowTablet
          ]}>
            {[1,2,3,4,5].map(i => (
              <TouchableOpacity key={i} onPress={() => setRating(i)}>
                <Ionicons
                  name={i <= rating ? "star" : "star-outline"}
                  size={isTablet ? 32 : 28}
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
            style={[
              styles.reviewInput,
              isTablet && styles.reviewInputTablet
            ]}
            placeholderTextColor="#999"
          />

          <TouchableOpacity 
            style={[
              styles.reviewBtn,
              isTablet && styles.reviewBtnTablet
            ]} 
            onPress={submitReview}
          >
            <Ionicons 
              name="send" 
              size={isTablet ? 20 : 18} 
              color="#fff" 
            />
            <Text style={[
              styles.reviewBtnText,
              isTablet && styles.reviewBtnTextTablet
            ]}>
              Submit Review
            </Text>
          </TouchableOpacity>
        </View>

        {/* REVIEWS LIST */}
        <View style={[
          styles.sectionCard,
          isTablet && styles.sectionCardTablet,
          isWeb && styles.sectionCardWeb
        ]}>
          <Text style={[
            styles.sectionTitle,
            isTablet && styles.sectionTitleTablet
          ]}>
            Student Reviews
          </Text>

          {reviews.map((r, i) => (
            <View 
              key={i} 
              style={[
                styles.reviewBox,
                isTablet && styles.reviewBoxTablet
              ]}
            >
              <View style={[
                styles.reviewHeader,
                isTablet && styles.reviewHeaderTablet
              ]}>
                <Text style={[
                  styles.reviewName,
                  isTablet && styles.reviewNameTablet
                ]}>
                  {r.name}
                </Text>
                <View style={{ flexDirection: "row" }}>
                  {[1,2,3,4,5].map(x => (
                    <Ionicons
                      key={x}
                      name={x <= r.rating ? "star" : "star-outline"}
                      size={isTablet ? 16 : 14}
                      color="#FFD700"
                    />
                  ))}
                </View>
              </View>
              <Text style={[
                styles.reviewText,
                isTablet && styles.reviewTextTablet
              ]}>
                {r.comment}
              </Text>
            </View>
          ))}
        </View>

        {/* VIDEO */}
        <View style={[
          styles.videoBox,
          isTablet && styles.videoBoxTablet,
          isWeb && styles.videoBoxWeb
        ]}>
          <WebView
            allowsFullscreenVideo
            javaScriptEnabled
            domStorageEnabled
            source={{ 
              uri: "https://www.youtube.com/embed/NONufn3jgXI?rel=0&showinfo=0" 
            }}
            style={{ 
              height: isWeb ? 360 : isTablet ? 280 : 220,
              width: "100%" 
            }}
          />
        </View>

        <View style={{ height: isWeb ? 80 : 120 }} />
      </ScrollView>

      <Footer />
    </SafeAreaView>
  );
}

/* ================= STYLES ================= */
const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: "#F6F9FF" 
  },
  containerWeb: {
    maxWidth: 1200,
    alignSelf: 'center',
    width: '100%',
  },
  
  scrollContentWeb: {
    paddingHorizontal: 40,
  },

  // Header
  header: {
    backgroundColor: "#0052A2",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
  },
  headerTablet: {
    paddingVertical: 20,
    paddingHorizontal: 24,
  },
  headerWeb: {
    paddingHorizontal: 40,
  },
  headerTitle: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "700",
  },
  headerTitleTablet: {
    fontSize: 26,
  },
  headerTitleWeb: {
    fontSize: 28,
  },

  // Banner Container
  bannerContainerWeb: {
    borderRadius: 12,
    overflow: 'hidden',
    marginTop: 8,
  },

  // Banner Image
  bannerImage: {
    height: 180,
  },
  bannerImageTablet: {
    height: 300,
  },
  bannerImageWeb: {
    height: 220,
  },

  // Dots
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

  // Hero Card
  heroCard: {
    backgroundColor: "#4c73ac",
    margin: 16,
    borderRadius: 18,
    padding: 16,
  },
  heroCardTablet: {
    marginHorizontal: 24,
    padding: 20,
    borderRadius: 20,
  },
  heroCardWeb: {
    marginHorizontal: 0,
  },
  collegeName: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "800",
  },
  collegeNameTablet: {
    fontSize: 24,
  },
  collegeNameWeb: {
    fontSize: 26,
  },
  tagline: {
    color: "#DCE8FF",
    fontSize: 12,
    marginTop: 4,
    marginBottom: 10,
  },
  taglineTablet: {
    fontSize: 14,
  },

  // Info Row
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
  infoTextTablet: {
    fontSize: 14,
  },

  // Tabs
  tabs: {
    paddingHorizontal: 12,
    marginTop: 10,
  },
  tabsTablet: {
    paddingHorizontal: 20,
    marginTop: 12,
  },
  tabsWeb: {
    paddingHorizontal: 0,
  },
  tabBtn: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: "#E8F0FF",
    marginRight: 10,
  },
  tabBtnTablet: {
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 22,
  },
  activeTab: {
    backgroundColor: "#0B5ED7",
  },
  tabText: {
    fontSize: 14,
    color: "#0B5ED7",
    fontWeight: "600",
  },
  tabTextTablet: {
    fontSize: 15,
  },
  activeTabText: {
    color: "#fff",
  },

  // Section Card
  sectionCard: {
    backgroundColor: "#fff",
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 16,
    padding: 16,
  },
  sectionCardTablet: {
    marginHorizontal: 24,
    padding: 20,
    borderRadius: 18,
  },
  sectionCardWeb: {
    marginHorizontal: 0,
  },

  // Section Title
  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 10,
  },
  sectionTitleTablet: {
    fontSize: 18,
    marginBottom: 12,
  },

  // Highlight Text
  highlightText: {
    fontSize: 14,
    fontWeight: "700",
    color: "#0052A2",
    textAlign: "center",
    marginBottom: 12,
  },
  highlightTextTablet: {
    fontSize: 16,
  },

  // Placement Row
  placementRow: {
    flexDirection: "row",
    marginBottom: 12,
  },
  placementRowTablet: {
    marginBottom: 16,
  },

  // Officer Image
  officerImage: {
    width: 90,
    height: 120,
    borderRadius: 8,
  },
  officerImageTablet: {
    width: 110,
    height: 140,
    borderRadius: 10,
  },
  officerImageWeb: {
    width: 120,
    height: 150,
  },

  // Officer Info
  officerInfo: {
    flex: 1,
    marginLeft: 12,
  },
  officerInfoTablet: {
    marginLeft: 16,
  },

  // Officer Name
  officerName: {
    fontSize: 15,
    fontWeight: "700",
  },
  officerNameTablet: {
    fontSize: 17,
  },

  // Officer Title
  officerTitle: {
    fontSize: 12,
    color: "#5F6F81",
    marginBottom: 6,
  },
  officerTitleTablet: {
    fontSize: 14,
    marginBottom: 8,
  },

  // About Text
  aboutText: {
    fontSize: 13,
    color: "#5F6F81",
    lineHeight: 20,
  },
  aboutTextTablet: {
    fontSize: 15,
    lineHeight: 24,
  },

  // Map Button
  mapButton: {
    margin: 16,
    backgroundColor: "#0B5ED7",
    paddingVertical: 14,
    borderRadius: 30,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  mapButtonTablet: {
    marginHorizontal: 24,
    paddingVertical: 16,
  },
  mapButtonWeb: {
    marginHorizontal: 0,
  },
  mapText: {
    color: "#fff",
    fontWeight: "700",
    marginLeft: 8,
  },
  mapTextTablet: {
    fontSize: 16,
    marginLeft: 10,
  },

  // Action Row
  actionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 16,
    marginTop: 10,
  },
  actionRowTablet: {
    marginHorizontal: 24,
    marginTop: 12,
  },
  actionRowWeb: {
    marginHorizontal: 0,
  },

  // Action Buttons
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
  actionBtnTablet: {
    paddingVertical: 16,
    borderRadius: 16,
  },
  actionText: {
    color: "#fff",
    fontWeight: "700",
    marginLeft: 6,
  },
  actionTextTablet: {
    fontSize: 16,
    marginLeft: 8,
  },

  // Star Row
  starRow: {
    flexDirection: "row",
    marginBottom: 10,
  },
  starRowTablet: {
    marginBottom: 12,
    justifyContent: 'center',
  },

  // Review Input
  reviewInput: {
    backgroundColor: "#F8FAFF",
    borderRadius: 10,
    padding: 12,
    minHeight: 80,
    marginBottom: 10,
    fontSize: 14,
  },
  reviewInputTablet: {
    minHeight: 100,
    padding: 16,
    fontSize: 16,
    borderRadius: 12,
  },

  // Review Button
  reviewBtn: {
    backgroundColor: "#0B5ED7",
    paddingVertical: 12,
    borderRadius: 30,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  reviewBtnTablet: {
    paddingVertical: 14,
    borderRadius: 32,
  },
  reviewBtnText: {
    color: "#fff",
    fontWeight: "700",
    marginLeft: 6,
    fontSize: 14,
  },
  reviewBtnTextTablet: {
    fontSize: 16,
    marginLeft: 8,
  },

  // Review Box
  reviewBox: {
    backgroundColor: "#F8FAFF",
    borderRadius: 12,
    padding: 12,
    marginBottom: 10,
  },
  reviewBoxTablet: {
    padding: 16,
    borderRadius: 14,
    marginBottom: 12,
  },

  // Review Header
  reviewHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 6,
  },
  reviewHeaderTablet: {
    marginBottom: 8,
  },

  // Review Name
  reviewName: {
    fontSize: 14,
    fontWeight: "700",
    color: "#004780",
  },
  reviewNameTablet: {
    fontSize: 16,
  },

  // Review Text
  reviewText: {
    fontSize: 13,
    color: "#5F6F81",
  },
  reviewTextTablet: {
    fontSize: 15,
    lineHeight: 22,
  },

  // Video Box
  videoBox: {
    margin: 2,
    marginTop: 32,
    overflow: "hidden",
    backgroundColor: "#000",
    borderRadius: 12,
  },
  videoBoxTablet: {
    marginHorizontal: 24,
    marginTop: 40,
    borderRadius: 16,
    height:300
  },
  videoBoxWeb: {
    marginHorizontal: 0,
    marginTop: 50,
    borderRadius: 16,
  },
});