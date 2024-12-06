import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, FlatList, TextInput, Modal } from 'react-native';

const FridgeScreen = () => {
  // Initialize items with useState
  const [items, setItems] = useState([
    {
      id: '1',
      name: 'Quinoa fruit salad',
      quantity: 2,
      price: 20000,
      image: 'https://via.placeholder.com/50',
    },
    {
      id: '2',
      name: 'Melon fruit salad',
      quantity: 2,
      price: 20000,
      image: 'https://via.placeholder.com/50',
    },
    {
      id: '3',
      name: 'Tropical fruit salad',
      quantity: 2,
      price: 20000,
      image: 'https://via.placeholder.com/50',
    },
  ]);

  // Modal visibility state
  const [modalVisible, setModalVisible] = useState(false);

  // States to hold new item data from input fields
  const [newItemName, setNewItemName] = useState('');
  const [newItemQuantity, setNewItemQuantity] = useState('');
  const [newItemPrice, setNewItemPrice] = useState('');

  // Function to empty the fridge (delete all items)
  const emptyFridge = () => {
    setItems([]);
  };

  // Function to add a new item to the fridge
  const addItem = () => {
    if (newItemName && newItemQuantity && newItemPrice) {
      const newItem = {
        id: (items.length + 1).toString(), // Generate a new ID for the item
        name: newItemName,
        quantity: parseInt(newItemQuantity, 10),
        price: parseInt(newItemPrice, 10),
        image: 'https://via.placeholder.com/50',
      };
      setItems([...items, newItem]); // Add the new item to the list
      setModalVisible(false); // Close the modal after adding the item
      // Reset the input fields
      setNewItemName('');
      setNewItemQuantity('');
      setNewItemPrice('');
    }
  };

  // Render each item
  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Image source={{ uri: item.image }} style={styles.itemImage} />
      <View style={styles.itemDetails}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemQuantity}>{item.quantity} packs</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.goBackButton}>
        <Text style={styles.goBackText}>Go back</Text>
      </TouchableOpacity>

      <View style={styles.header}>
        <Text style={styles.title}>My Fridge</Text>
        <View style={styles.separator} />
      </View>

      <FlatList
        data={items}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
      />

      <View style={styles.footer}>
        {/* Empty My Fridge Button */}
        <TouchableOpacity style={styles.EmptyButton} onPress={emptyFridge}>
          <Text style={styles.EmptyText}>Empty My Fridge</Text>
        </TouchableOpacity>

        {/* Add Item Button */}
        <TouchableOpacity style={styles.AddButton} onPress={() => setModalVisible(true)}>
          <Text style={styles.AddText}>+</Text>
        </TouchableOpacity>
      </View>

      {/* Modal for adding a new item */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Add New Item</Text>
            <TextInput
              style={styles.input}
              placeholder="Item Name"
              value={newItemName}
              onChangeText={setNewItemName}
            />
            <TextInput
              style={styles.input}
              placeholder="Quantity"
              keyboardType="numeric"
              value={newItemQuantity}
              onChangeText={setNewItemQuantity}
            />
            <TextInput
              style={styles.input}
              placeholder="Price"
              keyboardType="numeric"
              value={newItemPrice}
              onChangeText={setNewItemPrice}
            />

            <TouchableOpacity style={styles.AddButton} onPress={addItem}>
              <Text style={styles.AddText}>Add</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.CloseButton} onPress={() => setModalVisible(false)}>
              <Text style={styles.AddText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    backgroundColor: '#CCCCCC',
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
  itemDetails: {
    flex: 1,
  },
  itemName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  itemQuantity: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#666',
    textAlign: 'right',
  },
  footer: {
    alignItems: 'center',
    padding: 20,
  },
  EmptyButton: {
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 25,
    backgroundColor: '#FFC0CB',
    marginBottom: 10,
  },
  EmptyText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFF',
  },
  AddButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#FFC0CB',
    justifyContent: 'center',
    alignItems: 'center',
  },
  AddText: {
    fontSize: 20,
    fontWeight: 'bold',
    backgroundColor: '#FFC0CB',
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    backgroundColor: '#FFF',
    padding: 20,
    borderRadius: 10,
    width: 300,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  input: {
    height: 40,
    borderColor: '#CCC',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  CloseButton: {
    marginTop: 10,
    backgroundColor: '#FFC0CB',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
  },
});

export default FridgeScreen;
