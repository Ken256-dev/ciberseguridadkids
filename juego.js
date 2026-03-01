let nivel = 0;
let puntos = 0;

const personaje = document.getElementById("personaje");
const reiniciarBtn = document.getElementById("reiniciarBtn");
const audioIntro = new Audio("sonidos/ciberkids.m4a");
const musica = document.getElementById("musicaFondo");

document.getElementById("btnComenzar").addEventListener("click", ()=>{

    audioIntro.play();

    musica.volume = 0.3;
    musica.play().catch(e => console.log("Autoplay bloqueado"));

    document.getElementById("pantallaInicio").style.display="none";

});

function sonido(tipo){

    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    oscillator.connect(gain);
    gain.connect(audioCtx.destination);

    if(tipo === "correcto"){
        oscillator.frequency.value = 600;
    }else{
        oscillator.frequency.value = 200;
    }

    oscillator.type = "sine";
    oscillator.start();

    gain.gain.exponentialRampToValueAtTime(
        0.00001,
        audioCtx.currentTime + 0.5
    );
}
const misiones = [
{
pregunta: "Recibes un mensaje: 'Ganaste un iPhone'. ¿Qué haces?",
opciones:[
{texto:"Hago clic rápido",correcta:false},
{texto:"Lo elimino",correcta:true},
{texto:"Lo comparto",correcta:false}
]},
{
pregunta:"Un desconocido pide tu contraseña.",
opciones:[
{texto:"Se la doy",correcta:false},
{texto:"La ignoro",correcta:true},
{texto:"Le pregunto por qué",correcta:false}
]},
{
pregunta:"¿Cuál es una contraseña segura?",
opciones:[
{texto:"123456",correcta:false},
{texto:"miNombre",correcta:false},
{texto:"G7!kP9@z",correcta:true}
]},
{
pregunta:"Alguien te envía un link extraño.",
opciones:[
{texto:"Lo abro",correcta:false},
{texto:"Lo ignoro",correcta:true},
{texto:"Lo publico",correcta:false}
]},
{
pregunta:"¿Debes compartir tu ubicación con extraños?",
opciones:[
{texto:"Sí",correcta:false},
{texto:"No",correcta:true},
{texto:"Solo a veces",correcta:false}
]},
{
pregunta:"Te insultan en línea.",
opciones:[
{texto:"Respondo insultando",correcta:false},
{texto:"Bloqueo y reporto",correcta:true},
{texto:"Sigo la pelea",correcta:false}
]},
{
pregunta:"¿Qué es phishing?",
opciones:[
{texto:"Un tipo de pescado",correcta:false},
{texto:"Intento de engaño digital",correcta:true},
{texto:"Un videojuego",correcta:false}
]},
{
pregunta:"¿Debes usar WiFi público sin cuidado?",
opciones:[
{texto:"Sí siempre",correcta:false},
{texto:"No, puede ser inseguro",correcta:true},
{texto:"Da igual",correcta:false}
]},
{
pregunta:"¿Actualizaciones del sistema?",
opciones:[
{texto:"No sirven",correcta:false},
{texto:"Protegen el dispositivo",correcta:true},
{texto:"Las ignoro",correcta:false}
]},
{
pregunta:"Si algo te da mala espina en internet...",
opciones:[
{texto:"Confío igual",correcta:false},
{texto:"Lo reviso antes",correcta:true},
{texto:"Lo comparto",correcta:false}
]}
];

function cargarNivel(){

    if(nivel >= misiones.length){
        mostrarFinal();
        return;
    }

    const mision = misiones[nivel];
    document.getElementById("pregunta").innerText = mision.pregunta;

    const contenedor = document.getElementById("opciones");
    contenedor.innerHTML = "";

    mision.opciones.forEach(opcion=>{
        const boton = document.createElement("button");
        boton.innerText = opcion.texto;
        boton.onclick = ()=> verificarRespuesta(opcion.correcta);
        contenedor.appendChild(boton);
    });

    document.getElementById("resultado").innerText = "";
    document.getElementById("progreso").innerText =
    "Nivel " + (nivel+1) + " de " + misiones.length;

    actualizarBarra();
}

function verificarRespuesta(correcta){

    personaje.classList.remove("feliz","triste");

    if(correcta){
        puntos++;
        sonido("correcto");
        document.getElementById("resultado").innerText = "✅ ¡Correcto!";
        personaje.innerText="😎";
        personaje.classList.add("feliz");
    }else{
        sonido("incorrecto");
        document.getElementById("resultado").innerText = "❌ Incorrecto";
        personaje.innerText="😢";
        personaje.classList.add("triste");
    }

    setTimeout(()=>{
        personaje.innerText="🤖";
        nivel++;
        cargarNivel();
    },1200);
}

function actualizarBarra(){
    const porcentaje = (nivel / misiones.length) * 100;
    document.getElementById("barra").style.width = porcentaje + "%";
}

function mostrarFinal(){

    document.getElementById("opciones").innerHTML="";
    document.getElementById("pregunta").innerText="🎉 Juego Terminado";
    document.getElementById("resultado").innerText=
    "Puntaje final: " + puntos + " / " + misiones.length;

    personaje.innerText = puntos >= 7 ? "🏆" : "🤖";

    reiniciarBtn.classList.remove("oculto");
}

reiniciarBtn.addEventListener("click", ()=>{
    nivel = 0;
    puntos = 0;
    personaje.innerText="🤖";
    reiniciarBtn.classList.add("oculto");
    actualizarBarra();
    cargarNivel();
});

cargarNivel();
const controlVolumen = document.getElementById("controlVolumen");

controlVolumen.addEventListener("input", function(){
    musica.volume = this.value;
});
document.getElementById("btnComenzar").addEventListener("click", () => {
    document.getElementById("pantallaInicio").style.display = "none";
    document.getElementById("contenedorJuego").classList.remove("oculto");
});