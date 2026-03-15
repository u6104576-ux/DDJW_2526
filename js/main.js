import {$} from "../library/jquery-4.0.0.slim.module.min.js";

// Obtenim les dades del index
var play = $('#play');
var options = $('#options');
var saves = $('#saves');
var exit = $('#exit');

addEventListener('load', function() {
    play.on('click', 
    function(){
		let alies = prompt("Introdueix el teu nom: ");
		console.log("Alies: " ,alies);
        alert("Comença la partida");
        window.location.assign("./html/game.html");
    });

    options.on('click', 
    function(){
        console.error("Opció no implementada");
    });

    saves.on('click', 
    function(){
        console.error("Opció no implementada");
    });

    exit.on('click', 
    function(){
        console.warn("No es pot sortir!");
    });
});