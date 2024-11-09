import React, { useState, useContext } from 'react';
import { View, TextInput, Button, Image, Text, FlatList, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { MenuContext } from '../App';

export default function EditMenuScreen() {
  const { menuItems, setMenuItems } = useContext(MenuContext);
  const [dishName, setDishName] = useState('');
  const [description, setDescription] = useState('');
  const [course, setCourse] = useState('starters');
  const [price, setPrice] = useState('');

// validates the input of the name, description and price of dish into an array
  const addMenuItem = () => {
    if (dishName && description && price) {
      setMenuItems([...menuItems, { dishName, description, course, price }]);
      setDishName('');
      setDescription('');
      setPrice('');
    }
  };

  const removeMenuItem = (index) => {
    setMenuItems(menuItems.filter((_, i) => i !== index));
  };



// renderer
  return (
    <View style={styles.container}>
     <Image source={require('../assets/chefslogo.jpeg')} style={styles.image} 
     />
      <Text style={styles.header}>Edit Menu</Text>

      <TextInput style={styles.input} placeholder="Dish Name" value={dishName} onChangeText={setDishName} />
      <TextInput style={styles.input} placeholder="Description" value={description} onChangeText={setDescription} />
      <Picker selectedValue={course} onValueChange={(itemValue) => setCourse(itemValue)} style={styles.picker}>
        <Picker.Item label="Starters" value="starters" />
        <Picker.Item label="Mains" value="mains" />
        <Picker.Item label="Desserts" value="desserts" />
      </Picker>
      <TextInput style={styles.input} placeholder="Price" value={price} onChangeText={setPrice} keyboardType="numeric" />

      <Button title="Add Menu Item" onPress={addMenuItem} />

      <FlatList
        data={menuItems}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View style={styles.menuItem}>
            <Text>{item.dishName} - R{item.price}</Text>
            <Button title="Remove" onPress={() => removeMenuItem(index)} />
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
    alignItems: 'center',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    padding: 10,
    backgroundColor: '#fff',
    width: '100%',
    marginVertical: 10,
  },
  picker: {
    width: '100%',
    marginBottom: 20,
  },
  menuItem: {
    backgroundColor: '#fff',
    padding: 10,
    marginVertical: 10,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  image: {
     width: '100%', // Adjust size as needed
    height: 150,
    resizeMode: 'cover',
    marginBottom: 20,
  },
});
