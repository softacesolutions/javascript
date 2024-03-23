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

const sectionVerMapa = document.getElementById('ver-mapa')
const mapa = document.getElementById('mapa')

let mokepones = []
let ataqueJugador = []
let ataqueEnemigo = []
let opcionMokepones
let inputHipodoge
let inputCapipepo
let inputRatigueya
let mascotaJugador
let objMascotaJugador
let ataquesMokeponEnemigo
let indexAtaqueJugador
let indexAtaqueEnemigo
let botonFuego
let botonAgua
let botonTierra
let ataquesMokepon
let botones = []
let ataques = []
let victoriasJugador = 0
let victoriasEnemigo = 0
let lienzo = mapa.getContext("2d")
let intervalo
let mapaFondo = new Image()
mapaFondo.src = './assets/mokemap.png'
let altoMapa
let anchoMapa = window.innerWidth - 20
const anchoMaxMapa = 350
if (anchoMapa > anchoMaxMapa) {
    anchoMapa = anchoMaxMapa - 20
}
altoMapa = anchoMapa * 600 / 800
mapa.width = anchoMapa
mapa.height = altoMapa

const fuego = 'Fuego 🔥'
const agua = 'Agua 🤽'
const tierra = 'Tierra ☘️'

class Mokepon {
    constructor(nombre, foto, tipo, fotoMapa) {
        this.nombre = nombre
        this.foto = foto
        this.tipo = tipo
        this.ataques = []
        this.ancho = 40
        this.alto = 40
        this.x = aleatorio(0, mapa.width - this.ancho)
        this.y = aleatorio(0, mapa.height - this.alto)
        this.mapaFoto = new Image()
        this.mapaFoto.src = fotoMapa
        this.velocidadX = 0
        this.velocidadY = 0
    }

    pintarMokepon() {
        lienzo.drawImage(
            this.mapaFoto,
            this.x,
            this.y,
            this.ancho,
            this.alto
        )
    }
}

// Jugadores
let hipodoge = new Mokepon("Hipodoge", "./assets/mokepons_mokepon_hipodoge_attack.png", '🤽', './assets/hipodoge.png')
let capipepo = new Mokepon("Capipepo", "./assets/mokepons_mokepon_capipepo_attack.png", '☘️', './assets/capipepo.png')
let ratigueya = new Mokepon("Ratigueya", "./assets/mokepons_mokepon_ratigueya_attack.png", '🔥', './assets/ratigueya.png')
let langostelvis = new Mokepon("Langostelvis", "./assets/mokepons_mokepon_langostelvis_attack.png", '🤽🔥', './assets/mokepons_mokepon_langostelvis_attack.png')
let tucapalma = new Mokepon("Tucapalma", "./assets/mokepons_mokepon_tucapalma_attack.png", '🤽☘️', './assets/mokepons_mokepon_tucapalma_attack.png')
let pydos = new Mokepon("Pydos", "./assets/mokepons_mokepon_pydos_attack.png", '☘️🔥', './assets/mokepons_mokepon_pydos_attack.png')

// Enemigos
let hipodogeEnemigo = new Mokepon("Hipodoge", "./assets/mokepons_mokepon_hipodoge_attack.png", '🤽', './assets/hipodoge.png')
let capipepoEnemigo = new Mokepon("Capipepo", "./assets/mokepons_mokepon_capipepo_attack.png", '☘️', './assets/capipepo.png')
let ratigueyaEnemigo = new Mokepon("Ratigueya", "./assets/mokepons_mokepon_ratigueya_attack.png", '🔥', './assets/ratigueya.png')
let langostelvisEnemigo = new Mokepon("Langostelvis", "./assets/mokepons_mokepon_langostelvis_attack.png", '🤽🔥', './assets/mokepons_mokepon_langostelvis_attack.png')
let tucapalmaEnemigo = new Mokepon("Tucapalma", "./assets/mokepons_mokepon_tucapalma_attack.png", '🤽☘️', './assets/mokepons_mokepon_tucapalma_attack.png')
let pydosEnemigo = new Mokepon("Pydos", "./assets/mokepons_mokepon_pydos_attack.png", '☘️🔥', './assets/mokepons_mokepon_pydos_attack.png')

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

langostelvis.ataques.push(
    { nombre: agua, id: 'boton-agua' },
    { nombre: agua, id: 'boton-agua' },
    { nombre: agua, id: 'boton-agua' },
    { nombre: fuego, id: 'boton-fuego' },
    { nombre: fuego, id: 'boton-fuego' },
    { nombre: fuego, id: 'boton-fuego' },
    { nombre: tierra, id: 'boton-tierra' },
)

tucapalma.ataques.push(
    { nombre: tierra, id: 'boton-tierra' },
    { nombre: tierra, id: 'boton-tierra' },
    { nombre: tierra, id: 'boton-tierra' },
    { nombre: agua, id: 'boton-agua' },
    { nombre: agua, id: 'boton-agua' },
    { nombre: agua, id: 'boton-agua' },
    { nombre: fuego, id: 'boton-fuego' },
)

pydos.ataques.push(
    { nombre: fuego, id: 'boton-fuego' },
    { nombre: fuego, id: 'boton-fuego' },
    { nombre: fuego, id: 'boton-fuego' },
    { nombre: agua, id: 'boton-agua' },
    { nombre: tierra, id: 'boton-tierra' },
    { nombre: tierra, id: 'boton-tierra' },
    { nombre: tierra, id: 'boton-tierra' },
)

hipodogeEnemigo.ataques.push(
    { nombre: agua, id: 'boton-agua' },
    { nombre: agua, id: 'boton-agua' },
    { nombre: agua, id: 'boton-agua' },
    { nombre: fuego, id: 'boton-fuego' },
    { nombre: tierra, id: 'boton-tierra' },
)

capipepoEnemigo.ataques.push(
    { nombre: tierra, id: 'boton-tierra' },
    { nombre: tierra, id: 'boton-tierra' },
    { nombre: tierra, id: 'boton-tierra' },
    { nombre: agua, id: 'boton-agua' },
    { nombre: fuego, id: 'boton-fuego' },
)

ratigueyaEnemigo.ataques.push(
    { nombre: fuego, id: 'boton-fuego' },
    { nombre: fuego, id: 'boton-fuego' },
    { nombre: fuego, id: 'boton-fuego' },
    { nombre: agua, id: 'boton-agua' },
    { nombre: tierra, id: 'boton-tierra' },
)

langostelvisEnemigo.ataques.push(
    { nombre: agua, id: 'boton-agua' },
    { nombre: agua, id: 'boton-agua' },
    { nombre: agua, id: 'boton-agua' },
    { nombre: fuego, id: 'boton-fuego' },
    { nombre: fuego, id: 'boton-fuego' },
    { nombre: fuego, id: 'boton-fuego' },
    { nombre: tierra, id: 'boton-tierra' },
)

tucapalmaEnemigo.ataques.push(
    { nombre: tierra, id: 'boton-tierra' },
    { nombre: tierra, id: 'boton-tierra' },
    { nombre: tierra, id: 'boton-tierra' },
    { nombre: agua, id: 'boton-agua' },
    { nombre: agua, id: 'boton-agua' },
    { nombre: agua, id: 'boton-agua' },
    { nombre: fuego, id: 'boton-fuego' },
)

pydosEnemigo.ataques.push(
    { nombre: fuego, id: 'boton-fuego' },
    { nombre: fuego, id: 'boton-fuego' },
    { nombre: fuego, id: 'boton-fuego' },
    { nombre: agua, id: 'boton-agua' },
    { nombre: tierra, id: 'boton-tierra' },
    { nombre: tierra, id: 'boton-tierra' },
    { nombre: tierra, id: 'boton-tierra' },
)

mokepones.push(hipodoge, capipepo, ratigueya, langostelvis, tucapalma, pydos)

function iniciarJuego() {

    sectionSeleccionarAtaque.style.display = 'none'
    sectionVerMapa.style.display = 'none'

    mokepones.forEach((mokepon) => {
        opcionMokepones = `
        <input type="radio" name="mascota" id=${mokepon.nombre} />
        <label class="tarjeta-de-mokepon" for=${mokepon.nombre}>
            <p>${mokepon.nombre}</p>
            <p>${mokepon.tipo}</p>
            <img src=${mokepon.foto} alt=${mokepon.nombre}>
        </label>
        `
        contenedorTarjetas.innerHTML += opcionMokepones

        inputHipodoge = document.getElementById('Hipodoge')
        inputCapipepo = document.getElementById('Capipepo')
        inputRatigueya = document.getElementById('Ratigueya')
        inputLangostelvis = document.getElementById('Langostelvis')
        inputTucapalma = document.getElementById('Tucapalma')
        inputPydos = document.getElementById('Pydos')
    })
  
    sectionReiniciar.style.display = 'none'

    botonMascotaJugador.addEventListener('click', seleccionarMascotaJugador)
    botonReiniciar.addEventListener('click', reiniciarJuego)
}

function seleccionarMascotaJugador() {
    sectionSeleccionarMascota.style.display = 'none'
    
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
    else if (inputLangostelvis.checked) {
        spanMascotaJugador.innerHTML = inputLangostelvis.id
        mascotaJugador = inputLangostelvis.id
    }
    else if (inputTucapalma.checked) {
        spanMascotaJugador.innerHTML = inputTucapalma.id
        mascotaJugador = inputTucapalma.id
    }
    else if (inputPydos.checked) {
        spanMascotaJugador.innerHTML = inputPydos.id
        mascotaJugador = inputPydos.id
    }
    else {
        sectionSeleccionarMascota.style.display = 'block'
        sectionSeleccionarAtaque.style.display = 'none'
        alert("Selecciona una mascota")
    }
    extraerAtaques(mascotaJugador)
    sectionVerMapa.style.display = 'flex'
    console.log(objMascotaJugador,mascotaJugador)
    iniciarMapa() 
}

function extraerAtaques(mascotaJugador) {
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

function seleccionarMascotaEnemigo(enemigo) {
    spanMascotaEnemigo.innerHTML = enemigo.nombre
    ataquesMokeponEnemigo = enemigo.ataques
    secuenciaAtaque()
}

function ataqueAleatorioEnemigo() {
    let ataqueAleatorio = aleatorio(0, ataquesMokeponEnemigo.length - 1)

    ataqueEnemigo.push(ataquesMokeponEnemigo[ataqueAleatorio].nombre)
    console.log(ataqueEnemigo)
    iniciarCombate()
}

function iniciarCombate() {
    if (ataqueJugador.length == ataques.length) {
        combate()
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

function pintarCanvas() {
    objMascotaJugador.x += objMascotaJugador.velocidadX
    objMascotaJugador.y += objMascotaJugador.velocidadY
    lienzo.clearRect(0,0,mapa.width, mapa.height)
    lienzo.drawImage(
        mapaFondo,
        0,
        0,
        mapa.width,
        mapa.height
    )
    objMascotaJugador.pintarMokepon()
    hipodogeEnemigo.pintarMokepon()
    capipepoEnemigo.pintarMokepon()
    ratigueyaEnemigo.pintarMokepon() 
    if (objMascotaJugador.velocidadX != 0 || objMascotaJugador.velocidadY != 0) {
        revisarColision(hipodogeEnemigo)
        revisarColision(capipepoEnemigo)
        revisarColision(ratigueyaEnemigo)
    }
}

function moverDerecha() {
    objMascotaJugador.velocidadX = 5
}

function moverIzquierda() {
    objMascotaJugador.velocidadX = -5
}

function moverAbajo() {
    objMascotaJugador.velocidadY = 5
}

function moverArriba() {
    objMascotaJugador.velocidadY = -5
}

function detenerMovimiento() {
    objMascotaJugador.velocidadX = 0
    objMascotaJugador.velocidadY = 0
}

function sePresionoUnaTecla(event) {
    switch (event.key) {
        case 'ArrowUp':
            moverArriba()     
            break;
        case 'ArrowDown':
            moverAbajo()     
            break;
        case 'ArrowLeft':
            moverIzquierda()     
            break;
        case 'ArrowRight':
            moverDerecha()     
            break;       
        default:
            break;
    }
}

function iniciarMapa() {
    objMascotaJugador = obtenerObjMascota(mascotaJugador)
    intervalo = setInterval(pintarCanvas, 50)

    window.addEventListener('keydown', sePresionoUnaTecla)
    window.addEventListener('keyup', detenerMovimiento)
}

function obtenerObjMascota() {
    for (let i = 0; i < mokepones.length; i++) {
        if (mascotaJugador == mokepones[i].nombre) {
            return mokepones[i]
        }
    }
}

function revisarColision(enemigo) {
    const arribaEnemigo = enemigo.y
    const abajoEnemigo = enemigo.y + enemigo.alto
    const derechaEnemigo = enemigo.x + enemigo.ancho
    const izquierdaEnemigo = enemigo.x

    const arribaMascota = objMascotaJugador.y
    const abajoMascota = objMascotaJugador.y + objMascotaJugador.alto
    const derechaMascota = objMascotaJugador.x + objMascotaJugador.ancho
    const izquierdaMascota = objMascotaJugador.x

    if (
        abajoMascota < arribaEnemigo ||
        arribaMascota > abajoEnemigo ||
        derechaMascota < izquierdaEnemigo ||
        izquierdaMascota > derechaEnemigo
    ) {
        return
    }
    detenerMovimiento()
    clearInterval(intervalo)
    sectionSeleccionarAtaque.style.display = 'flex'
    sectionVerMapa.style.display= 'none'
    seleccionarMascotaEnemigo(enemigo)
    //alert("Hay colisión con " + enemigo.nombre)
}

window.addEventListener('load', iniciarJuego)