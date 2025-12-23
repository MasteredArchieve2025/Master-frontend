// ExtraSkillsInfo.js
import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';

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

export default function Extraskills3({ navigation }) {
  return (
    <ScrollView style={styles.container}>
      {studios.map((studio, index) => (
        <View key={index} style={styles.itemContainer}>
          
          {/* Logo with background */}
          <View style={styles.logoWrapper}>
            <Image source={STUDIO_LOGO} style={styles.logo} />
          </View>

          {/* Text + Button */}
          <View style={styles.textContent}>
            <Text style={styles.studioName}>{studio.name}</Text>
            <Text style={styles.description}>{studio.description}</Text>

            {/* Button on right bottom corner */}
            <TouchableOpacity
              style={styles.moreButton}
              onPress={() => navigation.navigate('Extraskills4', { studio })}
            >
              <Text style={styles.moreText}>More</Text>
            </TouchableOpacity>
          </View>

        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 12,
  },
  itemContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    alignItems: 'flex-start',
  },
  logoWrapper: {
    backgroundColor: '#fff',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#EDEDED', // border color
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
