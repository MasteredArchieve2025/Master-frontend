import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Linking,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Footer from '../../src/components/Footer';

export default function Exam3() {
  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.myEducation}>My Education</Text>
        <View style={styles.headerIcons}>
          <Ionicons name="search-outline" size={24} style={styles.icon} />
          <Ionicons name="notifications-outline" size={24} style={styles.icon} />
          <Ionicons name="person-outline" size={24} style={styles.icon} />
        </View>
      </View>

      <Text style={styles.greeting}>Hello ! Mabisha</Text>

      {/* Blue Banner */}
      <View style={styles.banner}>
        <Text style={styles.bannerText}>Class12  Public Exams</Text>
      </View>

      {/* Main Content */}
      <ScrollView contentContainerStyle={styles.content}>
        {/* Websites Section */}
        <Text style={styles.sectionTitle}>
          Tamil Nadu Directorate of Government Examinations (TNDGE)
        </Text>
        <Text style={styles.subTitle}>Official websites:</Text>
        <TouchableOpacity onPress={() => Linking.openURL('https://dge.tn.gov.in')}>
          <Text style={styles.linkText}>• dge.tn.gov.in</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => Linking.openURL('https://tnresults.nic.in')}>
          <Text style={styles.linkText}>• tnresults.nic.in</Text>
        </TouchableOpacity>

        {/* Exam Schedule */}
        <Text style={styles.sectionTitle}>Exam Schedule – 2025</Text>
        <Text>(As per official timetable released)</Text>
        <Text>• Starts: March 5, 2025</Text>
        <Text>• Ends: March 25, 2025</Text>
        <Text>• Time: 10:00 AM to 1:15 PM</Text>

        {/* Syllabus & Groups */}
        <Text style={styles.sectionTitle}>Syllabus & Groups</Text>
        <Text>
          Tamil Nadu offers several HSC academic streams:
        </Text>
        <Text style={styles.bullet}>• Science: Physics, Chemistry, Biology/Computer Science/Maths</Text>
        <Text style={styles.bullet}>• Commerce: Accountancy, Economics, Business Maths, Computer Applications</Text>
        <Text style={styles.bullet}>• Arts: History, Political Science, Sociology, etc.</Text>
        <Text style={styles.bullet}>• Vocational Courses: Agriculture, Textile, IT, etc.</Text>
        <Text>
          Full syllabus is available at:{' '}
          <Text style={styles.linkText} onPress={() => Linking.openURL('https://dge.tn.gov.in')}>
            dge.tn.gov.in → HSC → Curriculum/Syllabus
          </Text>
        </Text>

        {/* Exam Pattern */}
        <Text style={styles.sectionTitle}>Exam Pattern & Marks</Text>
        <Text>• Each subject: 100 marks</Text>
        <Text>• Theory: 70–90 marks | Practical/Internal: 10–30 marks</Text>
        <Text>• Pass Mark: 35% in each subject</Text>
        <Text>• Language papers also require minimum 35 marks</Text>
      </ScrollView>

      <Footer />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 16,
    paddingVertical: 10,
    paddingHorizontal: 8,
    borderRadius: 10,
  },
  myEducation: {
    fontSize: 16,
    fontWeight: '600',
    color: '#003366',
  },
  headerIcons: {
    flexDirection: 'row',
  },
  icon: {
    marginLeft: 16,
    color: '#003366',
  },
  greeting: {
    fontSize: 22,
    fontWeight: '700',
    marginTop: 16,
    marginBottom: 12,
    color: '#003366',
  },
  banner: {
    backgroundColor: '#014F89',     // ✅ Green color (Material green)
    paddingVertical: 25,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 25,
    marginBottom: 25,
    width: '120%',                  // ✅ Wider than the screen
    alignSelf: 'center',            // ✅ Center the widened card
  },
  
  bannerText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '700',
  },
  content: {
    paddingBottom: 100,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#003366',
    marginTop: 10,
    marginBottom:10,
  },
  subTitle: {
    fontWeight: '600',
    marginBottom:5,
  },
  linkText: {
    color: '#005aa7',
    textDecorationLine: 'underline',
    marginBottom: 5,
  },
  bullet: {
    marginLeft: 4,
    marginBottom: 10,
  },
});
