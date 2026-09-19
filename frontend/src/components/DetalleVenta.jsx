import { useEffect, useState } from 'react';
import api from '../services/api';

function DetalleVenta() {
  const [detalles, setDetalles] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    api.get('/detalle_venta')
      .then(response => {
        setDetalles(response.data);
        setCargando(false);
      })
      .catch(err => {
        setError('No se pudo cargar el detalle de las ventas');
        setCargando(false);
        console.error(err);
      });
  }, []);

  if (cargando) return <p>Cargando detalles de ventas...</p>;

  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2>Detalle de Ventas</h2>

      <table border="1" cellPadding="8">
        <thead>
          <tr>
            <th>ID Detalle</th>
            <th>ID Venta</th>
            <th>ID Producto</th>
            <th>Cantidad</th>
            <th>Precio Unitario</th>
            <th>Subtotal</th>
          </tr>
        </thead>

        <tbody>
          {detalles.map(detalle => (
            <tr key={detalle.id_detalle}>
              <td>{detalle.id_detalle}</td>
              <td>{detalle.id_venta}</td>
              <td>{detalle.id_producto}</td>
              <td>{detalle.cantidad}</td>
              <td>{detalle.precio_unitario}</td>
              <td>{detalle.subtotal}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default DetalleVenta;