import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const ICONS = [
  { name: "home-outline", key: "Home" },
  { name: "basket-outline", key: "Charity" },
  { name: "help-circle-outline", key: "Feedback" },
  { name: "person-outline", key: "Profile" },
];

const Footer = () => {
  const navigation = useNavigation(); 

  const handlePress = (key) => {
    navigation.navigate(key);
  };

  return (
    <View style={styles.container}>
      {ICONS.map(({ name, key }) => (
        <TouchableOpacity
          key={key}
          onPress={() => handlePress(key)}
          activeOpacity={0.7}
          style={styles.iconButton}
          accessibilityRole="button"
          accessibilityLabel={`Go to ${key} screen`}
        >
          <Ionicons name={name} size={28} color="#07448aff" />
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 14,
    backgroundColor: "#f8f8f8",
    borderTopWidth: 1,
    borderTopColor: "#e0e0e0",
  },
  iconButton: {
    paddingHorizontal: 12,
  },
});

export default Footer;
