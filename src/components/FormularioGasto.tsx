import React, {useState, useEffect} from 'react';
import {
  Text,
  SafeAreaView,
  View,
  Pressable,
  TextInput,
  StyleSheet,
} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import globalStyles from '../styles';
import {Gasto} from '../../App';

type FormularioGastoProps = {
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
  handleGasto: (gasto: Gasto) => void;
  setGasto: React.Dispatch<React.SetStateAction<Gasto>>;
  gasto: Gasto;
  eliminarGasto: (id: string) => void;
};

const FormularioGasto: React.FC<FormularioGastoProps> = ({
  setModal,
  handleGasto,
  setGasto,
  gasto,
  eliminarGasto,
}) => {
  const [nombre, setNombre] = useState('');
  const [cantidad, setCantidad] = useState('');
  const [categoria, setCategoria] = useState('');
  const [id, setId] = useState('');
  const [fecha, setFecha] = useState(0);

  useEffect(() => {
    if (gasto?.nombre) {
      setNombre(gasto.nombre);
      setCantidad(gasto.cantidad.toString());
      setCategoria(gasto.categoria);
      setId(gasto.id);
      setFecha(gasto.fecha);
    }
  }, [gasto]);

  return (
    <SafeAreaView style={styles.contenedor}>
      <View style={styles.contenedorBotones}>
        <Pressable
          style={[styles.btn, styles.btnCancelar]}
          onLongPress={() => {
            setModal(false);
            setGasto({} as Gasto);
          }}>
          <Text style={styles.btnTexto}>Cancelar</Text>
        </Pressable>
        {!!id && (
          <Pressable
            style={[styles.btn, styles.btnEliminar]}
            onLongPress={() => eliminarGasto(id)}>
            <Text style={styles.btnTexto}>Eliminar</Text>
          </Pressable>
        )}
      </View>
      <View style={styles.formulario}>
        <Text style={styles.titulo}>
          {' '}
          {gasto?.nombre ? 'Editar Gasto' : 'Nuevo Gasto'}
        </Text>
        <View style={styles.campo}>
          <Text style={styles.label}>Nombre Gasto</Text>
          <TextInput
            style={styles.input}
            placeholder="Nombre del gasto. Ej. Transporte"
            value={nombre}
            onChangeText={setNombre}
          />
        </View>
        <View style={styles.campo}>
          <Text style={styles.label}>Cantidad Gasto</Text>
          <TextInput
            style={styles.input}
            placeholder="Cantidad del gasto. Ej. 300"
            keyboardType="numeric"
            value={cantidad}
            onChangeText={setCantidad}
          />
        </View>
        <View style={styles.campo}>
          <Text style={styles.label}>Categoria Gasto</Text>
          <Picker
            style={styles.input}
            selectedValue={categoria}
            onValueChange={valor => {
              setCategoria(valor);
            }}>
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
        <Pressable
          style={styles.submitBtn}
          onPress={() =>
            handleGasto({
              nombre,
              cantidad: Number(cantidad),
              categoria,
              id,
              fecha,
            })
          }>
          <Text style={styles.submitBtnTexto}>
            {gasto?.nombre ? 'Guardar Cambios Gasto' : 'Agregar Gasto'}
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  contenedor: {
    backgroundColor: '#1e40af',
    flex: 1,
  },
  formulario: {
    ...globalStyles.contenedor,
  },
  titulo: {
    textAlign: 'center',
    fontSize: 28,
    marginBottom: 30,
    color: '#64748b',
  },
  campo: {
    marginVertical: 10,
  },
  label: {
    color: '#64748b',
    textTransform: 'uppercase',
    fontSize: 16,
    fontWeight: 'bold',
  },
  input: {
    backgroundColor: '#f5f5f5',
    padding: 10,
    borderRadius: 10,
    marginTop: 10,
    color: '#64748b',
  },
  submitBtn: {
    backgroundColor: '#3b82f6',
    padding: 10,
    marginTop: 20,
    borderRadius: 10,
  },
  submitBtnTexto: {
    textAlign: 'center',
    textTransform: 'uppercase',
    color: '#fff',
    fontWeight: 'bold',
  },
  btnCancelar: {
    backgroundColor: '#db2777',
  },
  btnTexto: {
    textAlign: 'center',
    textTransform: 'uppercase',
    color: '#fff',
    fontWeight: 'bold',
  },
  btn: {
    padding: 10,
    marginTop: 20,
    marginHorizontal: 10,
    borderRadius: 10,
    flex: 1,
  },
  btnEliminar: {
    backgroundColor: 'red',
  },
  contenedorBotones: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default FormularioGasto;
