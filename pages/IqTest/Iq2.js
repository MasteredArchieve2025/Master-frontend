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

export default function Iq2() {
  const navigation = useNavigation();
  const { width } = useWindowDimensions();
  const isTablet = width >= 768;

  return (
    <SafeAreaView style={styles.safe}>
      {/* Status Bar */}
      <StatusBar barStyle="light-content" backgroundColor="#0052A2" />

      {/* Header (Same as Exam) */}
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
        contentContainerStyle={{ paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Category Info */}
        <Text
          style={[
            styles.category,
            isTablet && { fontSize: 22 },
          ]}
        >
          Category 1 of 12
        </Text>

        <Text
          style={[
            styles.title,
            isTablet && { fontSize: 26 },
          ]}
        >
          Image Memory
        </Text>

        <Text
          style={[
            styles.subInfo,
            isTablet && { fontSize: 20 },
          ]}
        >
          3 questions · 2 minutes
        </Text>

        {/* Description */}
        <Text
          style={[
            styles.description,
            isTablet && { fontSize: 18, lineHeight: 26 },
          ]}
        >
          In this category you will see an image for a few seconds. Try to remember as many
          details as possible. Afterwards, one or more questions are asked about the image.
        </Text>

        {/* Buttons */}
        <TouchableOpacity
          style={[
            styles.buttonPrimary,
            { width: isTablet ? 420 : '100%' },
          ]}
          onPress={() => navigation.navigate('Iq3')}
          activeOpacity={0.8}
        >
          <Text style={styles.buttonText}>Start now</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.buttonPrimary,
            styles.secondaryButton,
            { width: isTablet ? 420 : '100%' },
          ]}
          activeOpacity={0.8}
        >
          <Text style={styles.buttonText}>See example</Text>
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

  /* Text */
  category: {
    fontSize: 18,
    marginBottom: 8,
    color: '#000',
  },

  title: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 8,
    color: '#000',
  },

  subInfo: {
    fontSize: 18,
    marginBottom: 20,
    color: '#000',
  },

  description: {
    fontSize: 16,
    color: '#000',
    marginBottom: 30,
    lineHeight: 22,
  },

  /* Buttons */
  buttonPrimary: {
    backgroundColor: '#004c97',
    paddingVertical: 22,
    borderRadius: 6,
    marginTop: 20,
    alignItems: 'center',
    alignSelf: 'center',
  },

  secondaryButton: {
    backgroundColor: '#003366',
  },

  buttonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 18,
  },
});
