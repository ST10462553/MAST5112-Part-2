import React, { useState, useContext } from 'react';
import { View, FlatList, Text, StyleSheet, Image } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { MenuContext } from '../App';

export default function FilterScreen() {
  const { menuItems } = useContext(MenuContext);
  const [selectedCourse, setSelectedCourse] = useState('starters');

  const filteredItems = menuItems.filter((item) => item.course === selectedCourse);

  return (
    <View style={styles.container}>
     <Image
        source={require('../assets/chefslogo.jpeg')} 
        style={styles.image}
      />
      <Text style={styles.header}>Filter by Course</Text>
      <Picker selectedValue={selectedCourse} onValueChange={(itemValue) => setSelectedCourse(itemValue)} style={styles.picker}>
        <Picker.Item label="Starters" value="starters" />
        <Picker.Item label="Mains" value="mains" />
        <Picker.Item label="Desserts" value="desserts" />
      </Picker>

      <FlatList
        data={filteredItems}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.menuItem}>
            <Text>{item.dishName} - R{item.price}</Text>
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
  picker: {
    width: '100%',
    marginBottom: 20,
  },
  menuItem: {
    backgroundColor: '#fff',
    padding: 10,
    marginVertical: 10,
    width: '100%',
  },
  image: {
     width: '100%', // Adjust size as needed
    height: 150,
    resizeMode: 'cover',
    marginBottom: 20,
  },
});
