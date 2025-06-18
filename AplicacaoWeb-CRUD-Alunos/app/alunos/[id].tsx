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
        setAluno(data); 
        setLoading(false);
      }).catch((error) => {
        console.error("Erro ao carregar aluno:", error);
        setLoading(false);

        alert("Erro ao carregar os dados do aluno.");
      });
    }
  }, [id]);


  const handleChange = (name: keyof Aluno, value: string) => {
    setAluno((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (data?: Aluno) => {

    const alunoToUpdate: Aluno = {
      nome: data?.nome ?? aluno.nome,
      turma: data?.turma ?? aluno.turma,
      curso: data?.curso ?? aluno.curso,
      matricula: data?.matricula ?? aluno.matricula,
      id: aluno.id 
    };

    if (!alunoToUpdate.nome || !alunoToUpdate.turma || !alunoToUpdate.curso || !alunoToUpdate.matricula) {
      alert("Preencha todos os campos!");
      return;
    }

    setLoading(true);
    try {

      await alunoService.atualizar(Number(id), alunoToUpdate); 
      router.replace("/alunos"); 
    } catch (error) {
      console.error("Erro ao atualizar aluno:", error);
      alert("Erro ao salvar as alterações do aluno."); 
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <ActivityIndicator size="large" style={{ marginTop: 40 }} />;
  }

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Text
        variant="titleLarge"
        style={{ textAlign: "center", marginBottom: 20 }}
      >
        Editar Aluno 
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
            router.replace("/alunos"); 
          }
        }}
      />
    </View>
  );
}