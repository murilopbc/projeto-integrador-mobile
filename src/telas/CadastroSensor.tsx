import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Cabecalho } from '../componentes/Cabecalho'
import { FormularioCadastroSensor } from '../componentes/FormularioCadastroSensor'


export const CadastroSensor = () => { 

    
    
    return(
        <View style={estilos.conteiner}>

            <Cabecalho 
                titulo="Cadastro de Sensor"
            />
            <FormularioCadastroSensor>
                
            </FormularioCadastroSensor>

            

           
        </View>
    )
}

const estilos = StyleSheet.create({
    conteiner: {
      flex: 1,
    
    },
  });