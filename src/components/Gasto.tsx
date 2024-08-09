import React from 'react';
import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import {Gasto as GastoInterface} from '../../App';
import globalStyles from '../styles';
import {formatearCantidad, formatearFecha} from '../helpers';

type GastoProps = {
  gasto: GastoInterface;
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
  setGasto: React.Dispatch<React.SetStateAction<GastoInterface>>;
};

const diccionario: {[key: string]: any} = {
  ahorro: require('../img/icono_ahorro.png'),
  comida: require('../img/icono_comida.png'),
  casa: require('../img/icono_casa.png'),
  gastos: require('../img/icono_gastos.png'),
  ocio: require('../img/icono_ocio.png'),
  salud: require('../img/icono_salud.png'),
  suscripciones: require('../img/icono_suscripciones.png'),
};

const Gasto: React.FC<GastoProps> = ({gasto, setModal, setGasto}) => {
  const {nombre, cantidad, categoria, fecha} = gasto;

  const handleAcciones = () => {
    setModal(true);
    setGasto(gasto);
  };
  return (
    <Pressable onLongPress={() => handleAcciones()}>
      <View style={styles.contenedor}>
        <View style={styles.contenido}>
          <View style={styles.contenedorImagen}>
            <Image style={styles.imagen} source={diccionario[categoria]} />
            <View style={styles.contenedorTexto}>
              <Text style={styles.categoria}>{categoria}</Text>
              <Text style={styles.nombre}>{nombre}</Text>
              {fecha && (
                <Text style={styles.fecha}>{formatearFecha(fecha)}</Text>
              )}
            </View>
          </View>
          <Text style={styles.cantidad}>{formatearCantidad(cantidad)}</Text>
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  contenedor: {
    ...globalStyles.contenedor,
    marginBottom: 20,
  },
  contenido: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  contenedorImagen: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  imagen: {
    width: 80,
    height: 80,
    marginRight: 20,
  },
  contenedorTexto: {
    flex: 1,
  },
  categoria: {
    color: '#94a3b8',
    fontSize: 16,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    marginBottom: 5,
  },
  nombre: {
    fontSize: 22,
    color: '#64748b',
    fontWeight: 'bold',
    marginBottom: 5,
  },
  cantidad: {
    fontSize: 20,
    color: 'black',
  },
  fecha: {
    fontWeight: 'bold',
    color: '#db2777',
  },
});

export default Gasto;
