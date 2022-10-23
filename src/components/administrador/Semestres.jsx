import axios from "axios";
import React, { useEffect } from "react";

function Semestres(props) {

    const { semestre, setSemestre, setGestion } = props

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
            onChange={(e) => setGestion(e.target.value)}
            className="form-select"
            name="semestress">
            <option value="0" disabled selected>Semestre</option>
            {
                semestre?.map((data, index) => (
                    <option
                        key={index}
                        value={data.id}>{data.gestion}</option>
                ))
            }
        </select>
    );
}

export default Semestres;