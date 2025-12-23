import React from "react";
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, Linking } from "react-native";
import { FontAwesome, Feather } from "@expo/vector-icons";

// Local logo
const STUDIO_LOGO = require("../../assets/AKlogo.png"); // replace with your logo path

export default function Course4() {
  return (
    <View style={styles.container}>
      {/* Header - Static */}
      <View style={styles.header}>
        <View style={styles.logoBox}>
          <Image source={STUDIO_LOGO} style={styles.logo} />
        </View>
        <Text style={styles.title}>AK Technologies</Text>
      </View>

      {/* Scrollable Content */}
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <Text style={styles.description}>
          Founded in 2015, AK Technologies focuses on IT training and placement support. The institute
          offers technical courses including Python, Python with Machine Learning, NetApp, and CommVault,
          along with IEEE-based live project training for engineering students. However, details about the
          course duration and delivery mode are not clearly provided on their official website.
        </Text>

        <Text style={styles.subHeading}>Courses Offered:</Text>
        <Text style={styles.list}>• Web Development</Text>
        <Text style={styles.list}>• Full Stack Development</Text>
        <Text style={styles.list}>• Python</Text>
        <Text style={styles.list}>• Data Science</Text>

        <Text style={styles.subHeading}>Mode:</Text>
        <Text style={styles.list}>Online & Offline</Text>

        <Text style={styles.subHeading}>Benefits of Taking Courses:</Text>
        <Text style={styles.list}>• Boosts your career opportunities</Text>
        <Text style={styles.list}>• Improves your knowledge and confidence</Text>
        <Text style={styles.list}>• Helps with job promotions or career change</Text>
        <Text style={styles.list}>• Lets you learn anytime, anywhere</Text>

        <Text style={styles.subHeading}>Website:</Text>
        <Text style={styles.list}>www.ak.com</Text>
      </ScrollView>

      {/* Footer - Static */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.footerBtn}
          onPress={() => Linking.openURL("https://wa.me/919384152923")}
        >
          <FontAwesome name="whatsapp"size={20} color="#fff" />
          <Text style={styles.footerText}>Whatsapp</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.footerBtn} onPress={() => Linking.openURL("tel:919384152923")}>
          <Feather name="phone-call" size={20} color="#fff" />
          <Text style={styles.footerText}>Call</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },

  // Header
  header: {
    alignItems: "center",
    paddingVertical: 20,
   
  },
  logoBox: {
    width: 120,
    height: 110,
    backgroundColor: "#FFFF", // rectangle bg color
    borderRadius: 10,
    borderColor:"#EDEDED",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 6,
    elevation: 3, // shadow (Android)
    shadowColor: "#000", // shadow (iOS)
    shadowOpacity: 0.2,
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 2 },
  },
  logo: { width: 98, height: 65, resizeMode: "contain", },
  title: { fontSize: 16, fontWeight: "bold", color: "#004780",paddingTop:20 },

  // Scrollable content
  scrollContent: { padding: 16 },
  description: { fontSize: 14, color: "#333", marginBottom: 12, textAlign: "justify" },
  subHeading: { fontSize: 18, fontWeight: "bold", color: "#004780", marginTop: 12, marginBottom: 6 },
  list: { fontSize: 14, color: "#444", marginLeft: 10, marginBottom: 4 },

  // Footer
  footer: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 12,
    backgroundColor: "#fff",
  },
  footerBtn: {
    width:169,
    height:40,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#005AA1",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  footerText: { color: "#fff", fontSize: 14, marginLeft: 6, fontWeight: "600",paddingHorizontal: 8 },
});
