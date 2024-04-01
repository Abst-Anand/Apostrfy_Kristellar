import React, { useState, useEffect } from 'react';
import { SectionList, Image, StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const data = [
  { id: 1, name: 'Uday Bhanu', profilePic: require('../assets/IMG_1616.jpg') },
  { id: 2, name: 'Debashis Sundaray', profilePic: require('../assets/IMG_1617.jpg') },
  { id: 3, name: 'Sumit Kumar Panda', profilePic: require('../assets/86e8411b-9d19-4bc4-b420-5b57c8aa30be.jpg') },
  { id: 4, name: 'Satyanarayan Mishraw', profilePic: require('../assets/IMG_1618.jpg') },
  { id: 5, name: 'Anand Raj', profilePic: require('../assets/pic1.png') },
  { id: 6, name: 'Priyanka Mohakud', profilePic: require('../assets/priya (1).jpg') },
  { id: 7, name: 'Manisha Choudhary', profilePic: require('../assets/mani.jpg') },
];

const ConnectionList = () => {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredData, setFilteredData] = useState(data);

  useEffect(() => {
    const sortedData = data.sort((a, b) => a.name.localeCompare(b.name));
    setFilteredData(sortedData);
  }, []);

  const handleSearch = (text) => {
    setSearchQuery(text);
    const filteredData = data.filter(item =>
      item.name.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredData(filteredData);
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => handleProfilePress(item)}>
      <View style={styles.itemContainer}>
        <Image source={item.profilePic} style={styles.profilePic} />
        <Text style={styles.name}>{item.name}</Text>
      </View>
    </TouchableOpacity>
  );

  const handleProfilePress = (item) => {
    navigation.navigate('Pvtmsg', { user: item });
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
    .map(initial => ({
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
    backgroundColor: '#000000',
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
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
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#333333',
    paddingLeft: 16,
    width: '95%',
    borderRadius: 5,
    left: 10,
    top: 15,
    marginBottom: 15,
  },
  searchInput: {
    flex: 1,
    backgroundColor: '#333333',
    borderWidth: 1,
    borderColor: 'transparent',
    borderRadius: 40,
    padding: 10,
    paddingHorizontal: 16,
    color: 'white',
  },
  sectionHeader: {
    padding: 10,
  },
  sectionHeaderText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default ConnectionList;
