import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Picker, TouchableOpacity, Alert, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const JanelaPrincipal = () => {
  const navigation = useNavigation();
  const [marcas, setMarcas] = useState([]);
  const [modelos, setModelos] = useState([]);
  const [anos, setAnos] = useState([]);
  const [marcaSelecionada, setMarcaSelecionada] = useState(null);
  const [modeloSelecionado, setModeloSelecionado] = useState(null);
  const [anoSelecionado, setAnoSelecionado] = useState(null);
  const [consultarAtivo, setConsultarAtivo] = useState(false);

  useEffect(() => {
    consultarMarcas();
  }, []);

  const consultarMarcas = async () => {
    try {
      const response = await fetch('https://parallelum.com.br/fipe/api/v1/carros/marcas');
      const data = await response.json();
      setMarcas(data);
    } catch (error) {
      console.error('Erro ao consultar as marcas:', error);
      Alert.alert('Erro', 'Não foi possível carregar as marcas...');
    }
  };

  const consultarModelos = async (marcaId) => {
    try {
      const response = await fetch(`https://parallelum.com.br/fipe/api/v1/carros/marcas/${marcaId}/modelos`);
      const data = await response.json();
      setModelos(data.modelos);
    } catch (error) {
      console.error('Erro ao consultar os modelos:', error);
      Alert.alert('Erro', 'Não foi possível carregar os modelos...');
    }
  };

  const consultarAnos = async (marcaId, modeloId) => {
    try {
      const response = await fetch(`https://parallelum.com.br/fipe/api/v1/carros/marcas/${marcaId}/modelos/${modeloId}/anos`);
      const data = await response.json();
      setAnos(data);
    } catch (error) {
      console.error('Erro ao consultar os anos:', error);
      Alert.alert('Erro', 'Não foi possível carregar os anos...');
    }
  };

  const handleVerValorFipe = () => {
    if (!anoSelecionado) {
      Alert.alert('Aviso', 'Por favor, selecione o ano...');
      return;
    }
    navigation.navigate('JanelaFipe', { marcaId: marcaSelecionada, modeloId: modeloSelecionado, anoId: anoSelecionado });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>CONSULTAR FIPE</Text>

      {!consultarAtivo && (
        <Button
          title="Fazer Consulta"
          onPress={() => setConsultarAtivo(true)}
        />
      )}

      {consultarAtivo && (
        <>
          <Text style={styles.label}>Selecione a Marca:</Text>
          <Picker
            selectedValue={marcaSelecionada}
            onValueChange={(itemValue) => {
              setMarcaSelecionada(itemValue);
              consultarModelos(itemValue);
            }}>
            <Picker.Item label="-- Selecione --" value={null} />
            {marcas.map((marca) => (
              <Picker.Item key={marca.codigo} label={marca.nome} value={marca.codigo} />
            ))}
          </Picker>

          <Text style={styles.label}>Selecione o Modelo:</Text>
          <Picker
            selectedValue={modeloSelecionado}
            onValueChange={(itemValue) => {
              setModeloSelecionado(itemValue);
              consultarAnos(marcaSelecionada, itemValue);
            }}>
            <Picker.Item label="-- Selecione --" value={null} />
            {modelos && modelos.map((modelo) => (
              <Picker.Item key={modelo.codigo} label={modelo.nome} value={modelo.codigo} />
            ))}
          </Picker>

          <Text style={styles.label}>Selecione o Ano:</Text>
          <Picker
            selectedValue={anoSelecionado}
            onValueChange={(itemValue) => setAnoSelecionado(itemValue)}>
            <Picker.Item label="-- Selecione --" value={null} />
            {anos && anos.map((ano) => (
              <Picker.Item key={ano.codigo} label={ano.nome} value={ano.codigo} />
            ))}
          </Picker>

          <TouchableOpacity
            style={[styles.button, !anoSelecionado && { opacity: 0.5 }]}
            onPress={handleVerValorFipe}
            disabled={!anoSelecionado}>
            <Text style={styles.buttonText}>Ver valor FIPE</Text>
          </TouchableOpacity>
        </>
      )}
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
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color:'white',
  },
  button: {
    backgroundColor: '#9fd86b', 
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 50,
    color: '#53ba83',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default JanelaPrincipal;
