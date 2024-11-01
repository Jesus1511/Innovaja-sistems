import { StyleSheet, Text, View, useColorScheme } from 'react-native'
import React from 'react'
import useColors from '../../utils/Colors'
import { useNavigation } from '@react-navigation/native'

const Visitor = ({route}) => {

    const navigation = useNavigation()
    const {visitor} = route.params

    const isDark = useColorScheme() == "dark"
    const Colors = useColors(isDark)

    const styles = DynamicStyles(Colors)

  return (
    <View style={{backgroundColor:Colors.background, flex:1}}>
        <View style={{ marginBottom: 15 }}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <AntDesign name="arrowleft" size={28} color={Colors.text} />
          </TouchableOpacity>
        </View>
    </View>
  )
}

export default Visitor

const DynamicStyles = (Colors) => StyleSheet.create({


})