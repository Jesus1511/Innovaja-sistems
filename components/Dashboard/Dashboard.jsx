import { StyleSheet, Text, View, TouchableOpacity, Image, useColorScheme, ScrollView } from 'react-native'
import React, { useContext } from 'react'
import { UserContext } from '../../context/Context'
import useColors from '../../utils/Colors'
import { useNavigation } from '@react-navigation/native'
import image from '../../assets/images/image.jpg'

const edificios = [{
  ubicacion: "Residencia Colina etapa III",
  nombre: "Habitación tipo estudio, 768",
  imagen: "",
  id: "1",
  camaras: [
    {
      nombre: "Camara 1 (cocina)",
      active: true,
      id: "1" },
    {
      nombre: "Camara 2 (habitación)",
      active: false,
      id: "2" },
    {
      nombre: "Camara 3 (patio)",
      active: true,
      id: "3" },
  ],
 visitantes: {
    personas: [
      {nombre: "Pedro", cedula: "33468749", restTime: 5000}
    ],
    vehiculos: [],
    eventos: []
  },
  notificaciones: {
    comunes: [
     {contenido:"¿Olvidaste cerrar la puerta de el frente?", camaraId: "2", leido:false, time: Date.now()},
     {contenido:"¿Olvidaste cerrar la puerta de el frente?", camaraId: "3", leido:false, time: Date.now()},
  ],
    criticas: [
     {contenido:"Una persona desconocida a entrado a tu hogar", camaraId: "1", time: Date.now()}
  ]
}
}]

const Dashboard = () => {

  const { user } = useContext(UserContext)
  const navigation = useNavigation()

  const isDark = useColorScheme() == "dark"
  const Colors = useColors(isDark)

  const styles = DynamicStyles(Colors)

  return (
    <ScrollView style={{paddingHorizontal:15, backgroundColor:Colors.background, flex:1}}>

      <View style={{flexDirection:"row-reverse", paddingVertical:20, marginBottom:40}}>
        <TouchableOpacity onPress={() => navigation.navigate('Perfil')} style={{padding:5}}>
          <Image style={{backgroundColor:"white", width:40, height:40, borderRadius:100}}/>
        </TouchableOpacity>
      </View>

      <Text style={styles.h1}> Bienvenido {user?.name}!</Text>

      <View style={{marginTop:30}}>
        {edificios.map((edificio) => (
          <TouchableOpacity onPress={() => {
            navigation.navigate('BuildScreen', {edificio})
          }} style={styles.card} key={edificio.id}>
            <View style={{borderTopStartRadius:20, borderTopEndRadius:20, overflow:"hidden"}}>
              <Image source={image} style={{borderTopEndRadius:20, width:"100%", height:100, opacity:0.8}}/>
            </View>

            <View style={styles.cardTextContainer}>
              <Text style={{fontSize:19, fontWeight:600, color:Colors.text}}>{edificio.ubicacion}</Text>
              <Text style={{ color:Colors.text, fontWeight:300}}>{edificio.nombre}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  )
}

export default Dashboard

const DynamicStyles = (Colors) => StyleSheet.create({
  h1: {
    fontSize:30,
    fontWeight:"semiBold",
    color:Colors.text
  },

  card: {
    backgroundColor:Colors.mainBlue,
    borderRadius:25,
    elevation:7,
    paddingBottom:5
  },

  cardTextContainer: {
    paddingHorizontal:15,
    paddingVertical:10
  }

})