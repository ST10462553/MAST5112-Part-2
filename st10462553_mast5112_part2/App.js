import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet,Image } from 'react-native';
import { Picker } from '@react-native-picker/picker'; // Import Picker from the new package

export default function App() {
  const [dishName, setDishName] = useState('');
  const [description, setDescription] = useState('');
  const [course, setCourse] = useState('starters');
  const [price, setPrice] = useState('');
  const [menuItems, setMenuItems] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  const validateInput = () => {
    const nameRegex = /^[a-zA-Z\s]+$/;
    const descriptionRegex = /^[a-zA-Z\s]+$/;
    const priceRegex = /^[0-9]+$/;

    if (!nameRegex.test(dishName)) {
      setErrorMessage('Dish name can only contain letters.');
      return false;
    }
    if (!descriptionRegex.test(description)) {
      setErrorMessage('Description can only contain letters.');
      return false;
    }
    if (!priceRegex.test(price)) {
      setErrorMessage('Price can only contain digits.');
      return false;
    }
    setErrorMessage('');
    return true;
  };

  const addMenuItem = () => {
    if (validateInput()) {
      const newItem = { dishName, description, course, price };
      setMenuItems([...menuItems, newItem]);
      setDishName('');
      setDescription('');
      setCourse('starters');
      setPrice('');
    }
  };



  return (
    
    <View style={styles.container}>
     <Image source={require('./assets/chefslogo.jpeg' )} style={styles.image} /> 
      <Text style={styles.header}>Chef's Menu</Text> 

      <TextInput
        style={styles.input}
        placeholder="Dish Name"
        value={dishName}
        onChangeText={setDishName}
      />
      <TextInput
        style={styles.input}
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
      />
      <Picker
        selectedValue={course}
        style={styles.picker}
        onValueChange={(itemValue) => setCourse(itemValue)}
      > 
        <Picker.Item label="Starters" value="starters" />
        <Picker.Item label="Mains" value="mains" />
        <Picker.Item label="Deserts" value="deserts" />
      </Picker>
      <TextInput
        style={styles.input}
        placeholder="Price"
        value={price}
        onChangeText={setPrice}
        keyboardType="numeric"
      />

      {errorMessage ? <Text style={styles.error}>{errorMessage}</Text> : null}

      <Button title="Add Menu Item" onPress={addMenuItem} />

      <Text style={styles.itemCount}>
        Menu Items: {menuItems.length}
      </Text>

      <FlatList
        data={menuItems}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.menuItem}>
            <Text style={styles.menuText}>Dish: {item.dishName}</Text>
            <Text style={styles.menuText}>Description: {item.description}</Text>
            <Text style={styles.menuText}>Course: {item.course}</Text>
            <Text style={styles.menuText}>Price: ${item.price}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'burlywood',
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#000',
    padding: 10,
    marginVertical: 10,
    backgroundColor: '#fff',
  },
  picker: {
    height: 50,
    width: '100%',
    marginBottom: 20,
  },
  error: {
    color: 'red',
    marginBottom: 10,
  },
  itemCount: {
    marginTop: 20,
    fontSize: 18,
  },
  menuItem: {
    backgroundColor: '#fff',
    padding: 15,
    marginVertical: 10,
    borderRadius: 5,
  },
  menuText: {
    fontSize: 16,
  },
  image: {
     width: '100%', // Adjust size as needed
    height: 150,
    resizeMode: 'cover',
    marginBottom: 20,
  },
});
