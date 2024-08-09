import React from 'react';
import {Pressable, StyleSheet, Text, TextInput, View} from 'react-native';
import globalStyles from '../styles';

type NuevoPresupuestoProps = {
  handleNuevoPresupuesto: (presupuesto: number) => void;
  presupuesto: number;
  setPresupuesto: React.Dispatch<React.SetStateAction<number>>;
};
const NuevoPresupuesto: React.FC<NuevoPresupuestoProps> = ({
  handleNuevoPresupuesto,
  presupuesto,
  setPresupuesto,
}) => {
  return (
    <View style={styles.contenedor}>
      <Text style={styles.label}>Definir Presupuesto</Text>
      <TextInput
        keyboardType="numeric"
        placeholder="Agrega tu presupuesto Ej: 300"
        style={styles.input}
        value={presupuesto?.toString()}
        onChangeText={value => setPresupuesto(Number(value))}
      />
      <Pressable
        style={styles.boton}
        onPress={() => handleNuevoPresupuesto(presupuesto)}>
        <Text style={styles.botonTexto}>Definir Presupuesto</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  contenedor: {
    ...globalStyles.contenedor,
  },
  label: {
    textAlign: 'center',
    fontSize: 24,
    color: '#3b82f6',
    marginBottom: 10,
  },
  input: {
    backgroundColor: '#f5f5f5',
    padding: 10,
    borderRadius: 10,
    textAlign: 'center',
    marginTop: 30,
    color: '#1048a4',
  },
  boton: {
    marginTop: 30,
    backgroundColor: '#1048a4',
    padding: 10,
    borderRadius: 10,
  },
  botonTexto: {
    color: '#fff',
    textAlign: 'center',
    textTransform: 'uppercase',
    fontWeight: 'bold',
  },
});
export default NuevoPresupuesto;
