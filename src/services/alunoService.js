import axios from "axios";

const API_URL = "http://leoproti.com.br:8004/alunos";

const listar = async () => {
  const { data } = await axios.get(API_URL);
  return data;
};

const obter = async (id) => {
  const { data } = await axios.get(`${API_URL}/${id}`);
  return data;
};

const criar = async (aluno) => {
  const { data } = await axios.post(API_URL, aluno, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return data;
};

const atualizar = async (id, aluno) => {
  const { data } = await axios.put(`${API_URL}/${id}`, aluno);
  return data;
};

const excluir = async (id) => {
  await axios.delete(`${API_URL}/${id}`);
};

export default {
  listar,
  obter,
  criar,
  atualizar,
  excluir,
};
