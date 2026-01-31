import React, { useRef, useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  useWindowDimensions,
  Linking,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { 
  Ionicons, 
  MaterialIcons, 
  FontAwesome, 
  MaterialCommunityIcons,
  Feather,
} from "@expo/vector-icons";
import { WebView } from "react-native-webview";

// Advertisement banners data
const bannerAds = [
  {
    id: "1",
    title: "Premium Education Facilities",
    description: "State-of-the-art infrastructure for better learning",
    image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1200&h=400&fit=crop",
    url: "https://example.com/education-facilities"
  },
  {
    id: "2",
    title: "Expert Faculty Members",
    description: "Learn from industry professionals and experienced educators",
    image: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=1200&h=400&fit=crop",
    url: "https://example.com/expert-faculty"
  },
  {
    id: "3",
    title: "Modern Campus Facilities",
    description: "Advanced labs, libraries, and sports amenities",
    image: "https://images.unsplash.com/photo-1562774053-701939374585?w=1200&h=400&fit=crop",
    url: "https://example.com/campus-facilities"
  },
];

export default function InstituteDetails({ navigation, route }) {
  const { width: screenWidth, height: screenHeight } = useWindowDimensions();
  
  // Responsive breakpoints
  const isMobile = screenWidth < 768;
  const isTablet = screenWidth >= 768 && screenWidth < 1024;
  const isDesktop = screenWidth >= 1024;
  const isWeb = Platform.OS === 'web';
  
  // Responsive value helper
  const responsiveValue = (mobile, tablet, desktop) => {
    if (isDesktop) return desktop;
    if (isTablet) return tablet;
    return mobile;
  };

  // Responsive scaling helper
  const scale = (size) => {
    if (isDesktop) return size * 1.2;
    if (isTablet) return size * 1.1;
    return size;
  };

  const { institution } = route.params || {};

  // Advertisement banner state
  const adRef = useRef(null);
  const [adIndex, setAdIndex] = useState(0);

  // Auto scroll ads
  useEffect(() => {
    const timer = setInterval(() => {
      setAdIndex((prev) => {
        const next = (prev + 1) % bannerAds.length;
        adRef.current?.scrollTo({ x: next * screenWidth, animated: true });
        return next;
      });
    }, 3000);
    return () => clearInterval(timer);
  }, [screenWidth]);

  // Calculate all responsive values
  const headerHeight = responsiveValue(
    Platform.OS === 'ios' ? 64 : 68,
    Platform.OS === 'ios' ? 72 : 76,
    Platform.OS === 'ios' ? 80 : 84
  );
  
  const headerPaddingHorizontal = responsiveValue(16, 24, 32);
  const headerPaddingVertical = responsiveValue(12, 16, 20);
  const headerTitleSize = responsiveValue(18, 20, 22);
  
  const contentPaddingHorizontal = responsiveValue(16, 24, 32);
  const cardMarginTop = responsiveValue(16, 20, 24);
  const cardPadding = responsiveValue(16, 20, 24);
  const cardBorderRadius = responsiveValue(16, 18, 20);
  
  const logoSize = responsiveValue(80, 100, 120);
  const logoBorderRadius = responsiveValue(12, 16, 20);
  const instituteNameSize = responsiveValue(20, 22, 24);
  const titleMargin = responsiveValue(12, 16, 20);
  const titleSize = responsiveValue(16, 18, 20);
  
  const typeBadgePaddingH = responsiveValue(12, 14, 16);
  const typeBadgePaddingV = responsiveValue(6, 8, 10);
  const typeBadgeRadius = responsiveValue(6, 8, 10);
  const typeTextSize = responsiveValue(12, 13, 14);
  const ratingSize = responsiveValue(14, 16, 18);
  
  const starSize = responsiveValue(16, 18, 20);
  const locationIconSize = responsiveValue(18, 20, 22);
  const locationTitleSize = responsiveValue(16, 18, 20);
  const locationLabelSize = responsiveValue(12, 13, 14);
  const locationValueSize = responsiveValue(14, 16, 18);
  const locationGap = responsiveValue(12, 16, 20);
  
  const descriptionSize = responsiveValue(14, 15, 16);
  const descriptionLineHeight = responsiveValue(22, 24, 26);
  
  const statsGap = responsiveValue(8, 12, 16);
  const statCardPadding = responsiveValue(16, 20, 24);
  const statCardRadius = responsiveValue(12, 16, 20);
  const statCardWidth = isMobile ? '48%' : (isTablet ? '23%' : '23%');
  const statIconSize = responsiveValue(24, 28, 32);
  const statNumberSize = responsiveValue(20, 22, 24);
  const statLabelSize = responsiveValue(12, 13, 14);
  
  const featuresGap = responsiveValue(8, 12, 16);
  const featureRowGap = responsiveValue(8, 10, 12);
  const featureIconSize = responsiveValue(16, 18, 20);
  const featureTextSize = responsiveValue(14, 15, 16);
  
  const facilitiesGap = responsiveValue(8, 12, 16);
  const facilityItemPadding = responsiveValue(12, 16, 20);
  const facilityItemRadius = responsiveValue(10, 12, 14);
  const facilityItemWidth = isMobile ? '48%' : (isTablet ? '31%' : '23%');
  const facilityIconSize = responsiveValue(20, 24, 28);
  const facilityTextSize = responsiveValue(12, 13, 14);
  
  const contactInfoGap = responsiveValue(12, 16, 20);
  const featureItemGap = responsiveValue(12, 16, 20);
  const featureItemIconSize = responsiveValue(18, 20, 22);
  const featureItemTitleSize = responsiveValue(12, 13, 14);
  const featureItemValueSize = responsiveValue(14, 16, 18);
  
  // Responsive ad banner height
  const adHeight = responsiveValue(
    200,  // Mobile
    240,  // Tablet
    260   // Desktop
  );

  // Responsive video height
  const videoHeight = responsiveValue(
    220,  // Mobile
    280,  // Tablet
    320   // Desktop
  );

  const videoSectionMargin = responsiveValue(20, 24, 28);
  const videoTitleSize = responsiveValue(16, 18, 20);
  const videoDescSize = responsiveValue(13, 14, 15);
  const videoDescLineHeight = responsiveValue(20, 22, 24);
  const videoBoxRadius = responsiveValue(12, 14, 16);
  
  const actionButtonGap = responsiveValue(8, 12, 16);
  const actionButtonPadding = responsiveValue(14, 16, 18);
  const actionButtonRadius = responsiveValue(10, 12, 14);
  const actionButtonIconSize = responsiveValue(18, 20, 22);
  const actionButtonTextSize = responsiveValue(14, 16, 18);

  // Advertisement Banner Component
  const AdBanner = () => {
    return (
      <View style={[
        styles.adContainer,
        { 
          marginBottom: responsiveValue(16, 20, 24),
          marginHorizontal: contentPaddingHorizontal,
          marginTop: cardMarginTop,
          borderRadius: cardBorderRadius,
          overflow: 'hidden',
        }
      ]}>
        <ScrollView
          ref={adRef}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onMomentumScrollEnd={(e) =>
            setAdIndex(Math.round(e.nativeEvent.contentOffset.x / screenWidth))
          }
        >
          {bannerAds.map((ad, i) => (
            <TouchableOpacity
              key={ad.id}
              onPress={() => Linking.openURL(ad.url)}
              activeOpacity={0.9}
              style={{ width: screenWidth - (contentPaddingHorizontal * 2) }}
            >
              <Image
                source={{ uri: ad.image }}
                style={[styles.adImage, { 
                  width: screenWidth - (contentPaddingHorizontal * 2), 
                  height: adHeight 
                }]}
                resizeMode="cover"
              />
              <View style={[
                styles.adContent,
                { 
                  padding: responsiveValue(16, 20, 24),
                  backgroundColor: 'rgba(0, 0, 0, 0.6)',
                }
              ]}>
                <Text style={[
                  styles.adTitle,
                  { 
                    fontSize: responsiveValue(18, 20, 22),
                    marginBottom: responsiveValue(4, 6, 8)
                  }
                ]}>
                  {ad.title}
                </Text>
                <Text style={[
                  styles.adDesc,
                  { 
                    fontSize: responsiveValue(14, 15, 16),
                    lineHeight: responsiveValue(20, 22, 24)
                  }
                ]}>
                  {ad.description}
                </Text>
              </View>
              <View style={[
                styles.adBadge,
                { 
                  paddingHorizontal: responsiveValue(8, 10, 12),
                  paddingVertical: responsiveValue(4, 6, 8),
                  borderRadius: responsiveValue(4, 6, 8),
                }
              ]}>
                <Text style={[
                  styles.adBadgeText,
                  { fontSize: responsiveValue(10, 12, 12) }
                ]}>
                  Ad
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
        
        {/* Dots Indicator */}
        <View style={[
          styles.dots, 
          { 
            position: 'absolute',
            bottom: responsiveValue(12, 16, 20),
            paddingVertical: responsiveValue(6, 8, 10),
            backgroundColor: 'transparent',
          }
        ]}>
          {bannerAds.map((_, i) => (
            <View
              key={i}
              style={[
                styles.dot, 
                { 
                  width: responsiveValue(6, 8, 10),
                  height: responsiveValue(6, 8, 10),
                  marginHorizontal: responsiveValue(4, 5, 6),
                },
                adIndex === i && styles.activeDot,
              ]}
            />
          ))}
        </View>
      </View>
    );
  };

  // Render star ratings
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(<Ionicons key={i} name="star" size={starSize} color="#FFD700" />);
      } else {
        stars.push(<Ionicons key={i} name="star-outline" size={starSize} color="#FFD700" />);
      }
    }
    return stars;
  };

  // Feature Item Component
  const FeatureItem = ({ icon, title, value }) => (
    <View style={[styles.featureItem, { gap: featureItemGap }]}>
      <View style={[
        styles.featureIcon,
        { 
          width: scale(40),
          height: scale(40),
          borderRadius: scale(20),
        }
      ]}>
        {icon}
      </View>
      <View style={styles.featureContent}>
        <Text style={[styles.featureTitle, { fontSize: featureItemTitleSize }]}>
          {title}
        </Text>
        <Text style={[styles.featureValue, { fontSize: featureItemValueSize }]}>
          {value}
        </Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={[
        styles.header,
        { 
          height: headerHeight,
          paddingHorizontal: headerPaddingHorizontal,
          paddingVertical: headerPaddingVertical,
        }
      ]}>
        <TouchableOpacity 
          onPress={() => navigation.goBack()}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Ionicons 
            name={Platform.OS === 'ios' ? 'chevron-back' : 'arrow-back'} 
            size={scale(24)} 
            color="#fff" 
          />
        </TouchableOpacity>
        <Text style={[
          styles.headerTitle,
          { fontSize: headerTitleSize }
        ]} numberOfLines={1}>
          Institute Details
        </Text>
        <TouchableOpacity 
          onPress={() => navigation.navigate("Home")}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Ionicons name="home-outline" size={scale(24)} color="#fff" />
        </TouchableOpacity>
      </View>

      <ScrollView 
        showsVerticalScrollIndicator={isWeb}
        style={styles.scrollView}
        contentContainerStyle={[
          styles.scrollContent,
          { paddingBottom: responsiveValue(30, 40, 50) }
        ]}
      >
        {/* Advertisement Banner */}
        <AdBanner />

        {/* Institute Header */}
        <View style={[
          styles.instituteHeader,
          { 
            marginHorizontal: contentPaddingHorizontal,
            marginTop: responsiveValue(8, 12, 16),
            padding: cardPadding,
            borderRadius: cardBorderRadius,
          }
        ]}>
          <Image
            source={{ uri: institution?.logo }}
            style={[
              styles.instituteLogo,
              { 
                width: logoSize,
                height: logoSize,
                borderRadius: logoBorderRadius,
              }
            ]}
          />
          <View style={[styles.titleContainer, { marginLeft: responsiveValue(16, 20, 24) }]}>
            <Text style={[
              styles.instituteName,
              { fontSize: instituteNameSize }
            ]}>
              {institution?.name}
            </Text>
            <View style={styles.typeRatingContainer}>
              <View style={[
                styles.typeBadge,
                institution?.type?.includes("Private") 
                  ? { backgroundColor: "#F3E5F5" } 
                  : { backgroundColor: "#E3F2FD" },
                { 
                  paddingHorizontal: typeBadgePaddingH,
                  paddingVertical: typeBadgePaddingV,
                  borderRadius: typeBadgeRadius,
                }
              ]}>
                <Text style={[
                  styles.typeText,
                  institution?.type?.includes("Private")
                    ? { color: "#7B1FA2" }
                    : { color: "#1565C0" },
                  { fontSize: typeTextSize }
                ]}>
                  {institution?.type}
                </Text>
              </View>
              <View style={styles.ratingContainer}>
                {renderStars(institution?.rating || 4.5)}
                <Text style={[
                  styles.ratingText,
                  { fontSize: ratingSize }
                ]}>
                  {institution?.rating || 4.5}/5
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Location Details */}
        <View style={[
          styles.locationCard,
          { 
            marginHorizontal: contentPaddingHorizontal,
            marginTop: cardMarginTop,
            padding: cardPadding,
            borderRadius: cardBorderRadius,
          }
        ]}>
          <View style={styles.locationHeader}>
            <Feather name="map-pin" size={scale(20)} color="#4A90E2" />
            <Text style={[
              styles.locationTitle,
              { fontSize: locationTitleSize }
            ]}>
              Location Details
            </Text>
          </View>
          <View style={[styles.locationDetails, { gap: locationGap }]}>
            <View style={styles.locationRow}>
              <MaterialIcons name="location-city" size={locationIconSize} color="#666" />
              <View style={[styles.locationInfo, { marginLeft: responsiveValue(12, 16, 20) }]}>
                <Text style={[styles.locationLabel, { fontSize: locationLabelSize }]}>
                  Area
                </Text>
                <Text style={[styles.locationValue, { fontSize: locationValueSize }]}>
                  {institution?.area}
                </Text>
              </View>
            </View>
            <View style={styles.locationRow}>
              <MaterialCommunityIcons name="city" size={locationIconSize} color="#666" />
              <View style={[styles.locationInfo, { marginLeft: responsiveValue(12, 16, 20) }]}>
                <Text style={[styles.locationLabel, { fontSize: locationLabelSize }]}>
                  District
                </Text>
                <Text style={[styles.locationValue, { fontSize: locationValueSize }]}>
                  {institution?.district}
                </Text>
              </View>
            </View>
            <View style={styles.locationRow}>
              <Ionicons name="calendar" size={locationIconSize} color="#666" />
              <View style={[styles.locationInfo, { marginLeft: responsiveValue(12, 16, 20) }]}>
                <Text style={[styles.locationLabel, { fontSize: locationLabelSize }]}>
                  Established
                </Text>
                <Text style={[styles.locationValue, { fontSize: locationValueSize }]}>
                  {institution?.established}
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Description */}
        <View style={[
          styles.sectionCard,
          { 
            marginHorizontal: contentPaddingHorizontal,
            marginTop: cardMarginTop,
            padding: cardPadding,
            borderRadius: cardBorderRadius,
          }
        ]}>
          <Text style={[
            styles.sectionTitle,
            { 
              fontSize: titleSize,
              marginBottom: titleMargin,
            }
          ]}>
            About Institute
          </Text>
          <Text style={[
            styles.descriptionText,
            { 
              fontSize: descriptionSize,
              lineHeight: descriptionLineHeight,
            }
          ]}>
            {institution?.description || "A premier educational institution offering quality education with modern facilities and experienced faculty."}
          </Text>
        </View>

        {/* Quick Stats */}
        <View style={[
          styles.statsGrid,
          { 
            marginHorizontal: contentPaddingHorizontal,
            marginTop: cardMarginTop,
            gap: statsGap,
          }
        ]}>
          {[
            {
              icon: <Ionicons name="people" size={statIconSize} color="#4A90E2" />,
              number: institution?.students || "2,500+",
              label: "Students",
            },
            {
              icon: <MaterialIcons name="school" size={statIconSize} color="#50C878" />,
              number: institution?.courses || "15+",
              label: "Courses",
            },
            {
              icon: <FontAwesome name="graduation-cap" size={statIconSize - 2} color="#FF6B6B" />,
              number: `${institution?.rating || 4.5}/5`,
              label: "Rating",
            },
            {
              icon: <MaterialIcons name="verified" size={statIconSize} color="#9B59B6" />,
              number: institution?.established || "1995",
              label: "Established",
            },
          ].map((stat, index) => (
            <View 
              key={index}
              style={[
                styles.statCard,
                { 
                  width: statCardWidth,
                  padding: statCardPadding,
                  borderRadius: statCardRadius,
                }
              ]}
            >
              {stat.icon}
              <Text style={[
                styles.statNumber,
                { fontSize: statNumberSize }
              ]}>
                {stat.number}
              </Text>
              <Text style={[
                styles.statLabel,
                { fontSize: statLabelSize }
              ]}>
                {stat.label}
              </Text>
            </View>
          ))}
        </View>

        {/* Key Features */}
        <View style={[
          styles.sectionCard,
          { 
            marginHorizontal: contentPaddingHorizontal,
            marginTop: cardMarginTop,
            padding: cardPadding,
            borderRadius: cardBorderRadius,
          }
        ]}>
          <Text style={[
            styles.sectionTitle,
            { 
              fontSize: titleSize,
              marginBottom: titleMargin,
            }
          ]}>
            Key Features
          </Text>
          <View style={[styles.featuresList, { gap: featuresGap }]}>
            {(institution?.features || ["Smart Classes", "Sports Academy", "STEM Labs"]).map((feature, index) => (
              <View key={index} style={[styles.featureRow, { gap: featureRowGap }]}>
                <Ionicons name="checkmark-circle" size={featureIconSize} color="#50C878" />
                <Text style={[
                  styles.featureItemText,
                  { fontSize: featureTextSize }
                ]}>
                  {feature}
                </Text>
              </View>
            ))}
          </View>
        </View>

        {/* Facilities */}
        <View style={[
          styles.sectionCard,
          { 
            marginHorizontal: contentPaddingHorizontal,
            marginTop: cardMarginTop,
            padding: cardPadding,
            borderRadius: cardBorderRadius,
          }
        ]}>
          <Text style={[
            styles.sectionTitle,
            { 
              fontSize: titleSize,
              marginBottom: titleMargin,
            }
          ]}>
            Facilities
          </Text>
          <View style={[styles.facilitiesGrid, { gap: facilitiesGap }]}>
            {(institution?.facilities || ["Wi-Fi Campus", "Computer Lab", "Library", "Sports Complex", "Science Labs", "Cafeteria"])
              .slice(0, isMobile ? 6 : (isTablet ? 6 : 8))
              .map((facility, index) => (
              <View 
                key={index} 
                style={[
                  styles.facilityItem,
                  { 
                    width: facilityItemWidth,
                    padding: facilityItemPadding,
                    borderRadius: facilityItemRadius,
                  }
                ]}
              >
                {index === 0 && <Ionicons name="wifi" size={facilityIconSize} color="#4A90E2" />}
                {index === 1 && <MaterialIcons name="computer" size={facilityIconSize} color="#50C878" />}
                {index === 2 && <Ionicons name="library" size={facilityIconSize} color="#FF6B6B" />}
                {index === 3 && <Ionicons name="fitness" size={facilityIconSize} color="#9B59B6" />}
                {index === 4 && <MaterialIcons name="science" size={facilityIconSize} color="#FFA500" />}
                {index === 5 && <MaterialIcons name="local-cafe" size={facilityIconSize} color="#E74C3C" />}
                {index === 6 && <MaterialIcons name="local-hospital" size={facilityIconSize} color="#2ECC71" />}
                {index === 7 && <MaterialIcons name="security" size={facilityIconSize} color="#E67E22" />}
                <Text style={[
                  styles.facilityText,
                  { fontSize: facilityTextSize }
                ]}>
                  {facility}
                </Text>
              </View>
            ))}
          </View>
        </View>

        {/* Contact Info */}
        <View style={[
          styles.sectionCard,
          { 
            marginHorizontal: contentPaddingHorizontal,
            marginTop: cardMarginTop,
            padding: cardPadding,
            borderRadius: cardBorderRadius,
          }
        ]}>
          <Text style={[
            styles.sectionTitle,
            { 
              fontSize: titleSize,
              marginBottom: titleMargin,
            }
          ]}>
            Contact Information
          </Text>
          <View style={[styles.contactInfo, { gap: contactInfoGap }]}>
            <FeatureItem
              icon={<Ionicons name="call" size={featureItemIconSize} color="#4A90E2" />}
              title="Phone"
              value={institution?.contact?.phone || "+91 98765 43210"}
            />
            <FeatureItem
              icon={<MaterialIcons name="email" size={featureItemIconSize} color="#50C878" />}
              title="Email"
              value={institution?.contact?.email || "info@institution.edu"}
            />
            <FeatureItem
              icon={<Feather name="globe" size={featureItemIconSize} color="#FF6B6B" />}
              title="Website"
              value={institution?.contact?.website || "www.institution.edu"}
            />
            <FeatureItem
              icon={<Ionicons name="time" size={featureItemIconSize} color="#9B59B6" />}
              title="Working Hours"
              value="Mon-Sat: 8:00 AM - 6:00 PM"
            />
          </View>
        </View>

        {/* YouTube Video */}
        <View style={[
          styles.videoSection,
          { 
            marginHorizontal: contentPaddingHorizontal,
            marginTop: videoSectionMargin,
          }
        ]}>
          <View style={[styles.videoHeader, { marginBottom: responsiveValue(12, 16, 20) }]}>
            <Ionicons name="logo-youtube" size={scale(24)} color="#FF0000" />
            <Text style={[
              styles.videoTitle,
              { 
                fontSize: videoTitleSize,
                marginLeft: responsiveValue(8, 10, 12),
              }
            ]}>
              Campus Tour
            </Text>
          </View>
          
          <View style={[
            styles.videoBox,
            { 
              height: videoHeight,
              borderRadius: videoBoxRadius,
              marginBottom: responsiveValue(12, 14, 16),
            }
          ]}>
            {isWeb ? (
              <iframe
                width="100%"
                height="100%"
                src="https://www.youtube.com/embed/L2zqTYgcpfg?rel=0&showinfo=0&modestbranding=1"
                title="Campus Tour Video"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                style={styles.videoIframe}
              />
            ) : (
              <WebView
                allowsFullscreenVideo
                javaScriptEnabled
                domStorageEnabled
                originWhitelist={["*"]}
                source={{
                  uri: "https://www.youtube.com/embed/L2zqTYgcpfg",
                }}
                style={{ flex: 1, height: videoHeight }}
              />
            )}
          </View>
          
          <Text style={[
            styles.videoDescription,
            { 
              fontSize: videoDescSize,
              lineHeight: videoDescLineHeight,
            }
          ]}>
            Take a virtual tour of {institution?.name} campus
          </Text>
        </View>

        {/* Action Buttons */}
        <View style={[
          styles.actionButtons,
          { 
            marginHorizontal: contentPaddingHorizontal,
            marginTop: cardMarginTop,
            gap: actionButtonGap,
          }
        ]}>
          <TouchableOpacity 
            style={[
              styles.actionBtn, 
              styles.visitBtn,
              { 
                paddingVertical: actionButtonPadding,
                borderRadius: actionButtonRadius,
              }
            ]}
            onPress={() => Linking.openURL(`https://${institution?.contact?.website || "www.institution.edu"}`)}
          >
            <Ionicons name="globe-outline" size={actionButtonIconSize} color="#fff" />
            <Text style={[
              styles.visitBtnText,
              { 
                fontSize: actionButtonTextSize,
                marginLeft: responsiveValue(8, 10, 12),
              }
            ]}>
              Visit Website
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[
              styles.actionBtn, 
              styles.contactBtn,
              { 
                paddingVertical: actionButtonPadding,
                borderRadius: actionButtonRadius,
              }
            ]}
            onPress={() => Linking.openURL(`tel:${institution?.contact?.phone || "+919876543210"}`)}
          >
            <Ionicons name="call-outline" size={actionButtonIconSize} color="#fff" />
            <Text style={[
              styles.contactBtnText,
              { 
                fontSize: actionButtonTextSize,
                marginLeft: responsiveValue(8, 10, 12),
              }
            ]}>
              Call Now
            </Text>
          </TouchableOpacity>
        </View>

        {/* Spacer */}
        <View style={{ height: responsiveValue(30, 40, 50) }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F6F9FF",
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  // Header
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
  headerTitle: {
    color: "#fff",
    fontWeight: "700",
    textAlign: "center",
    flex: 1,
    marginHorizontal: 10,
  },
  // Advertisement Banner
  adContainer: {
    backgroundColor: "#fff",
    position: 'relative',
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
      },
      android: {
        elevation: 3,
      },
      web: {
        boxShadow: "0 2px 12px rgba(0,0,0,0.1)",
      },
    }),
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
  },
  adTitle: {
    color: "#fff",
    fontWeight: "700",
  },
  adDesc: {
    color: "rgba(255, 255, 255, 0.9)",
  },
  adBadge: {
    position: "absolute",
    top: 12,
    right: 12,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
  },
  adBadgeText: {
    color: "#fff",
    fontWeight: "700",
  },
  dots: {
    flexDirection: "row",
    justifyContent: "center",
    left: 0,
    right: 0,
  },
  dot: {
    borderRadius: 4,
    backgroundColor: "rgba(255, 255, 255, 0.5)",
    transition: "all 0.3s ease",
  },
  activeDot: {
    backgroundColor: "#0B5ED7",
  },
  // Institute Header
  instituteHeader: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.08,
        shadowRadius: 12,
      },
      android: {
        elevation: 4,
      },
      web: {
        boxShadow: "0 4px 16px rgba(0,0,0,0.1)",
      },
    }),
  },
  instituteLogo: {
    resizeMode: "cover",
  },
  titleContainer: {
    flex: 1,
  },
  instituteName: {
    fontWeight: "700",
    color: "#003366",
  },
  typeRatingContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 8,
  },
  typeBadge: {},
  typeText: {
    fontWeight: "600",
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  ratingText: {
    color: "#666",
    fontWeight: "600",
    marginLeft: 8,
  },
  // Location Card
  locationCard: {
    backgroundColor: "#fff",
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.08,
        shadowRadius: 8,
      },
      android: {
        elevation: 3,
      },
      web: {
        boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
      },
    }),
  },
  locationHeader: {
    flexDirection: "row",
    alignItems: "center",
  },
  locationTitle: {
    fontWeight: "700",
    color: "#003366",
    marginLeft: 12,
  },
  locationDetails: {},
  locationRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  locationInfo: {},
  locationLabel: {
    color: "#666",
  },
  locationValue: {
    fontWeight: "600",
    color: "#003366",
  },
  // Section Card
  sectionCard: {
    backgroundColor: "#fff",
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.08,
        shadowRadius: 8,
      },
      android: {
        elevation: 3,
      },
      web: {
        boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
      },
    }),
  },
  sectionTitle: {
    fontWeight: "700",
    color: "#003366",
  },
  descriptionText: {
    color: "#666",
  },
  // Stats Grid
  statsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  statCard: {
    backgroundColor: "#fff",
    alignItems: "center",
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.08,
        shadowRadius: 8,
      },
      android: {
        elevation: 3,
      },
      web: {
        boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
      },
    }),
  },
  statNumber: {
    fontWeight: "700",
    color: "#003366",
    marginTop: 12,
    marginBottom: 6,
  },
  statLabel: {
    color: "#666",
    fontWeight: "500",
  },
  // Features List
  featuresList: {},
  featureRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  featureItemText: {
    color: "#444",
    flex: 1,
  },
  // Facilities Grid
  // Facilities Grid
  facilitiesGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  facilityItem: {
    backgroundColor: "#F8FAFF",
    alignItems: "center",
  },
  facilityText: {
    color: "#003366",
    fontWeight: "600",
    marginTop: 12,
    textAlign: "center",
  },
  // Contact Info
  contactInfo: {},
  featureItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  featureIcon: {
    backgroundColor: "#F0F7FF",
    justifyContent: "center",
    alignItems: "center",
  },
  featureContent: {
    flex: 1,
  },
  featureTitle: {
    color: "#666",
  },
  featureValue: {
    fontWeight: "600",
    color: "#003366",
  },
  // Video Section
  videoSection: {},
  videoHeader: {
    flexDirection: "row",
    alignItems: "center",
  },
  videoTitle: {
    fontWeight: "700",
    color: "#333",
  },
  videoBox: {
    overflow: "hidden",
    backgroundColor: "#000",
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
      },
      android: {
        elevation: 4,
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
  videoDescription: {
    color: "#666",
    textAlign: "center",
    fontStyle: "italic",
  },
  // Action Buttons
  actionButtons: {
    flexDirection: "row",
  },
  actionBtn: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  visitBtn: {
    backgroundColor: "#4A90E2",
  },
  contactBtn: {
    backgroundColor: "#50C878",
  },
  visitBtnText: {
    color: "#fff",
    fontWeight: "600",
  },
  contactBtnText: {
    color: "#fff",
    fontWeight: "600",
  },
});