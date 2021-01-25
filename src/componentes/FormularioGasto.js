import React, { useState, useEffect } from 'react';
import { ContenedorFiltros, Formulario, Input, InputGrande, ContenedorBoton } from './../elementos/ElementosDeFormulario';
import Boton from './../elementos/Boton';
import SelectCategorias from './SelectCategorias';
import DatePicker from './DatePicker';
import fromUnixTime from 'date-fns/fromUnixTime';
import getUnixTime from 'date-fns/getUnixTime';
import agregarGasto from './../firebase/agregarGasto';
import { useAuth } from './../contextos/AuthContext';
import Alerta from './../elementos/Alerta';
import { useHistory } from 'react-router-dom';
import editarGasto from './../firebase/editarGasto';

const FormularioGasto = ({ gasto }) => {
    const [inputDescripcion, cambiarInputDescripcion] = useState('');
    const [inputCantidad, cambiarInputCantidad] = useState('');
    const [categoria, cambiarCategoria] = useState('hogar');
    const [fecha, cambiarFecha] = useState(new Date());
    const [estadoAlerta, cambiarEstadoAlerta] = useState(false);
    const [alerta, cambiarAlerta] = useState({});

    const { usuario } = useAuth();
    const history = useHistory();

    useEffect(() => {
        if (gasto) {
            if (gasto.data().uidUsuario === usuario.uid) {
                cambiarCategoria(gasto.data().categoria);
                cambiarFecha(fromUnixTime(gasto.data().fecha));
                cambiarInputDescripcion(gasto.data().descripcion);
                cambiarInputCantidad(gasto.data().cantidad);
            } else {
                history.push('/lista');
            }
        }
    }, [gasto, usuario, history]);

    const handleChange = (e) => {
        if (e.target.name === 'descripcion') {
            cambiarInputDescripcion(e.target.value);
        } else if (e.target.name === 'cantidad') {
            cambiarInputCantidad(e.target.value.replace(/[^0-9.]/g, ''));
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        let cantidad = parseFloat(inputCantidad).toFixed(2);

        if (inputDescripcion !== '' && inputCantidad !== '') {

            if (cantidad) {
                if (gasto) {
                    editarGasto({
                        id: gasto.id,
                        categoria: categoria,
                        descripcion: inputDescripcion,
                        cantidad: cantidad,
                        fecha: getUnixTime(fecha)
                    }).then(() => {
                        history.push('/lista');
                    }).catch((error) => {
                        console.log(error);
                    })
                } else {
                    agregarGasto({
                        categoria: categoria,
                        descripcion: inputDescripcion,
                        cantidad: cantidad,
                        fecha: getUnixTime(fecha),
                        uidUsuario: usuario.uid
                    })
                        .then(() => {
                            cambiarCategoria('hogar');
                            cambiarInputDescripcion('');
                            cambiarInputCantidad('');
                            cambiarFecha(new Date());

                            cambiarEstadoAlerta(true);
                            cambiarAlerta({ tipo: 'exito', mensaje: 'Tu gasto ha sido agregado' })
                        })
                        .catch((error) => {
                            cambiarEstadoAlerta(true);
                            cambiarAlerta({ tipo: 'error', mensaje: 'Ocurrió un problema al agregar tu gasto' })
                        })
                }
            } else {
                cambiarEstadoAlerta(true);
                cambiarAlerta({ tipo: 'error', mensaje: 'Debes ingresar una cantidad válida' })
            }
        } else {
            cambiarEstadoAlerta(true);
            cambiarAlerta({ tipo: 'error', mensaje: 'Debes rellenar todos los campos' })
        }
    }

    return (
        <Formulario onSubmit={handleSubmit}>
            <ContenedorFiltros>
                <SelectCategorias
                    categoria={categoria}
                    cambiarCategoria={cambiarCategoria}
                />
                <DatePicker
                    fecha={fecha}
                    cambiarFecha={cambiarFecha}
                />
            </ContenedorFiltros>

            <div>
                <Input
                    type="text"
                    name="descripcion"
                    id="descripcion"
                    placeholder="Descripción del gasto"
                    value={inputDescripcion}
                    onChange={handleChange}
                />
                <InputGrande
                    type="text"
                    name="cantidad"
                    id="cantidad"
                    placeholder="€0.00"
                    value={inputCantidad}
                    onChange={handleChange}
                />
                <ContenedorBoton>
                    <Boton as="button" primario type="submit">
                        {gasto ? 'Editar gasto' : 'Agregar gasto +'}
                    </Boton>
                </ContenedorBoton>
            </div>
            <Alerta
                tipo={alerta.tipo}
                mensaje={alerta.mensaje}
                estadoAlerta={estadoAlerta}
                cambiarEstadoAlerta={cambiarEstadoAlerta}
            />
        </Formulario>
    );
}

export default FormularioGasto;