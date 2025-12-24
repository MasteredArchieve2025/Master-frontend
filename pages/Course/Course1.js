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
import Icon from 'react-native-vector-icons/FontAwesome5';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import Button from '../../src/components/Button';
import Footer from '../../src/components/Footer';

const activities = [
  { id: 1, title: 'Computer & IT', icon: 'laptop', sections: [{ title: 'Computer & IT', items: ['Web Development','Python Programming','Data Science','Cybersecurity','Cloud Computing'] }] },
  { id: 2, title: 'Health Science', icon: 'heartbeat', sections: [{ title: 'Health Science', items: ['Nursing Fundamentals','Public Health','Nutrition & Dietetics','Medical Terminology','First Aid & CPR'] }] },
  { id: 3, title: 'Business & Management', icon: 'briefcase', sections: [{ title: 'Business & Management', items: ['Digital Marketing','Business Analytics','Project Management','Finance Fundamentals','Entrepreneurship'] }] },
  { id: 4, title: 'Language & Communication', icon: 'language', sections: [{ title: 'Language & Communication', items: ['English Grammar & Writing','Public Speaking','Business Communication','French for Beginners','Creative Writing'] }] },
  { id: 5, title: 'Engineering & Technical', icon: 'cogs', sections: [{ title: 'Engineering & Technical', items: ['Mechanical Engineering Basics','Electrical Systems','Civil Engineering','Robotics','3D Printing & CAD Design'] }] },
  { id: 6, title: 'Arts & Design', icon: 'paint-brush', sections: [{ title: 'Arts & Design', items: ['UI/UX Design','Graphic Design','Animation','Photography','Interior Design'] }] },
  { id: 7, title: 'Lifestyle & Personal Development', icon: 'user', sections: [{ title: 'Lifestyle & Personal Development', items: ['Time Management','Mindfulness & Meditation','Fitness & Wellness','Personal Finance','Goal Setting'] }] }
];

export default function Course1({ navigation }) {
  const handleDetailsPress = (category) => {
    navigation.navigate('Course2', {
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

          <Text style={styles.headerTitle}>Courses</Text>

          {/* Spacer */}
          <View style={styles.rightSpace} />
        </View>
      </View>

      {/* Body */}
      <ScrollView
        style={styles.body}
        contentContainerStyle={{ padding: 15 }}
        showsVerticalScrollIndicator={false}
      >
        {activities.map((item) => (
          <View key={item.id} style={styles.card}>
            <View style={styles.row}>
              <LinearGradient
                colors={['#2295D2', '#284598']}
                start={{ x: 0, y: 0.5 }}
                end={{ x: 1, y: 0.5 }}
                style={styles.iconContainer}
              >
                <Icon name={item.icon} size={28} color="#fff" />
              </LinearGradient>

              <View style={{ flex: 1 }}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.description}>
                  Extra-curricular activities help students explore their interests beyond academics,
                  enhancing creativity, teamwork, and leadership skills.
                </Text>
              </View>
            </View>

            <View style={styles.buttonWrapper}>
              <Button title="Details" onPress={() => handleDetailsPress(item)} />
            </View>
          </View>
        ))}
      </ScrollView>
      <Footer/>
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

  /* Body */
  body: {
    flex: 1,
    backgroundColor: '#fff',
  },

  /* Cards */
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    paddingBottom: 40,
    marginBottom: 16,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 4,
    shadowOffset: { width: 2, height: 3 },
    position: 'relative',
  },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },

  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#004780',
  },

  description: {
    fontSize: 10,
    color: '#000',
    marginTop: 4,
  },

  buttonWrapper: {
    position: 'absolute',
    bottom: 0,
    right: 0,
  },
});
