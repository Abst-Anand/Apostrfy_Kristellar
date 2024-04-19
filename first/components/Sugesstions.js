import React, { useState, useEffect } from "react";
import {
  SectionList,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { sendRequest } from "../backend/handlers/sendRequestFromUI";
import { Footer } from "./Footer";

const { height } = Dimensions.get("window");

const Suggestions = () => {
  const navigation = useNavigation();
  const [backendData, setBackendData] = useState(null);
  const [addLoadingId, setAddLoadingId] = useState(null);
  const [deleteLoadingId, setDeleteLoadingId] = useState(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const uid = "2CGDC";
    const formData = { uid: uid };
    try {
      const resp = await sendRequest(formData, "/suggestions");
      const respdata = await resp.json();
      setBackendData(respdata);
      console.log("Data Loaded from backend");
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleAcceptRequest = async (id) => {
    setAddLoadingId(id);
    const fromUser = "Test4";
    const formData = { from: fromUser, to: id };
    const resp = await sendRequest(formData, "/connections/addConnection");
    // console.log(resp);
    const respData = await resp.json();
    Alert.alert(respData.message);

    console.log(`Connection request sent to user: ${id}`);

    setAddLoadingId(null);
  };

  const handleDeleteRequest = (id) => {
    setDeleteLoadingId(id);
    console.log(`Deleted request from user with id: ${id}`);

    setTimeout(() => {
      setDeleteLoadingId(null);
      setBackendData(backendData.filter((item) => item.id !== id));
    }, 300);
  };

  const handleProfilePress = (item) => {
    navigation.navigate("Pvtmsg", { user: item });
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.suggestionItems}
      onPress={() => handleProfilePress(item)}
    >
      <View style={styles.notificationContent}>
        <Text style={styles.name}>{item.name}</Text>
        <View style={styles.actionsContainer}>
          <>
            <TouchableOpacity
              onPress={() => handleAcceptRequest(item.id)}
              disabled={addLoadingId === item.id}
              style={{ marginRight: 26 }}
            >
              {addLoadingId === item.id ? (
                <ActivityIndicator color="#00cc00" size="small" />
              ) : (
                <MaterialCommunityIcons
                  name="plus"
                  size={24}
                  color="#00cc00"
                  style={styles.actionIcon}
                />
              )}
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handleDeleteRequest(item.id)}
              disabled={deleteLoadingId === item.id}
              style={{ marginRight: 5 }}
            >
              {deleteLoadingId === item.id ? (
                <ActivityIndicator color="#ff0000" size="small" />
              ) : (
                <MaterialCommunityIcons
                  name="close"
                  size={24}
                  color="#ff0000"
                  style={styles.actionIcon}
                />
              )}
            </TouchableOpacity>
          </>
        </View>
      </View>
    </TouchableOpacity>
  );

  const groupData = (data) => {
    return data.reduce((acc, item) => {
      const initial = item.interest;
      if (!acc[initial]) {
        acc[initial] = [];
      }
      acc[initial].push(item);
      return acc;
    }, {});
  };

  const sortedSections = backendData
    ? Object.entries(groupData(backendData))
        .sort(([keyA], [keyB]) => keyA.localeCompare(keyB))
        .map(([title, data]) => ({
          title,
          data,
        }))
    : [];

  return (
    <LinearGradient colors={["#040504", "#040504"]} style={styles.container}>
      <Text style={styles.title}>Suggested for you</Text>
      <SectionList
        sections={sortedSections}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        renderSectionHeader={({ section: { title } }) => (
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionHeaderText}>{title}</Text>
          </View>
        )}
        showsVerticalScrollIndicator={true}
      />
    </LinearGradient>
  );
};

const styles = {
  container: {
    flex: 1,
    backgroundColor: "#000000",
    paddingBottom: height * 0.08,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    color: "white",
    paddingTop: 15,
    paddingLeft: 10,
  },
  suggestionItems: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
    padding: 15,
    backgroundColor: "#222831",
  },
  actionsContainer: {
    flexDirection: "row",
  },
  actionIcon: {
    fontSize: 25,
  },
  notificationContent: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  name: {
    marginLeft: 10,
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  sectionHeader: {
    padding: 10,
  },
  sectionHeaderText: {
    color: "white",
    fontSize: 25,
    fontWeight: "bold",
  },
};

export default Suggestions;
