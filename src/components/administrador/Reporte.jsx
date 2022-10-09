import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom'

import Semestres from "./Semestres";
import Detalle from "./Detalle";

function Reporte(props) {

    const { setAdmin, setToken } = props

    const [semestre, setSemestre] = useState(null)

    const [gestion, setGestion] = useState(null)

    const [logs, setLogs] = useState(null)

    const token = localStorage.getItem('token')
    const admin = localStorage.getItem('admin')

    const navigate = useNavigate()

    const getDatos = async () => {
        await axios.get(`administrador/logs/${gestion}`)
            .then(res => {
                setLogs(res.data)
            }, err => {
                console.log(err)
            })
    }

    useEffect(() => {
        const verifyToken = async () => {
            await axios.get("administrador/verify", { headers: { "Authorization": `Bearer ${token}` } })
                .then(res => {
                    setAdmin(admin)
                    setToken(token)
                }, err => {
                    console.log(err)
                    navigate('/login')
                })
        }
        verifyToken()
        if (admin === null)
            navigate('/login')
    })

    return (
        <div className="">
            <div className="col-6">
                <div className="d-flex justify-content-evenly">
                    <div className="p-2 d-flex align-items-center">
                        <p className="fw-bold">Semestre</p>
                    </div>
                    <div className="p-2 d-flex align-items-center">
                        <Semestres
                            semestre={semestre}
                            setSemestre={setSemestre}
                            setGestion={setGestion} />
                    </div>
                    <div className="p-2 d-flex align-items-center">
                        <button
                            className="btn btn-primary"
                            onClick={getDatos}
                        >Consultar</button>
                    </div>
                </div>
            </div>
            <div className="col p-2">
                {
                    logs === null ?
                        <></> :
                        <Detalle logs={logs} />
                }
            </div>
        </div>
    );
}

export default Reporte;