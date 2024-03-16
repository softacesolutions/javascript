let ataqueJugador
let ataqueEnemigo
let vidasJugador = 3
let vidasEnemigo = 3

function iniciarJuego() {
    //Otras mascotas, por ahora no se utilizan:
    //Langostelvis -> Agua y Fuego    Tucapalma -> Agua y Tierra    Pydos -> Tierra y Fuego

    let sectionSeleccionarAtaque = document.getElementById('seleccionar-ataque')
    sectionSeleccionarAtaque.style.display = 'none'
    let sectionReiniciar = document.getElementById('reiniciar')
    sectionReiniciar.style.display = 'none'

    let botonMascotaJugador = document.getElementById('boton-mascota')
    botonMascotaJugador.addEventListener('click', seleccionarMascotaJugador)
 
    let botonFuego = document.getElementById('boton-fuego')
    let botonAgua = document.getElementById('boton-agua')
    let botonTierra = document.getElementById('boton-tierra')
    botonFuego.addEventListener('click', ataqueFuego)
    botonAgua.addEventListener('click', ataqueAgua)
    botonTierra.addEventListener('click', ataqueTierra)
    vidas()

    let botonReiniciar = document.getElementById('boton-reiniciar')
    botonReiniciar.addEventListener('click', reiniciarJuego)
}

function seleccionarMascotaJugador() {
    let sectionSeleccionarMascota = document.getElementById('seleccionar-mascota')
    sectionSeleccionarMascota.style.display = 'none'

    let sectionSeleccionarAtaque = document.getElementById('seleccionar-ataque')
    sectionSeleccionarAtaque.style.display = 'block'

    let inputHipodoge = document.getElementById('hipodoge')
    let inputCapipepo = document.getElementById('capipepo')
    let inputRatigueya = document.getElementById('ratigueya')
    let spanMascotaJugador = document.getElementById('mascota-jugador')
    
    if (inputHipodoge.checked) {
        spanMascotaJugador.innerHTML = "Hipodoge"
    }
    else if (inputCapipepo.checked) {
        spanMascotaJugador.innerHTML = "Capipepo"
    }
    else if (inputRatigueya.checked) {
        spanMascotaJugador.innerHTML = "Ratigueya"
    }
    else {
        sectionSeleccionarMascota.style.display = 'block'
        sectionSeleccionarAtaque.style.display = 'none'
        alert("Selecciona una mascota")
    }
  
    seleccionarMascotaEnemigo() 
}

function seleccionarMascotaEnemigo() {

    let mascotaAleatorio = aleatorio(1,3)
    let spanMascotaEnemigo = document.getElementById('mascota-enemigo')

    switch (mascotaAleatorio) {
        case "1": spanMascotaEnemigo.innerHTML = "Hipodoge"; break;
        case "2": spanMascotaEnemigo.innerHTML = "Capipepo"; break;
        case "3": spanMascotaEnemigo.innerHTML = "Ratigueya"; break;
    }
   
}

function ataqueFuego() {
    ataqueJugador = "FUEGO"
    ataqueAleatorioEnemigo()
}

function ataqueAgua() {
    ataqueJugador = "AGUA"
    ataqueAleatorioEnemigo() 
}


function ataqueTierra() {
    ataqueJugador = "TIERRA"
    ataqueAleatorioEnemigo()
}

function ataqueAleatorioEnemigo() {
    let ataqueAleatorio = aleatorio(1,3)
    switch (ataqueAleatorio) {
        case "1": ataqueEnemigo = "FUEGO"; break;
        case "2": ataqueEnemigo = "AGUA"; break;
        case "3": ataqueEnemigo = "TIERRA"; break;
    }

    combate(ataqueEnemigo, ataqueJugador)
}

function combate(jugador1,jugador2) {
    if (jugador1 == jugador2) {
        crearMensaje("EMPATE 😮")
    } else if (jugador2 == "FUEGO" && jugador1 == "TIERRA") {
        crearMensaje("GANASTE 🎉")
        vidasEnemigo--
    } else if (jugador2 == "AGUA" && jugador1 == "FUEGO") {
        crearMensaje("GANASTE 🎉")
        vidasEnemigo--
    } else if (jugador2 == "TIERRA" && jugador1 == "AGUA") {
        crearMensaje("GANASTE 🎉")
        vidasEnemigo--
    }
    else {
        crearMensaje("PERDISTE 😭")
        vidasJugador--
    }
    vidas()
}

function vidas() {
    let spanVidasJugador = document.getElementById('vidas-jugador')
    let spanVidasEnemigo = document.getElementById('vidas-enemigo')
    spanVidasJugador.innerHTML = vidasJugador
    spanVidasEnemigo.innerHTML = vidasEnemigo
    revisarVidas()
}

function revisarVidas() {
    if (vidasJugador == 0 ) {
        crearMensajeFinal("Lo siento, Perdiste 😭")
    } else if (vidasEnemigo == 0) {
        crearMensajeFinal("FELICITACIONES! Ganaste 🎉")
    }
}

function crearMensaje(resultado) {
    let sectionMensajes = document.getElementById('mensajes')
    let parrafo = document.createElement('p')
    
    parrafo.innerHTML = "Tu mascota atacó con " + ataqueJugador + " , las mascota del enemigo atacó con " + ataqueEnemigo + " - " + resultado
    sectionMensajes.appendChild(parrafo)
}

function crearMensajeFinal(resultadoFinal) {
    let sectionMensajes = document.getElementById('mensajes')
    let parrafo = document.createElement('p')
    
    parrafo.innerHTML = resultadoFinal
    sectionMensajes.appendChild(parrafo)

    let botonFuego = document.getElementById('boton-fuego')
    let botonAgua = document.getElementById('boton-agua')
    let botonTierra = document.getElementById('boton-tierra')
    botonFuego.disabled = true
    botonAgua.disabled = true
    botonTierra.disabled = true

    let sectionReiniciar = document.getElementById('reiniciar')
    sectionReiniciar.style.display = 'block'
}

function reiniciarJuego() {
    location.reload()
}

function aleatorio(min, max) {
    return (min + Math.random() * (max - min)).toPrecision(1);
}

window.addEventListener('load', iniciarJuego)