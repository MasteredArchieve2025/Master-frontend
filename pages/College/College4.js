import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const College4 = ({ route }) => {
  const { collegeName } = route?.params || {};
  const [activeTab, setActiveTab] = useState('Placement');

  const renderContent = () => {
    switch (activeTab) {
      case 'Placement':
        return (
          <View style={styles.contentContainer}>
            <Text style={styles.contentTitle}>Placement</Text>
            <Text style={styles.contentSubtitle}>
              Training & Placement: Shaping Future-Ready Women Engineers
            </Text>

            {/* Officer Section */}
            <View style={styles.placementContent}>
              <Image
                source={require('../../assets/principal.jpg')}
                style={styles.officerImage}
              />
              <View style={styles.placementText}>
                <Text style={styles.officerName}>Mr. C.D. Prabakar</Text>
                <Text style={styles.officerTitle}>Placement Officer</Text>
                <Text style={styles.paragraph}>
                  Led by Mr. C.D. Prabakar, the Training & Placement Department at Arunachala
                  College of Engineering for Women is dedicated to preparing students for success
                  in
                </Text>
              </View>
            </View>
            <Text style={styles.paragraph1}>
            today's fast-paced,technology-driven world. We are proud to be a leading institution for producing
                  industry-ready graduates who excel in technical skills and professional
                  competencies.
                </Text>

            <Text style={styles.holisticTitle}>Holistic Career Preparation:</Text>
          </View>
        );
      default:
        return (
          <View style={styles.contentContainer}>
            <Text style={styles.contentTitle}>{activeTab}</Text>
            <Text style={styles.officerTitle}>Library</Text>
            <Text style={styles.paragraph}>Details about {activeTab} will be here.</Text>
          </View>
        );
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>My Education, Engineering</Text>
          <View style={styles.headerIcons}>
            <Ionicons name="search" size={24} color="#0B4F6C" />
            <Ionicons name="notifications-outline" size={24} color="#0B4F6C" style={{ marginHorizontal: 15 }} />
            <Ionicons name="person-outline" size={24} color="#0B4F6C" />
          </View>
        </View>

        {/* Greeting */}
        <Text style={styles.greeting}>Hello! Mabisha</Text>

        {/* Logo */}
        <View style={styles.logoContainer}>
          <Image source={require('../../assets/collegeicon.png')} style={styles.logo} />
        </View>

        {/* College Name */}
        <Text style={styles.collegeName}>Arunachala College of Engineering</Text>
        <Text style={styles.collegeSubName}>For Women, Nagercoil</Text>

        {/* Tabs */}
        <View style={styles.tabsContainer}>
          {['All', 'Dept', 'Placement', 'Academic', 'Facilities', 'Admission', 'About'].map(tab => (
            <TouchableOpacity key={tab} onPress={() => setActiveTab(tab)}>
              <Text style={[styles.tabText, activeTab === tab && styles.activeTabText]}>{tab}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {renderContent()}
      </ScrollView>

      {/* Footer */}
      <View style={styles.footer}>
        <Ionicons name="home" size={30} color="#0B4F6C" />
        <Ionicons name="briefcase" size={30} color="#BDBDBD" />
        <Ionicons name="help-circle" size={30} color="#BDBDBD" />
        <Ionicons name="person" size={30} color="#BDBDBD" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FCFCFC' },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 50,
  },
  headerTitle: { fontSize: 16, color: '#005AA1',fontWeight: 'bold' },
  headerIcons: { flexDirection: 'row' },

  greeting: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#005AA1',
    paddingHorizontal: 20,
    marginTop: 20,
  },

  logoContainer: { alignItems: 'center', marginVertical: 20 },
  logo: { width: 170, height: 190, resizeMode: 'contain',marginTop:-30,marginBottom:-30 },

  collegeName: { fontSize: 18, fontWeight: 'bold', color: '#005AA1', textAlign: 'center' },
  collegeSubName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#005AA1',
    textAlign: 'center',
    marginBottom: 20,
  },

  tabsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    paddingBottom: 10,
  },
  tabText: { fontSize: 14, color: '#757575', fontWeight: 'bold',paddingVertical: 5 },
  activeTabText: { color: '#005AA1', borderBottomWidth: 2, borderBottomColor: '#0B4F6C' },

  contentContainer: { padding: 20 },
  contentTitle: { fontSize: 22, fontWeight: 'bold', color: '#333333', marginBottom: 10 },
  contentSubtitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#005AA1',
    textAlign: 'center',
    marginTop:20,
    marginBottom: 20,
  },

  placementContent: { flexDirection: 'row', marginTop: 10 },
  officerImage: { width: 100, height: 120, borderRadius: 8 },
  placementText: { flex: 1, marginLeft: 15 },

  officerName: { fontSize: 16, fontWeight: 'bold', color: '#333333',transform: [{ translateX: -119 }, { translateY: 125 }] },
  officerTitle: { fontSize: 14, color: '#757575', marginBottom: 10,transform: [{ translateX: -118 }, { translateY: 125 }]  },

  paragraph: {
    fontSize: 14,
    lineHeight: 20,
    color: '#333333',
    textAlign: 'justify', // ✅ makes text in a straight block
    marginBottom: 10,
    transform: [{ translateX: 5 }, { translateY: -40 }] 
  },
  paragraph1: {
    fontSize: 14,
    lineHeight: 20,
    color: '#333333',
    textAlign: 'justify', // ✅ makes text in a straight block
    marginBottom: 10, 
  },
  holisticTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#005AA1',
    marginTop: 20,
  },

  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 15,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    backgroundColor: '#FFFFFF',
  },
});

export default College4;