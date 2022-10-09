import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function RegistroAdmin(props) {

    const { setAdmin, setToken } = props

    const admin = localStorage.getItem('admin')
    const token = localStorage.getItem('token')

    const [administrador, setAdministrador] = useState({ "nombre": "", "cargo": "", "user": "", "pass": "" })

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

    const navigate = useNavigate()

    const handleChange = (e) => {
        const { name, value } = e.target
        setAdministrador({ ...administrador, [name]: value })
    }

    const enviarAdmin = async () => {
        await axios.post('administrador/create', administrador)
            .then(res => {
                console.log(res)
                navigate('/admin')
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
                                    <p className="text-center fw-bold mx-3 mb-0 fs-2">Crear Administrador</p>
                                </div>

                                <div className="form-outline mb-4">
                                    <p>Nombre Completo</p>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="nombre"
                                        placeholder="Nombre Completo"
                                        onChange={handleChange} />
                                </div>

                                <div className="form-outline mb-4">
                                    <p>Cargo</p>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="cargo"
                                        placeholder="Cargo"
                                        onChange={handleChange} />
                                </div>

                                <div className="form-outline mb-4">
                                    <p>Usuario</p>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="user"
                                        placeholder="Usuario"
                                        onChange={handleChange} />
                                </div>

                                <div className="form-outline mb-3">
                                    <p>Password</p>
                                    <input
                                        type="password"
                                        name='pass'
                                        className="form-control"
                                        placeholder="Password"
                                        onChange={handleChange} />
                                </div>

                                <div className="text-center text-lg-start mt-4 pt-2">
                                    <button type="button" className="btn btn-primary btn-lg"
                                        style={{ "padding-left": "2.5rem", "padding-right": "2.5rem" }}
                                        onClick={enviarAdmin}
                                    >Crear Administrador</button>
                                </div>

                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default RegistroAdmin;