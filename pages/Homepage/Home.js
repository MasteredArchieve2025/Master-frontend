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
import { fp, hp, wp, normalize } from "../../src/utils/Normalize";

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
const BANNER_WIDTH = wp(343); // width - 32 approx

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
    icon: <MaterialCommunityIcons name="school" size={fp(28)} color="#1a73e8" />,
  },
  {
    id: 2,
    title: "College",
    icon: <FontAwesome5 name="graduation-cap" size={fp(26)} color="#1a73e8" />,
  },
  {
    id: 3,
    title: "Course",
    icon: <FontAwesome5 name="laptop" size={fp(26)} color="#1a73e8" />,
  },
  {
    id: 4,
    title: "Exam",
    icon: (
      <MaterialCommunityIcons
        name="file-document-edit-outline"
        size={fp(28)}
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
        size={fp(28)}
        color="#1a73e8"
      />
    ),
  },
  {
    id: 6,
    title: "Extra-Skills",
    icon: (
      <MaterialCommunityIcons name="music-note" size={fp(26)} color="#1a73e8" />
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
    title: "New Engineering Syllabus Announced",
    category: "NEWS",
    date: "2 hrs ago",
    readTime: "Curriculum Update",
    image:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=250&fit=crop",
    description:
      "The University board has released the updated curriculum focusing on AI and sustainable energy.",
  },
  {
    id: "2",
    title: "5 Study Hacks to Boost Your IQ",
    category: "BLOG",
    date: "Yesterday",
    readTime: "Study Tips",
    image:
      "https://images.unsplash.com/photo-1456513080510-34499c4359ce?w=400&h=250&fit=crop",
    description:
      "Discover scientifically proven methods to enhance memory retention and focus during exams.",
  },
  {
    id: "3",
    title: "Scholarship Applications Now Open",
    category: "NEWS",
    date: "Oct 24",
    readTime: "Scholarship",
    image:
      "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=400&h=250&fit=crop",
    description:
      "Arunachala College announces new merit-based scholarships for top performing students.",
  },
  {
    id: "4",
    title: "Online Learning Platforms 2025",
    category: "BLOG",
    date: "Oct 22",
    readTime: "Technology",
    image:
      "https://images.unsplash.com/photo-1542744095-fcf48d80b0fd?w=400&h=250&fit=crop",
    description:
      "A comprehensive review of top online education platforms for 2025.",
  },
];

////////////////////////////////////////
// BLOG CARD COMPONENT
////////////////////////////////////////
const BlogCard = ({ blog }) => {
  const navigation = useNavigation();

  // Determine badge color based on category
  const getBadgeStyle = (category) => {
    return category === "NEWS" ? styles.newsBadge : styles.blogBadge;
  };

  return (
    <TouchableOpacity
      style={styles.blogCard}
      onPress={() =>
        navigation.navigate("BlogDetailScreen", {
          blogId: blog.id,
          blogTitle: blog.title,
          blogType: blog.category,
          blogTime: blog.date,
          blogDate: blog.date,
          blogCategory: blog.readTime,
          blogImage: blog.image,
          blogDescription: blog.description,
        })
      }
      activeOpacity={0.8}
    >
      <Image source={{ uri: blog.image }} style={styles.blogImage} />
      <View style={styles.blogContent}>
        <View style={styles.blogHeader}>
          <View style={[styles.blogCategory, getBadgeStyle(blog.category)]}>
            <Text style={styles.blogCategoryText}>{blog.category}</Text>
          </View>
          <Text style={styles.blogTime}>{blog.date}</Text>
        </View>
        <Text style={styles.blogTitle} numberOfLines={2}>
          {blog.title}
        </Text>
        <View style={styles.blogMeta}>
          <View style={styles.blogMetaItem}>
            <Ionicons name="document-text-outline" size={fp(12)} color="#666" />
            <Text style={styles.blogMetaText}>{blog.readTime}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

////////////////////////////////////////
// VIEW BLOGS SECTION COMPONENT
////////////////////////////////////////
const ViewBlogsSection = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>VIEW BLOGS</Text>
        <TouchableOpacity
          style={styles.viewAllButton}
          onPress={() => navigation.navigate("BlogsScreen")}
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
      width: wp(70),
      marginRight: wp(12),
    }}
  >
    <Text style={{ color: "green", fontSize: fp(18), marginRight: wp(5) }}>▲</Text>
    <Image
      source={collegeIcon}
      style={{ width: wp(42), height: wp(42), marginLeft: wp(6) }}
      resizeMode="contain"
    />
  </View>
);

const CollegeCardFull = ({ rank, name }) => (
  <View style={styles.collegeCardWrapper}>
    <View style={{ flex: 1, justifyContent: "center" }}>
      <Text style={[styles.collegeName, { fontSize: fp(12), textAlign: "left" }]}>
        {name}
      </Text>
    </View>
    <View style={styles.rankContainer}>
      <Text style={[styles.rankText, { fontSize: fp(14) }]}>{rank}</Text>
      <Text style={[styles.trophyIcon, { fontSize: fp(20) }]}>🏆</Text>
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
const CARD_WIDTH = wp(295);
const CARD_HEIGHT = hp(59);
const SIDE_SLOT_WIDTH = wp(40);
const RIBBON_W = wp(140);
const RIBBON_H = hp(46);
const BLUE = "#0077B6";
const TITLE = "#003366";
const RIBBON_OFFSET = wp(18);

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollViewContent: {
    paddingBottom: hp(40),
  },
  greetingContainer: {
    height: hp(10), // Was 10, seems small? keeping logic
    paddingTop: 0,
  },
  greeting: {
    fontSize: fp(24),
    fontWeight: "bold",
    paddingHorizontal: wp(20),
    paddingVertical: hp(10),
    color: "#2A6B9D",
    paddingBottom: hp(10),
  },
  bannerWrapper: {
    paddingHorizontal: wp(16),
    paddingTop: hp(16),
    paddingBottom: hp(6),
    backgroundColor: "#fff",
  },

  banner: {
    height: hp(175),
    borderRadius: normalize(16),
    padding: wp(16),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  textContainer: {
    flex: 1,
    paddingRight: wp(12),
  },
  bannertitle: {
    color: "#D0F1FB",
    fontSize: fp(20),
    fontWeight: "bold",
    textAlign: "left",
    lineHeight: fp(22),
    flexShrink: 1,
    marginBottom: hp(8),
  },
  bannerSubtitle: {
    color: "#fff",
    fontSize: fp(20),
    fontWeight: "bold",
    textAlign: "left",
    lineHeight: fp(22),
    flexShrink: 1,
    marginBottom: hp(8),
  },
  bannerInfo: {
    color: "#fff",
    fontSize: fp(12),
    paddingTop: hp(10),
  },
  bannerImage: {
    width: width * 0.55, // Keeping percentage of screen width relative
    height: width * 0.4,
    position: "absolute",
    bottom: -width * 0.14,
    right: -width * 0.05,
    resizeMode: "contain",
  },
  choiceRow: {
    alignItems: "center",
    marginVertical: hp(8),
    height: CARD_HEIGHT,
    position: "relative",
  },
  ribbon: {
    position: "absolute",
    color: "#F3F5F5",
    width: RIBBON_W,
    height: RIBBON_H,
    top: (hp(59) - RIBBON_H) / 2, // Manually calc or just use flex centering; using logic
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
    borderRadius: normalize(12),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: wp(12),
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
    fontSize: fp(16),
    fontWeight: "700",
    color: TITLE,
  },
  section: {
    paddingHorizontal: wp(20),
    marginTop: hp(20),
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: hp(16),
  },
  sectionTitle: {
    fontSize: fp(18),
    fontWeight: "700",
    color: TITLE,
  },
  // Blogs Styles
  blogsList: {
    paddingRight: wp(20),
  },
  blogCard: {
    width: wp(200),
    marginRight: wp(16),
    backgroundColor: "#fff",
    borderRadius: normalize(12),
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
    height: hp(120),
    resizeMode: "cover",
  },
  blogContent: {
    padding: wp(12),
  },
  blogCategory: {
    alignSelf: "flex-start",
    backgroundColor: "#F0F7FF",
    paddingHorizontal: wp(8),
    paddingVertical: hp(4),
    borderRadius: normalize(4),
    marginBottom: hp(8),
  },
  blogCategoryText: {
    fontSize: fp(10),
    fontWeight: "600",
    color: "#0072BC",
  },
  blogTitle: {
    fontSize: fp(14),
    fontWeight: "600",
    color: "#003366",
    lineHeight: fp(18),
    marginBottom: hp(8),
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
    fontSize: fp(10),
    color: "#666",
    marginLeft: wp(4),
  },
  // Top Colleges Styles
  topCollegeContainer: {
    paddingHorizontal: wp(20),
    marginTop: hp(30),
    marginBottom: hp(20),
  },
  topCollegeHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: hp(12),
  },
  listItemContainer: {
    flexDirection: "row",
    marginBottom: hp(12),
    alignItems: "center",
  },
  collegeCardWrapper: {
    width: wp(280),
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    padding: wp(12),
    backgroundColor: "#fff",
    borderRadius: normalize(4),
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 2, height: 2 },
    elevation: 2,
  },
  collegeName: {
    fontSize: fp(14),
    fontWeight: "600",
    justifyContent: "center",
  },
  rankContainer: {
    flexDirection: "column",
    alignItems: "center",
  },
  rankText: {
    fontWeight: "700",
    fontSize: fp(16),
    marginBottom: hp(2),
  },
  trophyIcon: {
    fontSize: fp(18),
    color: "#FFD700",
  },
  title: {
    fontSize: fp(18),
    fontWeight: "700",
    color: TITLE,
  },
  viewAllButton: {
    backgroundColor: "#003366",
    borderRadius: normalize(4),
    paddingVertical: hp(6),
    paddingHorizontal: wp(16),
  },
  viewAllButtonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: fp(14),
  },
  dotsRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: hp(10),
  },
  dot: {
    width: wp(8),
    height: wp(8),
    borderRadius: wp(4),
    backgroundColor: "#B0CFEA",
    marginHorizontal: wp(5),
  },
  activeDot: {
    width: wp(20),
    backgroundColor: "#014B85",
  },
});

export default HomeScreen;
