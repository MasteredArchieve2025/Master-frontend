// HomeScreen.js
import React, { useState, useRef, useEffect } from "react";
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  StatusBar,
  Dimensions,
  StyleSheet,
  Platform,
  Alert,
} from "react-native";
import {
  MaterialCommunityIcons,
  Feather,
  FontAwesome5,
  Ionicons,
} from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import Header from "../../src/components/Header";
import Footer from "../../src/components/Footer";

const { width } = Dimensions.get("window");

/* -------- Assets -------- */
const collegeBannerImage = require("../../assets/Global.png");
const RIBBON_LEFT = require("../../assets/Ribbonleft.png");
const RIBBON_RIGHT = require("../../assets/Ribbonright.png");
const collegeIcon = require("../../assets/collegeicon.png");

////////////////////////////////////////
// 🔵 BANNER DATA (DEFINE FIRST)
////////////////////////////////////////
const bannerData = [
  {
    title: "Unlock Your Future at",
    line1: "ARUNACHALA COLLEGE OF",
    line2: "ENGINEERING",
    info: "Admissions Open for 2025-2026",
    image: collegeBannerImage,
  },
  {
    title: "Build Your Career With",
    line1: "TOP ENGINEERING",
    line2: "PROGRAMS",
    info: "Apply Now",
    image: collegeBannerImage,
  },
  {
    title: "Learn. Innovate. Lead.",
    line1: "QUALITY",
    line2: "EDUCATION",
    info: "Join Today",
    image: collegeBannerImage,
  },
];

////////////////////////////////////////
// 🔵 STABLE AUTO SCROLL COLLEGE BANNER
////////////////////////////////////////
const BANNER_WIDTH = width - 32;

const CollegeBanner = () => {
  const listRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // 🔁 Auto scroll
  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex =
        activeIndex === bannerData.length - 1 ? 0 : activeIndex + 1;

      listRef.current?.scrollToIndex({
        index: nextIndex,
        animated: true,
      });

      setActiveIndex(nextIndex);
    }, 3000);

    return () => clearInterval(interval);
  }, [activeIndex]);

  // 👁 Track visible item
  const onViewRef = useRef(({ viewableItems }) => {
    if (viewableItems?.length > 0) {
      setActiveIndex(viewableItems[0].index);
    }
  });

  const viewConfigRef = useRef({
    viewAreaCoveragePercentThreshold: 50,
  });

  return (
    <View style={styles.bannerWrapper}>
      <FlatList
        ref={listRef}
        data={bannerData}
        keyExtractor={(_, i) => i.toString()}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        snapToAlignment="center"
        decelerationRate="fast"
        onViewableItemsChanged={onViewRef.current}
        viewabilityConfig={viewConfigRef.current}
        renderItem={({ item }) => (
          <LinearGradient
            colors={["#0175D3", "#014B85"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
            style={[styles.banner, { width: BANNER_WIDTH }]}
          >
            <View style={styles.textContainer}>
              <Text style={styles.bannertitle}>{item.title}</Text>
              <Text style={styles.bannerSubtitle}>{item.line1}</Text>
              <Text style={styles.bannerSubtitle}>{item.line2}</Text>
              <Text style={styles.bannerInfo}>{item.info}</Text>
            </View>
            <Image source={item.image} style={styles.bannerImage} />
          </LinearGradient>
        )}
      />

      {/* 🔵 DOT INDICATORS */}
      <View style={styles.dotsRow}>
        {bannerData.map((_, i) => (
          <View
            key={i}
            style={[styles.dot, activeIndex === i && styles.activeDot]}
          />
        ))}
      </View>
    </View>
  );
};

////////////////////////////////////////
// Ribbon Choices Component
////////////////////////////////////////
const choices = [
  {
    id: 1,
    title: "School",
    icon: <MaterialCommunityIcons name="school" size={28} color="#1a73e8" />,
  },
  {
    id: 2,
    title: "College",
    icon: <FontAwesome5 name="graduation-cap" size={26} color="#1a73e8" />,
  },
  {
    id: 3,
    title: "Course",
    icon: <FontAwesome5 name="laptop" size={26} color="#1a73e8" />,
  },
  {
    id: 4,
    title: "Exam",
    icon: (
      <MaterialCommunityIcons
        name="file-document-edit-outline"
        size={28}
        color="#1a73e8"
      />
    ),
  },
  {
    id: 5,
    title: "IQ",
    icon: (
      <MaterialCommunityIcons
        name="head-cog-outline"
        size={28}
        color="#1a73e8"
      />
    ),
  },
  {
    id: 6,
    title: "Extra-Skills",
    icon: (
      <MaterialCommunityIcons name="music-note" size={26} color="#1a73e8" />
    ),
  },
];

const ChoiceItemRibbon = ({ item, index, navigation }) => {
  const isEven = (index + 1) % 2 === 0;

  const handlePress = () => {
    if (item.title === "School") {
      navigation.navigate("School1");
    } else if (item.title === "College") {
      navigation.navigate("College1");
    } else if (item.title === "Course") {
      navigation.navigate("Course1");
    } else if (item.title === "IQ") {
      navigation.navigate("Iq1");
    } else if (item.title === "Extra-Skills") {
      navigation.navigate("Extraskills1");
    } else if (item.title === "Exam") {
      navigation.navigate("Exam1");
    }
  };

  return (
    <View style={styles.choiceRow}>
      <Image
        source={isEven ? RIBBON_LEFT : RIBBON_RIGHT}
        style={[styles.ribbon, isEven ? styles.ribbonLeft : styles.ribbonRight]}
        resizeMode="stretch"
      />

      <TouchableOpacity
        activeOpacity={0.75}
        style={[styles.choiceCard, isEven ? styles.cardEven : styles.cardOdd]}
        onPress={handlePress}
      >
        <View style={styles.sideSlot}>{!isEven ? item.icon : null}</View>
        <Text numberOfLines={1} style={styles.choiceTitle}>
          {item.title}
        </Text>
        <View style={styles.sideSlot}>{isEven ? item.icon : null}</View>
      </TouchableOpacity>
    </View>
  );
};

////////////////////////////////////////
// Blogs Component
////////////////////////////////////////
const blogsData = [
  {
    id: "1",
    title: "10 Tips for Engineering Students",
    category: "Education",
    date: "Jan 15, 2025",
    readTime: "5 min read",
    image:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=250&fit=crop",
  },
  {
    id: "2",
    title: "Career Opportunities in AI",
    category: "Technology",
    date: "Jan 12, 2025",
    readTime: "7 min read",
    image:
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=250&fit=crop",
  },
  {
    id: "3",
    title: "Exam Preparation Strategies",
    category: "Study Tips",
    date: "Jan 10, 2025",
    readTime: "6 min read",
    image:
      "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w-400&h=250&fit=crop",
  },
  {
    id: "4",
    title: "Developing Soft Skills",
    category: "Personal Development",
    date: "Jan 8, 2025",
    readTime: "8 min read",
    image:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w-400&h=250&fit=crop",
  },
];

const BlogCard = ({ blog }) => (
  <TouchableOpacity
    style={styles.blogCard}
    onPress={() => Alert.alert("Blog", `You selected: ${blog.title}`)}
    activeOpacity={0.8}
  >
    <Image source={{ uri: blog.image }} style={styles.blogImage} />
    <View style={styles.blogContent}>
      <View style={styles.blogCategory}>
        <Text style={styles.blogCategoryText}>{blog.category}</Text>
      </View>
      <Text style={styles.blogTitle} numberOfLines={2}>
        {blog.title}
      </Text>
      <View style={styles.blogMeta}>
        <View style={styles.blogMetaItem}>
          <Ionicons name="calendar-outline" size={12} color="#666" />
          <Text style={styles.blogMetaText}>{blog.date}</Text>
        </View>
        <View style={styles.blogMetaItem}>
          <Ionicons name="time-outline" size={12} color="#666" />
          <Text style={styles.blogMetaText}>{blog.readTime}</Text>
        </View>
      </View>
    </View>
  </TouchableOpacity>
);

const ViewBlogsSection = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>VIEW BLOGS</Text>
        <TouchableOpacity
          style={styles.viewAllButton}
          onPress={() => navigation.navigate("BlogsList")}
        >
          <Text style={styles.viewAllButtonText}>View All</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={blogsData}
        renderItem={({ item }) => <BlogCard blog={item} />}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.blogsList}
      />
    </View>
  );
};

////////////////////////////////////////
// Top Rated Colleges Component
////////////////////////////////////////
const collegesData = [
  { id: 1, name: "Arunachala College\nOf Engineering For Women" },
  { id: 2, name: "Arunachala College\nOf Engineering For Women" },
  { id: 3, name: "Arunachala College\nOf Engineering For Women" },
  { id: 4, name: "Arunachala College\nOf Engineering For Women" },
  { id: 5, name: "Arunachala College\nOf Engineering For Women" },
  { id: 6, name: "Arunachala College\nOf Engineering For Women" },
  { id: 7, name: "Arunachala College\nOf Engineering For Women" },
];

const LeftIconsCollege = () => (
  <View
    style={{
      flexDirection: "row",
      alignItems: "center",
      width: 70,
      marginRight: 12,
    }}
  >
    <Text style={{ color: "green", fontSize: 18, marginRight: 5 }}>▲</Text>
    <Image
      source={collegeIcon}
      style={{ width: 42, height: 42, marginLeft: 6 }}
      resizeMode="contain"
    />
  </View>
);

const CollegeCardFull = ({ rank, name }) => (
  <View style={styles.collegeCardWrapper}>
    <View style={{ flex: 1, justifyContent: "center" }}>
      <Text style={[styles.collegeName, { fontSize: 12, textAlign: "left" }]}>
        {name}
      </Text>
    </View>
    <View style={styles.rankContainer}>
      <Text style={[styles.rankText, { fontSize: 14 }]}>{rank}</Text>
      <Text style={[styles.trophyIcon, { fontSize: 20 }]}>🏆</Text>
    </View>
  </View>
);

const ListItemFull = ({ rank, name }) => (
  <View style={styles.listItemContainer}>
    <LeftIconsCollege />
    <CollegeCardFull rank={rank} name={name} />
  </View>
);

const TopRateColleges = () => {
  const navigation = useNavigation();
  const top3Colleges = collegesData.slice(0, 3);

  const renderCollegeList = (data) => (
    <FlatList
      data={data}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <ListItemFull rank={item.id} name={item.name} />
      )}
      contentContainerStyle={{ paddingBottom: 16 }}
      scrollEnabled={false}
    />
  );

  return (
    <View style={styles.topCollegeContainer}>
      <View style={styles.topCollegeHeader}>
        <Text style={styles.title}>TOP RATED COLLEGES</Text>
        <TouchableOpacity
          style={styles.viewAllButton}
          onPress={() => navigation.navigate("TopRatedList")}
        >
          <Text style={styles.viewAllButtonText}>View All</Text>
        </TouchableOpacity>
      </View>
      {renderCollegeList(top3Colleges)}
    </View>
  );
};

////////////////////////////////////////
// Home Screen Component
////////////////////////////////////////
const HomeScreen = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <Header />

      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.greetingContainer}>
          <Text style={styles.greeting}>Hello ! Mabisha</Text>
        </View>

        <CollegeBanner />

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>YOUR CHOICE</Text>
          {choices.map((c, i) => (
            <ChoiceItemRibbon
              key={c.id}
              item={c}
              index={i}
              navigation={navigation}
            />
          ))}
        </View>

        {/* ADDED: View Blogs Section */}
        <ViewBlogsSection />

        {/* Top Rated Colleges Section */}
        <TopRateColleges />
      </ScrollView>

      <Footer />
    </SafeAreaView>
  );
};

////////////////////////////////////////
// Styles
////////////////////////////////////////
const CARD_WIDTH = 295;
const CARD_HEIGHT = 59;
const SIDE_SLOT_WIDTH = 40;
const RIBBON_W = 140;
const RIBBON_H = 46;
const BLUE = "#0077B6";
const TITLE = "#003366";
const RIBBON_OFFSET = 18;

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollViewContent: {
    paddingBottom: 40,
  },
  greetingContainer: {
    height: 10,
    paddingTop: 0,
  },
  greeting: {
    fontSize: 24,
    fontWeight: "bold",
    paddingHorizontal: 20,
    paddingVertical: 10,
    color: "#2A6B9D",
    paddingBottom: 10,
  },
  bannerWrapper: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 6,
    backgroundColor: "#fff",
  },

  banner: {
    height: 175,
    borderRadius: 16,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  textContainer: {
    flex: 1,
    paddingRight: 12,
  },
  bannertitle: {
    color: "#D0F1FB",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "left",
    lineHeight: 22,
    flexShrink: 1,
    marginBottom: 8,
  },
  bannerSubtitle: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "left",
    lineHeight: 22,
    flexShrink: 1,
    marginBottom: 8,
  },
  bannerInfo: {
    color: "#fff",
    fontSize: 12,
    paddingTop: 10,
  },
  bannerImage: {
    width: width * 0.55,
    height: width * 0.4,
    position: "absolute",
    bottom: -width * 0.14,
    right: -width * 0.05,
    resizeMode: "contain",
  },
  choiceRow: {
    alignItems: "center",
    marginVertical: 8,
    height: CARD_HEIGHT,
    position: "relative",
  },
  ribbon: {
    position: "absolute",
    color: "#F3F5F5",
    width: RIBBON_W,
    height: RIBBON_H,
    top: (CARD_HEIGHT - RIBBON_H) / 2,
    zIndex: 1,
    resizeMode: "stretch",
  },
  ribbonLeft: {
    left: -RIBBON_OFFSET,
  },
  ribbonRight: {
    right: -RIBBON_OFFSET,
  },
  choiceCard: {
    zIndex: 2,
    height: CARD_HEIGHT,
    backgroundColor: "#F3F5F5",
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 12,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOpacity: 0.12,
        shadowOffset: { width: 0, height: 4 },
        shadowRadius: 12,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  cardOdd: {
    marginRight: RIBBON_W / 4,
    marginLeft: 0,
  },
  cardEven: {
    marginLeft: RIBBON_W / 4,
    marginRight: 0,
  },
  sideSlot: {
    width: SIDE_SLOT_WIDTH,
    alignItems: "center",
    justifyContent: "center",
  },
  choiceTitle: {
    flex: 1,
    textAlign: "center",
    fontSize: 16,
    fontWeight: "700",
    color: TITLE,
  },
  section: {
    paddingHorizontal: 20,
    marginTop: 20,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: TITLE,
  },
  // Blogs Styles
  blogsList: {
    paddingRight: 20,
  },
  blogCard: {
    width: 200,
    marginRight: 16,
    backgroundColor: "#fff",
    borderRadius: 12,
    overflow: "hidden",
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 8,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  blogImage: {
    width: "100%",
    height: 120,
    resizeMode: "cover",
  },
  blogContent: {
    padding: 12,
  },
  blogCategory: {
    alignSelf: "flex-start",
    backgroundColor: "#F0F7FF",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    marginBottom: 8,
  },
  blogCategoryText: {
    fontSize: 10,
    fontWeight: "600",
    color: "#0072BC",
  },
  blogTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#003366",
    lineHeight: 18,
    marginBottom: 8,
  },
  blogMeta: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  blogMetaItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  blogMetaText: {
    fontSize: 10,
    color: "#666",
    marginLeft: 4,
  },
  // Top Colleges Styles
  topCollegeContainer: {
    paddingHorizontal: 20,
    marginTop: 30,
    marginBottom: 20,
  },
  topCollegeHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  listItemContainer: {
    flexDirection: "row",
    marginBottom: 12,
    alignItems: "center",
  },
  collegeCardWrapper: {
    width: 280,
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 12,
    backgroundColor: "#fff",
    borderRadius: 4,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 2, height: 2 },
    elevation: 2,
  },
  collegeName: {
    fontSize: 14,
    fontWeight: "600",
    justifyContent: "center",
  },
  rankContainer: {
    flexDirection: "column",
    alignItems: "center",
  },
  rankText: {
    fontWeight: "700",
    fontSize: 16,
    marginBottom: 2,
  },
  trophyIcon: {
    fontSize: 18,
    color: "#FFD700",
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    color: TITLE,
  },
  viewAllButton: {
    backgroundColor: "#003366",
    borderRadius: 4,
    paddingVertical: 6,
    paddingHorizontal: 16,
  },
  viewAllButtonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 14,
  },
  dotsRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#B0CFEA",
    marginHorizontal: 5,
  },
  activeDot: {
    width: 20,
    backgroundColor: "#014B85",
  },
});

export default HomeScreen;
