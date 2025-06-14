import { TextField, Button, Stack, CircularProgress } from "@mui/material";

export default function FormAluno({
  aluno,
  loading,
  onChange,
  onSubmit,
  onCancel,
}) {
  if (loading)
    return <CircularProgress sx={{ display: "block", mx: "auto", my: 4 }} />;

  return (
    <form onSubmit={onSubmit}>
      <Stack spacing={2}>
        <TextField
          label="Nome"
          name="nome"
          value={aluno.nome}
          onChange={onChange}
          required
        />
        <TextField
          label="Turma"
          name="turma"
          type="text"
          value={aluno.preco}
          onChange={onChange}
          required
        />
        <Button type="submit" variant="contained" color="primary">
          Salvar
        </Button>
        <Button variant="outlined" color="secondary" onClick={onCancel}>
          Cancelar
        </Button>
      </Stack>
    </form>
  );
}
