import React, { useEffect } from "react";
import { View } from "react-native";
import { Controller, useForm } from "react-hook-form";
import { TextInput, Button } from "react-native-paper";
import { Aluno } from "../scripts/alunoService";

interface Props {
  aluno: Aluno;
  loading: boolean;
  onChange: (name: keyof Aluno, value: string) => void;
  onSubmit: () => void;
  onCancel: () => void;
}

export default function FormAluno({
  aluno,
  loading,
  onChange,
  onSubmit,
  onCancel,
}: Props) {
  const { control, handleSubmit, setValue } = useForm({
    defaultValues: {
      nome: aluno.nome,
      turma: aluno.turma,
      curso: aluno.curso,
      matricula: aluno.matricula
    },
  });

  useEffect(() => {
    setValue("nome", aluno.nome);
    setValue("turma", aluno.turma);
    setValue("curso", aluno.curso);
    setValue("matricula", aluno.matricula);
  }, [aluno, setValue]);

  return (
  <View style={{ width: "100%" }}>
    <Controller
      control={control}
      name="nome"
      rules={{ required: "Nome obrigatório" }}
      render={({ field: { onChange: onChangeField, value }, fieldState }) => (
        <TextInput
          label="Nome"
          value={value}
          onChangeText={(text) => {
            onChangeField(text);
            onChange("nome", text);
          }}
          mode="outlined"
          style={{ marginBottom: 16, backgroundColor: "#fff" }}
          autoFocus
          textColor="#222"
          underlineColor="#1976d2"
          selectionColor="#1976d2"
          error={!!fieldState.error}
        />
      )}
    />

    <Controller
      control={control}
      name="turma"
      rules={{ required: "Turma obrigatória" }}
      render={({ field: { onChange: onChangeField, value }, fieldState }) => (
        <TextInput
          label="Turma"
          value={value}
          onChangeText={(text) => {
            onChangeField(text);
            onChange("turma", text);
          }}
          mode="outlined"
          style={{ marginBottom: 16, backgroundColor: "#fff" }}
          textColor="#222"
          underlineColor="#1976d2"
          selectionColor="#1976d2"
          error={!!fieldState.error}
        />
      )}
    />

    <Controller
      control={control}
      name="curso"
      rules={{ required: "Curso obrigatório" }}
      render={({ field: { onChange: onChangeField, value }, fieldState }) => (
        <TextInput
          label="Curso"
          value={value?.toString() ?? ""}
          onChangeText={(text) => {
            onChangeField(text);
            onChange("curso", text);
          }}
          mode="outlined"
          style={{ marginBottom: 16, backgroundColor: "#fff" }}
          textColor="#222"
          underlineColor="#1976d2"
          selectionColor="#1976d2"
          error={!!fieldState.error}
        />
      )}
    />

    <Controller
      control={control}
      name="matricula"
      rules={{ required: "Matrícula obrigatória" }}
      render={({ field: { onChange: onChangeField, value }, fieldState }) => (
        <TextInput
          label="Matrícula"
          value={value?.toString() ?? ""}
          onChangeText={(text) => {
            onChangeField(text);
            onChange("matricula", text);
          }}
          mode="outlined"
          style={{ marginBottom: 16, backgroundColor: "#fff" }}
          keyboardType="numeric"
          textColor="#222"
          underlineColor="#1976d2"
          selectionColor="#1976d2"
          error={!!fieldState.error}
        />
      )}
    />

    <Button
      mode="contained"
      onPress={handleSubmit(onSubmit)}
      loading={loading}
      style={{ marginBottom: 10, backgroundColor: "#1976d2" }}
      labelStyle={{ color: "#fff" }}
    >
      Salvar
    </Button>
    <Button
      mode="outlined"
      onPress={onCancel}
      labelStyle={{ color: "#1976d2" }}
    >
      Cancelar
    </Button>
  </View>
)};