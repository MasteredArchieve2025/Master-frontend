import React from 'react';
import {
  View,  Text,StyleSheet,FlatList,TouchableOpacity,SafeAreaView,} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Footer from '../../src/components/Footer'; // Make sure the path is correct

const exams = [
  { id: '1', title: 'Class 12 (HSC +2) Public Exams' },
  { id: '2', title: '12th Supplementary Exams' },
  { id: '3', title: 'Class 10 (SSLC) Public Exams' },
  { id: '4', title: 'Class 12 (HSC +2) Public Exams' },
  { id: '5', title: 'Class 11 Exams' },
  { id: '6', title: '2025–26 School Calendar (Grades 1–12)' },
];

export default function Exam2() {
  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.item}>
      <Text style={styles.itemText}>{item.title}</Text>
      <Ionicons name="chevron-forward" size={20} color="#000" />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.myEducation}>My Education</Text>
        <View style={styles.headerIcons}>
          <Ionicons name="search-outline" size={24} color="black" style={styles.icon} />
          <Ionicons name="notifications-outline" size={24} color="black" style={styles.icon} />
          <Ionicons name="person-outline" size={24} color="black" style={styles.icon} />
        </View>
      </View>

      {/* Greeting */}
      <Text style={styles.greeting}>Hello ! Mabisha</Text>

      {/* Card */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>School Board Exams</Text>
      </View>

      {/* Exam list */}
      <FlatList
        data={exams}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContainer}
      />

      {/* Footer */}
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
    marginTop: 20,
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderRadius: 10,
  },
  myEducation: {
    fontSize: 16,
    fontWeight: '600',
    color: '#003366',              // ✅ Blue text
  },
  headerIcons: {
    flexDirection: 'row',
  },
  icon: {
    marginLeft: 16,
    color: '#003366',              // ✅ Blue icons
  },
  greeting: {
    fontSize: 22,
    fontWeight: '700',
    marginTop: 16,
    marginBottom: 20,
    color: '#003366',
  },
  card: {
    backgroundColor: '#cce0ff',
    borderRadius: 20,
    paddingVertical: 12,
    paddingHorizontal: 16,
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 30,
    width: '110%',              // Makes the card wider than the container
    alignSelf: 'center',        // Center the card in the screen
  },
  
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#003366',
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  itemText: {
    fontSize: 16,
  },
  listContainer: {
    paddingBottom: 80, // space for the footer
  },
});
