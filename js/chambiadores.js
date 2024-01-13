const sectionSeleccionarAlbañil = document.getElementById('seleccionar-albañil')
const sectionSeleccionarChamba = document.getElementById('seleccionar-chamba')
const sectionReiniciar = document.getElementById('reiniciar')

const botonAlbañilJugador = document.getElementById('boton-albañil')
const botonReiniciar = document.getElementById('boton-reiniciar')

const spanAlbañilJugador = document.getElementById('albañil-jugador')
const spanAlbañilEnemigo = document.getElementById('albañil-enemigo')
const spanVidasJugador = document.getElementById('vidas-jugador')
const spanVidasEnemigo = document.getElementById('vidas-enemigo')

const sectionMensajes = document.getElementById('resultado')
const ataquesDelJugador = document.getElementById('ataques-jugador')
const ataquesDelEnemigo = document.getElementById('ataques-enemigo')
const contenedorAtaques = document.getElementById('contenedor-ataques')

const tarjetas = document.getElementById('tarjetas')

const sectionVerMapa = document.getElementById('ver-mapa')
const mapa = document.getElementById('mapa')

const ATAQUE_PALA = '⚒️';
const ATAQUE_MESCLA = '💧';
const ATAQUE_LADRILLO = '🧱';

const ventajas = {
    [ATAQUE_LADRILLO]: ATAQUE_PALA,
    [ATAQUE_PALA]: ATAQUE_MESCLA,
    [ATAQUE_MESCLA]: ATAQUE_LADRILLO
};

let jugadorId = null
let enemigoId = null

let ataqueJugador
let ataqueEnemigo = []
let opcionAlbañiles

let albañilSeleccionado
let albañilElegido

let ataquesAlbañil 

let victoriasJugador = 0
let victoriasEnemigo = 0

let lienzo = mapa.getContext("2d")
let intervalo = 1

let albañiles = []
let albañilesEnemigos = []
let secuenciaAtaques = []
let ataques
let indexAtaqueJugador
let indexAtaqueEnemigo
let albañilJugadorObjeto
let albañilJugadorObjetoEnemigo
let albañilObjeto

let mapaBackground = new Image()
mapaBackground.src = '../assets/mapaFondo.jpg'

class Albañil {

    constructor(id, nombre, img, victorias, fotoMapa, x = 10, y = 10, idNumber = null){
        this.idNumber = idNumber
        this.id = id
        this.nombre = nombre
        this.img = img
        this.victorias = victorias
        this.ataques = []
        this.x = aleatorio(50, 220 - 1)
        this.y = aleatorio(50, 210 - 1)
        this.ancho = 40
        this.alto = 30
        this.mapaFoto = new Image()
        this.mapaFoto.src = fotoMapa
        this.velocidadX = 0
        this.velocidadY = 0
    }

    pintarAlbañil() {
        lienzo.drawImage(
            this.mapaFoto,
            this.x,
            this.y,
            this.ancho,
            this.alto
        )
    }

    pintarAlbañilEnemigo() {
        lienzo.drawImage(
            this.mapaFoto,
            this.xAleatorio,
            this.yAletorio,
            this.ancho,
            this.alto
        )
    }

}



let superAlbañil = new 
Albañil(
    'superAlbañil',
    'El Legendario Super Albañil',
    '../assets/superAlbañil.jpg', 0,
    '../assets/goku2.png' 
)

let ingeniero = new
Albañil(
    'ingeniero',
    'El Ingeniero',
    '../assets/ingeniero.jpg', 0,
    '../assets/freezer2.png' 
)

let albañilMistico = new
Albañil(
    'albañilMistico',
    'El Albañil mistico',
    '../assets/albañilMistico.jpg', 0,
    '../assets/gohan2.png' 
)

let jefeDeObra = new
Albañil(
    'jefeDeObra',
    'El Jefe de Obra',
    '../assets/jefeDeObra.jpg', 0,
    '../assets/roshi2.png' 
)

let chalan = new
Albañil(
    'chalan',
    'El Chalan',
    '../assets/chalan.jpg', 0,
    '../assets/trunks2.png' 
)

superAlbañil.ataques.push(
    { nombre: ATAQUE_PALA, id: 'boton-pala' },
    { nombre: ATAQUE_MESCLA, id: 'boton-mescla' },
    { nombre: ATAQUE_LADRILLO, id: 'boton-ladrillo' }
)

ingeniero.ataques.push(
    { nombre: ATAQUE_PALA, id: 'boton-pala' },
    { nombre: ATAQUE_MESCLA, id: 'boton-mescla' },
    { nombre: ATAQUE_LADRILLO, id: 'boton-ladrillo' }
)

albañilMistico.ataques.push(
    { nombre: ATAQUE_PALA, id: 'boton-pala' },
    { nombre: ATAQUE_MESCLA, id: 'boton-mescla' },
    { nombre: ATAQUE_LADRILLO, id: 'boton-ladrillo' }
)

jefeDeObra.ataques.push(
    { nombre: ATAQUE_PALA, id: 'boton-pala' },
    { nombre: ATAQUE_MESCLA, id: 'boton-mescla' },
    { nombre: ATAQUE_LADRILLO, id: 'boton-ladrillo' }
)

chalan.ataques.push(
    { nombre: ATAQUE_PALA, id: 'boton-pala' },
    { nombre: ATAQUE_MESCLA, id: 'boton-mescla' },
    { nombre: ATAQUE_LADRILLO, id: 'boton-ladrillo' }
)

albañiles.push(superAlbañil, ingeniero, albañilMistico, jefeDeObra, chalan)

function iniciarJuego() {

    sectionSeleccionarChamba.style.display = 'none'
    sectionVerMapa.style.display = 'none'
    
    albañiles.forEach((albañil) => {
        opcionAlbañiles = `
            <input type="radio" name="albañil" id=${albañil.id} />
            <label class="targeta-albañil" for=${albañil.id}>
                <p>${albañil.nombre}</p>
                <img class="imgAlbañiles" src=${albañil.img} alt="imagen de goku version albañil">
            </label>
        `
        tarjetas.innerHTML += opcionAlbañiles
    } )
    sectionReiniciar.style.display = 'none'
    botonAlbañilJugador.addEventListener('click', seleccionarAlbañilJugador)

    unirseAljuego()
}

function unirseAljuego(){
    fetch("http://localhost:8080/unirse")
    .then(function (res){
        if(res.ok){
            res.text()
            .then(function (respuesta) {
                jugadorId = respuesta
            })
        }
    })
}

function seleccionarAlbañilJugador() {
    const radios = document.querySelectorAll('input[name="albañil"]');

    let albañilSeleccionado = Array.from(radios).find(radio => radio.checked);
  
    if (albañilSeleccionado) {
        let albañilElegido = albañiles.find(albañil => albañil.id === albañilSeleccionado.id);
        spanAlbañilJugador.innerHTML = albañilElegido.nombre;
        extraerAtaques(albañilElegido) 
        seleccionarAlbañil(albañilElegido)
    } else {
        alert('Selecciona un Albañil 🪖');
        return
    }

    sectionSeleccionarAlbañil.style.display = 'none';
    sectionVerMapa.style.display = 'flex'
    iniciarMapa()
}

function seleccionarAlbañil(albañilElegido){
    fetch(`http://localhost:8080/albanil/${jugadorId}`, {

        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            albañil: albañilElegido
        })
    })
}

function extraerAtaques(albañilElegido){
    albañilObjeto = albañilElegido
    for (let i = 0; i < albañiles.length; i++) {
        if (albañilElegido.nombre === albañiles[i].nombre) {
            ataques = albañiles[i].ataques
        }
    }
    mostrarAtaques(ataques);
}

function mostrarAtaques(ataques) {
    spanVidasJugador.innerHTML = victoriasJugador;
    spanVidasEnemigo.innerHTML = victoriasEnemigo;

    ataques.forEach((ataque) => {
        const ataqueAlbañil = document.createElement('button');
        ataqueAlbañil.name = 'chamba';
        ataqueAlbañil.classList.add('boton-chamba');
        ataqueAlbañil.id = ataque.id;
        ataqueAlbañil.textContent = ataque.nombre;

        ataqueAlbañil.addEventListener('click', () => {
            if (!ataqueAlbañil.disabled) {
                secuenciaAtaques.push(ataque);
                ataqueAlbañil.style.background = "#2980b9";
                ataqueAlbañil.disabled = true; // Desactivar el botón después de hacer clic
            }
            if(secuenciaAtaques.length === 3){
                enviarAtaques()
            }
        });
        contenedorAtaques.appendChild(ataqueAlbañil);
    });
}

function enviarAtaques() {
    console.log("este es el envio de los ataques",secuenciaAtaques)
    fetch(`http://localhost:8080/albanil/${jugadorId}/ataques`, {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            ataques: secuenciaAtaques
        })
    })
    intervalo = setInterval(obtenerAtaques, 50)
}

function obtenerAtaques(){
    fetch(`http://localhost:8080/albanil/${enemigoId}/ataques`)
    .then(function (res){
        if(res.ok){
            res.json()
            .then(function ({ ataques }) {
                if (ataques.length === 3){
                    ataqueEnemigo = ataques
                    combate()
                }
            })
        }
    })
}



function indexAmbosOponentes(juagdor, enemigo){
    indexAtaqueJugador = secuenciaAtaques[juagdor].nombre
    indexAtaqueEnemigo = ataqueEnemigo[enemigo].nombre
    console.log("contenido ataques",indexAtaqueEnemigo)
}

function combate() {
    clearInterval(intervalo)
    spanVidasJugador.innerHTML = victoriasJugador;
    spanVidasEnemigo.innerHTML = victoriasEnemigo;

        for (let index = 0; index < secuenciaAtaques.length; index++) {
            if(secuenciaAtaques[index].nombre === ataqueEnemigo[index].nombre){
                indexAmbosOponentes(index, index)
                crearMensaje("EMPATE");
            }
            else if(secuenciaAtaques[index].nombre === '💧' && ataqueEnemigo[index].nombre === '🧱'){
                indexAmbosOponentes(index, index)
                crearMensaje("GANASTE");
                victoriasJugador++
                spanVidasJugador.innerHTML = victoriasJugador;
            }
            else if(secuenciaAtaques[index].nombre === '⚒️' && ataqueEnemigo[index].nombre === '💧'){
                indexAmbosOponentes(index, index)
                crearMensaje("GANASTE");
                victoriasJugador++
                spanVidasJugador.innerHTML = victoriasJugador;
            }
            else if(secuenciaAtaques[index].nombre === '🧱' && ataqueEnemigo[index].nombre === '⚒️'){
                indexAmbosOponentes(index, index)
                crearMensaje("GANASTE");
                victoriasJugador++
                spanVidasJugador.innerHTML = victoriasJugador;
            }
            else{
                indexAmbosOponentes(index, index)
                crearMensaje("PERDISTE");
                victoriasEnemigo++
                spanVidasEnemigo.innerHTML = victoriasEnemigo;
            }
            
        }
    
    revisarVictorias();
}

function revisarVictorias() {

    if (victoriasJugador === victoriasEnemigo) {
        crearMensajeFinal("ESTO FUE UN EMPATE!!!");
    } else if(victoriasJugador > victoriasEnemigo) {
        crearMensajeFinal("FELICITACIONES! Ganaste :)");
    }else{
        crearMensajeFinal('Lo siento, perdiste :(');
    }
}

function crearMensaje(resultado) {

    let nuevoAtaqueDelJugador = document.createElement('p');
    nuevoAtaqueDelJugador.classList.add('mensaje-ataques');
    let nuevoAtaqueDelEnemigo = document.createElement('p')
    nuevoAtaqueDelEnemigo.classList.add('mensaje-ataques');

    sectionMensajes.innerHTML = resultado
    nuevoAtaqueDelJugador.innerHTML = indexAtaqueJugador
    nuevoAtaqueDelEnemigo.innerHTML = indexAtaqueEnemigo

    ataquesDelJugador.appendChild(nuevoAtaqueDelJugador)
    ataquesDelEnemigo.appendChild(nuevoAtaqueDelEnemigo)
}

function crearMensajeFinal(resultadoFinal) {
    sectionMensajes.innerHTML = resultadoFinal
    sectionReiniciar.style.display = 'block'
    botonReiniciar.addEventListener('click', reiniciarJuego)
}

function reiniciarJuego() {
    location.reload()
}

function aleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}


function pintarCanvas(){
    lienzo.clearRect(0, 0, mapa.width, mapa.height)
    
    lienzo.drawImage(
        mapaBackground,
        0,
        0,
        mapa.width,
        mapa.height
    )

    albañilJugadorObjeto.x = 
        albañilJugadorObjeto.x + albañilJugadorObjeto.velocidadX

    albañilJugadorObjeto.y = 
        albañilJugadorObjeto.y + albañilJugadorObjeto.velocidadY 

    enviarPosicion(albañilJugadorObjeto.x, albañilJugadorObjeto.y)

    albañilesEnemigos.forEach(function (albañil){
        albañil.pintarAlbañil()
        revisarColision()
    })

    albañilJugadorObjeto.pintarAlbañil()
}

function enviarPosicion(x, y){
    fetch(`http://localhost:8080/albanil/${jugadorId}/posicion`, {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            x: x,
            y: y
        })
    })
    .then(function (res) {
        if(res.ok) {
            res.json()
            .then(function ({enemigos}){
              albañilesEnemigos = enemigos.map(function (enemigo){

                    let albañilEnemigo = null
                    let albañilNombre = enemigo.albañil.nombre.nombre || ""
                    
                    if(albañilNombre == 'El Legendario Super Albañil'){
                    
                            albañilEnemigo = new 
                            Albañil(
                                'superAlbañil',
                                'El Legendario Super Albañil',
                                '../assets/superAlbañil.jpg', 3,
                                '../assets/goku2.png',
                                `${enemigo.id}`
                                
                            )
                           console.log("id ene el objeto", enemigo.id)

                    }else if( albañilNombre == 'El Ingeniero'){ 
                            albañilEnemigo = new
                            Albañil(
                                'ingeniero',
                                'El Ingeniero',
                                '../assets/ingeniero.jpg', 3,
                                '../assets/freezer2.png',
                                `${enemigo.id}`

                            )
                            console.log("id ene el objeto", enemigo.id)
                          

                    }else if(albañilNombre == 'El Albañil mistico'){
                         
                            albañilEnemigo = new
                            Albañil(
                                'albañilMistico',
                                'El Albañil mistico',
                                '../assets/albañilMistico.jpg', 3,
                                '../assets/gohan2.png',
                                `${enemigo.id}`

                            )
                           console.log("id ene el objeto", enemigo.id)

                           
                    }else if(albañilNombre == 'El Jefe de Obra'){
                        
                            albañilEnemigo = new
                            Albañil(
                                'jefeDeObra',
                                'El Jefe de Obra',
                                '../assets/jefeDeObra.jpg', 3,
                                '../assets/roshi2.png',
                                `${enemigo.id}`
 
                            )
                            console.log("id ene el objeto", enemigo.id)

                    }else if(albañilNombre == 'El Chalan'){
    
                            albañilEnemigo = new
                            Albañil(
                                'chalan',
                                'El Chalan',
                                '../assets/chalan.jpg', 3,
                                '../assets/trunks2.png',
                                `${enemigo.id}`

                            )
                           console.log("id ene el objeto", enemigo.id)
                    }

                    albañilEnemigo.x = enemigo.x
                    albañilEnemigo.y = enemigo.y
                    albañilEnemigo.idNumber = enemigo.id

                    return albañilEnemigo
                
                })
            })
        }
    })
}

function moverDerecha(){
    albañilJugadorObjeto.velocidadX = 5
    pintarCanvas()
    
}

function moverIzquierda(){
    albañilJugadorObjeto.velocidadX = -5
    pintarCanvas()
}

function moverAbajo(){
    albañilJugadorObjeto.velocidadY = 5
    pintarCanvas()
}

function moverArriba(){
    
    albañilJugadorObjeto.velocidadY = -5
    pintarCanvas()
}

function detenerMovimiento(){
    albañilJugadorObjeto.velocidadX = 0
    albañilJugadorObjeto.velocidadY = 0
}

function sePresionoUnaTecla(event) {
   switch (event.key){
        case 'ArrowUp':
            moverArriba()
            break
        case 'ArrowDown':
            moverAbajo()
           
            break
        case 'ArrowLeft':
            moverIzquierda()
            
            break
        case 'ArrowRight':
            moverDerecha()

            break
        default:
            break
   }
}

function iniciarMapa() {

   document.body.style.cssText = 'overflow: hidden; background-size: cover; background-position: center center;  background-repeat: no-repeat; height: 100vh;';
    mapa.width = 320
    mapa.height = 240
    
    albañilJugadorObjeto = obtenerObjetoAlbañil(albañilElegido)
    window.addEventListener("keydown", sePresionoUnaTecla)
    window.addEventListener("keyup", detenerMovimiento)
    intervalo = setInterval(pintarCanvas, 50)
}

function obtenerObjetoAlbañil(){
    for (let i = 0; i < albañiles.length; i++) {
        if (albañilObjeto.nombre === albañiles[i].nombre) {

            return albañiles[i]
        }
    }
    
}

function revisarColision(){
    albañilesEnemigos.forEach(function (albañil){

    albañilJugadorObjetoEnemigo = albañil
    spanAlbañilEnemigo.innerHTML = albañilJugadorObjetoEnemigo.nombre

    const arribaEnemigo = 
        albañilJugadorObjetoEnemigo.y
    const abajoEnemigo = 
        albañilJugadorObjetoEnemigo.y + albañilJugadorObjetoEnemigo.alto
    const derechaEnemigo = 
        albañilJugadorObjetoEnemigo.x + albañilJugadorObjetoEnemigo.ancho
    const izquierdaEnemigo = 
        albañilJugadorObjetoEnemigo.x
         


    const arribaAlbañil = 
        albañilJugadorObjeto.y
    const abajoAlbañil = 
        albañilJugadorObjeto.y + albañilJugadorObjeto.alto
    const derechaAlbañil = 
        albañilJugadorObjeto.x + albañilJugadorObjeto.ancho
    const izquierdaAlbañil = 
        albañilJugadorObjeto.x
    if(
        abajoAlbañil < arribaEnemigo ||
        arribaAlbañil > abajoEnemigo ||
        derechaAlbañil < izquierdaEnemigo ||
        izquierdaAlbañil > derechaEnemigo
    ){
        return
    }

    detenerMovimiento()
    sectionSeleccionarChamba.style.display = 'flex';
    sectionVerMapa.style.display = 'none'
    enemigoId = albañilJugadorObjetoEnemigo.idNumber
})
     
    
}

window.addEventListener('load', iniciarJuego)
