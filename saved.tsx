import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const SavedScreen = () => {
  // Initial items list
  const initialItems = [
    {
      id: '1',
      name: 'Quinoa fruit salad',
      image: 'https://via.placeholder.com/50', // Replace with actual image URL
    },
    {
      id: '2',
      name: 'Melon fruit salad',
      image: 'https://via.placeholder.com/50',
    },
    {
      id: '3',
      name: 'Tropical fruit salad',
      image: 'https://via.placeholder.com/50',
    },
  ];

  // State to manage the items
  const [items, setItems] = useState(initialItems);

  // Function to delete an item
  const deleteItem = (itemId) => {
    const filteredItems = items.filter(item => item.id !== itemId);
    setItems(filteredItems);
  };

  // Render each item
  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Image source={{ uri: item.image }} style={styles.itemImage} />
      <Text style={styles.itemName}>{item.name}</Text>
      {/* Trash button for each item */}
      <TouchableOpacity onPress={() => deleteItem(item.id)} style={styles.deleteButton}>
        <Icon name="trash" size={30} color="#FFF" />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.goBackButton}>
        <Text style={styles.goBackText}>Go back</Text>
      </TouchableOpacity>

      <View style={styles.header}>
        <Text style={styles.title}>Saved recipes</Text>
        <View style={styles.separator} />
      </View>

      <FlatList
        data={items}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  goBackButton: {
    marginTop: 50,
    marginHorizontal: 20,
    marginBottom: 10,
    backgroundColor: '#FFC0CB',
    width: 70,
    height: 30,
    borderRadius: 50,
  },
  goBackText: {
    fontSize: 16,
    textAlign: 'center',
  },
  header: {
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#5E4A47',
  },
  separator: {
    marginTop: 10,
    height: 1,
    backgroundColor: '#CCCCCC', // Separator line color
  },
  list: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFC0CB',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  itemImage: {
    width: 50,
    height: 50,
    borderRadius: 10,
    marginRight: 10,
  },
  itemName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
  },
  deleteButton: {
    marginLeft: 10,
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default SavedScreen;
