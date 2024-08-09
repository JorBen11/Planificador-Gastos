import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Gasto from './Gasto';
import {Gasto as GastoInterface} from '../../App';

type ListadoGastosProps = {
  gastos: any[];
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
  setGasto: React.Dispatch<React.SetStateAction<GastoInterface>>;
  filtro: string;
  gastosFiltrados: GastoInterface[];
};
const ListadoGastos: React.FC<ListadoGastosProps> = ({
  gastos,
  setModal,
  setGasto,
  filtro,
  gastosFiltrados,
}) => {
  const gastosMostrar = filtro ? gastosFiltrados : gastos;

  return (
    <View style={styles.contenedor}>
      <Text style={styles.titulo}>Gastos</Text>
      {gastosMostrar.length === 0 ? (
        <Text style={styles.noGastos}>No hay gastos aún</Text>
      ) : (
        gastosMostrar.map(gto => (
          <Gasto
            key={gto.id}
            gasto={gto}
            setModal={setModal}
            setGasto={setGasto}
          />
        ))
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  contenedor: {
    marginTop: 30,
    marginBottom: 100,
  },
  titulo: {
    color: '#64748b',
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 20,
  },
  noGastos: {
    marginVertical: 20,
    textAlign: 'center',
    fontSize: 20,
    color: '#64748b',
  },
});
export default ListadoGastos;
