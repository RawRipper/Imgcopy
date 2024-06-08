async function loadJson(url) {
    const response = await fetch(url);
    return await response.json();
}

function loadImage(url) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.onerror = () => reject(new Error('Failed to load image'));
        img.src = url;
    });
}

function drawUnshuffledImage(info, img, canvas) {
    const ctx = canvas.getContext('2d');
    const { largura, altura } = info.tamanho_imagem;
    const sequence = info.sequencia_usada.map(x => x - 1);  // Convert to zero-based index
    const gridSize = Math.sqrt(info.numero_de_pedacos);
    const pieceWidth = Math.floor(largura / gridSize);
    const pieceHeight = Math.floor(altura / gridSize);

    canvas.width = largura;
    canvas.height = altura;

    for (let index = 0; index < sequence.length; index++) {
        const pos = sequence[index];
        const sx = (pos % gridSize) * pieceWidth;
        const sy = Math.floor(pos / gridSize) * pieceHeight;
        const dx = (index % gridSize) * pieceWidth;
        const dy = Math.floor(index / gridSize) * pieceHeight;

        ctx.drawImage(img, sx, sy, pieceWidth, pieceHeight, dx, dy, pieceWidth, pieceHeight);
    }
}

async function main() {
    const info = await loadJson('info.json');
    const img = await loadImage(info.caminho_imagem_nova);
    const canvas = document.getElementById('canvas');

    drawUnshuffledImage(info, img, canvas);
}

main();
