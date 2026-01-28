// import React from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   FlatList,
//   TouchableOpacity,
//   useWindowDimensions,
//   Platform,
// } from "react-native";
// import { SafeAreaView } from "react-native-safe-area-context";
// import { Ionicons } from "@expo/vector-icons";
// import Footer from "../../src/components/Footer";

// /* -------- DATA -------- */
// const standards = [
//   { id: "1", title: "Class 12", subtitle: "Science, Commerce & Arts", icon: "school" },
//   { id: "2", title: "Class 11", subtitle: "Science, Commerce & Arts", icon: "book" },
//   { id: "3", title: "Class 10", subtitle: "Secondary Education Boards", icon: "ribbon" },
//   { id: "4", title: "Class 9", subtitle: "Foundation Courses", icon: "library" },
//   { id: "5", title: "Classes 6 - 8", subtitle: "Middle School Curriculum", icon: "happy" },
//   { id: "6", title: "Classes 1 - 5", subtitle: "Primary School Curriculum", icon: "happy-outline" },
// ];

// export default function Tution1({ navigation }) {
//   const { width } = useWindowDimensions();
//   const isTablet = width >= 768;

//   const renderItem = ({ item }) => (
//     <TouchableOpacity
//       activeOpacity={0.85}
//       style={[
//         styles.card,
//         { width: isTablet ? "48%" : "47%" },
//       ]}
//       onPress={() =>
//         navigation.navigate("Tutions2", {
//           selectedClass: item.title,
//         })
//       }
//     >
//       <View style={styles.iconBox}>
//         <Ionicons name={item.icon} size={26} color="#0B5ED7" />
//       </View>

//       <Text style={styles.cardTitle}>{item.title}</Text>
//       <Text style={styles.cardSubtitle}>{item.subtitle}</Text>
//     </TouchableOpacity>
//   );
//   return (
//     <SafeAreaView style={styles.container}>
//       {/* ===== HEADER (SAME AS OTHER PAGES) ===== */}
//       <View style={styles.header}>
//         <TouchableOpacity onPress={() => navigation.goBack()}>
//           <Ionicons name="arrow-back" size={24} color="#fff" />
//         </TouchableOpacity>

//         <Text style={styles.headerTitle}>Standards</Text>
//         <View style={{ width: 24 }} />
//       </View>

//       {/* ===== GRID ===== */}
//       <FlatList
//         data={standards}
//         renderItem={renderItem}
//         keyExtractor={(item) => item.id}
//         numColumns={2}
//         columnWrapperStyle={styles.row}
//         contentContainerStyle={{
//           paddingTop: 16,
//           paddingBottom: 100,
//         }}
//         showsVerticalScrollIndicator={false}
//       />

//       <Footer />
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
//     backgroundColor: "#0052A2",
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "space-between",
//     padding: 16,
//   },

//   headerTitle: {
//     color: "#fff",
//     fontSize: 20,
//     fontWeight: "700",
//   },

//   /* GRID */
//   row: {
//     justifyContent: "space-between",
//     paddingHorizontal: 16,
//     marginBottom: 14,
//   },

//   card: {
//     backgroundColor: "#fff",
//     borderRadius: 18,
//     padding: 16,
//     alignItems: "center",
//     elevation: Platform.OS === "android" ? 3 : 0,
//     shadowColor: "#000",
//     shadowOpacity: 0.06,
//     shadowRadius: 6,
//     shadowOffset: { width: 0, height: 3 },
//   },

//   iconBox: {
//     width: 52,
//     height: 52,
//     borderRadius: 16,
//     backgroundColor: "#E8F1FF",
//     alignItems: "center",
//     justifyContent: "center",
//     marginBottom: 10,
//   },

//   cardTitle: {
//     fontSize: 15,
//     fontWeight: "700",
//     textAlign: "center",
//   },

//   cardSubtitle: {
//     fontSize: 12,
//     color: "#5F6F81",
//     textAlign: "center",
//     marginTop: 4,
//   },
// });
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  useWindowDimensions,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import Footer from "../../src/components/Footer";

/* -------- DATA -------- */
const standards = [
  { id: "1", title: "Class 12", subtitle: "Science, Commerce & Arts", icon: "school", color: "#4F46E5" },
  { id: "2", title: "Class 11", subtitle: "Science, Commerce & Arts", icon: "book", color: "#059669" },
  { id: "3", title: "Class 10", subtitle: "Secondary Education Boards", icon: "ribbon", color: "#DC2626" },
  { id: "4", title: "Class 9", subtitle: "Foundation Courses", icon: "library", color: "#EA580C" },
  { id: "5", title: "Classes 6 - 8", subtitle: "Middle School Curriculum", icon: "happy", color: "#2563EB" },
  { id: "6", title: "Classes 1 - 5", subtitle: "Primary School Curriculum", icon: "happy-outline", color: "#7C3AED" },
  { id: "7", title: "Competitive", subtitle: "JEE, NEET, UPSC", icon: "trophy", color: "#DB2777" },
  { id: "8", title: "Language", subtitle: "English, French, Spanish", icon: "language", color: "#0891B2" },
  { id: "9", title: "Special Needs", subtitle: "Personalized Learning", icon: "accessibility", color: "#CA8A04" },
  { id: "10", title: "University", subtitle: "Graduate & Post Graduate", icon: "business", color: "#475569" },
];

export default function Tution1({ navigation }) {
  const { width, height } = useWindowDimensions();
  const isTablet = width >= 768;
  const isLandscape = width > height;
  
  // Responsive calculations
  const numColumns = isTablet ? (isLandscape ? 4 : 3) : 2;
  
  // Calculate card width with proper spacing
  const containerPadding = isTablet ? 20 : 16;
  const cardSpacing = isTablet ? 16 : 12;
  const availableWidth = width - (containerPadding * 2);
  const cardWidth = (availableWidth - (cardSpacing * (numColumns - 1))) / numColumns;

  const renderItem = ({ item, index }) => {
    return (
      <TouchableOpacity
        activeOpacity={0.85}
        style={[
          styles.card,
          {
            width: cardWidth,
            marginLeft: (index % numColumns === 0) ? containerPadding : 0,
            marginRight: ((index + 1) % numColumns === 0) ? containerPadding : cardSpacing,
            marginBottom: cardSpacing,
            padding: isTablet ? 20 : 16,
            borderRadius: isTablet ? 20 : 16,
            height: isTablet ? 170 : 150,
          },
        ]}
        onPress={() =>
          navigation.navigate("Tutions2", {
            selectedClass: item.title,
          })
        }
      >
        <View style={[
          styles.iconBox,
          { 
            width: isTablet ? 64 : 52, 
            height: isTablet ? 64 : 52,
            borderRadius: isTablet ? 16 : 14,
            marginBottom: isTablet ? 16 : 12,
            backgroundColor: `${item.color}15`,
          }
        ]}>
          <Ionicons name={item.icon} size={isTablet ? 30 : 24} color={item.color} />
        </View>

        <Text style={[
          styles.cardTitle,
          { 
            fontSize: isTablet ? 18 : 16,
            marginBottom: isTablet ? 6 : 4,
            color: item.color,
          }
        ]}>
          {item.title}
        </Text>
        
        <Text style={[
          styles.cardSubtitle,
          { 
            fontSize: isTablet ? 13 : 11,
            lineHeight: isTablet ? 18 : 15,
          }
        ]} numberOfLines={2}>
          {item.subtitle}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* ===== HEADER ===== */}
      <View style={[
        styles.header,
        {
          paddingHorizontal: containerPadding,
          paddingVertical: isTablet ? 20 : 16,
          backgroundColor: "#0052A2",
        }
      ]}>
        <TouchableOpacity 
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={isTablet ? 28 : 24} color="#fff" />
        </TouchableOpacity>

        <View style={styles.headerCenter}>
          <Text style={[
            styles.headerTitle,
            { fontSize: isTablet ? 26 : 22 }
          ]}>
            Tuition Classes
          </Text>
          <Text style={[
            styles.headerSubtitle,
            { fontSize: isTablet ? 14 : 12 }
          ]}>
            Find the best tutors for your grade
          </Text>
        </View>
        
        <View style={{ 
          width: isTablet ? 28 : 24,
          height: isTablet ? 28 : 24,
        }} />
      </View>

      {/* ===== MAIN CONTENT ===== */}
      <View style={styles.content}>
        {/* ===== BANNER INFO ===== */}
        <View style={[
          styles.infoBanner,
          {
            marginHorizontal: containerPadding,
            marginTop: isTablet ? 24 : 20,
            marginBottom: isTablet ? 24 : 20,
            padding: isTablet ? 24 : 18,
            borderRadius: isTablet ? 20 : 16,
          }
        ]}>
          <View style={styles.bannerIconContainer}>
            <Ionicons name="search" size={isTablet ? 32 : 24} color="#0B5ED7" />
          </View>
          <View style={styles.bannerTextContainer}>
            <Text style={[
              styles.infoTitle,
              { fontSize: isTablet ? 22 : 18 }
            ]}>
              Find Your Perfect Tutor
            </Text>
            <Text style={[
              styles.infoSubtitle,
              { fontSize: isTablet ? 16 : 13 }
            ]}>
              Select your class to discover experienced tutors and learning centers
            </Text>
          </View>
        </View>

        {/* ===== GRID LIST ===== */}
        <FlatList
          data={standards}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          numColumns={numColumns}
          contentContainerStyle={[
            styles.gridContainer,
            {
              paddingBottom: isTablet ? 140 : 120,
              paddingHorizontal: 0,
            }
          ]}
          showsVerticalScrollIndicator={false}
          key={`flatlist-${numColumns}`}
          scrollEnabled={true}
        />
      </View>

      <Footer />
    </SafeAreaView>
  );
}

/* ================= STYLES ================= */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFF",
  },

  content: {
    flex: 1,
  },

  /* HEADER */
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
      },
      android: {
        elevation: 8,
      },
      web: {
        boxShadow: "0 4px 20px rgba(0, 82, 162, 0.2)",
      },
    }),
  },

  backButton: {
    padding: 8,
    borderRadius: 20,
   
  },

  headerCenter: {
    alignItems: "center",
    flex: 1,
  },

  headerTitle: {
    color: "#fff",
    fontWeight: "800",
    textAlign: "center",
    marginBottom: 2,
  },

  headerSubtitle: {
    color: "#DCE8FF",
    textAlign: "center",
    fontWeight: "500",
  },

  /* INFO BANNER */
  infoBanner: {
    backgroundColor: "#FFFFFF",
    flexDirection: "row",
    alignItems: "center",
    ...Platform.select({
      ios: {
        shadowColor: "#0B5ED7",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 12,
      },
      android: {
        elevation: 6,
        shadowColor: "#0B5ED7",
      },
      web: {
        boxShadow: "0 8px 30px rgba(11, 94, 215, 0.12)",
      },
    }),
  },

  bannerIconContainer: {
    width: 60,
    height: 60,
    borderRadius: 16,
    backgroundColor: "#E8F1FF",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 16,
  },

  bannerTextContainer: {
    flex: 1,
  },

  infoTitle: {
    color: "#1E293B",
    fontWeight: "700",
    marginBottom: 6,
  },

  infoSubtitle: {
    color: "#64748B",
    fontWeight: "400",
    lineHeight: 20,
  },

  gridContainer: {
    paddingTop: 8,
  },

  /* CARD */
  card: {
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.08,
        shadowRadius: 8,
      },
      android: {
        elevation: 4,
      },
      web: {
        boxShadow: "0 4px 16px rgba(0, 0, 0, 0.08)",
        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        cursor: "pointer",
        ":hover": {
          transform: "translateY(-6px)",
          boxShadow: "0 12px 24px rgba(0, 0, 0, 0.15)",
          backgroundColor: "#FFFFFF",
        },
      },
    }),
  },

  iconBox: {
    alignItems: "center",
    justifyContent: "center",
    ...Platform.select({
      web: {
        transition: "all 0.3s ease",
      },
    }),
  },

  cardTitle: {
    fontWeight: "700",
    textAlign: "center",
  },

  cardSubtitle: {
    color: "#64748B",
    textAlign: "center",
    fontWeight: "400",
  },
});