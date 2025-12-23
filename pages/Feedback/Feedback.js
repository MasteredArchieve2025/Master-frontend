import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Footer from '../../src/components/Footer';
export default function Feedback() {
  const [rating, setRating] = useState(0);

  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <TouchableOpacity key={i} onPress={() => setRating(i)}>
          <Ionicons
            name={i <= rating ? "star" : "star-outline"}
            size={20}
            color="#f4c430"
          />
        </TouchableOpacity>
      );
    }
    return stars;
  };

  // Customer Feedback Data
  const feedbacks = [
    {
      id: 1,
      name: "Mabisha",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg",
      rating: 5,
      comment:
        "The service was excellent! Very friendly staff and quick response. Highly recommended.",
    },
    {
      id: 2,
      name: "Arun Kumar",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
      rating: 4,
      comment:
        "Good experience overall. The booking process was simple, but can improve in speed.",
    },
    {
      id: 3,
      name: "Priya Sharma",
      avatar: "https://randomuser.me/api/portraits/women/68.jpg",
      rating: 5,
      comment:
        "Amazing app! Saved me so much time waiting in queues. Will definitely use it again.",
    },
    {
      id: 4,
      name: "Rahul Mehta",
      avatar: "https://randomuser.me/api/portraits/men/54.jpg",
      rating: 3,
      comment:
        "The app is helpful but sometimes notifications are delayed. Please fix this.",
    },
    {
      id: 5,
      name: "Divya Patel",
      avatar: "https://randomuser.me/api/portraits/women/12.jpg",
      rating: 5,
      comment:
        "Fantastic experience! User-friendly design and smooth booking process.",
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      

      <ScrollView>
        {/* Feedback Form */}
        <View style={styles.formBox}>
          <Text style={styles.formTitle}>Feedback Form</Text>

          <Text style={styles.label}>Student Name</Text>
          <TextInput style={styles.input} placeholder="Enter your name" />

          <Text style={styles.label}>Email ID</Text>
          <TextInput style={styles.input} placeholder="Enter your email" />

          <View style={styles.row}>
            <Text style={styles.label}>Rate :</Text>
            <View style={styles.starRow}>{renderStars()}</View>
          </View>

          <Text style={styles.label}>Comment / Query</Text>
          <TextInput
            style={[styles.input, { height: 80 }]}
            placeholder="Write here..."
            multiline
          />

          <View style={styles.buttonRow}>
            <TouchableOpacity style={styles.sendBtn}>
              <Text style={styles.btnText}>Send</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.saveBtn}>
              <Text style={styles.btnText}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Customer Feedback */}
        <Text style={styles.customerFeedbackTitle}>Customer Feedback</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {feedbacks.map((item) => (
            <View key={item.id} style={styles.card}>
              <Image source={{ uri: item.avatar }} style={styles.avatar} />
              <Text style={styles.name}>{item.name}</Text>
              <View style={styles.cardStars}>
                {Array(5)
                  .fill(0)
                  .map((_, i) => (
                    <Ionicons
                      key={i}
                      name={i < item.rating ? "star" : "star-outline"}
                      size={14}
                      color="#FFD700"
                    />
                  ))}
              </View>
              <Text style={styles.comment}>{item.comment}</Text>
            </View>
          ))}
        </ScrollView>
      </ScrollView>
      <Footer />

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f2f2",
  },
  formBox: {
    backgroundColor: "#cfe8f7",
    margin: 10,
    padding: 15,
    borderRadius: 8,
  },
  formTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#0077b6",
    marginBottom: 10,
    textAlign: "center",
  },
  label: {
    fontSize: 14,
    fontWeight: "500",
    marginTop: 10,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 8,
    backgroundColor: "#fff",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  starRow: {
    flexDirection: "row",
    marginLeft: 10,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 15,
  },
  sendBtn: {
    backgroundColor: "#0077b6",
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  saveBtn: {
    backgroundColor: "#0077b6",
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  btnText: {
    color: "#fff",
    fontWeight: "600",
  },
  customerFeedbackTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#0077b6",
    margin: 10,
  },
  card: {
    width: 200,
    backgroundColor: "#0077b6",
    borderRadius: 8,
    padding: 10,
    marginHorizontal: 10,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    alignSelf: "center",
    marginBottom: 5,
  },
  name: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
  },
  cardStars: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 4,
  },
  comment: {
    color: "#fff",
    fontSize: 12,
    textAlign: "center",
  },
});
