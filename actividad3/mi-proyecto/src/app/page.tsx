import PeliculaCard from '@/componentes/Pelicula';
import FormularioSugerencias from '@/componentes/FormularioSugerencias';

export default function CinePagina() {
  return (
    <main className="bg-red-950 min-h-screen text-white p-8">
      <h1 className="text-5xl font-extrabold text-center mb-10 text-pink-400">Diario de Cine</h1>

      <section className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold mb-6 text-yellow-400">Películas que recomiendo</h2>
        
        <PeliculaCard
          titulo="Scarface"
          director="Brian De Palma"
          anio={1984}
          sinopsis="Un emigrante cubano frío y sanguinario, Tony Montana, llega de Cuba para instalarse en Miami, donde se propone hacerse con un nombre dentro del crimen organizado de Florida. Junto a su amigo, Manny Rivera, inicia una ascendente carrera delictiva."
          imagenUrl="https://www.themoviedb.org/t/p/w1280/iDABT5GD9OQmFiXM3wR0DJIxtkY.jpg"
        />

         <PeliculaCard
          titulo="Mujeres al borde de un ataque de nervios"
          director="Pedro Almodóvar"
          anio={1998}
          sinopsis="Pepa e Iván son actores de doblaje. Él es un mujeriego empedernido y, después de una larga relación, rompe con Pepa: le deja un mensaje en el contestador pidiéndole que le prepare una maleta con sus cosas. Al quedarse sola, Pepa no soporta vivir en una casa llena de recuerdos y decide alquilarla. Mientras espera que Iván vaya a recoger la maleta, la casa se le va llenando de gente extravagante de la que aprenderá muchas cosas sobre la soledad y la locura."
          imagenUrl="https://www.themoviedb.org/t/p/w1280/hrKTdxVnAToD1xYLvPgDkYPMLEC.jpg"
        />
    
        <PeliculaCard
          titulo="In a Lonely Place"
          director="Nicholas Ray"
          anio={1950}
          sinopsis="Steele, un guionista con fama de conflictivo y violento, tiene que afrontar la difícil tarea de adaptar un best-seller de nula calidad literaria. Casualmente se entera de que Mildred, la chica del guardarropa del club que frecuenta, ha leído la obra en cuestión. Decide entonces llevársela a su casa para que le cuente el argumento. Pero, a la mañana siguiente, la policía se presenta en su casa y le comunica que Mildred ha sido asesinada, y Steele se convierte en el principal sospechoso."
          imagenUrl="https://www.themoviedb.org/t/p/w1280/taBbWy7bdDZR2iFzUOok7fkceXg.jpg"
        />
        
        <PeliculaCard
          titulo="West Side Story"
          director="Steven Spielberg"
          anio={2021}
          sinopsis="Los adolescentes Tony y María, a pesar de tener afiliaciones con pandillas callejeras rivales, los Jets y los Sharks, se enamoran en la ciudad de Nueva York en la década de los 50. Nueva versión del legendario musical 'West Side Story', a su vez adaptación de una famosa obra de teatro de Broadway, que modernizaba la historia de 'Romeo y Julieta', de Shakespeare."
          imagenUrl="https://www.themoviedb.org/t/p/w1280/lSIYqwBNXxN8QbANbAePVdG1WdI.jpg"
        />
      </section>

      <section className="max-w-4xl mx-auto mt-12">
        <FormularioSugerencias />
      </section>

       <footer className="text-center mt-16 text-gray-400">
        <p>Creado por Sofía Palladino</p>
      </footer>

    </main>
  );
}