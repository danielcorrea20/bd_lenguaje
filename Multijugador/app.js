/**
 * addEventListener('evento', funcion);
 * 
 * El metodo addEventListener relaciona la aparicion de un evento con la ejecucion de una funcion.
 * 
 * Este metodo se aplica sobre un elemento de HTML.
 * 
 * Sustituye al element.setAttribute('evento', 'funcion')
 * 
 * EVENTO LOAD
 * Evento que hace referencia a cuando la pagina web carga completamente.
 * NO AFECTA SOBRE OTROS ELEMENTOS QUE NO SEAN BODY
 * 
 */
// Localizo etiqueta main
//CREO TODAS LAS VARIABLES NECESARIAS
let main = document.getElementsByTagName('main')[0];
let body = document.getElementsByTagName('body')[0];
let posicionObjetivo
let posicionInicio
let posicionInicio2
let div
let ganadorj1 = false
let ganadorj2 = false
let victoriasj1 = 0;
let victoriasj2 = 0;
let turno = true;
let turno2 = false;
let jugador1 = posicionInicio;
let jugador2 = posicionInicio2;

//GENERO DOS SPAN PARA COLOCAR TEXTO CON UN INNERHTML EN EL MARCADOR CONCATENADO EL CONTADOR VICTORIAS J1 Y VICTORIASJ2
document.getElementById("jugador1").innerHTML = "<span>jugador1 ->" + victoriasj1 + "<span>";
document.getElementById("jugador2").innerHTML = "<span>jugador2 ->" + victoriasj2 + "<span>";

//CONVOCO CON UN EVENTO LA FUNCIÓN PINTARTABLERO, NO REQUIERE NINGÍN ATRIBUTO.
body.addEventListener('load', pintarTablero());

//LLAMO A LA FUNCION PINTARTABLERO 
function pintarTablero() {
    //COLOCO ALEATORIAMENTE EL OBJETIVO Y LOS DOS JUGADORES
    posicionObjetivo = [Math.floor(Math.random() * 10), Math.floor(Math.random() * 10)];
    posicionInicio = [Math.floor(Math.random() * 10), Math.floor(Math.random() * 10)];
    posicionInicio2 = [Math.floor(Math.random() * 10), Math.floor(Math.random() * 10)];

    // console.log('has hecho un click')
    //PINTO EL TABLERO
    for (i = 0; i < 10; i++) {
        for (j = 0; j < 10; j++) {
            let div = document.createElement('div');
            div.classList.add('card');
            main.appendChild(div);
            /**
             * Asigno la fila y la columna como clase en mi div
             */
            div.classList.add(i + "f");
            div.classList.add(j + "c");
            /**
             * Para pintar una casilla, le damos color de fondo
             */
            if (i == posicionObjetivo[0] && j == posicionObjetivo[1]) {
                div.classList.add('objetivo');
                console.log(div.classList);
                console.log('Estamos en la fila: ' + parseInt(div.classList[1]));
                console.log('Estamos en la columna: ' + parseInt(div.classList[2]));
            }
            if (i == posicionInicio[0] && j == posicionInicio[1]) {
                div.classList.add('actual');
                console.log(div.classList);
                console.log('Estamos en la fila: ' + parseInt(div.classList[1]));
                console.log('Estamos en la columna: ' + parseInt(div.classList[2]));
            }
            if (i == posicionInicio2[0] && j == posicionInicio2[1]) {
                div.classList.add('actual2');
                console.log(div.classList);
                console.log('Estamos en la fila: ' + parseInt(div.classList[1]));
                console.log('Estamos en la columna: ' + parseInt(div.classList[2]));
            }
        }
    }
}

/**
 * Necesito cualquier evento de tecla para poder mover el color de la casilla
 * -    DONDE:                              El evento lo aplico sobre todo el documento HTML (uso document.) 
 * -    EVENTO:                             El evento elegido es 'keydown'.
 * -    FUNCION EJECUTADA:                  La funcion elegida es 'mover'.
 * -    RELACION EVENTO, FUNCION Y LUGAR:   El metodo elegido es addEventListener
 * 
*/
//LLAMO AL EVENTO MOVER QUE SE ACTIVARA AL PRESIONAR UNA TECLA
document.addEventListener('keydown', mover);

/**
 * Esta funcion mover recibe por parametro objeto event que referencia a la clase KeyboardEvent
 */
//CREO LA FUNCIÓN MOVER. 
function mover(event) {

    var classList;
    var classList2;
    var fila;
    var columna = 0;
    var fila2 = 0;
    var columna2 = 0;
    var filaNueva = 0;

    var columnaNueva = 0;


    // console.log(event['key']);
    //CON UN SWITCH DISTRIBUYO LAS ORDENES QUE SE EJECUTARAN PRESIONANDO UNA TECLA DETERMINADA
    switch (event['key']) {

        case 'ArrowUp':
            //LOCALIZO DONDE SE ENCUENTRA EL JUGADOR1 Y EL JUGADOR2. DIVIDO LA CLASE CON UN SPLIT

            classList = document.getElementsByClassName('actual')[0].className.split(/\s+/);
            classList2 = document.getElementsByClassName('actual2')[0].className.split(/\s+/);
            //FILA Y COLUMNA SON LA POSICION DEL JUGADOR1 Y ESTAN EN LA POSICION 1 Y DOS DEL ARRAY CLASSSLIST
            fila = classList[1].charAt(0);
            columna = classList[2].charAt(0);
            //FILA Y COLUMNA SON LA POSICION DEL JUGADOR2 Y ESTAN EN LA POSICION 1 Y DOS DEL ARRAY CLASSSLIST2
            fila2 = classList2[1].charAt(0);
            columna2 = classList2[2].charAt(0);

            //TRABAJO CON LOS LIMITES DEL TABLERO SI EL JUGADOR LOS SOBREPASA DE ARRIBA ABAJO COMIENZAN POR EL OTRO LADO
            //DE DERECHA A IZQUIERDA IGUAL
            if (fila != 0) {
                //HACIA ARRIBA SE RESTA UNA FILA
                filaNueva = parseInt(fila) - 1;
            }
            else {
                filaNueva = 9;
            }
            //TRABAJO CON LA SITUACIÓN EN QUE LOS JUGADORES NO PUENDE OCUPAR LA MISMA POSICIÓN.
            //SI LAS FILAS Y LAS COLUMNAS SON IGUALES NO SE MUEVE
            if (!(filaNueva == fila2 && columna == columna2)) {
                element = document.getElementsByClassName(filaNueva + "f " + columna + "c")[0];
                element.classList.add('actual');
                element2 = document.getElementsByClassName(fila + "f " + columna + "c")[0];
                element2.classList.remove('actual');
            }
            //LLAMO A LA FUNCION GANADOR Y LE DOY LOS ATRIBUTOS QUE REQUIERE LA COLUMNA LA FILA Y EL JUGADOR.´
            //ESTO LO HAGO CON TODAS LOS CASOS DE SWITCH
            GANADOR(columna, filaNueva, 1);
            break;
        case 'ArrowDown':
            classList = document.getElementsByClassName('actual')[0].className.split(/\s+/);
            classList2 = document.getElementsByClassName('actual2')[0].className.split(/\s+/);

            fila = classList[1].charAt(0);
            columna = classList[2].charAt(0);

            fila2 = classList2[1].charAt(0);
            columna2 = classList2[2].charAt(0);
           
            if (fila != 9) {
                //HACIA ABAJO SE SUMA UNA FILA
                filaNueva = parseInt(fila) + 1;
            }
            else {
                filaNueva = 0;
            }
           
            if (!(filaNueva == fila2 && columna == columna2)) {
                element = document.getElementsByClassName(filaNueva + "f " + columna + "c")[0];
                element.classList.add('actual');
                element2 = document.getElementsByClassName(fila + "f " + columna + "c")[0];
                element2.classList.remove('actual');
            }
            GANADOR(columna, filaNueva, 1);
            /**console.log('has pulsado la tecla hacia abajo')
            posicionInicio[0] = i - 1;
            posicionInicio[1] = j;**/
            break;
        case 'ArrowLeft':
            classList = document.getElementsByClassName('actual')[0].className.split(/\s+/);
            classList2 = document.getElementsByClassName('actual2')[0].className.split(/\s+/);

            fila = classList[1].charAt(0);
            columna = classList[2].charAt(0);

            fila2 = classList2[1].charAt(0);
            columna2 = classList2[2].charAt(0);
           
            if (columna != 0) {
                //HACIA LA IZQUIERDA SE RESTA UNA COLUMNA
                columnaNueva = parseInt(columna) - 1;
            }
            else {
                columnaNueva = 9;
            }
            
            if (!(fila == fila2 && columnaNueva == columna2)) {
                element = document.getElementsByClassName(fila + "f " + columnaNueva + "c")[0];
                element.classList.add('actual');
                element2 = document.getElementsByClassName(fila + "f " + columna + "c")[0];
                element2.classList.remove('actual');
            }
            GANADOR(columnaNueva, fila, 1);
            /**console.log('has pulsado la tecla hacia izquierda')
            posicionInicio[0] = i;
            posicionInicio[1] = j - 1;**/
            break;
        case 'ArrowRight':

            classList = document.getElementsByClassName('actual')[0].className.split(/\s+/);
            classList2 = document.getElementsByClassName('actual2')[0].className.split(/\s+/);

            fila = classList[1].charAt(0);
            columna = classList[2].charAt(0);

            fila2 = classList2[1].charAt(0);
            columna2 = classList2[2].charAt(0);
            
            if (columna != 9) {
                //HACIA LA IZQUIERDA SE SUMA UNA COLUMNA
                columnaNueva = parseInt(columna) + 1;
            }
            else {
                columnaNueva = 0;
            }
          
            if (!(fila == fila2 && columnaNueva == columna2)) {
                element = document.getElementsByClassName(fila + "f " + columnaNueva + "c")[0];
                element.classList.add('actual');
                element2 = document.getElementsByClassName(fila + "f " + columna + "c")[0];
                element2.classList.remove('actual');
            }
            GANADOR(columnaNueva, fila, 1);
            break;

        /**console.log('has pulsado la tecla hacia derecha')
        posicionInicio[0] = i;
        posicionInicio[1] = j + 1;**/
        case 'w':

            classList = document.getElementsByClassName('actual2')[0].className.split(/\s+/);
            classList2 = document.getElementsByClassName('actual')[0].className.split(/\s+/);

            fila = classList[1].charAt(0);
            columna = classList[2].charAt(0);

            fila2 = classList2[1].charAt(0);
            columna2 = classList2[2].charAt(0);
           

            if (fila != 0) {
                filaNueva = parseInt(fila) - 1;
            }
            else {
                filaNueva = 9;
            }
           
            if (!(filaNueva == fila2 && columna == columna2)) {
                element = document.getElementsByClassName(filaNueva + "f " + columna + "c")[0];
                element.classList.add('actual2');
                element2 = document.getElementsByClassName(fila + "f " + columna + "c")[0];
                element2.classList.remove('actual2');
            }
            GANADOR(columna, filaNueva, 2);
            break;
        case 's':
            classList = document.getElementsByClassName('actual2')[0].className.split(/\s+/);
            classList2 = document.getElementsByClassName('actual')[0].className.split(/\s+/);

            fila = classList[1].charAt(0);
            columna = classList[2].charAt(0);

            fila2 = classList2[1].charAt(0);
            columna2 = classList2[2].charAt(0);

            
            if (fila != 9) {
                filaNueva = parseInt(fila) + 1;
            }
            else {
                filaNueva = 0;
            }
            if (!(filaNueva == fila2 && columna == columna2)) {
                element = document.getElementsByClassName(filaNueva + "f " + columna + "c")[0];
                element.classList.add('actual2');
                element2 = document.getElementsByClassName(fila + "f " + columna + "c")[0];
                element2.classList.remove('actual2');
            }


            GANADOR(columna, filaNueva, 2);


            /**console.log('has pulsado la tecla hacia abajo')
            posicionInicio[0] = i - 1;
            posicionInicio[1] = j;**/
            break;
        case 'a':
            classList = document.getElementsByClassName('actual2')[0].className.split(/\s+/);
            classList2 = document.getElementsByClassName('actual')[0].className.split(/\s+/);
           

            fila = classList[1].charAt(0);
            columna = classList[2].charAt(0);

            fila2 = classList2[1].charAt(0);
            columna2 = classList2[2].charAt(0);

            
            if (columna != 0) {
                columnaNueva = parseInt(columna) - 1;
            }
            else {
                columnaNueva = 9;
            }
            
            if (!(fila == fila2 && columnaNueva == columna2)) {
                element = document.getElementsByClassName(fila + "f " + columnaNueva + "c")[0];
                element.classList.add('actual2');
                element2 = document.getElementsByClassName(fila + "f " + columna + "c")[0];
                element2.classList.remove('actual2');
            }
            GANADOR(columnaNueva, fila, 2);
            /**console.log('has pulsado la tecla hacia izquierda')
            posicionInicio[0] = i;
            posicionInicio[1] = j - 1;**/
            break;
        case 'd':

            classList = document.getElementsByClassName('actual2')[0].className.split(/\s+/);
            classList2 = document.getElementsByClassName('actual')[0].className.split(/\s+/);
            
            fila = classList[1].charAt(0);
            columna = classList[2].charAt(0);

            fila2 = classList2[1].charAt(0);
            columna2 = classList2[2].charAt(0);
           
            if (columna != 9) {
                columnaNueva = parseInt(columna) + 1;
            }
            else {
                columnaNueva = 0;
            }
            if (!(fila == fila2 && columnaNueva == columna2)) {
                element = document.getElementsByClassName(fila + "f " + columnaNueva + "c")[0];
                element.classList.add('actual2');
                element2 = document.getElementsByClassName(fila + "f " + columna + "c")[0];
                element2.classList.remove('actual2');
            }
            GANADOR(columnaNueva, fila, 2);

        /**console.log('has pulsado la tecla hacia derecha')
        posicionInicio[0] = i;
        posicionInicio[1] = j + 1;**/

        default:
            break;
    }
}

//CREO LA FUNCION DE GANADOR Y LE PASO TRES ATRBUTOS LA COLUMNA, LA FILA Y EL JUGADOR
function GANADOR(columna, fila, jugador) {
    //BUSCO DONDE SE ENCUENTRA EL OBJETIVO Y DIVIDO EL CLASSLIST CON UN SPLIT
    classList3 = document.getElementsByClassName('objetivo')[0].className.split(/\s+/);
    //LA FILA Y LA COLUMNA SON LA POSICION 1 Y 2 DEL ARRAY 
    fila3 = classList3[1].charAt(0);
    columna3 = classList3[2].charAt(0);
    //SI LA FILA Y LA COLUMNA DEL OBJETIVO SON IGUALES QUE LA FILA Y LA COLUMNA DEL JUGADOR
    if (fila3 == fila && columna3 == columna) {
        if(jugador==2){
            //CUENTO LAS VICTORIAS
            victoriasj1++;
            //CREO UNA ALERTA
            alert("gana j1 " + victoriasj1 + " victorias");
        }
        else{
            victoriasj2++;
            alert("gana j2 " + victoriasj2 + " victorias");
        }
        //LLAMO LA FUNCION FINALPARTIDA
        finPartida()
    }
}
//CREO UNA NUEVA FUNCION LLAMADA FINPARTIDA PARA QUE LOS JUGADORES DEJEN DE MOVERSE CUANDO UNO GANE
function finPartida() {
    //SITUO A LOS JUGADORES
    document.getElementById("jugador1").innerHTML = "<span>jugador1 ->" + victoriasj1 + "<span>";
    document.getElementById("jugador2").innerHTML = "<span>jugador2 ->" + victoriasj2 + "<span>";
    //DESHBILITO EL EVENTO MOVER
    document.removeEventListener('keydown', mover);

}
//CREO LA FUNCIÓN RIENICIAR
function REINICIAR() {

    //BORRO TODOS LOS HIJOS DE PANEL

    var box = document.getElementById("panel");
    while (box.firstChild) {
        //The list is LIVE so it will re-index each call
        box.removeChild(box.firstChild);
    }
    //PINTO EL TABLERO DE NUEVO
    pintarTablero();
    document.addEventListener('keydown', mover);
}



