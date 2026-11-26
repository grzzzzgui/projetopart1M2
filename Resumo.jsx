function Resumo(props) {
  if (props.dados == null) {
    return null
  }

  return (
    <div className="resumo">
      <p>Total de álbuns: <strong>{props.dados.total}</strong></p>
      <p>Média das avaliações: <strong>{props.dados.media_avaliacao}</strong></p>
      <p>Melhor álbum: <strong>{props.dados.melhor}</strong></p>
    </div>
  )
}

export default Resumo