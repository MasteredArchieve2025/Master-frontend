import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Platform,
  StatusBar,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native"; // ✅ IMPORTANT

export default function Header({ title = "Master Archieve" }) {
  const navigation = useNavigation(); // ✅ NOW EXISTS

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />

      <View style={styles.container}>
        {/* Left spacer (keeps title centered) */}
        <View style={styles.sideSpace} />

        {/* Title */}
        <Text style={styles.title}>{title}</Text>

        {/* Right Icons */}
        <View style={styles.rightIcons}>
          <TouchableOpacity style={styles.iconBtn}>
            <Ionicons name="search-outline" size={22} color="#083467" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.iconBtn}>
            <Ionicons name="notifications-outline" size={22} color="#083467" />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.iconBtn}
            onPress={() => navigation.navigate("Profile")}
          >
            <Ionicons name="person-circle-outline" size={26} color="#083467" />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    backgroundColor: "#fff",
  },

  container: {
    height: Platform.OS === "ios" ? 52 : 60,
    backgroundColor: "#fff",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },

  sideSpace: {
    width: 80, // balances right icons
  },

  title: {
    flex: 1,
    textAlign: "center",
    fontSize: Platform.OS === "ios" ? 18 : 19,
    fontWeight: Platform.OS === "ios" ? "600" : "700",
    color: "#043771",
  },

  rightIcons: {
    flexDirection: "row",
    alignItems: "center",
  },

  iconBtn: {
    marginLeft: 14,
  },
});
