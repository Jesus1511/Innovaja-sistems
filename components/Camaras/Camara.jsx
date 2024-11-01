import { StyleSheet, Text, View, useColorScheme, TouchableOpacity } from 'react-native';
import React from 'react';
import useColors from '../../utils/Colors';
import AntDesign from '@expo/vector-icons/AntDesign';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';


const Visitor = ({ route }) => {
  const navigation = useNavigation();
  const { camera } = route.params;

  const isDark = useColorScheme() === "dark";
  const Colors = useColors(isDark);

  const styles = DynamicStyles(Colors);

  return (
    <View style={{ backgroundColor: Colors.background, flex: 1, padding: 20 }}>
      <View style={{ marginBottom: 15, flexDirection: "row", justifyContent: "space-between" }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <AntDesign name="arrowleft" size={28} color={Colors.text} />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('CameraSettings', {camera})}>
          <Ionicons name="settings-sharp" size={30} color={Colors.text}/>     
        </TouchableOpacity>
      </View>

      <Text style={{ color: Colors.text, textAlign: "center", fontSize: 25, fontWeight: "700" }}>
        {camera.nombre}
      </Text>

      {/* Video en loop en el centro */}
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <View style={{ width: 310, height: 350, backgroundColor: Colors.placeholder }} />
      </View>
    </View>
  );
};

export default Visitor;

const DynamicStyles = (Colors) => StyleSheet.create({

});
