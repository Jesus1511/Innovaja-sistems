import { View, useColorScheme, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import useColors from '../utils/Colors';
import { useEffect, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { UserContext } from '../context/Context';

import Dashboard from './Dashboard/Dashboard';
import Perfil from './Dashboard/Perfil';
import Login from './Login/Login';
import BuildScreen from './Apartment/BuildScreen';

const Stack = createNativeStackNavigator();

const App = () => {

  const { setUser, setIsAuthenticated, isAuthenticated } = useContext(UserContext);

  useEffect(() => {
    async function a () {
      const token = await AsyncStorage.getItem('token');
      if (token === "123") {
        setUser({ name: "juan", email: "jdzc1511@gmail.com" });
        setIsAuthenticated(true);
      }
    }
    a();
  }, []);

  const isDark = useColorScheme() === "dark";
  const Colors = useColors(isDark);

  return (
    <View style={{ flex: 1 }}>
      <NavigationContainer independent={true}>
      <StatusBar backgroundColor={Colors.background}/>
        <Stack.Navigator>
          {isAuthenticated ? (
            <>
              <Stack.Screen
                name="Dashboard"
                component={Dashboard}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="Perfil"
                component={Perfil}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="BuildScreen"
                component={BuildScreen}
                options={{ headerShown: false }}
              />
            </>
          ) : (
            <Stack.Screen
              name="Login"
              component={Login}
              options={{ headerShown: false }}
            />
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
};

export default App;
