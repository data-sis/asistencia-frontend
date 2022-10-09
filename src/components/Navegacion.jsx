import axios from "axios";
import React, { useEffect } from "react";
import { Link } from 'react-router-dom'

function Navegacion(props) {

    const { user, setAdmin, token } = props

    useEffect(() => {
        const verifyToken = async () => {
            await axios.get("administrador/verify", { headers: { "Authorization": `Bearer ${token}` } })
                .then(res => {
                }, err => {
                    console.log(err)
                })
        }
        verifyToken()
    }, [token])

    const logout = async () => {
        setAdmin(null)
        localStorage.removeItem('admin')
        localStorage.removeItem('token')
        window.location.reload()
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    {
                        user !== null && token !== null ?
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                <li className="nav-item">
                                    <a className="nav-link active" aria-current="page" href="/admin">Inicio</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="/registro">Registro Practicante</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="/semestre">Nuevo Semestre</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="/reporte">Reporte Semestre</a>
                                </li>
                                <li className="nav-item dropdown">
                                    <a className="nav-link dropdown-toggle" href="#dropdown-menu" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        Administrador
                                    </a>
                                    <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                        <li><a className="dropdown-item" href="/registroAdmin">Crear Administrador</a></li>
                                        <li><hr className="dropdown-divider" /></li>
                                        <li><a className="dropdown-item" href="/editar">Editar Administrador</a></li>
                                    </ul>
                                </li>
                            </ul> :
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                <></>
                            </ul>
                    }
                    {
                        user !== null && token !== null ?
                            <div className="d-flex">
                                <Link
                                    className="btn btn-outline-primary"
                                    type="submit"
                                    onClick={logout}
                                    to="/"
                                >Salir</Link>
                            </div> :
                            <div className="d-flex">
                                {/* {<Link
                                    to="/login"
                                    className="btn btn-outline-primary"
                                    type="submit"
                                >Ingresar</Link>} */}
                            </div>
                    }
                </div>
            </div>
        </nav>
    )
}

export default Navegacion;