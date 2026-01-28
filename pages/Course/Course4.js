import React, { useRef, useEffect, useState, useMemo } from "react";
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
  useWindowDimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { WebView } from "react-native-webview";
import Footer from "../../src/components/Footer";

const { width, height } = Dimensions.get("window");

/* -------- RESPONSIVE UTILITIES -------- */
const isMobile = width < 768;
const isTablet = width >= 768 && width < 1024;
const isDesktop = width >= 1024;

// Responsive scaling function
const scale = (size) => {
  if (isDesktop) return size * 1.2;
  if (isTablet) return size * 1.1;
  return size;
};

// Responsive value selector
const responsiveValue = (mobile, tablet, desktop) => {
  if (isDesktop) return desktop;
  if (isTablet) return tablet;
  return mobile;
};

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
  const { width: windowWidth } = useWindowDimensions();

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
        bannerRef.current?.scrollTo({ x: next * windowWidth, animated: true });
        return next;
      });
    }, 3000);
    return () => clearInterval(timer);
  }, [windowWidth]);

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

  // Calculate card width for consistent sizing
  const cardWidth = useMemo(() => {
    const padding = responsiveValue(16, 24, 32);
    return windowWidth - (padding * 2);
  }, [windowWidth]);

  // Responsive mode card width (for side-by-side layout)
  const modeCardWidth = useMemo(() => {
    const padding = responsiveValue(16, 24, 32);
    const gap = responsiveValue(12, 16, 20);
    const availableWidth = windowWidth - (padding * 2);
    
    if (isMobile) {
      return availableWidth; // Full width for mobile
    }
    // For tablet/desktop: (total width - gap) / 2
    return (availableWidth - gap) / 2;
  }, [windowWidth]);

  // Responsive star size
  const starSize = useMemo(() => {
    return responsiveValue(28, 32, 36);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0052A2" />

      {/* ===== HEADER ===== */}
      <View style={styles.headerWrapper}>
        <View style={[
          styles.header, 
          { 
            height: responsiveValue(
              Platform.OS === "ios" ? 52 : 64,
              Platform.OS === "ios" ? 60 : 72,
              Platform.OS === "ios" ? 68 : 80
            ),
            paddingHorizontal: responsiveValue(16, 24, 32)
          }
        ]}>
          <TouchableOpacity 
            onPress={() => navigation.goBack()}
            style={styles.backBtn}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Ionicons
              name={Platform.OS === "ios" ? "chevron-back" : "arrow-back"}
              size={scale(24)}
              color="#fff"
            />
          </TouchableOpacity>
          
          <Text style={[styles.headerTitle, { fontSize: scale(18) }]}>
            Course Details
          </Text>
          <View style={{ width: scale(40) }} />
        </View>
      </View>

      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* ===== TOP ADS ===== */}
        <ScrollView
          ref={bannerRef}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onMomentumScrollEnd={(e) =>
            setActiveIndex(Math.round(e.nativeEvent.contentOffset.x / windowWidth))
          }
        >
          {bannerAds.map((img, i) => (
            <Image
              key={i}
              source={{ uri: img }}
              style={{ 
                width: windowWidth, 
                height: responsiveValue(190, 300, 260)
              }}
              resizeMode="cover"
            />
          ))}
        </ScrollView>

        {/* DOTS */}
        <View style={[styles.dots, { marginBottom: responsiveValue(16, 20, 24) }]}>
          {bannerAds.map((_, i) => (
            <View
              key={i}
              style={[
                styles.dot, 
                activeIndex === i && styles.activeDot,
                {
                  width: scale(8),
                  height: scale(8),
                  marginHorizontal: scale(4)
                }
              ]}
            />
          ))}
        </View>

        {/* ===== HERO CARD ===== */}
        <View style={[
          styles.heroCard,
          { 
            width: cardWidth,
            alignSelf: 'center',
            padding: responsiveValue(16, 20, 24),
            borderRadius: scale(18),
            marginBottom: responsiveValue(16, 20, 24),
          }
        ]}>
          <Image 
            source={STUDIO_LOGO} 
            style={[
              styles.logo,
              { 
                width: responsiveValue(90, 110, 130),
                height: responsiveValue(60, 75, 90),
                marginBottom: scale(12)
              }
            ]} 
          />
          <Text style={[
            styles.courseName,
            { fontSize: responsiveValue(20, 24, 28) }
          ]}>
            AK Technologies
          </Text>
          <Text style={[
            styles.tagline,
            { fontSize: responsiveValue(12, 14, 16) }
          ]}>
            IT Training & Placement Support
          </Text>

          <View style={[styles.infoRow, { marginTop: scale(8) }]}>
            <Ionicons name="laptop-outline" size={scale(16)} color="#E8F0FF" />
            <Text style={[
              styles.infoText,
              { fontSize: responsiveValue(12, 14, 16), marginLeft: scale(8) }
            ]}>
              Technical & Professional Courses
            </Text>
          </View>

          <View style={[styles.infoRow, { marginTop: scale(6) }]}>
            <Ionicons name="globe-outline" size={scale(16)} color="#E8F0FF" />
            <Text style={[
              styles.infoText,
              { fontSize: responsiveValue(12, 14, 16), marginLeft: scale(8) }
            ]}>
              www.ak.com
            </Text>
          </View>
        </View>

        {/* ===== MAIN CONTENT CONTAINER ===== */}
        <View style={[
          styles.contentContainer,
          { 
            paddingHorizontal: responsiveValue(16, 24, 32),
          }
        ]}>
          {/* ===== ABOUT COURSE ===== */}
          <View style={[
            styles.sectionCard,
            { 
              width: cardWidth,
              alignSelf: 'center',
              borderRadius: scale(16),
              padding: responsiveValue(16, 20, 24),
              marginBottom: responsiveValue(16, 20, 24),
            }
          ]}>
            <Text style={[
              styles.sectionTitle,
              { fontSize: responsiveValue(16, 18, 20) }
            ]}>
              About Institute
            </Text>
            <Text style={[
              styles.aboutText,
              { 
                fontSize: responsiveValue(13, 14, 15),
                lineHeight: scale(22)
              }
            ]}>
              Founded in 2015, AK Technologies focuses on IT training and placement
              support. The institute offers technical courses including Python,
              Machine Learning, and live project training.
            </Text>
          </View>

          {/* ===== COURSES OFFERED ===== */}
          <View style={[
            styles.sectionCard,
            { 
              width: cardWidth,
              alignSelf: 'center',
              borderRadius: scale(16),
              padding: responsiveValue(16, 20, 24),
              marginBottom: responsiveValue(16, 20, 24),
            }
          ]}>
            <Text style={[
              styles.sectionTitle,
              { fontSize: responsiveValue(16, 18, 20) }
            ]}>
              Courses Offered
            </Text>
            <View style={[
              styles.chips,
              { gap: responsiveValue(8, 10, 12) }
            ]}>
              {["Web Development", "Full Stack Development", "Python", "Data Science"].map((course, index) => (
                <Text 
                  key={index} 
                  style={[
                    styles.chip,
                    { 
                      paddingHorizontal: responsiveValue(12, 14, 16),
                      paddingVertical: responsiveValue(6, 8, 10),
                      borderRadius: scale(10),
                      fontSize: responsiveValue(12, 13, 14)
                    }
                  ]}
                >
                  {course}
                </Text>
              ))}
            </View>
          </View>

          {/* ===== MODE ===== */}
          <View style={[
            styles.sectionCard,
            { 
              width: cardWidth,
              alignSelf: 'center',
              borderRadius: scale(16),
              padding: responsiveValue(16, 20, 24),
              marginBottom: responsiveValue(16, 20, 24),
            }
          ]}>
            <Text style={[
              styles.sectionTitle,
              { fontSize: responsiveValue(16, 18, 20) }
            ]}>
              Mode
            </Text>
            <View style={[
              styles.modeContainer,
              { 
                flexDirection: isMobile ? 'column' : 'row',
                justifyContent: 'space-between',
                gap: responsiveValue(12, 16, 20)
              }
            ]}>
              <View style={[
                styles.modeCard,
                { 
                  width: isMobile ? '100%' : modeCardWidth,
                  marginBottom: isMobile ? responsiveValue(12, 16, 20) : 0,
                }
              ]}>
                <Ionicons name="business-outline" size={scale(22)} color="#0B5ED7" />
                <Text style={[
                  styles.modeTitle,
                  { fontSize: responsiveValue(14, 16, 18), marginTop: scale(8) }
                ]}>
                  Offline
                </Text>
                <Text style={[
                  styles.modeSub,
                  { fontSize: responsiveValue(11, 12, 13), marginTop: scale(4) }
                ]}>
                  Classroom Training
                </Text>
              </View>

              <View style={[
                styles.modeCard,
                { 
                  width: isMobile ? '100%' : modeCardWidth,
                }
              ]}>
                <Ionicons name="videocam-outline" size={scale(22)} color="#0B5ED7" />
                <Text style={[
                  styles.modeTitle,
                  { fontSize: responsiveValue(14, 16, 18), marginTop: scale(8) }
                ]}>
                  Online
                </Text>
                <Text style={[
                  styles.modeSub,
                  { fontSize: responsiveValue(11, 12, 13), marginTop: scale(4) }
                ]}>
                  Live Sessions
                </Text>
              </View>
            </View>
          </View>

          {/* ===== BENEFITS ===== */}
          <View style={[
            styles.sectionCard,
            { 
              width: cardWidth,
              alignSelf: 'center',
              borderRadius: scale(16),
              padding: responsiveValue(16, 20, 24),
              marginBottom: responsiveValue(16, 20, 24),
            }
          ]}>
            <Text style={[
              styles.sectionTitle,
              { fontSize: responsiveValue(16, 18, 20) }
            ]}>
              Benefits
            </Text>
            <Text style={[
              styles.aboutText,
              { 
                fontSize: responsiveValue(13, 14, 15),
                lineHeight: scale(24)
              }
            ]}>
              • Career growth{"\n"}• Industry-ready skills{"\n"}• Flexible learning
            </Text>
          </View>

          {/* ===== CALL & WHATSAPP ===== */}
          <View style={[
            styles.actionRow,
            { 
              width: cardWidth,
              alignSelf: 'center',
              marginBottom: responsiveValue(24, 28, 32),
              gap: responsiveValue(12, 16, 20)
            }
          ]}>
            <TouchableOpacity 
              style={[
                styles.callBtn,
                { 
                  flex: 1,
                  paddingVertical: responsiveValue(14, 16, 18),
                  borderRadius: scale(14),
                }
              ]} 
              onPress={callNow}
            >
              <Ionicons name="call" size={scale(18)} color="#fff" />
              <Text style={[
                styles.actionText,
                { 
                  fontSize: responsiveValue(14, 15, 16),
                  marginLeft: scale(8)
                }
              ]}>
                Call Now
              </Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={[
                styles.whatsappBtn,
                { 
                  flex: 1,
                  paddingVertical: responsiveValue(14, 16, 18),
                  borderRadius: scale(14),
                }
              ]} 
              onPress={openWhatsApp}
            >
              <Ionicons name="logo-whatsapp" size={scale(18)} color="#fff" />
              <Text style={[
                styles.actionText,
                { 
                  fontSize: responsiveValue(14, 15, 16),
                  marginLeft: scale(8)
                }
              ]}>
                WhatsApp
              </Text>
            </TouchableOpacity>
          </View>

          {/* ===== RATE & REVIEW ===== */}
          <View style={[
            styles.sectionCard,
            { 
              width: cardWidth,
              alignSelf: 'center',
              borderRadius: scale(16),
              padding: responsiveValue(16, 20, 24),
              marginBottom: responsiveValue(16, 20, 24),
            }
          ]}>
            <Text style={[
              styles.sectionTitle,
              { fontSize: responsiveValue(16, 18, 20) }
            ]}>
              Rate & Review
            </Text>

            <View style={[
              styles.starRow,
              { 
                marginBottom: responsiveValue(12, 14, 16),
                gap: responsiveValue(8, 10, 12)
              }
            ]}>
              {[1, 2, 3, 4, 5].map((i) => (
                <TouchableOpacity 
                  key={i} 
                  onPress={() => setRating(i)}
                  hitSlop={{ top: 10, bottom: 10, left: 5, right: 5 }}
                >
                  <Ionicons
                    name={i <= rating ? "star" : "star-outline"}
                    size={starSize}
                    color="#FFD700"
                  />
                </TouchableOpacity>
              ))}
            </View>

            <TextInput
              placeholder="Write your review..."
              placeholderTextColor="#888"
              value={reviewText}
              onChangeText={setReviewText}
              multiline
              style={[
                styles.reviewInput,
                { 
                  width: '100%',
                  borderRadius: scale(12),
                  padding: responsiveValue(12, 14, 16),
                  minHeight: responsiveValue(100, 120, 140),
                  fontSize: responsiveValue(14, 15, 16),
                  marginBottom: responsiveValue(12, 14, 16)
                }
              ]}
            />

            <TouchableOpacity 
              style={[
                styles.reviewBtn,
                { 
                  width: '100%',
                  paddingVertical: responsiveValue(12, 14, 16),
                  borderRadius: scale(30),
                }
              ]} 
              onPress={submitReview}
            >
              <Ionicons name="send" size={scale(18)} color="#fff" />
              <Text style={[
                styles.reviewBtnText,
                { 
                  fontSize: responsiveValue(14, 15, 16),
                  marginLeft: scale(8)
                }
              ]}>
                Submit Review
              </Text>
            </TouchableOpacity>
          </View>

          {/* ===== REVIEWS LIST ===== */}
          <View style={[
            styles.sectionCard,
            { 
              width: cardWidth,
              alignSelf: 'center',
              borderRadius: scale(16),
              padding: responsiveValue(16, 20, 24),
              marginBottom: responsiveValue(16, 20, 24),
            }
          ]}>
            <Text style={[
              styles.sectionTitle,
              { fontSize: responsiveValue(16, 18, 20) }
            ]}>
              Student Reviews
            </Text>

            {reviews.map((r, i) => (
              <View 
                key={i} 
                style={[
                  styles.reviewBox,
                  { 
                    width: '100%',
                    borderRadius: scale(12),
                    padding: responsiveValue(12, 14, 16),
                    marginBottom: responsiveValue(12, 14, 16)
                  }
                ]}
              >
                <View style={styles.reviewHeader}>
                  <Text style={[
                    styles.reviewName,
                    { fontSize: responsiveValue(14, 15, 16) }
                  ]}>
                    {r.name}
                  </Text>
                  <View style={{ flexDirection: "row", gap: scale(2) }}>
                    {[1, 2, 3, 4, 5].map((x) => (
                      <Ionicons
                        key={x}
                        name={x <= r.rating ? "star" : "star-outline"}
                        size={scale(14)}
                        color="#FFD700"
                      />
                    ))}
                  </View>
                </View>
                <Text style={[
                  styles.reviewText,
                  { 
                    fontSize: responsiveValue(13, 14, 15),
                    lineHeight: scale(20)
                  }
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
              width: cardWidth,
              alignSelf: 'center',
              marginTop: responsiveValue(32, 36, 40),
              marginBottom: responsiveValue(80, 100, 120),
              height: responsiveValue(220, 300, 300),
              borderRadius: scale(12),
            }
          ]}>
            <WebView
              allowsFullscreenVideo
              source={{ uri: "https://www.youtube.com/embed/NONufn3jgXI" }}
              style={{ flex: 1 }}
            />
          </View>
        </View>
      </ScrollView>

      <Footer />
    </SafeAreaView>
  );
}

/* ================= STYLES ================= */
const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: "#F6F9FF",
  },
  
  scrollContent: {
    paddingBottom: responsiveValue(80, 100, 120),
    alignItems: 'center',
  },

  headerWrapper: { 
    backgroundColor: "#0052A2",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 4,
    width: '100%',
  },
  
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  
  backBtn: {
    alignItems: 'flex-start',
    padding: scale(4),
  },
  
  headerTitle: {
    color: "#fff",
    fontWeight: "700",
    textAlign: "center",
    flex: 1,
  },
  
  dots: {
    flexDirection: "row",
    justifyContent: "center",
    width: '100%',
  },
  
  dot: {
    borderRadius: scale(4),
    backgroundColor: "#ccc",
  },
  
  activeDot: {
    width: scale(16),
    backgroundColor: "#0B5ED7",
  },
  
  heroCard: {
    backgroundColor: "#4c73ac",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
  },
  
  logo: {
    resizeMode: "contain",
  },
  
  courseName: {
    color: "#fff",
    fontWeight: "800",
    textAlign: "center",
  },
  
  tagline: {
    color: "#DCE8FF",
    textAlign: "center",
    marginTop: scale(4),
  },
  
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    width: '100%',
    justifyContent: 'center',
  },
  
  infoText: {
    color: "#E8F0FF",
  },
  
  contentContainer: {
    width: '100%',
    alignItems: 'center',
  },
  
  sectionCard: {
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 3,
  },
  
  sectionTitle: {
    fontWeight: "700",
    color: "#004780",
    marginBottom: scale(12),
  },
  
  aboutText: {
    color: "#5F6F81",
    width: '100%',
  },
  
  chips: {
    flexDirection: "row",
    flexWrap: "wrap",
    width: '100%',
  },
  
  chip: {
    backgroundColor: "#E8F0FF",
    color: "#0B5ED7",
    fontWeight: "600",
  },
  
  modeContainer: {
    width: '100%',
  },
  
  modeCard: {
    backgroundColor: "#F8FAFF",
    alignItems: "center",
    padding: responsiveValue(14, 16, 18),
    borderRadius: scale(14),
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  
  modeTitle: {
    fontWeight: "700",
    color: "#0B5ED7",
  },
  
  modeSub: {
    color: "#5F6F81",
    textAlign: "center",
  },
  
  actionRow: {
    flexDirection: "row",
  },
  
  callBtn: {
    backgroundColor: "#e51515ee",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#e51515",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  
  whatsappBtn: {
    backgroundColor: "#25D366",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#25D366",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  
  actionText: {
    color: "#fff",
    fontWeight: "700",
  },
  
  starRow: {
    flexDirection: "row",
    justifyContent: "center",
    width: '100%',
  },
  
  reviewInput: {
    backgroundColor: "#F8FAFF",
    borderWidth: 1,
    borderColor: "#E8F0FF",
    color: "#333",
  },
  
  reviewBtn: {
    backgroundColor: "#0B5ED7",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#0B5ED7",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  
  reviewBtnText: {
    color: "#fff",
    fontWeight: "700",
  },
  
  reviewBox: {
    backgroundColor: "#F8FAFF",
    borderLeftWidth: 3,
    borderLeftColor: "#0B5ED7",
  },
  
  reviewHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: scale(8),
    width: '100%',
  },
  
  reviewName: {
    fontWeight: "700",
    color: "#004780",
  },
  
  reviewText: {
    color: "#5F6F81",
    width: '100%',
  },
  
  videoBox: {
    overflow: "hidden",
    backgroundColor: "#000",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
});