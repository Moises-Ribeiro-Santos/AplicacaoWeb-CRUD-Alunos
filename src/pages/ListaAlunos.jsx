import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  CircularProgress,
  Typography,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import alunoService from "../services/alunoService";

export default function ListaAlunos() {
  const [alunos, setAlunos] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const carregarAlunos = async () => {
    setLoading(true);
    try {
      const lista = await alunoService.listar();
      setAlunos(lista);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    carregarAlunos();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Deseja realmente excluir este aluno?")) {
      await alunoService.excluir(id);
      carregarAlunos();
    }
  };

  if (loading)
    return <CircularProgress sx={{ display: "block", mx: "auto", my: 4 }} />;

  return (
    <TableContainer
      component={Paper}
      elevation={0}
      sx={{ boxShadow: "none", background: "transparent" }}
    >
      <Typography
        variant="h5"
        sx={{
          m: 2,
          textAlign: "center",
          fontWeight: "bold",
          color: "#1976d2",
        }}
      >
        Lista de Alunos
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Nome</TableCell>
            <TableCell>Turma</TableCell>
            <TableCell>Curso</TableCell>
            <TableCell>Matrícula</TableCell>
            <TableCell align="right">Ações</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {alunos.map((aluno) => (
            <TableRow key={aluno.id}>
              <TableCell>{aluno.id}</TableCell>
              <TableCell>{aluno.nome}</TableCell>
              <TableCell>{aluno.turma}</TableCell>
              <TableCell>{aluno.curso}</TableCell>
              <TableCell>{aluno.matricula}</TableCell>
              <TableCell align="right">
                <IconButton
                  color="primary"
                  onClick={() => navigate(`/editar/${aluno.id}`)}
                >
                  <EditIcon />
                </IconButton>
                <IconButton
                  color="error"
                  onClick={() => handleDelete(aluno.id)}
                >
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
          {alunos.length === 0 && (
            <TableRow>
              <TableCell colSpan={6} align="center">
                Nenhum aluno cadastrado.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
