import React, { useContext } from 'react';
import { View, Text, Button, FlatList, StyleSheet, Image } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { MenuContext } from '../App';

export default function HomeScreen({ navigation }) {
  const { menuItems } = useContext(MenuContext);

  const calculateAveragePrice = (course) => {
    const filteredItems = menuItems.filter(item => item.course === course);
    if (filteredItems.length === 0) return 0;
    const total = filteredItems.reduce((sum, item) => sum + parseFloat(item.price), 0);
    return (total / filteredItems.length).toFixed(2);
  };

  return (
    <View style={styles.container}>
    <Image source={require('../assets/chefslogo.jpeg')} style={styles.image} 
     />
      <Text style={styles.header}>Complete Menu</Text>
      <Text>Average Price (Starters): R{calculateAveragePrice('starters')}</Text>
      <Text>Average Price (Mains): R{calculateAveragePrice('mains')}</Text>
      <Text>Average Price (Desserts): R{calculateAveragePrice('desserts')}</Text>

      <FlatList
        data={menuItems}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.menuItem}>
            <Text style={styles.menuText}>Dish: {item.dishName}</Text>
            <Text style={styles.menuText}>Description: {item.description}</Text>
            <Text style={styles.menuText}>Course: {item.course}</Text>
            <Text style={styles.menuText}>Price: R{item.price}</Text>
          </View>
        )}
      />

      <Button title="Edit Menu" onPress={() => navigation.navigate('Edit Menu')} />
      <Button title="Filter Menu" onPress={() => navigation.navigate('Filter')} />
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
  menuItem: {
    backgroundColor: '#fff',
    padding: 15,
    marginVertical: 10,
    borderRadius: 5,
    width: '100%',
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
