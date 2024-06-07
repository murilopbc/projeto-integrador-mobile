import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Switch } from 'react-native'
import axios from 'axios';
import { Picker } from '@react-native-picker/picker'
import Modal from 'react-native-modal';
import { useNavigation } from '@react-navigation/native';



export const FormularioCadastroSensor: React.FC = () => {
    const [tipo, setTipo] = useState('')
    const [mac_address, setMacAddress] = useState('')
    const [latitude, setLatitude] = useState('')
    const [longitude, setLongitude] = useState('')
    const [localizacao, setLocalizacao] = useState('')
    const [responsavel, setResponsavel] = useState('')
    const [unidade_medida, setUnidadeMedida] = useState('')
    const [status_operacional, setStatusOperacional] = useState(false)
    const [observacao, setObservacao] = useState('')
    const [mensagem, setMensagem] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const navigation = useNavigation();



    const cadastrarSensor = async () => {
        if (!latitude.trim() || !longitude.trim() || !localizacao.trim() || !responsavel.trim() ) {
            setMensagem('Por favor, preencha todos os campos');
            return;
        }


        try {

            const latitudeFloat = parseFloat(latitude);
            const longitudeFloat = parseFloat(longitude);
    
            // Fazer a requisição de cadastro de sensor
            const response = await axios.post(
                'http://10.0.2.2:8000/api/sensores/',

                {

                    tipo: tipo,
                    mac_address: 0,
                    latitude: latitudeFloat,
                    longitude: longitudeFloat,
                    localizacao: localizacao,
                    responsavel: responsavel,
                    unidade_medida: unidade_medida,
                    status_operacional: status_operacional,
                    observacao: observacao
                }


            );

            setModalVisible(true);

            navigation.navigate('inicial');

            setTipo('');
            setMacAddress('');
            setLatitude('');
            setLongitude('');
            setLocalizacao('');
            setResponsavel('');
            setUnidadeMedida('');
            setMensagem('');
            setStatusOperacional(false);
            setObservacao('');
            
        } catch (error) {

            console.error('Erro de cadastro do sensor:', error);
            setMensagem("Erro ao cadastrar sensor. Por favor, tente novamente!")
        }
    };

    return (
        <View style={estilos.container}>

            <View style={estilos.containerCampos}>
                <Picker
                    style={estilos.campo}
                    selectedValue={tipo}
                    onValueChange={(itemValue, itemIndex) => setTipo(itemValue)}
                >
                    <Picker.Item label="Temperatura" value="Temperatura" />
                    <Picker.Item label="Umidade" value="Umidade" />
                    <Picker.Item label="Contador" value="Contador" />
                    <Picker.Item label="Luminosidade" value="Luminosidade" />
                </Picker>
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
            <Switch
                    trackColor={{ false: '#767577', true: '#81b0ff' }}
                    thumbColor={status_operacional ? 'green' : '#fff'}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={() => setStatusOperacional(!status_operacional)}
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
             {mensagem !== '' && <Text style={estilos.mensagemErro}>{mensagem}</Text>}

            <TouchableOpacity
                style={estilos.botao}
                onPress={cadastrarSensor}
            >
                <Text style={estilos.textoBotao}>Cadastrar Sensor</Text>
            </TouchableOpacity>
            <Modal isVisible={modalVisible}>
                <View style={estilos.modalContainer}>
                    <Text style={estilos.modalText}>Sensor cadastrado com sucesso!</Text>
                    <TouchableOpacity onPress={() => setModalVisible(false)}>
                        <Text style={estilos.modalButton}>OK</Text>
                    </TouchableOpacity>
                </View>
            </Modal>
            </View>

        </View>
    )
}
const estilos = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#d3d3d3',
        justifyContent: 'center',
        alignItems: 'center',
    },
    containerCampos: {
        marginBottom: 20,
    },
    campo: {
        height: 50,
        width: 300,
        backgroundColor: '#fff',
        color: '#000',
        marginVertical: 5,
        borderRadius: 5,
        padding: 10,
        fontSize: 16,
    },
    botao: {
        height: 50,
        width: 300,
        backgroundColor: 'blue',
        marginTop: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
    },
    textoBotao: {
        color: '#fff',
        fontSize: 16,
    },
    modalContainer: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 20,
        alignItems: 'center',
    },
    modalText: {
        fontSize: 18,
        marginBottom: 20,
    },
    modalButton: {
        fontSize: 16,
        color: 'blue',
    },
    mensagemErro: {
        color: 'red',
        marginTop: 10,
    }
});
