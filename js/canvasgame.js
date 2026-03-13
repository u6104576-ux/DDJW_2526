import {$} from "../library/jquery-4.0.0.slim.module.min.js";
import {clickCard, gameItems, selectCards, startGame, initCard, saveGame} from "./memory.js";

let game = $('#game');
let canvas = game[0].getContext('2d');
if (canvas){
    game.attr("width", 800);
    game.attr("height", 600);
    start();
    update();
}

function start(){
    // TODO: Carregar recursos
    // TODO: Vincular events
}

function update(){
    checkInput();
    draw();
    // TODO: Com es pot fer per que això sigui LOOP
}