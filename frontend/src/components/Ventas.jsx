import { useEffect, useState } from 'react';
import api from '../services/api';

function Ventas() {
  const [ventas, setVentas] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    api.get('/ventas')
      .then(response => {
        setVentas(response.data);
        setCargando(false);
      })
      .catch(err => {
        setError('No se pudo cargar la lista de ventas');
        setCargando(false);
        console.error(err);
      });
  }, []);

  if (cargando) return <p>Cargando ventas...</p>;

  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2>Listado de Ventas</h2>

      <table border="1" cellPadding="8">
        <thead>
          <tr>
            <th>ID Venta</th>
            <th>ID Cliente</th>
            <th>Fecha</th>
            <th>Total</th>
            <th>Estado</th>
          </tr>
        </thead>

        <tbody>
          {ventas.map(venta => (
            <tr key={venta.id_venta}>
              <td>{venta.id_venta}</td>
              <td>{venta.id_cliente}</td>
              <td>{venta.fecha_venta}</td>
              <td>{venta.total}</td>
              <td>{venta.estado}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Ventas;