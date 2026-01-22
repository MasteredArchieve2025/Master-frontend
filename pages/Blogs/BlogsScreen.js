// BlogsScreen.js
import React, { useRef, useEffect, useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  Image,
  StatusBar,
  StyleSheet,
  Platform,
  Dimensions,
  Linking,
  useWindowDimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { WebView } from "react-native-webview";
import Footer from "../../src/components/Footer";

const { width } = Dimensions.get("window");

// Advertisement banners data - Larger images
const ads = [
  {
    id: "1",
    title: "Study Abroad Scholarships",
    description: "Get up to 50% scholarship on international programs",
    image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=800&h=300&fit=crop",
    url: "https://example.com/scholarship"
  },
  {
    id: "2",
    title: "Online Learning Platform",
    description: "Access 1000+ courses for free this month",
    image: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=800&h=300&fit=crop",
    url: "https://example.com/study-abroad"
  },
  {
    id: "3",
    title: "Career Development Program",
    description: "Boost your career with our certified programs",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&h=300&fit=crop",
    url: "https://example.com/courses"
  },
];

// Blog data with actual images and complete details for BlogDetailScreen
const blogsData = [
  {
    id: "1",
    title: "New Engineering Syllabus Announced",
    description: "The University board has released the updated curriculum focusing on AI and sustainable energy.",
    type: "NEWS",
    time: "2 hrs ago",
    date: "Oct 26",
    category: "Curriculum",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=250&fit=crop",
    readTime: "3 min read",
    author: "University Board",
    authorRole: "Education Board",
    publishStatus: "Published",
    publishDate: "2 hrs ago",
    authorBio: "The University board regulates curriculum standards and updates for engineering programs nationwide.",
    content: `The University board has released the updated curriculum focusing on AI and sustainable energy.

Key Changes in the 2025 Syllabus:
- **AI and Machine Learning** integrated into all engineering streams
- **Sustainable Energy Systems** as a core subject
- **Industry 4.0 technologies** including IoT and Robotics
- **Enhanced practical training** with 60% lab-based learning

The new syllabus aims to prepare students for emerging technologies and global challenges.`,
    authorImage: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=400&h=400&fit=crop",
    blogImage: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&h=400&fit=crop",
  },
  {
    id: "2",
    title: "5 Study Hacks to Boost Your IQ",
    description: "Discover scientifically proven methods to enhance memory retention and focus during exams.",
    type: "BLOG",
    time: "Yesterday",
    date: "Oct 25",
    category: "Study Tips",
    image: "https://images.unsplash.com/photo-1456513080510-34499c4359ce?w=400&h=250&fit=crop",
    readTime: "5 min read",
    author: "Sarah Jenkins",
    authorRole: "Education Specialist",
    publishStatus: "Published",
    publishDate: "Yesterday, 4:30 PM",
    authorBio: "Sarah has over 10 years of experience in cognitive psychology and student mentorship. She loves helping students unlock their full potential.",
    content: `Discover scientifically proven methods to enhance your cognitive abilities and memory retention during exam preparation.

1. **Active Recall Practice**
   Instead of re-reading notes, test yourself regularly. This strengthens neural pathways and improves long-term memory retention.

2. **Spaced Repetition**
   Review material at increasing intervals. Studies show this can improve retention by up to 200%.

3. **Mindfulness Meditation**
   Just 10 minutes daily can improve focus, reduce stress, and enhance cognitive flexibility.

4. **Sleep Optimization**
   7-8 hours of quality sleep consolidates learning and improves problem-solving abilities.

5. **Nutrition for Brain Health**
   Omega-3 fatty acids, antioxidants, and proper hydration support optimal brain function.

Implement these strategies consistently for 30 days, and you'll notice significant improvements in your learning efficiency and cognitive performance.`,
    authorImage: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop",
    blogImage: "https://images.unsplash.com/photo-1456513080510-34499c4359ce?w=800&h=400&fit=crop",
  },
  {
    id: "3",
    title: "Scholarship Applications Now Open",
    description: "Arunachala College announces new merit-based scholarships for top performing students.",
    type: "NEWS",
    time: "Oct 24",
    date: "Oct 24",
    category: "Scholarship",
    image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=400&h=250&fit=crop",
    readTime: "4 min read",
    author: "Arunachala College",
    authorRole: "Administration",
    publishStatus: "Published",
    publishDate: "Oct 24",
    authorBio: "Arunachala College is committed to providing quality education and opportunities to deserving students across the country.",
    content: `Arunachala College announces new merit-based scholarships for top performing students in the 2025 academic year.

Scholarship Details:
- **Merit Scholarships**: Up to 100% tuition fee waiver for top 10 rank holders
- **Sports Scholarships**: For national and state level athletes
- **Arts Scholarships**: For students excelling in cultural activities
- **Need-based Scholarships**: For economically disadvantaged students

Application Deadline: November 30, 2024
Results Announcement: December 15, 2024`,
    authorImage: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop",
    blogImage: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&h=400&fit=crop",
  },
  {
    id: "4",
    title: "Online Learning Platforms Comparison",
    description: "A comprehensive review of top online education platforms for 2025.",
    type: "BLOG",
    time: "Oct 22",
    date: "Oct 22",
    category: "Technology",
    image: "https://images.unsplash.com/photo-1542744095-fcf48d80b0fd?w=400&h=250&fit=crop",
    readTime: "6 min read",
    author: "Tech Education Team",
    authorRole: "Technology Analysts",
    publishStatus: "Published",
    publishDate: "Oct 22",
    authorBio: "Our team of technology analysts specializes in reviewing and comparing educational platforms to help students make informed choices.",
    content: `A comprehensive review of top online education platforms for 2025.

Platform Comparison:
1. **Coursera** - Best for university-level courses
2. **Udemy** - Best for skill-based courses
3. **edX** - Best for academic rigor
4. **Khan Academy** - Best for free foundational learning
5. **Skillshare** - Best for creative skills

Each platform offers unique advantages depending on your learning goals and budget.`,
    authorImage: "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=400&h=400&fit=crop",
    blogImage: "https://images.unsplash.com/photo-1542744095-fcf48d80b0fd?w=800&h=400&fit=crop",
  },
  {
    id: "5",
    title: "Mental Health Awareness Week",
    description: "College organizes workshops and sessions focusing on student mental wellbeing.",
    type: "NEWS",
    time: "Oct 20",
    date: "Oct 20",
    category: "Student Life",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=250&fit=crop",
    readTime: "4 min read",
    author: "College Wellness Center",
    authorRole: "Student Support",
    publishStatus: "Published",
    publishDate: "Oct 20",
    authorBio: "The College Wellness Center is dedicated to supporting student mental health and overall wellbeing.",
    content: `College organizes workshops and sessions focusing on student mental wellbeing during Mental Health Awareness Week.

Week's Schedule:
- **Monday**: Stress Management Workshop
- **Tuesday**: Mindfulness Meditation Sessions
- **Wednesday**: Counseling Services Open House
- **Thursday**: Peer Support Group Meetings
- **Friday**: Wellness Fair with Local Organizations

All events are free and open to all students.`,
    authorImage: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop",
    blogImage: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&h=400&fit=crop",
  },
  {
    id: "6",
    title: "Career Guidance for Freshmen",
    description: "Essential tips for first-year students to plan their career path effectively.",
    type: "BLOG",
    time: "Oct 18",
    date: "Oct 18",
    category: "Career",
    image: "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=400&h=250&fit=crop",
    readTime: "5 min read",
    author: "Career Services Department",
    authorRole: "Career Counselors",
    publishStatus: "Published",
    publishDate: "Oct 18",
    authorBio: "Our career services team helps students navigate their career paths from freshman year to graduation and beyond.",
    content: `Essential tips for first-year students to plan their career path effectively.

Key Steps for Freshmen:
1. **Self-Assessment**: Identify your interests, skills, and values
2. **Explore Options**: Research different career paths and industries
3. **Build Network**: Connect with professors, alumni, and professionals
4. **Gain Experience**: Look for internships and volunteer opportunities
5. **Develop Skills**: Focus on both technical and soft skills development

Start early to make the most of your college experience.`,
    authorImage: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=400&h=400&fit=crop",
    blogImage: "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=800&h=400&fit=crop",
  },
];

// Tab categories - Compact design
const tabs = [
  { id: "all", label: "All" },
  { id: "news", label: "Education News" },
  { id: "blogs", label: "Expert Blogs" },
];

const BlogsScreen = () => {
  const navigation = useNavigation();
  const [activeTab, setActiveTab] = useState("all");
  const [adIndex, setAdIndex] = useState(0);
  const adRef = useRef(null);
  const { width: screenWidth, height: screenHeight } = useWindowDimensions();
  const isTablet = screenWidth >= 768;

  // Calculate ad height based on screen size (bigger ads)
  const adHeight = Math.min(screenHeight * 0.3, 250); // 30% of screen height or max 250

  // Auto scroll ads
  useEffect(() => {
    const timer = setInterval(() => {
      setAdIndex((prev) => {
        const next = (prev + 1) % ads.length;
        adRef.current?.scrollTo({ x: next * screenWidth, animated: true });
        return next;
      });
    }, 3000);
    return () => clearInterval(timer);
  }, [screenWidth]);

  const filteredBlogs = blogsData.filter((blog) => {
    if (activeTab === "all") return true;
    if (activeTab === "news") return blog.type === "NEWS";
    if (activeTab === "blogs") return blog.type === "BLOG";
    return true;
  });

  // Advertisement Banner Component (Bigger size)
  const AdBanner = () => (
    <View style={styles.adContainer}>
      <ScrollView
        ref={adRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={(e) =>
          setAdIndex(Math.round(e.nativeEvent.contentOffset.x / screenWidth))
        }
      >
        {ads.map((ad, i) => (
          <TouchableOpacity
            key={ad.id}
            onPress={() => Linking.openURL(ad.url)}
            activeOpacity={0.9}
            style={styles.adSlide}
          >
            <Image
              source={{ uri: ad.image }}
              style={[styles.adImage, { 
                width: screenWidth, 
                height: adHeight 
              }]}
            />
            <View style={styles.adContent}>
              <Text style={styles.adTitle}>{ad.title}</Text>
              <Text style={styles.adDesc}>{ad.description}</Text>
            </View>
            <View style={styles.adBadge}>
              <Text style={styles.adBadgeText}>Ad</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
      
      {/* Dots Indicator */}
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
    </View>
  );

  const BlogCard = ({ blog }) => {
    const getTypeStyle = (type) => {
      return type === "NEWS" ? styles.newsBadge : styles.blogBadge;
    };

    return (
      <TouchableOpacity
        style={styles.blogCard}
        onPress={() => navigation.navigate("BlogDetailScreen", { 
          blogId: blog.id,
          blogTitle: blog.title,
          blogType: blog.type,
          blogTime: blog.time,
          blogDate: blog.date,
          blogCategory: blog.category,
          blogImage: blog.image,
          blogDescription: blog.description,
          blogReadTime: blog.readTime,
          blogAuthor: blog.author,
          blogAuthorRole: blog.authorRole,
          blogPublishStatus: blog.publishStatus,
          blogPublishDate: blog.publishDate,
          blogAuthorBio: blog.authorBio,
          blogContent: blog.content,
          blogAuthorImage: blog.authorImage,
          blogMainImage: blog.blogImage
        })}
        activeOpacity={0.8}
      >
        {/* Blog Image */}
        <Image source={{ uri: blog.image }} style={styles.blogImage} />
        
        <View style={styles.blogContent}>
          <View style={styles.blogHeader}>
            <View style={[styles.typeBadge, getTypeStyle(blog.type)]}>
              <Text style={styles.typeText}>{blog.type}</Text>
            </View>
            <Text style={styles.blogTime}>{blog.time}</Text>
          </View>
          
          <Text style={styles.blogCardTitle}>{blog.title}</Text>
          <Text style={styles.blogDescription} numberOfLines={2}>
            {blog.description}
          </Text>
          
          <View style={styles.blogFooter}>
            <View style={styles.categoryTag}>
              <Text style={styles.categoryText}>{blog.category}</Text>
            </View>
            <Text style={styles.blogDate}>{blog.date}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Blogs And News</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollView}>
        {/* Big Advertisement Banner First */}
        <AdBanner />

        {/* Tab Navigation */}
        <View style={styles.tabContainer}>
          {tabs.map((tab) => (
            <TouchableOpacity
              key={tab.id}
              style={[
                styles.tab, 
                activeTab === tab.id && styles.activeTab,
                Platform.OS === 'ios' ? styles.tabIOS : styles.tabAndroid
              ]}
              onPress={() => setActiveTab(tab.id)}
            >
              <Text style={[
                styles.tabText, 
                activeTab === tab.id && styles.activeTabText,
                Platform.OS === 'ios' ? styles.tabTextIOS : styles.tabTextAndroid
              ]}>
                {tab.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Blog List */}
        <View style={styles.blogListContainer}>
          {filteredBlogs.map((blog) => (
            <BlogCard key={blog.id} blog={blog} />
          ))}
        </View>

        {/* Available Banner */}
        <View style={styles.banner}>
          <Text style={styles.bannerTitle}>
            Latest Educational Content
          </Text>
          <Text style={styles.bannerSubtitle}>
            Stay updated with news, blogs and expert insights
          </Text>
        </View>

        {/* YouTube Video Section */}
        <View style={styles.videoSection}>
          <View style={styles.videoHeader}>
            <Text style={styles.videoTitle}>Educational Videos</Text>
            <TouchableOpacity
              onPress={() => Linking.openURL("https://www.youtube.com")}
            >
              <Text style={styles.viewAllText}>View All</Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.videoBox}>
            <WebView
              allowsFullscreenVideo
              source={{
                uri: "https://www.youtube.com/embed/dQw4w9WgXcQ",
              }}
              style={{ height: isTablet ? 280 : 220 }}
            />
          </View>
        </View>

        <View style={{ height: 80 }} />
      </ScrollView>

      <Footer />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: "#F6F9FF" 
  },
  scrollView: {
    flex: 1,
  },
  // Header
  header: {
    backgroundColor: "#0052A2",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: Platform.OS === 'ios' ? 12 : 16,
    height: Platform.OS === 'ios' ? 60 : 64,
  },
  headerTitle: {
    color: "#fff",
    fontSize: Platform.OS === 'ios' ? 20 : 22,
    fontWeight: "700",
  },
  // Big Advertisement Banner
  adContainer: {
    backgroundColor: "#fff",
    marginBottom: 0,
  },
  adSlide: {
    position: 'relative',
  },
  adImage: {
    resizeMode: "cover",
    width: '100%',
  },
  adContent: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    padding: 16,
  },
  adTitle: {
    color: "#fff",
    fontSize: Platform.OS === 'ios' ? 18 : 20,
    fontWeight: "700",
    marginBottom: 6,
  },
  adDesc: {
    color: "rgba(255, 255, 255, 0.9)",
    fontSize: Platform.OS === 'ios' ? 14 : 15,
  },
  adBadge: {
    position: "absolute",
    top: 16,
    right: 16,
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 6,
  },
  adBadgeText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "700",
  },
  dots: {
    flexDirection: "row",
    justifyContent: "center",
    paddingVertical: 12,
    backgroundColor: "#fff",
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#ccc",
    marginHorizontal: 5,
  },
  activeDot: {
    width: 20,
    backgroundColor: "#0B5ED7",
  },
  // Tab Navigation
  tabContainer: {
    flexDirection: "row",
    paddingHorizontal: 16,
    marginBottom: 16,
    backgroundColor: "#fff",
    borderBottomWidth: Platform.OS === 'ios' ? 0.5 : 1,
    borderBottomColor: "#E0E0E0",
    height: Platform.OS === 'ios' ? 48 : 52,
    alignItems: 'center',
  },
  tab: {
    paddingHorizontal: 16,
    paddingVertical: Platform.OS === 'ios' ? 8 : 10,
    marginRight: Platform.OS === 'ios' ? 16 : 20,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  tabIOS: {
    borderRadius: 8,
    paddingHorizontal: 14,
  },
  tabAndroid: {
    borderRadius: 4,
    paddingHorizontal: 16,
  },
  activeTab: {
    borderBottomColor: "#0B5ED7",
  },
  tabText: {
    fontSize: Platform.OS === 'ios' ? 14 : 15,
    fontWeight: Platform.OS === 'ios' ? "500" : "600",
  },
  tabTextIOS: {
    fontSize: 14,
    fontWeight: "500",
    color: "#666",
  },
  tabTextAndroid: {
    fontSize: 15,
    fontWeight: "600",
    color: "#666",
  },
  activeTabText: {
    color: "#0B5ED7",
    fontWeight: Platform.OS === 'ios' ? "600" : "700",
  },
  // Blog List
  blogListContainer: {
    backgroundColor: "#fff",
    paddingBottom: 16,
  },
  blogCard: {
    backgroundColor: "#fff",
    marginHorizontal: 16,
    marginBottom: 12,
    borderRadius: 12,
    overflow: "hidden",
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOpacity: 0.08,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 6,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  blogImage: {
    width: "100%",
    height: 180,
    resizeMode: "cover",
    backgroundColor: "#f0f0f0",
  },
  blogContent: {
    padding: 14,
  },
  blogHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  typeBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 4,
  },
  newsBadge: {
    backgroundColor: "rgba(0, 119, 182, 0.1)",
  },
  blogBadge: {
    backgroundColor: "rgba(76, 175, 80, 0.1)",
  },
  typeText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#003366",
  },
  blogTime: {
    fontSize: 12,
    color: "#666",
    fontWeight: "500",
  },
  blogCardTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#003366",
    marginBottom: 8,
    lineHeight: 20,
  },
  blogDescription: {
    fontSize: 13,
    color: "#666",
    lineHeight: 18,
    marginBottom: 12,
  },
  blogFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  categoryTag: {
    backgroundColor: "#F0F7FF",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 4,
  },
  categoryText: {
    fontSize: 11,
    fontWeight: "500",
    color: "#0072BC",
  },
  blogDate: {
    fontSize: 11,
    color: "#999",
    fontWeight: "500",
  },
  // Banner
  banner: {
    backgroundColor: "#4c73ac",
    marginHorizontal: 16,
    marginVertical: 16,
    borderRadius: 12,
    padding: 16,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 6,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  bannerTitle: { 
    color: "#fff", 
    fontSize: 16, 
    fontWeight: "700",
    marginBottom: 4,
  },
  bannerSubtitle: { 
    color: "#DCE8FF", 
    fontSize: 12,
  },
  // YouTube Video
  videoSection: {
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    marginBottom: 30,
  },
  videoHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  videoTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#003366",
  },
  viewAllText: {
    color: "#0B5ED7",
    fontSize: 14,
    fontWeight: "600",
  },
  videoBox: {
    borderRadius: 12,
    overflow: "hidden",
    backgroundColor: "#000",
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 4 },
        shadowRadius: 8,
      },
      android: {
        elevation: 4,
      },
    }),
  },
});

export default BlogsScreen;