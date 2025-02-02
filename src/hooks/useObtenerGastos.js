import { useState, useEffect } from 'react';
import { db } from './../firebase/firebaseConfig';
import { useAuth } from './../contextos/AuthContext';

const useObtenerGastos = () => {
    const { usuario } = useAuth();
    const [gastos, cambiarGastos] = useState([]);
    const [ultimoGasto, cambiarUltimoGasto] = useState(null);
    const [hayMasContenido, cambiarHayMasContenido] = useState(false);

    const obtenerMasGastos = () => {
        db.collection('gastos')
            .where('uidUsuario', '==', usuario.uid)
            .orderBy('fecha', 'desc')
            .limit(10)
            .startAfter(ultimoGasto)
            .onSnapshot((snapshot) => {
                if (snapshot.docs.length > 0) {
                    cambiarUltimoGasto(snapshot.docs[snapshot.docs.length - 1]);

                    cambiarGastos(gastos.concat(snapshot.docs.map((gasto) => {
                        return { ...gasto.data(), id: gasto.id }
                    })))
                } else {
                    cambiarHayMasContenido(false);
                }
            })
    }

    useEffect(() => {
        const unsuscribe = db.collection('gastos')
            .where('uidUsuario', '==', usuario.uid)
            .orderBy('fecha', 'desc')
            .limit(10)
            .onSnapshot((snapshot) => {
                if (snapshot.docs.length > 0) {
                    cambiarUltimoGasto(snapshot.docs[snapshot.docs.length - 1]);
                    cambiarHayMasContenido(true);
                } else {
                    cambiarHayMasContenido(false);
                }

                cambiarGastos(snapshot.docs.map((gasto) => {
                    return { ...gasto.data(), id: gasto.id }
                }));
            });

        return unsuscribe;
    }, [usuario]);

    return [gastos, obtenerMasGastos, hayMasContenido];
}

export default useObtenerGastos;