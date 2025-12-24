import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Linking,
  TouchableOpacity,
  Platform,
  StatusBar,
  useWindowDimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import Footer from '../../src/components/Footer';

export default function Exam3() {
  const navigation = useNavigation();
  const { width } = useWindowDimensions();
  const isTablet = width >= 768;

  return (
    <SafeAreaView style={styles.safe}>
      {/* Status Bar */}
      <StatusBar barStyle="light-content" backgroundColor="#0052A2" />

      {/* Header (Same as Exam2) */}
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

          <Text style={styles.headerTitle}>Exam Details</Text>

          {/* Spacer for centering */}
          <View style={styles.rightSpace} />
        </View>
      </View>

      {/* Content */}
      <ScrollView
        style={[
          styles.container,
          isTablet && styles.tabletContainer,
        ]}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Blue Banner */}
        <View style={styles.banner}>
          <Text
            style={[
              styles.bannerText,
              isTablet && { fontSize: 22 },
            ]}
          >
            Class 12 Public Exams
          </Text>
        </View>

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
        <Text>Tamil Nadu offers several HSC academic streams:</Text>

        <Text style={styles.bullet}>
          • Science: Physics, Chemistry, Biology / Computer Science / Maths
        </Text>
        <Text style={styles.bullet}>
          • Commerce: Accountancy, Economics, Business Maths, Computer Applications
        </Text>
        <Text style={styles.bullet}>
          • Arts: History, Political Science, Sociology, etc.
        </Text>
        <Text style={styles.bullet}>
          • Vocational Courses: Agriculture, Textile, IT, etc.
        </Text>

        <Text>
          Full syllabus is available at:{' '}
          <Text
            style={styles.linkText}
            onPress={() => Linking.openURL('https://dge.tn.gov.in')}
          >
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
      <Footer/>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  /* Safe */
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

  /* Containers */
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },

  tabletContainer: {
    paddingHorizontal: 40,
  },

  /* Banner */
  banner: {
    backgroundColor: '#014F89',
    paddingVertical: 22,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 24,
    marginBottom: 24,
  },

  bannerText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
  },

  /* Content */
  content: {
    paddingBottom: 40,
  },

  sectionTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#003366',
    marginTop: 12,
    marginBottom: 10,
  },

  subTitle: {
    fontWeight: '600',
    marginBottom: 5,
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
