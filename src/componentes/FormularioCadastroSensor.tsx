import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native'
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';



export const FormularioCadastroSensor: React.FC = () => {
    const [tipo, setTipo] = useState('')
    const [mac_address, setMacAddress] = useState('')
    const [latitude, setLatitude] = useState('')
    const [longitude, setLongitude] = useState('')
    const [localizacao, setLocalizacao] = useState('')
    const [responsavel, setResponsavel] = useState('')
    const [unidade_medida, setUnidadeMedida] = useState('')
    const [status_operacional, setStatusOperacional] = useState('')
    const [observacao, setObservacao] = useState('')
    const navigation = useNavigation();



    const cadastrarSensor = async () => {
        try {
            // Fazer a requisição de cadastro de sensor
            const response = await axios.post(
                'http://10.0.2.2:8000/api/sensores/',

                {

                    tipo: tipo,
                    mac_address: mac_address,
                    latitude: latitude,
                    longitude: longitude,
                    localizacao: localizacao,
                    responsavel: responsavel,
                    unidade_medida: unidade_medida,
                    status_operacional: status_operacional,
                    observacao: observacao
                }


            );

            
            navigation.navigate('inicial');
        } catch (error) {
            
            console.error('Erro de cadastro do sensor:', error);
        }
    };

    return(
        <View style={estilos.container}>

            <View style={estilos.containerCampos}>
                <TextInput
                    style={estilos.campo}
                    placeholder='Tipo' 
                    placeholderTextColor='#01233c'
                    keyboardType='default'
                    onChangeText={setTipo}
                    value={tipo}
                />
                <TextInput 
                    style={estilos.campo}
                    placeholder='Mac Address'
                    placeholderTextColor='#01233c'
                    keyboardType='default'
                    onChangeText={setMacAddress}
                    value={mac_address}      
                />
                <TextInput 
                    style={estilos.campo}
                    placeholder='Latitude'
                    placeholderTextColor='#01233c'
                    keyboardType='default'                
                    onChangeText={setLatitude}
                    value={latitude}
                />           
                <TextInput 
                    style={estilos.campo}
                    placeholder='Longitude'
                    placeholderTextColor='#01233c'
                    keyboardType='default'                
                    onChangeText={setLongitude}
                    value={longitude}
                />                                 
            </View>
                <TextInput 
                    style={estilos.campo}
                    placeholder='Localização'
                    placeholderTextColor='#01233c'    
                    keyboardType='default'           
                    onChangeText={setLocalizacao}
                    value={localizacao}
                />
                <TextInput 
                    style={estilos.campo}
                    placeholder='Responsável'
                    placeholderTextColor='#01233c'
                    keyboardType='default'                
                    onChangeText={setResponsavel}
                    value={responsavel}
                /> 
                <TextInput 
                    style={estilos.campo}
                    placeholder='Unidade Medida'
                    placeholderTextColor='#01233c'
                    keyboardType='default'                
                    onChangeText={setUnidadeMedida}
                    value={unidade_medida}
                />  
                <TextInput 
                    style={estilos.campo}
                    placeholder=' Status Operacional'
                    placeholderTextColor='#01233c'
                    keyboardType='default'                
                    onChangeText={setStatusOperacional}
                    value={status_operacional}
                />  
                <TextInput 
                    style={estilos.campo}
                    placeholder='Observação'
                    placeholderTextColor='#01233c'
                    keyboardType='default'                
                    onChangeText={setObservacao}
                    value={observacao}
                />      
                
            <TouchableOpacity
                style={estilos.botao}
                onPress={cadastrarSensor}
            >
                <Text style={estilos.textoBotao}>Cadastrar Sensor</Text>
            </TouchableOpacity>

            
        </View>
    )
}
const estilos = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
        justifyContent: 'center',
        alignItems: 'center',
    },
    containerCampos: {
        marginBottom: 20,
    },
    campo: {
        height: 50,
        width: 300,
        backgroundColor: '#4f030a',
        color: '#fff',
        marginVertical: 5,
        borderRadius: 5,
        padding: 10,
        fontSize: 16,
    },
    botao: {
        height: 50,
        width: 300,
        backgroundColor: '#4f030a',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
    },
    textoBotao: {
        color: '#fff',
        fontSize: 16,
    },
});
 