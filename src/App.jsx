import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import HomePage from "./pages/HomePage";
import UserListPage from "./pages/UserListPage";
import CreateUserPage from "./pages/CreateUserPage";
import EditUserPage from "./pages/EditUserPage";
import UserDeletePage from "./pages/UserDeletePage";

// Importar páginas de Cargos
import CargoListPage from "./pages/CargoListPage";
import CreateCargoPage from "./pages/CreateCargoPage";
import EditCargoPage from "./pages/EditCargoPage";
import CargoDeletePage from "./pages/CargoDeletePage";

// Importar páginas de Horarios
import HorarioListPage from "./pages/HorarioListPage";
import CreateHorarioPage from "./pages/CreateHorarioPage";
import EditHorarioPage from "./pages/EditHorarioPage";
import HorarioDeletePage from "./pages/HorarioDeletePage";

// Importar páginas de Cargos-Usuarios
import CargoUsuarioListPage from "./pages/CargoUsuarioListPage";
import CreateCargoUsuarioPage from "./pages/CreateCargoUsuarioPage";
import EditCargoUsuarioPage from "./pages/EditCargoUsuarioPage";
import CargoUsuarioDeletePage from "./pages/CargoUsuarioDeletePage";

// Importar páginas de Tickets
import TicketListPage from "./pages/TicketListPage";
import CreateTicketPage from "./pages/CreateTicketPage";
import EditTicketPage from "./pages/EditTicketPage";
import TicketDeletePage from "./pages/TicketDeletePage";

import './App.css'

function App() {
  return(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout/>}>
          {/* Rutas existentes de Usuarios */}
          <Route index element={<HomePage/>}/>
          <Route path="users" element={<UserListPage/>}/>
          <Route path="users/create" element={<CreateUserPage/>}/>
          <Route path="users/edit/:id" element={<EditUserPage/>}/>
          <Route path="users/delete/:id" element={<UserDeletePage/>}/>
          
          {/* Rutas de Cargos */}
          <Route path="cargos" element={<CargoListPage/>}/>
          <Route path="cargos/create" element={<CreateCargoPage/>}/>
          <Route path="cargos/edit/:id" element={<EditCargoPage/>}/>
          <Route path="cargos/delete/:id" element={<CargoDeletePage/>}/>
          
          {/* Rutas de Horarios */}
          <Route path="horarios" element={<HorarioListPage/>}/>
          <Route path="horarios/create" element={<CreateHorarioPage/>}/>
          <Route path="horarios/edit/:id" element={<EditHorarioPage/>}/>
          <Route path="horarios/delete/:id" element={<HorarioDeletePage/>}/>
          
          {/* Rutas de Cargos-Usuarios */}
          <Route path="cargos-usuarios" element={<CargoUsuarioListPage/>}/>
          <Route path="cargos-usuarios/create" element={<CreateCargoUsuarioPage/>}/>
          <Route path="cargos-usuarios/edit/:id" element={<EditCargoUsuarioPage/>}/>
          <Route path="cargos-usuarios/delete/:id" element={<CargoUsuarioDeletePage/>}/>
          
          {/* Rutas de Tickets */}
          <Route path="tickets" element={<TicketListPage/>}/>
          <Route path="tickets/create" element={<CreateTicketPage/>}/>
          <Route path="tickets/edit/:id" element={<EditTicketPage/>}/>
          <Route path="tickets/delete/:id" element={<TicketDeletePage/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;