import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native'; // ✅ import navigation hook

const { width } = Dimensions.get('window');

export default function Iq3() {
  const navigation = useNavigation(); // ✅ initialize navigation

  const tests = [
    { id: 1, title: 'IQ Test 1' },
    { id: 2, title: 'IQ Test 2' },
    { id: 3, title: 'IQ Test 3' },
    { id: 4, title: 'IQ Test 4' },
    { id: 5, title: 'IQ Test 5' },
  ];

  return (
    <ScrollView style={styles.container}>
      {/* Greeting */}
      <Text style={styles.greeting}>
        Hello ! <Text style={styles.name}>Mabisha</Text>
      </Text>
      
      {/* Heading */}
      <Text style={styles.heading}>Available IQ Tests</Text>

      {/* Cards */}
      {tests.map(test => (
        <View key={test.id} style={styles.card}>
          <View style={styles.cardContent}>
            <View style={{ flex: 1 }}>
              <Text style={styles.cardTitle}>{test.title}</Text>
              <Text style={styles.cardDesc}>Extensive IQ test with Different focuses</Text>
            </View>
            <View style={styles.timeContainer}>
              <Ionicons name="time-outline" size={20} color="#004c97" />
              <Text style={styles.timeText}>approx 45 minutes</Text>
            </View>
          </View>
          <TouchableOpacity 
            style={styles.button}
            onPress={() => navigation.navigate("Iq4")} // ✅ navigate to intro
          >
            <Text style={styles.buttonText}>Start IQ Test</Text>
          </TouchableOpacity>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', paddingHorizontal: 20 },
  
  greeting: { fontSize: 18, fontWeight: '600', marginTop: 0 },
  name: { color: '#28527cff' },
  heading: { fontSize: 22, fontWeight: 'bold', color: '#004c97', marginTop: 20 },
  
  card: {
    width: width - 50,
    height: 170,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginTop: 25,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
    alignSelf: 'center',
    borderWidth: 0
  },
  
  cardContent: { flexDirection: 'row', alignItems: 'center', flex: 1 },
  cardTitle: { fontSize: 20, fontWeight: 'bold' },
  cardDesc: { fontSize: 14, color: '#555', marginTop: 4 },
  timeContainer: { alignItems: 'center', marginLeft: 10 },
  timeText: { fontSize: 12, color: '#555', marginTop: 2 },
  
  button: {
    backgroundColor: '#1c5a98ff',
    paddingVertical: 10,
    borderRadius: 6,
    marginTop: 15,
    alignItems: 'center'
  },
  buttonText: { color: '#fff', fontWeight: 'bold' }
});
