import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom'

function Editar(props) {

    const { setAdmin, setToken } = props

    const token = localStorage.getItem('token')
    const admin = localStorage.getItem('admin')

    const [administrador, setAdministrador] = useState(null)

    const navigate = useNavigate()

    const handleChange = (e) => {
        const { name, value } = e.target
        setAdministrador({ ...administrador, [name]: value })
    }

    const getAdmin = async () => {
        await axios.get(`administrador/${admin}`)
            .then(res => {
                setAdministrador(res.data[0])
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

    useEffect(() => {
        if (administrador === null)
            getAdmin()
    })

    const actualizarAdmin = async () => {
        await axios.put(`administrador/${administrador.id}`, administrador)
            .then(res => {
                console.log(res)
                //navigate('/admin')
            }, err => {
                console.log(err)
            })
    }

    return (
        <div>
            <section className="vh-100">
                <div className="container-fluid h-custom">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col-md-9 col-lg-6 col-xl-5">
                            <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
                                className="img-fluid" alt="Sample" />
                        </div>
                        <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
                            <form>

                                <div className="divider d-flex align-items-center my-4">
                                    <p className="text-center fw-bold mx-3 mb-0 fs-2">Actualizar Administrador</p>
                                </div>

                                <div className="form-outline mb-4">
                                    <input
                                        type="text"
                                        id="cuenta"
                                        name="nombre"
                                        defaultValue={administrador?.nombre ? administrador.nombre : ""}
                                        className="form-control"
                                        onChange={handleChange}
                                        placeholder="Nombre" />
                                </div>

                                <div className="form-outline mb-4">
                                    <input
                                        type="text"
                                        id="cuenta"
                                        name="user"
                                        defaultValue={administrador?.user ? administrador.user : ""}
                                        className="form-control"
                                        onChange={handleChange}
                                        placeholder="Usuario" />
                                </div>

                                <div className="form-outline mb-3">
                                    <input
                                        type="password"
                                        name="pass"
                                        className="form-control"
                                        onChange={handleChange}
                                        placeholder="Nueva Contraseña" />
                                </div>

                                <div className="text-center text-lg-start mt-4 pt-2">
                                    <button type="button" className="btn btn-primary btn-lg"
                                        style={{ "padding-left": "2.5rem", "padding-right": "2.5rem" }}
                                        onClick={actualizarAdmin}
                                    >Actualizar</button>
                                </div>

                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Editar;