import {View, FlatList, StyleSheet} from 'react-native'
import {AmbienteEquipamento} from './AmbienteEquipamento'

interface AmbienteEquipamentoProps {
    codigo: string;
    descricao: string;
    statusOperacional: string; 
    instrucoesSeguranca: string;
    contatoResponsavel: string;
    latitude: string;
    longitude: string;
}

interface ListaAmbienteEquipamentoProps {
    colecao: AmbienteEquipamentoProps[];
    remover: (codigo: string) => void;
}


export const ListaAmbienteEquipamento = ({colecao, remover}: ListaAmbienteEquipamentoProps) => {

    return(
        <View style={estilos.conteiner}>
  
            <FlatList 
                data={colecao}
                keyExtractor={item => item.codigo}
                renderItem={ ( { item } ) => (
                    <AmbienteEquipamento 
                        descricao={item.descricao}
                        statusOperacional={item.statusOperacional}
                        instrucoesSeguranca={item.instrucoesSeguranca}
                        contatoResponsavel={item.contatoResponsavel}
                        latitude={item.latitude}
                        longitude={item.longitude}
                        excluir={ () => remover(item.codigo) }
                    />
                )}
                               
            />

        </View>
    )
}


const estilos = StyleSheet.create({
    conteiner: {
        flex: 1,
    },
    texto: {
        color: '#fff',
        textAlign: 'center'
    }
})