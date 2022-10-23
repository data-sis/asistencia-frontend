import React, { useState } from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

import Registro from "./components/practicante/Registro";
import Asistencia from "./components/Asistencia";
import RegistroAdmin from "./components/administrador/RegistroAdmin";
import Login from "./components/administrador/Login";
import HomeAdmin from "./components/administrador/Home";
import Navegacion from "./components/Navegacion";
import Semestre from "./components/administrador/Semestre";
import Reporte from "./components/administrador/Reporte";
import Editar from "./components/administrador/Editar";
import axios from "axios";

axios.defaults.baseURL = 'http://10.10.60.117:4000/api/'

function App() {

  const [user, setUser] = useState(null)
  const [admin, setAdmin] = useState(null)
  const [token, setToken] = useState(null)

  return (
    <div className="App">
      <Router>
        <div>
          <Navegacion admin={admin} setAdmin={setAdmin} token={token} />
          <Routes>
            <Route path="/" element={<Asistencia user={user} setUser={setUser} />}></Route>
            <Route path="/registro" element={<Registro setAdmin={setAdmin} setToken={setToken} />}></Route>
            <Route path="/admin" element={<HomeAdmin setAdmin={setAdmin} setToken={setToken} />} />
            <Route path="/registroAdmin" element={<RegistroAdmin setAdmin={setAdmin} setToken={setToken} />} />
            <Route path="/login" element={<Login />} />
            <Route path="/semestre" element={<Semestre setAdmin={setAdmin} setToken={setToken} />} />
            <Route path="/reporte" element={<Reporte setAdmin={setAdmin} setToken={setToken} />} />
            <Route path="/editar" element={<Editar admin={admin} setAdmin={setAdmin} setToken={setToken} />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
