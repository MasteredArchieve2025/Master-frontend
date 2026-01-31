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
  TextInput,
  Alert,
  Dimensions,
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
  const { width: windowWidth, height: windowHeight } = useWindowDimensions();
  
  // Responsive breakpoints
  const isMobile = windowWidth < 768;
  const isTablet = windowWidth >= 768 && windowWidth < 1024;
  const isDesktop = windowWidth >= 1024;
  
  // Responsive dimensions
  const bannerHeight = isMobile ? 180 : isTablet ? 300 : 300;
  const videoHeight = isMobile ? 200 : isTablet ? 300 : 400;
  const heroCardHeight = isMobile ? 180 : isTablet ? 220 : 260;
  const galleryImageSize = isMobile ? 100 : isTablet ? 130 : 160;
  const sectionPadding = isMobile ? 16 : isTablet ? 20 : 24;
  const maxContentWidth = isDesktop ? 900 : windowWidth;

  const adRef = useRef(null);
  const [activeAd, setActiveAd] = useState(0);

  /* ===== REVIEW STATE ===== */
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [reviews, setReviews] = useState([
    {
      name: "Student",
      rating: 5,
      comment: "Great studio with professional trainers!",
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

  const handleWhatsApp = () =>
    Linking.openURL("whatsapp://send?text=Hello&phone=+123456789");

  const handleCall = () =>
    Linking.openURL("tel:+123456789");

  const submitReview = () => {
    if (rating === 0 || reviewText.trim() === "") {
      Alert.alert("Incomplete", "Please give rating and write review");
      return;
    }

    setReviews([
      { name: "Anonymous", rating, comment: reviewText },
      ...reviews,
    ]);

    setRating(0);
    setReviewText("");
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0052A2" />

      {/* ===== HEADER ===== */}
      <View style={[
        styles.headerWrapper,
        isDesktop && styles.headerWrapperDesktop
      ]}>
        <View style={[
          styles.header,
          isTablet && styles.headerTablet,
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
            Studio Details
          </Text>
          <View style={{ width: isMobile ? 24 : isTablet ? 28 : 32 }} />
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
              style={[
                styles.dot,
                activeAd === i && styles.activeDot,
              ]}
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
              minHeight: heroCardHeight,
              padding: isMobile ? 18 : isTablet ? 22 : 26,
              marginHorizontal: sectionPadding,
            },
            isDesktop && styles.heroCardDesktop
          ]}>
            <Image source={STUDIO_LOGO} style={[
              styles.heroLogo,
              {
                width: isMobile ? 90 : isTablet ? 110 : 130,
                height: isMobile ? 90 : isTablet ? 110 : 130,
                marginBottom: isMobile ? 10 : isTablet ? 12 : 14,
              }
            ]} />
            <Text style={[
              styles.heroTitle,
              isTablet && styles.heroTitleTablet,
              isDesktop && styles.heroTitleDesktop
            ]}>
              eMotion Dance Studio
            </Text>
            <Text style={[
              styles.heroTagline,
              isTablet && styles.heroTaglineTablet,
              isDesktop && styles.heroTaglineDesktop
            ]}>
              Dance · Fitness · Fine Arts
            </Text>

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
                Nagercoil, Tamil Nadu
              </Text>
            </View>
          </View>

          {/* ===== ABOUT ===== */}
          <View style={[
            styles.sectionCard,
            {
              marginHorizontal: sectionPadding,
              padding: isMobile ? 16 : isTablet ? 20 : 24,
              marginTop: isMobile ? 16 : isTablet ? 20 : 24,
            },
            isDesktop && styles.sectionCardDesktop
          ]}>
            <Text style={[
              styles.sectionTitle,
              isTablet && styles.sectionTitleTablet,
              isDesktop && styles.sectionTitleDesktop
            ]}>
              About Studio
            </Text>
            <Text style={[
              styles.sectionText,
              isTablet && styles.sectionTextTablet,
              isDesktop && styles.sectionTextDesktop
            ]}>
              At our renowned dance school, with over 18 years of experience and a
              reputation for exceptional hospitality, we offer a diverse range of
              programs to cater to different interests and passions.
            </Text>
          </View>

          {/* ===== OFFERS ===== */}
          <View style={[
            styles.sectionCard,
            {
              marginHorizontal: sectionPadding,
              padding: isMobile ? 16 : isTablet ? 20 : 24,
            },
            isDesktop && styles.sectionCardDesktop
          ]}>
            <Text style={[
              styles.sectionTitle,
              isTablet && styles.sectionTitleTablet,
              isDesktop && styles.sectionTitleDesktop
            ]}>
              We Offer
            </Text>
            <View style={styles.chips}>
              {["Bharatanatyam", "Western Dance", "Zumba", "Fitness", "Contemporary", "Hip Hop"].map((chip, index) => (
                <Text key={index} style={[
                  styles.chip,
                  isTablet && styles.chipTablet,
                  isDesktop && styles.chipDesktop
                ]}>
                  {chip}
                </Text>
              ))}
            </View>
          </View>

          {/* ===== WEBSITE ===== */}
          <View style={[
            styles.sectionCard,
            {
              marginHorizontal: sectionPadding,
              padding: isMobile ? 16 : isTablet ? 20 : 24,
            },
            isDesktop && styles.sectionCardDesktop
          ]}>
            <Text style={[
              styles.sectionTitle,
              isTablet && styles.sectionTitleTablet,
              isDesktop && styles.sectionTitleDesktop
            ]}>
              Website
            </Text>
            <Text
              style={[
                styles.link,
                isTablet && styles.linkTablet,
                isDesktop && styles.linkDesktop
              ]}
              onPress={() => Linking.openURL("http://www.eMotion.com")}
            >
              www.eMotion.com
            </Text>
          </View>

          {/* ===== GALLERY ===== */}
          <View style={[
            styles.sectionCard,
            {
              marginHorizontal: sectionPadding,
              padding: isMobile ? 16 : isTablet ? 20 : 24,
            },
            isDesktop && styles.sectionCardDesktop
          ]}>
            <Text style={[
              styles.sectionTitle,
              isTablet && styles.sectionTitleTablet,
              isDesktop && styles.sectionTitleDesktop
            ]}>
              Gallery
            </Text>
            <ScrollView 
              horizontal 
              showsHorizontalScrollIndicator={false}
              style={styles.galleryContainer}
            >
              {galleryImages.map((img, i) => (
                <Image 
                  key={i} 
                  source={img} 
                  style={[
                    styles.galleryImage,
                    {
                      width: galleryImageSize,
                      height: galleryImageSize,
                      marginRight: isMobile ? 10 : isTablet ? 14 : 18,
                    }
                  ]} 
                />
              ))}
            </ScrollView>
          </View>

          {/* ===== MASTER ===== */}
          <View style={[
            styles.sectionCard,
            {
              marginHorizontal: sectionPadding,
              padding: isMobile ? 16 : isTablet ? 20 : 24,
            },
            isDesktop && styles.sectionCardDesktop
          ]}>
            <Text style={[
              styles.sectionTitle,
              isTablet && styles.sectionTitleTablet,
              isDesktop && styles.sectionTitleDesktop
            ]}>
              About Our Master
            </Text>
            <Text style={[
              styles.sectionText,
              isTablet && styles.sectionTextTablet,
              isDesktop && styles.sectionTextDesktop
            ]}>
              Mr. Ram Ranjith is a visionary artistic director and accomplished
              fitness instructor with over two decades of experience in dance and
              fine arts.
            </Text>
          </View>

          {/* ===== RATE & REVIEW ===== */}
          <View style={[
            styles.sectionCard,
            {
              marginHorizontal: sectionPadding,
              padding: isMobile ? 16 : isTablet ? 20 : 24,
            },
            isDesktop && styles.sectionCardDesktop
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
              value={reviewText}
              onChangeText={setReviewText}
              multiline
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
              marginHorizontal: sectionPadding,
              padding: isMobile ? 16 : isTablet ? 20 : 24,
            },
            isDesktop && styles.sectionCardDesktop
          ]}>
            {reviews.map((r, i) => (
              <View key={i} style={[
                styles.reviewCard,
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

          {/* ===== CALL & WHATSAPP ===== */}
          <View style={[
            styles.actionRow,
            {
              marginHorizontal: sectionPadding,
              marginTop: isMobile ? 16 : isTablet ? 20 : 24,
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
              onPress={handleCall}
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
              onPress={handleWhatsApp}
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

          {/* ===== VIDEO ===== */}
          <View style={[
            styles.videoBox,
            {
              height: videoHeight,
              marginHorizontal: sectionPadding,
              marginTop: isMobile ? 32 : isTablet ? 40 : 48,
            },
            isDesktop && styles.videoBoxDesktop
          ]}>
            <WebView
              allowsFullscreenVideo
              javaScriptEnabled={true}
              domStorageEnabled={true}
              source={{
                uri: "https://www.youtube.com/embed/NONufn3jgXI?rel=0&modestbranding=1",
              }}
              style={{ flex: 1 }}
            />
          </View>
        </View>

        {/* Spacer for Footer */}
        <View style={{ 
          height: isMobile ? 120 : isTablet ? 140 : 160 
        }} />
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
  headerTablet: {
    padding: 20,
  },
  headerDesktop: {
    padding: 24,
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
    fontSize: 26,
  },
  headerTitleDesktop: {
    fontSize: 30,
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
    alignItems: "center",
    justifyContent: 'center',
  },
  heroCardDesktop: {
    borderRadius: 24,
  },
  heroLogo: {
    resizeMode: "contain",
  },
  heroTitle: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "800",
    textAlign: 'center',
  },
  heroTitleTablet: {
    fontSize: 26,
  },
  heroTitleDesktop: {
    fontSize: 30,
  },
  heroTagline: {
    color: "#DCE8FF",
    fontSize: 13,
    marginTop: 4,
    marginBottom: 10,
    textAlign: 'center',
  },
  heroTaglineTablet: {
    fontSize: 15,
    marginBottom: 12,
  },
  heroTaglineDesktop: {
    fontSize: 17,
    marginBottom: 14,
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
    fontSize: 16,
  },

  // Section Cards
  sectionCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
  },
  sectionCardDesktop: {
    borderRadius: 20,
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
  sectionText: {
    fontSize: 13,
    color: "#5F6F81",
    lineHeight: 20,
    textAlign: "justify",
  },
  sectionTextTablet: {
    fontSize: 15,
    lineHeight: 24,
  },
  sectionTextDesktop: {
    fontSize: 16,
    lineHeight: 26,
  },

  // Chips
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
  chipTablet: {
    fontSize: 14,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 12,
  },
  chipDesktop: {
    fontSize: 15,
    paddingHorizontal: 16,
    paddingVertical: 9,
    borderRadius: 14,
  },

  // Link
  link: {
    color: "#0B5ED7",
    fontSize: 14,
    fontWeight: "600",
  },
  linkTablet: {
    fontSize: 16,
  },
  linkDesktop: {
    fontSize: 18,
  },

  // Gallery
  galleryContainer: {
    marginTop: 8,
  },
  galleryImage: {
    borderRadius: 12,
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
    marginLeft: 6,
  },
  actionTextTablet: {
    fontSize: 16,
  },
  actionTextDesktop: {
    fontSize: 18,
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
    backgroundColor: "#F6F9FF",
    borderRadius: 12,
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

  // Review Cards
  reviewCard: {
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
    color: "#0B5ED7",
  },
  reviewNameTablet: {
    fontSize: 16,
  },
  reviewNameDesktop: {
    fontSize: 18,
  },
  reviewText: {
    fontSize: 13,
    color: "#4B5563",
  },
  reviewTextTablet: {
    fontSize: 15,
  },
  reviewTextDesktop: {
    fontSize: 16,
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