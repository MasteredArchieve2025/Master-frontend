import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

// Example degree list
const degrees = ['B.E', 'B.Tech', 'B.Arch', 'BCA', 'BSC'];

const College2= ({ route }) => {
  const navigation = useNavigation();

  // Ensure we don't crash if route.params is undefined
  const category = route?.params?.category || { name: 'Unknown', icon: null };

  return (
    <View style={styles.container}>
      

      {/* Greeting */}
      <Text style={styles.greeting}>Hello! Mabisha</Text>

      {/* Category Info */}
      <View style={styles.titleContainer}>
        <View style={styles.iconContainer}>
          {category.icon ? (
            <Image source={category.icon} style={styles.categoryImage} />
          ) : (
            <Ionicons name="school-outline" size={60} color="#0c2f63" />
          )}
        </View>
        <Text style={styles.title}>{category.name}</Text>
      </View>

      {/* Degrees List */}
      <ScrollView contentContainerStyle={styles.list}>
        {degrees.map((degree, index) => (
          <TouchableOpacity
            key={index}
            style={styles.card}
            onPress={() => navigation.navigate('College3', { degree })}
          >
            <Text style={styles.cardText}>{degree}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 10,
  },
  headerTitle: { fontSize: 20, fontWeight: 'bold', color: '#0c2f63' },
  headerIcons: { flexDirection: 'row' },
  icon: { marginHorizontal: 10 },
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
    paddingHorizontal: 20,
    paddingVertical: 10,
    color: '#0c2f63',
  },
  titleContainer: { alignItems: 'center', marginVertical: 20 },
  iconContainer: {
    backgroundColor: '#e6f2ff',
    borderRadius: 50,
    padding: 15,
    marginBottom: 10,
  },
  categoryImage: { width: 60, height: 60, resizeMode: 'contain' },
  title: { fontSize: 20, fontWeight: 'bold' },
  list: { paddingHorizontal: 20 },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#d0e0ff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cardText: { fontSize: 18, fontWeight: 'bold', textAlign: 'center' },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 20,
    borderTopWidth: 1,
    borderTopColor: '#f2f2f2',
  },
});

export default College2;
