import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Cabecalho } from '../componentes/Cabecalho';
import { FormularioUsuario } from '../componentes/FormularioCadastroUsuario';


export const Cadastro = () => {

    return (
        <View style={estilos.conteiner}>

            <Cabecalho
                titulo="Cadastro de Usuários"
            />
            <FormularioUsuario>

            </FormularioUsuario>


        </View>
    );
};

const estilos = StyleSheet.create({
    conteiner: {
        flex: 1,
        
        
    },
});