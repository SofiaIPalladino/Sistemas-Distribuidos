import Image from 'next/image';
import texto from './texto';
import Texto from './texto';

export default function Home() {

  return (

    <main className="flex flex-col items-center">

   

      <h1 className="text-4xl text-red-700">Mi Primera Página con Next.js</h1>


      <p className="text-sm text-yellow-500">Demostración gráfica de mi alegría al ver que anda</p>
 

      <Image

        src="/Imagenact3.webp"

        alt="img"

        width={500}

        height={300}

      />



      {/* Lista en color verde */}

      <ul className="text-lg text-green-600">

        <li>Sofía Isabella Palladino </li>
        

      </ul>

      <ul className="text-lg text-white-400">
 
        <li><Texto /></li>

      </ul>




    </main>

  );

}

