import { StyleSheet, Text, View, useColorScheme, TouchableOpacity, TextInput } from 'react-native'
import React, { useState } from 'react'
import useColors from '../../utils/Colors'
import AntDesign from '@expo/vector-icons/AntDesign'
import { useNavigation } from '@react-navigation/native'

const CameraSettings = ({route}) => {

    const {camera} = route.params
    const navigation = useNavigation()
    const [Name, setName] = useState(camera.nombre)

    const isDark = useColorScheme() == "dark"
    const Colors = useColors(isDark)

    const styles = DynamicStyles(Colors)

  return (
    <View style={{backgroundColor:Colors.background, flex:1, padding:20}}>
        <View style={{ marginBottom: 15 }}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <AntDesign name="arrowleft" size={28} color={Colors.text} />
          </TouchableOpacity>
        </View>

        <Text style={{color:Colors.text, fontSize:30, fontWeight:"bold", marginBottom:40}}>Configuración de la cámara</Text>

        
        <View style={styles.form}>
             <Text style={styles.formText}>Nombre</Text>
             <View>
                <TextInput
                  value={Name}
                  placeholderTextColor={Colors.placeholder}
                  onChangeText={(text) => setName(text)}
                  style={styles.formInput}
                  placeholder='Ingrese el nombre de la camara'/>
             </View>
         </View>

         <TouchableOpacity onPress={() => {
            navigation.navigate('Cameras')
         }} style={styles.touchable}>
            <Text style={{fontSize:20, color:Colors.text, fontWeight:500}}>Guardar Cámara</Text>
         </TouchableOpacity>
    </View>
  )
}

export default CameraSettings

const DynamicStyles = (Colors) => StyleSheet.create({
    form: {
        marginBottom:15
    },
    formText: {
        fontWeight:"bold",
        fontSize:18,
        color: Colors.text,
    },
    formInput: {
        backgroundColor:Colors.over,
        color:Colors.text,
        width:"90%",
        paddingHorizontal:10,
        paddingVertical:9,
        borderRadius:12,
        marginTop:10,
        elevation:5,
    },
    touchable: {
        backgroundColor:Colors.mainBlue,
        width:170,
        justifyContent:"center",
        flexDirection:"row",
        alignItems:"center",
        borderRadius:20,
        marginTop:230,
        height:45,
        elevation:5,
        width:"100%"
    }

})