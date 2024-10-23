import axios from "axios";
import { useEffect, useState } from "react";
import Tarefa from "../Tarefa/index";

function ListaDeTarefas() {
  const [tarefas, setTarefas] = useState([]);
  const [usuarios, setUsuarios] = useState([]);

  const buscarTarefas = async () => {
    try {
      const response = await axios.get("https://jsonplaceholder.typicode.com/todos");
      setTarefas(response.data);
    } catch (error) {
      console.error("Erro ao buscar tarefas:", error);
    }
  };

  const buscarUsuarios = async () => {
    try {
      const response = await axios.get("https://jsonplaceholder.typicode.com/users");
      setUsuarios(response.data);
    } catch (error) {
      console.error("Erro ao buscar usuários:", error);
    }
  };

  const obterTarefasPorUsuario = (userId) => {
    const tarefasDoUsuario = tarefas.filter((tarefa) => tarefa.userId === userId);
    return {
      completas: tarefasDoUsuario.filter((tarefa) => tarefa.completed),
      incompletas: tarefasDoUsuario.filter((tarefa) => !tarefa.completed),
    };
  };

  useEffect(() => {
    const buscarDados = async () => {
      await Promise.all([buscarTarefas(), buscarUsuarios()]);
    };
    buscarDados();
  }, []);

  function onCompletaChange(tarefaId, novacompleta) {
    setTarefas(
      tarefas.map((tarefa) =>
        tarefa.id === tarefaId ? { ...tarefa, completed: novacompleta}:tarefa
      )
    );
  }

  return (
    <div style={{ padding: "20px" }}>
      {usuarios.map((usuario) => {
        const { completas, incompletas } = obterTarefasPorUsuario(usuario.id);
        return (
          <div key={usuario.id} style={{ width: "400px", border: "solid black 1px", padding: "20px", margin: "20px" }}>
            <h2>{usuario.name}</h2>
            <div style={{ marginBottom: "20px" }}>
              <h3>Tarefas Completas</h3>
              <div style={{ backgroundColor: "green", padding: "10px", color: "white" }}>
                {completas.map((tarefa) => (
                  <Tarefa key={tarefa.id} tarefa={tarefa} nomeUsuario={usuario.name} />
                ))}
              </div>
            </div>
            <div>
              <h3>Tarefas Incompletas</h3>
              <div style={{ backgroundColor: "red", padding: "10px", color: "white" }}>
                {incompletas.map((tarefa) => (
                  <Tarefa key={tarefa.id} tarefa={tarefa} nomeUsuario={usuario.name} onCompletaChange={onCompletaChange} />
                ))}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default ListaDeTarefas;