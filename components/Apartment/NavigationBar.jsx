import { StyleSheet, Text, View, useColorScheme, TouchableOpacity, Image, Animated } from 'react-native';
import React, { useState, useRef } from 'react';
import { useNavigation } from '@react-navigation/native';
import useColors from '../../utils/Colors';

import Entypo from '@expo/vector-icons/Entypo';
import Ionicons from '@expo/vector-icons/Ionicons';
import lol from '../../assets/images/lol.png';
import lol2 from '../../assets/images/lol2.png';

const NavigationBar = () => {
    const navigation = useNavigation();
    const isDark = useColorScheme() == "dark";
    const Colors = useColors(isDark);
    const [selectedIndex, setSelectedIndex] = useState(1); // Estado para el índice seleccionado
    const ballPosition = useRef(new Animated.Value(90)).current; // Valor animado para la bolita

    const handlePress = (index, screen) => {
        setSelectedIndex(index);
        navigation.navigate(screen);
        Animated.spring(ballPosition, {
            toValue: index * 90, // Ajusta según el tamaño del icono o el espacio entre ellos
            useNativeDriver: false,
        }).start();
    };

    const styles = DynamicStyles(Colors);

    return (

            <View style={styles.bar}>
                <TouchableOpacity onPress={() => handlePress(0, 'Visitors')}>
                    <Image style={{ width: selectedIndex == 0 ? 50 : 43, height: selectedIndex == 0 ? 46 : 38, marginBottom: selectedIndex == 0 ? 18 : "" }} source={isDark ? lol2 : lol} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handlePress(1, 'Cameras')}>
                    <Entypo name="home" size={selectedIndex == 1 ? 48 : 38} color={Colors.text} style={{ marginBottom: selectedIndex == 1 ? 18 : "" }} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handlePress(2, 'Notifications')}>
                    <Ionicons name="notifications" size={selectedIndex == 2 ? 48 : 38} color={Colors.text} style={{ marginBottom: selectedIndex == 2 ? 18 : "" }} />
                </TouchableOpacity>
                {/* Bolita animada */}
                <Animated.View
                    style={[styles.ball, { transform: [{ translateX: ballPosition }] }]}
                />
            </View>

    );
};

export default NavigationBar;

const DynamicStyles = (Colors) => StyleSheet.create({
    bar: {
        backgroundColor: Colors.mainBlue,
        width: "90%",
        height: 65, // Reduce la altura
        borderRadius: 20,
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: "center",
        position: 'absolute', // Asegura que la bolita se posicione correctamente
        bottom:20,
        left:"5%"
    },
    ball: {
        position: 'absolute',
        bottom: 10, // Ajusta según sea necesario
        width: 80, // Reduce el ancho
        zIndex: -1,
        height: 70, // Reduce la altura
        left: 35,
        borderRadius: 100,
        backgroundColor: Colors.mainBlue,
    },
});
