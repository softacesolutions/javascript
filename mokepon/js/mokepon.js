const sectionSeleccionarAtaque = document.getElementById('seleccionar-ataque')
const sectionReiniciar = document.getElementById('reiniciar')
const botonMascotaJugador = document.getElementById('boton-mascota')
const botonReiniciar = document.getElementById('boton-reiniciar')

const sectionSeleccionarMascota = document.getElementById('seleccionar-mascota')
const spanMascotaJugador = document.getElementById('mascota-jugador')

const spanMascotaEnemigo = document.getElementById('mascota-enemigo')

const spanVictoriasJugador = document.getElementById('victorias-jugador')
const spanVictoriasEnemigo = document.getElementById('victorias-enemigo')

const sectionMensajes = document.getElementById('resultado')
const ataquesJugador = document.getElementById('ataques-jugador')
const ataquesEnemigo = document.getElementById('ataques-enemigo')

const contenedorTarjetas = document.getElementById('contenedor-tarjetas')
const contenedorAtaques = document.getElementById('contenedor-ataques')

let mokepones = []
let ataqueJugador = []
let ataqueEnemigo = []
let opcionMokepones
let inputHipodoge
let inputCapipepo
let inputRatigueya
let mascotaJugador
let ataquesMokeponEnemigo
let indexAtaqueJugador
let indexAtaqueEnemigo
let botonFuego
let botonAgua
let botonTierra
let ataquesMokepon
let botones = []
let victoriasJugador = 0
let victoriasEnemigo = 0
const fuego = 'Fuego 🔥'
const agua = 'Agua 🤽'
const tierra = 'Tierra ☘️'

class Mokepon {
    constructor(nombre, foto, vida) {
        this.nombre = nombre
        this.foto = foto
        this.vida = vida
        this.ataques = []
    }
}

let hipodoge = new Mokepon("Hipodoge", "./assets/mokepons_mokepon_hipodoge_attack.png", 5)
let capipepo = new Mokepon("Capipepo", "./assets/mokepons_mokepon_capipepo_attack.png", 5)
let ratigueya = new Mokepon("Ratigueya", "./assets/mokepons_mokepon_ratigueya_attack.png", 5)

hipodoge.ataques.push(
    { nombre: agua, id: 'boton-agua' },
    { nombre: agua, id: 'boton-agua' },
    { nombre: agua, id: 'boton-agua' },
    { nombre: fuego, id: 'boton-fuego' },
    { nombre: tierra, id: 'boton-tierra' },
)

capipepo.ataques.push(
    { nombre: tierra, id: 'boton-tierra' },
    { nombre: tierra, id: 'boton-tierra' },
    { nombre: tierra, id: 'boton-tierra' },
    { nombre: agua, id: 'boton-agua' },
    { nombre: fuego, id: 'boton-fuego' },
)

ratigueya.ataques.push(
    { nombre: fuego, id: 'boton-fuego' },
    { nombre: fuego, id: 'boton-fuego' },
    { nombre: fuego, id: 'boton-fuego' },
    { nombre: agua, id: 'boton-agua' },
    { nombre: tierra, id: 'boton-tierra' },
)

mokepones.push(hipodoge, capipepo, ratigueya)

function iniciarJuego() {
    //Otras mascotas, por ahora no se utilizan:
    //Langostelvis -> Agua y Fuego    Tucapalma -> Agua y Tierra    Pydos -> Tierra y Fuego

    mokepones.forEach((mokepon) => {
        opcionMokepones = `
        <input type="radio" name="mascota" id=${mokepon.nombre} />
        <label class="tarjeta-de-mokepon" for=${mokepon.nombre}>
            <p>${mokepon.nombre}</p>
            <img src=${mokepon.foto} alt=${mokepon.nombre}>
        </label>
        `
        contenedorTarjetas.innerHTML += opcionMokepones

        inputHipodoge = document.getElementById('Hipodoge')
        inputCapipepo = document.getElementById('Capipepo')
        inputRatigueya = document.getElementById('Ratigueya')
    })
  
    sectionSeleccionarAtaque.style.display = 'none'
    sectionReiniciar.style.display = 'none'
    botonMascotaJugador.addEventListener('click', seleccionarMascotaJugador)
    
    botonReiniciar.addEventListener('click', reiniciarJuego)
}

function seleccionarMascotaJugador() {
    sectionSeleccionarMascota.style.display = 'none'
    sectionSeleccionarAtaque.style.display = 'flex'
    
    if (inputHipodoge.checked) {
        spanMascotaJugador.innerHTML = inputHipodoge.id
        mascotaJugador = inputHipodoge.id
    }
    else if (inputCapipepo.checked) {
        spanMascotaJugador.innerHTML = inputCapipepo.id
        mascotaJugador = inputCapipepo.id
    }
    else if (inputRatigueya.checked) {
        spanMascotaJugador.innerHTML = inputRatigueya.id
        mascotaJugador = inputRatigueya.id
    }
    else {
        sectionSeleccionarMascota.style.display = 'block'
        sectionSeleccionarAtaque.style.display = 'none'
        alert("Selecciona una mascota")
    }
    extraerAtaques(mascotaJugador)
    seleccionarMascotaEnemigo() 
}

function extraerAtaques(mascotaJugador) {
    let ataques
    for (let i = 0; i < mokepones.length; i++) {
        if (mascotaJugador == mokepones[i].nombre) {
            ataques = mokepones[i].ataques
        }
    }
    mostrarAtaques(ataques)
}

function mostrarAtaques(ataques) {
    ataques.forEach((ataque) => {
        ataquesMokepon = `
        <button id=${ataque.id} class="boton-ataque BAtaque">${ataque.nombre}</button>
        `
        contenedorAtaques.innerHTML += ataquesMokepon
    })

    botonFuego = document.getElementById('boton-fuego')
    botonAgua = document.getElementById('boton-agua')
    botonTierra = document.getElementById('boton-tierra')
    botones = document.querySelectorAll('.BAtaque')
}

function secuenciaAtaque() {
    botones.forEach((boton) => {
        boton.addEventListener('click', (e) => {
            ataqueJugador.push(e.target.textContent)
            console.log(ataqueJugador)
            boton.style.background = '#112f58'
            boton.disabled = true
            ataqueAleatorioEnemigo()
        })
    })
}

function seleccionarMascotaEnemigo() {
    let mascotaAleatorio = aleatorio(0, mokepones.length - 1)
    
    spanMascotaEnemigo.innerHTML = mokepones[mascotaAleatorio].nombre
    ataquesMokeponEnemigo = mokepones[mascotaAleatorio].ataques
    secuenciaAtaque()
}

function ataqueAleatorioEnemigo() {
    let ataqueAleatorio = aleatorio(0, ataquesMokeponEnemigo.length - 1)

    ataqueEnemigo.push(ataquesMokeponEnemigo[ataqueAleatorio].nombre)
    console.log(ataqueEnemigo)
    iniciarCombate()
}

function iniciarCombate() {
    if (ataqueJugador.length == 5) {
        combate(ataqueEnemigo, ataqueJugador)
    }
    
}
function indexAmbosOponentes(jugador, enemigo) {
    indexAtaqueJugador = ataqueJugador[jugador]
    indexAtaqueEnemigo = ataqueEnemigo[enemigo]
}

function combate() {
    for (let index = 0; index < ataqueJugador.length; index++) {
        if (ataqueJugador[index] == ataqueEnemigo[index]) {
            indexAmbosOponentes(index, index)
            crearMensaje("EMPATE 😮")
        } else if (ataqueJugador[index] == fuego && ataqueEnemigo[index] == tierra) {
            indexAmbosOponentes(index, index)
            crearMensaje("GANASTE 🎉")
            victoriasJugador++
            spanVictoriasJugador.innerHTML = victoriasJugador
        } else if (ataqueJugador[index] == agua && ataqueEnemigo[index] == fuego) {
            indexAmbosOponentes(index, index)
            crearMensaje("GANASTE 🎉")
            victoriasJugador++
            spanVictoriasJugador.innerHTML = victoriasJugador
        } else if (ataqueJugador[index] == tierra && ataqueEnemigo[index] == agua) {
            indexAmbosOponentes(index, index)
            crearMensaje("GANASTE 🎉")
            victoriasJugador++
            spanVictoriasJugador.innerHTML = victoriasJugador
        }
        else {
            indexAmbosOponentes(index, index)
            crearMensaje("PERDISTE 😭")
            victoriasEnemigo++
            spanVictoriasEnemigo.innerHTML = victoriasEnemigo
        }  
    }
    revisarVictorias()
}

function revisarVictorias() {
    if (victoriasEnemigo == victoriasJugador) {
        crearMensajeFinal("Empataste 😮")
    } else if (victoriasEnemigo > victoriasJugador ) {
        crearMensajeFinal("Lo siento, Perdiste 😭")
    } else {
        crearMensajeFinal("FELICITACIONES! Ganaste 🎉")
    }
}

function crearMensaje(resultado) {
    let nuevoAtaqueJugador = document.createElement('p')
    let nuevoAtaqueEnemigo = document.createElement('p')

    sectionMensajes.innerHTML = resultado
    nuevoAtaqueJugador.innerHTML= indexAtaqueJugador
    nuevoAtaqueEnemigo.innerHTML = indexAtaqueEnemigo

    ataquesJugador.appendChild(nuevoAtaqueJugador)
    ataquesEnemigo.appendChild(nuevoAtaqueEnemigo)
}

function crearMensajeFinal(resultadoFinal) {
    sectionMensajes.innerHTML = resultadoFinal
    
    sectionReiniciar.style.display = 'block'
}

function reiniciarJuego() {
    location.reload()
}

function aleatorio(min, max) {
    return Math.floor( Math.random() * ( max - min + 1 ) + min );
}

window.addEventListener('load', iniciarJuego)