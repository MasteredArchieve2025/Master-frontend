import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Svg, { Path } from 'react-native-svg';

import { useNavigation } from '@react-navigation/native';
const allColleges = [
  {
    name: 'Arunachala College of Engineering For Women, Nagercoil',
    logo: require('../../assets/collegeicon.png'),
  },
  {
    name: 'Arunachala College of Engineering For Women, Nagercoil',
    logo: require('../../assets/collegeicon.png'),
  },
  {
    name: 'Arunachala College of Engineering For Women, Nagercoil',
    logo: require('../../assets/collegeicon.png'),
  },
];

const govtUniversities = [
  {
    name: 'Government College of Technology, Coimbatore',
    logo: require('../../assets/collegeicon.png'),
  },
];

const autonomousUniversities = [
  {
    name: 'PSG College of Technology, Coimbatore',
    logo: require('../../assets/collegeicon.png'),
  },
];

// 🔹 Custom Read More Button with angled design
function ReadMoreButton({ onPress }) {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.8} style={styles.readMoreContainer}>
      <Svg height="36" width="110" style={styles.readMoreShadow}>
        <Path
          d="M20 0 L110 0 L110 36 L0 36 Z"
          fill="#0c2f63"
        />
      </Svg>
      <View style={styles.readMoreTextContainer}>
        <Text style={styles.readMoreText}>Read More</Text>
      </View>
    </TouchableOpacity>
  );
}

const College3 = ({ route }) => {
  const { degree } = route.params;
  const [activeTab, setActiveTab] = useState('All');
  const navigation = useNavigation(); 

  const renderColleges = () => {
    switch (activeTab) {
      case 'All':
        return allColleges;
      case 'Govt':
        return govtUniversities;
      case 'Autonomous':
        return autonomousUniversities;
      default:
        return [];
    }
  };

  return (
    <View style={styles.container}>
      

      {/* Greeting */}
      <Text style={styles.greeting}>Hello! Mabisha</Text>

      {/* Filters */}
      <View style={styles.filtersContainer}>
        <TouchableOpacity style={styles.filterButton}>
          <Text>Filters</Text>
          <Ionicons name="chevron-down" size={20} color="gray" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.filterButton}>
          <Text>Select</Text>
          <Ionicons name="chevron-down" size={20} color="gray" />
        </TouchableOpacity>
      </View>

      {/* Tabs */}
      <View style={styles.tabsContainer}>
        <TouchableOpacity style={styles.tab} onPress={() => setActiveTab('All')}>
          <Text style={activeTab === 'All' ? styles.activeTabText : styles.tabText}>All</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tab} onPress={() => setActiveTab('Govt')}>
          <Text style={activeTab === 'Govt' ? styles.activeTabText : styles.tabText}>Govt Universities</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tab} onPress={() => setActiveTab('Autonomous')}>
          <Text style={activeTab === 'Autonomous' ? styles.activeTabText : styles.tabText}>Autonomous Universities</Text>
        </TouchableOpacity>
      </View>

      {/* College List */}
      <ScrollView contentContainerStyle={styles.list}>
        {renderColleges().map((college, index) => (
          <View key={index} style={styles.card}>
            <Image source={college.logo} style={styles.logo} />
            <View style={styles.collegeInfo}>
              <Text style={styles.collegeName}>{college.name}</Text>
              <ReadMoreButton 
                onPress={() => navigation.navigate("College4", { college })} 
               />
            </View>
          </View>
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
  headerTitle: { fontSize: 18, fontWeight: 'bold', color: '#0c2f63' },
  headerIcons: { flexDirection: 'row' },
  icon: { marginHorizontal: 10 },
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
    paddingHorizontal: 20,
    paddingVertical: 10,
    color: '#0c2f63',
  },
  filtersContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginVertical: 10,
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
    width: '48%',
    justifyContent: 'space-between',
  },
  tabsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 20,
    marginVertical: 10,
  },
  tab: { paddingVertical: 5 },
  tabText: { color: 'gray' },
  activeTabText: {
    color: '#0c2f63',
    borderBottomWidth: 2,
    borderBottomColor: '#0c2f63',
  },
  list: { paddingHorizontal: 20 },
  card: {
    flexDirection: 'row',
    backgroundColor: '#f2f2f2',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    alignItems: 'center',
  },
  logo: { width: 60, height: 60, marginRight: 15 },
  collegeInfo: { flex: 1 },
  collegeName: { fontSize: 16, fontWeight: 'bold', marginBottom: 10 },

  // 🔹 Read More Button Styles (Right aligned + angled)
  readMoreContainer: {
  position: 'relative',
  alignSelf: 'flex-end',
  marginRight: -15, // corner effect
  marginTop: 5,     // 🔹 move button slightly down
},

  readMoreShadow: {
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  readMoreTextContainer: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    height: 36,
    width: 110,
  },
  readMoreText: { color: '#fff', fontWeight: 'bold', fontSize: 13 },

  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 20,
    borderTopWidth: 1,
    borderTopColor: '#f2f2f2',
  },
});

export default College3;
