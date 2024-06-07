import React from 'react';
import { StyleSheet, View, Text } from 'react-native'

interface CabecalhoProps {
  titulo: string;
  subtitulo?: string;
}

export const Cabecalho = ({titulo, subtitulo}: CabecalhoProps) => {
  return (
    <View style={estilos.conteiner}>
      <Text style={estilos.texto}>{titulo}</Text>
      { subtitulo ? <Text style={estilos.texto}>{subtitulo}</Text> : null}
    </View>
  );
}

const estilos = StyleSheet.create({
  conteiner: {
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingVertical: 12,
    width: '100%'
  },
  texto: {
    color: '#000',
    fontSize: 24,
    fontWeight: '300',
    textAlign: 'center',
  }
});

