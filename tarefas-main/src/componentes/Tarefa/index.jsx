function Tarefa({ tarefa, nomeUsuario }) {
  const estiloTarefa = {
    backgroundColor: tarefa.completed ? "green" : "red",
    textDecoration: tarefa.completed ? "underline" : "none",
  };

  const renderTitulo = (title) => {
    return tarefa.completed ? <u>{title}</u> : <span>{title}</span>;
  };

  return (
    <div>
      <h4>{nomeUsuario}</h4>
      <p style={estiloTarefa}>
        {renderTitulo(tarefa.title)}
      </p>
    </div>
  );
}

export default Tarefa;