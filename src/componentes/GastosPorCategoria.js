import React from 'react';
import { Header, Titulo } from './../elementos/Header';
import Helmet from 'react-helmet';
import BtnRegresar from './../elementos/BtnRegresar';
import BarraTotalGastado from './barraTotalGastado';
import useObtenerGastosDelMesPorCategoria from './../hooks/useObtenerGastosDelMesPorCategoria';
import { ListaDeCategorias, ElementoListaCategorias, Categoria, Valor } from './../elementos/ElementosDeLista';
import IconoCategoria from './../elementos/IconoCategoria';
import convertirAMoneda from './../funciones/convertirAMoneda';

const GastosPorCategoria = () => {
    const gastosPorCategoria = useObtenerGastosDelMesPorCategoria();

    return (
        <>
            <Helmet>
                <title>Categorías - Penny pinching</title>
            </Helmet>

            <Header>
                <BtnRegresar></BtnRegresar>
                <Titulo>Gastos por categoría</Titulo>
            </Header>

            <ListaDeCategorias>
                {gastosPorCategoria.map((elemento, index) => {
                    return (
                        <ElementoListaCategorias key={index}>
                            <Categoria> <IconoCategoria id={elemento.categoria} /> {elemento.categoria}</Categoria>
                            <Valor>{convertirAMoneda(elemento.cantidad)}</Valor>
                        </ElementoListaCategorias>
                    );
                })}
            </ListaDeCategorias>

            <BarraTotalGastado />
        </>
    );
}

export default GastosPorCategoria;