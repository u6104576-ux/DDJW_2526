import { clickCard, getGameItems, selectCards, startGame, initCard } from "./memory.js";

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const cardWidth = 60;
const cardHeight = 80;
const gap = 10;

function getColumns(total) {
    return total >= 8 ? 4 : 3;
}

function drawCard(idx, src, columns) {
    const x = (idx % columns) * (cardWidth + gap) + gap;
    const y = Math.floor(idx / columns) * (cardHeight + gap) + gap;

    const img = new Image();
    img.src = src;
    img.onload = () => {
        ctx.fillStyle = "#ccc"; 
        ctx.fillRect(x, y, cardWidth, cardHeight);
        
        ctx.drawImage(img, x, y, cardWidth, cardHeight);
    };
}

export function renderGame() {
    const items = getGameItems(); 
    const total = items.length; 
    const columns = total >= 8 ? 4 : 3; 
    const rows = Math.ceil(total / columns);
    const targetWidth = columns * (cardWidth + gap) + gap;
    const targetHeight = rows * (cardHeight + gap) + gap;
    canvas.width = targetWidth;
    canvas.height = targetHeight;
    ctx.fillStyle = "#ccc";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    items.forEach((item, idx) => {
        initCard(idx, (currentSrc) => {
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
    const items = getGameItems(); 
    const columns = items.length >= 8 ? 4 : 3; 
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
