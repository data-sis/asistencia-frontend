import React from "react";

function Log(props) {

    const { data } = props

    const fecha = new Date(data.fecha)

    return (
        <div>
            <div className={data.estado === "Ingreso" ? "card border-success text-success my-1" : "card border-danger text-danger my-1"}>
                <div className="row">
                    <div className="col-2 my-2 mx-2 px-2">
                        <img
                            src={data?.foto ? `https://drive.google.com/uc?id=${data.foto}&export=download` : ""}
                            alt=""
                            className="rounded-circle border border-secondary"
                            width="65px"
                            height="70px" />
                    </div>
                    <div className="card-body col-6 mx-2">
                        <p className="card-title fs-6 fw-bold">{data.nombre}</p>
                        <small className="card-text">{fecha.toLocaleDateString()} - {fecha.toLocaleTimeString()}</small>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Log;