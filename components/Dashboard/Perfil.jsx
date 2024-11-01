import { StyleSheet, Text, View, useColorScheme, TouchableOpacity, Image, TextInput, StatusBar } from 'react-native'
import React, { useContext } from 'react'
import useColors from '../../utils/Colors'
import AsyncStorage from '@react-native-async-storage/async-storage';

import AntDesign from '@expo/vector-icons/AntDesign';
import Entypo from '@expo/vector-icons/Entypo';
import { UserContext } from '../../context/Context';
import { useNavigation } from '@react-navigation/native';

const Perfil = () => {

    const {user, setUser, setIsAuthenticated} = useContext(UserContext)
    const navigation = useNavigation()

    const isDark = useColorScheme() == "dark"
    const Colors = useColors(isDark)

    async function logout () {
      await AsyncStorage.removeItem('token')
      setIsAuthenticated(false)
      setUser(null)
    }

    const styles = DynamicStyles(Colors)

  return (
    <View style={{backgroundColor:Colors.background, flex:1}}>
      <StatusBar backgroundColor={Colors.mainBlue}/>
      <View>
        <View style={styles.background}/>
        
        <View style={{flexDirection:"row", justifyContent:"space-between", padding:20}}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
              <AntDesign name="arrowleft" size={28} color={Colors.text} />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => logout()}>
            <Entypo name="log-out" size={28} color={Colors.text} />
          </TouchableOpacity>
        </View>

        <View style={{alignItems:"center", marginTop:55}}>
          <Text style={{fontWeight:"bold", fontSize:25, color:Colors.text}}>{user?.name}</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Perfil')} style={{padding:5}}>
            <Image style={{backgroundColor:"black", width:70, height:70, borderRadius:100}}/>
          </TouchableOpacity>
        </View>

        <View style={{paddingHorizontal:20}}>
          <View style={styles.form}>
              <Text style={styles.formText}>Nombre</Text>
              <TextInput
                editable={false}
                value={user.name}
                placeholderTextColor={Colors.placeholder}
                style={styles.formInput}
                placeholder='Ingrese su correo'/>
          </View>
          <View style={styles.form}>
              <Text style={styles.formText}>Correo</Text>
              <TextInput
                editable={false}
                value={user.email}
                style={styles.formInput}
                placeholder='Ingrese su correo'/>
          </View>
        </View>

      </View>
    </View>
  )
}

export default Perfil

const DynamicStyles = (Colors) => StyleSheet.create({

    background: {
        backgroundColor:Colors.mainBlue,
        height:200,
        width:"100%",
        position:"absolute",
        top:0,
        left:0,
        borderBottomEndRadius:80,
        borderBottomStartRadius:80
    },
    formContainer: {
      backgroundColor: Colors.lowBlue,
      borderTopRightRadius:40,
      borderTopLeftRadius:40,
      paddingHorizontal:20,
      paddingTop:60,
      paddingBottom:40,
      flex:1,
      justifyContent:"space-between"
    },
    form: {
        marginBottom:20
    },
    formText: {
        fontWeight:"bold",
        fontSize:18,
        color:Colors.text
    },
    formInput: {
        backgroundColor:Colors.over,
        paddingHorizontal:10,
        paddingVertical:9,
        borderRadius:12,
        color:Colors.text,
        marginTop:10,
        elevation:5,
    },

})