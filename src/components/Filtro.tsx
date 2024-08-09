/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import globalStyles from '../styles';
import {Picker} from '@react-native-picker/picker';
import {Gasto} from '../../App';

interface FiltroProps {
  filtro: string;
  setFiltro: React.Dispatch<React.SetStateAction<string>>;
  gastos: Gasto[];
  setGastosFiltrados: React.Dispatch<React.SetStateAction<Gasto[]>>;
}
const Filtro: React.FC<FiltroProps> = ({
  filtro,
  setFiltro,
  gastos,
  setGastosFiltrados,
}) => {
  useEffect(() => {
    setGastosFiltrados(
      !filtro ? [] : gastos.filter(gasto => gasto.categoria === filtro),
    );
  }, [filtro]);
  return (
    <View style={styles.contenedor}>
      <Text style={styles.label}>Filtro</Text>
      <Picker
        style={{color: 'black'}}
        selectedValue={filtro}
        onValueChange={valor => setFiltro(valor)}>
        <Picker.Item label="--Seleccione--" value="" />
        <Picker.Item label="Ahorro" value="ahorro" />
        <Picker.Item label="Comida" value="comida" />
        <Picker.Item label="Casa" value="casa" />
        <Picker.Item label="Gastos Varios" value="gastos" />
        <Picker.Item label="Ocio" value="ocio" />
        <Picker.Item label="Salud" value="salud" />
        <Picker.Item label="Suscripciones" value="suscripciones" />
      </Picker>
    </View>
  );
};

const styles = StyleSheet.create({
  contenedor: {
    ...globalStyles.contenedor,
    transform: [{translateY: 0}],
    marginTop: 80,
  },
  label: {
    fontSize: 22,
    color: '#64748b',
    fontWeight: 'bold',
  },
});

export default Filtro;
