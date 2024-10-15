
import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from "./Login";
import Horario from "./Horario";
import Drawer from "./Drawer"
export default class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const Stack = createNativeStackNavigator();

    return (
        <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Login" component={Login}  options={{ headerShown: false }} />
          <Stack.Screen name="Horario" component={Horario}  options={{ headerShown: false }} />
          <Stack.Screen name="Drawer" component={Drawer}  options={{ headerShown: false }} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
