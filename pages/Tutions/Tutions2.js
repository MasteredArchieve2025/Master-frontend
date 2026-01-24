// import React, { useRef, useState } from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   TouchableOpacity,
//   ScrollView,
//   Image,
//   useWindowDimensions,
//   Platform,
// } from "react-native";
// import { SafeAreaView } from "react-native-safe-area-context";
// import { Ionicons } from "@expo/vector-icons";
// import { Video, ResizeMode } from "expo-av";
// import Footer from "../../src/components/Footer";

// export default function Tution2({ navigation }) {
//   const { width } = useWindowDimensions();
//   const isTablet = width >= 768;
//   const videoRef = useRef(null);
//   const [status, setStatus] = useState({});

//   const institutes = [
//     {
//       name: "Apex Learning Center",
//       location: "Downtown · 1.2 km away",
//       subjects: "Maths, Physics, Chemistry",
//       board: "CBSE",
//       mode: "Full-time",
//       rating: 4.8,
//       image:
//         "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f",
//     },
//     {
//       name: "Bright Minds Academy",
//       location: "North Riverside · 3.5 km away",
//       subjects: "English, History, Biology",
//       board: "ICSE",
//       mode: "Weekend",
//       rating: 4.5,
//       image:
//         "https://images.unsplash.com/photo-1522202176988-66273c2fd55f",
//     },
//     {
//       name: "Quantum Scholars",
//       location: "South Valley · 5.0 km away",
//       subjects: "Advanced Maths, Physics",
//       board: "CBSE",
//       mode: "Online + Offline",
//       rating: 4.9,
//       image:
//         "https://images.unsplash.com/photo-1509062522246-3755977927d7",
//     },
//   ];

//   return (
//     <SafeAreaView style={styles.container}>
//       {/* HEADER */}
//       <View style={styles.header}>
//         <TouchableOpacity onPress={() => navigation.goBack()}>
//           <Ionicons name="arrow-back" size={24} color="#0B5ED7" />
//         </TouchableOpacity>

//         <View>
//           <Text style={styles.headerTitle}>Tuition Institutes</Text>
//           <Text style={styles.headerSubtitle}>
//             Grade 10 · Science Stream
//           </Text>
//         </View>

//         <View style={{ width: 24 }} />
//       </View>

//       <ScrollView showsVerticalScrollIndicator={false}>
//         {/* TOP AD BANNER - IMAGE ONLY */}
//         <TouchableOpacity 
//           style={[
//             styles.adImageContainer,
//             { marginTop: 10 }
//           ]}
//           activeOpacity={0.8}
//         >
//           <Image
//             source={{
//               uri: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
//             }}
//             style={[
//               styles.adImage,
//               {
//                 height: isTablet ? 140 : 100,
//               },
//             ]}
//             resizeMode="cover"
//           />
//         </TouchableOpacity>

//         {/* BANNER */}
//         <View style={styles.banner}>
//           <Text style={styles.bannerTitle}>
//             Available Tuition Centers
//           </Text>
//           <Text style={styles.bannerSubtitle}>
//             Find the best educators near you for Grade 10
//           </Text>
//         </View>

//         {/* SECTION HEADER */}
//         <View style={styles.sectionHeader}>
//           <Text style={styles.sectionTitle}>Nearby Institutes</Text>
//           <Text style={styles.seeAll}>See all</Text>
//         </View>

//         {/* INSTITUTE LIST */}
//         {institutes.map((item, index) => (
//           <TouchableOpacity
//             key={index}
//             activeOpacity={0.8}
//             style={styles.card}
//             onPress={() => navigation.navigate("Tutions3")}
//           >
//             <Image source={{ uri: item.image }} style={styles.image} />

//             <View style={styles.cardContent}>
//               <View style={styles.cardTop}>
//                 <Text style={styles.name}>{item.name}</Text>
//                 <Text style={styles.rating}>⭐ {item.rating}</Text>
//               </View>

//               <Text style={styles.location}>📍 {item.location}</Text>

//               <Text style={styles.subjects}>{item.subjects}</Text>

//               <View style={styles.tags}>
//                 <Text style={styles.tagBlue}>{item.board}</Text>
//                 <Text style={styles.tagGray}>{item.mode}</Text>
//               </View>
//             </View>

//             <Ionicons
//               name="chevron-forward"
//               size={20}
//               color="#0B5ED7"
//             />
//           </TouchableOpacity>
//         ))}

//         {/* MIDDLE AD BANNER - IMAGE ONLY */}
//         <TouchableOpacity 
//           style={styles.adImageContainer}
//           activeOpacity={0.8}
//         >
//           <Image
//             source={{
//               uri: "https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
//             }}
//             style={[
//               styles.adImage,
//               {
//                 height: isTablet ? 120 : 80,
//               },
//             ]}
//             resizeMode="cover"
//           />
//         </TouchableOpacity>

//         {/* SECTION HEADER FOR VIDEO */}
//         <View style={styles.sectionHeader}>
//           <Text style={styles.sectionTitle}>Featured Video</Text>
//         </View>

//         {/* VIDEO AD - VIDEO ONLY */}
//         <View style={styles.videoContainer}>
//           <Video
//             ref={videoRef}
//             style={[
//               styles.video,
//               {
//                 height: isTablet ? 220 : 180,
//               },
//             ]}
//             source={{
//               uri: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
//             }}
//             resizeMode={ResizeMode.COVER}
//             isLooping
//             shouldPlay
//             onPlaybackStatusUpdate={status => setStatus(() => status)}
//           />
//           {/* Simple Play Button Overlay */}
//           {!status.isPlaying && (
//             <TouchableOpacity
//               style={styles.playButtonOverlay}
//               onPress={() => videoRef.current.playAsync()}
//             >
//               <Ionicons name="play-circle" size={60} color="rgba(255,255,255,0.9)" />
//             </TouchableOpacity>
//           )}
//         </View>

//         {/* BOTTOM AD BANNER - IMAGE ONLY */}
//         <TouchableOpacity 
//           style={styles.adImageContainer}
//           activeOpacity={0.8}
//         >
         
//         </TouchableOpacity>

//         <View style={{ height: 120 }} />
//       </ScrollView>

//       {/* BOTTOM TAB */}
//       <View
//         style={[
//           styles.bottomTab,
//           { height: isTablet ? 72 : 60 },
//         ]}
//       />
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

//   /* HEADER */
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

//   headerSubtitle: {
//     fontSize: 12,
//     color: "#5F6F81",
//   },

//   /* BANNER */
//   banner: {
//     backgroundColor: "#0B5ED7",
//     marginHorizontal: 16,
//     borderRadius: 16,
//     padding: 16,
//     marginTop: 10,
//     marginBottom: 10,
//   },

//   bannerTitle: {
//     color: "#fff",
//     fontSize: 16,
//     fontWeight: "700",
//   },

//   bannerSubtitle: {
//     color: "#DCE8FF",
//     fontSize: 12,
//     marginTop: 4,
//   },

//   /* SECTION */
//   sectionHeader: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     marginHorizontal: 16,
//     marginTop: 18,
//     marginBottom: 8,
//   },

//   sectionTitle: {
//     fontSize: 16,
//     fontWeight: "700",
//     color: "#000",
//   },

//   seeAll: {
//     fontSize: 12,
//     color: "#0B5ED7",
//   },

//   /* CARD */
//   card: {
//     backgroundColor: "#fff",
//     marginHorizontal: 16,
//     marginBottom: 14,
//     borderRadius: 16,
//     flexDirection: "row",
//     alignItems: "center",
//     padding: 12,

//     elevation: Platform.OS === "android" ? 3 : 0,
//     shadowColor: "#000",
//     shadowOpacity: 0.06,
//     shadowRadius: 6,
//     shadowOffset: { width: 0, height: 3 },
//   },

//   image: {
//     width: 70,
//     height: 70,
//     borderRadius: 12,
//   },

//   cardContent: {
//     flex: 1,
//     marginLeft: 12,
//   },

//   cardTop: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//   },

//   name: {
//     fontSize: 15,
//     fontWeight: "700",
//     color: "#000",
//     flex: 1,
//   },

//   rating: {
//     fontSize: 12,
//     color: "#FFB703",
//     marginLeft: 6,
//   },

//   location: {
//     fontSize: 12,
//     color: "#5F6F81",
//     marginTop: 4,
//   },

//   subjects: {
//     fontSize: 12,
//     color: "#000",
//     marginTop: 6,
//   },

//   tags: {
//     flexDirection: "row",
//     marginTop: 8,
//   },

//   tagBlue: {
//     backgroundColor: "#E8F1FF",
//     color: "#0B5ED7",
//     fontSize: 11,
//     paddingHorizontal: 8,
//     paddingVertical: 4,
//     borderRadius: 8,
//     marginRight: 8,
//   },

//   tagGray: {
//     backgroundColor: "#F1F3F6",
//     color: "#5F6F81",
//     fontSize: 11,
//     paddingHorizontal: 8,
//     paddingVertical: 4,
//     borderRadius: 8,
//   },

//   /* AD IMAGE CONTAINER */
//   adImageContainer: {
//     marginHorizontal: 16,
//     marginVertical: 12,
//     borderRadius: 12,
//     overflow: "hidden",
//     backgroundColor: "#fff",
//     elevation: Platform.OS === "android" ? 2 : 0,
//     shadowColor: "#000",
//     shadowOpacity: 0.05,
//     shadowRadius: 4,
//     shadowOffset: { width: 0, height: 2 },
//   },

//   adImage: {
//     width: "100%",
//     borderRadius: 12,
//   },

//   /* VIDEO CONTAINER */
//   videoContainer: {
//     marginHorizontal: 16,
//     marginBottom: 20,
//     borderRadius: 12,
//     overflow: "hidden",
//     position: "relative",
//     backgroundColor: "#000",
//     elevation: Platform.OS === "android" ? 3 : 0,
//     shadowColor: "#000",
//     shadowOpacity: 0.1,
//     shadowRadius: 6,
//     shadowOffset: { width: 0, height: 3 },
//   },

//   video: {
//     width: "100%",
//     borderRadius: 12,
//   },

//   playButtonOverlay: {
//     position: "absolute",
//     top: 0,
//     left: 0,
//     right: 0,
//     bottom: 0,
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "rgba(0,0,0,0.1)",
//   },

//   /* BOTTOM TAB */
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


import React, { useRef, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  useWindowDimensions,
  Platform,
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

export default function Tution2({ navigation }) {
  const { width } = useWindowDimensions();
  const isTablet = width >= 768;

  const adRef = useRef(null);
  const [adIndex, setAdIndex] = useState(0);
  const [showAll, setShowAll] = useState(false);

  /* AUTO SCROLL ADS */
  useEffect(() => {
    const timer = setInterval(() => {
      setAdIndex((prev) => {
        const next = (prev + 1) % ads.length;
        adRef.current?.scrollTo({ x: next * width, animated: true });
        return next;
      });
    }, 3000);
    return () => clearInterval(timer);
  }, [width]);

  const institutes = [
    {
      name: "Apex Learning Center",
      location: "Downtown · 1.2 km",
      subjects: "Maths, Physics, Chemistry",
      board: "CBSE",
      mode: "Full-time",
      rating: 4.8,
      image:
        "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f",
    },
    {
      name: "Bright Minds Academy",
      location: "North Riverside · 3.5 km",
      subjects: "English, History, Biology",
      board: "ICSE",
      mode: "Weekend",
      rating: 4.5,
      image:
        "https://images.unsplash.com/photo-1522202176988-66273c2fd55f",
    },
    {
      name: "Quantum Scholars",
      location: "South Valley · 5.0 km",
      subjects: "Advanced Maths, Physics",
      board: "CBSE",
      mode: "Online + Offline",
      rating: 4.9,
      image:
        "https://images.unsplash.com/photo-1509062522246-3755977927d7",
    },
  ];

  const visibleInstitutes = showAll
    ? institutes
    : institutes.slice(0, 2);

  return (
    <SafeAreaView style={styles.container}>
      {/* ===== HEADER ===== */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Tuition Institutes</Text>
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
            setAdIndex(Math.round(e.nativeEvent.contentOffset.x / width))
          }
        >
          {ads.map((img, i) => (
            <Image
              key={i}
              source={{ uri: img }}
              style={{
                width,
                height: isTablet ? 150 : 180,
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
                adIndex === i && styles.activeDot,
              ]}
            />
          ))}
        </View>

        {/* ===== AVAILABLE BANNER (OLD DESIGN KEPT) ===== */}
        <View style={styles.banner}>
          <Text style={styles.bannerTitle}>
            Available Tuition Centers
          </Text>
          <Text style={styles.bannerSubtitle}>
            Find the best educators near you
          </Text>
        </View>

        {/* ===== INSTITUTE LIST ===== */}
        {visibleInstitutes.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.card}
            onPress={() => navigation.navigate("Tutions3")}
          >
            <Image source={{ uri: item.image }} style={styles.image} />

            <View style={styles.cardContent}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.location}>{item.location}</Text>
              <Text style={styles.subjects}>{item.subjects}</Text>

              <View style={styles.tags}>
                <Text style={styles.tagBlue}>{item.board}</Text>
                <Text style={styles.tagGray}>{item.mode}</Text>
              </View>
            </View>

            <Ionicons
              name="chevron-forward"
              size={18}
              color="#0B5ED7"
            />
          </TouchableOpacity>
        ))}

        {/* SEE ALL / SEE LESS */}
        <TouchableOpacity
          style={styles.seeToggle}
          onPress={() => setShowAll(!showAll)}
        >
          <Text style={styles.seeText}>
            {showAll ? "See less" : "See all"}
          </Text>
          <Ionicons
            name={showAll ? "chevron-up" : "chevron-forward"}
            size={16}
            color="#0B5ED7"
          />
        </TouchableOpacity>

        {/* ===== YOUTUBE VIDEO ===== */}
        <View style={styles.videoBox}>
          <WebView
            allowsFullscreenVideo
            source={{
              uri:
                "https://www.youtube.com/watch?v=NONufn3jgXI&pp=ygUNdHV0aW9uIGNlbnRyZQ%3D%3D",
            }}
            style={{ height: isTablet ? 260 : 230 }}
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

  banner: {
    backgroundColor: "#4c73ac",
    margin: 16,
    borderRadius: 16,
    padding: 16,
  },

  bannerTitle: { color: "#fff", fontSize: 16, fontWeight: "700" },
  bannerSubtitle: { color: "#DCE8FF", fontSize: 12, marginTop: 4 },

  card: {
    backgroundColor: "#fff",
    marginHorizontal: 16,
    marginBottom: 12,
    borderRadius: 14,
    flexDirection: "row",
    padding: 12,
    alignItems: "center",
  },

  image: { width: 100, height: 95, borderRadius: 12 },

  cardContent: { flex: 1, marginLeft: 12 },

  name: { fontSize: 15, fontWeight: "700" },
  location: { fontSize: 12, color: "#6B7280", marginTop: 4 },
  subjects: { fontSize: 12, marginTop: 4 },

  tags: { flexDirection: "row", marginTop: 6 },

  tagBlue: {
    backgroundColor: "#E8F0FF",
    color: "#0B5ED7",
    fontSize: 11,
    padding: 6,
    borderRadius: 8,
    marginRight: 6,
  },

  tagGray: {
    backgroundColor: "#F1F5F9",
    color: "#475569",
    fontSize: 11,
    padding: 6,
    borderRadius: 8,
  },

  seeToggle: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    marginHorizontal: 16,
    marginBottom: 10,
  },

  seeText: {
    color: "#0B5ED7",
    fontSize: 15,
    marginRight: 4,
  },

  videoBox: {
    margin: 1,
    marginTop:30,
    
    overflow: "hidden",
    backgroundColor: "#000",
  },
});

