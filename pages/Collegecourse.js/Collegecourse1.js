import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  useWindowDimensions,
  Dimensions,
  Platform,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Footer from "../../src/components/Footer";

const { width: screenWidth } = Dimensions.get("window");
const isTablet = screenWidth >= 768;
const isWeb = screenWidth >= 1024;

/* ---------------- DATA ---------------- */
const departments = [
  { id: "1", title: "Computer Science", icon: "laptop-outline" },
  { id: "2", title: "Mechanical Engineering", icon: "settings-outline" },
  { id: "3", title: "Electrical & Electronics", icon: "flash-outline" },
  { id: "4", title: "Business Administration", icon: "briefcase-outline" },
  { id: "5", title: "Biotechnology", icon: "flask-outline" },
  { id: "6", title: "Civil Engineering", icon: "business-outline" },
];

/* ---------------- SCREEN ---------------- */
export default function Collegecourse1({ navigation }) {
  const { width } = useWindowDimensions();
  const containerWidth = isWeb ? Math.min(width, 1200) : width;

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.card,
        isTablet && styles.cardTablet,
        isWeb && styles.cardWeb
      ]}
      activeOpacity={0.85}
      onPress={() =>
        navigation.navigate("Collegecourse2", {
          department: item.title,
        })
      }
    >
      <View style={[
        styles.iconBox,
        isTablet && styles.iconBoxTablet,
        isWeb && styles.iconBoxWeb
      ]}>
        <Ionicons 
          name={item.icon} 
          size={isTablet ? 32 : 28} 
          color="#0B5ED7" 
        />
      </View>

      <Text style={[
        styles.title,
        isTablet && styles.titleTablet,
        isWeb && styles.titleWeb
      ]}>
        {item.title}
      </Text>

      <View style={[
        styles.badge,
        isTablet && styles.badgeTablet
      ]}>
        <Ionicons 
          name="checkmark-circle" 
          size={isTablet ? 16 : 14} 
          color="#0B5ED7" 
        />
        <Text style={[
          styles.badgeText,
          isTablet && styles.badgeTextTablet,
          isWeb && styles.badgeTextWeb
        ]}>
          Extra Skill Courses Available
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={[styles.container, isWeb && styles.containerWeb]}>
      {/* Header */}
      <View style={[
        styles.header,
        isTablet && styles.headerTablet,
        isWeb && styles.headerWeb
      ]}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons 
            name="arrow-back" 
            size={isTablet ? 28 : 24} 
            color="#e9ebee" 
          />
        </TouchableOpacity>

        <View style={styles.headerTitleContainer}>
          <Text style={[
            styles.headerTitle,
            isTablet && styles.headerTitleTablet,
            isWeb && styles.headerTitleWeb
          ]}>
            Departments
          </Text>
        </View>

        <View style={{ width: isTablet ? 28 : 24 }} />
      </View>

      <ScrollView 
        showsVerticalScrollIndicator={isWeb}
        contentContainerStyle={isWeb && styles.scrollContentWeb}
      >
        {/* Title */}
        <View style={[
          styles.topText,
          isTablet && styles.topTextTablet,
          isWeb && styles.topTextWeb
        ]}>
          <Text style={[
            styles.mainTitle,
            isTablet && styles.mainTitleTablet,
            isWeb && styles.mainTitleWeb
          ]}>
            Skill Courses
          </Text>
          <Text style={[
            styles.desc,
            isTablet && styles.descTablet,
            isWeb && styles.descWeb
          ]}>
            Choose a department to explore certifications
          </Text>
        </View>

        {/* Grid */}
        <FlatList
          data={departments}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          numColumns={isWeb ? 3 : 2}
          columnWrapperStyle={[
            styles.row,
            isTablet && styles.rowTablet,
            isWeb && styles.rowWeb
          ]}
          contentContainerStyle={[
            styles.listContent,
            isTablet && styles.listContentTablet,
            isWeb && styles.listContentWeb
          ]}
          scrollEnabled={false}
        />
      </ScrollView>
      <Footer/>
    </SafeAreaView>
  );
}

/* ---------------- STYLES ---------------- */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F8FF",
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
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
    backgroundColor: "#0052A2",
  },
  headerTablet: {
    paddingVertical: 20,
    paddingHorizontal: 24,
  },
  headerWeb: {
    paddingHorizontal: 40,
  },
  headerTitleContainer: {
    flex: 1,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "700",
    textAlign: "center",
    color: "white"
  },
  headerTitleTablet: {
    fontSize: 22,
  },
  headerTitleWeb: {
    fontSize: 24,
  },

  // Top Text
  topText: {
    paddingHorizontal: 16,
    marginVertical: 12,
  },
  topTextTablet: {
    paddingHorizontal: 24,
    marginVertical: 20,
  },
  topTextWeb: {
    paddingHorizontal: 0,
  },
  mainTitle: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 4,
  },
  mainTitleTablet: {
    fontSize: 24,
    marginBottom: 6,
  },
  mainTitleWeb: {
    fontSize: 26,
  },
  desc: {
    fontSize: 13,
    color: "#666",
  },
  descTablet: {
    fontSize: 15,
  },
  descWeb: {
    fontSize: 16,
  },

  // List Content
  listContent: {
    paddingBottom: 30,
  },
  listContentTablet: {
    paddingBottom: 40,
  },
  listContentWeb: {
    paddingBottom: 50,
  },

  // Row
  row: {
    justifyContent: "space-between",
    paddingHorizontal: 16,
    marginBottom: 14,
  },
  rowTablet: {
    paddingHorizontal: 24,
    marginBottom: 18,
  },
  rowWeb: {
    paddingHorizontal: 0,
    marginBottom: 20,
    justifyContent: 'flex-start',
  },

  // Card
  card: {
    backgroundColor: "#fff",
    borderRadius: 18,
    padding: 16,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
      },
      android: {
        elevation: 4,
      },
    }),
    width: "47%",
  },
  cardTablet: {
    width: "48%",
    padding: 20,
    borderRadius: 20,
  },
  cardWeb: {
    width: "30%",
    marginHorizontal: "1.5%",
    padding: 24,
    borderRadius: 22,
  },

  // Icon Box
  iconBox: {
    width: 46,
    height: 46,
    borderRadius: 14,
    backgroundColor: "#EAF2FF",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  iconBoxTablet: {
    width: 56,
    height: 56,
    borderRadius: 16,
    marginBottom: 12,
  },
  iconBoxWeb: {
    width: 60,
    height: 60,
  },

  // Title
  title: {
    fontSize: 14,
    fontWeight: "700",
    marginBottom: 8,
    minHeight: 36,
  },
  titleTablet: {
    fontSize: 16,
    minHeight: 40,
    marginBottom: 10,
  },
  titleWeb: {
    fontSize: 18,
    minHeight: 44,
  },

  // Badge
  badge: {
    flexDirection: "row",
    alignItems: "center",
  },
  badgeTablet: {
    marginTop: 4,
  },
  badgeText: {
    fontSize: 11,
    color: "#0B5ED7",
    marginLeft: 4,
    fontWeight: "600",
  },
  badgeTextTablet: {
    fontSize: 12,
  },
  badgeTextWeb: {
    fontSize: 13,
  },
});