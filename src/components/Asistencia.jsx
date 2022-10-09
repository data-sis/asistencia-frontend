import React, { useEffect, useRef, useState } from "react";
import axios from 'axios'
import Practicante from "../components/practicante/Practicante";
import Logs from "./Logs";

function Asistencia(props) {

    const codigoInput = useRef(null)

    const [codigo, setCodigo] = useState("")

    const { user, setUser } = props


    useEffect(() => {
        if (codigoInput.current)
            codigoInput.current.focus()
    }, [])

    useEffect(() => {
        async function fetchData() {
            await axios.get(`practicante/${codigo}`)
                .then(res => {
                    if (res.data?.user?.codigo === codigo) {
                        setUser(res.data.user)
                    }
                }, err => {
                    console.log(err)
                })
        }
        if (codigo !== "")
            fetchData()
    })

    return (
        <div>
            <div className="form-group row px-2 py-2 mx-2 my-2">

                <div className="col-9">
                    <div className="row text-center">
                        <div className="col-4">
                            <p className="fs-4">Codigo</p>
                        </div>
                        <div className="col-4">
                            <input
                                type="password"
                                ref={codigoInput}
                                placeholder="Ingresa tu codigo"
                                onChange={(e) => setCodigo(e.target.value)} />
                        </div>
                    </div>
                    <div className="col">
                        {
                            user === null ?
                                <></> : <Practicante user={user} />
                        }
                    </div>
                </div>
                <div className="col-3">
                    <Logs />
                </div>
            </div>
        </div>
    );
}

export default Asistencia;