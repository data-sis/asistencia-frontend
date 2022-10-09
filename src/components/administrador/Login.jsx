import React, { useState } from "react";
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function Login() {

    const [admin, setAdmin] = useState('')
    const [pass, setPass] = useState('')

    const navigate = useNavigate()

    const login = async () => {
        await axios.post('administrador/login', { admin, pass })
            .then(res => {
                if (res.data.admin === admin) {
                    localStorage.setItem('admin', res.data.admin)
                    localStorage.setItem('token', res.data.token)
                    navigate('/admin')
                }
                else {
                    console.log(res.data.error)
                }
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
                                    <p className="text-center fw-bold mx-3 mb-0 fs-2">Ingreso</p>
                                </div>

                                <div className="form-outline mb-4">
                                    <input
                                        type="text"
                                        id="cuenta"
                                        name="admin"
                                        className="form-control"
                                        onChange={(e) => setAdmin(e.target.value)}
                                        placeholder="Usuario" />
                                </div>

                                <div className="form-outline mb-3">
                                    <input
                                        type="password"
                                        name="pass"
                                        className="form-control"
                                        onChange={(e) => setPass(e.target.value)}
                                        placeholder="Contraseña" />
                                </div>

                                <div className="text-center text-lg-start mt-4 pt-2">
                                    <button type="button" className="btn btn-primary btn-lg"
                                        style={{ "padding-left": "2.5rem", "padding-right": "2.5rem" }}
                                        onClick={login}>Ingreso</button>
                                </div>

                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Login;