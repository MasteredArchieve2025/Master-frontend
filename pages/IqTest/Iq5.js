import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // ✅ Import navigation hook

const { width } = Dimensions.get('window');

export default function Iq5() {
  const navigation = useNavigation(); // ✅ Get navigation instance

  const answers = [
    { id: 'A', text: 'Blue' },
    { id: 'B', text: 'Green' },
    { id: 'C', text: 'Black' },
    { id: 'D', text: 'Rose' }
  ];

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Greeting */}
        <Text style={styles.greeting}>
          Hello ! <Text style={styles.name}>Mabisha</Text>
        </Text>

        {/* Question Number */}
        <Text style={styles.questionNumber}>Question: 2</Text>

        {/* Question Text */}
        <Text style={styles.questionText}>
          What colour is the girl dress in the image ?
        </Text>

        {/* Answer Buttons */}
        <View style={styles.optionsContainer}>
          {answers.map((option) => (
            <TouchableOpacity key={option.id} style={styles.optionButton}>
              <Text style={styles.optionText}>
                {option.id}) {option.text}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {/* Bottom Buttons */}
      <View style={styles.bottomButtons}>
       <TouchableOpacity
  style={[styles.actionButton, { backgroundColor: '#004c97' }]}
  onPress={() => navigation.navigate('Iq4')} // ✅ go to the first question
>
  <Text style={styles.actionText}>Previous</Text>
</TouchableOpacity>


        <TouchableOpacity
          style={[styles.actionButton, { backgroundColor: '#004c97' }]}
          onPress={() => navigation.navigate('Iq6')} // ✅ Navigate to AnswersPage
        >
          <Text style={styles.actionText}>Submit</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  scrollContent: { paddingHorizontal: 20, paddingBottom: 20 },
  greeting: { fontSize: 22, fontWeight: '600', marginTop: 10, marginBottom: 20 },
  name: { color: '#004c97' },
  questionNumber: { fontSize: 20, fontWeight: '600', color: '#004c97', marginBottom: 10 },
  questionText: { fontSize: 18, fontWeight: 'bold', marginBottom: 25 },
  optionsContainer: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', marginBottom: 40 },
  optionButton: { backgroundColor: '#f5f5f5', width: (width - 60) / 2, paddingVertical: 15, borderRadius: 6, marginBottom: 20, alignItems: 'center', elevation: 1 },
  optionText: { fontSize: 16, color: '#004c97', fontWeight: '600' },
  bottomButtons: { flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 20, paddingVertical: 15, backgroundColor: '#fff' },
  actionButton: { flex: 0.48, paddingVertical: 16, borderRadius: 10, alignItems: 'center' },
  actionText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
});
