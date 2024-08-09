import React, {useEffect, useState} from 'react';
import {
  Alert,
  Image,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import Header from './src/components/Header';
import NuevoPresupuesto from './src/components/NuevoPresupuesto';
import ControlPresupuesto from './src/components/ControlPresupuesto';
import FormularioGasto from './src/components/FormularioGasto';
import {generarId} from './src/helpers';
import ListadoGastos from './src/components/ListadoGastos';
import Filtro from './src/components/Filtro';
import AsyncStorage from '@react-native-async-storage/async-storage';

function App(): React.JSX.Element {
  const [presupuesto, setPresupuesto] = useState(0);
  const [isValidPresupuesto, setIsValidPresupuesto] = useState(false);
  const [gastos, setGastos] = useState<Gasto[]>([]);
  const [modal, setModal] = useState(false);
  const [gasto, setGasto] = useState({} as Gasto);
  const [filtro, setFiltro] = useState('');
  const [gastosFiltrados, setGastosFiltrados] = useState<Gasto[]>([]);

  useEffect(() => {
    const obtenerPresupuestoStorage = async () => {
      try {
        const presupuestoStorage =
          Number(await AsyncStorage.getItem('planificador_presupuesto')) || 0;
        if (presupuestoStorage > 0) {
          setPresupuesto(presupuestoStorage);
          setIsValidPresupuesto(true);
        }
      } catch (error) {
        console.log(error);
      }
    };
    obtenerPresupuestoStorage();
  }, []);

  useEffect(() => {
    if (isValidPresupuesto) {
      const guardarPresupuestoStorage = async () => {
        try {
          await AsyncStorage.setItem(
            'planificador_presupuesto',
            presupuesto.toString(),
          );
        } catch (error) {
          console.log(error);
        }
      };
      guardarPresupuestoStorage();
    }
  }, [isValidPresupuesto]);

  useEffect(() => {
    const obtenerGastosStorage = async () => {
      try {
        const gastosStorage = await AsyncStorage.getItem('planificador_gastos');
        setGastos(gastosStorage ? JSON.parse(gastosStorage) : []);
      } catch (error) {
        console.log(error);
      }
    };
    obtenerGastosStorage();
  }, []);

  useEffect(() => {
    const guardarGastosStorage = async () => {
      try {
        await AsyncStorage.setItem(
          'planificador_gastos',
          JSON.stringify(gastos),
        );
      } catch (error) {
        console.log(error);
      }
    };
    guardarGastosStorage();
  }, [gastos]);

  const handleNuevoPresupuesto = (pre: number) => {
    if (pre > 0) {
      setIsValidPresupuesto(true);
    } else {
      Alert.alert('Error', 'El presupuesto debe ser mayor a 0', [{text: 'Ok'}]);
    }
  };

  const handleGasto = (gto: Gasto) => {
    if ([gto.nombre, gto.categoria, gto.cantidad].includes('')) {
      Alert.alert('Error', 'Todos los campos son obligatorios');
      return;
    }

    if (gto.id) {
      const gastosActualizados = gastos.map(gastoState =>
        gastoState.id === gto.id ? gto : gastoState,
      );

      setGastos(gastosActualizados);
    } else {
      // Agregar el gasto al state
      gto.id = generarId();
      gto.fecha = Date.now();
      setGastos([...gastos, gto]);
    }

    setModal(!modal);
  };

  const eliminarGasto = (id: string) => {
    Alert.alert(
      '¿Deseas eliminar este gasto?',
      'Un gasto eliminado no se puede recuperar',
      [
        {
          text: 'No',
          style: 'cancel',
        },
        {
          text: 'Si, Eliminar',
          onPress: () => {
            const gastosActualizados = gastos.filter(gto => gto.id !== id);
            setGastos(gastosActualizados);
            setModal(!modal);
            setGasto({} as Gasto);
          },
        },
      ],
    );
  };

  const resetearApp = () => {
    Alert.alert(
      '¿Estas seguro de resetear la app?',
      'Esto elimina tu presupuesto y todos tus gastos',
      [
        {
          text: 'No',
          style: 'cancel',
        },
        {
          text: 'Si, eliminar',
          onPress: async () => {
            try {
              await AsyncStorage.clear();
              setGastos([]);
              setIsValidPresupuesto(false);
              setPresupuesto(0);
            } catch (error) {
              console.error(error);
            }
          },
        },
      ],
    );
  };

  return (
    <View style={styles.contenedor}>
      <ScrollView>
        <View style={styles.header}>
          <Header />
          {isValidPresupuesto ? (
            <ControlPresupuesto
              presupuesto={presupuesto}
              gastos={gastos}
              resetearApp={resetearApp}
            />
          ) : (
            <NuevoPresupuesto
              handleNuevoPresupuesto={handleNuevoPresupuesto}
              presupuesto={presupuesto}
              setPresupuesto={setPresupuesto}
            />
          )}
        </View>
        {isValidPresupuesto && (
          <>
            <Filtro
              filtro={filtro}
              setFiltro={setFiltro}
              gastos={gastos}
              setGastosFiltrados={setGastosFiltrados}
            />

            <ListadoGastos
              setModal={setModal}
              gastos={gastos}
              setGasto={setGasto}
              filtro={filtro}
              gastosFiltrados={gastosFiltrados}
            />
          </>
        )}
      </ScrollView>
      {modal && (
        <Modal
          visible={modal}
          animationType="slide"
          onRequestClose={() => setModal(!modal)}>
          <FormularioGasto
            setModal={setModal}
            handleGasto={handleGasto}
            setGasto={setGasto}
            gasto={gasto}
            eliminarGasto={eliminarGasto}
          />
        </Modal>
      )}
      {isValidPresupuesto && (
        <Pressable
          style={styles.pressable}
          onPress={() => setModal(!modal)}
          hitSlop={{bottom: 20, right: 30}}>
          <Image
            style={styles.imagen}
            source={require('./src/img/nuevo-gasto.png')}
          />
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    backgroundColor: '#f5f5f5',
    flex: 1,
  },
  header: {
    backgroundColor: '#3b82f6',
    minHeight: 500,
  },
  imagen: {
    height: 60,
    width: 60,
  },
  pressable: {
    height: 60, // o cualquier tamaño adecuado
    width: 60,
    position: 'absolute',
    bottom: 20,
    right: 30,
  },
});

export interface Gasto {
  id: string;
  nombre: string;
  cantidad: number;
  categoria: string;
  fecha: number;
}

export default App;
