import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // ✅ Import navigation hook

const { width } = Dimensions.get('window');

export default function Iq2() {
  const navigation = useNavigation(); // ✅ Initialize navigation

  return (
    <ScrollView style={styles.container}>
      {/* Greeting */}
      <Text style={styles.greeting}>
        Hello ! <Text style={styles.name}>Mabisha</Text>
      </Text>

      {/* Category Info */}
      <Text style={styles.category}>Category 1 of 12</Text>
      <Text style={styles.title}>Image Memory</Text>
      <Text style={styles.subInfo}>3 questions - 2 minutes</Text>

      {/* Description */}
      <Text style={styles.description}>
        In this category you will see an image for few seconds. Try to remember as many 
        details as possible. Afterwards, one or more questions are asked about the image.
      </Text>

      {/* Buttons */}
      <TouchableOpacity 
        style={styles.buttonPrimary}
        onPress={() => navigation.navigate("Iq3")} // ✅ Navigate to QuestionScreen
      >
        <Text style={styles.buttonText}>Start now</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.buttonPrimary}>
        <Text style={styles.buttonText}>See example</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
  },
  greeting: {
    fontSize: 22,
    fontWeight: '700',
    marginTop: 5,
    marginBottom: 15,
  },
  name: {
    color: '#004c97',
  },
  category: {
    fontSize: 18,
    marginBottom: 8,
    color: '#000',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
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
  buttonPrimary: {
    backgroundColor: '#004c97',
    paddingVertical: 30,
    borderRadius: 6,
    marginTop: 20,
    alignItems: 'center',
    width: width - 80,
    alignSelf: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
});
