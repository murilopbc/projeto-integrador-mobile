import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet, Text } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

export const FormularioUsuario: React.FC = () => {
    const [usuario, setUsuario] = useState('');
    const [senha, setSenha] = useState('');
    const [mensagem, setMensagem] = useState('');
    const navigation = useNavigation();

    const fazerCadastro = async () => {
        // Verifica se os campos de usuário e senha estão em branco
        if (!usuario.trim() || !senha.trim()) {
            setMensagem('Por favor, preencha todos os campos');
            return;
        }

        // Verifica se o tamanho do usuário é menor que 3 caracteres
        if (usuario.length < 3) {
            setMensagem('Usuário deve ter no mínimo 3 caracteres');
            return;
        }

        // Verifica se o tamanho da senha está fora do intervalo entre 4 e 8 caracteres
        if (senha.length < 3 || senha.length > 8) {
            setMensagem('Senha deve ter entre 3 e 8 caracteres');
            return;
        }

        try {
            // Fazer a requisição de cadastro
            const response = await axios.post(
                'http://10.0.2.2:8000/api/create_user',
                {
                    username: usuario,
                    password: senha
                }
            );

            // Redireciona para a tela inicial após o cadastro bem-sucedido
            navigation.navigate('inicial');
            // Limpa os campos de usuário e senha
            setUsuario('');
            setSenha('');
            // Limpa a mensagem de erro, se houver
            setMensagem('');
        } catch (error) {
            console.error('Erro de cadastro do usuário:', error.response);

            if (error.response.status === 400) {
                
                setMensagem('Usuário já cadastrado');
            } else {
                
                setMensagem('Erro ao cadastrar usuário');
            }
        }
    };

    return (
        <View style={estilos.container}>
            <View style={estilos.containerCampos}>
                <TextInput
                    style={estilos.campo}
                    placeholder="Usuário"
                    placeholderTextColor="#000"
                    keyboardType="default"
                    onChangeText={setUsuario}
                    value={usuario}
                />
                <TextInput
                    style={estilos.campo}
                    placeholder="Senha"
                    placeholderTextColor="#000"
                    secureTextEntry={true}
                    onChangeText={setSenha}
                    value={senha}
                />
                {/* Exibe a mensagem de erro */}
                {mensagem !== '' && <Text style={estilos.mensagemErro}>{mensagem}</Text>}
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
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        
    },
    textoBotao: {
        color: '#fff',
        fontSize: 16,
    },
    mensagemErro: {
        color: 'red',
        marginTop: 10,
    }
});
