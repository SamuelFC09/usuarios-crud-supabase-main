import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import HomePage from "./pages/HomePage";
import UserListPage from "./pages/UserListPage";
import CreateUserPage from "./pages/CreateUserPage";
import EditUserPage from "./pages/EditUserPage";
import UserDeletePage from "./pages/UserDeletePage";
// Importar nuevas páginas de Cargos
import CargoListPage from "./pages/CargoListPage";
import CreateCargoPage from "./pages/CreateCargoPage";
import EditCargoPage from "./pages/EditCargoPage";
import CargoDeletePage from "./pages/CargoDeletePage";
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
          
          {/* Nuevas rutas de Cargos */}
          <Route path="cargos" element={<CargoListPage/>}/>
          <Route path="cargos/create" element={<CreateCargoPage/>}/>
          <Route path="cargos/edit/:id" element={<EditCargoPage/>}/>
          <Route path="cargos/delete/:id" element={<CargoDeletePage/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;