import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  Platform,
  StatusBar,
  useWindowDimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import Footer from '../../src/components/Footer';

const exams = [
  { id: '1', title: 'Class 12 (HSC +2) Public Exams' },
  { id: '2', title: '12th Supplementary Exams' },
  { id: '3', title: 'Class 10 (SSLC) Public Exams' },
  { id: '4', title: 'Class 12 (HSC +2) Public Exams' },
  { id: '5', title: 'Class 11 Exams' },
  { id: '6', title: '2025–26 School Calendar (Grades 1–12)' },
];

export default function Exam2() {
  const navigation = useNavigation();
  const { width } = useWindowDimensions();
  const isTablet = width >= 768;

  const renderItem = ({ item }) => (
  <View style={styles.item}>
    <Text style={styles.itemText}>{item.title}</Text>

    <TouchableOpacity
      activeOpacity={0.7}
      onPress={() => navigation.navigate('Exam3')}
    >
      <Ionicons name="chevron-forward" size={22} color="#003366" />
    </TouchableOpacity>
  </View>
);


  return (
    <SafeAreaView style={styles.safe}>
      {/* Status Bar */}
      <StatusBar barStyle="light-content" backgroundColor="#0052A2" />

      {/* Header */}
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
          <View style={styles.rightSpace} />
        </View>
      </View>

      {/* Main Content */}
      <View
        style={[
          styles.container,
          isTablet && styles.tabletContainer,
        ]}
      >
        {/* Card (Touchable → Navigate to Exam3) */}
        <TouchableOpacity
          activeOpacity={0.8}
          // onPress={() => navigation.navigate('Exam3')}
        >
          <View style={styles.card}>
            <Text
              style={[
                styles.cardTitle,
                isTablet && { fontSize: 20 },
              ]}
            >
              School Board Exams
            </Text>
          </View>
        </TouchableOpacity>

        {/* Exam List */}
        <FlatList
          data={exams}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContainer}
        />
      </View>

      <Footer />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
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

  /* Content */
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },

  tabletContainer: {
    paddingHorizontal: 40,
  },

  card: {
    backgroundColor: '#cce0ff',
    borderRadius: 18,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 24,
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
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },

  itemText: {
    color: '#003366',
    flex: 1,
    marginRight: 12,
  },

  listContainer: {
    paddingBottom: 20,
  },
});
