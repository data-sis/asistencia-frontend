import { BsFillArrowDownLeftCircleFill, BsFillArrowUpRightCircleFill } from 'react-icons/bs'

function Fecha(props) {

    const { fecha, estado, dia, turno } = props

    const date = new Date(fecha)
    let val = "";

    const verificar = () => {
        const minutes = date.getHours() * 60 + date.getMinutes()
        if (date.getDay() === dia) {
            if (turno === 1 && minutes <= 750) {
                val = `${date.toLocaleTimeString()}`
            }
            if (turno === 2 && minutes > 750) {
                val = `${date.toLocaleTimeString()}`
            }
        }
    }

    verificar()

    return (
        <div className='text-center'>
            {val + "  "}
            {estado === 'Ingreso' && val !== "" ? <BsFillArrowDownLeftCircleFill color='green' /> : ""}
            {estado === 'Salida' && val !== "" ? <BsFillArrowUpRightCircleFill color='red' /> : ""}
        </div>
    );
}

export default Fecha;