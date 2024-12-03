const API_ADMIN = 'https://raw.githubusercontent.com/cesarmcuellar/Elecciones/refs/heads/main/administrador.json';

let votos = {};

document.getElementById('iniciar-elecciones').addEventListener('click', iniciarElecciones);
document.getElementById('cerrar-elecciones').addEventListener('click', cerrarElecciones);

function iniciarElecciones() {
    fetch(API_ADMIN)
        .then(response => response.json())
        .then(data => {
            const admin = data[0]; 
            const usuario = prompt('Ingrese el usuario:');
            const clave = prompt('Ingrese la clave:');

            if (usuario === admin.usuario && clave === admin.clave) {
                alert('Elecciones iniciadas.');
                document.getElementById('iniciar-elecciones').disabled = true;
                document.getElementById('cerrar-elecciones').disabled = false;
                cargarCandidatos();
            } else {
                alert('Usuario o clave incorrectos.');
            }
        })
        .catch(error => console.error('Error al validar administrador:', error));
}


let listaComentario=document.querySelector("#candidato")

fetch("https://raw.githubusercontent.com/cesarmcuellar/Elecciones/refs/heads/main/candidatos.json ")

    .then(respuesta=>respuesta.json())
    .then(candid=>{
        console.log(candid);
        candid.forEach(candidato=>{
            let item=document.createElement('li');
            item.innerHTML+=`
            <p>${candidato.curso}</p>
            <img src="${candidato.foto}" alt="" class="foto">
            <p>${candidato.nombre}  ${candidato.apellido} </p>
            <p>${candidato.ficha}</p>`


        const img = item.querySelector('.foto');
    img.addEventListener('click', () => confirmarVoto(`${candidato.nombre} ${candidato.apellido}`));

    listaComentario.appendChild(item);
    });
});

function confirmarVoto(candidato) {
    if (confirm(`Vas a votar a ${candidato}`)) {
        alert(`Gracias por votar a ${candidato}`);
    }
}


function mostrarCandidatos(candidatos) {
    const contenedor = document.getElementById('candidatos');
    contenedor.innerHTML = '';
    document.getElementById('candidatos').classList.remove('eleccion');


    candidatos.forEach(candidato => {
        votos[candidato.id] = 0;
        contenedor.innerHTML += `
            <div class="candidato">
                <img src="${candidato.foto}" alt="${candidato.nombre}" onclick="votar('${candidato.id}', '${candidato.nombre}')">
                <h2>${candidato.ficha}</h2>
                <p>${candidato.descripcion}</p>
            </div>
        `;
    });
}

function votar(id, nombre) {
    if (confirm(`¿Está seguro de votar por ${nombre}?`)) {
        votos[id]++;
        alert('Voto registrado.');
    }
}

function cerrarElecciones() {
    alert('Elecciones cerradas.');
    document.getElementById('cerrar-elecciones').disabled = true;

    mostrarResultados();
}

function mostrarResultados() {
    const resultados = document.getElementById('resultados');
    resultados.innerHTML = '';
    document.getElementById('resultados-titulo').classList.remove('eleccion');
    document.getElementById('resultados').classList.remove('eleccion');

    for (const [id, cantidad] of Object.entries(votos)) {
        resultados.innerHTML += `<li>${id}: ${cantidad} votos</li>`;
    }
}
