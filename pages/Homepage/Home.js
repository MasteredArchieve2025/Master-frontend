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
} from "react-native";
import {
  MaterialCommunityIcons,
  FontAwesome5,
  Ionicons,
} from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import Header from "../../src/components/Header";
import Footer from "../../src/components/Footer";

const { width, height } = Dimensions.get("window");
const isLargeScreen = width >= 768;
const isExtraLargeScreen = width >= 1024;

/* -------- Assets -------- */
const collegeBannerImage = require("../../assets/Global.png");
const RIBBON_LEFT = require("../../assets/Ribbonleft.png");
const RIBBON_RIGHT = require("../../assets/Ribbonright.png");
const collegeIcon = require("../../assets/collegeicon.png");

////////////////////////////////////////
// 🔵 BANNER DATA
////////////////////////////////////////
const bannerData = [
  {
    title: "Unlock Your Future at",
    line1: "ARUNACHALA COLLEGE ",
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
const CollegeBanner = () => {
  const listRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  
  const BANNER_WIDTH = isLargeScreen ? Math.min(width * 0.8, 1000) : width - 32;
  const BANNER_HEIGHT = isLargeScreen ? 300 : 200;

  // 🔁 Auto scroll
  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex = activeIndex === bannerData.length - 1 ? 0 : activeIndex + 1;
      listRef.current?.scrollToIndex({ index: nextIndex, animated: true });
      setActiveIndex(nextIndex);
    }, 3000);

    return () => clearInterval(interval);
  }, [activeIndex]);

  const onViewRef = useRef(({ viewableItems }) => {
    if (viewableItems?.length > 0) setActiveIndex(viewableItems[0].index);
  });

  const viewConfigRef = useRef({ viewAreaCoveragePercentThreshold: 50 });

  return (
    <View style={[
      styles.bannerWrapper,
      isLargeScreen && styles.bannerWrapperCenter
    ]}>
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
            style={[
              styles.banner,
              { width: BANNER_WIDTH, height: BANNER_HEIGHT },
              isLargeScreen && styles.bannerTablet
            ]}
          >
            <View style={[
              styles.textContainer,
              isLargeScreen && styles.textContainerTablet
            ]}>
              <Text style={[
                styles.bannertitle,
                isLargeScreen && styles.bannertitleTablet
              ]}>
                {item.title}
              </Text>
              <Text style={[
                styles.bannerSubtitle,
                isLargeScreen && styles.bannerSubtitleTablet
              ]}>
                {item.line1}
              </Text>
              <Text style={[
                styles.bannerSubtitle,
                isLargeScreen && styles.bannerSubtitleTablet
              ]}>
                {item.line2}
              </Text>
              <Text style={[
                styles.bannerInfo,
                isLargeScreen && styles.bannerInfoTablet
              ]}>
                {item.info}
              </Text>
            </View>
            <Image 
              source={item.image} 
              style={[
                styles.bannerImage,
                isLargeScreen && styles.bannerImageTablet,
                isExtraLargeScreen && styles.bannerImageLarge
              ]} 
            />
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
// Ribbon Choices Component - SINGLE COLUMN FOR ALL SCREENS
////////////////////////////////////////
const choices = [
  {
    id: 1,
    title: "School",
    icon: "school",
    screen: "School1",
  },
  {
    id: 2,
    title: "College",
    icon: "graduation-cap",
    screen: "College1",
  },
  {
    id: 3,
    title: "Course",
    icon: "laptop",
    screen: "Course1",
  },
  {
    id: 4,
    title: "Exam",
    icon: "file-document-edit-outline",
    screen: "Exam1",
  },
  {
    id: 5,
    title: "IQ",
    icon: "head-cog-outline",
    screen: "Iq1",
  },
  {
    id: 6,
    title: "Extra-Skills",
    icon: "music-note",
    screen: "Extraskills1",
  },
];

const ChoiceItemRibbon = ({ item, index, navigation }) => {
  const isEven = (index + 1) % 2 === 0;
  const iconSize = isLargeScreen ? 32 : 28;
  
  const IconComponent = item.icon.includes("graduation-cap") || item.icon.includes("laptop") 
    ? FontAwesome5 
    : MaterialCommunityIcons;

  const handlePress = () => navigation.navigate(item.screen);

  // SINGLE COLUMN RIBBON DESIGN FOR ALL SCREENS
  return (
    <View style={[
      styles.choiceRow,
      isLargeScreen && styles.choiceRowTablet
    ]}>
      <Image
        source={isEven ? RIBBON_LEFT : RIBBON_RIGHT}
        style={[
          styles.ribbon, 
          isEven ? styles.ribbonLeft : styles.ribbonRight,
          isLargeScreen && styles.ribbonTablet
        ]}
        resizeMode="stretch"
      />
      <TouchableOpacity
        activeOpacity={0.75}
        style={[
          styles.choiceCard, 
          isEven ? styles.cardEven : styles.cardOdd,
          isLargeScreen && styles.choiceCardTablet
        ]}
        onPress={handlePress}
      >
        <View style={[
          styles.sideSlot,
          isLargeScreen && styles.sideSlotTablet
        ]}>
          {!isEven ? (
            <IconComponent name={item.icon} size={iconSize} color="#1a73e8" />
          ) : null}
        </View>
        <Text style={[
          styles.choiceTitle,
          isLargeScreen && styles.choiceTitleTablet
        ]}>
          {item.title}
        </Text>
        <View style={[
          styles.sideSlot,
          isLargeScreen && styles.sideSlotTablet
        ]}>
          {isEven ? (
            <IconComponent name={item.icon} size={iconSize} color="#1a73e8" />
          ) : null}
        </View>
      </TouchableOpacity>
    </View>
  );
};

////////////////////////////////////////
// BLOG CARD COMPONENT
////////////////////////////////////////
const blogsData = [
  {
    id: "1",
    title: "New Engineering Syllabus Announced",
    category: "NEWS",
    date: "2 hrs ago",
    readTime: "Curriculum Update",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=250&fit=crop",
    description: "The University board has released the updated curriculum focusing on AI and sustainable energy.",
  },
  {
    id: "2",
    title: "5 Study Hacks to Boost Your IQ",
    category: "BLOG",
    date: "Yesterday",
    readTime: "Study Tips",
    image: "https://images.unsplash.com/photo-1456513080510-34499c4359ce?w=400&h=250&fit=crop",
    description: "Discover scientifically proven methods to enhance memory retention and focus during exams.",
  },
  {
    id: "3",
    title: "Scholarship Applications Now Open",
    category: "NEWS",
    date: "Oct 24",
    readTime: "Scholarship",
    image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=400&h=250&fit=crop",
    description: "Arunachala College announces new merit-based scholarships for top performing students.",
  },
  {
    id: "4",
    title: "Online Learning Platforms 2025",
    category: "BLOG",
    date: "Oct 22",
    readTime: "Technology",
    image: "https://images.unsplash.com/photo-1542744095-fcf48d80b0fd?w=400&h=250&fit=crop",
    description: "A comprehensive review of top online education platforms for 2025.",
  },
];

const BlogCard = ({ blog }) => {
  const navigation = useNavigation();
  const getBadgeStyle = (category) => category === "NEWS" ? styles.newsBadge : styles.blogBadge;

  return (
    <TouchableOpacity
      style={[
        styles.blogCard,
        isLargeScreen && styles.blogCardTablet
      ]}
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
      <Image 
        source={{ uri: blog.image }} 
        style={[
          styles.blogImage,
          isLargeScreen && styles.blogImageTablet
        ]} 
      />
      <View style={styles.blogContent}>
        <View style={styles.blogHeader}>
          <View style={[styles.blogCategory, getBadgeStyle(blog.category)]}>
            <Text style={[
              styles.blogCategoryText,
              isLargeScreen && styles.blogCategoryTextTablet
            ]}>
              {blog.category}
            </Text>
          </View>
          <Text style={[
            styles.blogTime,
            isLargeScreen && styles.blogTimeTablet
          ]}>
            {blog.date}
          </Text>
        </View>
        <Text 
          style={[
            styles.blogTitle,
            isLargeScreen && styles.blogTitleTablet
          ]} 
          numberOfLines={2}
        >
          {blog.title}
        </Text>
        <View style={styles.blogMeta}>
          <View style={styles.blogMetaItem}>
            <Ionicons 
              name="document-text-outline" 
              size={isLargeScreen ? 14 : 12} 
              color="#666" 
            />
            <Text style={[
              styles.blogMetaText,
              isLargeScreen && styles.blogMetaTextTablet
            ]}>
              {blog.readTime}
            </Text>
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

  if (isLargeScreen) {
    return (
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={[
            styles.sectionTitle,
            isLargeScreen && styles.sectionTitleTablet
          ]}>
            VIEW BLOGS
          </Text>
          <TouchableOpacity
            style={styles.viewAllButton}
            onPress={() => navigation.navigate("BlogsScreen")}
          >
            <Text style={styles.viewAllButtonText}>View All</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.blogsGrid}>
          {blogsData.map((blog) => (
            <BlogCard key={blog.id} blog={blog} />
          ))}
        </View>
      </View>
    );
  }

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
  <View style={[
    styles.leftIconsContainer,
    isLargeScreen && styles.leftIconsContainerTablet
  ]}>
    <Text style={[
      styles.greenArrow,
      isLargeScreen && styles.greenArrowTablet
    ]}>
      ▲
    </Text>
    <Image
      source={collegeIcon}
      style={[
        styles.collegeIcon,
        isLargeScreen && styles.collegeIconTablet
      ]}
      resizeMode="contain"
    />
  </View>
);

const CollegeCardFull = ({ rank, name }) => (
  <View style={[
    styles.collegeCardWrapper,
    isLargeScreen && styles.collegeCardWrapperTablet
  ]}>
    <View style={styles.collegeTextContainer}>
      <Text style={[
        styles.collegeName,
        isLargeScreen && styles.collegeNameTablet
      ]}>
        {name}
      </Text>
    </View>
    <View style={styles.rankContainer}>
      <Text style={[
        styles.rankText,
        isLargeScreen && styles.rankTextTablet
      ]}>
        {rank}
      </Text>
      <Text style={[
        styles.trophyIcon,
        isLargeScreen && styles.trophyIconTablet
      ]}>
        🏆
      </Text>
    </View>
  </View>
);

const ListItemFull = ({ rank, name }) => (
  <View style={[
    styles.listItemContainer,
    isLargeScreen && styles.listItemContainerTablet
  ]}>
    <LeftIconsCollege />
    <CollegeCardFull rank={rank} name={name} />
  </View>
);

const TopRateColleges = () => {
  const navigation = useNavigation();
  const topColleges = isLargeScreen ? collegesData.slice(0, 4) : collegesData.slice(0, 3);

  const renderCollegeList = (data) => {
    if (isLargeScreen) {
      return (
        <View style={styles.collegesGrid}>
          {data.map((item) => (
            <ListItemFull key={item.id} rank={item.id} name={item.name} />
          ))}
        </View>
      );
    }

    return (
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
  };

  return (
    <View style={styles.topCollegeContainer}>
      <View style={styles.topCollegeHeader}>
        <Text style={[
          styles.title,
          isLargeScreen && styles.titleTablet
        ]}>
          TOP RATED COLLEGES
        </Text>
        <TouchableOpacity
          style={styles.viewAllButton}
          onPress={() => navigation.navigate("TopRatedList")}
        >
          <Text style={styles.viewAllButtonText}>View All</Text>
        </TouchableOpacity>
      </View>
      {renderCollegeList(topColleges)}
    </View>
  );
};

////////////////////////////////////////
// Home Screen Component
////////////////////////////////////////
const HomeScreen = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={[
      styles.safe,
      isExtraLargeScreen && styles.safeLarge
    ]}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <Header />

      <ScrollView 
        contentContainerStyle={[
          styles.scrollViewContent,
          isLargeScreen && styles.scrollViewContentTablet
        ]}
      >
      

        <CollegeBanner />

        <View style={styles.section}>
          <Text style={[
            styles.sectionTitle,
            isLargeScreen && styles.sectionTitleTablet
          ]}>
            YOUR CHOICE
          </Text>
          <View style={styles.choicesContainer}>
            {choices.map((c, i) => (
              <ChoiceItemRibbon
                key={c.id}
                item={c}
                index={i}
                navigation={navigation}
              />
            ))}
          </View>
        </View>

        <ViewBlogsSection />
        <TopRateColleges />
      </ScrollView>

      <Footer />
    </SafeAreaView>
  );
};

////////////////////////////////////////
// Styles - SINGLE COLUMN RIBBON FOR ALL SCREENS
////////////////////////////////////////
const styles = StyleSheet.create({
  // Base Container Styles
  safe: {
    flex: 1,
    backgroundColor: "#fff",
  },
  safeLarge: {
    maxWidth: 1200,
    alignSelf: 'center',
    width: '100%',
  },
  scrollViewContent: {
    paddingBottom: 40,
  },
  scrollViewContentTablet: {
    paddingHorizontal: 40,
  },
  
  // Greeting
  greetingContainer: {
    paddingTop: 10,
  },
  greeting: {
    fontSize: 24,
    fontWeight: "bold",
    paddingHorizontal: 20,
    paddingVertical: 10,
    color: "#2A6B9D",
    paddingBottom: 10,
  },
  greetingTablet: {
    fontSize: 28,
  },
  
  // Banner
  bannerWrapper: {
    paddingHorizontal: 0,
    paddingTop: 16,
    paddingBottom: 6,
  },
  bannerWrapperCenter: {
    alignItems: 'center',
  },
  banner: {
borderRadius: isLargeScreen ? 16 : 0,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  bannerTablet: {
    paddingHorizontal: 24,
    height:300,
    width : 690
    
  },
  textContainer: {
    flex: 1,
    paddingRight: 12,
  },
  textContainerTablet: {
    flex: 0.7,
  },
  bannertitle: {
    color: "#D0F1FB",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "left",
    lineHeight: 22,
    marginBottom: 8,
  },
  bannertitleTablet: {
    fontSize: 24,
    lineHeight: 26,
  },
  bannerSubtitle: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "left",
    lineHeight: 22,
    marginBottom: 8,
  },
  bannerSubtitleTablet: {
    fontSize: 24,
    lineHeight: 26,
  },
  bannerInfo: {
    color: "#fff",
    fontSize: 12,
    paddingTop: 10,
  },
  bannerInfoTablet: {
    fontSize: 14,
  },
  bannerImage: {
    width: width * 0.45,
    height: width * 0.45,
    position: "absolute",
    bottom: -width * 0.14,
    right: -width * 0.05,
    resizeMode: "contain",
  },
  bannerImageTablet: {
    width: width * 0.5,
    height: width * 0.4,
    bottom: -width * 0.12,
    right: -width * 0.04,
  },
  bannerImageLarge: {
    width: 400,
    height: 300,
    bottom: -40,
    right: -20,
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
  
  // CHOICES - SINGLE COLUMN RIBBON FOR ALL SCREENS
  choicesContainer: {},
  
  // Mobile ribbon layout (scaled for tablet)
  choiceRow: {
    alignItems: "center",
    marginVertical: 8,
    height: 59,
    position: "relative",
  },
  choiceRowTablet: {
    height: 70,
    marginVertical: 10,
  },
  ribbon: {
    position: "absolute",
    width: 140,
    height: 46,
    top: 6.5,
    zIndex: 1,
    resizeMode: "stretch",
  },
  ribbonTablet: {
    width: 160,
    height: 56,
    top: 7,
  },
  ribbonLeft: {
    left: -18,
  },
  ribbonRight: {
    right: -18,
  },
  choiceCard: {
    zIndex: 2,
    height: 59,
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
  choiceCardTablet: {
    height: 70,
    paddingHorizontal: 16,
  },
  cardOdd: {
    marginRight: 35,
    marginLeft: 0,
  },
  cardEven: {
    marginLeft: 35,
    marginRight: 0,
  },
  sideSlot: {
    width: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  sideSlotTablet: {
    width: 50,
  },
  choiceTitle: {
    flex: 1,
    textAlign: "center",
    fontSize: 16,
    fontWeight: "700",
    color: "#003366",
  },
  choiceTitleTablet: {
    fontSize: 18,
  },
  
  // Section Common
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
    color: "#003366",
  },
  sectionTitleTablet: {
    fontSize: 22,
  },
  
  // Blogs
  blogsList: {
    paddingRight: 20,
  },
  blogsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
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
  blogCardTablet: {
    width: '48%',
    marginRight: 0,
    marginBottom: 16,
  },
  blogImage: {
    width: "100%",
    height: 120,
    resizeMode: "cover",
  },
  blogImageTablet: {
    height: 150,
  },
  blogContent: {
    padding: 12,
  },
  blogHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  blogCategory: {
    backgroundColor: "#F0F7FF",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  blogCategoryText: {
    fontSize: 10,
    fontWeight: "600",
    color: "#0072BC",
  },
  blogCategoryTextTablet: {
    fontSize: 12,
  },
  blogTime: {
    fontSize: 10,
    color: "#666",
  },
  blogTimeTablet: {
    fontSize: 12,
  },
  blogTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#003366",
    lineHeight: 18,
    marginBottom: 8,
  },
  blogTitleTablet: {
    fontSize: 16,
    lineHeight: 20,
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
  blogMetaTextTablet: {
    fontSize: 12,
  },
  
  // Top Colleges
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
  title: {
    fontSize: 18,
    fontWeight: "700",
    color: "#003366",
  },
  titleTablet: {
    fontSize: 22,
  },
  collegesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  listItemContainer: {
    flexDirection: "row",
    marginBottom: 12,
    alignItems: "center",
  },
  listItemContainerTablet: {
    width: '48%',
    marginBottom: 16,
  },
  collegeCardWrapper: {
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
  collegeCardWrapperTablet: {
    padding: 16,
  },
  collegeName: {
    fontSize: 12,
    fontWeight: "600",
    textAlign: "left",
  },
  collegeNameTablet: {
    fontSize: 14,
  },
  collegeTextContainer: {
    flex: 1,
    justifyContent: "center",
  },
  rankContainer: {
    flexDirection: "column",
    alignItems: "center",
  },
  rankText: {
    fontWeight: "700",
    fontSize: 14,
    marginBottom: 2,
  },
  rankTextTablet: {
    fontSize: 16,
  },
  trophyIcon: {
    fontSize: 18,
    color: "#FFD700",
  },
  trophyIconTablet: {
    fontSize: 20,
  },
  leftIconsContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: 70,
    marginRight: 12,
  },
  leftIconsContainerTablet: {
    width: 80,
    marginRight: 16,
  },
  greenArrow: {
    color: "green",
    fontSize: 18,
    marginRight: 5,
  },
  greenArrowTablet: {
    fontSize: 20,
  },
  collegeIcon: {
    width: 42,
    height: 42,
    marginLeft: 6,
  },
  collegeIconTablet: {
    width: 48,
    height: 48,
  },
  
  // Common Components
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
});

export default HomeScreen;