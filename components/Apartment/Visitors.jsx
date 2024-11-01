import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Animated, Easing, useColorScheme } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import Entypo from '@expo/vector-icons/Entypo';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import useColors from '../../utils/Colors';


const Visitors = ({ edificio }) => {
  const [persons, setPersons] = useState(edificio.visitantes.personas);
  const [vehicles, setVehicles] = useState(edificio.visitantes.vehiculos);
  const [events, setEvents] = useState(edificio.visitantes.eventos);

  const [isOpen, setIsOpen] = useState(false);
  const [fadeAnim] = useState(new Animated.Value(0)); // Animación de fondo oscuro
  const [slideAnim] = useState(new Animated.Value(300)); // Animación de menú deslizante horizontal

  const navigation = useNavigation();

  const isDark = useColorScheme() == "dark"
  const Colors = useColors(isDark)

  // Función para abrir el menú
  const openMenu = () => {
    setIsOpen(true);
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 200,
      easing: Easing.out(Easing.ease),
      useNativeDriver: true,
    }).start();
  };

  // Función para cerrar el menú
  const closeMenu = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => setIsOpen(false));
    Animated.timing(slideAnim, {
      toValue: 300,
      duration: 200,
      easing: Easing.in(Easing.ease),
      useNativeDriver: true,
    }).start();
  };

  const styles = DynamicStyles(Colors)

  return (
    <>
      <ScrollView style={{ backgroundColor: Colors.background, flex: 1, padding: 20 }}>
        <View style={{ marginBottom: 15 }}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <AntDesign name="arrowleft" size={28} color={Colors.text} />
          </TouchableOpacity>
        </View>

        <View style={{ paddingTop: 25, paddingHorizontal: 15 }}>
          <Text style={{ fontSize: 27, fontWeight: "bold", marginBottom: 30, color:Colors.text }}>Manejar Visitantes o Vehículos temporales</Text>
          
          {persons.length > 0 && (
            <View style={styles.menuOption}>
                <View style={{alignItems:"center", width:30}}>
                  <FontAwesome name="user" size={24} color={Colors.text} />
                </View>
                <Text style={{fontSize:20, color:Colors.text}}>  Visitantes</Text>
            </View>
          )}
          

          {persons.map((camera, index) => (
            <TouchableOpacity key={index} onPress={() => {
              navigation.navigate('Visitor', {visitante: camera})
            }} style={styles.button}>
              <Text style={{ fontSize: 22, marginLeft: 20, fontWeight: '600', color:Colors.text }}>
                {camera.nombre}
              </Text>
            </TouchableOpacity>
          ))}

          {vehicles.length > 0 && (
          <View style={styles.menuOption}>
              <View style={{alignItems:"center", width:30}}>
                <FontAwesome name="car" size={24} color="black" />
              </View>
              <Text style={{fontSize:20}}>  Vehiculos</Text>
          </View>
          )}


          {vehicles.map((camera, index) => (
            <TouchableOpacity key={index} onPress={() => {
              navigation.navigate('Vehicle', {vehicle: camera})

            }} style={{ flexDirection: "row", alignItems: "center", height: 30, marginBottom: 30 }}>
              <View style={{ backgroundColor: camera.active ? "green" : "gray", width: 15, height: 15, borderRadius: 100 }} />
              <Text style={{ fontSize: 18, marginLeft: 20, fontWeight: '600' }}>
                {camera.nombre}
              </Text>
              <Text></Text>
            </TouchableOpacity>
          ))}

          {events.length > 0 && (
            <View style={styles.menuOption}>
                <View style={{alignItems:"center", width:30}}>
                  <MaterialIcons name="event" size={24} color="black" />
                </View>
                <Text style={{fontSize:20}}>  Eventos</Text>
            </View>
          )}


          {events.map((camera, index) => (
            <TouchableOpacity key={index} onPress={() => {}} style={{ flexDirection: "row", alignItems: "center", height: 30, marginBottom: 30 }}>
              <View style={{ backgroundColor: camera.active ? "green" : "gray", width: 15, height: 15, borderRadius: 100 }} />
              <Text style={{ fontSize: 18, marginLeft: 20, fontWeight: '600' }}>
                {camera.nombre}
              </Text>
              <Text></Text>
            </TouchableOpacity>
          ))}

        </View>
      </ScrollView>

      <TouchableOpacity onPress={openMenu} style={styles.add}>
        <Entypo name="plus" size={40} color={Colors.text} />
      </TouchableOpacity>

      {isOpen && (
        <>
          <Animated.View style={[styles.overlay, { opacity: fadeAnim }]}>
            <TouchableOpacity style={styles.overlayTouchable} onPress={closeMenu} />
          </Animated.View>
          <Animated.View style={[styles.dropdownMenu, { transform: [{ translateX: slideAnim }] }]}>
            <Text style={styles.menuText}>Añadir...</Text>
            <TouchableOpacity onPress={() => {
                closeMenu()
                navigation.navigate('AddVisitante')

                }} style={styles.menuOption}>
              <View style={{alignItems:"center", width:30}}>
                <FontAwesome name="user" size={24} color="black" />
              </View>
              <Text style={styles.optionText}>   Visitante</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {
                closeMenu()
                navigation.navigate('AddVehicle')
                
                }} style={styles.menuOption}>
              <View style={{alignItems:"center", width:30}}>
                <FontAwesome name="car" size={24} color="black" />
              </View>
              <Text style={styles.optionText}>   Vehículo</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {
                closeMenu()
                }} style={styles.menuOption}>
              <View style={{alignItems:"center", width:30}}>
                <MaterialIcons name="event" size={24} color="black" />
              </View>
              <Text style={styles.optionText}>   Evento</Text>
            </TouchableOpacity>
          </Animated.View>
        </>
      )}
    </>
  );
};

export default Visitors;

const DynamicStyles = (Colors) => StyleSheet.create({
  button: {
    backgroundColor: Colors.grayButton,
    flexDirection: "row",
    alignItems: "center",
    elevation: 7,
    borderRadius: 15,
    marginBottom: 10,
    paddingVertical: 15,
  },
  add: {
    backgroundColor: Colors.antiText,
    width: 60,
    height: 60,
    elevation: 5,
    position: "absolute",
    right: 25,
    bottom: 105,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 100,
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    height:"130%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  overlayTouchable: {
    width: "100%",
    height: "100%"
  },
  dropdownMenu: {
    position: "absolute",
    right: 20,
    bottom: 110,
    width: 200,
    backgroundColor: "#fff",
    borderRadius: 8,
    elevation: 10,
    padding: 15,
  },
  menuText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  menuOption: {
    paddingVertical: 10,
    flexDirection:"row"
  },
  optionText: {
    fontSize: 16,
  },
});
