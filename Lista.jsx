function Lista(props) {
  if (!props.carregando && props.albums.length === 0) {
    return <p>Nenhum item encontrado</p>
  }

  return (
    <div className="album-grid">
      {props.albums.map((album) => (
        <article className="album-card" key={album.id}>
          <div className="cove"></div>
          <h3>{album.title}</h3>
          <p className="artist">{album.artist}</p>
          <div className="album-footer">
            <span>{album.year}</span>
            <button className="remove-button" onClick={() => props.remover(album.id)}>Remover</button>
            <strong>{album.rating} <small>/ 10</small></strong>
          </div>
        </article>
      ))}
    </div>
  )
}

export default Lista