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

export default function Iq3() {
  const navigation = useNavigation();
  const { width } = useWindowDimensions();
  const isTablet = width >= 768;

  const tests = [
    { id: 1, title: 'IQ Test 1' },
    { id: 2, title: 'IQ Test 2' },
    { id: 3, title: 'IQ Test 3' },
    { id: 4, title: 'IQ Test 4' },
    { id: 5, title: 'IQ Test 5' },
  ];

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

          <Text style={styles.headerTitle}>IQ Tests</Text>

          {/* Spacer for centering */}
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
        {/* Heading */}
        <Text
          style={[
            styles.heading,
            isTablet && { fontSize: 26 },
          ]}
        >
          Available IQ Tests
        </Text>

        {/* Cards */}
        {tests.map(test => (
          <View
            key={test.id}
            style={[
              styles.card,
              isTablet && styles.tabletCard,
            ]}
          >
            <View style={styles.cardContent}>
              <View style={{ flex: 1 }}>
                <Text
                  style={[
                    styles.cardTitle,
                    isTablet && { fontSize: 22 },
                  ]}
                >
                  {test.title}
                </Text>
                <Text
                  style={[
                    styles.cardDesc,
                    isTablet && { fontSize: 16 },
                  ]}
                >
                  Extensive IQ test with different focuses
                </Text>
              </View>

              <View style={styles.timeContainer}>
                <Ionicons name="time-outline" size={20} color="#004c97" />
                <Text style={styles.timeText}>approx 45 min</Text>
              </View>
            </View>

            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate('Iq4')}
              activeOpacity={0.8}
            >
              <Text style={styles.buttonText}>Start IQ Test</Text>
            </TouchableOpacity>
          </View>
        ))}
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
  heading: {
    fontSize: 22,
    fontWeight: '700',
    color: '#004c97',
    marginBottom: 10,
  },

  /* Card */
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginTop: 25,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },

  tabletCard: {
    padding: 20,
  },

  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },

  cardTitle: {
    fontSize: 20,
    fontWeight: '700',
  },

  cardDesc: {
    fontSize: 14,
    color: '#555',
    marginTop: 4,
  },

  timeContainer: {
    alignItems: 'center',
    marginLeft: 12,
  },

  timeText: {
    fontSize: 12,
    color: '#555',
    marginTop: 2,
  },

  /* Button */
  button: {
    backgroundColor: '#1c5a98',
    paddingVertical: 12,
    borderRadius: 6,
    marginTop: 15,
    alignItems: 'center',
  },

  buttonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
  },
});
