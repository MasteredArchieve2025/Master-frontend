import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Platform,
  StatusBar,
  useWindowDimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import Footer from '../../src/components/Footer';
export default function Iq6() {
  const navigation = useNavigation();
  const { width } = useWindowDimensions();
  const isTablet = width >= 768;

  const results = [
    { id: 1, status: 'Correct' },
    { id: 2, status: 'Wrong' },
    { id: 3, status: 'Correct' },
    { id: 4, status: 'Correct' },
    { id: 5, status: 'Correct' },
  ];

  const renderCard = (item) => (
    <View
      key={item.id}
      style={[
        styles.card,
        { width: isTablet ? width * 0.25 : width * 0.40 },
      ]}
    >
      <Text style={styles.cardNumber}>{item.id}</Text>
      <Text
        style={[
          styles.cardStatus,
          { color: item.status === 'Correct' ? '#2E7D32' : '#C62828' },
        ]}
      >
        {item.status}
      </Text>
    </View>
  );

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

          <Text style={styles.headerTitle}>IQ Result</Text>

          {/* Spacer */}
          <View style={styles.rightSpace} />
        </View>
      </View>

      {/* Content */}
      <View
        style={[
          styles.container,
          isTablet && styles.tabletContainer,
        ]}
      >
        {/* Title */}
        <Text
          style={[
            styles.title,
            isTablet && { fontSize: 24 },
          ]}
        >
          Image Memory
        </Text>

        <View style={styles.underline} />

        {/* Result Cards */}
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
        <View
          style={[
            styles.bottomButtons,
            isTablet && styles.tabletBottomButtons,
          ]}
        >
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('NextCategory')}
            activeOpacity={0.8}
          >
            <Text style={styles.buttonText}>Next Category</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('Iq7')}
            activeOpacity={0.8}
          >
            <Text style={styles.buttonText}>Your Result</Text>
          </TouchableOpacity>
        </View>
      </View>
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
    paddingHorizontal: 15,
    paddingTop: 20,
  },

  tabletContainer: {
    paddingHorizontal: 60,
  },

  /* Title */
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#0B5394',
  },

  underline: {
    height: 3,
    width: 50,
    backgroundColor: '#0B5394',
    borderRadius: 2,
    marginVertical: 10,
  },

  /* Cards */
  cardContainer: {
    marginTop: 10,
    alignItems: 'center',
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 25,
  },

  card: {
    backgroundColor: '#fff',
    height: 100,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 3,
    elevation: 3,
  },

  cardNumber: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 4,
  },

  cardStatus: {
    fontSize: 14,
    fontWeight: '600',
  },

  /* Bottom Buttons */
  bottomButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 'auto',
    paddingVertical: 15,
  },

  tabletBottomButtons: {
    paddingHorizontal: 20,
  },

  button: {
    backgroundColor: '#0B5394',
    borderRadius: 8,
    paddingVertical: 14,
    flex: 1,
    marginHorizontal: 6,
    alignItems: 'center',
  },

  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
});
