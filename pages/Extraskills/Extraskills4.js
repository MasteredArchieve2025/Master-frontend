import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, Linking } from 'react-native';
import { FontAwesome, Feather } from '@expo/vector-icons';

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
  const handleWhatsApp = () => {
    Linking.openURL('whatsapp://send?text=Hello&phone=+123456789');
  };

  const handleCall = () => {
    Linking.openURL('tel:+123456789');
  };

  return (
    <View style={styles.container}>
      {/* Static Header */}
      <View style={styles.header}>
        <Image source={STUDIO_LOGO} style={styles.logo} />
        <Text style={styles.studioName}>eMotion Dance Studio</Text>
      </View>

      {/* Scrollable Content */}
      <ScrollView style={styles.scrollContent} contentContainerStyle={{ paddingBottom: 120 }}>
        {/* Description */}
        <View style={styles.infoSection}>
          <Text style={styles.description}>
            At our renowned dance school, with over 18 years of experience and a reputation for exceptional hospitality,
            we offer a diverse range of programs to cater to different interests and passions.
          </Text>
        </View>

        {/* Offers */}
        <View style={styles.offersSection}>
          <Text style={styles.subTitle}>We Offer:</Text>
          <Text style={styles.listItem}>• Bharatanatyam</Text>
          <Text style={styles.listItem}>• Western Dance</Text>
          <Text style={styles.listItem}>• Zumba and Fitness</Text>
        </View>

        {/* Website */}
        <View style={styles.websiteSection}>
          <Text style={styles.subTitle}>Website:</Text>
          <Text style={styles.link} onPress={() => Linking.openURL('http://www.eMotion.com')}>
            www.eMotion.com
          </Text>
        </View>

        {/* Gallery */}
        <View style={styles.gallerySection}>
          <Text style={styles.subTitle}>Our Gallery:</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {galleryImages.map((image, index) => (
              <Image key={index} source={image} style={styles.galleryImage} />
            ))}
          </ScrollView>
        </View>

        {/* About Master */}
        <View style={styles.aboutSection}>
          <Text style={styles.subTitle}>About Our Master:</Text>
          <Text style={styles.description}>
            Mr. Ram Ranjith, our esteemed Dance Master, is a visionary artistic director and accomplished fitness
            instructor whose journey in the world of dance and fine arts spans over two decades. A proud alumnus of
            Kalaamandalam, he holds a Diploma in Bharatanatyam (DFA) and a Diploma in Fine Arts. He also earned a Diploma
            in Western Dance from the renowned Institute of Fine Arts, Mumbai, and is certified in Zumba Level 1, Level 2,
            and Strong by Zumba.
          </Text>
        </View>
      </ScrollView>

      {/* Fixed Footer */}
      <View style={styles.footer}>
        <TouchableOpacity style={[styles.actionButton, { backgroundColor: '#25D366' }]} onPress={handleWhatsApp}>
          <FontAwesome name="whatsapp" size={20} color="#fff" style={styles.icon} />
          <Text style={styles.actionText}>WhatsApp</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.actionButton, { backgroundColor: '#004080' }]} onPress={handleCall}>
          <Feather name="phone-call" size={20} color="#fff" style={styles.icon} />
          <Text style={styles.actionText}>Call</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: {
    padding: 16,
    alignItems: 'center',
    backgroundColor: '#fff',
    elevation: 5,
    zIndex: 10,
  },
  logo: { width: 90, height: 90, resizeMode: 'contain', marginBottom: 10 },
  studioName: { fontSize: 24, fontWeight: '700', color: '#004780', marginBottom: 10 },
  scrollContent: { flex: 1, padding: 16 },
  infoSection: { marginBottom: 20 },
  description: { fontSize: 14, color: '#444', lineHeight: 20, textAlign: 'justify' },
  offersSection: { marginBottom: 20 },
  subTitle: { fontSize: 18, fontWeight: '600', color: '#004780', marginBottom: 10 },
  listItem: { fontSize: 14, color: '#444', marginBottom: 6 },
  websiteSection: { marginBottom: 20 },
  link: { fontSize: 14, color: '#1E90FF', textDecorationLine: 'underline' },
  gallerySection: { marginBottom: 20 },
  galleryImage: { width: 100, height: 100, marginRight: 10, borderRadius: 10 },
  aboutSection: { marginBottom: 20 },
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
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 6,
    paddingVertical: 10,
    paddingHorizontal: 16,
    flex: 0.48,
    justifyContent: 'center',
  },
  icon: { marginRight: 8 },
  actionText: { color: '#fff', fontSize: 16, fontWeight: '600' },
});
