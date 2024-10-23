function Tarefa(props) {
  const estiloTarefa = {
    backgroundColor: props.tarefa.completed ? "green" : "red",
    textDecoration: props.tarefa.completed ? "underline" : "none",
  };

  const renderTitulo = (title) => {
    return props.tarefa.completed ? <u>{title}</u> : <span>{title}</span>;
  };

  const handleClick = () =>{
    const newCompleta = !props.tarefa.completed;
    console.log(props)
    props.onCompletaChange(props.tarefa.id, newCompleta);
  }

  return (
    
    <div onClick={!props.tarefa.completed ? handleClick : undefined}>
    
      <h4>{props.nomeUsuario}</h4>
      <p style={estiloTarefa}>
        {renderTitulo(props.tarefa.title)}
      </p>
    </div>
  );
}

export default Tarefa;
