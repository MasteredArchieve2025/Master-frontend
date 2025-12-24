import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Linking,
  SafeAreaView,
  Platform,
  Dimensions,
  StatusBar,
} from "react-native";
import { Ionicons, FontAwesome, Feather } from "@expo/vector-icons";
import Footer from "../../src/components/Footer";

const { width } = Dimensions.get("window");
const isTablet = width >= 768;

const STUDIO_LOGO = require("../../assets/AKlogo.png"); // replace with your logo path

export default function Course4({ navigation }) {
  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" backgroundColor="#0052A2" />

      {/* ---------- HEADER ---------- */}
      <View style={styles.headerWrapper}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backBtn}
            onPress={() => navigation.goBack()}
          >
            <Ionicons
              name={Platform.OS === "ios" ? "chevron-back" : "arrow-back"}
              size={24}
              color="#fff"
            />
          </TouchableOpacity>

          <Text style={styles.headerTitle}>About Courses</Text>

          <View style={styles.rightSpace} />
        </View>
      </View>

      {/* ---------- BODY ---------- */}
      <ScrollView
        style={styles.container}
        contentContainerStyle={{ paddingBottom: 30, paddingHorizontal: isTablet ? 32 : 16 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Header Logo & Title */}
        <View style={styles.logoBox}>
          <Image source={STUDIO_LOGO} style={styles.logo} />
        </View>
        <Text style={styles.title}>AK Technologies</Text>

        {/* Description */}
        <Text style={styles.description}>
          Founded in 2015, AK Technologies focuses on IT training and placement support. The institute
          offers technical courses including Python, Python with Machine Learning, NetApp, and CommVault,
          along with IEEE-based live project training for engineering students. However, details about the
          course duration and delivery mode are not clearly provided on their official website.
        </Text>

        {/* Courses Offered */}
        <Text style={styles.subHeading}>Courses Offered:</Text>
        <Text style={styles.list}>• Web Development</Text>
        <Text style={styles.list}>• Full Stack Development</Text>
        <Text style={styles.list}>• Python</Text>
        <Text style={styles.list}>• Data Science</Text>

        {/* Mode */}
        <Text style={styles.subHeading}>Mode:</Text>
        <Text style={styles.list}>Online & Offline</Text>

        {/* Benefits */}
        <Text style={styles.subHeading}>Benefits of Taking Courses:</Text>
        <Text style={styles.list}>• Boosts your career opportunities</Text>
        <Text style={styles.list}>• Improves your knowledge and confidence</Text>
        <Text style={styles.list}>• Helps with job promotions or career change</Text>
        <Text style={styles.list}>• Lets you learn anytime, anywhere</Text>

        {/* Website */}
        <Text style={styles.subHeading}>Website:</Text>
        <Text style={styles.list}>www.ak.com</Text>
      </ScrollView>

      {/* ---------- FOOTER ---------- */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.footerBtn}
          onPress={() => Linking.openURL("https://wa.me/919384152923")}
        >
          <FontAwesome name="whatsapp" size={isTablet ? 24 : 20} color="#fff" />
          <Text style={[styles.footerText, { fontSize: isTablet ? 16 : 14 }]}>Whatsapp</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.footerBtn}
          onPress={() => Linking.openURL("tel:919384152923")}
        >
          <Feather name="phone-call" size={isTablet ? 24 : 20} color="#fff" />
          <Text style={[styles.footerText, { fontSize: isTablet ? 16 : 14 }]}>Call</Text>
        </TouchableOpacity>
      </View>
      <Footer/>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#fff" },

  /* ---------- HEADER ---------- */
  headerWrapper: { backgroundColor: "#0052A2" },
  header: {
    height: Platform.OS === "ios" ? 52 : 64,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
  },
  backBtn: { width: 40, justifyContent: "center" },
  headerTitle: {
    flex: 1,
    textAlign: "center",
    fontSize: Platform.OS === "ios" ? 17 : 18,
    fontWeight: Platform.OS === "ios" ? "600" : "700",
    color: "#fff",
  },
  rightSpace: { width: 40 },

  /* ---------- BODY ---------- */
  container: { flex: 1, backgroundColor: "#FAFAFA" },
  logoBox: {
    width: isTablet ? 140 : 120,
    height: isTablet ? 130 : 110,
    backgroundColor: "#fff",
    borderRadius: 12,
    borderColor: "#EDEDED",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 16,
    alignSelf: "center",
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 2 },
  },
  logo: { width: isTablet ? 120 : 98, height: isTablet ? 80 : 65, resizeMode: "contain" },
  title: { fontSize: isTablet ? 20 : 16, fontWeight: "bold", color: "#004780", textAlign: "center", marginTop: 12 },

  description: { fontSize: isTablet ? 16 : 14, color: "#333", marginTop: 12, textAlign: "justify" },
  subHeading: { fontSize: isTablet ? 20 : 18, fontWeight: "bold", color: "#004780", marginTop: 16, marginBottom: 6 },
  list: { fontSize: isTablet ? 16 : 14, color: "#444", marginLeft: 10, marginBottom: 4 },

  /* ---------- FOOTER ---------- */
  footer: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: isTablet ? 16 : 12,
    backgroundColor: "#fff",
  },
  footerBtn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#005AA1",
    paddingVertical: isTablet ? 12 : 10,
    paddingHorizontal: isTablet ? 20 : 16,
    borderRadius: 8,
    minWidth: isTablet ? 180 : 150,
    justifyContent: "center",
  },
  footerText: { color: "#fff", fontWeight: "600", marginLeft: 8 },
});
