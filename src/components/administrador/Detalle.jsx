import React from "react";

import Datos from "./Datos";

function Detalle(props) {

    const { logs } = props

    return (
        <div className="row row-cols-1 row-cols-md-2 g-4 p-2">
            {
                logs?.map((data, index) => (
                    <div className="col">
                        <Datos key={index} data={data} />
                    </div>
                ))
            }
        </div>
    );
}

export default Detalle;