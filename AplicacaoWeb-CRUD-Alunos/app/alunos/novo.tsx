import { View, StyleSheet } from "react-native";
import { Text } from "react-native-paper";
import { useRouter } from "expo-router";
import { useState } from "react";
import alunoService, { Aluno } from "../../scripts/alunoService";
import FormAluno from "../../components/FormAluno";

export default function NovoAluno() {
  const [aluno, setAluno] = useState<Aluno>({
    nome: "",
    turma: "",
    curso: "",
    matricula: "",
  });
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleChange = (name: keyof Aluno, value: string) => {
    setAluno((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

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
      await alunoService.criar({ nome, turma, curso, matricula });
      router.replace("/alunos/index");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text
        variant="titleLarge"
        style={{ textAlign: "center", marginBottom: 20, color: "#1976d2" }}
      >
        Novo Aluno
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

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#f5f6fa" },
});
