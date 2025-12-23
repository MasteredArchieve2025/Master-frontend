import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Platform,
  StatusBar,
  SafeAreaView,
} from 'react-native';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';
import Button from '../../src/components/Button';

const activities = [
  {
    title: 'Fine Arts',
    icon: 'palette',
    sections: [
      {
        title: 'Dance Classes',
        items: [
          'Classical Dance',
          'Western Dance',
          'Folk Dance',
          'Zumba / Fitness Dance',
          'Freestyle & Choreography Training',
        ],
      },
      {
        title: 'Music Classes',
        items: [
          'Classical Vocal',
          'Western Vocal',
          'Devotional / Bhajan Singing',
          'Folk Music Singing',
          'Voice Culture & Training',
        ],
      },
      {
        title: 'Drawing Classes',
        items: [
          'Basic Drawing & Sketching',
          'Creative Art & Imagination Drawing',
          'Thematic & Subject Drawing',
          'Professional Art Techniques',
          'Art for School & Hobby',
        ],
      },
    ],
  },
  {
    title: 'Driving Class',
    icon: 'directions-car',
    sections: [
      {
        title: 'Driving Lessons',
        items: [
          'Two Wheeler',
          'Four Wheeler',
          'Heavy Vehicle',
          'Driving Rules',
          'Practical Lessons',
        ],
      },
    ],
  },
  {
    title: 'Athlete',
    icon: 'directions-run',
    sections: [
      {
        title: 'Athletics',
        items: ['Track Running', 'Marathon Prep', 'High Jump', 'Long Jump'],
      },
    ],
  },
  {
    title: 'Sports & Fitness Classes',
    icon: 'sports-soccer',
    sections: [
      { title: 'Sports', items: ['Football', 'Cricket', 'Yoga', 'Gym', 'Swimming'] },
    ],
  },
  {
    title: 'Home Science',
    icon: 'local-laundry-service',
    sections: [
      {
        title: 'Home Science',
        items: ['Cooking', 'Sewing', 'Home Management', 'Interior Design'],
      },
    ],
  },
  {
    title: 'Other Unique Classes',
    icon: 'library-music',
    sections: [
      {
        title: 'Unique Classes',
        items: ['Music Production', 'Creative Writing', 'Photography', 'Film Making'],
      },
    ],
  },
];

export default function Extraskills1({ navigation }) {
  const handleDetailsPress = (category) => {
    navigation.navigate('Extraskills2', {
      categoryTitle: category.title,
      sections: category.sections,
    });
  };

  return (
    <SafeAreaView style={styles.safe}>
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

          <Text style={styles.headerTitle}>Extra Skills</Text>

          <View style={styles.rightSpace} />
        </View>
      </View>

      {/* Body */}
      <ScrollView
        style={styles.container}
        showsVerticalScrollIndicator={false}
      >
        {activities.map((item, index) => (
          <View key={index} style={styles.card}>
            <View style={styles.leftSection}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.description}>
                Extra-curricular activities help students explore their interests
                beyond academics, enhancing creativity, teamwork, and leadership
                skills.
              </Text>
            </View>

            <View style={styles.rightSection}>
              <MaterialIcons name={item.icon} size={50} color="#004780" />
            </View>

            <View style={styles.buttonContainer}>
              <Button title="Details" onPress={() => handleDetailsPress(item)} />
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#f8f8f8',
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

  /* Body */
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
    padding: 12,
  },

  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    paddingBottom: 40,
    marginBottom: 16,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowOffset: { width: 2, height: 3 },
    shadowRadius: 20,
    flexDirection: 'row',
    flexWrap: 'wrap',
    position: 'relative',
  },

  leftSection: {
    flex: 1,
    paddingRight: 16,
  },

  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#004780',
    marginBottom: 4,
  },

  description: {
    fontSize: 10,
    color: '#000',
    lineHeight: 13,
    marginTop: 4,
  },

  rightSection: {
    width: 60,
    alignItems: 'center',
    paddingBottom: 20,
    justifyContent: 'center',
  },

  buttonContainer: {
    position: 'absolute',
    bottom: 0,
    right: 0,
  },
});
