import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';

const ProfileScreen = ({ navigation, route }) => {
  const [photos, setPhotos] = useState(route.params?.photos || []);

  const renderPhoto = ({ item }) => (
    <TouchableOpacity onPress={() => navigation.navigate('PostDetail', { post: item })}>
      <View style={styles.photoContainer}>
        <Image source={{ uri: item.image }} style={styles.photo} />
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Profile Header */}
      <View style={styles.profileHeader}>
        <Image source={require('./profile.png')} style={styles.profileImage} />
        <Text style={styles.profileName}>Someone's name</Text>
      </View>

      {/* Photo Section */}
      <View style={styles.photosContainer}>
        <Text style={styles.sectionTitle}>Posts</Text>
        <FlatList
          data={photos}
          renderItem={renderPhoto}
          keyExtractor={(item) => item.id}
          numColumns={3}
          contentContainerStyle={styles.photosList}
        />
      </View>

      {/* Buttons */}
      <TouchableOpacity
        style={styles.addPostButton}
        onPress={() => navigation.navigate('AddRecipe', { photos })}
      >
        <Text style={styles.addPostButtonText}>Create a post</Text>
      </TouchableOpacity>
    </View>
  );
};

const AddRecipeScreen = ({ navigation, route }) => {
  const [newImage, setNewImage] = useState(null);
  const [newDescription, setNewDescription] = useState('');
  const [photos, setPhotos] = useState(route.params?.photos || []);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setNewImage(result.assets[0].uri);
    }
  };

  const handleAddRecipe = () => {
    if (newImage && newDescription) {
      const updatedPhotos = [
        ...photos,
        { id: Date.now().toString(), image: newImage, description: newDescription },
      ];
      navigation.navigate('Profile', { photos: updatedPhotos });
    } else {
      alert('Please provide an image and a description.');
    }
  };

  return (
    <View style={styles.modalContainer}>
      <Text style={styles.modalTitle}>Create a post</Text>
      <TouchableOpacity style={styles.pickImageButton} onPress={pickImage}>
        <Text style={styles.pickImageText}>Pick an Image</Text>
      </TouchableOpacity>
      {newImage && <Image source={{ uri: newImage }} style={styles.previewImage} />}
      <TextInput
        placeholder="Enter recipe description"
        style={styles.input}
        value={newDescription}
        onChangeText={setNewDescription}
      />
      <View style={styles.modalButtons}>
        <TouchableOpacity style={styles.modalButton} onPress={handleAddRecipe}>
          <Text style={styles.modalButtonText}>Add Recipe</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.modalButton, styles.cancelButton]}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.modalButtonText}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const PostDetailScreen = ({ route }) => {
  const { post } = route.params;

  return (
    <View style={styles.detailContainer}>
      <Image source={{ uri: post.image }} style={styles.detailImage} />
      <Text style={styles.detailDescription}>{post.description}</Text>
    </View>
  );
};

const Stack = createStackNavigator();

const App = () => {
  return (
      <Stack.Navigator>
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="AddRecipe" component={AddRecipeScreen} />
        <Stack.Screen name="PostDetail" component={PostDetailScreen} />
      </Stack.Navigator>
  );
};

export default App;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF' },
  profileHeader: { alignItems: 'center', marginTop: 20 },
  profileImage: { width: 120, height: 120, borderRadius: 60, backgroundColor: '#E8E8E8' },
  profileName: { fontSize: 22, fontWeight: 'bold', color: '#333', marginTop: 10 },
  photosContainer: { paddingHorizontal: 20 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 10, color: '#333' },
  photosList: { justifyContent: 'space-between' },
  photoContainer: { alignItems: 'center', margin: 5 },
  photo: { width: 100, height: 100, borderRadius: 10 },
  addPostButton: { backgroundColor: '#F8BBD0', padding: 10, borderRadius: 25, alignSelf: 'flex-end',  position: 'absolute', bottom: 20, right: 20,   },
  addPostButtonText: { color: '#FFF', fontSize: 16, fontWeight: 'bold' },
  modalContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20, backgroundColor: '#FFF' },
  modalTitle: { fontSize: 22, fontWeight: 'bold', marginBottom: 20 },
  pickImageButton: { backgroundColor: '#F8BBD0', padding: 10, borderRadius: 10, marginBottom: 20 },
  pickImageText: { color: '#FFF', fontSize: 16, fontWeight: 'bold' },
  previewImage: { width: 150, height: 150, borderRadius: 10, marginBottom: 20 },
  input: { borderWidth: 1, borderColor: '#CCC', padding: 10, borderRadius: 10, width: '100%', marginBottom: 20 },
  modalButtons: { flexDirection: 'row', justifyContent: 'space-between', width: '100%' },
  modalButton: { backgroundColor: '#F8BBD0', padding: 15, borderRadius: 10, flex: 1, alignItems: 'center', marginHorizontal: 5 },
  cancelButton: { backgroundColor: '#CCC' },
  modalButtonText: { color: '#FFF', fontSize: 16, fontWeight: 'bold' },
  detailContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#FFF' },
  detailImage: { width: '90%', height: 300, borderRadius: 10, marginBottom: 20 },
  detailDescription: { fontSize: 18, color: '#333', textAlign: 'center', paddingHorizontal: 20 },
});
