// BlogDetailScreen.js
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
import { useNavigation, useRoute } from "@react-navigation/native";
import { WebView } from "react-native-webview";
import Footer from "../../src/components/Footer";

const { width } = Dimensions.get("window");

// Advertisement banners data
const ads = [
  {
    id: "1",
    title: "Study Abroad Scholarships",
    description: "Get up to 50% scholarship on international programs",
    image:
      "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=800&h=300&fit=crop",
    url: "https://example.com/scholarship",
  },
  {
    id: "2",
    title: "Online Learning Platform",
    description: "Access 1000+ courses for free this month",
    image:
      "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=800&h=300&fit=crop",
    url: "https://example.com/study-abroad",
  },
  {
    id: "3",
    title: "Career Development Program",
    description: "Boost your career with our certified programs",
    image:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&h=300&fit=crop",
    url: "https://example.com/courses",
  },
];

// Related updates data
const relatedUpdates = [
  {
    id: "1",
    title: "The Future of Remote Learning",
    type: "BLOG",
    date: "Oct 22",
  },
  {
    id: "2",
    title: "New Engineering Syllabus 2025",
    type: "NEWS",
    date: "2 hrs ago",
  },
  {
    id: "3",
    title: "Mental Health in Academia",
    type: "BLOG",
    date: "Oct 20",
  },
];

const BlogDetailScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [adIndex, setAdIndex] = useState(0);
  const adRef = useRef(null);
  const { width: screenWidth, height: screenHeight } = useWindowDimensions();
  const isTablet = screenWidth >= 768;

  // Get parameters from navigation
  const { 
    blogId = "1", 
    blogTitle = "New Engineering Syllabus Announced", 
    blogType = "NEWS", 
    blogTime = "2 hrs ago", 
    blogDate = "Oct 26", 
    blogCategory = "Curriculum", 
    blogImage = "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=250&fit=crop", 
    blogDescription = "The University board has released the updated curriculum focusing on AI and sustainable energy.",
    blogReadTime = "3 min read",
    blogAuthor = "University Board",
    blogAuthorRole = "Education Board",
    blogPublishStatus = "Published",
    blogPublishDate = "2 hrs ago",
    blogAuthorBio = "The University board regulates curriculum standards and updates for engineering programs nationwide.",
    blogContent = "The University board has released the updated curriculum focusing on AI and sustainable energy.",
    blogAuthorImage = "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=400&h=400&fit=crop",
    blogMainImage = "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&h=400&fit=crop"
  } = route.params || {};

  // Blog data from parameters
  const blogData = {
    id: blogId,
    type: blogType,
    readTime: blogReadTime,
    title: blogTitle,
    author: blogAuthor,
    authorRole: blogAuthorRole,
    publishStatus: blogPublishStatus,
    publishDate: blogPublishDate,
    authorBio: blogAuthorBio,
    content: blogContent || blogDescription,
    authorImage: blogAuthorImage,
    blogImage: blogMainImage || blogImage,
  };

  // Calculate ad height
  const adHeight = Math.min(screenHeight * 0.25, 200);

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

  // Advertisement Banner Component
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
              style={[
                styles.adImage,
                {
                  width: screenWidth,
                  height: adHeight,
                },
              ]}
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
            style={[styles.dot, adIndex === i && styles.activeDot]}
          />
        ))}
      </View>
    </View>
  );

  const RelatedUpdateItem = ({ item }) => (
    <TouchableOpacity
      style={styles.relatedItem}
      onPress={() => navigation.push("BlogDetailScreen", { 
        blogId: item.id,
        blogTitle: item.title,
        blogType: item.type,
        blogTime: item.date,
        blogDate: item.date,
        blogCategory: item.type === "NEWS" ? "News" : "Blog",
        blogImage: "https://images.unsplash.com/photo-1456513080510-34499c4359ce?w=400&h=250&fit=crop",
        blogDescription: `Read more about ${item.title.toLowerCase()}`,
        blogReadTime: "5 min read",
        blogAuthor: item.type === "NEWS" ? "News Reporter" : "Expert Author",
        blogAuthorRole: item.type === "NEWS" ? "Journalist" : "Education Specialist",
        blogPublishStatus: "Published",
        blogPublishDate: item.date,
        blogAuthorBio: item.type === "NEWS" ? "Professional journalist with years of experience in education reporting." : "Expert in the field with extensive knowledge and experience.",
        blogContent: `Full content about ${item.title}. This is a detailed article with comprehensive information.`,
        blogAuthorImage: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop",
        blogMainImage: "https://images.unsplash.com/photo-1456513080510-34499c4359ce?w=800&h=400&fit=crop"
      })}
    >
      <View style={styles.relatedItemHeader}>
        <View
          style={[
            styles.relatedTypeBadge,
            item.type === "NEWS" ? styles.newsBadge : styles.blogBadge,
          ]}
        >
          <Text style={styles.relatedTypeText}>{item.type}</Text>
        </View>
        <Text style={styles.relatedDate}>{item.date}</Text>
      </View>
      <Text style={styles.relatedTitle}>{item.title}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>
          {blogData.type === "NEWS" ? "News Detail" : "Expert Blog"}
        </Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.scrollView}
      >
        {/* Big Advertisement Banner First */}
        <AdBanner />

        {/* Blog Content */}
        <View style={styles.contentContainer}>
          {/* Blog Type and Read Time */}
          <View style={styles.typeContainer}>
            <View style={[
              styles.typeBadge,
              blogData.type === "NEWS" ? styles.newsBadgeDetail : styles.blogBadgeDetail
            ]}>
              <Text style={styles.typeText}>{blogData.type}</Text>
            </View>
            <Text style={styles.readTime}>{blogData.readTime}</Text>
          </View>

          {/* Blog Title */}
          <Text style={styles.blogTitle}>{blogData.title}</Text>

          {/* Author and Publish Info */}
          <View style={styles.authorContainer}>
            <Text style={styles.authorName}>{blogData.author}</Text>
            <Text style={styles.authorRole}>{blogData.authorRole}</Text>
            <View style={styles.publishContainer}>
              <Text style={styles.publishStatus}>{blogData.publishStatus}</Text>
              <Text style={styles.publishDate}>{blogData.publishDate}</Text>
            </View>
          </View>

          {/* Blog Image */}
          <Image
            source={{ uri: blogData.blogImage }}
            style={styles.blogMainImage}
          />

          {/* Divider */}
          <View style={styles.divider} />

          {/* Blog Content */}
          <Text style={styles.blogContent}>{blogData.content}</Text>

          {/* Author Bio Section */}
          <View style={styles.authorBioContainer}>
            <View style={styles.authorHeader}>
              <Image
                source={{ uri: blogData.authorImage }}
                style={styles.authorImage}
              />
              <View style={styles.authorInfo}>
                <Text style={styles.authorNameBio}>{blogData.author}</Text>
                <Text style={styles.authorRoleBio}>
                  {blogData.authorRole}
                </Text>
              </View>
            </View>
            <Text style={styles.authorBioText}>{blogData.authorBio}</Text>
            <TouchableOpacity style={styles.viewProfileButton}>
              <Text style={styles.viewProfileText}>View Profile →</Text>
            </TouchableOpacity>
          </View>

          {/* Divider */}
          <View style={styles.divider} />

          {/* Related Updates */}
          <View style={styles.relatedUpdatesContainer}>
            <Text style={styles.relatedTitleHeader}>Related Updates</Text>
            {relatedUpdates.map((item) => (
              <RelatedUpdateItem key={item.id} item={item} />
            ))}
          </View>

          {/* Available Banner */}
          <View style={styles.banner}>
            <Text style={styles.bannerTitle}>More Expert Content</Text>
            <Text style={styles.bannerSubtitle}>
              Explore our collection of expert blogs and news
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
                style={{ height: isTablet ? 260 : 200 }}
              />
            </View>
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
    backgroundColor: "#F6F9FF",
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
    paddingVertical: Platform.OS === "ios" ? 12 : 16,
    height: Platform.OS === "ios" ? 60 : 64,
  },
  headerTitle: {
    color: "#fff",
    fontSize: Platform.OS === "ios" ? 20 : 22,
    fontWeight: "700",
  },
  // Big Advertisement Banner
  adContainer: {
    backgroundColor: "#fff",
    marginBottom: 0,
  },
  adSlide: {
    position: "relative",
  },
  adImage: {
    resizeMode: "cover",
    width: "100%",
  },
  adContent: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    padding: 16,
  },
  adTitle: {
    color: "#fff",
    fontSize: Platform.OS === "ios" ? 18 : 20,
    fontWeight: "700",
    marginBottom: 6,
  },
  adDesc: {
    color: "rgba(255, 255, 255, 0.9)",
    fontSize: Platform.OS === "ios" ? 14 : 15,
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
  // Content Container
  contentContainer: {
    backgroundColor: "#fff",
    padding: 16,
  },
  // Blog Type and Read Time
  typeContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  typeBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    marginRight: 12,
  },
  newsBadgeDetail: {
    backgroundColor: "rgba(0, 119, 182, 0.1)",
  },
  blogBadgeDetail: {
    backgroundColor: "rgba(76, 175, 80, 0.1)",
  },
  typeText: {
    fontSize: 12,
    fontWeight: "700",
    color: "#003366",
  },
  readTime: {
    fontSize: 12,
    color: "#666",
    fontWeight: "500",
  },
  // Blog Main Image
  blogMainImage: {
    width: "100%",
    height: 200,
    resizeMode: "cover",
    borderRadius: 12,
    marginVertical: 16,
  },
  // Blog Title
  blogTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: "#003366",
    marginBottom: 16,
    lineHeight: 30,
  },
  // Author Info
  authorContainer: {
    marginBottom: 16,
  },
  authorName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#003366",
    marginBottom: 4,
  },
  authorRole: {
    fontSize: 14,
    color: "#666",
    marginBottom: 8,
  },
  publishContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  publishStatus: {
    fontSize: 13,
    color: "#4CAF50",
    fontWeight: "600",
    marginRight: 8,
  },
  publishDate: {
    fontSize: 13,
    color: "#999",
  },
  // Divider
  divider: {
    height: 1,
    backgroundColor: "#E0E0E0",
    marginVertical: 24,
  },
  // Blog Content
  blogContent: {
    fontSize: 15,
    lineHeight: 24,
    color: "#333",
    marginBottom: 24,
  },
  // Author Bio
  authorBioContainer: {
    backgroundColor: "#F8F9FA",
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
  },
  authorHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  authorImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 12,
  },
  authorInfo: {
    flex: 1,
  },
  authorNameBio: {
    fontSize: 16,
    fontWeight: "700",
    color: "#003366",
    marginBottom: 4,
  },
  authorRoleBio: {
    fontSize: 14,
    color: "#666",
  },
  authorBioText: {
    fontSize: 14,
    lineHeight: 20,
    color: "#555",
    marginBottom: 12,
  },
  viewProfileButton: {
    alignSelf: "flex-start",
  },
  viewProfileText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#0B5ED7",
  },
  // Related Updates
  relatedUpdatesContainer: {
    marginBottom: 24,
  },
  relatedTitleHeader: {
    fontSize: 18,
    fontWeight: "700",
    color: "#003366",
    marginBottom: 16,
  },
  relatedItem: {
    backgroundColor: "#F8F9FA",
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
  },
  relatedItemHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  relatedTypeBadge: {
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
  relatedTypeText: {
    fontSize: 11,
    fontWeight: "600",
    color: "#003366",
  },
  relatedDate: {
    fontSize: 11,
    color: "#666",
    fontWeight: "500",
  },
  relatedTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#003366",
    lineHeight: 20,
  },
  // Banner
  banner: {
    backgroundColor: "#4c73ac",
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
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

export default BlogDetailScreen;