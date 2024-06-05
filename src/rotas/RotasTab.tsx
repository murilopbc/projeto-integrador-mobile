import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import {Mapa} from '../telas/Mapa'
import {CadastroSensor} from '../telas/CadastroSensor'
import { Feather } from '@expo/vector-icons'
import React from 'react'

const { Navigator, Screen } = createBottomTabNavigator()

export function RotasTab(){
    return(
        <Navigator 
            screenOptions={{ 
                headerShown: false, 
                tabBarShowLabel: false,
                tabBarActiveTintColor: '#fff',
                tabBarInactiveTintColor: '#6c757d',
                tabBarStyle: {
                    backgroundColor: '#4f030a',
                    borderTopColor: 0,
                    paddingBottom: 10,
                    paddingTop: 10
                }
            }}
            >

            <Screen 
                name='inicial'
                component={Mapa}
                options={{
                    tabBarIcon: ({color, size}) => (
                        <Feather name="map-pin" size={size} color={color} /> 
                    )
                }}
            />

            <Screen 
                name='ambiente'
                component={CadastroSensor}
                options={{
                    tabBarIcon: ({color, size}) => (
                        <Feather name="wifi" size={size} color={color} /> 
                    )
                }}                
            />
            


        </Navigator>
    )
}