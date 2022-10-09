import React, { PureComponent } from "react"

import jsPDF from "jspdf"

export default class ReporteSemanaPDF extends PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            semana: ""
        }
    }

    componentDidMount() {
    }

    generateData = function () {

        let result = [];
        const maniana = {
            "Turno": "\n\nMañana",
            "Lunes": [""],
            "Martes": [""],
            "Miercoles": [""],
            "Jueves": [""],
            "Viernes": [""]
        }
        const tarde = {
            "Turno": "\n\nTarde",
            "Lunes": [""],
            "Martes": [""],
            "Miercoles": [""],
            "Jueves": [""],
            "Viernes": [""]
        }
        for (let i = 0; i < this.props.fechas.length; i++) {
            const date = new Date(this.props.fechas[i].fecha)
            const minutes = date.getHours() * 60 + date.getMinutes()
            let val = ""
            val = `${this.props.fechas[i].estado}\n${date.toLocaleTimeString()}`
            switch (date.getDay()) {
                case 1: (minutes <= 750) ? maniana.Lunes.push(val) : tarde.Lunes.push(val); break
                case 2: (minutes <= 750) ? maniana.Martes.push(val) : tarde.Martes.push(val); break
                case 3: (minutes <= 750) ? maniana.Miercoles.push(val) : tarde.Miercoles.push(val); break
                case 4: (minutes <= 750) ? maniana.Jueves.push(val) : tarde.Jueves.push(val); break
                case 5: (minutes <= 750) ? maniana.Viernes.push(val) : tarde.Viernes.push(val); break
                default: break
            }
        }
        maniana.Lunes.push("")
        maniana.Martes.push("")
        maniana.Miercoles.push("")
        maniana.Jueves.push("")
        maniana.Viernes.push("")
        tarde.Lunes.push("")
        tarde.Martes.push("")
        tarde.Miercoles.push("")
        tarde.Jueves.push("")
        tarde.Viernes.push("")
        result.push(Object.assign({}, maniana));
        result.push(Object.assign({}, tarde));
        return result;
    };

    createHeaders(keys) {
        var result = [];
        for (var i = 0; i < keys.length; i += 1) {
            result.push({
                id: keys[i],
                name: keys[i],
                prompt: keys[i],
                width: 108,
                align: "center",
                padding: 0
            });
        }
        return result;
    }

    headers = this.createHeaders([
        "Turno",
        "Lunes",
        "Martes",
        "Miercoles",
        "Jueves",
        "Viernes"
    ]);

    jsPDFGenerator = () => {
        let doc = new jsPDF('p', 'pt')

        //logos
        doc.addImage("/LOGO_SIS.png", "PNG", 60, 40, 40, 40)
        doc.addImage("/LOGO_INF.png", "PNG", 100, 40, 40, 40)
        doc.addImage("/LOGO_FNI.png", "PNG", 500, 40, 40, 40)
        //doc.addImage("/LOGO_UTO.png", "PNG", 500, 40, 40, 40)

        //titulo
        doc.setFont("courier")
        doc.setFontSize(24)
        doc.text("Reporte Semanal", 200, 60)

        doc.setFontSize(22)
        doc.setFont("courier", "bold")
        doc.text("DATA CENTER", 235, 90)

        let inicio = ""
        let fin = ""
        if (this.props.fechas[0]?.fecha) {
            inicio = new Date(this.props.fechas[0].fecha)
            fin = new Date(this.props.fechas[this.props.fechas.length - 1].fecha)
        }
        const semana = `${inicio.toLocaleDateString()} - ${fin.toLocaleDateString()}`

        //datos pasante, semana
        doc.setFontSize(14)
        doc.setFont("times", "normal")
        doc.text(`PASANTE: ${this.props.nombre}`, 60, 140, "left")
        doc.text(`${semana}`, 540, 140, "right")

        //horario
        doc.setFont("courier")
        doc.table(60, 170, this.generateData(), this.headers, { autoSize: false })

        let guion = "______"
        for (let i = 0; i < this.props.nombre.length; i++)
            guion = guion + '_'

        //firmas
        doc.text('_______________________________', 60, 450, "left")
        doc.text(guion, 540, 450, "right")
        doc.text('Ing. Miguel A. Reynolds Salinas', 60, 465, "left")
        doc.text(`Univ. ${this.props.nombre}`, 540, 465, "right")

        const name = `Reporte ${this.props.nombre} ${semana}.pdf`

        doc.save(name)
    }

    render() {
        return (<button onClick={this.jsPDFGenerator} className="btn btn-primary">Imprimir PDF</button>)
    }

}