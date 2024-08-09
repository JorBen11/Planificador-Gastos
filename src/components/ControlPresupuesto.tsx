import React, {useState, useEffect} from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import globalStyles from '../styles';
import {formatearCantidad} from '../helpers';
import {Gasto} from '../../App';
import CircularProgress from 'react-native-circular-progress-indicator';

type ControlPresupuestoProps = {
  presupuesto: number;
  gastos: Gasto[];
  resetearApp: () => void;
};

const ControlPresupuesto: React.FC<ControlPresupuestoProps> = ({
  presupuesto,
  gastos,
  resetearApp,
}) => {
  const [disponible, setDisponible] = useState(0);
  const [gastado, setGastado] = useState(0);
  const [porcentaje, setPorcentaje] = useState(0);

  useEffect(() => {
    const totalGastado = gastos.reduce(
      (total, gasto) => gasto.cantidad + total,
      0,
    );

    const totalDisponible = presupuesto - totalGastado;

    const nuevoPorcentaje =
      ((presupuesto - totalDisponible) / presupuesto) * 100;

    setPorcentaje(nuevoPorcentaje);
    setGastado(totalGastado);
    setDisponible(totalDisponible);
  }, [gastos]);

  return (
    <View style={styles.contenedor}>
      <View style={styles.centrarGrafica}>
        <CircularProgress
          value={porcentaje}
          radius={150}
          valueSuffix={'%'}
          title="Gastado"
          inActiveStrokeColor="#F5F5F5"
          inActiveStrokeWidth={20}
          activeStrokeColor="#3b82f6"
          activeStrokeWidth={20}
          titleStyle={styles.circulo}
          titleColor="#64748b"
          duration={1000}
        />
      </View>
      <Pressable style={styles.boton} onLongPress={() => resetearApp()}>
        <Text style={styles.textoBoton}>Resetear App</Text>
      </Pressable>

      <View style={styles.contenedorTexto}>
        <Text style={styles.valor}>
          <Text style={styles.label}>Presupuesto: </Text>
          {formatearCantidad(presupuesto)}
        </Text>
        <Text style={styles.valor}>
          <Text style={styles.label}>Disponible: </Text>
          {formatearCantidad(disponible)}
        </Text>
        <Text style={styles.valor}>
          <Text style={styles.label}>Gastado: </Text>
          {formatearCantidad(gastado)}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  contenedor: {
    ...globalStyles.contenedor,
  },
  centrarGrafica: {
    alignItems: 'center',
  },
  boton: {
    backgroundColor: '#db2777',
    padding: 10,
    marginTop: 40,
    borderRadius: 5,
  },
  textoBoton: {
    textAlign: 'center',
    color: '#fff',
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  negro: {
    color: '#000',
  },
  contenedorTexto: {
    marginTop: 50,
  },
  valor: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 10,
    color: '#000',
  },
  label: {
    fontWeight: '700',
    color: '#3b82f6',
  },
  circulo: {
    fontWeight: 'bold',
    fontSize: 20,
  },
});

export default ControlPresupuesto;
