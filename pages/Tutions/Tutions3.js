// import React from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   TouchableOpacity,
//   ScrollView,
//   useWindowDimensions,
//   Platform,
// } from "react-native";
// import { SafeAreaView } from "react-native-safe-area-context";
// import { Ionicons } from "@expo/vector-icons";
// import Footer from "../../src/components/Footer";

// export default function InstituteDetails({ navigation }) {
//   const { width } = useWindowDimensions();
//   const isTablet = width >= 768;

//   return (
//     <SafeAreaView style={styles.container}>
//       {/* HEADER */}
//       <View style={styles.header}>
//         <TouchableOpacity onPress={() => navigation.goBack()}>
//           <Ionicons name="arrow-back" size={24} color="#0B5ED7" />
//         </TouchableOpacity>
//         <Text style={styles.headerTitle}>Institute Details</Text>
//         <View style={{ width: 24 }} />
//       </View>

//       <ScrollView
//         showsVerticalScrollIndicator={false}
//         contentContainerStyle={{ paddingBottom: 90 }}
//       >
//         {/* BLUE CARD */}
//         <View
//           style={[
//             styles.heroCard,
//             { marginHorizontal: isTablet ? 24 : 16 },
//           ]}
//         >
//           <View style={styles.badge}>
//             <Text style={styles.badgeText}>Premium Partner</Text>
//           </View>

//           <Text style={styles.instituteName}>
//             Elite Scholars Academy
//           </Text>

//           <Text style={styles.tagline}>
//             Empowering Excellence since 2012
//           </Text>

//           <View style={styles.infoRow}>
//             <Ionicons name="school-outline" size={16} color="#DCE8FF" />
//             <Text style={styles.infoText}>
//               8th – 12th Grade (All Boards)
//             </Text>
//           </View>

//           <View style={styles.infoRow}>
//             <Ionicons name="location-outline" size={16} color="#DCE8FF" />
//             <Text style={styles.infoText}>
//               Downtown, New York
//             </Text>
//           </View>
//         </View>

//         {/* SUBJECTS */}
//         <View
//           style={[
//             styles.section,
//             { marginHorizontal: isTablet ? 24 : 16 },
//           ]}
//         >
//           <View style={styles.sectionHeader}>
//             <Ionicons name="book-outline" size={18} color="#0B5ED7" />
//             <Text style={styles.sectionTitle}>Subjects Offered</Text>
//           </View>

//           <View style={styles.chips}>
//             <Text style={styles.chip}>Mathematics</Text>
//             <Text style={styles.chip}>Physics</Text>
//             <Text style={styles.chip}>Chemistry</Text>
//           </View>
//         </View>

//         {/* TEACHING MODE */}
//         <View
//           style={[
//             styles.section,
//             { marginHorizontal: isTablet ? 24 : 16 },
//           ]}
//         >
//           <View style={styles.sectionHeader}>
//             <Ionicons name="people-outline" size={18} color="#0B5ED7" />
//             <Text style={styles.sectionTitle}>Teaching Mode</Text>
//           </View>

//           <View style={styles.modeRow}>
//             <View style={styles.modeCard}>
//               <Ionicons name="business-outline" size={22} color="#0B5ED7" />
//               <Text style={styles.modeTitle}>Offline</Text>
//               <Text style={styles.modeSub}>In-person center</Text>
//             </View>

//             <View style={styles.modeCard}>
//               <Ionicons name="videocam-outline" size={22} color="#0B5ED7" />
//               <Text style={styles.modeTitle}>Online</Text>
//               <Text style={styles.modeSub}>Live sessions</Text>
//             </View>
//           </View>
//         </View>

//         {/* MAP BUTTON */}
//         <TouchableOpacity
//           activeOpacity={0.85}
//           style={[
//             styles.mapButton,
//             { marginHorizontal: isTablet ? 24 : 16 },
//           ]}
//         >
//           <Ionicons name="map-outline" size={18} color="#fff" />
//           <Text style={styles.mapButtonText}>View on Map</Text>
//         </TouchableOpacity>

//         {/* ABOUT */}
//         <View
//           style={[
//             styles.aboutCard,
//             { marginHorizontal: isTablet ? 24 : 16 },
//           ]}
//         >
//           <View style={styles.sectionHeader}>
//             <Ionicons
//               name="information-circle-outline"
//               size={18}
//               color="#0B5ED7"
//             />
//             <Text style={styles.sectionTitle}>About Institute</Text>
//           </View>

//           <Text style={styles.aboutText}>
//             Elite Scholars Academy has been a leader in supplemental
//             education for over 10 years, focusing on holistic
//             development and academic excellence through personalized
//             attention.
//           </Text>
//         </View>
//       </ScrollView>

//       {/* BOTTOM TAB (UI ONLY) */}
//       <View
//         style={[
//           styles.bottomTab,
//           { height: isTablet ? 72 : 60 },
//         ]}
//       >
        
//       </View>
//       <Footer/>
//     </SafeAreaView>
//   );
// }

// /* ================= STYLES ================= */

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#EEF6FF",
//   },

//   header: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "space-between",
//     paddingHorizontal: 16,
//     paddingVertical: 10,
//   },

//   headerTitle: {
//     fontSize: 18,
//     fontWeight: "700",
//     color: "#000",
//   },

//   heroCard: {
//     backgroundColor: "#0B5ED7",
//     borderRadius: 18,
//     padding: 16,
//     marginTop: 10,
//   },

//   badge: {
//     alignSelf: "flex-start",
//     backgroundColor: "rgba(255,255,255,0.2)",
//     paddingHorizontal: 10,
//     paddingVertical: 4,
//     borderRadius: 20,
//     marginBottom: 8,
//   },

//   badgeText: {
//     color: "#fff",
//     fontSize: 11,
//     fontWeight: "600",
//   },

//   instituteName: {
//     color: "#fff",
//     fontSize: 20,
//     fontWeight: "800",
//     marginBottom: 4,
//   },

//   tagline: {
//     color: "#DCE8FF",
//     fontSize: 12,
//     marginBottom: 10,
//   },

//   infoRow: {
//     flexDirection: "row",
//     alignItems: "center",
//     marginTop: 6,
//   },

//   infoText: {
//     color: "#DCE8FF",
//     fontSize: 12,
//     marginLeft: 6,
//   },

//   section: {
//     marginTop: 22,
//   },

//   sectionHeader: {
//     flexDirection: "row",
//     alignItems: "center",
//     marginBottom: 10,
//   },

//   sectionTitle: {
//     marginLeft: 6,
//     fontSize: 16,
//     fontWeight: "700",
//     color: "#000",
//   },

//   chips: {
//     flexDirection: "row",
//     flexWrap: "wrap",
//   },

//   chip: {
//     backgroundColor: "#E8F1FF",
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
//     backgroundColor: "#fff",
//     borderRadius: 16,
//     padding: 14,
//     alignItems: "center",

//     elevation: Platform.OS === "android" ? 3 : 0,
//     shadowColor: "#000",
//     shadowOpacity: 0.06,
//     shadowRadius: 6,
//     shadowOffset: { width: 0, height: 3 },
//   },

//   modeTitle: {
//     marginTop: 6,
//     fontSize: 14,
//     fontWeight: "700",
//     color: "#000",
//   },

//   modeSub: {
//     fontSize: 11,
//     color: "#5F6F81",
//     marginTop: 2,
//   },

//   mapButton: {
//     marginTop: 22,
//     backgroundColor: "#0B5ED7",
//     borderRadius: 30,
//     paddingVertical: 14,
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "center",
//   },

//   mapButtonText: {
//     color: "#fff",
//     fontSize: 14,
//     fontWeight: "700",
//     marginLeft: 8,
//   },

//   aboutCard: {
//     backgroundColor: "#fff",
//     borderRadius: 16,
//     padding: 16,
//     marginTop: 22,

//     elevation: Platform.OS === "android" ? 3 : 0,
//     shadowColor: "#000",
//     shadowOpacity: 0.06,
//     shadowRadius: 6,
//     shadowOffset: { width: 0, height: 3 },
//   },

//   aboutText: {
//     fontSize: 13,
//     color: "#5F6F81",
//     lineHeight: 20,
//   },

//   bottomTab: {
//     position: "absolute",
//     bottom: 0,
//     left: 0,
//     right: 0,
//     backgroundColor: "#fff",
//     borderTopWidth: 1,
//     borderColor: "#E5EAF0",
//     flexDirection: "row",
//     justifyContent: "space-around",
//     alignItems: "center",
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
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { WebView } from "react-native-webview";
import Footer from "../../src/components/Footer";

/* ===== TOP ADS ===== */
const ads = [
  "https://images.unsplash.com/photo-1516321318423-f06f85e504b3",
  "https://images.unsplash.com/photo-1509062522246-3755977927d7",
  "https://images.unsplash.com/photo-1551650975-87deedd944c3",
];

export default function InstituteDetails({ navigation }) {
  const { width } = useWindowDimensions();
  const isTablet = width >= 768;

  const adRef = useRef(null);
  const [activeAd, setActiveAd] = useState(0);

  /* AUTO SCROLL ADS */
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveAd((prev) => {
        const next = (prev + 1) % ads.length;
        adRef.current?.scrollTo({
          x: next * width,
          animated: true,
        });
        return next;
      });
    }, 3000);
    return () => clearInterval(timer);
  }, [width]);

  /* ACTIONS */
  const openMap = () => {
    Linking.openURL(
      "https://www.google.com/maps/search/?api=1&query=Elite+Scholars+Academy"
    );
  };

  const callNow = () => {
    Linking.openURL("tel:9876543210");
  };

  const openWhatsApp = () => {
    Linking.openURL("https://wa.me/919876543210");
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* ===== HEADER ===== */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Institute Details</Text>

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
          {ads.map((img, index) => (
            <Image
              key={index}
              source={{ uri: img }}
              style={{
                width,
                height: isTablet ? 160 : 180,
              }}
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
          <Text style={styles.instituteName}>
            Elite Scholars Academy
          </Text>

          <Text style={styles.tagline}>
            Empowering Excellence since 2012
          </Text>

          <View style={styles.infoRow}>
            <Ionicons name="school-outline" size={16} color="#E8F0FF" />
            <Text style={styles.infoText}>
              8th – 12th Grade · All Boards
            </Text>
          </View>

          <View style={styles.infoRow}>
            <Ionicons name="location-outline" size={16} color="#E8F0FF" />
            <Text style={styles.infoText}>
              Downtown, New York
            </Text>
          </View>
        </View>

        {/* ===== SUBJECTS OFFERED ===== */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Subjects Offered</Text>
          <View style={styles.chips}>
            <Text style={styles.chip}>Mathematics</Text>
            <Text style={styles.chip}>Physics</Text>
            <Text style={styles.chip}>Chemistry</Text>
          </View>
        </View>

        {/* ===== TEACHING MODE ===== */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Teaching Mode</Text>

          <View style={styles.modeRow}>
            <View style={styles.modeCard}>
              <Ionicons name="business-outline" size={22} color="#0B5ED7" />
              <Text style={styles.modeTitle}>Offline</Text>
              <Text style={styles.modeSub}>Classroom learning</Text>
            </View>

            <View style={styles.modeCard}>
              <Ionicons name="videocam-outline" size={22} color="#0B5ED7" />
              <Text style={styles.modeTitle}>Online</Text>
              <Text style={styles.modeSub}>Live sessions</Text>
            </View>
          </View>
        </View>

        {/* ===== VIEW MAP ===== */}
        <TouchableOpacity style={styles.mapButton} onPress={openMap}>
          <Ionicons name="map-outline" size={18} color="#fff" />
          <Text style={styles.mapText}>View on Map</Text>
        </TouchableOpacity>

        {/* ===== ABOUT ===== */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>About Institute</Text>
          <Text style={styles.aboutText}>
            Elite Scholars Academy has been a trusted name in
            academic coaching for over a decade, delivering
            consistent results through personalized mentoring
            and strong academic foundations.
          </Text>
        </View>

        {/* ===== CALL & WHATSAPP ===== */}
        <View style={styles.actionRow}>
          <TouchableOpacity style={styles.callBtn} onPress={callNow}>
            <Ionicons name="call" size={18} color="#fff" />
            <Text style={styles.actionText}>Call</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.whatsappBtn}
            onPress={openWhatsApp}
          >
            <Ionicons name="logo-whatsapp" size={18} color="#fff" />
            <Text style={styles.actionText}>WhatsApp</Text>
          </TouchableOpacity>
        </View>

        {/* ===== YOUTUBE VIDEO ===== */}
        <View style={styles.videoBox}>
          <WebView
            allowsFullscreenVideo
            source={{
              uri:
                "https://www.youtube.com/watch?v=NONufn3jgXI&pp=ygUNdHV0aW9uIGNlbnRyZQ%3D%3D",
            }}
            style={{ height: isTablet ? 260 : 250 }}
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
    padding: 16,
  },

  instituteName: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "800",
  },

  tagline: {
    color: "#DCE8FF",
    fontSize: 12,
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

  modeRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  modeCard: {
    width: "48%",
    backgroundColor: "#F8FAFF",
    borderRadius: 14,
    padding: 14,
    alignItems: "center",
  },

  modeTitle: {
    marginTop: 6,
    fontSize: 14,
    fontWeight: "700",
  },

  modeSub: {
    fontSize: 11,
    color: "#5F6F81",
    marginTop: 2,
  },

  mapButton: {
    margin: 16,
    backgroundColor: "#0B5ED7",
    paddingVertical: 14,
    borderRadius: 30,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },

  mapText: {
    color: "#fff",
    fontWeight: "700",
    marginLeft: 8,
  },

  aboutText: {
    fontSize: 13,
    color: "#5F6F81",
    lineHeight: 20,
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
    marginLeft: 10,
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
    marginTop:32,
    overflow: "hidden",
    backgroundColor: "#000",
  },
});

