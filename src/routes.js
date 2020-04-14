import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import ListBook from './pages/listBook';
import DetailBook from './pages/detailBook';

const Stack = createStackNavigator();

export default function Routes() {
    return (

        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="ListBook">
                <Stack.Screen name="ListBook" component={ListBook} />
                <Stack.Screen name="DetailBook" component={DetailBook} />
            </Stack.Navigator>
        </NavigationContainer>


    );
}