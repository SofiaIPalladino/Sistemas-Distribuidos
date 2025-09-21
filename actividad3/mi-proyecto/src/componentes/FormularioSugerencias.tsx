'use client';

import { useState } from 'react';

export default function FormularioSugerencias() {
  const [sugerencia, setSugerencia] = useState({
    nombre: '',
    pelicula: '',
    comentario: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setSugerencia({ ...sugerencia, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Sugerencia enviada:', sugerencia);
    alert(`¡Gracias por tu sugerencia, ${sugerencia.nombre}!`);
    setSugerencia({ nombre: '', pelicula: '', comentario: '' });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-pink-800 p-8 rounded-lg shadow-xl mb-10">
      <h2 className="text-2xl font-semibold mb-4 text-white">¡Deja tu sugerencia!</h2>
      <div className="mb-4">
        <label htmlFor="nombre" className="block text-white mb-1">Tu Nombre</label>
        <input
          type="text"
          id="nombre"
          name="nombre"
          value={sugerencia.nombre}
          onChange={handleChange}
          className="w-full p-2 bg-pink-900 text-white rounded-md border border-pink-700 focus:outline-none focus:ring-2 focus:ring-yellow-400"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="pelicula" className="block text-white mb-1">Nombre de la Película</label>
        <input
          type="text"
          id="pelicula"
          name="pelicula"
          value={sugerencia.pelicula}
          onChange={handleChange}
          className="w-full p-2 bg-pink-900 text-white rounded-md border border-pink-700 focus:outline-none focus:ring-2 focus:ring-yellow-400"
        />
      </div>
      <div className="mb-6">
        <label htmlFor="comentario" className="block text-white mb-1">Comentario</label>
        <textarea
          id="comentario"
          name="comentario"
          value={sugerencia.comentario}
          onChange={handleChange}
          rows={3}
          className="w-full p-2 bg-pink-900 text-white rounded-md border border-pink-700 focus:outline-none focus:ring-2 focus:ring-yellow-400"
        />
      </div>
      <button 
        type="submit" 
        className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-2 px-4 rounded transition duration-300"
      >
        Enviar Sugerencia
      </button>
    </form>
  );
}