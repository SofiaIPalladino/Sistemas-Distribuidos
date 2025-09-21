import Image from 'next/image';

type PeliculaProps = {
  titulo: string;
  director: string;
  anio: number;
  sinopsis: string;
  imagenUrl: string;
};

export default function Pelicula({ titulo, director, anio, sinopsis, imagenUrl }: PeliculaProps) {
  return (
    <div className="bg-red-800 text-white rounded-lg p-6 mb-4 flex flex-col md:flex-row items-center shadow-lg">
      {imagenUrl && (
        <div className="flex-shrink-0 mb-4 md:mb-0 md:mr-6">
          <Image
            src={imagenUrl}
            alt={`Portada de ${titulo}`}
            width={150}
            height={225}
            className="rounded-md shadow-lg"
            priority
          />
        </div>
      )}
      <div className="flex-grow text-center md:text-left">
        <h2 className="text-3xl font-bold mb-2 text-yellow-300">{titulo}</h2>
        <p className="text-sm italic mb-1">Dirigida por: {director}</p>
        <p className="text-sm mb-4">Año: {anio}</p>
        <p className="text-base">{sinopsis}</p>
      </div>
    </div>
  );
}