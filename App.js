
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import 'react-native-gesture-handler'
import Kot from './Kotb';
import List from './list';
import Arabica from './listac';
import Editcoffeebill from './editcoffeebill';
import Rcstorage from './rcstorage';

const RootStack = createStackNavigator();
import Tabs from './Kot';

function HomeTabs() {
  return (
   
      <Tabs />

  );
}
export default function App({navigation}) {
  return (
    <NavigationContainer>
     <RootStack.Navigator
          initialRouteName="Splash"
          screenOptions={{
           
            headerTintColor: '#000',
            headerTitleStyle: {
              fontSize: 16,
     
            }
          }}
        >
          <RootStack.Screen
            name="Splash"
            component={Kot}
            options={{
              cardStyle: { backgroundColor: '#fff' },
              headerShown: false,
            }}
          />
          <RootStack.Screen
            name="List"
            component={List}
            options={{
              cardStyle: { backgroundColor: '#fff' },
              headerShown: false,
            }}
          />
       <RootStack.Screen
            name="Arabica"
            component={Arabica}
            options={{
              cardStyle: { backgroundColor: '#fff' },
              headerShown: false,
            }}
          />
          <RootStack.Screen
            name="Editcoffeebill"
            component={Editcoffeebill}
            options={{
              cardStyle: { backgroundColor: '#fff' },
              headerShown: false,
            }}
          />
            <RootStack.Screen
            name="Rcstorage"
            component={Rcstorage}
            options={{
              cardStyle: { backgroundColor: '#fff' },
              headerShown: false,
            }}
          />
    </RootStack.Navigator>
    </NavigationContainer>
  );
}