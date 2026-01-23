import React, { useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Platform,
  StatusBar,
  SafeAreaView,
  Alert,
  Animated,
  Dimensions,
  Easing,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Footer from "../../src/components/Footer";
import { LinearGradient } from 'expo-linear-gradient';
import { fp, hp, wp, normalize } from "../../src/utils/Normalize";

const { width } = Dimensions.get('window');

export default function Profile() {
  const navigation = useNavigation();
  const [user, setUser] = useState(null);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideUpAnim = useRef(new Animated.Value(50)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;
  const progressAnim = useRef(new Animated.Value(0)).current;

  // 🔹 Load user from storage
  useEffect(() => {
    loadUser();
    startAnimations();
  }, []);

  const loadUser = async () => {
    try {
      const storedUser = await AsyncStorage.getItem("user");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.log("Failed to load user", error);
    }
  };

  const startAnimations = () => {
    // Fade in animation
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 600,
      useNativeDriver: true,
    }).start();

    // Slide up animation
    Animated.timing(slideUpAnim, {
      toValue: 0,
      duration: 500,
      easing: Easing.out(Easing.back(1.7)),
      useNativeDriver: true,
    }).start();

    // Scale animation for avatar
    Animated.spring(scaleAnim, {
      toValue: 1,
      friction: 6,
      tension: 40,
      useNativeDriver: true,
    }).start();

    // Animate progress bar
    Animated.timing(progressAnim, {
      toValue: 0.65, // 65% progress
      duration: 1200,
      easing: Easing.bezier(0.4, 0.0, 0.2, 1),
      useNativeDriver: false,
    }).start();
  };

  // 🔹 Logout
  const handleLogout = async () => {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Logout",
        style: "destructive",
        onPress: async () => {
          await AsyncStorage.clear();
          navigation.replace("Auth");
        },
      },
    ]);
  };

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" backgroundColor="#0B5394" />

      {/* Animated Header with Gradient */}
      <LinearGradient
        colors={['#0B5394', '#1C6CB0']}
        style={styles.headerGradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View style={styles.header}>
          <View style={styles.headerTop}>
            <TouchableOpacity
              style={styles.backBtn}
              onPress={() => navigation.goBack()}
              activeOpacity={0.7}
            >
              <Ionicons
                name={Platform.OS === "ios" ? "chevron-back" : "arrow-back"}
                size={fp(24)}
                color="#fff"
              />
            </TouchableOpacity>

            <Text style={styles.headerTitle}>My Profile</Text>
            <TouchableOpacity style={styles.settingsBtn}>
              <Ionicons name="settings-outline" size={22} color="#fff" />
            </TouchableOpacity>
          </View>

          {/* Profile Avatar */}
          <Animated.View
            style={[
              styles.profileAvatarContainer,
              {
                opacity: fadeAnim,
                transform: [{ translateY: slideUpAnim }]
              }
            ]}
          >
            <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
              <Image
                source={{
                  uri: user?.profilePic ||
                    "https://ui-avatars.com/api/?name=" +
                    (user?.username || "User") +
                    "&background=0B5394&color=fff&size=150&bold=true"
                }}
                style={styles.headerAvatar}
              />
            </Animated.View>

            <Text style={styles.headerName}>{user?.username || "—"}</Text>
            {/* <Text style={styles.headerRole}>Student</Text> */}
          </Animated.View>
        </View>
      </LinearGradient>

      {/* Main Content */}
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Personal Information Card - FIRST */}
        <Animated.View
          style={[
            styles.infoCard,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideUpAnim }]
            }
          ]}
        >
          <Text style={styles.cardTitle}>Personal Information</Text>

          <View style={styles.infoSection}>
            <View style={styles.infoIcon}>
              <Ionicons name="person" size={20} color="#0B5394" />
            </View>
            <View style={styles.infoContent}>
              <Text style={styles.infoLabel}>Full Name</Text>
              <Text style={styles.infoValue}>{user?.username || "—"}</Text>
            </View>
          </View>

          <View style={styles.infoSection}>
            <View style={styles.infoIcon}>
              <Ionicons name="mail" size={20} color="#0B5394" />
            </View>
            <View style={styles.infoContent}>
              <Text style={styles.infoLabel}>Email</Text>
              <Text style={styles.infoValue}>{user?.email || "—"}</Text>
            </View>
          </View>

          <View style={styles.infoSection}>
            <View style={styles.infoIcon}>
              <Ionicons name="call" size={20} color="#0B5394" />
            </View>
            <View style={styles.infoContent}>
              <Text style={styles.infoLabel}>Phone</Text>
              <Text style={styles.infoValue}>{user?.phone || "—"}</Text>
            </View>
          </View>

          <View style={styles.infoSection}>
            <View style={styles.infoIcon}>
              <Ionicons name="location" size={20} color="#0B5394" />
            </View>
            <View style={styles.infoContent}>
              <Text style={styles.infoLabel}>Location</Text>
              <Text style={styles.infoValue}>Coimbatore, Tamil Nadu</Text>
            </View>
          </View>

          <TouchableOpacity style={styles.editProfileBtn} activeOpacity={0.7}>
            <Ionicons name="create" size={20} color="#fff" />
            <Text style={styles.editProfileText}>Edit Profile</Text>
          </TouchableOpacity>
        </Animated.View>

        {/* IQ Score Card - SECOND */}
        <Animated.View
          style={[
            styles.iqCard,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideUpAnim }]
            }
          ]}
        >
          <LinearGradient
            colors={['#0B5394', '#1C6CB0']}
            style={styles.iqGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <View style={styles.iqHeader}>
              <Text style={styles.iqTitle}>IQ Score</Text>
              <TouchableOpacity>
                <Text style={styles.iqDetails}>View History →</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.iqContent}>
              <View style={styles.iqCircleContainer}>
                <View style={styles.iqCircle}>
                  <Text style={styles.iqScore}>121</Text>
                  <Text style={styles.iqLabel}>IQ</Text>
                </View>
              </View>

              <View style={styles.iqInfo}>
                <Text style={styles.iqResult}>
                  Higher than <Text style={styles.iqHighlight}>79%</Text> of users
                </Text>

                <Text style={styles.iqCategory}>Category: Intelligent</Text>

                {/* Animated Progress Bar */}
                <View style={styles.progressContainer}>
                  <View style={styles.progressLabels}>
                    <Text style={styles.progressLabel}>Average</Text>
                    <Text style={styles.progressLabel}>Gifted</Text>
                  </View>
                  <View style={styles.progressBarBackground}>
                    <Animated.View
                      style={[
                        styles.progressBarFill,
                        {
                          width: progressAnim.interpolate({
                            inputRange: [0, 1],
                            outputRange: ['0%', '65%']
                          })
                        }
                      ]}
                    />
                  </View>
                  <Text style={styles.progressText}>Your current level</Text>
                </View>
              </View>
            </View>
          </LinearGradient>
        </Animated.View>

        {/* Quick Actions */}
        <Animated.View
          style={[
            styles.actionsCard,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideUpAnim }]
            }
          ]}
        >
          <Text style={styles.cardTitle}>Settings</Text>

          <View style={styles.actionsList}>
            <TouchableOpacity style={styles.actionItem} activeOpacity={0.7}>
              <View style={[styles.actionIcon, { backgroundColor: 'rgba(52, 199, 89, 0.1)' }]}>
                <Ionicons name="notifications" size={22} color="#34C759" />
              </View>
              <Text style={styles.actionLabel}>Notifications</Text>
              <Ionicons name="chevron-forward" size={20} color="#999" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.actionItem} activeOpacity={0.7}>
              <View style={[styles.actionIcon, { backgroundColor: 'rgba(0, 122, 255, 0.1)' }]}>
                <Ionicons name="shield-checkmark" size={22} color="#007AFF" />
              </View>
              <Text style={styles.actionLabel}>Privacy & Security</Text>
              <Ionicons name="chevron-forward" size={20} color="#999" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.actionItem} activeOpacity={0.7}>
              <View style={[styles.actionIcon, { backgroundColor: 'rgba(255, 149, 0, 0.1)' }]}>
                <Ionicons name="help-circle" size={22} color="#FF9500" />
              </View>
              <Text style={styles.actionLabel}>Help & Support</Text>
              <Ionicons name="chevron-forward" size={20} color="#999" />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.actionItem}
              activeOpacity={0.7}
              onPress={handleLogout}
            >
              <View style={[styles.actionIcon, { backgroundColor: 'rgba(255, 59, 48, 0.1)' }]}>
                <Ionicons name="log-out" size={22} color="#FF3B30" />
              </View>
              <Text style={[styles.actionLabel, { color: '#FF3B30' }]}>Logout</Text>
              <Ionicons name="chevron-forward" size={20} color="#999" />
            </TouchableOpacity>
          </View>
        </Animated.View>
      </ScrollView>

      <Footer />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#f8f9fa'
  },

  // Header
  headerGradient: {
    borderBottomLeftRadius: normalize(30),
    borderBottomRightRadius: normalize(30),
    paddingTop: Platform.OS === 'ios' ? hp(10) : StatusBar.currentHeight + hp(10),
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: hp(10) },
        shadowOpacity: 0.2,
        shadowRadius: 20,
      },
      android: {
        elevation: 15,
      },
    }),
  },

  header: {
    paddingHorizontal: wp(20),
    paddingBottom: hp(30),
  },

  headerTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: hp(25),
  },

  backBtn: {
    width: wp(40),
    height: wp(40),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: normalize(20),
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },

  headerTitle: {
    color: '#fff',
    fontSize: Platform.OS === 'ios' ? fp(20) : fp(22),
    fontWeight: '800',
    letterSpacing: 0.5,
  },

  settingsBtn: {
    width: wp(40),
    height: wp(40),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: normalize(20),
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },

  profileAvatarContainer: {
    alignItems: 'center',
  },

  headerAvatar: {
    width: wp(100),
    height: wp(100),
    borderRadius: normalize(50),
    borderWidth: 4,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    marginBottom: hp(15),
  },

  headerName: {
    fontSize: fp(24),
    fontWeight: '800',
    color: '#fff',
    marginBottom: hp(4),
  },

  headerRole: {
    fontSize: fp(16),
    color: 'rgba(255, 255, 255, 0.9)',
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    paddingHorizontal: wp(16),
    paddingVertical: hp(6),
    borderRadius: normalize(15),
  },

  // Content
  content: {
    paddingTop: hp(20),
    paddingBottom: hp(100),
    paddingHorizontal: wp(20),
  },

  // Personal Info Card
  infoCard: {
    backgroundColor: '#fff',
    borderRadius: normalize(20),
    padding: wp(20),
    marginBottom: hp(20),
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.08,
        shadowRadius: 12,
      },
      android: {
        elevation: 6,
      },
    }),
  },

  cardTitle: {
    fontSize: fp(20),
    fontWeight: '800',
    color: '#0B5394',
    marginBottom: hp(20),
  },

  infoSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: hp(20),
  },

  infoIcon: {
    width: wp(40),
    height: wp(40),
    borderRadius: normalize(20),
    backgroundColor: 'rgba(11, 83, 148, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: wp(15),
  },

  infoContent: {
    flex: 1,
  },

  infoLabel: {
    fontSize: fp(12),
    color: '#666',
    marginBottom: hp(4),
  },

  infoValue: {
    fontSize: fp(16),
    fontWeight: '600',
    color: '#333',
  },

  editProfileBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0B5394',
    borderRadius: normalize(12),
    paddingVertical: hp(14),
    marginTop: hp(10),
    ...Platform.select({
      ios: {
        shadowColor: '#0B5394',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 6,
      },
      android: {
        elevation: 4,
      },
    }),
  },

  editProfileText: {
    color: '#fff',
    fontSize: fp(16),
    fontWeight: '600',
    marginLeft: wp(8),
  },

  // IQ Card
  iqCard: {
    borderRadius: normalize(20),
    marginBottom: hp(20),
    overflow: 'hidden',
    ...Platform.select({
      ios: {
        shadowColor: '#0B5394',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.25,
        shadowRadius: 15,
      },
      android: {
        elevation: 10,
      },
    }),
  },

  iqGradient: {
    padding: wp(20),
  },

  iqHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: hp(20),
  },

  iqTitle: {
    fontSize: fp(20),
    fontWeight: '800',
    color: '#fff',
  },

  iqDetails: {
    fontSize: fp(14),
    color: 'rgba(255, 255, 255, 0.9)',
    fontWeight: '600',
  },

  iqContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  iqCircleContainer: {
    marginRight: wp(20),
  },

  iqCircle: {
    width: wp(100),
    height: wp(100),
    borderRadius: normalize(50),
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderWidth: 4,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  iqScore: {
    fontSize: fp(32),
    fontWeight: '900',
    color: '#fff',
  },

  iqLabel: {
    fontSize: fp(14),
    color: 'rgba(255, 255, 255, 0.9)',
    fontWeight: '600',
  },

  iqInfo: {
    flex: 1,
  },

  iqResult: {
    fontSize: fp(16),
    color: '#fff',
    marginBottom: hp(8),
  },

  iqHighlight: {
    fontWeight: '800',
    color: '#FFD700',
  },

  iqCategory: {
    fontSize: fp(14),
    color: 'rgba(255, 255, 255, 0.9)',
    marginBottom: hp(15),
    fontWeight: '600',
  },

  progressContainer: {
    marginTop: hp(10),
  },

  progressLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: hp(8),
  },

  progressLabel: {
    fontSize: fp(12),
    color: 'rgba(255, 255, 255, 0.7)',
    fontWeight: '600',
  },

  progressBarBackground: {
    height: hp(8),
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: normalize(4),
    overflow: 'hidden',
    marginBottom: hp(8),
  },

  progressBarFill: {
    height: '100%',
    backgroundColor: '#FFD700',
    borderRadius: normalize(4),
  },

  progressText: {
    fontSize: fp(12),
    color: 'rgba(255, 255, 255, 0.7)',
    textAlign: 'center',
  },

  // Actions Card
  actionsCard: {
    backgroundColor: '#fff',
    borderRadius: normalize(20),
    padding: wp(20),
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.08,
        shadowRadius: 12,
      },
      android: {
        elevation: 6,
      },
    }),
  },

  actionsList: {
    marginTop: hp(10),
  },

  actionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: hp(16),
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },

  actionIcon: {
    width: wp(40),
    height: wp(40),
    borderRadius: normalize(20),
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: wp(15),
  },

  actionLabel: {
    flex: 1,
    fontSize: fp(16),
    fontWeight: '600',
    color: '#333',
  },
});