import { StyleSheet, Text, View, ScrollView, TouchableOpacity, useColorScheme } from 'react-native'
import React, { useState } from 'react'
import AntDesign from '@expo/vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';
import Feather from '@expo/vector-icons/Feather';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import useColors from '../../utils/Colors';

const Notifications = ({edificio}) => {

  const [criticas, setCriticas] = useState(edificio.notificaciones.criticas)
  const [comunes, setComunes] = useState(edificio.notificaciones.comunes)
  const navigation = useNavigation()

  const isDark = useColorScheme() == "dark"
  const Colors = useColors(isDark)

  return (
    <ScrollView style={{ backgroundColor: Colors.background, flex: 1, padding: 15 }}>
      <View style={{ marginBottom: 15 }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <AntDesign name="arrowleft" size={28} color={Colors.text} />
        </TouchableOpacity>
      </View>


      <View style={{ paddingTop: 10, paddingHorizontal: 10 }}>
        <Text style={{ fontSize: 30, textAlign:"center", color:Colors.text, fontWeight: "bold", marginBottom: 15 }}>Notificaciones</Text>

        {criticas.length > 0 && (
          <View style={styles.menuOption}>
              <Text style={{fontSize:20, fontWeight:"900", color:Colors.text}}>  Alertas Críticas</Text>
          </View>
        )}

      {criticas.map((camera, index) => (
        <TouchableOpacity key={index} onPress={() => {
          navigation.navigate('Camara', {camera: edificio.camaras[0]})
          
        }} style={{ marginTop: 10, backgroundColor:isDark?"#ff313140":"#ff00001d", padding:5 }}>
          <View style={{flexDirection: "row", alignItems: "center",}}>
            <Feather name="alert-octagon" size={24} color="red" />
            <Text style={{ fontSize: 20, marginLeft: 20, fontWeight: '600', color:Colors.text }}>
              {camera.contenido}
            </Text>
          </View>

          <View style={{paddingRight:15, paddingLeft:45, marginTop:3, flexDirection:"row", justifyContent:"space-between"}}>
            <Text style={{fontSize:17, color:Colors.placeholder}}>
              hace <Text style={{fontWeight:700}}>{Math.floor((Date.now() - camera.time) / 60000)} min</Text>
            </Text>
            <Text style={{fontSize:17, color:Colors.placeholder}}>
              Camara {camera.camaraId}
            </Text>
          </View>
        </TouchableOpacity>
      ))}

      <View style={{height:20}}/>


      {comunes.length > 0 && comunes.some((notificacion) => !notificacion.leido) && (
        <TouchableOpacity
          onPress={() => {
            const nuevasComunes = comunes.map((notificacion) => ({
              ...notificacion,
              leido: true,
            }));
            setComunes(nuevasComunes);
          }}
        >
          <Text style={{ color: isDark?"#4cb1ff":"blue", fontSize: 16, textAlign: "right" , }}>
            Marcar todo como leído
          </Text>
        </TouchableOpacity>
      )}

        <View style={{height:20}}/>

        {comunes.map((camera, index) => (
          <TouchableOpacity key={index} onPress={() => {
            navigation.navigate('Camara', {camera: edificio.camaras[0]})
          }} style={{ marginBottom: 15, }}>
            <View style={{paddingRight:10}}>
            
              <View style={{flexDirection: "row", alignItems: "center",}}>
                <Text style={{ fontSize: 20, marginBottom:5, width:260, color:Colors.text }}>
                  {camera.contenido}
                </Text>
                <TouchableOpacity onPress={() => {
                  const newComunes = [...comunes]
                  newComunes[index] = {...camera, leido:!camera.leido}
                  setComunes(newComunes)
                }}>
                  {camera.leido? (
                    <FontAwesome name="envelope-open-o" size={24} color={Colors.text} />
                  ):(
                    <FontAwesome name="envelope-o" size={24} color={Colors.text} />
                  )}
                </TouchableOpacity>
              </View>

              <View style={{paddingBottom:10, flexDirection:"row", justifyContent:"space-between"}}>
                <Text style={{fontSize:17, color:Colors.placeholder}}>
                  hace <Text style={{fontWeight:700}}>{Math.floor((Date.now() - camera.time) / 60000)} min</Text>
                </Text>
                <Text style={{fontSize:17, color:Colors.placeholder}}>
                  Camara {camera.camaraId}
                </Text>
              </View>
            </View>

            <View style={{width:"100%", height:1, backgroundColor:Colors.bar}}/>
            
          </TouchableOpacity>

      ))}

      </View>
    </ScrollView>
  )
}

export default Notifications

const styles = StyleSheet.create({})