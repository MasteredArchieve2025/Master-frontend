import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
  Dimensions,
  SafeAreaView,
  Platform,
  StatusBar,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const collegeIcon = require("../assets/collegeicon.png");
const schoolIcon = require("../assets/school.png");
const { width } = Dimensions.get("window");

/* Left Icons */
const LeftIconsCollege = () => (
  <View style={styles.leftIcons}>
    <Text style={styles.greenArrow}>▲</Text>
    <Image source={collegeIcon} style={styles.leftIconImage} resizeMode="contain" />
  </View>
);

const LeftIconsSchool = () => (
  <View style={styles.leftIcons}>
    <Text style={styles.greenArrow}>▲</Text>
    <Image source={schoolIcon} style={styles.leftIconImage} resizeMode="contain" />
  </View>
);

/* Card */
const CollegeCardFull = ({ rank, name }) => (
  <View style={styles.collegeCardWrapper}>
    <View style={styles.collegeNameContainer}>
      <Text style={styles.collegeName}>{name}</Text>
    </View>
    <View style={styles.rankContainer}>
      <Text style={styles.rankText}>{rank}</Text>
      <Text style={styles.trophyIcon}>🏆</Text>
    </View>
  </View>
);

export default function TopRatedList({ navigation }) {
  const [activeTab, setActiveTab] = useState("College");

  const collegeData = [
    { id: "1", name: "Arunachala College Of Engineering For Women", rank: 1 },
    { id: "2", name: "Arunachala College Of Engineering For Women", rank: 2 },
    { id: "3", name: "Arunachala College Of Engineering For Women", rank: 3 },
  ];

  const schoolData = [
    { id: "1", name: "Govt Hr Sec School, Tiruppur", rank: 1 },
    { id: "2", name: "Plato's Academy Hr Sec School", rank: 2 },
    { id: "3", name: "Sri Kamatchiamman Matriculation School", rank: 3 },
  ];

  const renderItem = ({ item }) => (
    <View style={styles.listItemContainer}>
      {activeTab === "College" ? <LeftIconsCollege /> : <LeftIconsSchool />}
      <CollegeCardFull rank={item.rank} name={item.name} />
    </View>
  );

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" backgroundColor="#0052A2" />

      {/* 🔵 HEADER — SAME AS SCHOOLS */}
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

          <Text style={styles.headerTitle}>Top Rated</Text>

          {/* Spacer to keep title centered */}
          <View style={styles.rightSpace} />
        </View>
      </View>

      {/* Body */}
      <View style={styles.body}>
        {/* Tabs */}
        <View style={styles.tabContainer}>
          {["College", "School"].map((tab) => (
            <TouchableOpacity key={tab} onPress={() => setActiveTab(tab)}>
              <Text
                style={[
                  styles.tabText,
                  activeTab === tab && styles.activeTabText,
                ]}
              >
                {tab}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* List */}
        <FlatList
          data={activeTab === "College" ? collegeData : schoolData}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={{ paddingBottom: 24 }}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#fff",
  },

  /* 🔵 Header (SAME AS SCHOOLS) */
  headerWrapper: {
    backgroundColor: "#0052A2",
  },

  header: {
    height: Platform.OS === "ios" ? 52 : 64,
    backgroundColor: "#0052A2",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: Platform.OS === "ios" ? 6 : 8,
  },

  backBtn: {
    width: 40,
    justifyContent: "center",
    alignItems: "flex-start",
  },

  headerTitle: {
    flex: 1,
    textAlign: "center",
    fontSize: Platform.OS === "ios" ? 17 : 18,
    fontWeight: Platform.OS === "ios" ? "600" : "700",
    color: "#fff",
  },

  rightSpace: {
    width: 40,
  },

  body: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
  },

  /* Tabs */
  tabContainer: {
    flexDirection: "row",
    marginVertical: 16,
  },

  tabText: {
    marginRight: 24,
    fontSize: 16,
    paddingBottom: 8,
    color: "#555",
  },

  activeTabText: {
    borderBottomWidth: 2,
    borderColor: "#000",
    color: "#000",
    fontWeight: "bold",
  },

  /* List */
  listItemContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },

  leftIcons: {
    flexDirection: "row",
    alignItems: "center",
    width: 70,
    marginRight: 12,
  },

  greenArrow: {
    color: "green",
    fontSize: 18,
    marginRight: 5,
  },

  leftIconImage: {
    width: 42,
    height: 42,
  },

  collegeCardWrapper: {
    flex: 1,
    minHeight: 80,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 12,
    backgroundColor: "#fff",
    borderRadius: 6,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 2, height: 2 },
    elevation: 2,
  },

  collegeNameContainer: {
    flex: 1,
    marginRight: 10,
    justifyContent: "center",
  },

  collegeName: {
    fontSize: 14,
    fontWeight: "600",
    color: "#000",
  },

  rankContainer: {
    alignItems: "center",
    justifyContent: "center",
    width: 50,
  },

  rankText: {
    fontWeight: "700",
    fontSize: 14,
    marginBottom: 2,
    color: "#000",
  },

  trophyIcon: {
    fontSize: 18,
  },
});
