import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { View, ActivityIndicator } from "react-native";
import { Text } from "react-native-paper";
import alunoService, { Aluno } from "../../scripts/alunoService";
import FormAluno from "../../components/FormAluno";

export default function EditarAluno() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [aluno, setAluno] = useState<Aluno>({ nome: "", turma: "", curso: "", matricula: "" });
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (id) {
      setLoading(true);
      alunoService.obter(Number(id)).then((data) => {
        setAluno({ nome: data.nome, turma: data.turma, curso: data.curso, matricula: data.matricula });
        setLoading(false);
      });
    }
  }, [id]);

    const handleSubmit = async (data?: any) => {
    const nome = data?.nome ?? aluno.nome;
    const turma = data?.turma ?? aluno.turma;
    const curso = data?.curso ?? aluno.curso;
    const matricula = data?.matricula ?? aluno.matricula;

    if (!nome || !turma || !curso || !matricula) {
      alert("Preencha todos os campos!");
      return;
    }

    setLoading(true);
    try {
      await alunoService.atualizar(Number(id), { nome, turma, curso, matricula });
      router.replace("/alunos/index");
    } finally {
      setLoading(false);
    }
  };



  if (loading)
    return <ActivityIndicator size="large" style={{ marginTop: 40 }} />;

  function handleChange(name: keyof Aluno, value: string): void {
    throw new Error("Function not implemented.");
  }

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Text
        variant="titleLarge"
        style={{ textAlign: "center", marginBottom: 20 }}
      >
        Editar Produto
      </Text>
      <FormAluno
        aluno={aluno}
        loading={loading}
        onChange={handleChange}
        onSubmit={handleSubmit}
        onCancel={() => {
          if (router.canGoBack?.()) {
            router.back();
          } else {
            router.replace("/alunos/index");
          }
        }}
      />
    </View>
  );
}