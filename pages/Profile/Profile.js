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
  TextInput,
  KeyboardAvoidingView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Footer from "../../src/components/Footer";
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

export default function Profile() {
  const navigation = useNavigation();
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState({ username: "", email: "" });
  
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
        const userData = JSON.parse(storedUser);
        setUser(userData);
        setEditedUser({
          username: userData.username || "",
          email: userData.email || ""
        });
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

  // 🔹 Handle Save Profile
  const handleSaveProfile = async () => {
    try {
      const updatedUser = {
        ...user,
        username: editedUser.username,
        email: editedUser.email
      };
      
      await AsyncStorage.setItem("user", JSON.stringify(updatedUser));
      setUser(updatedUser);
      setIsEditing(false);
      Alert.alert("Success", "Profile updated successfully!");
    } catch (error) {
      Alert.alert("Error", "Failed to update profile");
      console.log("Failed to save user", error);
    }
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
                size={24}
                color="#fff"
              />
            </TouchableOpacity>

            <Text style={styles.headerTitle}>My Profile</Text>
            {/* Settings button removed as requested */}
            <View style={styles.settingsBtnPlaceholder} />
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
          </Animated.View>
        </View>
      </LinearGradient>

      {/* Main Content */}
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
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
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>Personal Information</Text>
            <TouchableOpacity 
              onPress={() => isEditing ? handleSaveProfile() : setIsEditing(true)}
              style={styles.editToggleBtn}
            >
              <Text style={styles.editToggleText}>
                {isEditing ? "Save" : "Edit"}
              </Text>
            </TouchableOpacity>
          </View>
          
          {/* Full Name Section */}
          <View style={styles.infoSection}>
            <View style={styles.infoIcon}>
              <Ionicons name="person" size={20} color="#0B5394" />
            </View>
            <View style={styles.infoContent}>
              <Text style={styles.infoLabel}>Full Name</Text>
              {isEditing ? (
                <TextInput
                  style={styles.input}
                  value={editedUser.username}
                  onChangeText={(text) => setEditedUser({...editedUser, username: text})}
                  placeholder="Enter your name"
                  placeholderTextColor="#999"
                />
              ) : (
                <Text style={styles.infoValue}>{user?.username || "—"}</Text>
              )}
            </View>
          </View>

          {/* Email Section */}
          <View style={styles.infoSection}>
            <View style={styles.infoIcon}>
              <Ionicons name="mail" size={20} color="#0B5394" />
            </View>
            <View style={styles.infoContent}>
              <Text style={styles.infoLabel}>Email</Text>
              {isEditing ? (
                <TextInput
                  style={styles.input}
                  value={editedUser.email}
                  onChangeText={(text) => setEditedUser({...editedUser, email: text})}
                  placeholder="Enter your email"
                  placeholderTextColor="#999"
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              ) : (
                <Text style={styles.infoValue}>{user?.email || "—"}</Text>
              )}
            </View>
          </View>

          {/* Phone Section (Read-only) */}
          <View style={styles.infoSection}>
            <View style={styles.infoIcon}>
              <Ionicons name="call" size={20} color="#0B5394" />
            </View>
            <View style={styles.infoContent}>
              <Text style={styles.infoLabel}>Phone</Text>
              <Text style={styles.infoValue}>{user?.phone || "—"}</Text>
            </View>
          </View>

          {/* Location section removed as requested */}
          
          {isEditing && (
            <View style={styles.editButtons}>
              <TouchableOpacity 
                style={styles.cancelBtn} 
                onPress={() => {
                  setIsEditing(false);
                  setEditedUser({
                    username: user?.username || "",
                    email: user?.email || ""
                  });
                }}
                activeOpacity={0.7}
              >
                <Text style={styles.cancelBtnText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.saveBtn} 
                onPress={handleSaveProfile}
                activeOpacity={0.7}
              >
                <Text style={styles.saveBtnText}>Save Changes</Text>
              </TouchableOpacity>
            </View>
          )}
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
            {/* Notifications section removed as requested */}

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
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    paddingTop: Platform.OS === 'ios' ? 10 : StatusBar.currentHeight + 10,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.2,
        shadowRadius: 20,
      },
      android: {
        elevation: 15,
      },
    }),
  },

  header: {
    paddingHorizontal: 20,
    paddingBottom: 30,
  },

  headerTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 25,
  },

  backBtn: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },

  headerTitle: {
    color: '#fff',
    fontSize: Platform.OS === 'ios' ? 20 : 22,
    fontWeight: '800',
    letterSpacing: 0.5,
  },

  settingsBtnPlaceholder: {
    width: 40,
    height: 40,
  },

  profileAvatarContainer: {
    alignItems: 'center',
  },

  headerAvatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 4,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    marginBottom: 15,
  },

  headerName: {
    fontSize: 24,
    fontWeight: '800',
    color: '#fff',
    marginBottom: 4,
  },

  // Content
  content: {
    paddingTop: 20,
    paddingBottom: 100,
    paddingHorizontal: 20,
  },

  // Personal Info Card
  infoCard: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
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

  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },

  cardTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#0B5394',
  },

  editToggleBtn: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#0B5394',
    borderRadius: 8,
  },

  editToggleText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },

  infoSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },

  infoIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(11, 83, 148, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },

  infoContent: {
    flex: 1,
  },

  infoLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },

  infoValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },

  input: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    borderBottomWidth: 1,
    borderBottomColor: '#0B5394',
    paddingVertical: 4,
    paddingHorizontal: 0,
  },

  editButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    gap: 10,
  },

  cancelBtn: {
    flex: 1,
    paddingVertical: 12,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    alignItems: 'center',
  },

  cancelBtnText: {
    color: '#666',
    fontSize: 16,
    fontWeight: '600',
  },

  saveBtn: {
    flex: 1,
    paddingVertical: 12,
    backgroundColor: '#0B5394',
    borderRadius: 10,
    alignItems: 'center',
  },

  saveBtnText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },

  // IQ Card
  iqCard: {
    borderRadius: 20,
    marginBottom: 20,
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
    padding: 20,
  },

  iqHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },

  iqTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#fff',
  },

  iqDetails: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.9)',
    fontWeight: '600',
  },

  iqContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  iqCircleContainer: {
    marginRight: 20,
  },

  iqCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderWidth: 4,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  iqScore: {
    fontSize: 32,
    fontWeight: '900',
    color: '#fff',
  },

  iqLabel: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.9)',
    fontWeight: '600',
  },

  iqInfo: {
    flex: 1,
  },

  iqResult: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 8,
  },

  iqHighlight: {
    fontWeight: '800',
    color: '#FFD700',
  },

  iqCategory: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.9)',
    marginBottom: 15,
    fontWeight: '600',
  },

  progressContainer: {
    marginTop: 10,
  },

  progressLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },

  progressLabel: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.7)',
    fontWeight: '600',
  },

  progressBarBackground: {
    height: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 8,
  },

  progressBarFill: {
    height: '100%',
    backgroundColor: '#FFD700',
    borderRadius: 4,
  },

  progressText: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.7)',
    textAlign: 'center',
  },

  // Actions Card
  actionsCard: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
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
    marginTop: 10,
  },

  actionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },

  actionIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },

  actionLabel: {
    flex: 1,
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
});