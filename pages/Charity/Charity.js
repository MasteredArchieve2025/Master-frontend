import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import Footer from '../../src/components/Footer';
export default function Charity() {
  return (
    <View style={styles.container}>
      {/* Header */}
      <LinearGradient
        colors={['#0077c2', '#004ba0']}
        style={styles.header}
      >
        <TouchableOpacity style={styles.backBtn}>
          <Icon name="arrow-back" size={22} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Charity Club</Text>
      </LinearGradient>

      <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
        {/* Image Card */}
        <View style={styles.imageCard}>
          <Image
            source={{
              uri: 'https://images.unsplash.com/photo-1509099836639-18ba1795216d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wzMjM4NDZ8MHwxfHNlYXJjaHwxfHxsZWFybmluZyUyMGNoaWxkfGVufDB8fHx8MTY5NzI4NDM0OXww&ixlib=rb-4.0.3&q=80&w=800',
            }}
            style={styles.image}
          />
        </View>

        {/* New Volunteer */}
        <View style={styles.volunteerCard}>
          <Icon name="hand-left-outline" size={40} color="#0077c2" />
          <Text style={styles.volunteerText}>New Volunteer</Text>
        </View>

        {/* Support Us */}
        <View style={{ paddingHorizontal: 20, marginTop: 15 }}>
          <Text style={styles.sectionTitle}>Support Us !</Text>
          <Text style={styles.sectionDesc}>
            Join us in transforming lives through education—your support can
            shape a brighter future for every child.
          </Text>
        </View>

        {/* Donation Buttons */}
        <View style={{ paddingHorizontal: 20, marginTop: 15 }}>
          {[500, 1000, 2000].map((amount) => (
            <TouchableOpacity
              key={amount}
              style={styles.donationBtn}
            >
              <Text style={styles.donationText}>₹ {amount}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Custom Amount & Donate Now */}
        <View style={{ paddingHorizontal: 20, marginTop: 15 }}>
          <TouchableOpacity style={styles.customBtn}>
            <Text style={styles.customText}>₹ Custom Amount</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.donateNowBtn}>
            <Text style={styles.donateNowText}>Donate Now</Text>
          </TouchableOpacity>
        </View>

        {/* Mission */}
        <View style={{ paddingHorizontal: 20, marginTop: 20 }}>
          <Text style={styles.subHeading}>Our Mission</Text>
          <Text style={styles.sectionDesc}>
            An education charity mission aims to provide quality learning
            opportunities to underprivileged children and youth. It focuses on
            empowering communities through access to schools, scholarships, and
            educational resources. The mission envisions a future where every
            child has the tools to succeed, regardless of background.
          </Text>
        </View>

        {/* Vision */}
        <View style={{ paddingHorizontal: 20, marginTop: 20 }}>
          <Text style={styles.subHeading}>Vision</Text>
          <Text style={styles.sectionDesc}>
            Our vision is to create a world where every child has access to
            quality education, regardless of their background.
          </Text>
          <Text style={styles.sectionDesc}>
            We aim to empower underprivileged communities through learning
            opportunities and holistic support. By fostering knowledge, we
            envision a future driven by equality, dignity, and hope.
          </Text>
        </View>

        {/* Our Volunteers */}
        <View style={{ paddingHorizontal: 20, marginTop: 20 }}>
          <Text style={styles.subHeading}>Our Volunteers</Text>
          <View style={styles.volunteersWrap}>
            {[
              'https://randomuser.me/api/portraits/men/32.jpg',
              'https://randomuser.me/api/portraits/women/44.jpg',
              'https://randomuser.me/api/portraits/men/65.jpg',
              'https://randomuser.me/api/portraits/women/12.jpg',
              'https://randomuser.me/api/portraits/men/23.jpg',
            ].map((uri, index) => (
              <Image key={index} source={{ uri }} style={styles.avatar} />
            ))}
          </View>
        </View>
      </ScrollView>
      <Footer />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },

  // Header
header: {
  height: 160, // taller header
  justifyContent: 'flex-start',
  alignItems: 'center',
  position: 'relative',
  paddingTop: 70, // moves text down
},
  backBtn: { marginRight: 10,
    position: 'absolute',
  top: 30, // from top of header
  left: 15, // from left of header
  zIndex: 1,

   },
  headerText: { fontSize: 22, color: '#fff', fontWeight: 'bold' },
   

  // Image Card
  imageCard: {
    backgroundColor: '#fff',
    marginHorizontal: 20,
    marginTop: 20,
    borderRadius: 8,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
  },
  image: {
    width: '100%',
    height: 150,
    borderRadius: 8,
  },

  // Volunteer Section
  volunteerCard: {
    marginTop: 20,
    marginHorizontal: 20,
    padding: 15,
    borderRadius: 8,
    backgroundColor: '#fff',
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 10,
    shadowOffset: { width: 5, height: 4 },
    alignItems: 'center',
    
  },
  volunteerText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0077c2',
    marginTop: 5,
  },

  // Support Us
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0077c2',
  },
  sectionDesc: {
    fontSize: 14,
    color: '#333',
    marginTop: 5,
    lineHeight: 20,
  },

  // Donation Buttons
  donationBtn: {
    backgroundColor: '#0077c2',
    paddingVertical: 12,
    borderRadius: 6,
    alignItems: 'center',
    marginBottom: 12,
  },
  donationText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },

  // Custom Amount Button
  customBtn: {
    backgroundColor: '#e0e0e0',
    paddingVertical: 12,
    borderRadius: 6,
    alignItems: 'center',
    marginBottom: 12,
    width: 280,
  alignSelf: 'center',
  },
  customText: {
    color: '#333',
    fontSize: 16,
    fontWeight: '500',
  },

  // Donate Now Button
  donationBtn: {
  backgroundColor: '#0077c2',
  paddingVertical: 12,
  borderRadius: 6,
  alignItems: 'center',
  marginBottom: 12,
  width: 280,           // reduced width
  alignSelf: 'center',  // center the button
},
 donateNowBtn: {
  backgroundColor: '#0077c2',
  paddingVertical: 12,
  borderRadius: 6,
  alignItems: 'center',
  width: 280,
  alignSelf: 'center',
},

  // Section Headings
  subHeading: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0077c2',
    marginBottom: 5,
  },

  // Volunteers Avatars
  volunteersWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginBottom: 10,
  },
});
