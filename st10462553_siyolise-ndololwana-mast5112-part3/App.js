import React, { useState, createContext, useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Picker } from '@react-native-picker/picker';
import HomeScreen from './screens/HomeScreen';
import EditMenuScreen from './screens/EditMenuScreen';
import FilterScreen from './screens/FilterScreen';

const Stack = createStackNavigator();
export const MenuContext = createContext();

 
export default function App() {
  const [menuItems, setMenuItems] = useState([]);

  return (
    <MenuContext.Provider value={{ menuItems, setMenuItems }}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Edit Menu" component={EditMenuScreen} />
          <Stack.Screen name="Filter" component={FilterScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </MenuContext.Provider>
  );
}
