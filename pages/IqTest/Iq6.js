import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // ✅ Import

const { width } = Dimensions.get('window');

export default function Iq6() {
  const navigation = useNavigation(); // ✅ Hook for navigation

  const results = [
    { id: 1, status: 'Correct' },
    { id: 2, status: 'Wrong' },
    { id: 3, status: 'Correct' },
    { id: 4, status: 'Correct' },
    { id: 5, status: 'Correct' },
  ];

  const renderCard = (item) => (
    <View style={styles.card} key={item.id}>
      <Text style={styles.cardText}>{item.id}</Text>
      <Text style={styles.cardText}>{item.status}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Greeting */}
      <Text style={styles.greeting}>
        Hello ! <Text style={styles.name}>Mabisha</Text>
      </Text>

      {/* Title */}
      <Text style={styles.title}>Image memory</Text>
      <View style={styles.underline} />

      {/* Cards */}
      <View style={styles.cardContainer}>
        <View style={styles.row}>
          {renderCard(results[0])}
          {renderCard(results[1])}
        </View>
        <View style={styles.row}>
          {renderCard(results[2])}
          {renderCard(results[3])}
        </View>
        <View style={styles.row}>
          {renderCard(results[4])}
        </View>
      </View>

      {/* Bottom Buttons */}
      <View style={styles.bottomButtons}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('NextCategory')} // ✅ Change this if needed
        >
          <Text style={styles.buttonText}>Next Category</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Iq7')} // ✅ Navigate to ResultScreen
        >
          <Text style={styles.buttonText}>Your Result</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', paddingHorizontal: 15 },
  greeting: { fontSize: 18, fontWeight: 'bold', marginTop: 15 },
  name: { color: '#0B5394' },
  title: { fontSize: 20, fontWeight: 'bold', color: '#0B5394', marginTop: 15 },
  underline: { height: 3, width: 50, backgroundColor: '#0B5394', borderRadius: 2, marginVertical: 10 },
  cardContainer: { marginTop: 10, alignItems: 'center' },
  row: { flexDirection: 'row', justifyContent: 'center', marginBottom: 25 },
  card: {
    backgroundColor: '#fff',
    width: width * 0.40,
    height: 95,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 3,
    elevation: 3,
  },
  cardText: { fontSize: 16, fontWeight: 'bold' },
  bottomButtons: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 15, marginTop: 'auto' },
  button: { backgroundColor: '#0B5394', borderRadius: 8, paddingVertical: 12, paddingHorizontal: 20, flex: 1, marginHorizontal: 5, alignItems: 'center' },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
});
