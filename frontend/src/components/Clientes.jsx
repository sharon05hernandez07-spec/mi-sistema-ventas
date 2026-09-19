import { useEffect, useState } from 'react';
import api from '../services/api';

function Clientes() {

    const [clientes, setClientes] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);

    const [formulario, setFormulario] = useState({
        nomCliente: '',
        contacto: '',
        departamento: '',
        ciudad: ''
    });

    const [editando, setEditando] = useState(null);

    // Cargar clientes
    const cargarClientes = () => {
        api.get('/clientes')
            .then(response => {
                setClientes(response.data);
                setCargando(false);
            })
            .catch(err => {
                console.error(err);
                setError('No se pudo cargar la lista de clientes');
                setCargando(false);
            });
    };

    useEffect(() => {
        cargarClientes();
    }, []);

    // Cambiar valores del formulario
    const manejarCambio = (e) => {
        setFormulario({
            ...formulario,
            [e.target.name]: e.target.value
        });
    };

    // Crear o actualizar
    const manejarSubmit = (e) => {
        e.preventDefault();

        if (editando) {

            api.put(`/clientes/${editando}`, formulario)
                .then(() => {
                    alert('Cliente actualizado correctamente');
                    limpiarFormulario();
                    cargarClientes();
                })
                .catch(err => {
                    console.error(err);
                    alert('Error al actualizar el cliente');
                });

        } else {

            api.post('/clientes', formulario)
                .then(() => {
                    alert('Cliente creado correctamente');
                    limpiarFormulario();
                    cargarClientes();
                })
                .catch(err => {
                    console.error(err);
                    alert('Error al crear el cliente');
                });
        }
    };

    // Editar
    const editarCliente = (cliente) => {
        setEditando(cliente.id_cliente);

        setFormulario({
            nomCliente: cliente.nomCliente,
            contacto: cliente.contacto,
            departamento: cliente.departamento,
            ciudad: cliente.ciudad
        });
    };

    // Eliminar
    const eliminarCliente = (id) => {

        if (!window.confirm('¿Seguro que deseas eliminar este cliente?')) {
            return;
        }

        api.delete(`/clientes/${id}`)
            .then(() => {
                alert('Cliente eliminado correctamente');
                cargarClientes();
            })
            .catch(err => {
                console.error(err);
                alert('Error al eliminar el cliente');
            });
    };

    // Limpiar formulario
    const limpiarFormulario = () => {
        setFormulario({
            nomCliente: '',
            contacto: '',
            departamento: '',
            ciudad: ''
        });

        setEditando(null);
    };

    if (cargando) {
        return <p>Cargando clientes...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div className="container mt-4">

            <h2>Gestión de Clientes</h2>

            {/* FORMULARIO */}

            <form onSubmit={manejarSubmit} className="mb-4">

                <div className="mb-3">
                    <label>Nombre</label>
                    <input
                        type="text"
                        name="nomCliente"
                        value={formulario.nomCliente}
                        onChange={manejarCambio}
                        className="form-control"
                        required
                    />
                </div>

                <div className="mb-3">
                    <label>Contacto</label>
                    <input
                        type="text"
                        name="contacto"
                        value={formulario.contacto}
                        onChange={manejarCambio}
                        className="form-control"
                        required
                    />
                </div>

                <div className="mb-3">
                    <label>Departamento</label>
                    <input
                        type="text"
                        name="departamento"
                        value={formulario.departamento}
                        onChange={manejarCambio}
                        className="form-control"
                        required
                    />
                </div>

                <div className="mb-3">
                    <label>Ciudad</label>
                    <input
                        type="text"
                        name="ciudad"
                        value={formulario.ciudad}
                        onChange={manejarCambio}
                        className="form-control"
                        required
                    />
                </div>

                <button type="submit" className="btn btn-primary me-2">
                    {editando ? 'Actualizar cliente' : 'Agregar cliente'}
                </button>

                {editando && (
                    <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={limpiarFormulario}
                    >
                        Cancelar
                    </button>
                )}

            </form>

            {/* TABLA */}

            <table className="table table-bordered table-striped">

                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Contacto</th>
                        <th>Departamento</th>
                        <th>Ciudad</th>
                        <th>Acciones</th>
                    </tr>
                </thead>

                <tbody>

                    {clientes.map(cliente => (

                        <tr key={cliente.id_cliente}>

                            <td>{cliente.id_cliente}</td>
                            <td>{cliente.nomCliente}</td>
                            <td>{cliente.contacto}</td>
                            <td>{cliente.departamento}</td>
                            <td>{cliente.ciudad}</td>

                            <td>

                                <button
                                    className="btn btn-warning btn-sm me-2"
                                    onClick={() => editarCliente(cliente)}
                                >
                                    Editar
                                </button>

                                <button
                                    className="btn btn-danger btn-sm"
                                    onClick={() => eliminarCliente(cliente.id_cliente)}
                                >
                                    Eliminar
                                </button>

                            </td>

                        </tr>

                    ))}

                </tbody>

            </table>

        </div>
    );
}

export default Clientes;