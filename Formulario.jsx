function Formulario(props) {
  return (
    <form className="album-form" onSubmit={props.enviar}>
      <label>Título<input name="title" value={props.form.title} onChange={props.mudar} required /></label>
      <label>Artista<input name="artist" value={props.form.artist} onChange={props.mudar} required /></label>
      <label>Ano<input name="year" type="number" value={props.form.year} onChange={props.mudar} /></label>
      <label>Avaliação<input name="rating" type="number" step="0.1" value={props.form.rating} onChange={props.mudar} /></label>
      <button className="submit-button" type="submit">Adicionar Álbum</button>
      {props.erro && <p style={{ color: 'red' }}>{props.erro}</p>}
    </form>
  )
}

export default Formulario