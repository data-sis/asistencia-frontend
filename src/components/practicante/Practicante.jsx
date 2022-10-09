import React, { useState, useEffect } from "react";
import axios from 'axios'

function Practicante(props) {

    const { user } = props

    const [semestre, setSemestre] = useState(null)

    const [id] = useState(user.id)

    const getSemestre = async () => {
        await axios.get('practicante/assistance')
            .then(res => {
                setSemestre(res.data.semestre)
            }, err => {
                console.log(err)
            })
    }

    useEffect(() => {
        if (semestre === null)
            getSemestre()
    })

    const enviarAsistencia = async () => {
        const asistencia = {}
        asistencia.idPracticante = id
        console.log(asistencia)
        await axios.post(`practicante/assistance`, asistencia)
            .then(res => {
                window.location.reload()
            }, err => {
                console.log(err)
            })
    }

    return (
        <div className="container row px-2 py-2 mx-2 my-2">
            <div className="card mb-3 mt-3 " >
                <div className="row g-0">
                    <div className="col-md-4 my-2">
                        <img
                            src={user?.foto ? `https://drive.google.com/uc?id=${user.foto}&export=download` : ""}
                            alt=""
                            className="rounded-circle border border-secondary"
                            width="200px"
                            height="250px" />
                    </div>
                    <div className="col-md-8">
                        <div className="card-body">
                            <p className="card-text fs-2 fw-bold" >{user?.nombre ? user.nombre : ""}</p>
                            <p className="card-text text-uppercase fs-5" >{user?.carrera ? user.carrera : ""}</p>
                            <p className="card-text text-uppercase fs-6">{user?.mencion ? user.mencion : ""}</p>
                            <p className="card-text" >{semestre?.gestion ? semestre.gestion : ""}</p>
                            <div className="form-group row">
                                <div className="col-sm-10">
                                    <button
                                        href="/"
                                        className="btn btn-primary"
                                        onClick={enviarAsistencia}
                                    >Enviar Asistencia</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Practicante;