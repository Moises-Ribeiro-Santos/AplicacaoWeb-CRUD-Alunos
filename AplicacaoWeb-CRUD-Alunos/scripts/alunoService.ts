import axios from "axios";

export interface Aluno {
  id?: number;
  nome: string;
  turma: string;
  curso: string;
  matricula: string;
}

const API_URL = "http://leoproti.com.br:8004/alunos";

const listar = async (): Promise<Aluno[]> => {
  const { data } = await axios.get(API_URL);
  return data;
};

const obter = async (id: number): Promise<Aluno> => {
  const { data } = await axios.get(`${API_URL}/${id}`);
  return data;
};

const criar = async (aluno: Aluno): Promise<Aluno> => {
  const { data } = await axios.post(API_URL, aluno, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return data;
};

const atualizar = async (id: number, aluno: Aluno): Promise<Aluno> => {
  const { data } = await axios.put(`${API_URL}/${id}`, aluno, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return data;
};

const excluir = async (id: number): Promise<void> => {
  await axios.delete(`${API_URL}/${id}`);
};

export default {
  listar,
  obter,
  criar,
  atualizar,
  excluir,
};
