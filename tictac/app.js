/**
 * 
 * TIC TAC TOE
 */
let turno1 = true
let jugador1 = 'X';
let jugador2 = 'O';

let VictoriasO = 0;
let VictoriasX = 0;

document.getElementById("marcador-x").innerHTML = "<span>X ->" + VictoriasX + "<span>";
document.getElementById("marcador-o").innerHTML = "<span>O ->" + VictoriasO + "<span>";
document.getElementById("c1");
document.getElementById("c2");

/**
 *combinaciones ganadoras salvo las horizontales
 * [3, 4, 5]
 * [0, 3, 6]
 * [1, 4, 7]
 * [2, 5, 8]
 * [0, 4, 8]
 * [2, 4, 6]
 * 
 */
let combinacionGanadora = [
    [3, 4, 5],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];
// let tablero = ['', '', '', '', '', '', '', '', ''];
let tablero = document.getElementsByClassName('casilla');
let marcador = document.getElementsByClassName('marcador');
let turno = true;
let turno2 = false;

/**Utilizamos push para rellenar el array con las posiciones que se van dibujando, posteriormente se compara con la combinación ganadora */
let x = [];
let o = [];
let ganar = true;

turno = jugador1;
turno2 = jugador2;

/**
 * Aquí vamos a introducir los eventos de click evento clcik como atributo en etiqueta.
 * El contenido del click es una función.
 * 
 */
for (let i = 0; i < tablero.length; i++) {

    tablero[i].setAttribute('onclick', `pintaConsola(${i})`);

}
/**
 * variable turno 
 * true pinta x
 * false pinta o
 */

/**
 * Pinto una X o un O cuando clickeo el div
 * @param {*} numero 
 */
function pintaConsola(numero) {
    if (turno) {
        tablero[numero].textContent = 'X';
        GANADOR();
        /**He intentado crear una función parar PARAR(); */

    } else {
        tablero[numero].textContent = 'O';
        GANADOR();
        /**He intentado crear una función parar PARAR(); */
    }
    /**hago un remove para quitar el atributo onclick para que no se pueda cambiar la misma casilla de x a o */
    tablero[numero].removeAttribute('onclick');
    turno = !turno;
}

function GANADOR() {
    let actual1 = [];
    let actual2 = [];

    /**
     *Recorrer las casillas para ver su contenido  
      */
    for (let i = 0; i < tablero.length; i++) {
        if (tablero[i].innerHTML == 'X') {
            actual1.push(i);
            actual1.sort();
        }
        if (tablero[i].innerHTML == 'O') {
            actual2.push(i);
            actual2.sort();
        }
    }
    /**     
    * Utilizar Array.include para comprobar si una de las combinaciones correctas     
    * esta incluida en mi array de actual     
    */
    for (i in combinacionGanadora) {
        if (actual1.includes(combinacionGanadora[i][0]) && actual1.includes(combinacionGanadora[i][1]) && actual1.includes(combinacionGanadora[i][2])) {
            VictoriasX++;
            console.log(combinacionGanadora[i])
            alert('GANAN LAS X. Llevan ' + VictoriasX + ' victorias.');

            for (j in combinacionGanadora[i]) {
                tablero[combinacionGanadora[i][j]].style.background = 'red';
                console.log(combinacionGanadora[i][j])
            }
            finPartida();
        }
        if (actual2.includes(combinacionGanadora[i][0]) && actual2.includes(combinacionGanadora[i][1]) && actual2.includes(combinacionGanadora[i][2])) {
            VictoriasO++;
            alert('GANAN LAS O. Llevan ' + VictoriasO + ' victorias.');

            for (j in combinacionGanadora[i]) {
                tablero[combinacionGanadora[i][j]].style.background = 'red';
                console.log(combinacionGanadora[i][j])
            }
            finPartida();
        }
    }
}

function REINICIAR() {
    for (let i = 0; i < tablero.length; i++) {
        tablero[i].textContent = "";
        tablero[i].setAttribute('onclick', `pintaConsola(${i})`);

        for (j in combinacionGanadora[i]) {
            tablero[combinacionGanadora[i][j]].style.background = 'grey';
            console.log(combinacionGanadora[i][j])
        }

    }

}
function finPartida() {
    document.getElementById("marcador-x").innerHTML = "<span>X ->" + VictoriasX + "<span>";
    document.getElementById("marcador-o").innerHTML = "<span>O ->" + VictoriasO + "<span>";
    for (let i = 0; i < tablero.length; i++) {
        tablero[i].removeAttribute('onclick');
    }
}


