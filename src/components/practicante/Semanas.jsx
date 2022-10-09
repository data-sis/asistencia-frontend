import React from "react";

function Semanas(props) {

    const { fechas } = props

    const inicio = new Date(fechas.inicioFin.inicio)
    const fin = new Date(fechas.inicioFin.fin)
    fin.setDate(fin.getDate() - 1)

    return (
        <option
            value={fechas.cont}>{inicio.toLocaleDateString()} - {fin.toLocaleDateString()}</option>
    );
}

export default Semanas;