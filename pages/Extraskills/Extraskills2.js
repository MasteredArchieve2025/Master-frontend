import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function Extraskills2({ route, navigation }) {
  const sections = route?.params?.sections || [];

  const handleItemPress = (item) => {
    // Go to ExtraSkillsInfo for all items
    navigation.navigate('Extraskills3', { category: item });
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 24 }}>
      {sections.map((section, idx) => (
        <View key={idx} style={{ marginTop: 20 }}>
          {/* Section Header */}
          <View style={styles.header}>
            <Text style={styles.headerText}>{section.title}</Text>
          </View>

          {/* Items */}
          {section.items?.map((item, i) => (
            <TouchableOpacity
              key={i}
              activeOpacity={0.7}
              style={styles.row}
              onPress={() => handleItemPress(item)} // Navigate for all items
            >
              <Text style={styles.rowText}>{item}</Text>
              <MaterialCommunityIcons name="chevron-right" size={28} color="#1F6FC4" />
            </TouchableOpacity>
          ))}
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FAFAFA' },

  header: {
    backgroundColor: '#CFE5FA',
    height: 56,
    marginHorizontal: 10,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerText: {
    fontSize: 22,
    fontWeight: '700',
    color: '#0B5AA7',
  },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 18,
    marginHorizontal: 14,
  },
  rowText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#111',
  },
});
