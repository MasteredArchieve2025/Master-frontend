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

  const { width: windowWidth, height: windowHeight } = useWindowDimensions();
  
  // Responsive breakpoints
  const isMobile = windowWidth < 768;
  const isTablet = windowWidth >= 768 && windowWidth < 1024;
  const isDesktop = windowWidth >= 1024;
  
  // Responsive dimensions for ads and video
  const bannerHeight = isMobile ? 180 : isTablet ? 300 : 300;
  const videoHeight = isMobile ? 200 : isTablet ? 0 : 350;
  const maxContentWidth = isDesktop ? 900 : windowWidth;

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
        adRef.current?.scrollTo({ 
          x: next * windowWidth, 
          animated: true 
        });
        return next;
      });
    }, 3000);
    return () => clearInterval(timer);
  }, [windowWidth]);

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
      <View style={[
        styles.headerWrapper,
        isDesktop && styles.headerWrapperDesktop
      ]}>
        <View style={[
          styles.header,
          isDesktop && styles.headerDesktop,
          { maxWidth: maxContentWidth }
        ]}>
          <TouchableOpacity 
            onPress={() => navigation.goBack()}
            style={styles.backButton}
          >
            <Ionicons
              name={Platform.OS === "ios" ? "chevron-back" : "arrow-back"}
              size={isMobile ? 24 : isTablet ? 28 : 32}
              color="#fff"
            />
          </TouchableOpacity>
          <Text style={[
            styles.headerTitle,
            isTablet && styles.headerTitleTablet,
            isDesktop && styles.headerTitleDesktop
          ]}>
            School Details
          </Text>
          <View style={{ 
            width: isMobile ? 24 : isTablet ? 28 : 32 
          }} />
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* ===== TOP ADS ===== */}
        <View style={[
          styles.bannerContainer,
          isDesktop && styles.bannerContainerDesktop
        ]}>
          <ScrollView
            ref={adRef}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            style={{ width: windowWidth }}
            onMomentumScrollEnd={(e) =>
              setActiveAd(Math.round(e.nativeEvent.contentOffset.x / windowWidth))
            }
          >
            {ads.map((img, i) => (
              <View key={i} style={{ width: windowWidth }}>
                <Image
                  source={{ uri: img }}
                  style={{
                    width: windowWidth,
                    height: bannerHeight,
                    resizeMode: "cover"
                  }}
                />
              </View>
            ))}
          </ScrollView>
        </View>

        {/* DOTS */}
        <View style={styles.dots}>
          {ads.map((_, i) => (
            <View
              key={i}
              style={[styles.dot, activeAd === i && styles.activeDot]}
            />
          ))}
        </View>

        {/* ===== MAIN CONTENT CONTAINER ===== */}
        <View style={[
          styles.contentContainer,
          { maxWidth: maxContentWidth },
          isDesktop && styles.contentContainerDesktop
        ]}>
          {/* ===== HERO CARD ===== */}
          <View style={[
            styles.heroCard,
            {
              marginHorizontal: isMobile ? 16 : isTablet ? 20 : 24,
              padding: isMobile ? 16 : isTablet ? 18 : 22,
            }
          ]}>
            <Text style={[
              styles.schoolName,
              isTablet && styles.schoolNameTablet,
              isDesktop && styles.schoolNameDesktop
            ]}>
              {school?.name || "Josephs Matric HR Sec School"}
            </Text>

            <Text style={[
              styles.tagline,
              isTablet && styles.taglineTablet,
              isDesktop && styles.taglineDesktop
            ]}>
              Quality Education · Discipline · Excellence
            </Text>

            <View style={styles.infoRow}>
              <Ionicons 
                name="school-outline" 
                size={isMobile ? 16 : isTablet ? 18 : 20} 
                color="#E8F0FF" 
              />
              <Text style={[
                styles.infoText,
                isTablet && styles.infoTextTablet,
                isDesktop && styles.infoTextDesktop
              ]}>
                LKG – Class 12 · All Boards
              </Text>
            </View>

            <View style={styles.infoRow}>
              <Ionicons
                name="location-outline"
                size={isMobile ? 16 : isTablet ? 18 : 20}
                color="#E8F0FF"
              />
              <Text style={[
                styles.infoText,
                isTablet && styles.infoTextTablet,
                isDesktop && styles.infoTextDesktop
              ]}>
                Colachel, Tamil Nadu
              </Text>
            </View>
          </View>

          {/* ===== CLASSES OFFERED ===== */}
          <View style={[
            styles.sectionCard,
            {
              marginHorizontal: isMobile ? 16 : isTablet ? 20 : 24,
              padding: isMobile ? 16 : isTablet ? 18 : 22,
            }
          ]}>
            <Text style={[
              styles.sectionTitle,
              isTablet && styles.sectionTitleTablet,
              isDesktop && styles.sectionTitleDesktop
            ]}>
              Classes Offered
            </Text>
            <View style={styles.chips}>
              <Text style={[
                styles.chip,
                isTablet && styles.chipTablet,
                isDesktop && styles.chipDesktop
              ]}>
                Primary
              </Text>
              <Text style={[
                styles.chip,
                isTablet && styles.chipTablet,
                isDesktop && styles.chipDesktop
              ]}>
                Middle School
              </Text>
              <Text style={[
                styles.chip,
                isTablet && styles.chipTablet,
                isDesktop && styles.chipDesktop
              ]}>
                High School
              </Text>
              <Text style={[
                styles.chip,
                isTablet && styles.chipTablet,
                isDesktop && styles.chipDesktop
              ]}>
                Higher Secondary
              </Text>
            </View>
          </View>

          {/* ===== TEACHING MODE ===== */}
          <View style={[
            styles.sectionCard,
            {
              marginHorizontal: isMobile ? 16 : isTablet ? 20 : 24,
              padding: isMobile ? 16 : isTablet ? 18 : 22,
            }
          ]}>
            <Text style={[
              styles.sectionTitle,
              isTablet && styles.sectionTitleTablet,
              isDesktop && styles.sectionTitleDesktop
            ]}>
              Teaching Mode
            </Text>

            <View style={styles.modeRow}>
              <View style={[
                styles.modeCard,
                {
                  width: isMobile ? "48%" : isTablet ? "48%" : "48%",
                  padding: isMobile ? 14 : isTablet ? 16 : 18,
                }
              ]}>
                <Ionicons 
                  name="business-outline" 
                  size={isMobile ? 22 : isTablet ? 24 : 26} 
                  color="#0B5ED7" 
                />
                <Text style={[
                  styles.modeTitle,
                  isTablet && styles.modeTitleTablet,
                  isDesktop && styles.modeTitleDesktop
                ]}>
                  Offline
                </Text>
                <Text style={[
                  styles.modeSub,
                  isTablet && styles.modeSubTablet,
                  isDesktop && styles.modeSubDesktop
                ]}>
                  Classroom learning
                </Text>
              </View>

              <View style={[
                styles.modeCard,
                {
                  width: isMobile ? "48%" : isTablet ? "48%" : "48%",
                  padding: isMobile ? 14 : isTablet ? 16 : 18,
                }
              ]}>
                <Ionicons 
                  name="videocam-outline" 
                  size={isMobile ? 22 : isTablet ? 24 : 26} 
                  color="#0B5ED7" 
                />
                <Text style={[
                  styles.modeTitle,
                  isTablet && styles.modeTitleTablet,
                  isDesktop && styles.modeTitleDesktop
                ]}>
                  Smart Classes
                </Text>
                <Text style={[
                  styles.modeSub,
                  isTablet && styles.modeSubTablet,
                  isDesktop && styles.modeSubDesktop
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
              {
                marginHorizontal: isMobile ? 16 : isTablet ? 20 : 24,
                paddingVertical: isMobile ? 14 : isTablet ? 16 : 18,
              }
            ]} 
            onPress={openMap}
          >
            <Ionicons 
              name="map-outline" 
              size={isMobile ? 18 : isTablet ? 20 : 22} 
              color="#fff" 
            />
            <Text style={[
              styles.mapText,
              isTablet && styles.mapTextTablet,
              isDesktop && styles.mapTextDesktop
            ]}>
              View on Map
            </Text>
          </TouchableOpacity>

          {/* ===== ABOUT SCHOOL ===== */}
          <View style={[
            styles.sectionCard,
            {
              marginHorizontal: isMobile ? 16 : isTablet ? 20 : 24,
              padding: isMobile ? 16 : isTablet ? 18 : 22,
            }
          ]}>
            <Text style={[
              styles.sectionTitle,
              isTablet && styles.sectionTitleTablet,
              isDesktop && styles.sectionTitleDesktop
            ]}>
              About School
            </Text>
            <Text style={[
              styles.aboutText,
              isTablet && styles.aboutTextTablet,
              isDesktop && styles.aboutTextDesktop
            ]}>
              The school has a private building with well-equipped classrooms,
              library, playground, computer facilities, and a nurturing academic
              environment that promotes holistic student development.
            </Text>
          </View>

          {/* ===== CALL & WHATSAPP ===== */}
          <View style={[
            styles.actionRow,
            {
              marginHorizontal: isMobile ? 16 : isTablet ? 20 : 24,
            }
          ]}>
            <TouchableOpacity 
              style={[
                styles.callBtn,
                {
                  paddingVertical: isMobile ? 14 : isTablet ? 16 : 18,
                  marginRight: isMobile ? 8 : isTablet ? 10 : 12,
                }
              ]} 
              onPress={callNow}
            >
              <Ionicons 
                name="call" 
                size={isMobile ? 18 : isTablet ? 20 : 22} 
                color="#fff" 
              />
              <Text style={[
                styles.actionText,
                isTablet && styles.actionTextTablet,
                isDesktop && styles.actionTextDesktop
              ]}>
                Call
              </Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={[
                styles.whatsappBtn,
                {
                  paddingVertical: isMobile ? 14 : isTablet ? 16 : 18,
                  marginLeft: isMobile ? 8 : isTablet ? 10 : 12,
                }
              ]} 
              onPress={openWhatsApp}
            >
              <Ionicons 
                name="logo-whatsapp" 
                size={isMobile ? 18 : isTablet ? 20 : 22} 
                color="#fff" 
              />
              <Text style={[
                styles.actionText,
                isTablet && styles.actionTextTablet,
                isDesktop && styles.actionTextDesktop
              ]}>
                WhatsApp
              </Text>
            </TouchableOpacity>
          </View>

          {/* ===== RATE & REVIEW (ADDED) ===== */}
          <View style={[
            styles.sectionCard,
            {
              marginHorizontal: isMobile ? 16 : isTablet ? 20 : 24,
              padding: isMobile ? 16 : isTablet ? 18 : 22,
            }
          ]}>
            <Text style={[
              styles.sectionTitle,
              isTablet && styles.sectionTitleTablet,
              isDesktop && styles.sectionTitleDesktop
            ]}>
              Rate & Review
            </Text>

            <View style={styles.starRow}>
              {[1, 2, 3, 4, 5].map((i) => (
                <TouchableOpacity 
                  key={i} 
                  onPress={() => setRating(i)}
                  style={styles.starButton}
                >
                  <Ionicons
                    name={i <= rating ? "star" : "star-outline"}
                    size={isMobile ? 28 : isTablet ? 32 : 36}
                    color="#FFD700"
                  />
                </TouchableOpacity>
              ))}
            </View>

            <TextInput
              placeholder="Write your review..."
              placeholderTextColor="#9CA3AF"
              multiline
              value={reviewText}
              onChangeText={setReviewText}
              style={[
                styles.reviewInput,
                {
                  minHeight: isMobile ? 80 : isTablet ? 100 : 120,
                  padding: isMobile ? 12 : isTablet ? 14 : 16,
                  fontSize: isMobile ? 14 : isTablet ? 15 : 16,
                }
              ]}
            />

            <TouchableOpacity 
              style={[
                styles.reviewBtn,
                {
                  paddingVertical: isMobile ? 12 : isTablet ? 14 : 16,
                }
              ]} 
              onPress={submitReview}
            >
              <Ionicons 
                name="send" 
                size={isMobile ? 18 : isTablet ? 20 : 22} 
                color="#fff" 
              />
              <Text style={[
                styles.reviewBtnText,
                isTablet && styles.reviewBtnTextTablet,
                isDesktop && styles.reviewBtnTextDesktop
              ]}>
                Submit Review
              </Text>
            </TouchableOpacity>
          </View>

          {/* ===== REVIEWS LIST ===== */}
          <View style={[
            styles.sectionCard,
            {
              marginHorizontal: isMobile ? 16 : isTablet ? 20 : 24,
              padding: isMobile ? 16 : isTablet ? 18 : 22,
            }
          ]}>
            <Text style={[
              styles.sectionTitle,
              isTablet && styles.sectionTitleTablet,
              isDesktop && styles.sectionTitleDesktop
            ]}>
              User Reviews
            </Text>

            {reviews.map((r, i) => (
              <View key={i} style={[
                styles.reviewBox,
                {
                  padding: isMobile ? 12 : isTablet ? 14 : 16,
                  marginBottom: isMobile ? 10 : isTablet ? 12 : 14,
                }
              ]}>
                <View style={styles.reviewHeader}>
                  <Text style={[
                    styles.reviewName,
                    isTablet && styles.reviewNameTablet,
                    isDesktop && styles.reviewNameDesktop
                  ]}>
                    {r.name}
                  </Text>
                  <View style={{ flexDirection: "row" }}>
                    {[1, 2, 3, 4, 5].map((x) => (
                      <Ionicons
                        key={x}
                        name={x <= r.rating ? "star" : "star-outline"}
                        size={isMobile ? 14 : isTablet ? 16 : 18}
                        color="#FFD700"
                      />
                    ))}
                  </View>
                </View>
                <Text style={[
                  styles.reviewText,
                  isTablet && styles.reviewTextTablet,
                  isDesktop && styles.reviewTextDesktop
                ]}>
                  {r.comment}
                </Text>
              </View>
            ))}
          </View>

          {/* ===== VIDEO ===== */}
          <View style={[
            styles.videoBox,
            {
              height: videoHeight,
              marginHorizontal: isMobile ? 16 : isTablet ? 20 : 24,
              marginTop: isMobile ? 32 : isTablet ? 40 : 48,
            },
            isDesktop && styles.videoBoxDesktop
          ]}>
            <WebView
              allowsFullscreenVideo
              javaScriptEnabled={true}
              domStorageEnabled={true}
              source={{ 
                uri: "https://www.youtube.com/embed/NONufn3jgXI?rel=0&modestbranding=1" 
              }}
              style={{ flex: 1 }}
            />
          </View>

          {/* Spacer for Footer */}
          <View style={{ 
            height: isMobile ? 120 : isTablet ? 140 : 160 
          }} />
        </View>
      </ScrollView>

      <Footer />
    </SafeAreaView>
  );
}

/* ================= RESPONSIVE STYLES ================= */
const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: "#F6F9FF" 
  },

  // Header Styles
  headerWrapper: { 
    backgroundColor: "#0052A2" 
  },
  headerWrapperDesktop: {
    alignItems: 'center',
  },
  header: {
    backgroundColor: "#0052A2",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
    width: '100%',
  },
  headerDesktop: {
    padding: 20,
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "700",
    textAlign: 'center',
    flex: 1,
  },
  headerTitleTablet: {
    fontSize: 24,
  },
  headerTitleDesktop: {
    fontSize: 26,
  },

  // Banner Container
  bannerContainer: {
    width: '100%',
  },
  bannerContainerDesktop: {
    alignItems: 'center',
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

  // Content Container
  contentContainer: {
    width: '100%',
    alignSelf: 'center',
  },
  contentContainerDesktop: {
    width: '90%',
    maxWidth: 900,
  },

  // Hero Card
  heroCard: {
    backgroundColor: "#4c73ac",
    borderRadius: 18,
  },
  schoolName: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "800",
  },
  schoolNameTablet: {
    fontSize: 22,
  },
  schoolNameDesktop: {
    fontSize: 24,
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
  taglineDesktop: {
    fontSize: 16,
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
  infoTextDesktop: {
    fontSize: 15,
  },

  // Section Cards
  sectionCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
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
  sectionTitleDesktop: {
    fontSize: 20,
    marginBottom: 14,
  },

  // Chips
  chips: { 
    flexDirection: "row", 
    flexWrap: "wrap" 
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
    paddingVertical: 7,
  },
  chipDesktop: {
    fontSize: 15,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },

  // Mode Cards
  modeRow: { 
    flexDirection: "row", 
    justifyContent: "space-between" 
  },
  modeCard: {
    backgroundColor: "#F8FAFF",
    borderRadius: 14,
    alignItems: "center",
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
  modeTitleDesktop: {
    fontSize: 17,
    marginTop: 10,
  },
  modeSub: { 
    fontSize: 11, 
    color: "#5F6F81", 
    marginTop: 2 
  },
  modeSubTablet: {
    fontSize: 12,
  },
  modeSubDesktop: {
    fontSize: 13,
  },

  // Map Button
  mapButton: {
    backgroundColor: "#0B5ED7",
    borderRadius: 30,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  mapText: { 
    color: "#fff", 
    fontWeight: "700", 
    marginLeft: 8 
  },
  mapTextTablet: {
    fontSize: 16,
  },
  mapTextDesktop: {
    fontSize: 18,
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
  aboutTextDesktop: {
    fontSize: 16,
    lineHeight: 26,
  },

  // Action Row
  actionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  callBtn: {
    backgroundColor: "#e51515ee",
    flex: 1,
    borderRadius: 14,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  whatsappBtn: {
    backgroundColor: "#25D366",
    flex: 1,
    borderRadius: 14,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  actionText: { 
    color: "#fff", 
    fontWeight: "700", 
    marginLeft: 6 
  },
  actionTextTablet: {
    fontSize: 16,
  },
  actionTextDesktop: {
    fontSize: 17,
  },

  // Star Rating
  starRow: { 
    flexDirection: "row", 
    marginBottom: 10,
    justifyContent: 'center',
  },
  starButton: {
    marginHorizontal: 4,
  },

  // Review Input
  reviewInput: {
    backgroundColor: "#F8FAFF",
    borderRadius: 10,
    textAlignVertical: "top",
    marginBottom: 10,
  },

  // Review Button
  reviewBtn: {
    backgroundColor: "#0B5ED7",
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
  reviewBtnTextTablet: {
    fontSize: 16,
  },
  reviewBtnTextDesktop: {
    fontSize: 18,
  },

  // Review Box
  reviewBox: {
    backgroundColor: "#F8FAFF",
    borderRadius: 12,
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
  reviewNameTablet: {
    fontSize: 16,
  },
  reviewNameDesktop: {
    fontSize: 17,
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
  reviewTextDesktop: {
    fontSize: 16,
    lineHeight: 24,
  },

  // Video Box
  videoBox: {
    borderRadius: 16,
    overflow: "hidden",
    backgroundColor: "#000",
  },
  videoBoxDesktop: {
    borderRadius: 20,
  },
}); 