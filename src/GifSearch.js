
import React, { useState } from 'react';
import axios from 'axios';

const GifSearch = () => {
  const [terminoBusqueda, setTerminoBusqueda] = useState('');
  const [gifs, setGifs] = useState([]);

  const buscarGifs = async (termino) => {
    const apiKey =  process.env.REACT_APP_API_KEY; 
    const url = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${termino}&limit=20`;

    try {
      const respuesta = await axios.get(url);
      setGifs(respuesta.data.data);
    } catch (error) {
      console.error('Error al buscar GIFs:', error);
    }
  };

  const manejarBusqueda = (e) => {
    e.preventDefault();
    buscarGifs(terminoBusqueda);
    setTerminoBusqueda('');
  };

  return (
    <div>
      <h1>Buscador de GIFs</h1>
      <form onSubmit={manejarBusqueda}>
        <input
          type="text"
          value={terminoBusqueda}
          onChange={(e) => setTerminoBusqueda(e.target.value)}
          placeholder="Ingresa una palabra"
        />
        <button type="submit">Buscar</button>
      </form>

      <div className="gif-container">
        {gifs.map((gif) => (
          <img key={gif.id} src={gif.images.fixed_height.url} alt={gif.title} />
        ))}
      </div>
    </div>
  );
};

export default GifSearch;
