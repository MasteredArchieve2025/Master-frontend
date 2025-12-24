import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Linking,
  SafeAreaView,
  Platform,
  StatusBar,
  useWindowDimensions,
} from 'react-native';
import { FontAwesome, Feather, Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import Footer from '../../src/components/Footer';
// Local studio logo
const STUDIO_LOGO = require('../../assets/DanceStudio.png');

// Gallery images
const galleryImages = [
  require('../../assets/ExSkGallery.png'),
  require('../../assets/ExSkGallery2.png'),
  require('../../assets/ExSkGallery.png'),
  require('../../assets/ExSkGallery2.png'),
];

export default function Extraskills4() {
  const navigation = useNavigation();
  const { width } = useWindowDimensions();
  const isTablet = width >= 768;

  const handleWhatsApp = () => {
    Linking.openURL('whatsapp://send?text=Hello&phone=+123456789');
  };

  const handleCall = () => {
    Linking.openURL('tel:+123456789');
  };

  return (
    <SafeAreaView style={styles.safe}>
      {/* Status Bar */}
      <StatusBar barStyle="light-content" backgroundColor="#0052A2" />

      {/* Header (Same as other screens) */}
      <View style={styles.headerWrapper}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backBtn}
            onPress={() => navigation.goBack()}
          >
            <Ionicons
              name={Platform.OS === 'ios' ? 'chevron-back' : 'arrow-back'}
              size={24}
              color="#fff"
            />
          </TouchableOpacity>

          <Text style={styles.headerTitle}>Studio Details</Text>

          {/* Spacer */}
          <View style={styles.rightSpace} />
        </View>
      </View>

      {/* Content */}
      <ScrollView
        style={[
          styles.scrollContent,
          isTablet && styles.tabletPadding,
        ]}
        contentContainerStyle={{ paddingBottom: 140 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Studio Header */}
        <View style={styles.studioHeader}>
          <Image
            source={STUDIO_LOGO}
            style={[
              styles.logo,
              isTablet && { width: 120, height: 120 },
            ]}
          />
          <Text
            style={[
              styles.studioName,
              isTablet && { fontSize: 28 },
            ]}
          >
            eMotion Dance Studio
          </Text>
        </View>

        {/* Description */}
        <View style={styles.section}>
          <Text
            style={[
              styles.description,
              isTablet && { fontSize: 16 },
            ]}
          >
            At our renowned dance school, with over 18 years of experience and a reputation for exceptional hospitality,
            we offer a diverse range of programs to cater to different interests and passions.
          </Text>
        </View>

        {/* Offers */}
        <View style={styles.section}>
          <Text
            style={[
              styles.subTitle,
              isTablet && { fontSize: 22 },
            ]}
          >
            We Offer:
          </Text>
          <Text style={styles.listItem}>• Bharatanatyam</Text>
          <Text style={styles.listItem}>• Western Dance</Text>
          <Text style={styles.listItem}>• Zumba and Fitness</Text>
        </View>

        {/* Website */}
        <View style={styles.section}>
          <Text style={styles.subTitle}>Website:</Text>
          <Text
            style={styles.link}
            onPress={() => Linking.openURL('http://www.eMotion.com')}
          >
            www.eMotion.com
          </Text>
        </View>

        {/* Gallery */}
        <View style={styles.section}>
          <Text style={styles.subTitle}>Our Gallery:</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {galleryImages.map((image, index) => (
              <Image
                key={index}
                source={image}
                style={[
                  styles.galleryImage,
                  isTablet && { width: 140, height: 140 },
                ]}
              />
            ))}
          </ScrollView>
        </View>

        {/* About Master */}
        <View style={styles.section}>
          <Text style={styles.subTitle}>About Our Master:</Text>
          <Text style={styles.description}>
            Mr. Ram Ranjith, our esteemed Dance Master, is a visionary artistic director and accomplished fitness
            instructor whose journey in the world of dance and fine arts spans over two decades. A proud alumnus of
            Kalaamandalam, he holds a Diploma in Bharatanatyam (DFA) and a Diploma in Fine Arts. He also earned a Diploma
            in Western Dance from the renowned Institute of Fine Arts, Mumbai, and is certified in Zumba Level 1,
            Level 2, and Strong by Zumba.
          </Text>
        </View>
      </ScrollView>

      {/* Fixed Footer */}
      <View style={[styles.footer, isTablet && styles.tabletFooter]}>
        <TouchableOpacity
          style={[styles.actionButton, { backgroundColor: '#25D366' }]}
          onPress={handleWhatsApp}
        >
          <FontAwesome name="whatsapp" size={20} color="#fff" style={styles.icon} />
          <Text style={styles.actionText}>WhatsApp</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.actionButton, { backgroundColor: '#004080' }]}
          onPress={handleCall}
        >
          <Feather name="phone-call" size={20} color="#fff" style={styles.icon} />
          <Text style={styles.actionText}>Call</Text>
        </TouchableOpacity>
      </View>
      <Footer/>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  /* Safe Area */
  safe: {
    flex: 1,
    backgroundColor: '#fff',
  },

  /* Header */
  headerWrapper: {
    backgroundColor: '#0052A2',
  },

  header: {
    height: Platform.OS === 'ios' ? 52 : 64,
    backgroundColor: '#0052A2',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: Platform.OS === 'ios' ? 6 : 8,
  },

  backBtn: {
    width: 40,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },

  headerTitle: {
    flex: 1,
    textAlign: 'center',
    fontSize: Platform.OS === 'ios' ? 17 : 18,
    fontWeight: Platform.OS === 'ios' ? '600' : '700',
    color: '#fff',
  },

  rightSpace: {
    width: 40,
  },

  /* Content */
  scrollContent: {
    flex: 1,
    padding: 16,
  },

  tabletPadding: {
    paddingHorizontal: 40,
  },

  studioHeader: {
    alignItems: 'center',
    marginBottom: 20,
  },

  logo: {
    width: 90,
    height: 90,
    resizeMode: 'contain',
    marginBottom: 10,
  },

  studioName: {
    fontSize: 24,
    fontWeight: '700',
    color: '#004780',
  },

  section: {
    marginBottom: 20,
  },

  description: {
    fontSize: 14,
    color: '#444',
    lineHeight: 20,
    textAlign: 'justify',
  },

  subTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#004780',
    marginBottom: 10,
  },

  listItem: {
    fontSize: 14,
    color: '#444',
    marginBottom: 6,
  },

  link: {
    fontSize: 14,
    color: '#1E90FF',
    textDecorationLine: 'underline',
  },

  galleryImage: {
    width: 100,
    height: 100,
    marginRight: 10,
    borderRadius: 10,
  },

  /* Footer */
  footer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: '#fff',
    elevation: 10,
  },

  tabletFooter: {
    paddingHorizontal: 40,
  },

  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 6,
    paddingVertical: 10,
    paddingHorizontal: 16,
    flex: 0.48,
    justifyContent: 'center',
  },

  icon: {
    marginRight: 8,
  },

  actionText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
