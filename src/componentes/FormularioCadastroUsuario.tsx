import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet, Text } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from './AuthContext';

export const FormularioUsuario: React.FC = () => {
    const [usuario, setUsuario] = useState('');
    const [senha, setSenha] = useState('');
    const navigation = useNavigation();
    const { token } = useAuth(); // Usando o contexto de autenticação

    const fazerCadastro = async () => {
        try {
            // Fazer a requisição de cadastro
            const response = await axios.post(
                'http://10.0.2.2:8000/api/create_user',
                {
                    username: usuario,
                    password: senha
                }
            );

            
            navigation.navigate('inicial');
        } catch (error) {
            
            console.error('Erro de cadastro so usuário:', error);
        }
    };

    return (
        <View style={estilos.container}>
            <View style={estilos.containerCampos}>
                <TextInput
                    style={estilos.campo}
                    placeholder="Usuário"
                    placeholderTextColor="#fff"
                    keyboardType="default"
                    onChangeText={setUsuario}
                    value={usuario}
                />
                <TextInput
                    style={estilos.campo}
                    placeholder="Senha"
                    placeholderTextColor="#fff"
                    secureTextEntry={true}
                    onChangeText={setSenha}
                    value={senha}
                />
            </View>
            <TouchableOpacity
                style={estilos.botao}
                onPress={fazerCadastro}
            >
                <Text style={estilos.textoBotao}>Cadastrar</Text>
            </TouchableOpacity>
        </View>
    );
};

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