const axios = require('axios');

const BASE_URL= `https://jsonplaceholder.typicode.com`;
const USUARIOS_A_OBTENER= 3;

async function obtenerUsuario(){
    try{
         const usuario = await axios.get(`${BASE_URL}/users`);
         return usuario.data.slice(0, USUARIOS_A_OBTENER);
    }catch(error){
         console.error('Error al obtener usuario:', error.message);
    }
}


async function obtenerPublicaciones(id) {
  try {
    const publicaciones = await axios.get(`${BASE_URL}/posts?userId=${id}`);
    return publicaciones.data;
  } catch (error) {
    console.error('Error al obtener publicaciones:', error.message);
    return [];
}
}

//ENFOQUE SECUENCIAL
async function ejecutarSecuencial() {
    console.log('---Ejecución Secuencial---');
    const usuarios = await obtenerUsuario();
    for (const usuario of usuarios) {
        const publicaciones = await obtenerPublicaciones(usuario.id); 
        console.log(`${usuario.name} tiene ${publicaciones.length} publicaciones`);
    }
}

//ENFOQUE CONCURRENTE
async function ejecutarConcurrente() {
    console.log('---Ejecución Concurrente---');
    const usuarios = await obtenerUsuario(); 
    const promisesPublicaciones = usuarios.map(usuario => obtenerPublicaciones(usuario.id));
    const publicacionesPorUsuario = await Promise.all(promisesPublicaciones);
    usuarios.forEach((usuario, index) => {
        const publicaciones = publicacionesPorUsuario[index];
        console.log(`${usuario.name} tiene ${publicaciones.length} publicaciones.`);
  });
}

async function iniciarEjecucion() {
    await ejecutarSecuencial();
    await ejecutarConcurrente();
    
}

iniciarEjecucion();