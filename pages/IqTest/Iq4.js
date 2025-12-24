import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Platform,
  StatusBar,
  useWindowDimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import Footer from '../../src/components/Footer';
export default function Iq4() {
  const navigation = useNavigation();
  const { width } = useWindowDimensions();
  const isTablet = width >= 768;

  const answers = [
    { id: 'A', text: 'Blue' },
    { id: 'B', text: 'Green' },
    { id: 'C', text: 'Black' },
    { id: 'D', text: 'Rose' },
  ];

  const optionWidth = isTablet ? (width - 160) / 2 : (width - 60) / 2;

  return (
    <SafeAreaView style={styles.safe}>
      {/* Status Bar */}
      <StatusBar barStyle="light-content" backgroundColor="#0052A2" />

      {/* Header (Same as Exam screens) */}
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

          <Text style={styles.headerTitle}>IQ Test</Text>

          {/* Spacer */}
          <View style={styles.rightSpace} />
        </View>
      </View>

      {/* Content */}
      <ScrollView
        style={[
          styles.container,
          isTablet && styles.tabletContainer,
        ]}
        contentContainerStyle={{ flexGrow: 1, paddingBottom: 30 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Question Number */}
        <Text
          style={[
            styles.questionNumber,
            isTablet && { fontSize: 22 },
          ]}
        >
          Question: 1
        </Text>

        {/* Question Text */}
        <Text
          style={[
            styles.questionText,
            isTablet && { fontSize: 22 },
          ]}
        >
          What colour is the girl dress in the image?
        </Text>

        {/* Options */}
        <View style={styles.optionsContainer}>
          {answers.map(option => (
            <TouchableOpacity
              key={option.id}
              style={[
                styles.optionButton,
                { width: optionWidth },
              ]}
              activeOpacity={0.7}
            >
              <Text
                style={[
                  styles.optionText,
                  isTablet && { fontSize: 18 },
                ]}
              >
                {option.id}) {option.text}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Next Button */}
        <TouchableOpacity
          style={styles.nextButton}
          onPress={() => navigation.navigate('Iq5')}
          activeOpacity={0.8}
        >
          <Text style={styles.nextButtonText}>Next</Text>
        </TouchableOpacity>
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
    paddingHorizontal: 20,
    paddingTop: 24,
  },

  tabletContainer: {
    paddingHorizontal: 60,
  },

  /* Question */
  questionNumber: {
    fontSize: 20,
    fontWeight: '600',
    color: '#004c97',
    marginBottom: 10,
  },

  questionText: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 25,
    color: '#000',
  },

  /* Options */
  optionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 40,
  },

  optionButton: {
    backgroundColor: '#f5f5f5',
    paddingVertical: 18,
    borderRadius: 6,
    marginBottom: 20,
    alignItems: 'center',
    elevation: 1,
  },

  optionText: {
    fontSize: 16,
    color: '#004c97',
    fontWeight: '600',
  },

  /* Next Button */
  nextButton: {
    backgroundColor: '#004c97',
    paddingVertical: 16,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 'auto',
  },

  nextButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
  },
});
