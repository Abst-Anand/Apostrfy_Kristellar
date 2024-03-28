import React, { useState, useEffect } from 'react';
import { SectionList, Image, StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/FontAwesome5'; // Assuming you have Ionicons installed


const data = [
  { id: 1, 
    name: 'Aaron Rodgers',
    profilePic: require('../assets/girl.jpg'),
},
  { id: 2, 
    name: 'Adrian Barlowe',
    profilePic: require('../assets/download.jpeg'),},
  { id: 3, name: 'Aiden Caddel', profilePic: require('../assets/mocompany.jpg'),},
  { id: 4, name: 'Alexander Hart', profilePic: require('../assets/girl.jpg'),},
  { id: 5, name: 'Anthony Katz', profilePic: require('../assets/girl.jpg'),},
  { id: 6, name: 'Brooke Laurier', profilePic: require('../assets/girl.jpg'),},
  { id: 7, name: 'Bailey Madden', profilePic: require('../assets/girl.jpg'),},
  { id: 8, name: 'Deny', profilePic: require('../assets/girl.jpg'),},
  { id: 9, name: 'Brianna Whitlock', profilePic: require('../assets/girl.jpg'),},
  { id: 10, name: 'Payal', profilePic: require('../assets/girl.jpg'),},
  { id: 11, name: 'Anandi', profilePic: require('../assets/girl.jpg'),},
];

const ConnectionList = (props) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredData, setFilteredData] = useState(data);

  const handleSearch = (text) => {
    setSearchQuery(text);
    // Implement your logic to filter chat list based on searchQuery
    // For example, you could filter the chatList array based on user names or chat content
    const filteredData = data.filter(item =>
      item.name.toLowerCase().includes(text.toLowerCase())
    );
    const sortedData = data.sort((a, b) => a.name.localeCompare(b.name));
    setFilteredData(filteredData);
  };
  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => props.navigation.navigate("pvtmsg",{name: item.name, picture: item.profilePic})}>
    <View style={styles.itemContainer}>
      <Image source={item.profilePic} style={styles.profilePic} />
      <Text style={styles.name}>{item.name}</Text>
    </View>
    </TouchableOpacity>
  );
  useEffect(() => {
    const sortedData = data.sort((a, b) => a.name.localeCompare(b.name));
    setFilteredData(sortedData);
  }, []);

  // Grouping data by the first character of each item's name
  const groupedData = filteredData.reduce((acc, item) => {
    const initial = item.name.charAt(0).toUpperCase();
    if (!acc[initial]) {
      acc[initial] = [];
    }
    acc[initial].push(item);
    return acc;
  }, {});

  // Creating sections array from the grouped data
  const sections = Object.keys(groupedData).map(initial => ({
    title: initial,
    data: groupedData[initial],
  }));

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
          <Ionicons name="search" size={24} color="white" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search"
            placeholderTextColor={'white'}
            value={searchQuery}
            onChangeText={handleSearch}
            color={'white'}
          />
        </View>
        <View style={styles.connectIcon}>
          <TouchableOpacity style={styles.icon} onPress={()=> props.navigation.navigate("ConnectionList")}>
            <Icon name="user-plus" size={20} color="white" style={{alignItems:'center', alignContent: 'center', top: 6, justifyContent: 'center'}} />
          </TouchableOpacity>
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#151918',
    backgroundColor: '#151918',
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    top: 2,
    width: 350,
    alignItems: 'center',
    left: 30,
  },
  profilePic: {
    width: 50,
    height: 60,
    borderRadius: 25,
  },
  name: {
    marginLeft: 10,
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  searchContainer: {
    top:10,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor:'black',
    //marginBottom: 10,
    left: 20,
    paddingLeft: 10,
    width: 300,
    borderRadius: 40,
  },
  connectIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor:'black',
    //marginBottom: 10,
    left: 350,
    bottom: 35,
    paddingLeft: 10,
    width: 0,
    borderRadius: 40,
  },
  searchInput: {
    flex: 1,
    backgroundColor: 'black',
    borderWidth: 1,
    borderColor: 'transparent',
    borderRadius: 40,
    padding: 10,
    paddingHorizontal: 10,
    marginRight: 40,
  },
  connectionsContainer: {
    height: 80,
    paddingHorizontal: 10,
    marginBottom: 10,
    borderColor: 'white',
    left: 50,
    marginLeft: 20,
  },
  icon:{
    width: 40,
    height: 40,
    alignItems: 'center',
    backgroundColor: 'black',
    borderRadius: 40,
    alignContent: 'center',
    right: 30
  },
  sectionHeader: {
    //backgroundColor: '#333',
    //padding: 10,
    width: 40,
    left: 20,
    top: 25,
  },
  sectionHeaderText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default ConnectionList;