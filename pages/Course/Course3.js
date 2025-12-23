import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';

const logo = require('../../assets/AKlogo.png');

const coursesData = [
  {
    id: 1,
    provider: 'AK Technologies',
    logo: logo,
    offered: [
      { name: 'Web Development', mode: 'Online' },
      { name: 'Full Stack Development', mode: 'Online' },
      { name: 'Python', mode: 'Offline' },
      { name: 'Data Science', mode: 'Online & Offline' },
    ],
    mode: 'Online & Offline',
    website: 'www.ak.com',
  },
  {
    id: 2,
    provider: 'AK Technologies',
    logo: logo,
    offered: [
      { name: 'UI/UX Design', mode: 'Offline' },
      { name: 'Digital Marketing', mode: 'Offline' },
      { name: 'Cloud Computing', mode: 'Online' },
    ],
    mode: 'Online & Offline',
    website: 'www.ak.com',
  },
  {
    id: 3,
    provider: 'AK Technologies',
    logo: logo,
    offered: [
      { name: 'Cybersecurity', mode: 'Online' },
      { name: 'Networking', mode: 'Offline' },
      { name: 'Python Programming', mode: 'Online' },
    ],
    mode: 'Online & Offline',
    website: 'www.ak.com',
  },
];

export default function Course3({ route, navigation }) {
  const { title } = route.params || {};
  const [selectedMode, setSelectedMode] = useState('All');

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>{title || 'Course Information'}</Text>
      </View>

      {/* Mode Tabs */}
      <View style={styles.tabs}>
        {['All', 'Offline', 'Online'].map((t) => (
          <TouchableOpacity key={t} onPress={() => setSelectedMode(t)} style={styles.tab}>
            <Text style={[styles.tabText, selectedMode === t && styles.activeTabText]}>{t}</Text>
            {selectedMode === t && <View style={styles.underline} />}
          </TouchableOpacity>
        ))}
      </View>

      {/* Courses List */}
      {coursesData.map((course) => {
        const displayedCourses = course.offered.filter((off) =>
          selectedMode === 'All' ? true : off.mode.toLowerCase().includes(selectedMode.toLowerCase())
        );

        return (
          <View key={course.id} style={styles.courseBlock}>
            {/* Logo Card */}
            <View style={styles.logoCard}>
              <Image source={course.logo} style={styles.logo} />
            </View>

            {/* Course Info */}
            <View style={styles.courseInfo}>
              <Text style={styles.provider}>{course.provider}</Text>

              <Text style={styles.offeredLine}>
                <Text style={{ fontWeight: 'bold' }}>Courses Offered: </Text>
                {displayedCourses.map((c) => c.name).join(', ')}
              </Text>

              <Text style={styles.mode}>
                <Text style={{ fontWeight: 'bold' }}>Mode: </Text>
                {selectedMode === 'All' ? course.mode : selectedMode}
              </Text>

              <Text style={styles.website}>
                <Text style={{ fontWeight: 'bold' }}>Website: </Text>
                {course.website}
              </Text>

              {/* Footer */}
              <View style={styles.footer}>
                <Text style={styles.footerItem}>📄 Certificate</Text>
                <Text style={styles.footerItem}>🛠 Technical Training</Text>
                <TouchableOpacity
                  style={styles.moreButton}
                  onPress={() => navigation.navigate('Course4', { course })}
                >
                  <Text style={styles.moreText}>More</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: { backgroundColor: '#007BFF', paddingVertical: 20, paddingHorizontal: 16 },
  headerText: { color: '#fff', fontSize: 22, fontWeight: 'bold', textAlign: 'center' },

  tabs: { flexDirection: 'row', justifyContent: 'space-around', marginVertical: 12 },
  tab: { alignItems: 'center', paddingVertical: 6 },
  tabText: { color: '#555', fontSize: 16 },
  activeTabText: { color: '#007BFF', fontWeight: '600' },
  underline: { height: 2, backgroundColor: '#007BFF', width: '100%', marginTop: 2, borderRadius: 1 },

  courseBlock: { flexDirection: 'row', marginHorizontal: 16, marginVertical: 8, alignItems: 'flex-start' },

  logoCard: {
    width: 70,
    height: 150,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    marginRight: 12,
  },
  logo: { width: 70, height: 65, resizeMode: 'contain' },

  courseInfo: { flex: 1 },

  provider: { fontSize: 16, fontWeight: 'bold', marginBottom: 4, color: '#007BFF' },
  offeredLine: { fontSize: 14, color: '#1F6FC4', marginBottom: 4, flexWrap: 'wrap' },
  mode: { fontSize: 14, color: '#333', marginBottom: 4 },
  website: { fontSize: 14, color: '#333', marginBottom: 8 },

  footer: { flexDirection: 'row', alignItems: 'center', marginTop: 8 },
  footerItem: { fontSize: 12, color: '#555', fontWeight: '500', marginRight: 16 },
  moreButton: { backgroundColor: '#007BFF', paddingHorizontal: 12, paddingVertical: 4, borderRadius: 6 },
  moreText: { color: '#fff', fontWeight: 'bold', fontSize: 12 },
});
