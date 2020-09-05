window.onload = updateClock;

var totalTime = 100;

function updateClock() {

document.getElementById('countdown').innerHTML = "Tienes " + totalTime + " segundos";
document.getElementById('Puntos').innerHTML = "Tienes " + puntos + " puntos";

    if(totalTime==0){
      swal('Quien quiere ser Millonario', '¡Lo siento, Se te acabó el tiempo! hiciste ' + puntos + ' puntos','error')
      .then(() => {
        setTimeout(document.location.reload(),10000)
    }) }else{
        totalTime-=1;         //De lo contrario que ande el reloj y reste uno
        setTimeout("updateClock()",1000);
    }
}

var preguntas = [
    "¿Quien descubrió América?",
    "¿Cual de estos arquitectos fue el que diseñó el Puente de la Mujer en Buenos Aires?",
    "¿Que se celebra el 17 de Agosto en Argentina?",
    "¿Cual es la capital de Venezuela?",
    "¿Cuando nació Simón Bolívar?",
    "¿Cual es la capital de Alemania?"
];

var respuestas = [
    ["Cristóbal Colón", "Fernando de Magallanes", "James Cook", "Vasco da Gama"],
    ["Santiago Calatrava", "Norman Foster", "Richard Meier", "César Pelli"],
    ["Paso a la Inmortalidad de San Martin", "Nacimiento de San Martin", "Día Nacional de la Memoria por la Verdad y la Justicia", " Día del Veterano y de los Caídos en la Guerra de Malvinas"],
    ["Caracas", "Bogotá", "San Juan", "Maracaibo"],
    ["24 de julio de 1783", "24 de junio de 1783", "17 de diciembre de 1811","19 de abril de 1810"],
    ["Berlin", "Frankfurt", "Múnich", "Hamburgo"]
]

var indiceRespuestacorrecta;
var puntos = 0;
var preguntaActual = 0;

var nombreJugador = prompt('Ingresa tu nombre');

var audio = document.getElementById("audio");

jugar();

function jugar(){
     
    audio.play();

    // console.log(preguntaActual);
    
    var respuestasPosibles = respuestas[preguntaActual];
    
    //Cantidad de respuestas
    var posiciones = [0,1,2,3];
    var respuestasReOrdenadas = [];
    
    //Hace que te deje seleccionar siempre la respuesta correcta de cada pregunta
    var yaSeMetio = false;

    for(i in respuestasPosibles){
        var posicionAleatoria = Math.floor(Math.random() * posiciones.length);
        if(posicionAleatoria==0 && yaSeMetio == false){
            indiceRespuestacorrecta = i;
            //permito seleccionar para que en el siguiente for este false otra vez
            yaSeMetio = true;
    }
    respuestasReOrdenadas[i] = respuestasPosibles[posiciones[posicionAleatoria]];
    //Aqui voy reduciendo 1 cada posicion de para asegurarme que salgan todas las respuestas
    posiciones.splice(posicionAleatoria, 1);
}

    var textoRespuestas = "";
    for(i in respuestasReOrdenadas){
        //ponerle el radio hace el circulito, poner nombre asegura que no se pueda seleccionar más de uno a la vez
        textoRespuestas += '<input type="radio" name="pp" value="' + i + '"><label>' + respuestasReOrdenadas[i] + '</label><br>';
    }

    document.getElementById("Pregunta").innerHTML = (preguntas[preguntaActual])
    document.getElementById("Respuestas").innerHTML = textoRespuestas;
    }

function comprobar(){

    var respuesta = $("input[type=radio]:checked").val();

    if(preguntaActual < (preguntas.length-1)){
        if(respuesta==indiceRespuestacorrecta){
            swal('¿Quien quiere ser millonario?','¡Acertaste!', 'success')
            .then(() => {
                puntos++; 
            })
        } else {
            swal('¿Quien quiere ser millonario?','¡Te equivocaste!', 'error')
        }
        preguntaActual++;
        // console.log(preguntaActual);
        setTimeout(jugar(),1000);
    } else{
        swal(nombreJugador +' ¡Finalizaste Quien quiere ser millonario!', 'Hiciste ' + puntos + ' puntos')
        .then(() => {
            setTimeout(document.location.reload(),10000); 
        })
    } 
}