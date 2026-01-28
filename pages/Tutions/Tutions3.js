// import React, { useEffect, useRef, useState } from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   TouchableOpacity,
//   ScrollView,
//   Image,
//   Linking,
//   useWindowDimensions,
//   TextInput,
//   Alert,
// } from "react-native";
// import { SafeAreaView } from "react-native-safe-area-context";
// import { Ionicons } from "@expo/vector-icons";
// import { WebView } from "react-native-webview";
// import Footer from "../../src/components/Footer";

// /* ===== TOP ADS ===== */
// const ads = [
//   "https://images.unsplash.com/photo-1516321318423-f06f85e504b3",
//   "https://images.unsplash.com/photo-1509062522246-3755977927d7",
//   "https://images.unsplash.com/photo-1551650975-87deedd944c3",
// ];

// export default function InstituteDetails({ navigation }) {
//   const { width } = useWindowDimensions();
//   const isTablet = width >= 768;

//   const adRef = useRef(null);
//   const [activeAd, setActiveAd] = useState(0);

//   /* ===== REVIEW STATE ===== */
//   const [rating, setRating] = useState(0);
//   const [reviewText, setReviewText] = useState("");
//   const [reviews, setReviews] = useState([
//     {
//       name: "Student",
//       rating: 5,
//       comment: "Excellent teaching quality and friendly faculty.",
//     },
//   ]);

//   /* AUTO SCROLL ADS */
//   useEffect(() => {
//     const timer = setInterval(() => {
//       setActiveAd((prev) => {
//         const next = (prev + 1) % ads.length;
//         adRef.current?.scrollTo({
//           x: next * width,
//           animated: true,
//         });
//         return next;
//       });
//     }, 3000);
//     return () => clearInterval(timer);
//   }, [width]);

//   /* ACTIONS */
//   const openMap = () =>
//     Linking.openURL(
//       "https://www.google.com/maps/search/?api=1&query=Elite+Scholars+Academy"
//     );

//   const callNow = () => Linking.openURL("tel:9876543210");
//   const openWhatsApp = () =>
//     Linking.openURL("https://wa.me/919876543210");

//   const submitReview = () => {
//     if (rating === 0 || reviewText.trim() === "") {
//       Alert.alert("Incomplete", "Please give rating and write review");
//       return;
//     }

//     setReviews([
//       { name: "Anonymous", rating, comment: reviewText },
//       ...reviews,
//     ]);

//     setRating(0);
//     setReviewText("");
//   };

//   return (
//     <SafeAreaView style={styles.container}>
//       {/* ===== HEADER ===== */}
//       <View style={styles.header}>
//         <TouchableOpacity onPress={() => navigation.goBack()}>
//           <Ionicons name="arrow-back" size={24} color="#fff" />
//         </TouchableOpacity>

//         <Text style={styles.headerTitle}>Institute Details</Text>
//         <View style={{ width: 24 }} />
//       </View>

//       <ScrollView showsVerticalScrollIndicator={false}>
//         {/* ===== TOP ADS ===== */}
//         <ScrollView
//           ref={adRef}
//           horizontal
//           pagingEnabled
//           showsHorizontalScrollIndicator={false}
//         >
//           {ads.map((img, index) => (
//             <Image
//               key={index}
//               source={{ uri: img }}
//               style={{ width, height: isTablet ? 160 : 180 }}
//             />
//           ))}
//         </ScrollView>

//         {/* DOTS */}
//         <View style={styles.dots}>
//           {ads.map((_, i) => (
//             <View
//               key={i}
//               style={[
//                 styles.dot,
//                 activeAd === i && styles.activeDot,
//               ]}
//             />
//           ))}
//         </View>

//         {/* ===== HERO CARD ===== */}
//         <View style={styles.heroCard}>
//           <Text style={styles.instituteName}>
//             Elite Scholars Academy
//           </Text>

//           <Text style={styles.tagline}>
//             Empowering Excellence since 2012
//           </Text>

//           <View style={styles.infoRow}>
//             <Ionicons name="school-outline" size={16} color="#E8F0FF" />
//             <Text style={styles.infoText}>
//               8th – 12th Grade · All Boards
//             </Text>
//           </View>

//           <View style={styles.infoRow}>
//             <Ionicons name="location-outline" size={16} color="#E8F0FF" />
//             <Text style={styles.infoText}>
//               Downtown, New York
//             </Text>
//           </View>
//         </View>

//         {/* ===== SUBJECTS ===== */}
//         <View style={styles.sectionCard}>
//           <Text style={styles.sectionTitle}>Subjects Offered</Text>
//           <View style={styles.chips}>
//             <Text style={styles.chip}>Mathematics</Text>
//             <Text style={styles.chip}>Physics</Text>
//             <Text style={styles.chip}>Chemistry</Text>
//           </View>
//         </View>

//         {/* ===== TEACHING MODE ===== */}
//         <View style={styles.sectionCard}>
//           <Text style={styles.sectionTitle}>Teaching Mode</Text>
//           <View style={styles.modeRow}>
//             <View style={styles.modeCard}>
//               <Ionicons name="business-outline" size={22} color="#0B5ED7" />
//               <Text style={styles.modeTitle}>Offline</Text>
//               <Text style={styles.modeSub}>Classroom learning</Text>
//             </View>

//             <View style={styles.modeCard}>
//               <Ionicons name="videocam-outline" size={22} color="#0B5ED7" />
//               <Text style={styles.modeTitle}>Online</Text>
//               <Text style={styles.modeSub}>Live sessions</Text>
//             </View>
//           </View>
//         </View>

//         {/* ===== MAP ===== */}
//         <TouchableOpacity style={styles.mapButton} onPress={openMap}>
//           <Ionicons name="map-outline" size={18} color="#fff" />
//           <Text style={styles.mapText}>View on Map</Text>
//         </TouchableOpacity>

//         {/* ===== ABOUT ===== */}
//         <View style={styles.sectionCard}>
//           <Text style={styles.sectionTitle}>About Institute</Text>
//           <Text style={styles.aboutText}>
//             Elite Scholars Academy has been a trusted name in academic coaching
//             for over a decade, delivering consistent results through
//             personalized mentoring.
//           </Text>
//         </View>

//         {/* ===== RATE & REVIEW ===== */}
//         <View style={styles.sectionCard}>
//           <Text style={styles.sectionTitle}>Rate & Review</Text>

//           <View style={styles.starRow}>
//             {[1, 2, 3, 4, 5].map((i) => (
//               <TouchableOpacity key={i} onPress={() => setRating(i)}>
//                 <Ionicons
//                   name={i <= rating ? "star" : "star-outline"}
//                   size={28}
//                   color="#FFD700"
//                 />
//               </TouchableOpacity>
//             ))}
//           </View>

//           <TextInput
//             placeholder="Write your review..."
//             value={reviewText}
//             onChangeText={setReviewText}
//             multiline
//             style={styles.reviewInput}
//           />

//           <TouchableOpacity style={styles.reviewBtn} onPress={submitReview}>
//             <Ionicons name="send" size={18} color="#fff" />
//             <Text style={styles.reviewBtnText}>Submit Review</Text>
//           </TouchableOpacity>
//         </View>

//         {/* ===== REVIEWS LIST ===== */}
//         <View style={styles.sectionCard}>
//           {reviews.map((r, i) => (
//             <View key={i} style={styles.reviewCard}>
//               <View style={styles.reviewHeader}>
//                 <Text style={styles.reviewName}>{r.name}</Text>
//                 <View style={{ flexDirection: "row" }}>
//                   {[1, 2, 3, 4, 5].map((x) => (
//                     <Ionicons
//                       key={x}
//                       name={x <= r.rating ? "star" : "star-outline"}
//                       size={14}
//                       color="#FFD700"
//                     />
//                   ))}
//                 </View>
//               </View>
//               <Text style={styles.reviewText}>{r.comment}</Text>
//             </View>
//           ))}
//         </View>

//         {/* ===== CALL & WHATSAPP ===== */}
//         <View style={styles.actionRow}>
//           <TouchableOpacity style={styles.callBtn} onPress={callNow}>
//             <Ionicons name="call" size={18} color="#fff" />
//             <Text style={styles.actionText}>Call</Text>
//           </TouchableOpacity>

//           <TouchableOpacity
//             style={styles.whatsappBtn}
//             onPress={openWhatsApp}
//           >
//             <Ionicons name="logo-whatsapp" size={18} color="#fff" />
//             <Text style={styles.actionText}>WhatsApp</Text>
//           </TouchableOpacity>
//         </View>

//         {/* ===== VIDEO ===== */}
//         <View style={styles.videoBox}>
//           <WebView
//             allowsFullscreenVideo
//             source={{
//               uri:
//                 "https://www.youtube.com/watch?v=NONufn3jgXI",
//             }}
//             style={{ height: isTablet ? 260 : 250 }}
//           />
//         </View>

//         <View style={{ height: 120 }} />
//       </ScrollView>

//       <Footer />
//     </SafeAreaView>
//   );
// }

// /* ================= STYLES ================= */

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: "#F6F9FF" },

//   header: {
//     backgroundColor: "#0052A2",
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "space-between",
//     padding: 16,
//   },

//   headerTitle: {
//     color: "#fff",
//     fontSize: 22,
//     fontWeight: "700",
//   },

//   dots: {
//     flexDirection: "row",
//     justifyContent: "center",
//     marginVertical: 8,
//   },

//   dot: {
//     width: 8,
//     height: 8,
//     borderRadius: 4,
//     backgroundColor: "#ccc",
//     marginHorizontal: 4,
//   },

//   activeDot: {
//     width: 16,
//     backgroundColor: "#0B5ED7",
//   },

//   heroCard: {
//     backgroundColor: "#4c73ac",
//     margin: 16,
//     borderRadius: 18,
//     padding: 16,
//   },

//   instituteName: {
//     color: "#fff",
//     fontSize: 20,
//     fontWeight: "800",
//   },

//   tagline: {
//     color: "#DCE8FF",
//     fontSize: 12,
//     marginTop: 4,
//     marginBottom: 10,
//   },

//   infoRow: {
//     flexDirection: "row",
//     alignItems: "center",
//     marginTop: 6,
//   },

//   infoText: {
//     color: "#E8F0FF",
//     fontSize: 12,
//     marginLeft: 6,
//   },

//   sectionCard: {
//     backgroundColor: "#fff",
//     marginHorizontal: 16,
//     marginTop: 16,
//     borderRadius: 16,
//     padding: 16,
//   },

//   sectionTitle: {
//     fontSize: 16,
//     fontWeight: "700",
//     marginBottom: 10,
//   },

//   chips: {
//     flexDirection: "row",
//     flexWrap: "wrap",
//   },

//   chip: {
//     backgroundColor: "#E8F0FF",
//     color: "#0B5ED7",
//     paddingHorizontal: 12,
//     paddingVertical: 6,
//     borderRadius: 10,
//     fontSize: 12,
//     marginRight: 8,
//     marginBottom: 8,
//   },

//   modeRow: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//   },

//   modeCard: {
//     width: "48%",
//     backgroundColor: "#F8FAFF",
//     borderRadius: 14,
//     padding: 14,
//     alignItems: "center",
//   },

//   modeTitle: {
//     marginTop: 6,
//     fontSize: 14,
//     fontWeight: "700",
//   },

//   modeSub: {
//     fontSize: 11,
//     color: "#5F6F81",
//     marginTop: 2,
//   },

//   mapButton: {
//     margin: 16,
//     backgroundColor: "#0B5ED7",
//     paddingVertical: 14,
//     borderRadius: 30,
//     flexDirection: "row",
//     justifyContent: "center",
//     alignItems: "center",
//   },

//   mapText: {
//     color: "#fff",
//     fontWeight: "700",
//     marginLeft: 8,
//   },

//   aboutText: {
//     fontSize: 13,
//     color: "#5F6F81",
//     lineHeight: 20,
//   },

//   actionRow: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     marginHorizontal: 16,
//     marginTop: 16,
//   },

//   callBtn: {
//     backgroundColor: "#e51515ee",
//     flex: 1,
//     marginRight: 8,
//     paddingVertical: 14,
//     borderRadius: 14,
//     flexDirection: "row",
//     justifyContent: "center",
//     alignItems: "center",
//   },

//   whatsappBtn: {
//     backgroundColor: "#25D366",
//     flex: 1,
//     marginLeft: 10,
//     paddingVertical: 14,
//     borderRadius: 14,
//     flexDirection: "row",
//     justifyContent: "center",
//     alignItems: "center",
//   },

//   actionText: {
//     color: "#fff",
//     fontWeight: "700",
//     marginLeft: 6,
//   },

//   starRow: {
//     flexDirection: "row",
//     marginBottom: 10,
//   },

//   reviewInput: {
//     backgroundColor: "#F6F9FF",
//     borderRadius: 12,
//     padding: 12,
//     minHeight: 80,
//     marginBottom: 10,
//   },

//   reviewBtn: {
//     backgroundColor: "#0B5ED7",
//     paddingVertical: 12,
//     borderRadius: 30,
//     flexDirection: "row",
//     justifyContent: "center",
//     alignItems: "center",
//   },

//   reviewBtnText: {
//     color: "#fff",
//     fontWeight: "700",
//     marginLeft: 6,
//   },

//   reviewCard: {
//     backgroundColor: "#F8FAFF",
//     borderRadius: 12,
//     padding: 12,
//     marginBottom: 10,
//   },

//   reviewHeader: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     marginBottom: 6,
//   },

//   reviewName: {
//     fontSize: 14,
//     fontWeight: "700",
//     color: "#0B5ED7",
//   },

//   reviewText: {
//     fontSize: 13,
//     color: "#4B5563",
//   },

//   videoBox: {
//     margin: 2,
//     marginTop: 32,
//     overflow: "hidden",
//     backgroundColor: "#000",
//   },
// });




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
  TextInput,
  Alert,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { WebView } from "react-native-webview";
import Footer from "../../src/components/Footer";

/* ===== TOP ADS ===== */
const ads = [
  "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=1200&auto=format&fit=crop",
];

export default function InstituteDetails({ navigation }) {
  const { width, height } = useWindowDimensions();
  const isTablet = width >= 768;
  const isWeb = Platform.OS === 'web';
  
  const adRef = useRef(null);
  const [activeAd, setActiveAd] = useState(0);

  /* ===== REVIEW STATE ===== */
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [reviews, setReviews] = useState([
    {
      name: "Student",
      rating: 5,
      comment: "Excellent teaching quality and friendly faculty.",
    },
    {
      name: "Parent",
      rating: 4,
      comment: "Good infrastructure and regular parent-teacher meetings.",
    },
  ]);

  /* AUTO SCROLL ADS */
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveAd((prev) => {
        const next = (prev + 1) % ads.length;
        if (!isWeb && adRef.current) {
          adRef.current.scrollTo({
            x: next * width,
            animated: true,
          });
        }
        return next;
      });
    }, 3000);
    return () => clearInterval(timer);
  }, [width, isWeb]);

  /* ACTIONS */
  const openMap = () =>
    Linking.openURL(
      "https://www.google.com/maps/search/?api=1&query=Elite+Scholars+Academy"
    );

  const callNow = () => Linking.openURL("tel:9876543210");
  const openWhatsApp = () =>
    Linking.openURL("https://wa.me/919876543210");

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

  const renderAdSlider = () => {
    if (isWeb) {
      return (
        <Image
          source={{ uri: ads[activeAd] }}
          style={[
            styles.adImage,
            { 
              height: isTablet ? 200 : 180,
            }
          ]}
          resizeMode="cover"
        />
      );
    }
    
    return (
      <ScrollView
        ref={adRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={(e) =>
          setActiveAd(Math.round(e.nativeEvent.contentOffset.x / width))
        }
      >
        {ads.map((img, index) => (
          <Image
            key={index}
            source={{ uri: img }}
            style={{
              width,
              height: isTablet ? 300 : 180,
            }}
            resizeMode="cover"
          />
        ))}
      </ScrollView>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* ===== HEADER ===== */}
      <View style={[
        styles.header,
        {
          paddingHorizontal: isTablet ? 24 : 16,
          paddingVertical: isTablet ? 20 : 16,
        }
      ]}>
        <TouchableOpacity 
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={isTablet ? 28 : 24} color="#fff" />
        </TouchableOpacity>

        <Text style={[
          styles.headerTitle,
          { fontSize: isTablet ? 26 : 22 }
        ]}>
          Institute Details
        </Text>
        
        <View style={{ 
          width: isTablet ? 28 : 24,
          height: isTablet ? 28 : 24,
        }} />
      </View>

      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* ===== TOP ADS ===== */}
        {renderAdSlider()}

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
        <View style={[
          styles.heroCard,
          {
            marginHorizontal: isTablet ? 24 : 16,
            marginTop: isTablet ? 20 : 16,
            padding: isTablet ? 24 : 16,
            borderRadius: isTablet ? 20 : 16,
          }
        ]}>
          <Text style={[
            styles.instituteName,
            { fontSize: isTablet ? 26 : 20 }
          ]}>
            Elite Scholars Academy
          </Text>

          <Text style={[
            styles.tagline,
            { fontSize: isTablet ? 16 : 12 }
          ]}>
            Empowering Excellence since 2012
          </Text>

          <View style={styles.infoRow}>
            <Ionicons name="school-outline" size={isTablet ? 20 : 16} color="#E8F0FF" />
            <Text style={[
              styles.infoText,
              { fontSize: isTablet ? 16 : 12 }
            ]}>
              8th – 12th Grade · All Boards
            </Text>
          </View>

          <View style={styles.infoRow}>
            <Ionicons name="location-outline" size={isTablet ? 20 : 16} color="#E8F0FF" />
            <Text style={[
              styles.infoText,
              { fontSize: isTablet ? 16 : 12 }
            ]}>
              Downtown, New York
            </Text>
          </View>
          
          <View style={styles.infoRow}>
            <Ionicons name="star" size={isTablet ? 20 : 16} color="#FFD700" />
            <Text style={[
              styles.infoText,
              { fontSize: isTablet ? 16 : 12 }
            ]}>
              4.8 Rating (120+ Reviews)
            </Text>
          </View>
        </View>

        {/* ===== SUBJECTS ===== */}
        <View style={[
          styles.sectionCard,
          {
            marginHorizontal: isTablet ? 24 : 16,
            marginTop: isTablet ? 20 : 16,
            padding: isTablet ? 20 : 16,
            borderRadius: isTablet ? 18 : 16,
          }
        ]}>
          <Text style={[
            styles.sectionTitle,
            { fontSize: isTablet ? 22 : 16 }
          ]}>
            Subjects Offered
          </Text>
          <View style={styles.chips}>
            <Text style={[
              styles.chip,
              { fontSize: isTablet ? 16 : 12 }
            ]}>Mathematics</Text>
            <Text style={[
              styles.chip,
              { fontSize: isTablet ? 16 : 12 }
            ]}>Physics</Text>
            <Text style={[
              styles.chip,
              { fontSize: isTablet ? 16 : 12 }
            ]}>Chemistry</Text>
            <Text style={[
              styles.chip,
              { fontSize: isTablet ? 16 : 12 }
            ]}>Biology</Text>
            <Text style={[
              styles.chip,
              { fontSize: isTablet ? 16 : 12 }
            ]}>English</Text>
            <Text style={[
              styles.chip,
              { fontSize: isTablet ? 16 : 12 }
            ]}>Computer Science</Text>
          </View>
        </View>

        {/* ===== TEACHING MODE ===== */}
        <View style={[
          styles.sectionCard,
          {
            marginHorizontal: isTablet ? 24 : 16,
            marginTop: isTablet ? 16 : 12,
            padding: isTablet ? 20 : 16,
            borderRadius: isTablet ? 18 : 16,
          }
        ]}>
          <Text style={[
            styles.sectionTitle,
            { fontSize: isTablet ? 22 : 16 }
          ]}>
            Teaching Mode
          </Text>
          <View style={styles.modeRow}>
            <View style={[
              styles.modeCard,
              {
                width: isTablet ? "48%" : "48%",
                padding: isTablet ? 20 : 14,
                borderRadius: isTablet ? 16 : 14,
              }
            ]}>
              <Ionicons name="business-outline" size={isTablet ? 40 : 22} color="#0B5ED7" />
              <Text style={[
                styles.modeTitle,
                { fontSize: isTablet ? 18 : 14 }
              ]}>
                Offline
              </Text>
              <Text style={[
                styles.modeSub,
                { fontSize: isTablet ? 14 : 11 }
              ]}>
                Classroom learning
              </Text>
            </View>

            <View style={[
              styles.modeCard,
              {
                width: isTablet ? "48%" : "48%",
                padding: isTablet ? 20 : 14,
                borderRadius: isTablet ? 16 : 14,
              }
            ]}>
              <Ionicons name="videocam-outline" size={isTablet ? 40 : 22} color="#0B5ED7" />
              <Text style={[
                styles.modeTitle,
                { fontSize: isTablet ? 18 : 14 }
              ]}>
                Online
              </Text>
              <Text style={[
                styles.modeSub,
                { fontSize: isTablet ? 14 : 11 }
              ]}>
                Live sessions
              </Text>
            </View>
          </View>
        </View>

        {/* ===== MAP ===== */}
        <TouchableOpacity 
          style={[
            styles.mapButton,
            {
              marginHorizontal: isTablet ? 24 : 16,
              marginTop: isTablet ? 20 : 16,
              paddingVertical: isTablet ? 18 : 14,
              borderRadius: isTablet ? 30 : 30,
            }
          ]} 
          onPress={openMap}
        >
          <Ionicons name="map-outline" size={isTablet ? 22 : 18} color="#fff" />
          <Text style={[
            styles.mapText,
            { fontSize: isTablet ? 18 : 14 }
          ]}>
            View on Map
          </Text>
        </TouchableOpacity>

        {/* ===== ABOUT ===== */}
        <View style={[
          styles.sectionCard,
          {
            marginHorizontal: isTablet ? 24 : 16,
            marginTop: isTablet ? 20 : 16,
            padding: isTablet ? 20 : 16,
            borderRadius: isTablet ? 18 : 16,
          }
        ]}>
          <Text style={[
            styles.sectionTitle,
            { fontSize: isTablet ? 22 : 16 }
          ]}>
            About Institute
          </Text>
          <Text style={[
            styles.aboutText,
            { 
              fontSize: isTablet ? 16 : 13,
              lineHeight: isTablet ? 26 : 20
            }
          ]}>
            Elite Scholars Academy has been a trusted name in academic coaching
            for over a decade, delivering consistent results through
            personalized mentoring. Our experienced faculty provides comprehensive
            guidance to help students excel in their academic pursuits.
          </Text>
        </View>

        {/* ===== RATE & REVIEW ===== */}
        <View style={[
          styles.sectionCard,
          {
            marginHorizontal: isTablet ? 24 : 16,
            marginTop: isTablet ? 20 : 16,
            padding: isTablet ? 20 : 16,
            borderRadius: isTablet ? 18 : 16,
          }
        ]}>
          <Text style={[
            styles.sectionTitle,
            { fontSize: isTablet ? 22 : 16 }
          ]}>
            Rate & Review
          </Text>

          <View style={styles.starRow}>
            {[1, 2, 3, 4, 5].map((i) => (
              <TouchableOpacity key={i} onPress={() => setRating(i)}>
                <Ionicons
                  name={i <= rating ? "star" : "star-outline"}
                  size={isTablet ? 36 : 28}
                  color="#FFD700"
                />
              </TouchableOpacity>
            ))}
          </View>

          <TextInput
            placeholder="Write your review here..."
            value={reviewText}
            onChangeText={setReviewText}
            multiline
            style={[
              styles.reviewInput,
              {
                height: isTablet ? 120 : 80,
                fontSize: isTablet ? 16 : 14,
                padding: isTablet ? 16 : 12,
                borderRadius: isTablet ? 14 : 12,
              }
            ]}
            placeholderTextColor="#9CA3AF"
          />

          <TouchableOpacity 
            style={[
              styles.reviewBtn,
              {
                paddingVertical: isTablet ? 16 : 12,
                borderRadius: isTablet ? 30 : 30,
                marginTop: isTablet ? 8 : 0,
              }
            ]} 
            onPress={submitReview}
          >
            <Ionicons name="send" size={isTablet ? 22 : 18} color="#fff" />
            <Text style={[
              styles.reviewBtnText,
              { fontSize: isTablet ? 18 : 14 }
            ]}>
              Submit Review
            </Text>
          </TouchableOpacity>
        </View>

        {/* ===== REVIEWS LIST ===== */}
        <View style={[
          styles.sectionCard,
          {
            marginHorizontal: isTablet ? 24 : 16,
            marginTop: isTablet ? 20 : 16,
            padding: isTablet ? 20 : 16,
            borderRadius: isTablet ? 18 : 16,
          }
        ]}>
          <Text style={[
            styles.sectionTitle,
            { fontSize: isTablet ? 22 : 16 }
          ]}>
            Student Reviews ({reviews.length})
          </Text>
          
          {reviews.map((r, i) => (
            <View key={i} style={[
              styles.reviewCard,
              {
                padding: isTablet ? 16 : 12,
                borderRadius: isTablet ? 14 : 12,
                marginBottom: isTablet ? 16 : 10,
              }
            ]}>
              <View style={styles.reviewHeader}>
                <Text style={[
                  styles.reviewName,
                  { fontSize: isTablet ? 18 : 14 }
                ]}>
                  {r.name}
                </Text>
                <View style={{ flexDirection: "row" }}>
                  {[1, 2, 3, 4, 5].map((x) => (
                    <Ionicons
                      key={x}
                      name={x <= r.rating ? "star" : "star-outline"}
                      size={isTablet ? 18 : 14}
                      color="#FFD700"
                    />
                  ))}
                </View>
              </View>
              <Text style={[
                styles.reviewText,
                { 
                  fontSize: isTablet ? 16 : 13,
                  lineHeight: isTablet ? 24 : 20
                }
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
            marginHorizontal: isTablet ? 24 : 16,
            marginTop: isTablet ? 24 : 16,
          }
        ]}>
          <TouchableOpacity 
            style={[
              styles.callBtn,
              {
                paddingVertical: isTablet ? 18 : 14,
                borderRadius: isTablet ? 16 : 14,
                marginRight: isTablet ? 12 : 8,
              }
            ]} 
            onPress={callNow}
          >
            <Ionicons name="call" size={isTablet ? 22 : 18} color="#fff" />
            <Text style={[
              styles.actionText,
              { fontSize: isTablet ? 18 : 14 }
            ]}>
              Call Now
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.whatsappBtn,
              {
                paddingVertical: isTablet ? 18 : 14,
                borderRadius: isTablet ? 16 : 14,
                marginLeft: isTablet ? 12 : 8,
              }
            ]}
            onPress={openWhatsApp}
          >
            <Ionicons name="logo-whatsapp" size={isTablet ? 22 : 18} color="#fff" />
            <Text style={[
              styles.actionText,
              { fontSize: isTablet ? 18 : 14 }
            ]}>
              WhatsApp
            </Text>
          </TouchableOpacity>
        </View>

        {/* ===== VIDEO ===== */}
        <View style={[
          styles.sectionHeader,
          {
            marginHorizontal: isTablet ? 24 : 16,
            marginTop: isTablet ? 24 : 20,
            marginBottom: isTablet ? 16 : 12,
          }
        ]}>
          <Text style={[
            styles.sectionTitle,
            { fontSize: isTablet ? 22 : 16 }
          ]}>
            Video
          </Text>
        </View>

        <View style={[
          styles.videoContainer,
          {
            marginHorizontal: isTablet ? 24 : 16,
            marginBottom: isTablet ? 32 : 24,
            borderRadius: isTablet ? 18 : 14,
          }
        ]}>
          {isWeb ? (
            <iframe
              width="100%"
              height={isTablet ? 350 : 250}
              src="https://www.youtube.com/embed/NONufn3jgXI?rel=0&showinfo=0&modestbranding=1"
              title="Campus Tour Video"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              style={styles.videoIframe}
            />
          ) : (
            <WebView
              allowsFullscreenVideo
              source={{ uri: "https://www.youtube.com/embed/NONufn3jgXI?rel=0&showinfo=0&modestbranding=1" }}
              style={{ height: isTablet ? 350 : 250 }}
              javaScriptEnabled={true}
              domStorageEnabled={true}
              mediaPlaybackRequiresUserAction={false}
            />
          )}
        </View>

        <View style={{ height: isTablet ? 140 : 120 }} />
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
  
  scrollContent: {
    flexGrow: 1,
  },

  /* HEADER */
  header: {
    backgroundColor: "#0052A2",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 4,
      },
      android: {
        elevation: 6,
      },
      web: {
        boxShadow: "0 4px 12px rgba(0, 82, 162, 0.3)",
      },
    }),
  },

  backButton: {
    padding: 4,
  },

  headerTitle: {
    color: "#fff",
    fontWeight: "700",
    textAlign: "center",
  },

  /* AD IMAGE */
  adImage: {
    width: '100%',
    backgroundColor: '#f0f0f0',
  },

  /* DOTS */
  dots: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 12,
    height: 20,
  },

  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#ccc",
    marginHorizontal: 6,
    transition: "all 0.3s ease",
  },

  activeDot: {
    width: 24,
    height: 8,
    backgroundColor: "#0B5ED7",
  },

  /* HERO CARD */
  heroCard: {
    backgroundColor: "#4c73ac",
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 8,
      },
      android: {
        elevation: 6,
      },
      web: {
        boxShadow: "0 8px 24px rgba(76, 115, 172, 0.4)",
      },
    }),
  },

  instituteName: {
    color: "#fff",
    fontWeight: "800",
    marginBottom: 4,
  },

  tagline: {
    color: "#DCE8FF",
    marginBottom: 12,
    opacity: 0.9,
  },

  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },

  infoText: {
    color: "#E8F0FF",
    marginLeft: 8,
    opacity: 0.95,
  },

  /* SECTION CARD */
  sectionCard: {
    backgroundColor: "#fff",
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 6,
      },
      android: {
        elevation: 3,
      },
      web: {
        boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
      },
    }),
  },

  sectionTitle: {
    fontWeight: "700",
    color: "#000",
    marginBottom: 12,
  },

  /* CHIPS */
  chips: {
    flexDirection: "row",
    flexWrap: "wrap",
  },

  chip: {
    backgroundColor: "#E8F0FF",
    color: "#0B5ED7",
    fontWeight: "500",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
    marginRight: 8,
    marginBottom: 8,
    overflow: "hidden",
  },

  /* MODE ROW */
  modeRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  modeCard: {
    backgroundColor: "#F8FAFF",
    alignItems: "center",
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 3,
      },
      android: {
        elevation: 2,
      },
      web: {
        boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
      },
    }),
  },

  modeTitle: {
    marginTop: 8,
    fontWeight: "700",
    color: "#000",
    textAlign: "center",
  },

  modeSub: {
    color: "#5F6F81",
    marginTop: 4,
    textAlign: "center",
  },

  /* MAP BUTTON */
  mapButton: {
    backgroundColor: "#d70b0b",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.15,
        shadowRadius: 6,
      },
      android: {
        elevation: 5,
      },
      web: {
        boxShadow: "0 4px 12px rgba(11, 94, 215, 0.3)",
        cursor: "pointer",
        transition: "all 0.2s ease",
        ":hover": {
          backgroundColor: "#0A53C1",
          transform: "translateY(-2px)",
          boxShadow: "0 6px 16px rgba(11, 94, 215, 0.4)",
        },
      },
    }),
  },

  mapText: {
    color: "#fff",
    fontWeight: "700",
    marginLeft: 8,
  },

  /* ABOUT TEXT */
  aboutText: {
    color: "#5F6F81",
  },

  /* ACTION ROW */
  actionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  callBtn: {
    backgroundColor: "#E53E3E",
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 4,
      },
      web: {
        boxShadow: "0 2px 8px rgba(229, 62, 62, 0.3)",
        cursor: "pointer",
        transition: "all 0.2s ease",
        ":hover": {
          backgroundColor: "#C53030",
          transform: "translateY(-2px)",
          boxShadow: "0 4px 12px rgba(229, 62, 62, 0.4)",
        },
      },
    }),
  },

  whatsappBtn: {
    backgroundColor: "#25D366",
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 4,
      },
      web: {
        boxShadow: "0 2px 8px rgba(37, 211, 102, 0.3)",
        cursor: "pointer",
        transition: "all 0.2s ease",
        ":hover": {
          backgroundColor: "#1DA851",
          transform: "translateY(-2px)",
          boxShadow: "0 4px 12px rgba(37, 211, 102, 0.4)",
        },
      },
    }),
  },

  actionText: {
    color: "#fff",
    fontWeight: "700",
    marginLeft: 8,
  },

  /* STAR ROW */
  starRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 16,
  },

  /* REVIEW INPUT */
  reviewInput: {
    backgroundColor: "#F8FAFF",
    textAlignVertical: "top",
    ...Platform.select({
      web: {
        outlineStyle: "none",
        border: "1px solid #E5E7EB",
      },
    }),
  },

  /* REVIEW BUTTON */
  reviewBtn: {
    backgroundColor: "#0B5ED7",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 4,
      },
      web: {
        boxShadow: "0 2px 8px rgba(11, 94, 215, 0.3)",
        cursor: "pointer",
        transition: "all 0.2s ease",
        ":hover": {
          backgroundColor: "#0A53C1",
          transform: "translateY(-2px)",
          boxShadow: "0 4px 12px rgba(11, 94, 215, 0.4)",
        },
      },
    }),
  },

  reviewBtnText: {
    color: "#fff",
    fontWeight: "700",
    marginLeft: 8,
  },

  /* REVIEW CARD */
  reviewCard: {
    backgroundColor: "#F8FAFF",
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
      },
      android: {
        elevation: 1,
      },
      web: {
        boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
      },
    }),
  },

  reviewHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },

  reviewName: {
    fontWeight: "700",
    color: "#0B5ED7",
  },

  reviewText: {
    color: "#4B5563",
  },

  /* VIDEO CONTAINER */
  videoContainer: {
    overflow: "hidden",
    backgroundColor: "#000",
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 10,
      },
      android: {
        elevation: 8,
      },
      web: {
        boxShadow: "0 8px 32px rgba(0,0,0,0.25)",
      },
    }),
  },

  videoIframe: {
    border: "none",
    borderRadius: 12,
    width: "100%",
    backgroundColor: "#000",
  },

  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});