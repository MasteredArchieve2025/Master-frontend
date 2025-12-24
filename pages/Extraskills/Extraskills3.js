// Extraskills3.js
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Platform,
  StatusBar,
  useWindowDimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import Footer from '../../src/components/Footer';
// Common studio logo
const STUDIO_LOGO = require('../../assets/DanceStudio.png');

const studios = [
  {
    name: 'eMotion Dance Studio',
    description:
      'Extra-curricular activities help students explore their interests beyond academics, enhancing creativity, teamwork, and leadership skills.',
  },
  {
    name: 'StepUp Dance Academy',
    description:
      'Learn a variety of dance forms from expert instructors while improving coordination and confidence.',
  },
  {
    name: 'Rhythm & Beats',
    description:
      'Enjoy energetic sessions that keep you fit and entertained, with performances every term.',
  },
];

export default function Extraskills3() {
  const navigation = useNavigation();
  const { width } = useWindowDimensions();
  const isTablet = width >= 768;

  return (
    <SafeAreaView style={styles.safe}>
      {/* Status Bar */}
      <StatusBar barStyle="light-content" backgroundColor="#0052A2" />

      {/* Header (same as other screens) */}
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

          <Text style={styles.headerTitle}>Studios</Text>

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
        contentContainerStyle={{ paddingBottom: 24 }}
        showsVerticalScrollIndicator={false}
      >
        {studios.map((studio, index) => (
          <View key={index} style={styles.itemContainer}>
            {/* Logo */}
            <View style={styles.logoWrapper}>
              <Image
                source={STUDIO_LOGO}
                style={[
                  styles.logo,
                  isTablet && { width: 90, height: 130 },
                ]}
              />
            </View>

            {/* Text + Button */}
            <View style={styles.textContent}>
              <Text
                style={[
                  styles.studioName,
                  isTablet && { fontSize: 18 },
                ]}
              >
                {studio.name}
              </Text>

              <Text
                style={[
                  styles.description,
                  isTablet && { fontSize: 16 },
                ]}
              >
                {studio.description}
              </Text>

              <TouchableOpacity
                style={styles.moreButton}
                onPress={() => navigation.navigate('Extraskills4', { studio })}
              >
                <Text
                  style={[
                    styles.moreText,
                    isTablet && { fontSize: 14 },
                  ]}
                >
                  More
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>
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

  /* Containers */
  container: {
    flex: 1,
    paddingHorizontal: 12,
  },

  tabletContainer: {
    paddingHorizontal: 40,
  },

  /* Item Card */
  itemContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    alignItems: 'flex-start',
  },

  logoWrapper: {
    backgroundColor: '#fff',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#EDEDED',
    padding: 8,
    marginRight: 12,
  },

  logo: {
    width: 72,
    height: 104,
    resizeMode: 'contain',
  },

  textContent: {
    flex: 1,
    backgroundColor: '#fff',
    paddingVertical: 8,
    justifyContent: 'space-between',
  },

  studioName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#004780',
    marginBottom: 4,
  },

  description: {
    fontSize: 14,
    color: '#444',
    marginBottom: 8,
  },

  moreButton: {
    backgroundColor: '#005AA1',
    alignSelf: 'flex-end',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
  },

  moreText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
});
