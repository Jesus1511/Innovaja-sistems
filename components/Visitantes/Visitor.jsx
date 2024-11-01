import { StyleSheet, Text, View, useColorScheme, TouchableOpacity, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import useColors from '../../utils/Colors';
import { useNavigation } from '@react-navigation/native';
import AntDesign from '@expo/vector-icons/AntDesign';
import Entypo from '@expo/vector-icons/Entypo';
import qr from '../../assets/images/Commons_QR_code.png';

const Visitor = ({ route }) => {
    const navigation = useNavigation();
    const { visitante } = route.params;

    const isDark = useColorScheme() == "dark";
    const Colors = useColors(isDark);
    const styles = DynamicStyles(Colors);

    // Estado para el contador de tiempo en segundos (24 horas = 86400 segundos)
    const [timeLeft, setTimeLeft] = useState(86400);

    // useEffect para decrementar el contador cada segundo
    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft((prevTime) => Math.max(prevTime - 1, 0));
        }, 1000);

        // Limpiar el intervalo cuando el componente se desmonte o el tiempo se agote
        return () => clearInterval(timer);
    }, []);

    // Función para convertir segundos a formato HH:MM:SS
    const formatTime = (seconds) => {
        const hours = Math.floor(seconds / 3600).toString().padStart(2, '0');
        const minutes = Math.floor((seconds % 3600) / 60).toString().padStart(2, '0');
        const secs = (seconds % 60).toString().padStart(2, '0');
        return `${hours}:${minutes}:${secs}`;
    };

    return (
        <View style={{ backgroundColor: Colors.background, flex: 1, padding: 20, }}>
            <View style={{ marginBottom: 15, justifyContent:"space-between", flexDirection:"row" }}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <AntDesign name="arrowleft" size={28} color={Colors.text} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Entypo name="trash" size={24} color={Colors.text} />
                </TouchableOpacity>
            </View>

            <View style={{ alignItems: "center" }}>
                <Text style={{ color: Colors.text, fontSize: 30, fontWeight: "600", marginBottom: 20 }}>
                    {visitante.nombre}
                </Text>
                <Image source={qr} style={{ width: 250, height: 250 }} />

                <View style={{marginTop:20}}>
                    <Text style={{fontSize:18, color:Colors.text, fontWeight:500}}>Expira en:</Text>
                    <Text style={{fontSize:40, color:Colors.text, fontWeight:500}}>
                        {formatTime(timeLeft)} H
                    </Text>
                </View>          
            </View>

            <View style={{alignItems:"center"}}>
                <TouchableOpacity onPres={() => {

                }} style={{backgroundColor:Colors.mainBlue, width:"90%", justifyContent:"center", height:50, marginTop:30, borderRadius:15}}>
                    <Text style={{color:Colors.text, textAlign:"center", fontWeight:600, fontSize:20}}>Compartir Codigo QR</Text>
                </TouchableOpacity>
            </View>

        </View>
    );
};

export default Visitor;

const DynamicStyles = (Colors) => StyleSheet.create({});
