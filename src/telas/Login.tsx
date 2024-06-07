import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

export const Login = () => {
    const [usuario, setUsuario] = useState('');
    const [senha, setSenha] = useState('');
    const [mensagem, setMensagem] = useState('');
    const navigation = useNavigation();

    const fazerLogin = async () => {
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
            const response = await axios.post(
                'http://10.0.2.2:8000/api/token',
                {
                    username: usuario,
                    password: senha
                },
            );
            const token = response.data.access;
            console.log('Login bem-sucedido:', token);
            // Redireciona para a tela inicial
            navigation.navigate('inicial');
            // Limpa os campos de usuário e senha
            setUsuario('');
            setSenha('');
            // Limpa a mensagem de erro, se houver
            setMensagem('');
        } catch (error) {
            console.error('Erro de login:', error);
            // Exibe mensagem de erro ao usuário
            setMensagem('Usuário ou senha incorretos');
        }
    };

    return (
        <View style={estilos.container}>
            <Text style={estilos.titulo}>Login</Text>
            <TextInput
                style={estilos.campo}
                placeholder='Usuário'
                placeholderTextColor='#000'
                onChangeText={setUsuario}
                value={usuario}
            />
            <TextInput
                style={estilos.campo}
                placeholder='Senha'
                placeholderTextColor='#000'
                secureTextEntry={true}
                onChangeText={setSenha}
                value={senha}
            />
            {/* Exibe a mensagem de erro */}
            {mensagem !== '' && <Text style={estilos.mensagemErro}>{mensagem}</Text>}
            <TouchableOpacity
                style={estilos.botao}
                onPress={fazerLogin}
            >
                <Text style={estilos.textoBotao}>Entrar</Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => navigation.navigate('cadastro')}>
                <Text style={estilos.textoCadastro}>Cadastre-se</Text>
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
        padding: 20,
    },
    titulo: {
        fontSize: 24,
        marginBottom: 15
    },
    campo: {
        height: 50,
        width: '100%',
        backgroundColor: '#fff',
        marginVertical: 5,
        borderRadius: 5,
        padding: 10,
        fontSize: 16,
    },
    botao: {
        height: 50,
        width: '100%',
        backgroundColor: 'blue',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        marginVertical: 20,
    },
    textoBotao: {
        color: '#fff',
        fontSize: 16,
    },
    textoCadastro: {
        width: '100%',
        color: 'blue'
    },
    mensagemErro: {
        color: 'red',
        marginTop: 10,
    }
});
