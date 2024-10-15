import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Horario from './Horario';
import Datos from './Datos'
import 'react-native-reanimated'; 

export default class Drawer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const Drawer = createDrawerNavigator();

    return (
      <Drawer.Navigator>
        <Drawer.Screen
          name="Horario"
          component={Horario}
          initialParams={{
            codigo: this.props.route.params.codigo, // Accessing `params` from `route`
            nip: this.props.route.params.nip,
          }}
        />
        <Drawer.Screen name="Datos" component={Datos} />
      </Drawer.Navigator>
    );
  }
}