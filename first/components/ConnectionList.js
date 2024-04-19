import React, { useState, useEffect } from "react";
import {
  SectionList,
  Image,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Dimensions,
  Button,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import CustomStatusbar from "./CustomStatusBar";
import { LinearGradient } from "expo-linear-gradient";
import { Feather } from "@expo/vector-icons";
import { sendRequest } from "../backend/handlers/sendRequestFromUI";

const { width, height } = Dimensions.get("window");

const ConnectionList = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const uniqueCode = route.params.uniquecode;
  const socket = route.params.socket;
  
  const [backendData, setBackendData] = useState("");

  useEffect(() => {
    loadConnections();
  }, []);

  const loadConnections = async () => {
    const uid = uniqueCode;
    const formData = { uid: uid };
    const resp = await sendRequest(formData, "/connections/showConnections");
    const respdata = await resp.json();
    setBackendData(respdata);
  };

  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    if (backendData) {
      // Filter the backendData based on searchQuery
      const filteredData = backendData.filter((item) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredData(filteredData);
    }
  }, [searchQuery, backendData]);

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => handleProfilePress(item)}>
      <View style={styles.itemContainer}>
        <Image
          source={require("../assets/pic1.png")}
          style={styles.profilePic}
        />
        <Text style={styles.name}>{item.name}</Text>
      </View>
    </TouchableOpacity>
  );

  const handleProfilePress = (item) => {
    navigation.navigate("Pvtmsg", { fromUser: uniqueCode, toUser: item, socket });
  };

  const groupedData = filteredData.reduce((acc, item) => {
    const initial = item.name.charAt(0).toUpperCase();
    if (!acc[initial]) {
      acc[initial] = [];
    }
    acc[initial].push(item);
    return acc;
  }, {});

  const sections = Object.keys(groupedData)
    .sort()
    .map((initial) => ({
      title: initial,
      data: groupedData[initial],
    }));

  const FooterButton = ({ icon, onPress }) => {
    return (
      <TouchableOpacity style={styles.footerButton} onPress={onPress}>
        <Feather name={icon} size={24} color="#fff" />
      </TouchableOpacity>
    );
  };

  return (
    <LinearGradient colors={["#040504", "#040504"]} style={styles.container}>
      <CustomStatusbar />
      <View style={styles.searchContainer}>
        <Ionicons
          name="search"
          size={24}
          color="white"
          style={styles.searchIcon}
        />
        <TextInput
          style={styles.searchInput}
          placeholder="Search"
          placeholderTextColor={"white"}
          value={searchQuery}
          onChangeText={setSearchQuery}
          color={"white"}
        />
      </View>
      <SectionList
        sections={sections}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        renderSectionHeader={({ section: { title } }) => (
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionHeaderText}>{title}</Text>
          </View>
        )}
        showsVerticalScrollIndicator={true}
      />
      <View style={styles.footer}>
        {/* Footer buttons */}
        <FooterButton
          icon="home"
          onPress={() => navigation.navigate("WriteThoughtScreen")}
        />
        <FooterButton
          icon="message-circle"
          onPress={() => navigation.navigate("ChatList")}
        />
        <FooterButton
          icon="map-pin"
          onPress={() => navigation.navigate("MapPage")}
        />
        <FooterButton
          icon="users"
          onPress={() => navigation.navigate("ConnectionScreen")}
        />
        <FooterButton
          icon="bell"
          onPress={() => navigation.navigate("NotificationPage")}
        />
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
    paddingBottom: height * 0.08,
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
  },
  profilePic: {
    width: 50,
    height: 60,
    borderRadius: 50,
  },
  name: {
    marginLeft: 10,
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#333333",
    paddingLeft: 16,
    width: "95%",
    borderRadius: 5,
    left: 10,
    top: 15,
    marginBottom: 15,
  },
  searchInput: {
    flex: 1,
    backgroundColor: "#333333",
    borderWidth: 1,
    borderColor: "transparent",
    borderRadius: 40,
    padding: 10,
    paddingHorizontal: 16,
    color: "white",
  },
  sectionHeader: {
    padding: 10,
  },
  sectionHeaderText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#000000",
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
  },
  footerButton: {
    padding: 10,
  },
});

export default ConnectionList;
