import { useEffect, useState } from 'react'
import './App.css'

const API_URL = 'http://127.0.0.1:8000/api/albums/'

function App() {
  const [albums, setAlbums] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [form, setForm] = useState({ title: '', artist: '', year: '', rating: '' })
  const [resumo, setResumo] = useState(null)
  const [busca, setBusca] = useState('')

  const loadAlbums = async () => {
    setError('')
    try {
      const response = await fetch(API_URL)
      if (!response.ok) throw new Error('Não foi possível carregar os álbuns.')
      const data = await response.json()
      setAlbums(Array.isArray(data) ? data : data.results || [])
    } catch (requestError) {
      setError(requestError.message)
    } finally {
      setLoading(false)
    }
  }

  const loadResumo = async () => {
    try {
      const response = await fetch(API_URL + 'resumo/')
      const data = await response.json()
      setResumo(data)
    } catch {
      setResumo(null)
    }
  }

  useEffect(() => {
    loadAlbums()
    loadResumo()
  }, [])

  const updateForm = (event) => {
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }))
  }

  const addAlbum = async (event) => {
    event.preventDefault()
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: form.title,
          artist: form.artist,
          year: Number(form.year),
          rating: form.rating,
        }),
      })
      const data = await response.json()

      if (!response.ok) {
        setError(data.erro || 'Confira os dados e tente novamente.')
        return
      }

      setError('')
      setForm({ title: '', artist: '', year: '', rating: '' })
      await loadAlbums()
      await loadResumo()
    } catch (requestError) {
      setError(requestError.message)
    }
  }

  const removeAlbum = async (id) => {
    try {
      const response = await fetch(`${API_URL}${id}/`, { method: 'DELETE' })
      if (!response.ok) throw new Error('Não foi possível remover o álbum.')
      await loadAlbums()
      await loadResumo()
    } catch (requestError) {
      setError(requestError.message)
    }
  }

  // filtra pelo titulo sem chamar o django de novo
  const albunsFiltrados = albums.filter((album) =>
    album.title.toLowerCase().includes(busca.toLowerCase())
  )

  return (
    <main>
      <header className="topbar">
      </header>

      <section className="hero-section" id="top">
        <div>
          <a className="brand" href="#top">NRV</a>
          <p className="eyebrow">BIBLIOTECA PESSOAL</p>
          <h1>Bem vindo à sua biblioteca!</h1>

          {resumo && (
            <div className="resumo">
              <p>Total de álbuns: <strong>{resumo.total}</strong></p>
              <p>Média das avaliações: <strong>{resumo.media_avaliacao}</strong></p>
              <p>Melhor álbum: <strong>{resumo.melhor ?? '-'}</strong></p>
            </div>
          )}
        </div>
      </section>

      <section className="collection" aria-labelledby="collection-title">
        <div className="section-heading">
          <h2 id="collection-title">Minha coleção</h2>
        </div>

        <input
          className="busca"
          type="text"
          placeholder="Buscar pelo título"
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
        />

        {albunsFiltrados.length === 0 && <p>Nenhum item encontrado</p>}

        <div className="album-grid">
          {albunsFiltrados.map((album) => (
            <article className="album-card" key={album.id}>
              <div className="cove" aria-hidden="true"></div>
              <h3>{album.title}</h3>
              <p className="artist">{album.artist}</p>
              <div className="album-footer">
                <span>{album.year}</span>
                <button type="button" className="remove-button" onClick={() => removeAlbum(album.id)}>Remover</button>
                <strong>{album.rating} <small>/ 10</small></strong>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="add-section" id="adicionar" aria-labelledby="add-title">
        <div>
          <p className="eyebrow">MEU NOVO ÁLBUM</p>
          <h2 id="add-title">Adicionar álbum</h2>
        </div>
        <form className="album-form" onSubmit={addAlbum}>
          <label>Título<input name="title" value={form.title} onChange={updateForm} required /></label>
          <label>Artista<input name="artist" value={form.artist} onChange={updateForm} required /></label>
          <label>Ano<input name="year" type="number" value={form.year} onChange={updateForm} /></label>
          <label>Avaliação<input name="rating" type="number" step="0.1" value={form.rating} onChange={updateForm} /></label>
          <button className="submit-button" type="submit">Adicionar Álbum</button>
          {error && <p style={{ color: 'red' }}>{error}</p>}
        </form>
      </section>
    </main>
  )
}

export default App