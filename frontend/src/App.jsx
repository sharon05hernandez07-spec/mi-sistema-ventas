import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Menu from './components/Menu';
import Clientes from './components/Clientes';
import Productos from './components/Productos';
import Ventas from './components/Ventas';
import DetalleVenta from './components/DetalleVenta';

function App() {
  return (
    <BrowserRouter>
      <Menu />

      <Routes>
        <Route path="/" element={<h1>Bienvenido al sistema de ventas</h1>} />
        <Route path="/clientes" element={<Clientes />} />
        <Route path="/productos" element={<Productos />} />
        <Route path="/ventas" element={<Ventas />} />
        <Route path="/detalle-venta" element={<DetalleVenta />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
