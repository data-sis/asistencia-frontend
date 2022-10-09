import React, { useState } from "react";
import axios from "axios";

import Semanas from "../practicante/Semanas";
import ReporteSemana from "../practicante/ReporteSemana";

function Datos(props) {

    const { data } = props

    const [fechas, setFechas] = useState(null)

    const [semana, setSemana] = useState(null)

    const horas = Math.round(data.hora / 60)

    const getFecha = async () => {
        await axios.get(`administrador/practicante/${data.idPracticante}`)
            .then(res => {
                setFechas(res.data)
            }, err => {
                console.log(err)
            })
    }

    const asignarSemana = async (e) => {
        setSemana({ "fechas": fechas[e.target.value].fechas, "nombre": fechas[e.target.value].nombre })
    }

    return (
        <div className="card mb-3" style={{ "max-width": "540px" }}>
            <div className="row g-0 text-center">
                <div className="col">
                    <div className="card-body">
                        <p className="card-text fs-2 fw-bold">{data.nombre}</p>
                        <p className="card-text text-uppercase fs-4">{data.carrera}</p>
                        <p className="card-text fs-5">Horas Trabajadas {horas}</p>
                    </div>
                </div>
                <div className="col-3 my-2">
                    <img
                        src={data?.foto ? `https://drive.google.com/uc?id=${data.foto}&export=download` : ""}
                        alt=""
                        className="rounded-circle border border-secondary"
                        width="90px"
                        height="100px" />
                    <div className="my-2">
                        <a
                            onClick={getFecha}
                            className="btn btn-secondary"
                            data-bs-toggle="collapse"
                            aria-expanded="false"
                            aria-controls="collapseExample"
                            href={`#collapse${data.idPracticante}`}
                        >Ver Detalle</a>
                    </div>
                </div>
            </div>
            {
                fechas !== null ?
                    <div className="collapse row g-0 text-center" id={`collapse${data.idPracticante}`}>
                        <div className="d-flex justify-content-between">
                            <div className="ml-auto p-2">
                                <p></p>
                            </div>
                            <div className="ml-auto p-2">
                                <div className="row">
                                    <div className="col-4">
                                        <p className="fw-bold">Semana: </p>
                                    </div>
                                    <div className="col-8">
                                        <select
                                            className="form-select form-select-sm"
                                            name="semana"
                                            onChange={asignarSemana}>
                                            <option value="0" disabled selected>Seleccionar Semana</option>
                                            {
                                                fechas.map((element, index) => (
                                                    <Semanas
                                                        key={index}
                                                        fechas={element}
                                                    />
                                                ))
                                            }
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {
                            semana !== null ?
                                <div>
                                    <ReporteSemana
                                        fechas={semana}
                                    />
                                </div> :
                                <></>
                        }
                    </div> :
                    <></>
            }
        </div >
    );
}

export default Datos;