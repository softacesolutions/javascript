function aleatorio(min, max) {
    return (min + Math.random() * (max - min)).toPrecision(1);
}

function eleccion(jugada) {
    let resultado = ""
    switch (jugada)
    {
        case "1": resultado = "piedra 🪨 "; break;
        case "2": resultado = "papel 🧻"; break;
        case "3": resultado = "tijera ✂️"; break;
        default: resultado = "opción equivocada 😖"; break;
    }
    return resultado
}

function combate(jugador1,jugador2) {
    if (jugador1 == jugador2) {
        alert("EMPATE")
    } else if (jugador2 == 1 && jugador1 == 3) {
        alert("GANASTE")
        triunfos = triunfos + 1
    } else if (jugador2 == 2 && jugador1 == 1) {
        alert("GANASTE")
        triunfos = triunfos + 1
    } else if (jugador2 == 3 && jugador1 == 2) {
        alert("GANASTE")
        triunfos = triunfos + 1
    }
    else {
        alert("PERDISTE")
        perdidas = perdidas + 1
    }
}

// 1 es piedra. 2 es papel y 3 es tijera
let jugador = 0
let pc = 0
let triunfos = 0
let perdidas = 0
let jugadas = 3

while (triunfos < jugadas && perdidas < jugadas) {
    pc = aleatorio(1,3)
    jugador = prompt("Elige: 1 para piedra. 2 para papel y 3 para tijera")
    alert("PC elige " + eleccion(pc))
    alert("Tu elegiste " + eleccion(jugador))
    combate (pc,jugador)

}
alert("Ganaste " + triunfos + " veces, Perdiste " + perdidas + " veces.")