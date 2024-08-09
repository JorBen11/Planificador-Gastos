export const formatearCantidad = (num: number) => {
  return num.toLocaleString('en-US', {style: 'currency', currency: 'USD'});
};

export const formatearFecha = (fecha: number) => {
  const fechaNueva = new Date(fecha);
  const opciones: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: '2-digit',
  };
  return fechaNueva.toLocaleDateString('es-ES', opciones);
};

export const generarId = () => {
  const random = Math.random().toString(36).slice(2);
  const date = Date.now().toString(36);
  return random + date;
};
