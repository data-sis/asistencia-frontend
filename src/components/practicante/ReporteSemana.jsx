import React from "react";

import Fecha from "./Fecha";
import ReporteSemanaPDF from "./ReporteSemanaPDF";

function ReporteSemana(props) {

    const { fechas } = props

    return (
        <div className="col text-center px-2 py-2">
            <table className="table table-bordered">
                <thead className="thead-dark">
                    <tr>
                        <th scope="col">Turno</th>
                        <th scope="col">Lunes</th>
                        <th scope="col">Martes</th>
                        <th scope="col">Miercoles</th>
                        <th scope="col">Jueves</th>
                        <th scope="col">Viernes</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th scope="row">
                            MAÑANA
                        </th>
                        <td>

                            {
                                fechas.fechas.map((element, index) => (
                                    <Fecha
                                        key={index}
                                        dia={1}
                                        turno={1}
                                        fecha={element.fecha}
                                        estado={element.estado}
                                    />
                                ))
                            }
                        </td>
                        <td>

                            {
                                fechas.fechas.map((element, index) => (
                                    <Fecha
                                        key={index}
                                        dia={2}
                                        turno={1}
                                        fecha={element.fecha}
                                        estado={element.estado}
                                    />
                                ))
                            }
                        </td>
                        <td>

                            {
                                fechas.fechas.map((element, index) => (
                                    <Fecha
                                        key={index}
                                        dia={3}
                                        turno={1}
                                        fecha={element.fecha}
                                        estado={element.estado}
                                    />
                                ))
                            }
                        </td>
                        <td>

                            {
                                fechas.fechas.map((element, index) => (
                                    <Fecha
                                        key={index}
                                        dia={4}
                                        turno={1}
                                        fecha={element.fecha}
                                        estado={element.estado}
                                    />
                                ))
                            }
                        </td>
                        <td>
                            {
                                fechas.fechas.map((element, index) => (
                                    <Fecha
                                        key={index}
                                        dia={5}
                                        turno={1}
                                        fecha={element.fecha}
                                        estado={element.estado}
                                    />
                                ))
                            }</td>
                    </tr>
                    <tr>
                        <th scope="row">
                            TARDE
                        </th>
                        <td>

                            {
                                fechas.fechas.map((element, index) => (
                                    <Fecha
                                        key={index}
                                        dia={1}
                                        turno={2}
                                        fecha={element.fecha}
                                        estado={element.estado}
                                    />
                                ))
                            }
                        </td>
                        <td>

                            {
                                fechas.fechas.map((element, index) => (
                                    <Fecha
                                        key={index}
                                        dia={2}
                                        turno={2}
                                        fecha={element.fecha}
                                        estado={element.estado}
                                    />
                                ))
                            }
                        </td>
                        <td>

                            {
                                fechas.fechas.map((element, index) => (
                                    <Fecha
                                        key={index}
                                        dia={3}
                                        turno={2}
                                        fecha={element.fecha}
                                        estado={element.estado}
                                    />
                                ))
                            }
                        </td>
                        <td>

                            {
                                fechas.fechas.map((element, index) => (
                                    <Fecha
                                        key={index}
                                        dia={4}
                                        turno={2}
                                        fecha={element.fecha}
                                        estado={element.estado}
                                    />
                                ))
                            }
                        </td>
                        <td>
                            {
                                fechas.fechas.map((element, index) => (
                                    <Fecha
                                        key={index}
                                        dia={5}
                                        turno={2}
                                        fecha={element.fecha}
                                        estado={element.estado}
                                    />
                                ))
                            }</td>
                    </tr>
                </tbody>
            </table>
            <div>
                <ReporteSemanaPDF nombre={fechas.nombre} fechas={fechas.fechas} />
            </div>
        </div>
    );
}

export default ReporteSemana;