import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';

const JanelaFipe = ({ route }) => {
  const [valorFipe, setValorFipe] = useState(null);
  const { marcaId, modeloId, anoId } = route.params;

  useEffect(() => {
    const consultarValorFipe = async () => {
      try {
        const response = await fetch(`https://parallelum.com.br/fipe/api/v1/carros/marcas/${marcaId}/modelos/${modeloId}/anos/${anoId}`);
        const data = await response.json();
        setValorFipe(data.Valor);
      } catch (error) {
        console.error('Erro ao consultar a API:', error);
        Alert.alert('Erro', 'Não foi possível obter o valor daFipe.');
      }
    };

    consultarValorFipe();
  }, [anoId, marcaId, modeloId]); 

  return (
    <View style={styles.container}>
      <Text style={styles.title}>VALOR FIPE</Text>
      <Text style={styles.value}>{valorFipe ? `${valorFipe}` : 'Aguarde... Sua mãe esperou 9 meses! :)'}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#095169',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: 'white',
    backgroundColor: '#059b9a',
    maxWidth: 1000,
  },
  value: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
});

export default JanelaFipe;
