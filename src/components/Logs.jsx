import React, { useState, useEffect } from 'react'
import axios from 'axios'

import Log from './Log'

function Logs() {

    const [logs, setLogs] = useState([])

    const getLogs = async () => {
        await axios.get('practicante')
            .then(res => {
                setLogs(res.data)
            }, err => {
                console.log(err)
            })
    }

    useEffect(() => {
        getLogs()
    }, [])

    return (

        <div className="col-sm">
            <p className='fs-5 fst-italic'>
                Registros Recientes
            </p>
            {
                logs?.map((data, index) => (
                    <Log
                        key={index}
                        data={data} />
                ))
            }
        </div>
    );
}

export default Logs;