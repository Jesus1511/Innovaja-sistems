import { StyleSheet, Text, View, TouchableOpacity, TextInput, ScrollView, useColorScheme } from 'react-native';
import React, { useState } from 'react';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';
import useColors from '../../utils/Colors';

const Cameras = ({ edificio }) => {
  const navigation = useNavigation();
  const [searchText, setSearchText] = useState('');

  const isDark = useColorScheme() == "dark"
  const Colors = useColors(isDark)

  const styles = DynamicStyles(Colors)

  const filteredCameras = edificio.camaras.filter(camera =>
    camera.nombre.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <ScrollView style={{ backgroundColor: Colors.background, flex: 1, padding: 20 }}>
      <View style={{ marginBottom: 15 }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <AntDesign name="arrowleft" size={28} color={Colors.text} />
        </TouchableOpacity>
      </View>

      <View>
        <View style={styles.searchBarContainer}>
          <AntDesign name="search1" size={24} color={Colors.placeholder} />
          <TextInput
            style={{ marginLeft: 10, width: 270, color:Colors.text }}
            placeholder="Buscar cámara..."
            placeholderTextColor={Colors.placeholder}
            value={searchText}
            onChangeText={setSearchText} // Actualiza el estado con el texto de búsqueda
          />
        </View>
      </View>

      <View style={{ paddingTop: 25, paddingHorizontal: 20 }}>
        <Text style={{ fontSize: 27, fontWeight: "bold", marginBottom: 30, color:Colors.text }}>Tus Cámaras</Text>
        {filteredCameras.map((camera, index) => (
          <TouchableOpacity key={index} onPress={() => { 
            navigation.navigate('Camara', {camera})
           }} style={{ flexDirection: "row", alignItems: "center", height: 30, marginBottom: 30 }}>
            <View style={{ backgroundColor: camera.active ? "#00ff40c2" : "gray", width: 15, height: 15, borderRadius: 100 }} />
            <Text style={{ fontSize: 18, marginLeft: 20, fontWeight: '600', color:Colors.text }}>
              {camera.nombre}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}

export default Cameras;

const DynamicStyles = (Colors) => StyleSheet.create({
  searchBarContainer: {
    backgroundColor:Colors.over,
    paddingHorizontal: 10,
    paddingVertical: 6,
    flexDirection: "row",
    borderRadius: 20,
  },
});
