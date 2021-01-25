import React, { useState } from 'react';
import Helmet from 'react-helmet';
import { Header, Titulo, ContenedorHeader } from './../elementos/Header';
import Boton from './../elementos/Boton';
import { Formulario, Input, ContenedorBoton } from './../elementos/ElementosDeFormulario';
import styled from 'styled-components';
import { ReactComponent as SvgLogin } from './../imagenes/login.svg';
import { useHistory } from 'react-router-dom';
import { auth } from './../firebase/firebaseConfig';
import Alerta from './../elementos/Alerta';

const Svg = styled(SvgLogin)`
    width: 100%;
    max-height: 6.25rem;
    margin-bottom: 1.25rem
`;

const InicioSesion = () => {
    const history = useHistory();
    const [correo, establecerCorreo] = useState('');
    const [password, establecerPassword] = useState('');
    const [estadoAlerta, cambiarEstadoAlerta] = useState(false);
    const [alerta, cambiarAlerta] = useState({});

    const handleChange = (e) => {
        if (e.target.name === 'email') {
            establecerCorreo(e.target.value);
        } else if (e.target.name === 'password') {
            establecerPassword(e.target.value);
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        cambiarEstadoAlerta(false);
        cambiarAlerta({});

        const expresionRegular = /[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+/;
        if (!expresionRegular.test(correo)) {
            cambiarEstadoAlerta(true);
            cambiarAlerta({
                tipo: 'error',
                mensaje: 'Debes ingresar un correo electrónico válido'
            })
            return;
        };

        if (correo === '' || password === '') {
            cambiarEstadoAlerta(true);
            cambiarAlerta({
                tipo: 'error',
                mensaje: 'Debes rellenar todos los campos'
            })
            return;
        };



        try {
            await auth.signInWithEmailAndPassword(correo, password);
            history.push('/');
        } catch (error) {
            cambiarEstadoAlerta(true);
            let mensaje;
            switch (error.code) {
                case 'auth/wrong-password':
                    mensaje = 'La contraseña es incorrecta'
                    break;
                case 'auth/user-not-found':
                    mensaje = 'No hemos encontrado ninguna cuenta con este correo'
                    break;
                default:
                    mensaje = 'Hubo un error al intentar iniciar sesión'
                    break;
            }

            cambiarAlerta({ tipo: 'error', mensaje: mensaje });
        }
    }

    return (
        <>
            <Helmet>
                <title>Iniciar sesión hola - Penny pinching</title>
            </Helmet>

            <Header>
                <ContenedorHeader>
                    <Titulo>Iniciar sesión</Titulo>
                    <div>
                        <Boton to="/crear-cuenta">Registrarse</Boton>
                    </div>
                </ContenedorHeader>
            </Header>

            <Formulario onSubmit={handleSubmit}>
                <Svg />
                <Input
                    type="email"
                    name="email"
                    placeholder="Correo electrónico"
                    value={correo}
                    onChange={handleChange}
                />
                <Input
                    type="password"
                    name="password"
                    placeholder="Contraseña"
                    value={password}
                    onChange={handleChange}
                />
                <ContenedorBoton>
                    <Boton as="button" primario type="submit">Iniciar sesión</Boton>
                </ContenedorBoton>

            </Formulario>

            <Alerta
                tipo={alerta.tipo}
                mensaje={alerta.mensaje}
                estadoAlerta={estadoAlerta}
                cambiarEstadoAlerta={cambiarEstadoAlerta}
            />

        </>
    );
}

export default InicioSesion;