import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const CarroItem = ({ marca, modelo, ano, valorFipe }) => {
  const [showDetails, setShowDetails] = useState(false);

  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };

  return (
    <TouchableOpacity onPress={toggleDetails}>
      <View style={styles.container}>
        <Text style={styles.titulo}>{marca} - {modelo} - {ano}</Text>
        {showDetails && (
          <View style={styles.detailsContainer}>
            <Text style={styles.valorFipe}>Valor FIPE: {valorFipe}</Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#b5b9ff',
    padding: 20,
    marginBottom: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#485ccf',
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#000000', 
  },
  valorFipe: {
    fontSize: 16,
    color: '#007bff',
  },
  detailsContainer: {
    marginTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#485ccf', 
    paddingTop: 10,
  },
});

export default CarroItem;
