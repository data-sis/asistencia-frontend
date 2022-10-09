import React, { useState, useEffect } from "react"
import { useNavigate } from 'react-router-dom'
import axios from "axios"

function Semestre(props) {

    const { setAdmin, setToken } = props

    const [gestion, setGestion] = useState('')

    const token = localStorage.getItem('token')
    const user = localStorage.getItem('admin')

    const navigate = useNavigate()

    const create = async () => {
        await axios.post("administrador/semester", { gestion })
            .then(res => {
                window.location.replace('/admin')
            }, err => {
                console.log(err)
            })
    }

    useEffect(() => {
        const verifyToken = async () => {
            await axios.get("administrador/verify", { headers: { "Authorization": `Bearer ${token}` } })
                .then(res => {
                    setAdmin(user)
                    setToken(token)
                }, err => {
                    navigate('/login')
                })
        }
        verifyToken()
        if (user === null)
            navigate('/login')
    })

    return (
        <div>
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">Crear nueva gestion</h5>
                    <div>
                        <input
                            type="text"
                            name="gestion"
                            onChange={(e) => { setGestion(e.target.value) }} />
                    </div>
                    <div className="py-2">
                        <button className="btn btn-primary"
                            onClick={create}
                        >Crear</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Semestre;