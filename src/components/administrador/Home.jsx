import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom'
import { BsTrash, BsPencil } from 'react-icons/bs'
//import { confirmAlert } from 'react-confirm-alert'
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
function Usuarios(props) {
    const { users, index } = props

    const [practicante, setPracticante] = useState({ id: users.id, nombre: users.nombre, ci: users.ci, carrera: users.carrera, mencion: users.mencion, hora: users.hora, cel: users.cel, estado: users.estado, codigo: users.codigo, idSemestre: users.idSemestre })

    const [foto, setFoto] = useState({})

    const handleChange = (e) => {
        const { name, value } = e.target
        setPracticante({ ...practicante, [name]: value })
    }

    const actualizar = async () => {
        let formData = new FormData()
        formData.append("foto", foto)
        console.log(foto)
        await axios.post('practicante/upload', formData)
            .then(res => {
                practicante.foto = res.data.foto
                async function sendPracticante() {
                    await axios.put(`practicante/${users.id}`, practicante)
                        .then(resp => {
                            window.location.reload()
                        }, error => {
                            console.log(error)
                        })
                }
                sendPracticante()
            }, err => {
                console.log(err)
            })
    }



    const eliminar = async () => {
        await axios.delete(`practicante/${users.id}`)
            .then(res => {
                window.location.reload()
            }, err => {
                console.log(err)
            })
    }

    return (
        <>
            <tr>
                <th scope="row"><div className="d-flex justify-content-evenly">{index}</div></th>
                <td><div className="d-flex justify-content-evenly fw-bold ">{users.nombre}</div></td>
                <td>
                    <div className="d-flex justify-content-evenly text-uppercase">{users.carrera}</div>
                    <div className="d-flex justify-content-evenly fst-italic">{users.mencion}</div>
                </td>
                <td>
                    <div className="d-flex justify-content-evenly ">{users.gestion}</div>
                </td>
                <td>
                    <div className="d-flex justify-content-evenly">
                        <button
                            className="btn btn-warning"
                            data-bs-toggle="modal"
                            data-bs-target={`#modal${users.id}`}
                        ><BsPencil /></button>
                        <button
                            class="btn btn-danger"
                            data-bs-toggle="modal"
                            data-bs-target={`#delete${users.id}`}
                        ><BsTrash /></button>
                    </div>
                </td >
            </tr >

            <div class="modal fade" id={`delete${users.id}`} tabindex="-1" role="dialog" aria-labelledby="exampleModal" aria-hidden="true">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModal">Confirmacion</h5>
                        </div>
                        <div class="modal-body">
                            Desea eliminar el Practicante {users.nombre}
                        </div>
                        <div class="modal-footer">
                            <button
                                type="button"
                                class="btn btn-primary"
                                onClick={eliminar}
                            >Eliminar</button>
                            <button
                                type="button"
                                class="btn btn-secondary"
                                data-bs-dismiss="modal">Cancelar</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="modal fade" id={`modal${users.id}`} tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-body">
                            <div className="col-lg col-md card px-2 p-2 m-2">
                                <h3 className="card-header text-center text-white bg-secondary">
                                    Actualizar Datos Practicante
                                </h3>
                                <div className="container card-body">
                                    <div className="mb-3">
                                        <h5 className="form-label font-weight-light">Nombre Completo</h5>
                                        <input
                                            type="text"
                                            defaultValue={users.nombre}
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
                                            defaultValue={users.ci}
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
                                            <option selected disabled>{users.carrera}</option>
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
                                                <option selected disabled>{users.mencion}</option>
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
                                            defaultValue={users.cel}
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
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <div className="form-group row">
                                <div className="col-sm-10">
                                    <button
                                        className="btn btn-primary"
                                        onClick={actualizar}
                                    >Actualizar</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

function HomeAdmin(props) {

    const { setAdmin, setToken } = props

    const token = localStorage.getItem('token')
    const admin = localStorage.getItem('admin')

    const [users, setUsers] = useState([])

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

    const getDatos = async () => {
        await axios.get('practicante/all')
            .then(res => {
                setUsers(res.data)
            }, err => {
                console.log(err)
            })
    }

    useEffect(() => {
        getDatos()
    }, [])

    return (
        <div className="p-2">
            <div>
                <h2>Practicantes</h2>
            </div>
            <table className="table">
                <thead className="table-dark text-center">
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Nombre</th>
                        <th scope="col">Carrera</th>
                        <th scope="col">Gestion</th>
                        <th scope="col">Opciones</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((element, index) => (
                        <Usuarios key={index} index={index + 1} users={element} />
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default HomeAdmin;