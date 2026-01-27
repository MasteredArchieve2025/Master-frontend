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
  Dimensions,
  SafeAreaView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import { WebView } from "react-native-webview";
import Footer from "../../src/components/Footer";

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");
const isTablet = screenWidth >= 768;
const isWeb = screenWidth >= 1024;

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
  const bannerWidth = isWeb ? Math.min(width, 1200) : width;

  const adRef = useRef(null);
  const [activeAd, setActiveAd] = useState(0);

  /* ===== REVIEW STATES ===== */
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
        adRef.current?.scrollTo({ x: next * bannerWidth, animated: true });
        return next;
      });
    }, 3000);
    return () => clearInterval(timer);
  }, [bannerWidth]);

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
    <SafeAreaView style={[styles.container, isWeb && styles.containerWeb]}>
      {/* ===== HEADER (Same as School1) ===== */}
      <View style={[styles.header, isTablet && styles.headerTablet, isWeb && styles.headerWeb]}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons 
            name="arrow-back" 
            size={isTablet ? 28 : 24} 
            color="#fff" 
          />
        </TouchableOpacity>

        <Text style={[styles.headerTitle, isTablet && styles.headerTitleTablet, isWeb && styles.headerTitleWeb]}>
          School Details
        </Text>
        <View style={{ width: isTablet ? 28 : 24 }} />
      </View>

      <ScrollView 
        showsVerticalScrollIndicator={isWeb}
        contentContainerStyle={isWeb && styles.scrollContentWeb}
      >
        {/* ===== TOP ADS ===== */}
        <View style={isWeb && styles.bannerContainerWeb}>
          <ScrollView
            ref={adRef}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onMomentumScrollEnd={(e) =>
              setActiveAd(Math.round(e.nativeEvent.contentOffset.x / bannerWidth))
            }
          >
            {ads.map((img, i) => (
              <Image
                key={i}
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
            {ads.map((_, i) => (
              <View
                key={i}
                style={[styles.dot, activeAd === i && styles.activeDot]}
              />
            ))}
          </View>
        </View>

        {/* ===== HERO CARD ===== */}
        <View style={[
          styles.heroCard,
          isTablet && styles.heroCardTablet,
          isWeb && styles.heroCardWeb
        ]}>
          <Text style={[
            styles.schoolName,
            isTablet && styles.schoolNameTablet,
            isWeb && styles.schoolNameWeb
          ]}>
            {school?.name || "Josephs Matric HR Sec School"}
          </Text>

          <Text style={[
            styles.tagline,
            isTablet && styles.taglineTablet
          ]}>
            Quality Education · Discipline · Excellence
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
              LKG – Class 12 · All Boards
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
              Colachel, Tamil Nadu
            </Text>
          </View>
        </View>

        {/* ===== CLASSES OFFERED ===== */}
        <View style={[
          styles.sectionCard,
          isTablet && styles.sectionCardTablet,
          isWeb && styles.sectionCardWeb
        ]}>
          <Text style={[
            styles.sectionTitle,
            isTablet && styles.sectionTitleTablet
          ]}>
            Classes Offered
          </Text>
          <View style={[
            styles.chips,
            isTablet && styles.chipsTablet
          ]}>
            <Text style={[
              styles.chip,
              isTablet && styles.chipTablet
            ]}>
              Primary
            </Text>
            <Text style={[
              styles.chip,
              isTablet && styles.chipTablet
            ]}>
              Middle School
            </Text>
            <Text style={[
              styles.chip,
              isTablet && styles.chipTablet
            ]}>
              High School
            </Text>
            <Text style={[
              styles.chip,
              isTablet && styles.chipTablet
            ]}>
              Higher Secondary
            </Text>
          </View>
        </View>

        {/* ===== TEACHING MODE ===== */}
        <View style={[
          styles.sectionCard,
          isTablet && styles.sectionCardTablet,
          isWeb && styles.sectionCardWeb
        ]}>
          <Text style={[
            styles.sectionTitle,
            isTablet && styles.sectionTitleTablet
          ]}>
            Teaching Mode
          </Text>

          <View style={[
            styles.modeRow,
            isTablet && styles.modeRowTablet
          ]}>
            <View style={[
              styles.modeCard,
              isTablet && styles.modeCardTablet
            ]}>
              <Ionicons 
                name="business-outline" 
                size={isTablet ? 26 : 22} 
                color="#0B5ED7" 
              />
              <Text style={[
                styles.modeTitle,
                isTablet && styles.modeTitleTablet
              ]}>
                Offline
              </Text>
              <Text style={[
                styles.modeSub,
                isTablet && styles.modeSubTablet
              ]}>
                Classroom learning
              </Text>
            </View>

            <View style={[
              styles.modeCard,
              isTablet && styles.modeCardTablet
            ]}>
              <Ionicons 
                name="videocam-outline" 
                size={isTablet ? 26 : 22} 
                color="#0B5ED7" 
              />
              <Text style={[
                styles.modeTitle,
                isTablet && styles.modeTitleTablet
              ]}>
                Smart Classes
              </Text>
              <Text style={[
                styles.modeSub,
                isTablet && styles.modeSubTablet
              ]}>
                Digital learning support
              </Text>
            </View>
          </View>
        </View>

        {/* ===== VIEW MAP ===== */}
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

        {/* ===== ABOUT SCHOOL ===== */}
        <View style={[
          styles.sectionCard,
          isTablet && styles.sectionCardTablet,
          isWeb && styles.sectionCardWeb
        ]}>
          <Text style={[
            styles.sectionTitle,
            isTablet && styles.sectionTitleTablet
          ]}>
            About School
          </Text>
          <Text style={[
            styles.aboutText,
            isTablet && styles.aboutTextTablet
          ]}>
            The school has a private building with well-equipped classrooms,
            library, playground, computer facilities, and a nurturing academic
            environment that promotes holistic student development.
          </Text>
        </View>

        {/* ===== CALL & WHATSAPP ===== */}
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
            {[1, 2, 3, 4, 5].map((i) => (
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

        {/* ===== REVIEWS LIST ===== */}
        <View style={[
          styles.sectionCard,
          isTablet && styles.sectionCardTablet,
          isWeb && styles.sectionCardWeb
        ]}>
          <Text style={[
            styles.sectionTitle,
            isTablet && styles.sectionTitleTablet
          ]}>
            User Reviews
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
                  {[1, 2, 3, 4, 5].map((x) => (
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

        {/* ===== VIDEO ===== */}
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
              height: isWeb ? 360 : isTablet ? 280 : 240,
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
    backgroundColor: "#F4F8FF" 
  },
  containerWeb: {
    maxWidth: 1200,
    alignSelf: 'center',
    width: '100%',
  },
  
  scrollContentWeb: {
    paddingHorizontal: 40,
  },

  // Header Styles (Same as School1)
  header: {
    backgroundColor: "#0052A2",
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
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
    marginRight: 25,
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
    height: 200,
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
  schoolName: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "800",
  },
  schoolNameTablet: {
    fontSize: 24,
  },
  schoolNameWeb: {
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
  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 10,
  },
  sectionTitleTablet: {
    fontSize: 18,
    marginBottom: 12,
  },

  // Chips
  chips: { 
    flexDirection: "row", 
    flexWrap: "wrap" 
  },
  chipsTablet: {
    marginTop: 4,
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
  chipTablet: {
    fontSize: 14,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 12,
    marginRight: 10,
    marginBottom: 10,
  },

  // Mode Row
  modeRow: { 
    flexDirection: "row", 
    justifyContent: "space-between" 
  },
  modeRowTablet: {
    justifyContent: 'space-around',
  },
  modeCard: {
    width: "48%",
    backgroundColor: "#F8FAFF",
    borderRadius: 14,
    padding: 14,
    alignItems: "center",
  },
  modeCardTablet: {
    width: "46%",
    padding: 18,
    borderRadius: 16,
  },
  modeTitle: { 
    marginTop: 6, 
    fontSize: 14, 
    fontWeight: "700" 
  },
  modeTitleTablet: {
    fontSize: 16,
    marginTop: 8,
  },
  modeSub: { 
    fontSize: 11, 
    color: "#5F6F81", 
    marginTop: 2 
  },
  modeSubTablet: {
    fontSize: 13,
    marginTop: 4,
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
    marginLeft: 8 
  },
  mapTextTablet: {
    fontSize: 16,
    marginLeft: 10,
  },

  // About Text
  aboutText: { 
    fontSize: 13, 
    color: "#5F6F81", 
    lineHeight: 20 
  },
  aboutTextTablet: {
    fontSize: 15,
    lineHeight: 24,
  },

  // Action Row
  actionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 16,
    marginTop: 16,
  },
  actionRowTablet: {
    marginHorizontal: 24,
    marginTop: 20,
  },
  actionRowWeb: {
    marginHorizontal: 0,
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
  actionBtnTablet: {
    paddingVertical: 16,
    borderRadius: 16,
  },
  actionText: { 
    color: "#fff", 
    fontWeight: "700", 
    marginLeft: 6 
  },
  actionTextTablet: {
    fontSize: 16,
    marginLeft: 8,
  },

  // Star Row
  starRow: { 
    flexDirection: "row", 
    marginBottom: 10 
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
    textAlignVertical: "top",
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
  reviewHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 6,
  },
  reviewHeaderTablet: {
    marginBottom: 8,
  },
  reviewName: {
    fontSize: 14,
    fontWeight: "700",
    color: "#004780",
  },
  reviewNameTablet: {
    fontSize: 16,
  },
  reviewText: {
    fontSize: 13,
    color: "#5F6F81",
    lineHeight: 18,
  },
  reviewTextTablet: {
    fontSize: 15,
    lineHeight: 22,
  },

  // Video Box
  videoBox: {
    margin: 15,
    marginTop: 32,
    overflow: "hidden",
    backgroundColor: "#000",
    borderRadius: 12,
    height : 200,
  },
  videoBoxTablet: {
    marginHorizontal: 24,
    marginTop: 40,
    borderRadius: 16,
    height :300  },
  videoBoxWeb: {
    marginHorizontal: 0,
    marginTop: 50,
    borderRadius: 16,
  },
});