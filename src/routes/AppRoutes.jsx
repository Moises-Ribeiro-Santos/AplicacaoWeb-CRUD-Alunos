import { Routes, Route } from "react-router-dom";
import ListaAlunos from "../pages/ListaAlunos";
import FormAluno from "../pages/FormAluno";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<ListaAlunos />} />
      <Route path="/novo" element={<FormAluno />} />
      <Route path="/editar/:id" element={<FormAluno />} />
    </Routes>
  );
}
