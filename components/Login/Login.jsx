import { StyleSheet, Text, View, TextInput, TouchableOpacity, useColorScheme } from 'react-native'
import React, { useState, useContext } from 'react'
import useColors from '../../utils/Colors';
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { UserContext } from '../../context/Context';

const Login = () => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const { setUser, setIsAuthenticated } = useContext(UserContext)

    async function login () {
        if (email == "jdzc1511@gmail.com" && password == "123456") {
            setUser({name:"juan", email:email})
            await AsyncStorage.setItem('token', "123")
            setIsAuthenticated(true)
            //navigation.navigate('Dashboard')

        } else if (email == "" || password == "") {
            Toast.show({
                type: 'info', 
                text1: "Rellene los campos para iniciar sesion",
                position: 'bottom',
                visibilityTime: 1000, 
              });
        } else {
            Toast.show({
                type: 'info', 
                text1: "El email o la contraseña son incorrectos",
                position: 'bottom',
                visibilityTime: 1000, 
              });
        }
    }

    const isDark = useColorScheme() == "dark"
    const Colors = useColors(isDark)

    const styles = DynamicStyles(Colors)

  return (
    <View style={{backgroundColor:Colors.background, flex:1}}>
      <View style={styles.heroContainer}>
          <Text style={{color: Colors.text,color: Colors.text, fontSize:30, fontWeight:"bold"}}>Log-in</Text>
          <Text style={{color: Colors.text, fontSize:17, marginTop:15}}>Ingresa tu correo y contraseña registrados</Text>
      </View>
      <View style={styles.formContainer}>
        <View>
            <View style={styles.form}>
                <Text style={styles.formText}>Correo</Text>
                <TextInput
                  value={email}
                  placeholderTextColor={Colors.placeholder}
                  onChangeText={(text) => setEmail(text)}
                  style={styles.formInput}
                  placeholder='Ingrese su correo'/>
            </View>
            <View style={styles.form}>
                <Text style={styles.formText}>Contraseña</Text>
                <TextInput
                  value={password}
                  placeholderTextColor={Colors.placeholder}
                  onChangeText={(text) => setPassword(text)}
                  style={styles.formInput}
                  placeholder='Ingrese su contraseña'/>
            </View>
            <View style={{flexDirection:"row-reverse", marginTop:10}}>
                <TouchableOpacity>
                    <Text style={{color: Colors.text, fontWeight:400}}>¿No tienes una cuenta?</Text>
                </TouchableOpacity>
            </View>
            <View style={{flexDirection:"row-reverse", marginTop:15}}>
                <TouchableOpacity>
                    <Text style={{color: Colors.text, fontWeight:400}}>¿Olvidate tu contraseña?</Text>
                </TouchableOpacity>
            </View>
        </View>

        <View style={{justifyContent:"center", flexDirection:"row", marginTop:60}}>
            <TouchableOpacity style={styles.touchable} onPress={() => login()}>
                <Text style={{fontSize:17, fontWeight:"bold", color:Colors.text}}>Iniciar Sesion</Text>
            </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

export default Login

const DynamicStyles = (Colors) => StyleSheet.create({

    heroContainer: {
        paddingHorizontal: 25,
        paddingTop:90,
        marginBottom:30
    },
    formContainer: {
        borderTopRightRadius:40,
        borderTopLeftRadius:40,
        paddingHorizontal:20,
        paddingTop:10,
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