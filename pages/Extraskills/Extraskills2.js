import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Platform,
  StatusBar,
  useWindowDimensions,
} from 'react-native';
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import Footer from '../../src/components/Footer';
export default function Extraskills2() {
  const navigation = useNavigation();
  const route = useRoute();
  const sections = route?.params?.sections || [];

  const { width } = useWindowDimensions();
  const isTablet = width >= 768;

  const handleItemPress = (item) => {
    navigation.navigate('Extraskills3', { category: item });
  };

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

          <Text style={styles.headerTitle}>Fine Arts</Text>

          {/* Spacer for center alignment */}
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
        {sections.map((section, idx) => (
          <View key={idx} style={{ marginTop: 20 }}>
            {/* Section Header */}
            <View style={styles.sectionHeader}>
              <Text
                style={[
                  styles.sectionHeaderText,
                  isTablet && { fontSize: 24 },
                ]}
              >
                {section.title}
              </Text>
            </View>

            {/* Items */}
            {section.items?.map((item, i) => (
              <TouchableOpacity
                key={i}
                activeOpacity={0.7}
                style={styles.row}
                onPress={() => handleItemPress(item)}
              >
                <Text
                  style={[
                    styles.rowText,
                    isTablet && { fontSize: 18 },
                  ]}
                >
                  {item}
                </Text>
                <MaterialCommunityIcons
                  name="chevron-right"
                  size={28}
                  color="#1F6FC4"
                />
              </TouchableOpacity>
            ))}
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
    backgroundColor: '#FAFAFA',
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

  /* Section Header */
  sectionHeader: {
    backgroundColor: '#CFE5FA',
    height: 56,
    marginHorizontal: 6,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },

  sectionHeaderText: {
    fontSize: 22,
    fontWeight: '700',
    color: '#0B5AA7',
  },

  /* Rows */
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 18,
    marginHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },

  rowText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#111',
  },
});
