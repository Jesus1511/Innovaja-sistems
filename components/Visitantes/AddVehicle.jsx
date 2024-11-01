import { StyleSheet, Text, View, useColorScheme, TouchableOpacity, TextInput } from 'react-native'
import React, { useState } from 'react'
import useColors from '../../utils/Colors'
import AntDesign from '@expo/vector-icons/AntDesign'
import Toast from 'react-native-toast-message'
import { useNavigation } from '@react-navigation/native'

const AddVehicle = ({edificio}) => {

    const [nombre, setNombre] = useState("")
    const [cedula, setCedula] = useState("")
    const [days, setDays] = useState(0)
    const navigation = useNavigation()

    const isDark = useColorScheme() == "dark"
    const Colors = useColors(isDark)

    function createVisitante () {
        if (nombre !== "" && cedula !== "" && days > 0) {
            navigation.navigate('Visitors')
        } else {
            Toast.show({
                type: 'info', 
                text1: "Rellene los campos para añadir al visitante",
                position: 'bottom',
                visibilityTime: 1000, 
              });
        }
    }

    const styles = DynamicStyles(Colors)

  return (
    <View style={{backgroundColor:Colors.background, padding:20, flex:1}}>
        <View style={{ marginBottom: 15 }}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <AntDesign name="arrowleft" size={28} color={Colors.text} />
          </TouchableOpacity>
        </View>

        <Text style={{color:Colors.text, fontSize:30, fontWeight:"bold", marginBottom:35}}>Información del Vehículo</Text>

        <View style={styles.form}>
             <Text style={styles.formText}>Nombre</Text>
             <TextInput
               value={nombre}
               placeholderTextColor={Colors.placeholder}
               onChangeText={(text) => setNombre(text)}
               style={styles.formInput}
               placeholder='Ingrese el nombre'/>
         </View>

         <View style={styles.form}>
             <Text style={styles.formText}>Placa</Text>
             <TextInput
               value={cedula}
               placeholderTextColor={Colors.placeholder}
               onChangeText={(text) => setCedula(text)}
               style={styles.formInput}
               placeholder='Ingrese la placa del vehiculo'/>
         </View>

         <View style={styles.form}>
             <Text style={styles.formText}>Tiempo de Estadia</Text>
             <View style={{flexDirection:"row", alignItems:"center"}}>
                <TextInput
                  value={days}
                  keyboardType='numeric'
                  placeholderTextColor={Colors.placeholder}
                  onChangeText={(text) => setDays(text)}
                  style={[styles.formInput, {width:80}]}
                  placeholder='0'/>
                <Text style={{textAlign:"center", width:60, fontSize:20, color:Colors.text}}>Días</Text>
             </View>
         </View>
         

         
        <View style={{justifyContent:"center", flexDirection:"row", marginTop:70}}>
            <TouchableOpacity style={styles.touchable} onPress={() => createVisitante()}>
                <Text style={{fontSize:17, fontWeight:"bold", color:Colors.text}}>Añadir Vehículo</Text>
            </TouchableOpacity>
        </View>
    </View>
  )
}

export default AddVehicle

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
        height:45,
        elevation:5,
        width:"100%"
    }
})