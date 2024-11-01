import { StyleSheet, View } from 'react-native';
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import NavigationBar from './NavigationBar';
import Notifications from './Notifications';
import Cameras from './Cameras';
import Visitors from './Visitors';
import AddVehicle from '../Visitantes/AddVehicle';
import AddVisitante from '../Visitantes/AddVisitante';
import Visitor from '../Visitantes/Visitor';
import Camara from '../Camaras/Camara'
import CameraSettings from '../Camaras/CameraSettings';

const InnerStack = createNativeStackNavigator();

const BuildScreen = ({ route }) => {
  const { edificio } = route.params;

  return (
    <View style={{ flex: 1 }}>
      <InnerStack.Navigator screenOptions={{ headerShown: false }}>

        <InnerStack.Screen
          name="Cameras"
          options={{ animation: 'fade_from_bottom' }}
        >
          {props => <Cameras {...props} edificio={edificio} />}
        </InnerStack.Screen>

        <InnerStack.Screen
          name="Visitors"
          options={{ animation: 'slide_from_left' }}
        >
          {props => <Visitors {...props} edificio={edificio} />}
        </InnerStack.Screen>

        <InnerStack.Screen
          name="Notifications"
          options={{ animation: 'slide_from_right' }}
        >
          {props => <Notifications {...props} edificio={edificio} />}
        </InnerStack.Screen>

        {/* Pantalla de Cameras en el centro, animación de desvanecimiento desde abajo */}

        <InnerStack.Screen
          name="AddVisitante"
        >
          {props => <AddVisitante {...props} edificio={edificio} />}
        </InnerStack.Screen>

        <InnerStack.Screen
          name="AddVehicle"
        >
          {props => <AddVehicle {...props} edificio={edificio} />}
        </InnerStack.Screen>

        <InnerStack.Screen
          name="Visitor"
        >
          {props => <Visitor {...props} edificio={edificio} />}
        </InnerStack.Screen>

        <InnerStack.Screen
          name="Camara"
        >
          {props => <Camara {...props} edificio={edificio} />}
        </InnerStack.Screen>

        <InnerStack.Screen
          name="CameraSettings"
        >
          {props => <CameraSettings {...props} edificio={edificio} />}
        </InnerStack.Screen>

      </InnerStack.Navigator>

      <NavigationBar edificio={edificio} />
    </View>
  );
};

export default BuildScreen;

const styles = StyleSheet.create({});
