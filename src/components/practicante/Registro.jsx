import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom'

function Semestres(props) {
    const [semestre, setSemestre] = useState(null)
    const { handleChange } = props
    const getSemestre = async () => {
        await axios.get('administrador/semester')
            .then(res => {
                setSemestre(res.data)
            }, err => {
                console.log(err)
            })
    }

    useEffect(() => {
        if (semestre === null)
            getSemestre()
    })

    return (
        <select
            defaultValue={'default'}
            onChange={handleChange}
            name="idSemestre"
            className="form-select">
            <option selected disabled>Semestre</option>
            {
                semestre?.map((data, index) => (
                    <option
                        key={index}
                        value={data.id}>{data.gestion}</option>
                ))
            }
        </select>
    )
}

function Registro(props) {

    const { setAdmin, setToken } = props

    const admin = localStorage.getItem('admin')
    const token = localStorage.getItem('token')

    const [practicante, setPracticante] = useState({ nombre: "", ci: "", carrera: "", mencion: "", hora: 0, cel: "", estado: "activo", codigo: "", idSemestre: "" })

    const [foto, setFoto] = useState(null)

    const navigate = useNavigate()

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

    const handleChange = (e) => {
        const { name, value } = e.target
        setPracticante({ ...practicante, [name]: value })
    }

    async function createParticipante() {
        let formData = new FormData()
        formData.append("foto", foto)
        await axios.post('practicante/upload', formData)
            .then(res => {
                practicante.foto = res.data.foto
                async function sendPracticante() {
                    await axios.post('practicante/create', practicante)
                        .then(resp => {
                            navigate('/admin')
                        }, error => {
                            console.log(error)
                        })
                }
                sendPracticante()
            }, err => {
                console.log(err)
            })
    }

    return (
        <div className="row p-2 row-cols-lg-2 row-cols-md-1 d-flex justify-content-center">
            <div className="col-lg-5 col-md card px-2 p-2 m-2">
                <h3 className="card-header text-center text-white bg-secondary">
                    Registro Practicante
                </h3>
                <div className="container card-body">
                    <div className="mb-3">
                        <h5 className="form-label font-weight-light">Nombre Completo</h5>
                        <input
                            type="text"
                            name="nombre"
                            className="form-control"
                            id="nombre"
                            placeholder="Ej. Juan Perez"
                            onChange={handleChange} />
                    </div>

                    <div className="mb-3">
                        <h5 className="form-label font-weight-light">Carnet de Identidad</h5>
                        <input
                            type="text"
                            name="ci"
                            className="form-control"
                            id="ci"
                            placeholder="Ej. 12345678"
                            onChange={handleChange} />
                    </div>

                    <div className="mb-3">
                        <h5 className="form-label font-weight-light">Carrera</h5>
                        <select
                            className="form-select form-select-sm"
                            aria-label=".form-select-sm example"
                            name="carrera"
                            onChange={handleChange}>
                            <option selected disabled>Carrera</option>
                            <option value="Ingenieria de Sistemas">Ing. Sistemas</option>
                            <option value="Ingenieria Informatica">Ing. Informatica</option>
                        </select>
                    </div>

                    <div className="mb-3">
                        <h5 className="form-label font-weight-light">Mencion</h5>

                        {practicante.carrera === "Ingenieria Informatica" ?
                            <select
                                className="form-select form-select-sm"
                                aria-label=".form-select-sm example"
                                name="mencion"
                                onChange={handleChange}>
                                <option selected disabled>Mencion Informatica</option>
                                <option value="Telematica">Telematica</option>
                                <option value="Desarrollo de software">Desarrollo de Software</option>
                            </select> :
                            <select
                                className="form-select form-select-sm"
                                aria-label=".form-select-sm example"
                                name="mencion"
                                onChange={handleChange}>
                                <option selected disabled>Mencion Sistemas</option>
                                <option value="Gestion de la informacion">Gestion de la Informacion</option>
                                <option value="Direccion y gestion de sistemas empresariales">Direccion y gestion de sistemas empresariales</option>
                                <option value="Modelamiento y optimizacion de recursos - procesos">Modelamiento y optimizacion de recursos - procesos</option>
                            </select>
                        }
                    </div>

                    <div className="mb-3">
                        <h5 className="form-label font-weight-light">Foto</h5>
                        <input
                            className="form-control"
                            name="foto"
                            type="file"
                            onChange={(e) => setFoto(e.target.files[0])}
                            id="foto" />
                    </div>

                    <div className="mb-3">
                        <h5 className="form-label font-weight-light">Celular</h5>
                        <input
                            type="text"
                            name="cel"
                            className="form-control"
                            id="cel"
                            placeholder="Ej. 77889900"
                            onChange={handleChange} />
                    </div>

                    <div className="mb-3">
                        <h5 className="form-label font-weight-light">Gestion</h5>
                        <Semestres handleChange={handleChange} />
                    </div>

                    <div className="mb-3">
                        <h5 className="form-label font-weight-light">Codigo</h5>
                        <input
                            type="password"
                            name="codigo"
                            className="form-control"
                            id="codigo"
                            placeholder="Acerque la tarjeta al lector"
                            onChange={handleChange} />
                    </div>

                    <div className="form-group row">
                        <div className="col-sm-10">
                            <button
                                className="btn btn-primary"
                                onClick={createParticipante}
                            >Registrar</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Registro;