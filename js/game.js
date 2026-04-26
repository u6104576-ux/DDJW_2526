import { clickCard, getGameItems, selectCards, startGame, initCard } from "./memory.js";

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const cardWidth = 60;
const cardHeight = 80;
const gap = 10;

// Eliminamos la variable global cardsPerRow para evitar confusiones
function getColumns(total) {
    return total >= 8 ? 4 : 3;
}

function drawCard(idx, src, columns) {
    const x = (idx % columns) * (cardWidth + gap) + gap;
    const y = Math.floor(idx / columns) * (cardHeight + gap) + gap;

    const img = new Image();
    img.src = src;
    img.onload = () => {
        // Limpiamos el hueco exacto antes de dibujar
        ctx.fillStyle = "#ccc"; 
        ctx.fillRect(x, y, cardWidth, cardHeight);
        
        ctx.drawImage(img, x, y, cardWidth, cardHeight);
    };
}

export function renderGame() {
    // 1. Obtenemos las cartas reales del objeto game
    const items = getGameItems(); 
    const total = items.length; 

    // 2. FORZAMOS las columnas (Si hay 8 o más, usamos 4 obligatoriamente)
    const columns = total >= 8 ? 4 : 3; 
    const rows = Math.ceil(total / columns);

    // 3. Calculamos el ancho necesario (60 ancho + 10 gap) * columnas + 10 margen
    const targetWidth = columns * (cardWidth + gap) + gap;
    const targetHeight = rows * (cardHeight + gap) + gap;

    // 4. Aplicamos al canvas (Esto DEBE cambiar el width de 220 a 290)
    canvas.width = targetWidth;
    canvas.height = targetHeight;

    // 5. Limpiamos y dibujamos con el NUEVO valor de columns
    ctx.fillStyle = "#ccc";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    items.forEach((item, idx) => {
        initCard(idx, (currentSrc) => {
            // Pasamos 'columns' para que x e y sean correctos
            drawCard(idx, currentSrc, columns); 
        });
        drawCard(idx, '../resources/back.svg', columns);
    });
    
    startGame();
}

canvas.addEventListener('click', (event) => {
    const rect = canvas.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;

    // 1. Obtenemos las cartas actualizadas (8 en el nivel 2)
    const items = getGameItems(); 
    
    // 2. Calculamos las columnas igual que en renderGame
    const columns = items.length >= 8 ? 4 : 3; 

    // 3. Usamos 'items' en lugar de 'gameItems'
    items.forEach((_, idx) => {
        const x = (idx % columns) * (cardWidth + gap) + gap;
        const y = Math.floor(idx / columns) * (cardHeight + gap) + gap;

        if (mouseX >= x && mouseX <= x + cardWidth &&
            mouseY >= y && mouseY <= y + cardHeight) {
            clickCard(idx);
        }
    });
});

selectCards();
renderGame();